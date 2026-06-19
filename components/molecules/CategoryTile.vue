<template>
  <NuxtLink
    :to="`/products?category=${category.slug}`"
    class="group flex flex-col items-center text-center p-2 transition-all duration-300"
    :aria-label="`Shop ${category.name}`"
  >
    <!-- Circular image container with decorative ring -->
    <div class="category-ring-container w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow-premium overflow-hidden bg-white">
      <img
        :src="category.image"
        :alt="category.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        width="100"
        height="100"
      />
    </div>

    <!-- Category Label Content -->
    <div class="mt-2 space-y-0.5">
      <h3 class="font-sans text-charcoal group-hover:text-deep-plum text-xs sm:text-sm font-bold leading-tight transition-colors">
        {{ category.name }}
      </h3>
      <p class="text-dusty-rose text-[9px] uppercase tracking-wider font-bold">
        {{ category.productCount || 0 }}+ Styles
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Category } from '~/types'
defineProps<{ category: Category }>()
</script>
