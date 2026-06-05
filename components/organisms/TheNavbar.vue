<template>
  <header
    class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-navbar"
    role="banner"
  >
    <div class="page-container">
      <nav class="flex items-center h-16 gap-4" aria-label="Main navigation">

        <!-- Mobile menu toggle -->
        <button
          class="btn-icon md:hidden shrink-0"
          aria-label="Open menu"
          aria-expanded="ui.mobileMenuOpen"
          aria-controls="mobile-menu"
          @click="ui.toggleMobileMenu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex flex-col items-center justify-center shrink-0"
          aria-label="Van Elvina – Home"
        >
          <img src="/logo.png" alt="Van Elvina Logo" class="h-9 md:h-11 w-auto object-contain" />
          <!-- <span class="hidden md:block text-[8px] font-ui font-normal tracking-[0.2em] text-dusty-rose uppercase mb-3 ml-1.5">Women Comfort First</span> -->
        </NuxtLink>

        <!-- Desktop category nav -->
        <nav class="hidden lg:flex items-center gap-0 ml-6 flex-1" aria-label="Category navigation">
          <NuxtLink
            v-for="cat in navCategories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="px-3 py-1.5 text-sm font-ui text-charcoal hover:text-deep-plum hover:bg-rose-blush rounded-lg transition-all duration-200 whitespace-nowrap"
            active-class="text-deep-plum font-medium"
          >
            {{ cat.name }}
          </NuxtLink>
          <NuxtLink
            to="/products?badge=sale"
            class="px-3 py-1.5 text-sm font-ui font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            Sale 🔥
          </NuxtLink>
        </nav>

        <!-- Spacer -->
        <div class="flex-1 lg:flex-none" />

        <!-- Search bar (desktop) -->
        <div class="hidden md:flex items-center flex-1 max-w-xs xl:max-w-sm relative">
          <button
            class="w-full flex items-center gap-2 px-4 py-2 bg-light-gray rounded-full text-sm text-mid-gray font-ui hover:bg-rose-blush transition-colors duration-200"
            aria-label="Search products"
            @click="ui.openSearch"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search bras, panties...</span>
          </button>
        </div>

        <!-- Right icons -->
        <div class="flex items-center gap-1">
          <!-- Search (mobile) -->
          <button class="btn-icon md:hidden" aria-label="Search" @click="ui.openSearch">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Wishlist -->
          <NuxtLink to="/wishlist" class="btn-icon relative" aria-label="Wishlist">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span
              v-if="wishlist.count > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-dusty-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center"
              aria-label="`${wishlist.count} items in wishlist`"
            >{{ wishlist.count }}</span>
          </NuxtLink>

          <!-- Account -->
          <NuxtLink to="/account" class="btn-icon hidden sm:flex" aria-label="My account">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </NuxtLink>

          <!-- Cart -->
          <NuxtLink to="/cart" class="btn-icon relative" aria-label="Shopping cart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span
              v-if="cart.count > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-deep-plum text-white text-[9px] font-bold rounded-full flex items-center justify-center"
              aria-label="`${cart.count} items in cart`"
            >{{ cart.count }}</span>
          </NuxtLink>
        </div>

      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import categoriesData from '~/data/categories.json'

const ui = useUIStore()
const cart = useCartStore()
const wishlist = useWishlistStore()

const navCategories = categoriesData.slice(0, 6)
</script>
