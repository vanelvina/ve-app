<template>
  <header class="sticky top-0 z-50" role="banner">
    <!-- ══════════════════════════════════════════════════
         MOBILE HEADER
         • Top row: always sticky (never hides)
         • Search + chips: slide away on scroll-down
    ════════════════════════════════════════════════════ -->
    <div class="md:hidden">

      <!-- ── Always-visible top row ── -->
      <div
        class="flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md shadow-sm"
        style="background-color: #FAF6F0;"
      >
        <!-- Left: favicon + greeting -->
        <div class="flex items-center gap-2.5">
          <NuxtLink to="/" aria-label="Van Elvina – Home">
            <img src="/favicon.png" alt="Van Elvina" class="w-10 h-10 object-contain" />
          </NuxtLink>
          <p class="text-base font-bold font-serif text-deep-plum tracking-tight">Hey {{ auth.isLoggedIn && auth.user?.name ? auth.user.name : 'Delicate' }}!</p>
        </div>

        <!-- Right icon tray -->
        <div class="flex items-center gap-1">
          <!-- Search Icon (Conditionally visible) -->
          <button v-if="isSearchIconOnly" @click="ui.openSearch" class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDE4DC]/60 transition-colors" aria-label="Search">
            <svg class="w-5 h-5 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Bag -->
          <NuxtLink to="/bag" class="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDE4DC]/60 transition-colors" aria-label="Bag">
            <svg class="w-5 h-5 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cart.itemCount > 0" :key="cart.itemCount" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-deep-plum text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {{ cart.itemCount }}
            </span>
          </NuxtLink>

          <!-- Share (PDP only) -->
          <button v-if="isSearchIconOnly" @click="handleNavShare" class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDE4DC]/60 transition-colors" aria-label="Share this product">
            <svg class="w-5 h-5 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>

          <!-- Wishlist -->
          <NuxtLink to="/wishlist" class="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDE4DC]/60 transition-colors" aria-label="Wishlist">
            <svg class="w-5 h-5 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span v-if="wishlist.count > 0" :key="wishlist.count" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-dusty-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center">{{ wishlist.count }}</span>
          </NuxtLink>

          <!-- Profile -->
          <button @click="ui.openProfileDrawer" class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDE4DC]/60 transition-colors overflow-hidden border border-charcoal/10" aria-label="My account">
            <img v-if="auth.isLoggedIn && auth.user?.avatar" :src="auth.user.avatar" :alt="auth.user.name" class="w-full h-full object-cover" />
            <span v-else-if="auth.isLoggedIn" class="text-xs font-bold text-deep-plum font-ui">{{ userInitials }}</span>
            <svg v-else class="w-5 h-5 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Search bar: always occupies space, only fades in/out -->
      <div
        v-if="!isSearchIconOnly"
        class="px-4 py-1 search-bar-wrap"
        :class="navbarHidden ? 'search-bar-hidden' : 'search-bar-visible'"
        style="background-color: #FAF6F0;"
      >
        <button
          class="w-full flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-full text-sm font-ui shadow-sm border border-[#E8DDD5] hover:border-dusty-rose/40 transition-all"
          aria-label="Search products"
          :tabindex="navbarHidden ? -1 : 0"
          @click="ui.openSearch"
        >
          <svg class="w-4 h-4 shrink-0 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span class="text-charcoal/40 text-sm whitespace-nowrap overflow-hidden">Search for... <span class="typed-word">{{ currentWord }}</span><span class="typed-caret" aria-hidden="true">|</span></span>
        </button>
      </div>
    </div>

    <!-- ══ Desktop: All navbar sections wrapped for slide-hide ══ -->
    <div
      class="hidden md:block bg-white/95 backdrop-blur-md shadow-navbar transition-transform duration-300"
      :class="navbarHidden ? '-translate-y-full' : 'translate-y-0'"
    >
      <!-- Trust Badges Ribbon -->
      <div class="bg-[#FAF3E8] border-b border-rose-blush/20 py-1.5 px-4 select-none">
        <div class="page-container">
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-[9px] font-ui font-bold tracking-wider text-deep-plum/70">
            <span>FREE SHIPPING</span>
            <span class="text-charcoal/20">|</span>
            <span>100% PRIVACY</span>
            <span class="text-charcoal/20">|</span>
            <span>CASH ON DELIVERY</span>
            <span class="text-charcoal/20">|</span>
            <span>EASY EXCHANGE AND RETURN</span>
          </div>
        </div>
      </div>

      <!-- Main Navigation -->
      <div class="page-container">
        <nav class="flex items-center h-16 gap-4" aria-label="Main navigation">
          <NuxtLink to="/" class="flex items-center shrink-0" aria-label="Van Elvina – Home">
            <img src="/logo.png" alt="Van Elvina Logo" class="h-9 md:h-11 w-auto object-contain" />
          </NuxtLink>

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

          <div class="flex items-center gap-2 md:gap-3">
            <button @click="ui.openSizeGuide" class="inline-flex items-center px-4 py-1.5 bg-[#C59B27] hover:bg-[#A37B1D] text-white text-xs font-semibold rounded-full pulse-fit transition-all duration-300 select-none cursor-pointer">
              Find Your Fit
            </button>
            <NuxtLink to="/wishlist" class="btn-icon relative text-charcoal hover:text-deep-plum" aria-label="Wishlist">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span v-if="wishlist.count > 0" :key="wishlist.count" class="absolute -top-1 -right-1 w-4 h-4 bg-dusty-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center">{{ wishlist.count }}</span>
            </NuxtLink>
            <button @click="ui.openProfileDrawer" class="btn-icon hidden sm:flex text-charcoal hover:text-deep-plum overflow-hidden border border-charcoal/5" aria-label="My account">
              <img v-if="auth.isLoggedIn && auth.user?.avatar" :src="auth.user.avatar" :alt="auth.user.name" class="w-full h-full object-cover" />
              <span v-else-if="auth.isLoggedIn" class="text-xs font-bold text-deep-plum font-ui">{{ userInitials }}</span>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <NuxtLink to="/bag" class="btn-icon relative text-charcoal hover:text-deep-plum" aria-label="Shopping bag">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span v-if="cart.itemCount > 0" :key="cart.itemCount" class="absolute -top-1 -right-1 w-4 h-4 bg-deep-plum text-white text-[9px] font-bold rounded-full flex items-center justify-center">{{ cart.itemCount }}</span>
            </NuxtLink>
          </div>
        </nav>
      </div>

      <!-- Category Ribbon -->
      <div class="border-t border-rose-blush/40 bg-warm-ivory/30 lg:block hidden">
        <div class="page-container py-2 flex items-center justify-center">
          <nav class="flex items-center gap-1.5" aria-label="Category navigation ribbon">
            <NuxtLink to="/products?badge=new" :class="[route.query.badge === 'new' ? 'opacity-80 scale-105' : 'hover:opacity-80', 'px-4 py-1.5 text-xs font-ui font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#CBA39E] to-[#D4AF37] bg-clip-text text-transparent transition-all duration-200']">New Arrivals</NuxtLink>
            <NuxtLink to="/products?badge=bestseller" :class="[route.query.badge === 'bestseller' ? 'opacity-80 scale-105' : 'hover:opacity-80', 'px-4 py-1.5 text-xs font-ui font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#CBA39E] to-[#D4AF37] bg-clip-text text-transparent transition-all duration-200']">Bestsellers</NuxtLink>
            <NuxtLink v-for="cat in navCategories" :key="cat.slug" :to="`/products?category=${cat.slug}`" :class="[route.query.category === cat.slug ? 'bg-deep-plum text-white shadow-sm' : 'text-charcoal/80 hover:text-deep-plum hover:bg-rose-blush', 'px-4 py-1.5 text-xs font-ui font-semibold uppercase tracking-wider rounded-md transition-all duration-200']">{{ cat.name }}</NuxtLink>
            <NuxtLink to="/products?badge=sale" :class="[route.query.badge === 'sale' ? 'bg-red-500 text-white shadow-sm' : 'text-red-600 hover:bg-red-50', 'px-4 py-1.5 text-xs font-ui font-bold uppercase tracking-wider rounded-md transition-all duration-200']">Sale</NuxtLink>
            <NuxtLink to="/products" :class="[route.path === '/products' && !route.query.category && !route.query.badge ? 'bg-dusty-rose text-white shadow-sm' : 'text-deep-plum bg-rose-blush hover:bg-dusty-rose hover:text-white', 'px-4 py-1.5 text-xs font-ui font-semibold uppercase tracking-wider rounded-md transition-all duration-200']">3 FOR ₹1099</NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import categoriesData from '~/data/categories.json'

