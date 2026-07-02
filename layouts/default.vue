<template>
  <div class="min-h-screen flex flex-col bg-warm-ivory">
    <!-- Navbar -->
    <TheNavbar />


    <!-- Search Overlay -->
    <SearchOverlay />

    <!-- Quick View Modal -->
    <QuickViewModal />

    <!-- Size Guide Modal -->
    <SizeGuideModal />

    <!-- Main Content – extra bottom padding on mobile for tab bar -->
    <main class="flex-1 pb-16 md:pb-0">
      <slot />
    </main>

    <!-- Footer -->
    <SectionBlogs v-if="route.path === '/'" />
    <TheFooter />

    <!-- Toast Notifications -->
    <ToastNotifications />

    <!-- Coupon Popup (bottom right) -->
    <CouponPopup />

    <!-- Profile Sidebar Drawer -->
    <ProfileDrawer />

    <!-- Customer Auth Modal -->
    <AuthModal />

    <!-- Mobile Bottom Tab Bar -->
    <MobileBottomBar />
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '~/stores/wishlist'
import { useCartStore } from '~/stores/cart'
import { useUIStore } from '~/stores/ui'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const wishlist = useWishlistStore()
const cart = useCartStore()
const ui = useUIStore()

onMounted(async () => {
  auth.init()

  // Google Login URL hash interception (fail-safe for any page redirect)
  let googleLoginCompleted = false
  if (import.meta.client && typeof window !== 'undefined' && route.path !== '/auth/google/callback') {
    const hashStr = window.location.hash || ''
    const hashClean = hashStr.startsWith('#') ? hashStr.substring(1) : hashStr
    if (hashClean) {
      const hashParams = new URLSearchParams(hashClean)
      const idToken = hashParams.get('id_token')
      if (idToken) {
        // Clear hash immediately so it doesn't linger in URL
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
        
        ui.incrementActiveRequests()
        try {
          await auth.loginWithGoogle(idToken)
          await Promise.all([
            wishlist.syncWishlistAfterLogin(),
            cart.syncCartAfterLogin()
          ])
          ui.addToast('success', `Welcome, ${auth.user?.name || 'Delicate'}! 🎉`)
          googleLoginCompleted = true
          
          const redirectUrl = sessionStorage.getItem('ve_auth_redirect') || '/'
          sessionStorage.removeItem('ve_auth_redirect')
          const safeRedirect = (redirectUrl.includes('/auth') || redirectUrl.includes('/login')) ? '/' : redirectUrl
          if (safeRedirect !== window.location.pathname) {
            navigateTo(safeRedirect)
          }
        } catch (err: any) {
          ui.addToast('error', err.message || 'Google authentication failed.')
          console.error('Global Google callback error:', err)
        } finally {
          ui.decrementActiveRequests()
        }
      }
    }
  }

  await Promise.all([
    wishlist.fetchWishlist(),
    cart.fetchCart()
  ])

  if (!auth.isLoggedIn && !googleLoginCompleted) {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('auth_trigger') === 'true') {
        const redirectPath = params.get('redirect')
        ui.openAuthModal(redirectPath)
        
        // Clean up URL query parameters
        const query = { ...route.query }
        delete query.auth_trigger
        delete query.redirect
        router.replace({ query })
      }
    }
  }
})
</script>
