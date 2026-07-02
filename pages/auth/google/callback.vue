<template>
  <div class="min-h-screen bg-warm-ivory flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-soft text-center">
      <div v-if="loading" class="flex flex-col items-center justify-center space-y-4">
        <!-- GlobalLoader handles the visual loading state -->
      </div>
      <div v-else-if="errorMsg" class="space-y-4">
        <div class="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 class="text-xl font-serif text-charcoal">Login Failed</h2>
        <p class="text-sm font-ui text-red-500">{{ errorMsg }}</p>
        <NuxtLink to="/" class="inline-block mt-4 text-sm font-ui font-semibold text-deep-plum hover:underline">
          Return to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'
import { useWishlistStore } from '~/stores/wishlist'
import { useCartStore } from '~/stores/cart'

const auth = useAuthStore()
const ui = useUIStore()
const wishlist = useWishlistStore()
const cart = useCartStore()
const router = useRouter()
const route = useRoute()

const loading = ref(true)
const errorMsg = ref('')

onMounted(async () => {
  // Clear any active service worker to prevent caching or token parsing issues
  if (import.meta.client && 'serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const reg of registrations) {
        await reg.unregister()
        console.log('Cleaned service worker registration for auth route.')
      }
    } catch (e) {
      console.warn('Failed to unregister service worker:', e)
    }
  }

  // Google's implicit flow returns the response in the URL hash fragment, but fallback to query
  let idToken: string | null = null
  let error: string | null = null

  if (typeof window !== 'undefined') {
    const hashStr = window.location.hash || route.hash || ''
    const hashClean = hashStr.startsWith('#') ? hashStr.substring(1) : hashStr
    if (hashClean) {
      const hashParams = new URLSearchParams(hashClean)
      idToken = hashParams.get('id_token')
      error = hashParams.get('error')
    }

    if (!idToken) {
      const queryParams = new URLSearchParams(window.location.search)
      idToken = queryParams.get('id_token') || (route.query.id_token as string)
      error = error || queryParams.get('error') || (route.query.error as string)
    }
  }

  if (error) {
    loading.value = false
    errorMsg.value = `Google returned an error: ${error}`
    return
  }

  if (!idToken) {
    loading.value = false
    errorMsg.value = 'No authentication token found in the URL. Please try logging in again.'
    return
  }

  try {
    // We send the ID token to our backend to verify and create/find the user
    await auth.loginWithGoogle(idToken)
    await Promise.all([
      wishlist.syncWishlistAfterLogin(),
      cart.syncCartAfterLogin()
    ])
    
    ui.addToast('success', `Welcome, ${auth.user?.name || 'Delicate'}! 🎉`)
    
    const redirectUrl = sessionStorage.getItem('ve_auth_redirect') || '/'
    sessionStorage.removeItem('ve_auth_redirect')
    
    const safeRedirect = (redirectUrl.includes('/auth') || redirectUrl.includes('/login')) ? '/' : redirectUrl
    navigateTo(safeRedirect)
  } catch (err: any) {
    loading.value = false
    errorMsg.value = err.message || 'Failed to authenticate with our servers.'
    console.error('Google callback error:', err)
  }
})
</script>
