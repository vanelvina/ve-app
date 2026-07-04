<template>
  <div class="min-h-screen bg-warm-ivory py-12 px-4 sm:px-6">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-full bg-rose-blush flex items-center justify-center mx-auto mb-4 text-deep-plum shadow-sm">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a2 2 0 10-4 0v1a2 2 0 004 0v-1zm-12 0a2 2 0 10-4 0v1a2 2 0 004 0v-1z" />
          </svg>
        </div>
        <h1 class="font-serif text-3xl font-bold text-deep-plum">Loyalty Rewards</h1>
        <p class="text-sm text-charcoal/60 font-ui mt-2 max-w-sm mx-auto">
          Complete 5 orders to unlock your exclusive 10% loyalty discount — our way of saying thank you.
        </p>
      </div>

      <!-- Progress Card -->
      <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 mb-6 animate-slide-up">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="font-ui font-extrabold text-charcoal text-sm uppercase tracking-wide">Your Progress</h2>
            <p class="text-xs text-charcoal/50 font-ui mt-0.5">
              <span class="font-bold text-deep-plum text-base">{{ completedOrders }}</span>
              <span class="text-charcoal/40"> / 5 orders completed</span>
            </p>
          </div>
          <div class="w-14 h-14 rounded-full flex items-center justify-center font-serif font-bold text-xl text-deep-plum border-2 border-rose-blush">
            {{ completedOrders }}/5
          </div>
        </div>

        <!-- Progress bar -->
        <div class="w-full h-3 bg-rose-blush/20 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-deep-plum to-dusty-rose rounded-full transition-all duration-700"
            :style="{ width: `${Math.min((completedOrders / 5) * 100, 100)}%` }"
          />
        </div>

        <div class="flex justify-between mt-2">
          <span class="text-[10px] font-ui text-charcoal/40">0 orders</span>
          <span class="text-[10px] font-ui text-charcoal/40">5 orders</span>
        </div>

        <!-- Unlocked state -->
        <div v-if="isUnlocked" class="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <p class="text-emerald-700 font-bold text-sm font-ui mb-1">🎉 Loyalty Discount Unlocked!</p>
          <p class="text-emerald-600 text-xs font-ui">Your 10% discount is automatically applied at checkout.</p>
        </div>

        <!-- Progress state -->
        <div v-else class="mt-5 p-4 bg-warm-ivory border border-rose-blush/20 rounded-2xl text-center">
          <p class="text-charcoal/70 font-semibold text-sm font-ui mb-1">
            {{ 5 - completedOrders }} more {{ (5 - completedOrders) === 1 ? 'order' : 'orders' }} to go!
          </p>
          <p class="text-charcoal/45 text-xs font-ui">Complete your next purchase and get closer to your 10% loyalty discount.</p>
        </div>
      </div>

      <!-- Benefits Card -->
      <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 mb-6">
        <h2 class="font-ui font-extrabold text-charcoal text-sm uppercase tracking-wide mb-4">What You Get</h2>
        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <span class="text-lg shrink-0">💜</span>
            <div>
              <p class="text-sm font-bold font-ui text-charcoal">10% Off Every Order</p>
              <p class="text-xs text-charcoal/50 font-ui mt-0.5">Automatically applied at checkout after 5 completed orders.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-lg shrink-0">🎁</span>
            <div>
              <p class="text-sm font-bold font-ui text-charcoal">Early Access to Sales</p>
              <p class="text-xs text-charcoal/50 font-ui mt-0.5">Get first access to seasonal offers and new arrivals.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-lg shrink-0">✨</span>
            <div>
              <p class="text-sm font-bold font-ui text-charcoal">Free Priority Shipping</p>
              <p class="text-xs text-charcoal/50 font-ui mt-0.5">Loyal customers get elevated shipping priority on all orders.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <NuxtLink
          to="/products"
          class="inline-block px-8 py-3 bg-deep-plum text-white font-ui font-bold text-sm rounded-2xl hover:bg-[#7a3e4a] transition-all shadow-premium"
        >
          Shop Now & Earn
        </NuxtLink>
        <p class="text-[10px] text-charcoal/40 font-ui mt-3">
          Only completed (delivered) orders count toward your loyalty progress.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const auth = useAuthStore()
const config = useRuntimeConfig()

const orders = ref<any[]>([])

onMounted(async () => {
  if (!auth.isLoggedIn) return
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/orders`, {
      headers: auth.getHeaders()
    })
    orders.value = Array.isArray(data) ? data : (data as any).orders || []
  } catch {
    // silent — show 0 progress if no orders fetched
  }
})

const completedOrders = computed(() =>
  orders.value.filter(o => o.orderStatus === 'delivered').length
)

const isUnlocked = computed(() => completedOrders.value >= 5)

useSeoMeta({
  title: 'Loyalty Rewards – Van Elvina',
  description: 'Complete 5 orders and unlock your 10% loyalty discount at Van Elvina.',
})
</script>
