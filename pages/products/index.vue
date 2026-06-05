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

    <div class="page-container py-6">
      <div class="flex gap-6">
        <!-- Filter Sidebar (desktop) -->
        <aside class="hidden lg:block w-64 shrink-0" aria-label="Product filters">
          <div class="sticky top-24 bg-white rounded-2xl shadow-soft p-5 border border-border-gray">
            <div class="flex items-center justify-between mb-5">
              <h2 class="font-ui font-semibold text-charcoal">Filters</h2>
              <button
                class="text-xs text-dusty-rose font-ui hover:text-deep-plum"
                @click="store.resetFilters"
              >
                Clear All
              </button>
            </div>

            <!-- Category filter -->
            <div class="mb-6">
              <h3 class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3">Category</h3>
              <div class="space-y-2">
                <label
                  v-for="cat in categories"
                  :key="cat.id"
                  class="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    :value="cat.name"
                    v-model="selectedCategories"
                    class="w-4 h-4 rounded border-border-gray text-deep-plum focus:ring-dusty-rose"
                    :aria-label="cat.name"
                  />
                  <span class="text-sm font-ui text-charcoal group-hover:text-deep-plum transition-colors">
                    {{ cat.name }}
                  </span>
                  <span class="ml-auto text-xs text-mid-gray">{{ cat.productCount }}</span>
                </label>
              </div>
            </div>

            <!-- Price range -->
            <div class="mb-6">
              <h3 class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3">
                Price: ₹{{ priceRange[0] }} – ₹{{ priceRange[1] }}
              </h3>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                v-model="priceRange[1]"
                class="w-full accent-deep-plum"
                :aria-label="`Maximum price: ₹${priceRange[1]}`"
              />
            </div>

            <!-- Rating filter -->
            <div class="mb-6">
              <h3 class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3">Min Rating</h3>
              <div class="space-y-2">
                <label
                  v-for="r in [4, 3, 2]"
                  :key="r"
                  class="flex items-center gap-2.5 cursor-pointer"
                >
                  <input
                    type="radio"
                    :value="r"
                    v-model="selectedRating"
                    name="rating"
                    class="w-4 h-4 text-deep-plum"
                    :aria-label="`${r} stars and above`"
                  />
                  <AppRating :rating="r" />
                  <span class="text-xs text-mid-gray font-ui">& above</span>
                </label>
              </div>
            </div>

            <!-- In stock -->
            <div>
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="inStockOnly"
                  class="w-4 h-4 rounded border-border-gray text-deep-plum"
                  aria-label="In stock only"
                />
                <span class="text-sm font-ui text-charcoal">In Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Main content -->
        <main class="flex-1 min-w-0" id="product-listing">
          <!-- Sort bar -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div class="flex items-center gap-3">
              <!-- Mobile filter toggle -->
              <button
                class="lg:hidden flex items-center gap-2 px-4 py-2 border border-border-gray rounded-lg text-sm font-ui text-charcoal hover:border-dusty-rose hover:text-deep-plum transition-colors"
                aria-label="Open filters"
                @click="ui.openFilterDrawer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm4 4a1 1 0 011-1h2a1 1 0 010 2h-2a1 1 0 01-1-1z" />
                </svg>
                Filters
              </button>
              <p class="text-sm text-mid-gray font-ui">
                <span class="font-semibold text-charcoal">{{ store.totalCount }}</span> products
              </p>
            </div>

            <!-- Sort dropdown -->
            <div class="flex items-center gap-2">
              <label for="sort-select" class="text-sm font-ui text-mid-gray">Sort by:</label>
              <select
                id="sort-select"
                v-model="sortValue"
                class="px-3 py-2 border border-border-gray rounded-lg text-sm font-ui text-charcoal bg-white focus:outline-none focus:border-dusty-rose"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>
          </div>

          <!-- Active filters -->
          <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-4">
            <button
              v-for="cat in selectedCategories"
              :key="cat"
              class="filter-chip active flex items-center gap-1.5"
              @click="removeCategory(cat)"
            >
              {{ cat }}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
              v-for="cat in categories"
              :key="cat.id"
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
  </div>
</template>

<script setup lang="ts">
import categoriesData from '~/data/categories.json'
import type { SortOption } from '~/types'

const store = useProductsStore()
const ui = useUIStore()
const categories = categoriesData

const selectedCategories = ref<string[]>([])
const priceRange = ref<[number, number]>([0, 2000])
const selectedRating = ref<number | null>(null)
const inStockOnly = ref(false)
const sortValue = ref<SortOption>('popularity')

const hasActiveFilters = computed(() => selectedCategories.value.length > 0)

const removeCategory = (cat: string) => {
  selectedCategories.value = selectedCategories.value.filter(c => c !== cat)
}
const toggleCategory = (cat: string) => {
  const idx = selectedCategories.value.indexOf(cat)
  if (idx === -1) selectedCategories.value.push(cat)
  else selectedCategories.value.splice(idx, 1)
}

watch([selectedCategories, priceRange, selectedRating, inStockOnly], () => {
  store.setFilters({
    categories: selectedCategories.value,
    priceRange: priceRange.value,
    rating: selectedRating.value,
    inStock: inStockOnly.value,
  })
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
