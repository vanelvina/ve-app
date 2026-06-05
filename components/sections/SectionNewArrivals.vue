<template>
  <section class="section-padding bg-rose-blush/40" aria-labelledby="new-arrivals-heading">
    <div class="page-container">
      <div class="section-heading">
        <p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">{{ widget?.subtitle || 'Just Landed' }}</p>
        <h2 id="new-arrivals-heading">{{ widget?.title || 'New Arrivals' }}</h2>
        <p>{{ widget?.description || 'Fresh styles added every week — be the first to wear the latest.' }}</p>
      </div>

      <!-- Horizontal scroll on mobile -->
      <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:grid md:product-grid">
        <div
          v-for="product in products"
          :key="product.id"
          class="shrink-0 w-48 md:w-auto"
        >
          <ProductCard :product="product" />
        </div>
      </div>

      <div class="text-center mt-8">
        <NuxtLink to="/products?badge=new" class="btn-primary">
          Explore New Arrivals
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const { newArrivals } = useProducts()
const products = computed(() => newArrivals.value.slice(0, 6))
</script>
