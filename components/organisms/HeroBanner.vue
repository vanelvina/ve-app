<template>
  <section class="relative overflow-hidden bg-warm-ivory border-b border-rose-blush/20" aria-label="Featured banners">
    <!-- Slides -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <div
        v-for="(banner, idx) in banners"
        :key="banner.id || idx"
        class="w-full shrink-0 relative aspect-[16/7] md:aspect-[16/6] min-h-[180px] sm:min-h-[300px] md:min-h-[420px] lg:min-h-[500px]"
      >
        <NuxtLink :to="banner.ctaLink || '/products'" class="block w-full h-full">
          <img
            :src="banner.image"
            :alt="banner.title || 'Featured Banner'"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
            :loading="idx === 0 ? 'eager' : 'lazy'"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Frosted glassy navigation arrows -->
    <button
      class="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/35 hover:bg-white/50 text-deep-plum hover:text-plum-800 flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-premium border border-white/20"
      aria-label="Previous banner"
      @click="prev"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/35 hover:bg-white/50 text-deep-plum hover:text-plum-800 flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-premium border border-white/20"
      aria-label="Next banner"
      @click="next"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Navigation dots -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10" role="tablist" aria-label="Banner navigation">
      <button
        v-for="(_, idx) in banners"
        :key="idx"
        class="transition-all duration-300 rounded-full"
        :class="idx === current ? 'w-8 h-2 bg-deep-plum shadow-premium' : 'w-2.5 h-2.5 bg-deep-plum/20 hover:bg-deep-plum/50'"
        :aria-label="`Go to slide ${idx + 1}`"
        :aria-selected="idx === current"
        role="tab"
        @click="current = idx"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const banners = ref<any[]>([])
const current = ref(0)
const loading = ref(true)

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

onMounted(() => {
  fetchBanners()
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
