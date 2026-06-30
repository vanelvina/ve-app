<template>
  <div>
    <section 
      class="relative overflow-hidden bg-white" 
      aria-label="Featured banners"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <!-- Slides -->
      <div
        class="flex transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${current * 100}%)` }"
      >
        <div
          v-for="(banner, idx) in banners"
          :key="banner.id || idx"
          class="w-full shrink-0"
        >
          <NuxtLink :to="banner.ctaLink || '/products'" class="block w-full">
            <picture>
              <source media="(max-width: 768px)" :srcset="banner.imageMobile || banner.image" />
              <img
                :src="banner.image"
                :alt="banner.title || 'Featured Banner'"
                class="w-full h-auto block"
                :loading="idx === 0 ? 'eager' : 'lazy'"
              />
            </picture>
          </NuxtLink>
        </div>
      </div>

      <!-- Navigation arrows (overlaid on the image) -->
      <button
        class="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/50 hover:bg-white text-deep-plum flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/30"
        aria-label="Previous banner"
        @click="prev"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/50 hover:bg-white text-deep-plum flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/30"
        aria-label="Next banner"
        @click="next"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>

    <!-- Dots — active dot IS the X/Y counter pill -->
    <div
      v-if="banners.length > 1"
      class="flex items-center justify-center gap-1.5 py-2.5 bg-white select-none"
      role="tablist"
      aria-label="Banner navigation"
    >
      <button
        v-for="(_, idx) in banners"
        :key="idx"
        class="transition-all duration-300 flex items-center justify-center"
        :aria-label="`Go to slide ${idx + 1}`"
        :aria-selected="idx === current"
        role="tab"
        @click="current = idx"
      >
        <!-- Active slide: show X/Y pill -->
        <span
          v-if="idx === current"
          class="text-[11px] font-ui font-semibold text-white bg-deep-plum px-2.5 py-0.5 rounded-full tabular-nums leading-none"
        >
          {{ idx + 1 }}/{{ banners.length }}
        </span>
        <!-- Inactive: plain small circle -->
        <span
          v-else
          class="block w-2 h-2 rounded-full bg-deep-plum/25 hover:bg-deep-plum/60"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const banners = useState<any[]>('homepage-banners', () => [])
const current = ref(0)
const loading = ref(banners.value.length === 0)

const fetchBanners = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/banners`)
    banners.value = data
  } catch (error) {
    console.error('Failed to fetch banners:', error)
  } finally {
    loading.value = false
  }
}

const touchStartX = ref(0)
const touchEndX = ref(0)

const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const onTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      next() // Swiped left
    } else {
      prev() // Swiped right
    }
  }
}

onMounted(() => {
  if (banners.value.length === 0) {
    fetchBanners()
  } else {
    loading.value = false
  }
})

const next = () => {
  if (banners.value.length === 0) return
  current.value = (current.value + 1) % banners.value.length
}
const prev = () => {
  if (banners.value.length === 0) return
  current.value = (current.value - 1 + banners.value.length) % banners.value.length
}

// Auto-play
let autoplayTimer: ReturnType<typeof setInterval>
onMounted(() => {
  autoplayTimer = setInterval(next, 5000)
})
onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
})
</script>
