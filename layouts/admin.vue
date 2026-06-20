<template>
  <div class="min-h-screen flex flex-col bg-warm-ivory">
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Toast Notifications -->
    <ToastNotifications />
  </div>
</template>

<script setup lang="ts">
// Admin layout — clean page without storefront navigation
</script>
