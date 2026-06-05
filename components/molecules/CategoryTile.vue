<template>
  <NuxtLink
    :to="`/products?category=${category.slug}`"
    class="group relative block overflow-hidden rounded-xl aspect-square bg-light-gray shadow-card hover:shadow-card-hover transition-all duration-350"
    :aria-label="`Shop ${category.name}`"
  >
    <img
      :src="category.image"
      :alt="category.name"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
      width="300"
      height="300"
    />
    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-deep-plum/70 via-deep-plum/20 to-transparent" />

    <!-- Content -->
    <div class="absolute bottom-0 left-0 right-0 p-4">
      <h3 class="font-serif text-white text-lg font-semibold leading-tight">{{ category.name }}</h3>
      <p class="text-rose-blush/80 text-xs font-ui mt-0.5">{{ category.productCount }}+ styles</p>
    </div>

    <!-- Arrow icon -->
    <div class="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Category } from '~/types'
defineProps<{ category: Category }>()
</script>
