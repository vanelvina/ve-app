<template>
  <Transition name="fade">
    <div
      v-if="ui.searchOverlayOpen"
      class="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      @click.self="ui.closeSearch"
    >
      <div class="w-full max-w-xl bg-white rounded-2xl shadow-modal animate-slide-up overflow-hidden">
        <!-- Search input -->
        <div class="flex items-center gap-3 px-5 py-4 border-b border-border-gray">
          <svg class="w-5 h-5 text-dusty-rose shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref="searchInput"
            v-model="query"
            type="search"
            placeholder="Search bras, panties, sleepwear..."
            class="flex-1 text-base font-ui text-charcoal bg-transparent outline-none placeholder-mid-gray"
            autocomplete="off"
            aria-label="Search products"
            @keydown.escape="ui.closeSearch"
          />
          <button class="text-mid-gray hover:text-charcoal" aria-label="Clear search" @click="query = ''">
            <svg v-if="query" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button class="text-xs font-ui text-mid-gray hover:text-deep-plum ml-2" @click="ui.closeSearch">
            Close
          </button>
        </div>

        <!-- Results -->
        <div class="max-h-80 overflow-y-auto">
          <!-- Search results -->
          <template v-if="query.length > 1">
            <div v-if="results.length" class="p-3 space-y-1">
              <NuxtLink
                v-for="product in results"
                :key="product.id"
                :to="`/products/${product.slug}`"
                class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-blush transition-colors group"
                @click="ui.closeSearch"
              >
                <img
                  :src="product.variants[0]?.images[0]"
                  :alt="product.name"
                  class="w-10 h-10 object-cover rounded-lg shrink-0"
                  width="40" height="40"
                />
                <div class="min-w-0">
                  <p class="text-sm font-ui font-medium text-charcoal group-hover:text-deep-plum truncate">{{ product.name }}</p>
                  <p class="text-xs text-dusty-rose font-ui">{{ product.category }} · {{ formatPrice(product.price) }}</p>
                </div>
              </NuxtLink>
            </div>
            <div v-else class="py-10 text-center text-mid-gray font-ui text-sm">
              No results for "{{ query }}"
            </div>
          </template>

          <!-- Popular searches -->
          <div v-else class="p-4">
            <p class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3">Popular Searches</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="term in popularSearches"
                :key="term"
                class="filter-chip"
                @click="query = term"
              >
                {{ term }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/formatters'

const ui = useUIStore()
const { searchProducts } = useProducts()
const searchInput = ref<HTMLInputElement | null>(null)
const query = ref('')

const results = computed(() => (query.value.length > 1 ? searchProducts(query.value) : []))

const popularSearches = ['Cotton Bra', 'Push-Up', 'Seamless', 'Sports Bra', 'Lace Brief', 'Nursing Bra', 'Shapewear', 'Bamboo']

watch(() => ui.searchOverlayOpen, (open) => {
  if (open) {
    nextTick(() => searchInput.value?.focus())
    query.value = ''
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
