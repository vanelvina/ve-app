<template>
  <div class="min-h-screen bg-[#FAF8F5]">
    <!-- Mobile Header -->
    <header class="md:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
      <h1 class="text-xl font-bold font-serif text-[#2A1B18] tracking-tight">Category</h1>
      <div class="flex items-center gap-3">
        <!-- Notification Bell -->
        <button 
          @click="showNotificationInfo" 
          class="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Notifications"
        >
          <svg class="w-5 h-5 text-[#2A1B18]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <!-- Wishlist -->
        <NuxtLink 
          to="/wishlist" 
          class="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Wishlist"
        >
          <svg class="w-5 h-5 text-[#2A1B18]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span v-if="wishlist.count > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-dusty-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {{ wishlist.count }}
          </span>
        </NuxtLink>

        <!-- Bag -->
        <NuxtLink 
          to="/bag" 
          class="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Cart"
        >
          <svg class="w-5 h-5 text-[#2A1B18]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span v-if="cart.itemCount > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-deep-plum text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {{ cart.itemCount }}
          </span>
        </NuxtLink>
      </div>
    </header>

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
import { useUIStore } from '~/stores/ui'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'

useSeoMeta({
  title: 'Categories | Van Elvina',
  description: 'Explore the curated categories and premium comfort items at Van Elvina.',
})

const ui = useUIStore()
const cart = useCartStore()
const wishlist = useWishlistStore()

const loading = ref(true)
const banners = ref<any[]>([])

const showNotificationInfo = () => {
  ui.addToast('info', 'You are all caught up! Keep checking back for exclusive product drops. 💖')
}

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
