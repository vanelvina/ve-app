<template>
  <div class="bg-warm-ivory min-h-screen py-10 font-sans">
    <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="font-serif text-3xl md:text-4xl text-deep-plum font-bold tracking-tight">My Wishlist</h1>
          <p class="text-xs text-charcoal/60 mt-1 font-ui">
            {{ wishlist.count }} {{ wishlist.count === 1 ? 'item' : 'items' }} saved to your collection
          </p>
        </div>

        <!-- Authentication Sync Prompt banner/badge -->
        <div v-if="auth.isLoggedIn" class="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-semibold shadow-soft">
          <span class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span>Synced with account ({{ auth.user?.email }})</span>
        </div>
        <div v-else class="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-3.5 border border-rose-blush rounded-2xl shadow-soft">
          <div class="space-y-0.5">
            <p class="text-[11px] font-bold text-deep-plum uppercase tracking-wider">Save Your Wishlist</p>
            <p class="text-[10px] text-charcoal/60">Sign in to sync your saved items across your devices.</p>
          </div>
          <button 
            @click="ui.openAuthModal" 
            class="px-3.5 py-1.5 bg-rose-blush text-deep-plum hover:bg-deep-plum hover:text-white rounded-xl text-xs font-bold transition-all shadow-soft shrink-0 self-start sm:self-auto"
          >
            Sign In
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="wishlist.loading" class="py-24 text-center">
        <div class="w-12 h-12 border-4 border-rose-blush border-t-deep-plum rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-sm text-charcoal/60 font-ui font-semibold">Updating your wishlist...</p>
      </div>

      <!-- Empty Collection State -->
      <div v-else-if="wishlist.isEmpty" class="max-w-md mx-auto text-center py-20 bg-white rounded-3xl border border-charcoal/10 shadow-premium p-8 relative overflow-hidden">
        <div class="absolute inset-0.5 rounded-[22px] border border-dashed border-rose-blush pointer-events-none" />
        <div class="text-5xl mb-4" title="Empty collection">💝</div>
        <h2 class="font-serif text-xl font-bold text-deep-plum mb-2">Your wishlist is empty</h2>
        <p class="text-xs text-charcoal/60 font-ui leading-relaxed mb-6">
          Keep track of items you love. Save your favorites here and they'll be waiting for you when you're ready to make them yours.
        </p>
        <NuxtLink 
          to="/products" 
          class="inline-block px-6 py-3 bg-deep-plum text-white hover:bg-plum-800 rounded-xl text-xs font-semibold shadow-premium hover:shadow-card hover:scale-[1.01] transition-all"
        >
          Explore Products
        </NuxtLink>
      </div>

      <!-- Wishlist items product grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
        <ProductCard 
          v-for="product in wishlist.items" 
          :key="product.id" 
          :product="product" 
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '~/stores/wishlist'
import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'

const wishlist = useWishlistStore()
const auth = useAuthStore()
const ui = useUIStore()

useHead({
  title: 'My Wishlist – Van Elvina',
  meta: [
    { name: 'description', content: 'Explore your saved collection of premium women lingerie and activewear on Van Elvina.' }
  ]
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
