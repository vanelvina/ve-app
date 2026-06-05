<template>
  <div class="min-h-screen flex flex-col bg-warm-ivory">
    <!-- Top Announcement Bar -->
    <div class="bg-deep-plum text-white text-center text-xs py-2 px-4 font-ui tracking-wide">
      🎉 Free shipping on orders above ₹999 &nbsp;|&nbsp; Use code
      <span class="font-semibold underline cursor-pointer">ELVINA10</span> for 10% off
    </div>

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
  </div>
</template>

<script setup lang="ts">
// Layout is auto-loaded, no additional setup needed
</script>
