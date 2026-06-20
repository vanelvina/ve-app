<template>
  <section class="w-full bg-white relative group py-2 md:py-4" aria-label="3 Set Carousel">
    <div class="relative overflow-hidden w-full page-container">
      <div
        ref="carouselRef"
        class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-2 md:gap-4 pb-2"
        style="scroll-behavior: smooth;"
      >
        <div
          v-for="(item, idx) in widget.items?.list"
          :key="idx"
          class="shrink-0 w-[calc(100%/3-0.33rem)] md:w-[calc(100%/3-0.66rem)] snap-start"
        >
          <NuxtLink :to="item.link || '/products'" class="block w-full">
            <picture>
              <source media="(max-width: 768px)" :srcset="item.imageMobile || item.image" />
              <img
                :src="item.image"
                :alt="item.title || 'Carousel Item'"
                class="w-full h-auto block"
                loading="lazy"
              />
            </picture>
          </NuxtLink>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button
        class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-deep-plum flex items-center justify-center shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
        aria-label="Previous"
        @click="scroll('left')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-deep-plum flex items-center justify-center shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
        aria-label="Next"
        @click="scroll('right')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  widget: any
}>()

const carouselRef = ref<HTMLElement | null>(null)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const startAutoplay = () => {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    const el = carouselRef.value
    if (!el) return
    const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 20
    if (isEnd) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      const scrollAmount = el.clientWidth * 0.9
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }, 1500)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const scroll = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  // Restart autoplay timer on user click to reset the 1.5s window
  startAutoplay()
  const scrollAmount = carouselRef.value.clientWidth * 0.9
  carouselRef.value.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
