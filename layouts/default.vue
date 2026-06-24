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
  if (auth.isLoggedIn) {
    await Promise.all([
      wishlist.fetchWishlist(),
      cart.fetchCart()
    ])
  } else {
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
