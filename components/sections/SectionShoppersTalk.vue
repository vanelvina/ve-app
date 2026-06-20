<template>
  <section class="py-12 bg-white relative group" :aria-labelledby="widget?.key ? `shoppers-talk-${widget.key}` : undefined">
    <div class="page-container">
      <!-- Section Header -->
      <div v-if="widget" class="pb-3 mb-6 relative">
        <div class="flex items-center justify-between">
          <h2 :id="widget?.key ? `shoppers-talk-${widget.key}` : undefined" class="text-lg md:text-xl font-sans font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
            <span>{{ widget.title || 'Shoppers Talk' }}</span>
          </h2>
        </div>
        <!-- Thicker Grey Divider Line (4px) -->
        <div class="absolute bottom-0 left-0 right-0 h-[4px] bg-gray-200/60"></div>
        <!-- Thicker Black Accent Bar (4px) on top of the grey line on the left -->
        <div class="absolute bottom-0 left-0 h-[4px] bg-black w-28 z-10"></div>
      </div>

      <!-- Horizontal Carousel Container -->
      <div class="relative w-full">
        <!-- Prev Button -->
        <button
          class="absolute left-[-15px] md:left-[-20px] top-1/2 -translate-y-1/2 z-25 w-9 h-9 rounded-full bg-white hover:bg-black text-black hover:text-white flex items-center justify-center shadow-premium border border-gray-100/50 hover:scale-105 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Previous Reviews"
          :disabled="isStart"
          @click="scroll('left')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Reviews Row -->
        <div
          ref="rowRef"
          class="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory scrollbar-hide py-4 px-1"
          @scroll="checkScrollState"
        >
          <!-- Review Card (Image only) -->
          <div
            v-for="(item, idx) in sortedItems"
            :key="idx"
            class="shrink-0 aspect-[16/9] h-[180px] sm:h-[220px] md:h-[260px] rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] snap-start border border-gray-100/70 bg-warm-ivory/50"
          >
            <img
              :src="item.image"
              :alt="`Review Card ${idx + 1}`"
              class="w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Next Button -->
        <button
          class="absolute right-[-15px] md:right-[-20px] top-1/2 -translate-y-1/2 z-25 w-9 h-9 rounded-full bg-white hover:bg-black text-black hover:text-white flex items-center justify-center shadow-premium border border-gray-100/50 hover:scale-105 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none"
          aria-label="Next Reviews"
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
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  widget: any
}>()

const sortedItems = computed(() => {
  return Array.isArray(props.widget?.items) ? props.widget.items : []
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
  const amount = el.clientWidth * 0.75
  el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
}

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