const ui = useUIStore()
const cart = useCartStore()
const wishlist = useWishlistStore()
const auth = useAuthStore()
const route = useRoute()

const isSearchIconOnly = computed(() => ['products', 'products-slug'].includes(route.name as string))

const handleNavShare = async () => {
  if (typeof window === 'undefined') return
  const url = window.location.href
  const title = document.title
  if (navigator.share) {
    try { await navigator.share({ title, url }) } catch { /* dismissed */ }
  } else {
    await navigator.clipboard.writeText(url)
    ui.addToast('success', 'Link copied! Share it with your friends. 🔗')
  }
}

const userInitials = computed(() => {
  const name = auth.user?.name || ''
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
})

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

// Animated search placeholder words
const searchWords = ['Bras', 'Lingerie', 'Panties', 'Shapewear', 'Activewear']
const wordIndex = ref(0)
const currentWord = ref(searchWords[0])
let typingTimer: ReturnType<typeof setTimeout> | null = null

const typeWord = (word: string, charIdx: number, cb: () => void) => {
  if (charIdx <= word.length) {
    currentWord.value = word.slice(0, charIdx)
    typingTimer = setTimeout(() => typeWord(word, charIdx + 1, cb), 100)
  } else {
    setTimeout(cb, 1400)
  }
}

