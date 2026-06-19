<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-navbar" role="banner">
    <!-- Announcement Bar (Zivame style) -->
    <div class="bg-deep-plum text-white text-[11px] font-ui py-2 px-4 select-none border-b border-white/5">
      <div class="page-container flex justify-between items-center">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">⚡ Free Shipping on orders above ₹999</span>
          <span class="hidden md:flex items-center gap-1">⭐ Easy 30-day Exchange</span>
        </div>
        <div class="flex items-center gap-4 font-medium">
          <NuxtLink to="/products?badge=bestseller" class="hover:text-rose-blush transition-colors">Bestsellers</NuxtLink>
          <span class="text-white/20">|</span>
          <NuxtLink to="/products?badge=new" class="hover:text-rose-blush transition-colors">New Arrivals</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <div class="page-container">
      <nav class="flex items-center h-16 gap-4" aria-label="Main navigation">
        <!-- Mobile menu toggle -->
        <button
          class="btn-icon lg:hidden shrink-0"
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
        <NuxtLink to="/" class="flex items-center shrink-0" aria-label="Van Elvina – Home">
          <img src="/logo.png" alt="Van Elvina Logo" class="h-9 md:h-11 w-auto object-contain" />
        </NuxtLink>

        <!-- Spacer -->
        <div class="hidden lg:block lg:flex-1" />

        <!-- Search bar (desktop) -->
        <div class="hidden md:flex items-center flex-1 max-w-md relative mx-4">
          <button
            class="w-full flex items-center gap-2 px-5 py-2.5 bg-light-gray rounded-full text-xs text-mid-gray font-ui hover:bg-rose-blush/40 transition-colors duration-200 border border-transparent hover:border-dusty-rose/20"
            aria-label="Search products"
            @click="ui.openSearch"
          >
            <svg class="w-4 h-4 shrink-0 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search premium bras, panties, activewear...</span>
          </button>
        </div>

        <!-- Spacer -->
        <div class="flex-1 md:hidden" />

        <!-- Right icons (including "Find Your Fit") -->
        <div class="flex items-center gap-2 md:gap-3">
          <!-- Find Your Fit Button (Zivame style) -->
          <button
            @click="ui.openSizeGuide"
            class="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 bg-dusty-rose hover:bg-deep-plum text-white text-xs font-semibold rounded-full pulse-fit transition-all duration-300 select-none cursor-pointer"
          >
            📏 Find Your Fit
          </button>

          <!-- Search (mobile only) -->
          <button class="btn-icon md:hidden text-charcoal hover:text-deep-plum" aria-label="Search" @click="ui.openSearch">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Wishlist -->
          <NuxtLink to="/wishlist" class="btn-icon relative text-charcoal hover:text-deep-plum" aria-label="Wishlist">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span
              v-if="wishlist.count > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-dusty-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse"
              aria-label="`${wishlist.count} items in wishlist`"
            >{{ wishlist.count }}</span>
          </NuxtLink>

          <!-- Account -->
          <NuxtLink to="/account" class="btn-icon hidden sm:flex text-charcoal hover:text-deep-plum" aria-label="My account">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </NuxtLink>

          <!-- Cart -->
          <NuxtLink to="/cart" class="btn-icon relative text-charcoal hover:text-deep-plum" aria-label="Shopping cart">
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

    <!-- Category Navigation Bar (Zivame/Clovia Ribbon Style) -->
    <div class="hidden lg:block border-t border-rose-blush/40 bg-warm-ivory/30">
      <div class="page-container py-2 flex items-center justify-center">
        <nav class="flex items-center gap-1.5" aria-label="Category navigation ribbon">
          <NuxtLink
            v-for="cat in navCategories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="px-4 py-1.5 text-xs font-ui font-semibold uppercase tracking-wider text-charcoal/80 hover:text-deep-plum hover:bg-rose-blush rounded-md transition-all duration-200"
            active-class="bg-deep-plum text-white hover:bg-deep-plum hover:text-white"
          >
            {{ cat.name }}
          </NuxtLink>
          <NuxtLink
            to="/products?badge=sale"
            class="px-4 py-1.5 text-xs font-ui font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 flex items-center gap-1"
          >
            Sale 🔥
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="px-4 py-1.5 text-xs font-ui font-semibold uppercase tracking-wider text-deep-plum bg-rose-blush hover:bg-dusty-rose hover:text-white rounded-md transition-all duration-200"
          >
            3 FOR ₹1099 ⚡
          </NuxtLink>
        </nav>
      </div>
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
