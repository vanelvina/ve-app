<template>
  <div class="min-h-screen bg-warm-ivory pb-24 lg:pb-0">

    <!-- ── Breadcrumb ──────────────────────────────────────────────── -->
    <div class="bg-white border-b border-border-gray">
      <div class="page-container py-3">
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-xs font-ui text-mid-gray">
            <li><NuxtLink to="/" class="hover:text-deep-plum transition-colors">Home</NuxtLink></li>
            <li aria-hidden="true" class="text-border-gray">/</li>
            <li><NuxtLink to="/products" class="hover:text-deep-plum transition-colors">All Products</NuxtLink></li>
            <template v-if="activeCategory">
              <li aria-hidden="true" class="text-border-gray">/</li>
              <li class="text-charcoal font-medium">{{ activeCategory }}</li>
            </template>
          </ol>
        </nav>
      </div>
    </div>

    <!-- ── Pure CSS Category Hero ─────────────────────────────────── -->
    <div
      class="w-full relative overflow-hidden"
      :style="`background: ${categoryHero.bg};`"
      style="min-height: 104px;"
    >
      <!-- SVG dot-grid texture overlay (no img tag) -->
      <svg class="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="plp-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plp-dots)"/>
      </svg>

      <!-- Decorative blobs -->
      <div
        class="absolute -top-6 -right-6 w-36 h-36 rounded-full opacity-20 blur-2xl"
        :style="`background: ${categoryHero.blob1};`"
      />
      <div
        class="absolute bottom-0 left-1/3 w-24 h-24 rounded-full opacity-15 blur-2xl"
        :style="`background: ${categoryHero.blob2};`"
      />

      <!-- Content: tighter on mobile (-35%), slightly tighter on desktop (-15%) -->
      <div
        class="page-container relative z-10 flex flex-col justify-center plp-hero-inner"
        style="min-height: 104px; padding-top: 0.75rem; padding-bottom: 0.75rem;"
      >
        <!-- Eyebrow -->
        <p class="text-[9px] font-bold uppercase tracking-[0.2em] mb-1" :style="`color: ${categoryHero.accent};`">
          {{ activeCategory ? 'Collection' : 'All Products' }}
        </p>

        <!-- Title -->
        <h1
          class="font-serif font-bold leading-none text-white drop-shadow-sm"
          style="font-size: clamp(1.2rem, 3.5vw, 2.35rem);"
        >
          {{ activeCategory || 'Everything We Make' }}
        </h1>

        <!-- Description + count pill -->
        <div class="flex items-center gap-2.5 mt-2 flex-wrap">

          <span
            class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-ui backdrop-blur-sm"
            :style="`background: rgba(255,255,255,0.10); color: ${categoryHero.accent}; border: 1px solid rgba(255,255,255,0.12);`"
          >
            <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 00-1 1v1a1 1 0 002 0V6h1V5a1 1 0 00-1-1H3zm2 5a1 1 0 00-2 0v1a1 1 0 002 0V9zm0 4a1 1 0 10-2 0v1a1 1 0 102 0v-1zM7 5a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm1 4a1 1 0 000 2h8a1 1 0 000-2H8zm0 4a1 1 0 000 2h8a1 1 0 000-2H8z"/></svg>
            {{ primaryProducts.length }} {{ primaryProducts.length === 1 ? 'style' : 'styles' }}
          </span>
        </div>
      </div>
    </div>

    <div class="page-container py-6">
      <main id="product-listing" class="w-full">

        <!-- ── Results header ──────────────────────────────────────── -->
        <div class="flex items-center justify-between border-b border-border-gray/30 pb-3 mb-6">
          <p class="text-sm text-mid-gray font-ui">
            <span class="font-semibold text-charcoal">{{ primaryProducts.length }}</span>
            {{ activeCategory ? `products in ${activeCategory}` : 'products' }}
          </p>
          <!-- Sort pills (desktop only) -->
          <div class="hidden lg:flex items-center gap-2 flex-wrap">
            <span class="text-xs text-mid-gray font-ui shrink-0">Sort:</span>
            <button
              v-for="option in sortOptions"
              :key="option.value"
              @click="selectSortOption(option.value)"
              class="px-3 py-1.5 text-[11px] font-ui font-semibold rounded-full border transition-all"
              :class="sortValue === option.value
                ? 'bg-deep-plum text-white border-deep-plum'
                : 'border-border-gray text-mid-gray hover:border-deep-plum hover:text-deep-plum'"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Desktop Quick Filter Chips (lg:flex, hidden on mobile) -->
        <div v-if="quickFilterChips.length > 0" class="hidden lg:flex gap-2 items-center mb-6 flex-wrap">
          <span class="text-xs text-mid-gray font-ui shrink-0">Filter by:</span>
          <button
            v-for="chip in quickFilterChips"
            :key="chip.value"
            class="px-3.5 py-1.5 rounded-full text-[11px] font-bold font-ui tracking-wide border transition-all duration-200"
            :class="activeQuickFilter === chip.value
              ? 'bg-deep-plum text-white border-deep-plum shadow-sm'
              : 'bg-white text-charcoal border-border-gray hover:border-deep-plum hover:text-deep-plum'"
            @click="toggleQuickFilter(chip.value)"
          >
            {{ chip.label }}
          </button>
          <button
            v-if="activeQuickFilter"
            @click="toggleQuickFilter(activeQuickFilter)"
            class="text-xs text-deep-plum hover:text-dusty-rose underline ml-3 font-ui font-semibold"
          >
            Clear Quick Filter
          </button>
        </div>

        <!-- ── Empty state ─────────────────────────────────────────── -->
        <div v-if="primaryProducts.length === 0 && !store.loading" class="py-20 text-center">
          <div class="text-6xl mb-4" aria-hidden="true">🔍</div>
          <h3 class="font-serif text-xl text-deep-plum mb-2">No products found</h3>
          <p class="text-mid-gray font-ui text-sm mb-6">Try adjusting your filters or explore our full collection.</p>
          <AppButton @click="store.resetFilters">Clear All Filters</AppButton>
        </div>

        <!-- ── PRIMARY PRODUCT GRID ────────────────────────────────── -->
        <div v-if="primaryProducts.length > 0" class="product-grid">
          <ProductCard
            v-for="product in visiblePrimary"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- IntersectionObserver sentinel: only within primary results -->
        <div
          v-if="hasMorePrimary"
          ref="sentinel"
          class="w-full py-8 flex items-center justify-center"
          aria-live="polite"
        >
          <div class="flex gap-2.5 items-center">
            <div class="w-2.5 h-2.5 rounded-full bg-dusty-rose dot-bounce dot-delay-1" />
            <div class="w-2.5 h-2.5 rounded-full bg-mid-gray dot-bounce dot-delay-2" />
            <div class="w-2.5 h-2.5 rounded-full bg-dusty-rose dot-bounce dot-delay-3" />
          </div>
        </div>

        <!-- ── END-OF-CATEGORY BANNER ──────────────────────────────── -->
        <div
          v-if="primaryProducts.length > 0 && !hasMorePrimary"
          class="my-8 mx-auto max-w-2xl text-center"
        >
          <div class="flex items-center gap-4 mb-8">
            <div class="flex-1 h-px bg-gradient-to-r from-transparent via-rose-blush to-deep-plum/20" />
            <div class="w-8 h-8 rounded-full bg-rose-blush/30 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-deep-plum" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1 h-px bg-gradient-to-l from-transparent via-rose-blush to-deep-plum/20" />
          </div>
          <p class="text-[11px] font-ui font-bold uppercase tracking-widest text-dusty-rose mb-3">You've seen it all</p>
          <!-- <h2 class="font-serif text-2xl md:text-3xl text-deep-plum font-bold mb-3">
            {{ activeCategory ? `That's our full ${activeCategory} collection` : "You've reached the end" }}
          </h2> -->
          <div class="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <NuxtLink
              to="/products?sort=newest"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-plum text-white rounded-full text-xs font-bold font-ui hover:bg-[#473021] transition-all shadow-lg shadow-deep-plum/20"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              See New Arrivals
            </NuxtLink>
            <button
              v-if="activeCategory"
              @click="store.resetFilters"
              class="inline-flex items-center gap-2 px-5 py-2.5 border border-deep-plum/30 text-deep-plum rounded-full text-xs font-bold font-ui hover:bg-rose-blush/10 transition-all"
            >
              View All Products
            </button>
          </div>
        </div>

        <!-- ── RELATED PRODUCTS SHELF ──────────────────────────────── -->
        <section
          v-if="relatedProducts.length > 0 && !hasMorePrimary && primaryProducts.length > 0"
          class="mt-4 mb-16"
          aria-label="You might also like"
        >
          <div class="flex items-end justify-between mb-5">
            <div>
              <p class="text-[10px] font-bold uppercase tracking-widest text-dusty-rose font-ui mb-1">From our collection</p>
              <h2 class="font-serif text-xl md:text-2xl text-deep-plum font-bold">You Might Also Like</h2>
            </div>
          </div>
          <!-- Horizontal scroll on mobile, normal grid on desktop -->
          <div class="-mx-4 px-4 overflow-x-auto md:overflow-visible md:mx-0 md:px-0">
            <div class="flex gap-4 md:grid md:product-grid w-max md:w-auto">
              <div
                v-for="product in relatedProducts"
                :key="product.id"
                class="w-44 md:w-auto shrink-0"
              >
                <ProductCard :product="product" />
              </div>
            </div>
          </div>
        </section>

        <!-- ── OTHER CATEGORIES PREVIEW ────────────────────────────── -->
        <section
          v-if="otherCategoryGroups.length > 0 && !hasMorePrimary && primaryProducts.length > 0"
          class="mt-4"
          aria-label="Explore other styles"
        >
          <div class="mb-8">
            <p class="text-[10px] font-bold uppercase tracking-widest text-dusty-rose font-ui mb-1">Keep exploring</p>
            <h2 class="font-serif text-xl md:text-2xl text-deep-plum font-bold">More Styles to Love</h2>
          </div>
          <div class="space-y-12">
            <div v-for="group in otherCategoryGroups" :key="group.category">
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-rose-blush/20">
                <h3 class="font-serif text-lg text-charcoal font-semibold">{{ group.category }}</h3>
                <NuxtLink
                  :to="`/products?category=${encodeURIComponent(group.categorySlug)}`"
                  class="text-xs font-ui font-semibold text-deep-plum hover:text-dusty-rose transition-colors flex items-center gap-1"
                >
                  View all {{ group.total }}
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </NuxtLink>
              </div>
              <div class="product-grid">
                <ProductCard v-for="product in group.products" :key="product.id" :product="product" />
              </div>
            </div>
          </div>

          <!-- Absolute end message -->
          <div class="mt-16 py-10 text-center border-t border-rose-blush/20">
            <p class="text-[11px] font-ui text-mid-gray uppercase tracking-widest mb-2">You've reached the end of our catalogue</p>
            <p class="font-serif text-deep-plum text-lg">New collections drop every season ✨</p>
            <p class="text-xs text-mid-gray font-ui mt-2">Follow us <span class="text-deep-plum font-semibold">@vanelvina</span> to be first in line for new arrivals.</p>
          </div>
        </section>

      </main>
    </div>

    <!-- ── Mobile Quick Filter Chips ─────────────────────────────── -->
    <div
      class="lg:hidden fixed bottom-14 left-0 right-0 z-40 bg-white border-t border-border-gray/40 py-2 px-3 shadow-sm transition-transform duration-300"
      :class="filtersScrollHidden ? 'translate-y-full' : 'translate-y-0'"
    >
      <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
        <button
          v-for="chip in quickFilterChips"
          :key="chip.value"
          class="shrink-0 px-3 py-1 rounded-full text-[11px] font-bold font-ui tracking-wide border transition-all duration-200 whitespace-nowrap"
          :class="activeQuickFilter === chip.value
            ? 'bg-deep-plum text-white border-deep-plum shadow-sm'
            : 'bg-white text-charcoal border-border-gray hover:border-deep-plum hover:text-deep-plum'"
          @click="toggleQuickFilter(chip.value)"
        >
          {{ chip.label }}
        </button>
      </div>
    </div>

    <!-- ── Mobile Sticky Bottom Bar ───────────────────────────────── -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border-gray flex h-14 shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
      <button class="flex-1 flex items-center justify-center gap-2 border-r border-border-gray font-ui text-sm font-semibold text-charcoal hover:bg-gray-50 transition-colors" @click="sortDrawerOpen = true">
        <svg class="w-4 h-4 text-mid-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg>
        Sort
      </button>
      <button class="flex-1 flex items-center justify-center gap-2 border-r border-border-gray font-ui text-sm font-semibold text-charcoal hover:bg-gray-50 transition-colors" @click="ui.openFilterDrawer">
        <svg class="w-4 h-4 text-mid-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm4 4a1 1 0 011-1h2a1 1 0 010 2h-2a1 1 0 01-1-1z"/></svg>
        Filter
      </button>
      <button class="flex-1 flex items-center justify-center gap-2 font-ui text-sm font-semibold text-charcoal hover:bg-gray-50 transition-colors" @click="ui.openSizeGuide">
        <svg class="w-4 h-4 text-mid-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="10" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 7v4M10 7v4M14 7v4M18 7v4"/>
        </svg>
        Size
      </button>
    </div>

    <!-- ── Mobile Filter Drawer ────────────────────────────────────── -->
    <Transition name="fade">
      <div v-if="ui.filterDrawerOpen" class="overlay-backdrop lg:hidden" @click="ui.closeFilterDrawer" aria-hidden="true" />
    </Transition>
    <Transition name="slide-up">
      <div v-if="ui.filterDrawerOpen" class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-modal p-6 max-h-[85vh] overflow-y-auto lg:hidden" role="dialog" aria-modal="true" aria-label="Filter products">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-ui font-semibold text-charcoal">Filters</h2>
          <button class="btn-icon" aria-label="Close filters" @click="ui.closeFilterDrawer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="mb-5">
          <h3 class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3">Category</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories.filter(c => c.slug !== 'all')"
              :key="cat._id"
              class="filter-chip"
              :class="{ active: selectedCategories.includes(cat.name) }"
              @click="toggleCategory(cat.name)"
            >
              {{ cat.name }}
            </button>
          </div>
        </div>
        <div v-if="inventoryColors.length > 0" class="mb-5">
          <h3 class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3">Color</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="col in inventoryColors"
              :key="col.name"
              class="filter-chip flex items-center gap-1.5"
              :class="{ active: selectedColors.includes(col.name) }"
              @click="toggleColor(col.name)"
            >
              <span
                class="w-3 h-3 rounded-full border border-black/20 shrink-0"
                :style="{ backgroundColor: col.hex }"
              />
              {{ col.name }}
            </button>
          </div>
        </div>
        <AppButton :full="true" @click="ui.closeFilterDrawer">Apply Filters</AppButton>
      </div>
    </Transition>

    <!-- ── Mobile Sort Drawer ──────────────────────────────────────── -->
    <Transition name="fade">
      <div v-if="sortDrawerOpen" class="overlay-backdrop lg:hidden" @click="sortDrawerOpen = false" aria-hidden="true" />
    </Transition>
    <Transition name="slide-up">
      <div v-if="sortDrawerOpen" class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-modal p-6 max-h-[85vh] overflow-y-auto lg:hidden" role="dialog" aria-modal="true" aria-label="Sort products">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-ui font-semibold text-charcoal">Sort By</h2>
          <button class="btn-icon" aria-label="Close sort" @click="sortDrawerOpen = false">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="space-y-1">
          <button
            v-for="option in sortOptions"
            :key="option.value"
            class="w-full flex items-center justify-between py-3 px-2 text-sm font-ui transition-colors text-charcoal border-b border-border-gray/30 last:border-b-0 hover:bg-rose-blush/10 text-left"
            :class="{ 'text-deep-plum font-semibold': sortValue === option.value }"
            @click="selectSortOption(option.value)"
          >
            {{ option.label }}
            <svg v-if="sortValue === option.value" class="w-4 h-4 text-deep-plum" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
          </button>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import categoriesData from '~/data/categories.json'
import type { SortOption } from '~/types'

definePageMeta({ pageTransition: false })

const store = useProductsStore()
const ui = useUIStore()
const route = useRoute()

const { saveScroll, restoreScroll } = useScrollRestore()

// ── How many primary results to reveal via IntersectionObserver ───────
const visibleCount = ref(12)
const PAGE_SIZE = 12

// ── Tier 1: Products that exactly match current filters ───────────────
const primaryProducts = computed(() => store.filtered)

// Slice of primary results currently visible
const visiblePrimary = computed(() => primaryProducts.value.slice(0, visibleCount.value))

// True while there are more primary results to reveal
const hasMorePrimary = computed(() => visibleCount.value < primaryProducts.value.length)

// ── Active category display label ─────────────────────────────────────
const activeCategory = computed(() => {
  const cats = store.filters.categories
  if (cats.length === 1) return cats[0]
  if (cats.length > 1) return cats.join(' & ')
  return ''
})

// ── Per-category CSS hero palette — rich 4-stop directional gradients ─
const CATEGORY_PALETTES: Record<string, { bg: string; blob1: string; blob2: string; accent: string }> = {
  // Bras — warm rose-magenta diagonal
  'bra': {
    bg: 'linear-gradient(150deg, #3B0A2A 0%, #6D1F4A 28%, #A33068 60%, #C4527E 100%)',
    blob1: '#F472B6', blob2: '#EC4899', accent: '#FBCFE8'
  },
  // Panties — violet-grape diagonal (opposite angle)
  'pant': {
    bg: 'linear-gradient(30deg, #1E0A3C 0%, #3B1A6D 30%, #6B35A8 65%, #9356CC 100%)',
    blob1: '#A78BFA', blob2: '#7C3AED', accent: '#EDE9FE'
  },
  // Shapewear — deep navy → electric teal
  'shape': {
    bg: 'linear-gradient(120deg, #0B1F3A 0%, #0E3A5C 35%, #0F6688 65%, #1695B7 100%)',
    blob1: '#38BDF8', blob2: '#0EA5E9', accent: '#BAE6FD'
  },
  // Sleepwear — midnight-blue → soft lavender
  'sleep': {
    bg: 'linear-gradient(160deg, #0F0C29 0%, #1E1B6A 35%, #4338CA 68%, #6D5FE8 100%)',
    blob1: '#818CF8', blob2: '#C4B5FD', accent: '#E0E7FF'
  },
  // Activewear — dark forest → lime accent
  'active': {
    bg: 'linear-gradient(140deg, #0A1F0A 0%, #1A3D1A 30%, #2E6B2E 60%, #4CAF50 100%)',
    blob1: '#4ADE80', blob2: '#86EFAC', accent: '#DCFCE7'
  },
  // Maternity — warm amber-sienna diagonal
  'matern': {
    bg: 'linear-gradient(125deg, #2C1500 0%, #6B3300 32%, #A85200 62%, #D97706 100%)',
    blob1: '#FCD34D', blob2: '#F59E0B', accent: '#FEF3C7'
  },
  // Lingerie — deep burgundy to champagne
  'linger': {
    bg: 'linear-gradient(145deg, #280D1A 0%, #5C1A33 32%, #8B3254 64%, #B5637A 100%)',
    blob1: '#FDA4AF', blob2: '#FB7185', accent: '#FFE4E6'
  },
  // Sports — charcoal to electric blue
  'sport': {
    bg: 'linear-gradient(110deg, #0A0A0A 0%, #1A2035 32%, #1D3461 64%, #1E5FA8 100%)',
    blob1: '#60A5FA', blob2: '#3B82F6', accent: '#BFDBFE'
  },
}

const categoryHero = computed(() => {
  const cat = activeCategory.value?.toLowerCase() ?? ''
  for (const [key, palette] of Object.entries(CATEGORY_PALETTES)) {
    if (cat.includes(key)) return palette
  }
  // Default: Van Elvina deep plum-rose signature (4-stop)
  return {
    bg: 'linear-gradient(135deg, #1E0808 0%, #4A1020 28%, #7A2840 56%, #A0526A 100%)',
    blob1: '#F9A8D4', blob2: '#E879A0', accent: '#FCE7F3'
  }
})

// ── Tier 2: Related — same subcategory, not in primary ────────────────
const relatedProducts = computed(() => {
  if (!activeCategory.value) return []
  const primaryIds = new Set(primaryProducts.value.map(p => p.id))
  const activeSubs = new Set<string>()
  primaryProducts.value.forEach(p => { if (p.subcategory) activeSubs.add(p.subcategory.toLowerCase()) })
  return store.all
    .filter(p => !primaryIds.has(p.id) && p.subcategory && activeSubs.has(p.subcategory.toLowerCase()))
    .slice(0, 8)
})

// ── Tier 3: Other category groups (3 preview cards each) ─────────────
const otherCategoryGroups = computed(() => {
  const primaryIds = new Set(primaryProducts.value.map(p => p.id))
  const relatedIds = new Set(relatedProducts.value.map(p => p.id))
  const activeCatsLower = new Set(store.filters.categories.map(c => c.toLowerCase()))

  const buckets = new Map<string, { slug: string; products: any[] }>()
  store.all.forEach(p => {
    if (primaryIds.has(p.id) || relatedIds.has(p.id)) return
    const cats = (p.category || '').split(',').map(s => s.trim()).filter(Boolean)
    cats.forEach(cat => {
      if (activeCatsLower.has(cat.toLowerCase())) return
      if (!buckets.has(cat)) {
        const catData = categories.value.find((c: any) => c.name.toLowerCase() === cat.toLowerCase())
        buckets.set(cat, { slug: catData?.slug || cat.toLowerCase().replace(/\s+/g, '-'), products: [] })
      }
      buckets.get(cat)!.products.push(p)
    })
  })

  return Array.from(buckets.entries())
    .filter(([, d]) => d.products.length > 0)
    .map(([cat, d]) => ({ category: cat, categorySlug: d.slug, total: d.products.length, products: d.products.slice(0, 3) }))
    .sort((a, b) => b.total - a.total)
})

// ── Intersection Observer sentinel ────────────────────────────────────
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const loadMore = () => { if (hasMorePrimary.value) visibleCount.value += PAGE_SIZE }

const setupObserver = () => {
  observer?.disconnect(); observer = null
  if (typeof window === 'undefined' || !('IntersectionObserver' in window) || !sentinel.value) return
  observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && hasMorePrimary.value) loadMore()
  }, { rootMargin: '300px' })
  observer.observe(sentinel.value)
}

