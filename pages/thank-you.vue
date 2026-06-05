<template>
  <div class="bg-warm-ivory min-h-screen py-10">
    <div class="page-container max-w-2xl text-center">

      <!-- Success animation -->
      <div class="relative w-28 h-28 mx-auto mb-6">
        <div class="absolute inset-0 rounded-full bg-green-100 animate-pulse-soft" />
        <div class="absolute inset-3 rounded-full bg-green-200" />
        <div class="absolute inset-0 flex items-center justify-center text-5xl" aria-hidden="true">✅</div>
      </div>

      <h1 class="font-serif text-3xl md:text-4xl text-deep-plum font-bold mb-3">Order Confirmed!</h1>
      <p class="text-mid-gray font-ui text-base mb-2">
        Thank you for shopping with Van Elvina, <strong class="text-charcoal">{{ customerName }}</strong>! 🎉
      </p>
      <p class="text-sm text-mid-gray font-ui mb-6">
        Your order <span class="font-semibold text-charcoal">#{{ orderId }}</span> has been placed successfully.
        We've sent a confirmation to your email.
      </p>

      <!-- Order summary card -->
      <div class="bg-white rounded-2xl shadow-soft border border-border-gray p-6 mb-6 text-left">
        <h2 class="font-ui font-semibold text-charcoal mb-4">Order Details</h2>
        <div class="grid grid-cols-2 gap-y-3 text-sm font-ui">
          <span class="text-mid-gray">Order ID</span>
          <span class="text-charcoal font-semibold">#{{ orderId }}</span>
          <span class="text-mid-gray">Date</span>
          <span class="text-charcoal">{{ today }}</span>
          <span class="text-mid-gray">Est. Delivery</span>
          <span class="text-charcoal">{{ deliveryDate }}</span>
          <span class="text-mid-gray">Payment</span>
          <span class="text-green-600 font-medium">Confirmed ✓</span>
        </div>
      </div>

      <!-- Timeline -->
      <div class="bg-white rounded-2xl shadow-soft border border-border-gray p-6 mb-8 text-left">
        <h2 class="font-ui font-semibold text-charcoal mb-4">What happens next?</h2>
        <div class="relative space-y-4">
          <div class="absolute left-4 top-2 bottom-2 w-0.5 bg-border-gray" aria-hidden="true" />
          <div v-for="(step, idx) in timeline" :key="step.label" class="relative flex items-start gap-4 pl-10">
            <div
              class="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
              :class="idx === 0 ? 'bg-green-100 text-green-600' : 'bg-light-gray text-mid-gray'"
              aria-hidden="true"
            >
              {{ step.icon }}
            </div>
            <div>
              <p class="text-sm font-ui font-semibold text-charcoal">{{ step.label }}</p>
              <p class="text-xs text-mid-gray font-ui">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center mb-10">
        <NuxtLink to="/products" class="btn-primary">Continue Shopping</NuxtLink>
        <button class="btn-secondary" @click="trackOrder">Track My Order</button>
      </div>

      <!-- Recommended products -->
      <div class="text-left">
        <h2 class="font-serif text-2xl text-deep-plum font-semibold mb-4">You Might Also Like</h2>
        <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          <div v-for="product in recommended" :key="product.id" class="w-44 shrink-0">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const ui = useUIStore()
const { bestSellers } = useProducts()

const orderId = computed(() => route.query.order as string || 'VE000000000')
const customerName = 'Priya'

const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

const recommended = computed(() => bestSellers.value.slice(0, 5))

const timeline = [
  { icon: '✅', label: 'Order Confirmed', desc: 'Your payment has been received and order is confirmed.' },
  { icon: '📦', label: 'Packing', desc: 'Your items are being carefully packed with love.' },
  { icon: '🚚', label: 'Shipped', desc: 'Your order will be dispatched within 24 hours.' },
  { icon: '🏠', label: 'Delivered', desc: `Expected by ${deliveryDate}.` },
]

const trackOrder = () => {
  ui.addToast('info', 'Order tracking will be available once dispatched.')
}

useSeoMeta({
  title: 'Order Confirmed – Van Elvina',
  description: 'Your Van Elvina order has been confirmed. Thank you for shopping with us!',
  robots: 'noindex',
})
</script>
