<template>
  <section class="section-padding bg-white" aria-labelledby="bestsellers-heading">
    <div class="page-container">
      <div class="section-heading">
        <p class="text-xs font-ui font-semibold text-soft-gold uppercase tracking-[0.2em] mb-2">{{ widget?.subtitle || 'Customer Favourites' }}</p>
        <h2 id="bestsellers-heading">{{ widget?.title || 'Best Sellers' }}</h2>
        <p>{{ widget?.description || 'Styles our customers keep coming back for — rated 4.5+ and loved by thousands.' }}</p>
      </div>
      <div class="product-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
      <div class="text-center mt-10">
        <NuxtLink to="/products" class="btn-secondary">View All Products</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const { bestSellers } = useProducts()
const products = computed(() => bestSellers.value.slice(0, 8))
</script>
