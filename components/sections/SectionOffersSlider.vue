<template>
  <section class="section-padding bg-warm-ivory/50" :aria-labelledby="`offers-heading-${widget?.key}`">
    <div class="page-container">
      <div class="section-heading mb-8">
        <p v-if="widget?.subtitle" class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">
          {{ widget.subtitle }}
        </p>
        <h2 :id="`offers-heading-${widget?.key}`" class="font-serif text-2xl md:text-3xl text-deep-plum font-bold">
          {{ widget?.title || 'Special Packs & Combos' }}
        </h2>
        <p v-if="widget?.description" class="text-charcoal/65 mt-1 text-sm">
          {{ widget.description }}
        </p>
      </div>

      <!-- Horizontal Scrollable Container -->
      <div class="flex gap-6 overflow-x-auto scrollbar-hide pb-6 pt-2 snap-x snap-mandatory">
        <div
          v-for="(offer, idx) in offerItems"
          :key="idx"
          class="w-72 sm:w-88 shrink-0 bg-white rounded-2xl border border-rose-blush/20 shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col snap-start group"
        >
          <!-- Image Banner -->
          <div class="relative aspect-[4/3] bg-warm-ivory overflow-hidden">
            <img
              :src="offer.image"
              :alt="offer.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <!-- Price overlay tag -->
            <div v-if="offer.price" class="absolute bottom-3 right-3 bg-deep-plum text-white text-xs font-ui font-bold px-3 py-1.5 rounded-full shadow-md">
              {{ offer.price }}
            </div>
          </div>

          <!-- Card Info -->
          <div class="p-5 flex flex-col flex-1 space-y-3">
            <div>
              <h3 class="font-serif text-charcoal font-semibold text-base group-hover:text-deep-plum transition-colors line-clamp-1">
                {{ offer.title }}
              </h3>
              <p class="text-xs text-charcoal/60 mt-1 line-clamp-2 leading-relaxed">
                {{ offer.subtitle }}
              </p>
            </div>

            <div class="pt-2">
              <NuxtLink
                :to="offer.link || '/products'"
                class="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-rose-blush text-deep-plum rounded-xl text-xs font-ui font-semibold hover:bg-deep-plum hover:text-white transition-all duration-250"
              >
                Shop Combo Pack
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const offerItems = computed(() => {
  return props.widget?.items || []
})
</script>
