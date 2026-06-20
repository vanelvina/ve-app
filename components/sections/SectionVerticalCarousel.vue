<template>
  <section class="section-padding !py-8 bg-warm-ivory/20" :aria-labelledby="`carousel-heading-${widget?.key}`">
    <div class="page-container">
      <!-- Section Header — compact single-line style -->
      <div v-if="widget?.title || widget?.subtitle" class="mb-6">
        <div class="flex items-center gap-3 mb-1">
          <span v-if="widget?.subtitle" class="text-[10px] font-ui font-bold text-dusty-rose uppercase tracking-[0.25em] shrink-0">
            {{ widget.subtitle }}
          </span>
          <div v-if="widget?.subtitle" class="h-px flex-1 bg-rose-blush/60" />
        </div>
        <p
          :id="`carousel-heading-${widget?.key}`"
          class="text-sm md:text-base font-sans font-medium text-charcoal/80 tracking-wide"
        >
          {{ widget.title }}
        </p>
      </div>

      <!-- Carousel Wrapper -->
      <div class="relative w-full group">
        <!-- Horizontal Scroll Container -->
        <div
          ref="containerRef"
          class="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-1"
          @scroll="onScroll"
        >
          <!-- Carousel Cards -->
          <div
            v-for="(item, idx) in carouselItems"
            :key="idx"
            class="carousel-card shrink-0 snap-start transition-all duration-350 select-none"
            :class="[
              showBorders ? 'p-3.5 shadow-soft hover:shadow-card-hover' : '',
              cardWidth ? '' : 'w-44 sm:w-52'
            ]"
            :style="{
              backgroundColor: showBorders ? getCardBg(idx) : 'transparent',
              width: cardWidth || undefined,
              borderRadius: showBorders ? '1rem' : borderRadius,
              overflow: showBorders ? 'hidden' : undefined
            }"
          >
            <NuxtLink :to="item.link || '/products'" class="block w-full h-full">
              <!-- Wrapped Card Mode: Render inner white frame and sidebar overlay text -->
              <div 
                v-if="showBorders"
                class="bg-white p-2 rounded-xl h-full flex flex-col justify-between border border-white"
              >
                <!-- Relative image container -->
                <div class="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-warm-ivory flex">
                  <!-- Left side vertical label inside white frame -->
                  <div v-if="item.title" class="w-8 shrink-0 flex items-center justify-center text-center">
                    <span
                      class="font-ui font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase select-none"
                      :style="{ color: getCardText(idx), writingMode: 'vertical-rl', transform: 'rotate(180deg)' }"
                    >
                      {{ item.title }}
                    </span>
                  </div>
                  <!-- Picture element for image -->
                  <picture class="flex-1 w-full h-full">
                    <source media="(max-width: 768px)" :srcset="item.imageMobile || item.image" />
                    <img
                      :src="item.image"
                      :alt="item.title || 'Promo'"
                      class="w-full h-full object-cover rounded-md"
                      loading="lazy"
                    />
                  </picture>
                </div>

                <!-- Bottom offer subtitle inside frame -->
                <div
                  v-if="item.subtitle"
                  class="mt-3.5 text-center font-ui font-extrabold text-xs sm:text-sm uppercase tracking-wider py-1"
                  :style="{ color: getCardText(idx) }"
                >
                  {{ item.subtitle }}
                </div>
              </div>

              <!-- Borderless mode: Render raw image styled dynamically -->
              <div 
                v-else 
                class="relative w-full h-full"
              >
                <picture class="block w-full h-full">
                  <source media="(max-width: 768px)" :srcset="item.imageMobile || item.image" />
                  <img
                    :src="item.image"
                    :alt="item.title || 'Promo'"
                    class="w-full block"
                    :style="{ 
                      height: cardHeight || 'auto',
                      objectFit: objectFit
                    }"
                    loading="lazy"
                  />
                </picture>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Manual Navigation controls (Desktop icons) -->
        <button
          @click="scrollPrev"
          class="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-deep-plum border border-rose-blush/35 items-center justify-center hover:bg-rose-blush shadow-md transition-all opacity-0 group-hover:opacity-100"
          aria-label="Previous card"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="scrollNext"
          class="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-deep-plum border border-rose-blush/35 items-center justify-center hover:bg-rose-blush shadow-md transition-all opacity-0 group-hover:opacity-100"
          aria-label="Next card"
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
const props = defineProps<{
  widget?: any
}>()

