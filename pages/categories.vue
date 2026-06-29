<template>
  <div class="min-h-screen bg-[#FAF8F5]">
    <!-- Main Container -->
    <main class="page-container py-6 px-4 max-w-2xl mx-auto">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-3">
        <div class="w-10 h-10 border-4 border-deep-plum border-t-transparent rounded-full animate-spin" />
        <p class="text-xs text-mid-gray font-ui">Loading categories...</p>
      </div>

      <div v-else-if="banners.length" class="space-y-4 md:space-y-6">
        <!-- Render banners Stack -->
        <NuxtLink 
          v-for="(banner, idx) in banners" 
          :key="idx" 
          :to="banner.link" 
          class="block group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <!-- Mobile view image: visible on mobile, hidden on md -->
          <img 
            :src="banner.imageMobile || banner.image" 
            class="block md:hidden w-full h-auto object-cover" 
            alt="Category Banner Mobile"
          />
          <!-- Desktop view image: hidden on mobile, block on md -->
          <img 
            :src="banner.image || banner.imageMobile" 
            class="hidden md:block w-full h-auto object-cover" 
            alt="Category Banner Desktop"
          />
          <!-- Subtle overlay for premium touch -->
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </NuxtLink>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-rose-blush/30 px-6">
        <span class="text-4xl">🛍️</span>
        <h2 class="font-serif text-lg font-bold text-deep-plum mt-3">Welcome to Van Elvina</h2>
        <p class="text-xs text-charcoal/60 mt-1 max-w-xs mx-auto">Our customized categories are launching shortly. Tap below to browse all products.</p>
        <NuxtLink to="/products" class="inline-block mt-4 btn-primary px-6 py-2 text-xs font-semibold rounded-xl">Browse Catalog</NuxtLink>
      </div>
    </main>
    
    <!-- Spacing for mobile bottom bar -->
    <div class="h-20 md:hidden" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

useSeoMeta({
  title: 'Categories | Van Elvina',
  description: 'Explore the curated categories and premium comfort items at Van Elvina.',
})

const loading = ref(true)
const banners = ref<any[]>([])

onMounted(async () => {
  const config = useRuntimeConfig()
  try {
    const widgets: any[] = await $fetch(`${config.public.apiBase}/widgets`)
    const categoryWidget = widgets.find((w: any) => w.key === 'category-page-banners')
    if (categoryWidget && Array.isArray(categoryWidget.items)) {
      banners.value = categoryWidget.items
    }
  } catch (err) {
    console.error('Failed to load category page banners:', err)
  } finally {
    loading.value = false
  }
})
</script>
