<template>
  <div class="min-h-screen flex flex-col bg-warm-ivory">
    <!-- Navbar -->
    <TheNavbar />

    <!-- Mobile Menu -->
    <MobileMenu />

    <!-- Search Overlay -->
    <SearchOverlay />

    <!-- Quick View Modal -->
    <QuickViewModal />

    <!-- Size Guide Modal -->
    <SizeGuideModal />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <TheFooter />

    <!-- Toast Notifications -->
    <ToastNotifications />

    <!-- Coupon Popup (bottom right) -->
    <CouponPopup />

    <!-- Profile Sidebar Drawer -->
    <ProfileDrawer />
  </div>
</template>

<script setup lang="ts">
// Layout is auto-loaded, no additional setup needed
</script>
