<template>
  <div class="bg-warm-ivory min-h-screen">
    <div class="page-container py-8">
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="font-serif text-2xl text-deep-plum font-bold">Shopping Bag
            <span class="text-base font-ui font-normal text-mid-gray ml-2">({{ cart.count }} items)</span>
          </h1>
        </div>

        <div v-if="auth.isLoggedIn" class="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-[10px] font-semibold shadow-soft">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>Synced with account ({{ auth.user?.email }})</span>
        </div>
        <div v-else class="flex items-center gap-2.5 bg-white px-3 py-1.5 border border-rose-blush rounded-xl shadow-soft">
          <span class="text-[10px] text-charcoal/60">Sign in to save your bag items.</span>
          <button @click="ui.openAuthModal" class="px-2 py-0.5 bg-rose-blush text-deep-plum hover:bg-deep-plum hover:text-white rounded text-[10px] font-bold transition-all">Sign In</button>
        </div>
      </div>

      <!-- Empty bag -->
      <div v-if="cart.isEmpty" class="text-center py-20">
        <div class="text-7xl mb-4" aria-hidden="true">🛍️</div>
        <h2 class="font-serif text-2xl text-deep-plum mb-2">Your bag is empty</h2>
        <p class="text-mid-gray font-ui text-sm mb-8">Looks like you haven't added anything yet. Let's fix that!</p>
        <NuxtLink to="/products" class="btn-primary">Start Shopping</NuxtLink>
      </div>

      <!-- Cart with items -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Cart items -->
        <div class="lg:col-span-2 space-y-4">
          <article
            v-for="item in cart.items"
            :key="`${item.productId}-${item.variantColor}-${item.size}`"
            class="bg-white rounded-2xl shadow-soft border border-border-gray p-4 flex gap-4"
            :aria-label="item.product.name"
          >
            <!-- Image -->
            <NuxtLink :to="`/products/${item.product.slug}`" class="shrink-0">
              <img
                :src="item.product.variants.find(v => v.color === item.variantColor)?.images[0] ?? item.product.variants[0]?.images[0]"
                :alt="item.product.name"
                class="w-24 h-28 object-cover rounded-xl"
                width="96" height="112"
                loading="lazy"
              />
            </NuxtLink>

            <!-- Details -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <p class="text-xs text-dusty-rose font-ui font-medium mb-0.5">{{ item.product.category }}</p>
                  <NuxtLink :to="`/products/${item.product.slug}`">
                    <h3 class="font-sans font-medium text-charcoal text-sm leading-snug hover:text-deep-plum transition-colors">{{ item.product.name }}</h3>
                  </NuxtLink>
                  <p class="text-xs text-mid-gray font-ui mt-1">Color: {{ item.variantColor }} · Size: {{ item.size }}</p>
                </div>
                <button
                  class="text-mid-gray hover:text-red-500 transition-colors shrink-0"
                  :aria-label="`Remove ${item.product.name} from cart`"
                  @click="cart.removeItem(item.productId, item.variantColor, item.size)"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="mt-3 flex items-center justify-between">
                <!-- Quantity -->
                <div class="flex items-center gap-2">
                  <button class="qty-btn" :aria-label="`Decrease quantity of ${item.product.name}`" @click="cart.updateQuantity(item.productId, item.variantColor, item.size, item.quantity - 1)">−</button>
                  <span class="w-8 text-center font-ui font-semibold text-sm text-charcoal" aria-live="polite">{{ item.quantity }}</span>
                  <button class="qty-btn" :aria-label="`Increase quantity of ${item.product.name}`" @click="cart.updateQuantity(item.productId, item.variantColor, item.size, item.quantity + 1)">+</button>
                </div>
                <!-- Price -->
                <div class="text-right">
                  <p class="font-sans font-semibold text-charcoal">{{ formatPrice(item.product.price * item.quantity) }}</p>
                  <p v-if="item.quantity > 1" class="text-xs text-mid-gray font-ui">{{ formatPrice(item.product.price) }} each</p>
                </div>
              </div>
            </div>
          </article>

          <!-- Continue shopping -->
          <div class="pt-2">
            <NuxtLink to="/products" class="btn-ghost text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </NuxtLink>
          </div>
        </div>

        <!-- Order summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-soft border border-border-gray p-6 sticky top-24 space-y-4">
            <h2 class="font-ui font-semibold text-charcoal text-base">Order Summary</h2>

            <!-- Coupon -->
            <div>
              <p class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-2">Coupon Code</p>
              <div v-if="!cart.couponCode" class="flex gap-2">
                <input
                  v-model="couponInput"
                  type="text"
                  placeholder="e.g. ELVINA10"
                  class="input-base flex-1"
                  aria-label="Coupon code"
                />
                <AppButton size="sm" variant="secondary" @click="applyCoupon">Apply</AppButton>
              </div>
              <div v-else class="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2">
                <span class="text-sm font-ui font-semibold text-green-700">{{ cart.couponCode }} applied ✓</span>
                <button class="text-xs text-mid-gray hover:text-red-500" @click="cart.removeCoupon">Remove</button>
              </div>
            </div>

            <!-- Price breakdown -->
            <div class="space-y-2.5 py-4 border-t border-border-gray">
              <div class="flex justify-between text-sm font-ui text-charcoal">
                <span>Subtotal ({{ cart.count }} items)</span>
                <span>{{ formatPrice(cart.subtotal) }}</span>
              </div>
              <div v-if="cart.appliedDiscount > 0" class="flex justify-between text-sm font-ui text-green-600">
                <span>Coupon Discount</span>
                <span>−{{ formatPrice(cart.appliedDiscount) }}</span>
              </div>
              <div class="flex justify-between text-sm font-ui text-charcoal">
                <span>Shipping</span>
                <span :class="cart.shippingCost === 0 ? 'text-green-600 font-medium' : ''">
                  {{ cart.shippingCost === 0 ? 'FREE' : formatPrice(cart.shippingCost) }}
                </span>
              </div>
              <p v-if="cart.shippingCost > 0" class="text-xs text-mid-gray font-ui">
                Add {{ formatPrice(999 - cart.subtotal) }} more for free shipping
              </p>
            </div>

            <!-- Total -->
            <div class="flex justify-between items-center py-3 border-t border-charcoal">
              <span class="font-ui font-bold text-charcoal">Total</span>
              <span class="font-sans font-bold text-xl text-charcoal">{{ formatPrice(cart.grandTotal) }}</span>
            </div>
            <p class="text-xs text-green-600 font-ui -mt-1">You save {{ formatPrice(cart.totalSavings) }} on this order</p>

            <!-- Checkout CTA -->
            <NuxtLink to="/checkout" class="btn-primary w-full text-center block">
              Proceed to Checkout
            </NuxtLink>

            <!-- Trust badges -->
            <div class="flex items-center justify-center gap-4 pt-2">
              <div v-for="badge in ['🔒 Secure', '↩️ Easy Returns', '🚚 Fast Delivery']" :key="badge"
                   class="text-[10px] text-mid-gray font-ui">{{ badge }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/formatters'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'default' })

const cart = useCartStore()
const ui = useUIStore()
const auth = useAuthStore()
const couponInput = ref('')

const applyCoupon = () => {
  if (!couponInput.value.trim()) return
  const result = cart.applyCoupon(couponInput.value.trim())
  ui.addToast(result.success ? 'success' : 'error', result.message)
  if (result.success) couponInput.value = ''
}

useSeoMeta({
  title: 'Shopping Bag – Van Elvina',
  description: 'Review your shopping bag and proceed to checkout. Free shipping on orders above ₹999.',
})
</script>
