<template>
  <div class="min-h-screen bg-warm-ivory py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-card border border-rose-blush/30 text-center animate-slide-up">
      <div class="w-16 h-16 rounded-full bg-rose-blush flex items-center justify-center mx-auto text-deep-plum mb-6">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      
      <h1 class="font-serif text-2xl font-bold text-deep-plum mb-2">Track Your Order</h1>
      <p class="text-sm text-charcoal/60 font-ui mb-8">Enter your Order ID to see real-time updates on your package.</p>
      
      <form @submit.prevent="handleTrack" class="space-y-4 text-left">
        <div class="space-y-1.5">
          <label class="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Order ID</label>
          <input
            v-model="orderId"
            type="text"
            placeholder="e.g., VE-XXXXXX"
            required
            class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum/20 transition-all bg-warm-ivory/20"
          />
        </div>
        
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-deep-plum text-white rounded-xl text-sm font-ui font-semibold hover:bg-[#7a3e4a] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Track Order
        </button>
      </form>
      
      <div v-if="auth.isLoggedIn" class="mt-6 pt-6 border-t border-rose-blush/20">
        <p class="text-xs text-charcoal/50 font-ui mb-3">Or view all your past orders</p>
        <NuxtLink to="/myorders" class="text-sm font-bold text-deep-plum hover:underline font-ui">
          Go to My Orders
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const orderId = ref('')
const loading = ref(false)
const router = useRouter()
const auth = useAuthStore()

const handleTrack = () => {
  if (!orderId.value.trim()) return
  loading.value = true
  
  // Format the order ID if they just typed the number
  let finalId = orderId.value.trim().toUpperCase()
  if (!finalId.startsWith('VE-')) {
    // If they typed just numbers and it's not a mongo ID
    if (!/^[0-9a-fA-F]{24}$/.test(finalId)) {
      finalId = `VE-${finalId}`
    }
  }
  
  router.push(`/account/orders/${finalId}`)
}

useSeoMeta({
  title: 'Track Order – Van Elvina',
  description: 'Track your Van Elvina order status in real-time.'
})
</script>
