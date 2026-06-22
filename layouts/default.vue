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

const route = useRoute()
const auth = useAuthStore()
const wishlist = useWishlistStore()
const cart = useCartStore()

onMounted(async () => {
  auth.init()
  if (auth.isLoggedIn) {
    await Promise.all([
      wishlist.fetchWishlist(),
      cart.fetchCart()
    ])
  }
})
</script>
