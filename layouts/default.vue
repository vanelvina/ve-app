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
    <SectionBlogs v-if="!route.path.startsWith('/blogs')" />
    <TheFooter />

    <!-- Toast Notifications -->
    <ToastNotifications />

    <!-- Coupon Popup (bottom right) -->
    <CouponPopup />

    <!-- Profile Sidebar Drawer -->
    <ProfileDrawer />

    <!-- Mobile Bottom Tab Bar -->
    <MobileBottomBar />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
