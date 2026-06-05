<template>
  <section class="relative overflow-hidden bg-black" aria-label="Featured banners">
    <!-- Slides -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <div
        v-for="banner in banners"
        :key="banner.id"
        class="relative w-full shrink-0 aspect-[16/7] min-h-[320px] md:min-h-[480px]"
      >
        <!-- Background image -->
        <img
          :src="banner.image"
          :alt="banner.title"
          class="absolute inset-0 w-full h-full object-cover"
          :loading="banner.id === 'b001' ? 'eager' : 'lazy'"
          fetchpriority="high"
        />
        <!-- Overlay -->
        <div
          class="absolute inset-0"
          :class="banner.textColor === 'light'
            ? 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'
            : 'bg-gradient-to-r from-white/70 via-white/40 to-transparent'"
        />

        <!-- Content -->
        <div
          class="absolute inset-0 flex items-center"
          :class="{
            'justify-start': banner.align === 'left',
            'justify-center': banner.align === 'center',
            'justify-end': banner.align === 'right',
          }"
        >
          <div
            class="px-8 md:px-16 lg:px-24 max-w-lg"
            :class="{ 'text-center': banner.align === 'center', 'text-right': banner.align === 'right' }"
          >
            <!-- Badge -->
            <div
              v-if="banner.badge"
              class="inline-block px-3 py-1 rounded-full text-xs font-ui font-semibold mb-3 uppercase tracking-wider"
              :class="banner.textColor === 'light' ? 'bg-dusty-rose/80 text-white' : 'bg-deep-plum text-white'"
            >
              {{ banner.badge }}
            </div>

            <!-- Title -->
            <h2
              class="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              :class="banner.textColor === 'light' ? 'text-white' : 'text-deep-plum'"
            >
              {{ banner.title }}
            </h2>

            <!-- Subtitle -->
            <p
              class="font-ui text-sm md:text-base leading-relaxed mb-6 max-w-sm"
              :class="banner.textColor === 'light' ? 'text-white/85' : 'text-charcoal/80'"
              :class2="banner.align === 'center' ? 'mx-auto' : ''"
            >
              {{ banner.subtitle }}
            </p>

            <!-- CTA -->
            <NuxtLink
              :to="banner.ctaLink"
              class="inline-flex items-center gap-2 px-7 py-3 rounded-full font-ui font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md"
              :class="banner.textColor === 'light'
                ? 'bg-white text-deep-plum hover:bg-rose-blush'
                : 'bg-deep-plum text-white hover:bg-plum-800'"
            >
              {{ banner.cta }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Arrows -->
    <button
      class="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center transition-all duration-200 text-white"
      aria-label="Previous banner"
      @click="prev"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center transition-all duration-200 text-white"
      aria-label="Next banner"
      @click="next"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10" role="tablist" aria-label="Banner navigation">
      <button
        v-for="(_, idx) in banners"
        :key="idx"
        class="transition-all duration-300 rounded-full"
        :class="idx === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'"
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
