<template>
  <section class="section-padding bg-warm-ivory/30" :aria-labelledby="`promo-heading-${widget?.key}`">
    <div class="page-container">
      <div v-if="widget?.title || widget?.subtitle" class="section-heading mb-8">
        <p v-if="widget?.subtitle" class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">
          {{ widget.subtitle }}
        </p>
        <h2 :id="`promo-heading-${widget?.key}`" class="font-serif text-2xl md:text-3xl text-deep-plum font-bold">
          {{ widget.title }}
        </h2>
        <p v-if="widget?.description" class="text-charcoal/65 mt-1 text-sm">
          {{ widget.description }}
        </p>
      </div>

      <!-- Grid container, adapts dynamically based on quantity of promo items -->
      <div 
        class="grid gap-4 md:gap-6" 
        :class="gridColsClass"
      >
        <NuxtLink
          v-for="(item, idx) in promoItems"
          :key="idx"
          :to="item.link || '/products'"
          class="group relative block overflow-hidden rounded-2xl bg-warm-ivory shadow-soft hover:shadow-card-hover transition-all duration-350 border border-rose-blush/30 aspect-[4/3] sm:aspect-[16/10]"
          :aria-label="item.title || 'Promotional Offer'"
        >
          <img
            :src="item.image"
            :alt="item.title || 'Promo Offer'"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <!-- Light decorative outer border stamp effect on hover -->
          <div class="absolute inset-2 border border-dashed border-white/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
