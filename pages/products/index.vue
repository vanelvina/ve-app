<template>
  <div class="min-h-screen bg-warm-ivory">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-border-gray">
      <div class="page-container py-3">
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-xs font-ui text-mid-gray">
            <li><NuxtLink to="/" class="hover:text-deep-plum">Home</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li class="text-charcoal font-medium">All Products</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Category Dynamic PLP Banner -->
    <div v-if="activeCategoryBanner && (activeCategoryBanner.plpBanner || activeCategoryBanner.plpBannerMobile)" class="w-full bg-rose-blush/10 border-b border-border-gray">
      <div class="page-container py-4">
        <div class="relative overflow-hidden rounded-2xl shadow-soft aspect-[21/9] md:aspect-[21/6] bg-warm-ivory border border-border-gray">
          <!-- Desktop Banner -->
          <img 
            v-if="activeCategoryBanner.plpBanner" 
            :src="activeCategoryBanner.plpBanner" 
            :alt="`${activeCategoryBanner.name} Banner`" 
            class="hidden md:block w-full h-full object-cover" 
          />
          <!-- Mobile Banner -->
          <img 
            v-if="activeCategoryBanner.plpBannerMobile" 
            :src="activeCategoryBanner.plpBannerMobile" 
            :alt="`${activeCategoryBanner.name} Banner`" 
            class="md:hidden w-full h-full object-cover" 
          />
          <!-- Elegant Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
            <h2 class="font-serif text-2xl md:text-4xl text-white font-bold leading-tight drop-shadow-md">{{ activeCategoryBanner.name }}</h2>
            <p v-if="activeCategoryBanner.description" class="text-white/90 text-xs md:text-sm font-ui mt-1 max-w-lg drop-shadow-sm">{{ activeCategoryBanner.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="page-container py-6">
      <!-- Main content -->
      <main class="w-full" id="product-listing">
        <!-- Products count header -->
        <div class="flex items-center justify-between border-b border-border-gray/30 pb-3 mb-6">
          <p class="text-sm text-mid-gray font-ui">
            Showing <span class="font-semibold text-charcoal">{{ store.totalCount }}</span> products
          </p>
        </div>

        <!-- Product grid -->
        <div class="product-grid">
          <ProductCard
            v-for="product in store.paginated"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Empty state -->
        <div v-if="store.totalCount === 0" class="py-20 text-center">
          <div class="text-6xl mb-4" aria-hidden="true">🔍</div>
          <h3 class="font-serif text-xl text-deep-plum mb-2">No products found</h3>
          <p class="text-mid-gray font-ui text-sm mb-6">Try adjusting your filters.</p>
          <AppButton @click="store.resetFilters">Clear All Filters</AppButton>
        </div>

        <!-- Pagination -->
        <div v-if="store.totalPages > 1" class="mt-10 flex items-center justify-center gap-2">
          <button
            class="px-3 py-2 border border-border-gray rounded-lg text-sm font-ui hover:border-dusty-rose disabled:opacity-40"
            :disabled="store.page === 1"
            aria-label="Previous page"
            @click="store.setPage(store.page - 1)"
          >
            ‹
          </button>
          <button
            v-for="p in store.totalPages"
            :key="p"
            class="w-9 h-9 rounded-lg text-sm font-ui transition-colors"
            :class="store.page === p ? 'bg-deep-plum text-white' : 'border border-border-gray text-charcoal hover:border-dusty-rose'"
            :aria-label="`Page ${p}`"
            :aria-current="store.page === p ? 'page' : undefined"
            @click="store.setPage(p)"
          >
            {{ p }}
          </button>
          <button
            class="px-3 py-2 border border-border-gray rounded-lg text-sm font-ui hover:border-dusty-rose disabled:opacity-40"
            :disabled="store.page === store.totalPages"
            aria-label="Next page"
            @click="store.setPage(store.page + 1)"
          >
            ›
          </button>
        </div>
      </main>
    </div>

    <!-- Mobile Sticky Bottom Bar (Sort, Filter, Size) -->
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

    <!-- Mobile Filter Drawer -->
    <Transition name="fade">
      <div v-if="ui.filterDrawerOpen" class="overlay-backdrop lg:hidden" @click="ui.closeFilterDrawer" aria-hidden="true" />
    </Transition>
    <Transition name="slide-up">
      <div
        v-if="ui.filterDrawerOpen"
        class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-modal p-6 max-h-[85vh] overflow-y-auto lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
      >
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-ui font-semibold text-charcoal">Filters</h2>
          <button class="btn-icon" aria-label="Close filters" @click="ui.closeFilterDrawer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Category -->
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
        <AppButton :full="true" @click="ui.closeFilterDrawer">Apply Filters</AppButton>
      </div>
    </Transition>

    <!-- Mobile Sort Drawer -->
    <Transition name="fade">
      <div v-if="sortDrawerOpen" class="overlay-backdrop lg:hidden" @click="sortDrawerOpen = false" aria-hidden="true" />
    </Transition>
    <Transition name="slide-up">
      <div
        v-if="sortDrawerOpen"
        class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-modal p-6 max-h-[85vh] overflow-y-auto lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Sort products"
      >
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-ui font-semibold text-charcoal">Sort By</h2>
          <button class="btn-icon" aria-label="Close sort" @click="sortDrawerOpen = false">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
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
            <svg v-if="sortValue === option.value" class="w-4 h-4 text-deep-plum" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import categoriesData from '~/data/categories.json'
import type { SortOption } from '~/types'

const store = useProductsStore()
const ui = useUIStore()

// Dynamic Categories Fetch
const categories = ref<any[]>(categoriesData)
const loadCategories = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/categories`)
    if (data && data.length) {
      categories.value = data
    }
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}

const route = useRoute()

const selectedCategories = computed({
  get: () => store.filters.categories,
  set: (val) => store.setFilters({ categories: val })
})

const priceRange = computed({
  get: () => store.filters.priceRange,
  set: (val) => store.setFilters({ priceRange: val })
})

const selectedRating = computed({
  get: () => store.filters.rating,
  set: (val) => store.setFilters({ rating: val })
})

const inStockOnly = computed({
  get: () => store.filters.inStock,
  set: (val) => store.setFilters({ inStock: val })
})

const sortValue = ref<SortOption>('popularity')
const sortDrawerOpen = ref(false)

const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Best Discount' }
] as const

const selectSortOption = (val: SortOption) => {
  sortValue.value = val
  sortDrawerOpen.value = false
}

const toggleCategory = (cat: string) => {
  const current = [...selectedCategories.value]
  const idx = current.indexOf(cat)
  if (idx === -1) {
    current.push(cat)
  } else {
    current.splice(idx, 1)
  }
  selectedCategories.value = current
}

const activeCategoryBanner = computed(() => {
  const catQuery = route.query.category || route.query.categories
  if (!catQuery) {
    return categories.value.find((c: any) => c.slug === 'all') || null
  }
  const slugStr = Array.isArray(catQuery) ? catQuery[0] : String(catQuery)
  return categories.value.find((c: any) => c.slug.toLowerCase() === slugStr.toLowerCase()) || null
})

const parseRouteQueries = () => {
  let queryCategory = route.query.category || route.query.categories
  let categoriesArray: string[] = []
  if (queryCategory) {
    const cats = Array.isArray(queryCategory) 
      ? queryCategory 
      : String(queryCategory).split(',').map(s => s.trim())
    categoriesArray = cats.map(c => {
      const matched = categories.value.find((cat: any) => cat.name.toLowerCase() === c.toLowerCase())
      return matched ? matched.name : c
    })
  }

  let querySize = route.query.size || route.query.sizes
  let sizesArray: string[] = []
  if (querySize) {
    sizesArray = Array.isArray(querySize) 
      ? querySize 
      : String(querySize).split(',').map(s => s.trim())
  }

  let queryColor = route.query.color || route.query.colors
  let colorsArray: string[] = []
  if (queryColor) {
    colorsArray = Array.isArray(queryColor) 
      ? queryColor 
      : String(queryColor).split(',').map(s => s.trim())
  }

  store.setFilters({
    categories: categoriesArray,
    sizes: sizesArray,
    colors: colorsArray
  })
}

onMounted(() => {
  parseRouteQueries()
  loadCategories()
})

watch(() => route.query, () => {
  parseRouteQueries()
}, { deep: true })

watch(sortValue, (val) => store.setSort(val))

useSeoMeta({
  title: 'All Products – Van Elvina | Premium Women\'s Innerwear',
  description: 'Browse our complete collection of premium women\'s innerwear — bras, panties, shapewear, sleepwear, activewear, and maternity. Shop now with free shipping above ₹999.',
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); opacity: 0; }
</style>
