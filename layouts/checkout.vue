<template>
  <div class="min-h-screen flex flex-col bg-warm-ivory">
    <!-- Minimal Checkout Navbar -->
    <header class="bg-white border-b border-border-gray shadow-soft">
      <div class="page-container h-14 flex items-center justify-between">
        <NuxtLink to="/" class="font-serif text-xl text-deep-plum font-semibold tracking-wide">
          Van Elvina
        </NuxtLink>
        <div class="flex items-center gap-2 text-xs text-mid-gray font-ui">
          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
          <span>100% Secure Checkout</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Minimal footer -->
    <footer class="bg-white border-t border-border-gray py-6 text-center">
      <p class="text-xs text-mid-gray font-ui">
        © 2025 Van Elvina. All rights reserved.
        <NuxtLink to="/privacy-policy" class="hover:text-deep-plum ml-2">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms" class="hover:text-deep-plum ml-2">Terms & Conditions</NuxtLink>
      </p>
    </footer>

    <!-- Toast Notifications -->
    <ToastNotifications />
  </div>
</template>

<script setup lang="ts">
// Checkout layout — minimal, no distractions
</script>
