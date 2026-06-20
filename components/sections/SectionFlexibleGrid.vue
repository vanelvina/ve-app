<template>
  <section class="section-padding bg-white" :aria-labelledby="`flex-grid-heading-${widget?.key}`">
    <div class="page-container">
      <!-- Section Header -->
      <div v-if="widget?.title || widget?.subtitle" class="section-heading mb-6 md:mb-8">
        <span v-if="widget?.subtitle" class="subtitle">{{ widget.subtitle }}</span>
        <h2 :id="`flex-grid-heading-${widget?.key}`">{{ widget.title }}</h2>
        <p v-if="widget?.description" class="text-mid-gray text-xs md:text-sm max-w-lg mx-auto font-sans leading-relaxed mt-2 text-center">
          {{ widget.description }}
        </p>
      </div>

      <!-- Responsive logical grid layouts -->
      <div :class="gridClasses">
        <div
          v-for="(photo, idx) in photos"
          :key="idx"
          class="w-full"
        >
          <NuxtLink :to="photo.link || '/products'" class="block w-full">
            <picture class="block w-full">
              <source media="(max-width: 768px)" :srcset="photo.imageMobile || photo.image" />
              <img
                :src="photo.image"
                :alt="photo.title || 'Grid image'"
                class="w-full h-auto block"
                loading="lazy"
              />
            </picture>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  widget: any
}>()

const photos = computed(() => {
  return props.widget?.items?.photos || []
})

const layout = computed(() => {
  return props.widget?.items?.layout || '2-col'
})

const gridClasses = computed(() => {
  switch (layout.value) {
    case '1-col':
      return 'w-full'
    case '2-col':
      return 'grid grid-cols-2 gap-3 md:gap-6'
    case '3-col':
      return 'grid grid-cols-3 gap-3 md:gap-6'
    case '4-grid':
      return 'grid grid-cols-2 gap-3 md:gap-6'
    default:
      return 'grid grid-cols-2 gap-3 md:gap-6'
  }
})

const itemClasses = (index: number) => {
  // Custom height proportions depending on layout
  switch (layout.value) {
    case '1-col':
      return 'aspect-[21/9] min-h-[180px] md:min-h-[400px]'
    case '2-col':
      return 'aspect-[3/4] md:aspect-[16/10] min-h-[180px] md:min-h-[320px]'
    case '3-col':
      return 'aspect-[3/5] md:aspect-[3/4] min-h-[150px] md:min-h-[280px]'
    case '4-grid':
      return 'aspect-square min-h-[140px] md:min-h-[280px]'
    default:
      return 'aspect-square'
  }
}
</script>
