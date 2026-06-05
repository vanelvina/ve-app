<template>
  <section class="section-padding bg-warm-ivory" aria-labelledby="featured-heading">
    <div class="page-container">
      <div class="section-heading">
        <p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">{{ widget?.subtitle || 'Handpicked For You' }}</p>
        <h2 id="featured-heading">{{ widget?.title || 'Featured Products' }}</h2>
        <p>{{ widget?.description || 'Our bestselling styles — tried, tested, and loved by thousands of women across India.' }}</p>
      </div>
      <div class="product-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
      <div class="text-center mt-10">
        <NuxtLink to="/products?badge=bestseller" class="btn-secondary">
          View All Bestsellers
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const { featured } = useProducts()
const products = computed(() => featured.value.slice(0, 8))
</script>