const containerRef = ref<HTMLElement | null>(null)
let scrollTimer: ReturnType<typeof setInterval> | null = null

const carouselItems = computed(() => {
  return props.widget?.items?.list || props.widget?.items || []
})

// Auto scroll interval configuration (defaults to 3 seconds)
const intervalSeconds = computed(() => {
  const custom = props.widget?.items?.interval || props.widget?.description
  const parsed = parseInt(String(custom), 10)
  return isNaN(parsed) || parsed <= 0 ? 3 : parsed
})

// Styling and layout customization options
const showBorders = computed(() => {
  return !!props.widget?.items?.showBorders
})

const widthFull = computed(() => {
  return !!props.widget?.items?.widthFull
})

const cardWidth = computed(() => {
  if (widthFull.value) return '100%'
  const w = props.widget?.items?.cardWidth
  return w ? (isNaN(Number(w)) ? w : `${w}px`) : ''
})

const cardHeight = computed(() => {
  const h = props.widget?.items?.cardHeight
  return h ? (isNaN(Number(h)) ? h : `${h}px`) : ''
})

const borderRadius = computed(() => {
  const r = props.widget?.items?.borderRadius
  return r ? (isNaN(Number(r)) ? r : `${r}px`) : '12px' // Default rounded-xl if borderless
})

const objectFit = computed(() => {
  return props.widget?.items?.objectFit || 'cover'
})

// Frame color rotation matching Clovia/Zivame custom aesthetics
const getCardBg = (idx: number) => {
  const mod = idx % 3
  if (mod === 0) return '#FAD2D8' // Pink
  if (mod === 1) return '#8A4F5A' // Deep Plum Rose
  return '#F5EAC4' // Cream Yellow
}

const getCardText = (idx: number) => {
  const mod = idx % 3
  if (mod === 1) return '#FFFFFF' // White on Plum
  return '#8A4F5A' // Plum on Pink/Cream
}

const autoScroll = () => {
  const el = containerRef.value
  if (!el || carouselItems.value.length === 0) return

  const firstCard = el.querySelector('.carousel-card')
  if (!firstCard) return

  const cardWidthVal = firstCard.clientWidth
  const gap = 16
  const step = cardWidthVal + gap

  // If reached end, reset smoothly
  if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
    el.scrollTo({ left: 0, behavior: 'smooth' })
  } else {
    el.scrollBy({ left: step, behavior: 'smooth' })
  }
}

const scrollNext = () => {
  const el = containerRef.value
  if (!el) return
  const cardWidthVal = el.querySelector('.carousel-card')?.clientWidth || 200
  const gap = 16
  el.scrollBy({ left: cardWidthVal + gap, behavior: 'smooth' })
  resetTimer()
}

const scrollPrev = () => {
  const el = containerRef.value
  if (!el) return
  const cardWidthVal = el.querySelector('.carousel-card')?.clientWidth || 200
  const gap = 16
  el.scrollBy({ left: -(cardWidthVal + gap), behavior: 'smooth' })
  resetTimer()
}

const onScroll = () => {
  // Reset auto-scroll timer on user interaction
  resetTimer()
}

const resetTimer = () => {
  if (scrollTimer) clearInterval(scrollTimer)
  scrollTimer = setInterval(autoScroll, intervalSeconds.value * 1000)
}

onMounted(() => {
  resetTimer()
})

onUnmounted(() => {
  if (scrollTimer) clearInterval(scrollTimer)
})
</script>

<style scoped>
/* Scoped custom styling overrides */
</style>
