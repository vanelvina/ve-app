<template>
  <section class="py-12 bg-white relative group" aria-labelledby="trending-heading">
    <div class="page-container">
      <!-- Section Header -->
      <div class="flex items-center justify-between pb-3 mb-6 relative">
        <div class="relative flex items-center gap-2">
          <h2 id="trending-heading" class="text-lg md:text-xl font-sans font-bold text-gray-900 tracking-tight flex items-center gap-2.5 pb-1">
            <span>{{ widget?.title || "Trending Now" }}</span>
            <img src="https://cdn.zivame.com/media/v3/Trending%20now.png" alt="Trending Now Icon" class="h-6 w-auto object-contain inline-block shrink-0" />
          </h2>
        </div>
        <!-- Thicker Grey Divider Line (4px) -->
        <div class="absolute bottom-0 left-0 right-0 h-[4px] bg-gray-200/60"></div>
        <!-- Thicker Black Accent Bar (4px) on top of the grey line on the left -->
        <div class="absolute bottom-0 left-0 h-[4px] bg-black w-28 z-10"></div>
        
        <NuxtLink to="/products" class="group text-xs font-bold text-gray-800 hover:text-[#8A4F5A] flex items-center gap-1 transition-all duration-300">
          <span>View All</span>
          <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Categories Tabs -->
      <div class="flex gap-2.5 overflow-x-auto pt-2 px-2 -mx-2 pb-4 scrollbar-hide mb-6 select-none">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          class="px-5 py-2.5 text-[13px] font-sans rounded-full border transition-all duration-200 cursor-pointer select-none"
          :class="activeTab === tab.value
            ? 'bg-white text-gray-900 border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.08)] font-bold scale-[1.02]'
            : 'bg-[#f8f9fa] text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900 font-medium'"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Horizontal scroll container of products -->
      <div class="relative w-full">
        <!-- Prev Button -->
        <button
          class="absolute left-[-15px] md:left-[-20px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white hover:bg-black text-black hover:text-white flex items-center justify-center shadow-premium border border-gray-100/50 hover:scale-105 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Previous Products"
          :disabled="isStart"
          @click="scroll('left')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Product row -->
        <div
          ref="rowRef"
          class="flex overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory scrollbar-hide py-2 px-1"
          @scroll="checkScrollState"
        >
          <!-- Product card wrapper -->
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="shrink-0 w-[calc(100%/2-0.5rem)] sm:w-[calc(100%/3-0.66rem)] md:w-[calc(100%/4-0.75rem)] lg:w-[calc(100%/6-0.83rem)] snap-start"
          >
            <ProductCard :product="product" />
          </div>
          <!-- Empty State -->
          <div v-if="filteredProducts.length === 0" class="w-full text-center py-12 text-gray-400 text-sm">
             No trending styles found in this category.
          </div>
        </div>

        <!-- Next Button -->
        <button
          class="absolute right-[-15px] md:right-[-20px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white hover:bg-black text-black hover:text-white flex items-center justify-center shadow-premium border border-gray-100/50 hover:scale-105 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Next Products"
          :disabled="isEnd"
          @click="scroll('right')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useProducts } from '~/composables/useProducts'

const props = defineProps<{
  widget?: any
}>()

const activeTab = ref('all')

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Bras', value: 'bras' },
  { label: 'Panties', value: 'panties' },
  { label: 'Lingeris', value: 'sleepwear' },
  { label: 'Activewear', value: 'activewear' },
  { label: 'Shapewear', value: 'shapewear' },
]

const { all } = useProducts()

// Filter all products based on active tab category
const filteredProducts = computed(() => {
  let list = all.value.filter(p => p.badge === 'trending')
  if (activeTab.value !== 'all') {
    list = list.filter(p => p.category.toLowerCase() === activeTab.value.toLowerCase())
  }
  // Let's sort by rating or review count to represent "trending now"
  return [...list].sort((a, b) => b.rating - a.rating)
})

const rowRef = ref<HTMLElement | null>(null)
const isStart = ref(true)
const isEnd = ref(false)

const checkScrollState = () => {
  const el = rowRef.value
  if (!el) return
  isStart.value = el.scrollLeft <= 5
  isEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10
}

const scroll = (direction: 'left' | 'right') => {
  const el = rowRef.value
  if (!el) return
  const amount = el.clientWidth * 0.8
  el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
}

watch(activeTab, () => {
  nextTick(() => {
    const el = rowRef.value
    if (el) {
      el.scrollLeft = 0
      setTimeout(checkScrollState, 100)
    }
  })
})

onMounted(() => {
  setTimeout(checkScrollState, 500)
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