const eraseWord = (word: string, charIdx: number, cb: () => void) => {
  if (charIdx >= 0) {
    currentWord.value = word.slice(0, charIdx)
    typingTimer = setTimeout(() => eraseWord(word, charIdx - 1, cb), 60)
  } else {
    setTimeout(cb, 300)
  }
}

const cycleWords = () => {
  const word = searchWords[wordIndex.value]
  typeWord(word, 0, () => {
    eraseWord(word, word.length, () => {
      wordIndex.value = (wordIndex.value + 1) % searchWords.length
      cycleWords()
    })
  })
}

// ── Scroll hide logic ──────────────────────────────────────────
// Mobile (<768px): direction-based — any scroll down hides, y===0 shows
// Desktop (≥768px): position-based — hide past 50% of first widget height
const navbarHidden = ref(false)
let lastScrollY = 0
let rafId = 0

const isMobile = () => window.innerWidth < 768

const onScroll = () => {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    const y = window.scrollY

    // Hide on scroll down, show on scroll up (both mobile & desktop)
    if (y <= 50) {
      navbarHidden.value = false
    } else if (y > lastScrollY) {
      navbarHidden.value = true
    } else if (y < lastScrollY) {
      navbarHidden.value = false
    }

    lastScrollY = y
  })
}

onMounted(() => {
  lastScrollY = window.scrollY
  navbarHidden.value = isMobile() ? window.scrollY > 0 : false

  window.addEventListener('scroll', onScroll, { passive: true })
  cycleWords()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(rafId)
  if (typingTimer) clearTimeout(typingTimer)
})
</script>

<style scoped>
.typed-word {
  display: inline;
  color: rgba(44, 44, 44, 0.4);
}
.typed-caret {
  display: inline;
  color: rgba(138, 79, 90, 0.55);
  font-weight: 200;
  animation: blink-cursor 0.85s step-end infinite;
  margin-left: 0;
}
@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* Search bar: stays in DOM (preserves space), only opacity animates */
.search-bar-wrap {
  transition: opacity 0.18s ease;
  will-change: opacity;
}
.search-bar-visible {
  opacity: 1;
  pointer-events: auto;
}
.search-bar-hidden {
  opacity: 0;
  pointer-events: none;   /* can't accidentally tap while invisible */
}
</style>
