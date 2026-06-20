<template>
  <header
    class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-navbar transition-transform duration-300"
    :class="navbarHidden ? '-translate-y-full' : 'translate-y-0'"
    role="banner"
  >
    <!-- Trust Badges Ribbon (Light Golden Background, Top Left) -->
    <div class="bg-[#FAF5E4] border-b border-rose-blush/20 py-1.5 px-4 select-none">
      <div class="page-container">
        <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-[9px] font-ui font-bold tracking-wider text-deep-plum/70">
          <span class="flex items-center gap-1">FREE SHIPPING</span>
          <span class="text-charcoal/20">|</span>
          <span class="flex items-center gap-1">100% PRIVACY</span>
          <span class="text-charcoal/20">|</span>
          <span class="flex items-center gap-1">CASH ON DELIVERY</span>
          <span class="text-charcoal/20">|</span>
          <span class="flex items-center gap-1">EASY EXCHANGE AND RETURN</span>
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

        <!-- Search bar (desktop - extended to logo) -->
        <div class="hidden md:flex items-center flex-1 relative mx-4">
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
          <!-- Find Your Fit Button (Solid Gold, no icon) -->
          <button
            @click="ui.openSizeGuide"
            class="hidden md:inline-flex items-center px-4 py-1.5 bg-[#C59B27] hover:bg-[#A37B1D] text-white text-xs font-semibold rounded-full pulse-fit transition-all duration-300 select-none cursor-pointer"
          >
            Find Your Fit
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
          <button
            @click="ui.openProfileDrawer"
            class="btn-icon hidden sm:flex text-charcoal hover:text-deep-plum"
            aria-label="My account"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

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
          <!-- Highlighted New Arrivals (Text Gradient, Front Index) -->
          <NuxtLink
            to="/products?badge=new"
            class="px-4 py-1.5 text-xs font-ui font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#B76E79] to-[#C59B27] bg-clip-text text-transparent hover:opacity-80 transition-all duration-200"
          >
            New Arrivals
          </NuxtLink>
          <!-- Highlighted Bestsellers (Text Gradient, Front Index) -->
          <NuxtLink
            to="/products?badge=bestseller"
            class="px-4 py-1.5 text-xs font-ui font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#B76E79] to-[#C59B27] bg-clip-text text-transparent hover:opacity-80 transition-all duration-200"
          >
            Bestsellers
          </NuxtLink>
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
            class="px-4 py-1.5 text-xs font-ui font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
          >
            Sale
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="px-4 py-1.5 text-xs font-ui font-semibold uppercase tracking-wider text-deep-plum bg-rose-blush hover:bg-dusty-rose hover:text-white rounded-md transition-all duration-200"
          >
            3 FOR ₹1099
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

const navCategories = categoriesData.slice(0, 5)

// ── Auto-hide navbar on scroll ──────────────────────────────────────────────
// Hide when scrolled past ~2 viewport heights (approx. second widget)
// and scrolling DOWN. Reveal immediately when scrolling UP.
const HIDE_THRESHOLD = typeof window !== 'undefined' ? window.innerHeight * 1.5 : 600

const navbarHidden = ref(false)
let lastScrollY = 0

const onScroll = () => {
  const currentY = window.scrollY
  const scrollingDown = currentY > lastScrollY

  if (currentY > HIDE_THRESHOLD && scrollingDown) {
    // User scrolled past second widget going down → hide
    navbarHidden.value = true
  } else if (!scrollingDown) {
    // Any upward scroll → reveal immediately
    navbarHidden.value = false
  }

  lastScrollY = currentY
}

onMounted(() => {
  lastScrollY = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
