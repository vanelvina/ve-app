<template>
  <div class="min-h-screen bg-warm-ivory flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-soft text-center">
      <div v-if="loading" class="flex flex-col items-center justify-center space-y-4">
        <svg class="animate-spin w-12 h-12 text-deep-plum" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <h2 class="mt-6 text-xl font-serif text-charcoal">Logging you in...</h2>
        <p class="text-sm font-ui text-mid-gray">Please wait while we securely connect your account.</p>
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
import { useRouter, useRoute } from 'vue-router'
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
  // Google's implicit flow returns the response in the URL hash fragment
  const hash = route.hash.substring(1) // remove the '#'
  const params = new URLSearchParams(hash)
  const idToken = params.get('id_token')
  const error = params.get('error')

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
    router.push(safeRedirect)
  } catch (err: any) {
    loading.value = false
    errorMsg.value = err.message || 'Failed to authenticate with our servers.'
    console.error('Google callback error:', err)
  }
})
</script>
