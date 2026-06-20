<template>
  <section class="section-padding bg-warm-ivory/30" :aria-labelledby="`promo-heading-${widget?.key}`">
    <div class="page-container">
      <div v-if="widget?.title || widget?.subtitle" class="section-heading mb-8">
        <span v-if="widget?.subtitle" class="subtitle">
          {{ widget.subtitle }}
        </span>
        <h2 :id="`promo-heading-${widget?.key}`">
          {{ widget.title }}
        </h2>
        <p v-if="widget?.description">
          {{ widget.description }}
        </p>
      </div>

      <!-- Grid container, adapts dynamically based on quantity of promo items -->
      <div 
        class="grid gap-0" 
        :class="gridColsClass"
      >
        <NuxtLink
          v-for="(item, idx) in promoItems"
          :key="idx"
          :to="item.link || '/products'"
          class="block w-full"
          :aria-label="item.title || 'Promotional Offer'"
        >
          <picture>
            <source media="(max-width: 768px)" :srcset="item.imageMobile || item.image" />
            <img
              :src="item.image"
              :alt="item.title || 'Promo Offer'"
              class="w-full h-auto block"
              loading="lazy"
            />
          </picture>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const promoItems = computed(() => {
  return props.widget?.items || []
})

// Dynamically determine Tailwind grid classes based on list size
const gridColsClass = computed(() => {
  const count = promoItems.value.length
  if (count === 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-1 sm:grid-cols-2'
  if (count === 3) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
  return 'grid-cols-2 md:grid-cols-4'
})
</script>