// ── Categories list ───────────────────────────────────────────────────
const categories = ref<any[]>(categoriesData)
const loadCategories = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/categories`, { silent: true })
    if (data?.length) categories.value = data
  } catch {}
}

// ── Filter & sort state ───────────────────────────────────────────────
const selectedCategories = computed({
  get: () => store.filters.categories,
  set: val => store.setFilters({ categories: val })
})

const selectedColors = computed({
  get: () => store.filters.colors,
  set: val => store.setFilters({ colors: val })
})

const sortValue = ref<SortOption>('popularity')
const sortDrawerOpen = ref(false)

const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'newest',     label: 'Newest First' },
  { value: 'price-asc',  label: 'Low to High' },
  { value: 'price-desc', label: 'High to Low' },
  { value: 'discount',   label: 'Best Discount' },
] as const

const selectSortOption = (val: SortOption) => {
  sortValue.value = val
  sortDrawerOpen.value = false
}

const toggleCategory = (cat: string) => {
  const current = [...selectedCategories.value]
  const idx = current.indexOf(cat)
  if (idx === -1) current.push(cat); else current.splice(idx, 1)
  selectedCategories.value = current
}

const toggleColor = (color: string) => {
  const current = [...selectedColors.value]
  const idx = current.indexOf(color)
  if (idx === -1) current.push(color); else current.splice(idx, 1)
  selectedColors.value = current
}

const inventoryColors = computed(() => {
  const inStockProducts = store.all.filter(
    p => p.inStock !== false && (p.stockCount === undefined || p.stockCount > 0)
  )
  const colorMap = new Map<string, { name: string; hex: string }>()
  inStockProducts.forEach(p => {
    ;(p.variants || []).forEach(v => {
      if (v.color && !colorMap.has(v.color.trim())) {
        colorMap.set(v.color.trim(), { name: v.color.trim(), hex: v.colorHex || '#E5E7EB' })
      }
    })
  })
  return Array.from(colorMap.values())
})

// ── Mobile Quick Filter Chips ─────────────────────────────────────────────
const MASTER_QUICK_FILTERS = [
  { label: 'Padded',        value: 'padded' },
  { label: 'Non-Padded',    value: 'non-padded' },
  { label: 'T-Shirt Bra',   value: 't-shirt bra' },
  { label: 'Full Coverage', value: 'full coverage' },
  { label: 'Cotton',        value: 'cotton' },
  { label: 'Bridal',        value: 'bridal' },
  { label: 'Sports',        value: 'sports' },
  { label: 'Underwired',    value: 'underwired' },
  { label: 'Seamless',      value: 'seamless' },
  { label: 'New Arrival',   value: 'new arrival' },
  { label: 'Bestseller',    value: 'bestseller' },
  { label: 'Trending',      value: 'trending' },
  { label: 'Comfort',       value: 'comfort' },
  { label: 'Premium',       value: 'premium' },
  { label: 'Daily Wear',    value: 'daily-wear' },
]

const quickFilterChips = computed(() => {
  let products = store.all
  if (selectedCategories.value.length > 0) {
    products = store.all.filter((p) => {
      const productCats = (p.category || '').split(',').map(s => s.trim().toLowerCase())
      return selectedCategories.value.some(c => productCats.includes(c.toLowerCase()))
    })
  }

  const availableTags = new Set<string>()
  products.forEach(p => {
    if (p.tags) {
      p.tags.forEach(t => availableTags.add(t.toLowerCase().trim()))
    }
  })

  return MASTER_QUICK_FILTERS.filter(chip => availableTags.has(chip.value))
})

const activeQuickFilter = ref<string>('')

const toggleQuickFilter = (value: string) => {
  if (activeQuickFilter.value === value) {
    activeQuickFilter.value = ''
    store.setFilters({ tags: [] })
  } else {
    activeQuickFilter.value = value
    store.setFilters({ tags: [value] })
  }
}

// ── Category banner ───────────────────────────────────────────────────
const activeCategoryBanner = computed(() => {
  const catQuery = route.query.category || route.query.categories
  if (!catQuery) return categories.value.find((c: any) => c.slug === 'all') || null
  const slugStr = Array.isArray(catQuery) ? catQuery[0] : String(catQuery)
  return categories.value.find((c: any) => c.slug.toLowerCase() === slugStr.toLowerCase()) || null
})

// ── Route query → store filters ───────────────────────────────────────
const parseRouteQueries = () => {
  const queryCategory = route.query.category || route.query.categories
  let categoriesArray: string[] = []
  if (queryCategory) {
    const cats = Array.isArray(queryCategory) ? queryCategory : String(queryCategory).split(',').map(s => s.trim())
    categoriesArray = cats.map(c => {
      const match = categories.value.find((cat: any) => cat.name.toLowerCase() === c.toLowerCase())
      return match ? match.name : c
    })
  }
  const querySize = route.query.size || route.query.sizes
  const sizesArray: string[] = querySize
    ? (Array.isArray(querySize) ? querySize as string[] : String(querySize).split(',').map(s => s.trim()))
    : []
  const queryColor = route.query.color || route.query.colors
  const colorsArray: string[] = queryColor
    ? (Array.isArray(queryColor) ? queryColor as string[] : String(queryColor).split(',').map(s => s.trim()))
    : []
  store.setFilters({ categories: categoriesArray, sizes: sizesArray, colors: colorsArray })
}

// Reset visible window when filters change
watch(() => store.filters, () => {
  visibleCount.value = PAGE_SIZE
  nextTick(setupObserver)
}, { deep: true })

watch(sentinel, () => { if (sentinel.value) setupObserver() })
watch(sortValue, val => store.setSort(val))
watch(() => store.filters.tags, (newTags) => {
  if (!newTags || newTags.length === 0) {
    activeQuickFilter.value = ''
  } else {
    activeQuickFilter.value = newTags[0]
  }
}, { deep: true })

watch(() => route.query, parseRouteQueries, { deep: true })

// ── Mobile scroll-hide for quick filter bar ──────────────────────────────
const filtersScrollHidden = ref(false)
let scrollStopTimer: ReturnType<typeof setTimeout> | null = null

const onPlpScroll = () => {
  // Only apply on mobile (lg breakpoint = 1024px)
  if (window.innerWidth >= 1024) return
  filtersScrollHidden.value = true
  if (scrollStopTimer) clearTimeout(scrollStopTimer)
  scrollStopTimer = setTimeout(() => {
    filtersScrollHidden.value = false
  }, 150)
}

onMounted(() => {
  parseRouteQueries()
  loadCategories()
  restoreScroll()
  nextTick(setupObserver)
  window.addEventListener('scroll', onPlpScroll, { passive: true })
})

onUnmounted(() => {
  observer?.disconnect()
  saveScroll()
  window.removeEventListener('scroll', onPlpScroll)
  if (scrollStopTimer) clearTimeout(scrollStopTimer)
})

useSeoMeta({
  title: 'All Products – Van Elvina | Premium Women\'s Innerwear',
  description: 'Browse our complete collection of premium women\'s innerwear — bras, panties, shapewear, sleepwear, activewear, and maternity. Shop now with free shipping above ₹499.',
})
</script>

<style scoped>
/* Desktop banner: ~15% taller than mobile (136px vs 104px) */
@media (min-width: 768px) {
  .plp-hero-inner {
    min-height: 136px !important;
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); opacity: 0; }

/* Hide scrollbar on horizontal shelf */
.overflow-x-auto { scrollbar-width: none; -ms-overflow-style: none; }
.overflow-x-auto::-webkit-scrollbar { display: none; }

.dot-bounce { animation: dotBounce 1.4s infinite ease-in-out; }
.dot-delay-1 { animation-delay: -0.32s; }
.dot-delay-2 { animation-delay: -0.16s; }
.dot-delay-3 { animation-delay: 0s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1.15); opacity: 1; }
}
</style>

