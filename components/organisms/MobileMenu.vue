<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="ui.mobileMenuOpen"
      class="overlay-backdrop md:hidden"
      aria-hidden="true"
      @click="ui.closeMobileMenu"
    />
  </Transition>

  <!-- Drawer -->
  <Transition name="slide-left">
    <aside
      v-if="ui.mobileMenuOpen"
      id="mobile-menu"
      class="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-modal flex flex-col md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-border-gray">
        <span class="font-serif text-deep-plum text-lg font-bold">Van Elvina</span>
        <button class="btn-icon" aria-label="Close menu" @click="ui.closeMobileMenu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Nav links -->
      <nav class="flex-1 overflow-y-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/products?category=${cat.slug}`"
          class="flex items-center justify-between px-3 py-3 rounded-xl text-charcoal font-ui text-sm hover:bg-rose-blush hover:text-deep-plum transition-colors"
          active-class="bg-rose-blush text-deep-plum font-medium"
          @click="ui.closeMobileMenu"
        >
          <span>{{ cat.name }}</span>
          <span class="text-xs text-mid-gray">{{ cat.productCount }}+</span>
        </NuxtLink>

        <div class="border-t border-border-gray my-3" />

        <NuxtLink
          to="/products?badge=sale"
          class="flex items-center px-3 py-3 rounded-xl font-ui text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          @click="ui.closeMobileMenu"
        >
          🔥 Sale
        </NuxtLink>
        <NuxtLink
          to="/products?badge=new"
          class="flex items-center px-3 py-3 rounded-xl font-ui text-sm font-medium text-deep-plum hover:bg-rose-blush transition-colors"
          @click="ui.closeMobileMenu"
        >
          ✨ New Arrivals
        </NuxtLink>
      </nav>

      <!-- Bottom links -->
      <div class="border-t border-border-gray px-4 py-4 space-y-2">
        <button
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-ui text-charcoal hover:bg-rose-blush hover:text-deep-plum transition-colors text-left"
          @click="() => { ui.closeMobileMenu(); ui.openProfileDrawer(); }"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          My Account
        </button>
        <NuxtLink to="/wishlist" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-ui text-charcoal hover:bg-rose-blush hover:text-deep-plum transition-colors" @click="ui.closeMobileMenu">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Wishlist
        </NuxtLink>
      </div>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
import categoriesData from '~/data/categories.json'

const ui = useUIStore()
const categories = categoriesData
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-left-enter-active, .slide-left-leave-active { transition: transform 0.3s ease; }
.slide-left-enter-from, .slide-left-leave-to { transform: translateX(-100%); }
</style>
