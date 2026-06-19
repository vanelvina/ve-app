<template>
  <section class="section-padding bg-white" :aria-labelledby="`tabs-heading-${widget?.key}`">
    <div class="page-container">
      <div class="section-heading mb-6">
        <p v-if="widget?.subtitle" class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">
          {{ widget.subtitle }}
        </p>
        <h2 :id="`tabs-heading-${widget?.key}`" class="font-serif text-2xl md:text-3xl text-deep-plum font-bold">
          {{ widget?.title || 'Shop Curated Collections' }}
        </h2>
        <p v-if="widget?.description" class="text-charcoal/65 mt-1 text-sm">
          {{ widget.description }}
        </p>
      </div>

      <!-- Tab Selectors (Pills) -->
      <div class="flex justify-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="px-5 py-2.5 rounded-full text-xs font-ui font-bold uppercase tracking-wider transition-all duration-350 border shrink-0"
          :class="activeTab === tab
            ? 'bg-deep-plum text-white border-deep-plum shadow-md'
            : 'bg-warm-ivory/50 text-charcoal/80 border-rose-blush hover:bg-rose-blush/20 hover:text-deep-plum'"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Products Grid under selected tab -->
      <Transition name="fade" mode="out-in">
        <div 
          :key="activeTab"
          class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <ProductCard
            v-for="product in activeProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </Transition>

      <div class="text-center mt-10">
        <NuxtLink :to="`/products?category=${activeTab}`" class="btn-secondary">
          Explore All {{ activeTab }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const props = defineProps<{
  widget?: any
}>()

const { getByCategory } = useProducts()

const tabs = computed(() => {
  return props.widget?.items || ['Bras', 'Panties']
})

const activeTab = ref(tabs.value[0] || 'Bras')

const activeProducts = computed(() => {
  return getByCategory(activeTab.value).slice(0, 4)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
