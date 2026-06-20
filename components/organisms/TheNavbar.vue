<template>
  <header
    class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-navbar transition-transform duration-300"
    :class="navbarHidden ? '-translate-y-full' : 'translate-y-0'"
    role="banner"
  >
    <!-- Trust Badges Ribbon (desktop only) -->
    <div class="hidden md:block bg-[#FAF5E4] border-b border-rose-blush/20 py-1.5 px-4 select-none">
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

    <!-- ── Mobile Top Header (Hey / Van Elvina style) ── -->
    <div class="md:hidden bg-[#FDF0E8] px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Left: Favicon + greeting -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/" aria-label="Van Elvina – Home">
            <div class="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden border-2 border-white">
              <img src="/favicon.png" alt="Van Elvina" class="w-8 h-8 object-contain" />
            </div>
          </NuxtLink>
          <div class="leading-tight">
            <p class="text-base font-bold font-serif text-deep-plum tracking-tight">Hey Delicate! 👋</p>
          </div>
        </div>

        <!-- Right: notification + orders + wishlist + cart -->
        <div class="flex items-center gap-1.5">
          <!-- Notification bell -->
          <button class="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-rose-blush/40 transition-colors" aria-label="Notifications">
            <svg class="w-5 h-5 text-charcoal/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <!-- Orders bag icon with count -->
          <NuxtLink to="/cart" class="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-rose-blush/40 transition-colors" aria-label="Orders">
            <svg class="w-5 h-5 text-charcoal/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span
              v-if="cart.count > 0"
              class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-deep-plum text-white text-[9px] font-bold rounded-full flex items-center justify-center"
            >{{ cart.count }}</span>
            <span v-else class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gray-300 text-white text-[9px] font-bold rounded-full flex items-center justify-center">0</span>
          </NuxtLink>

          <!-- Wishlist -->
          <NuxtLink to="/wishlist" class="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-rose-blush/40 transition-colors" aria-label="Wishlist">
            <svg class="w-5 h-5 text-charcoal/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span
              v-if="wishlist.count > 0"
              class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-dusty-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse"
            >{{ wishlist.count }}</span>
          </NuxtLink>

          <!-- Profile -->
          <button
            @click="ui.openProfileDrawer"
            class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-rose-blush/40 transition-colors"
            aria-label="My account"
          >
            <svg class="w-5 h-5 text-charcoal/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <button
        class="mt-3 w-full flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-full text-sm text-mid-gray font-ui shadow-sm border border-transparent hover:border-dusty-rose/30 transition-all"
        aria-label="Search products"
        @click="ui.openSearch"
      >
        <svg class="w-4 h-4 shrink-0 text-charcoal/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span class="text-charcoal/40">Search for... Panties</span>
      </button>
    </div>

    <!-- ── Desktop Main Navigation Header ── -->
    <div class="hidden md:block page-container">
      <nav class="flex items-center h-16 gap-4" aria-label="Main navigation">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center shrink-0" aria-label="Van Elvina – Home">
          <img src="/logo.png" alt="Van Elvina Logo" class="h-9 md:h-11 w-auto object-contain" />
        </NuxtLink>

        <!-- Search bar (desktop) -->
        <div class="flex items-center flex-1 relative mx-4">
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

        <!-- Right icons -->
        <div class="flex items-center gap-2 md:gap-3">
          <button
            @click="ui.openSizeGuide"
            class="inline-flex items-center px-4 py-1.5 bg-[#C59B27] hover:bg-[#A37B1D] text-white text-xs font-semibold rounded-full pulse-fit transition-all duration-300 select-none cursor-pointer"
          >
            Find Your Fit
          </button>

          <!-- Wishlist -->
          <NuxtLink to="/wishlist" class="btn-icon relative text-charcoal hover:text-deep-plum" aria-label="Wishlist">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span
              v-if="wishlist.count > 0"
              class="absolute -top-1 -right-1 w-4 h-4 bg-dusty-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse"
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
            >{{ cart.count }}</span>
          </NuxtLink>
        </div>
      </nav>
    </div>

    <!-- Category Navigation Bar (desktop ribbon) -->
    <div class="hidden lg:block border-t border-rose-blush/40 bg-warm-ivory/30">
      <div class="page-container py-2 flex items-center justify-center">
        <nav class="flex items-center gap-1.5" aria-label="Category navigation ribbon">
          <NuxtLink
            to="/products?badge=new"
            class="px-4 py-1.5 text-xs font-ui font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#B76E79] to-[#C59B27] bg-clip-text text-transparent hover:opacity-80 transition-all duration-200"
          >New Arrivals</NuxtLink>
          <NuxtLink
            to="/products?badge=bestseller"
            class="px-4 py-1.5 text-xs font-ui font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#B76E79] to-[#C59B27] bg-clip-text text-transparent hover:opacity-80 transition-all duration-200"
          >Bestsellers</NuxtLink>
          <NuxtLink
            v-for="cat in navCategories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="px-4 py-1.5 text-xs font-ui font-semibold uppercase tracking-wider text-charcoal/80 hover:text-deep-plum hover:bg-rose-blush rounded-md transition-all duration-200"
            active-class="bg-deep-plum text-white hover:bg-deep-plum hover:text-white"
          >{{ cat.name }}</NuxtLink>
          <NuxtLink
            to="/products?badge=sale"
            class="px-4 py-1.5 text-xs font-ui font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
          >Sale</NuxtLink>
          <NuxtLink
            to="/products"
            class="px-4 py-1.5 text-xs font-ui font-semibold uppercase tracking-wider text-deep-plum bg-rose-blush hover:bg-dusty-rose hover:text-white rounded-md transition-all duration-200"
          >3 FOR ₹1099</NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Mobile Category Scrollable Chips -->
    <div class="md:hidden bg-white border-t border-gray-100 overflow-x-auto scrollbar-hide">
      <div class="flex items-center gap-1.5 px-3 py-2">
        <button
          v-for="chip in mobileChips"
          :key="chip.label"
          @click="navigateTo(chip.href)"
          class="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-ui font-semibold border transition-all"
          :class="chip.highlight
            ? 'bg-deep-plum text-white border-deep-plum'
            : 'bg-white text-charcoal/70 border-gray-200 hover:border-dusty-rose hover:text-deep-plum'"
        >
          {{ chip.label }}
        </button>
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

const mobileChips = [
  { label: '🔥 Sale', href: '/products?badge=sale', highlight: false },
  { label: '✨ New', href: '/products?badge=new', highlight: false },
  { label: 'Bras', href: '/products?category=bras', highlight: false },
  { label: 'Panties', href: '/products?category=panties', highlight: false },
  { label: 'Lingerie', href: '/products?category=sleepwear', highlight: false },
  { label: 'Activewear', href: '/products?category=activewear', highlight: false },
  { label: 'Shapewear', href: '/products?category=shapewear', highlight: false },
  { label: '3 FOR ₹1099', href: '/products', highlight: true },
]

// ── Auto-hide navbar on scroll ──
const navbarHidden = ref(false)
let lastScrollY = 0

const onScroll = () => {
  const currentY = window.scrollY
  const scrollingDown = currentY > lastScrollY
  const firstWidget = typeof document !== 'undefined' ? document.querySelector('section[aria-label="Featured banners"]') : null
  const threshold = firstWidget ? firstWidget.clientHeight * 0.8 : 120

  if (currentY > threshold && scrollingDown) {
    navbarHidden.value = true
  } else if (!scrollingDown) {
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
