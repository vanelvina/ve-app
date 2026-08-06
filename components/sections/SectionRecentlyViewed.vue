<template>
  <section
    v-if="items.length > 0"
    class="w-full py-10 border-t border-rose-blush/20"
    aria-label="Recently Viewed"
  >
    <div class="page-container">
      <!-- Header -->
      <div class="flex items-end justify-between mb-6">
        <div>
          <p class="text-[10px] font-bold uppercase tracking-widest text-dusty-rose font-ui mb-1">Your Browsing History</p>
          <h2 class="font-serif text-xl md:text-2xl text-deep-plum font-bold">Recently Viewed</h2>
        </div>
        <!-- Clear button -->
        <button
          @click="clearHistory"
          class="text-[11px] font-ui font-semibold text-mid-gray hover:text-red-400 transition-colors flex items-center gap-1"
          aria-label="Clear recently viewed history"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear
        </button>
      </div>

      <!-- Horizontal scroll shelf -->
      <div class="-mx-4 px-4 overflow-x-auto md:overflow-visible md:mx-0 md:px-0 scrollbar-hide">
        <div class="flex gap-3 md:grid md:product-grid w-max md:w-auto pb-2 md:pb-0">
          <div
            v-for="product in items"
            :key="product.id || (product as any)._id"
            class="w-40 sm:w-44 md:w-auto shrink-0"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

const store = useProductsStore()

// Restore from localStorage on mount (needed on pages that don't call it themselves)
onMounted(() => {
  store.restoreRecentlyViewed()
})

// Exclude the current product if a slug is provided (PDP use case)
const props = defineProps<{ excludeSlug?: string }>()

const items = computed(() => {
  const list = Array.isArray(store.recentlyViewed) ? store.recentlyViewed : []
  if (props.excludeSlug) {
    return list.filter(p => p.slug !== props.excludeSlug).slice(0, 8)
  }
  return list.slice(0, 8)
})

const clearHistory = () => {
  store.recentlyViewed = []
  if (import.meta.client) {
    localStorage.removeItem('ve_recently_viewed')
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
