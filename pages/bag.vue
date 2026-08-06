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
          <button @click="ui.openAuthModal()" class="px-2 py-0.5 bg-rose-blush text-deep-plum hover:bg-deep-plum hover:text-white rounded text-[10px] font-bold transition-all">Sign In</button>
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
        <!-- Cart items: in-stock first, OOS items sink to the bottom -->
        <div class="lg:col-span-2 space-y-4">
          <article
            v-for="item in sortedCartItems"
            :key="`${item.productId}-${item.variantColor}-${item.size}`"
            class="bg-white rounded-2xl shadow-soft border p-4 flex gap-4 transition-all"
            :class="isItemOos(item) ? 'border-red-200 opacity-75' : 'border-border-gray'"
            :aria-label="item.product.name"
          >
            <!-- Image -->
            <NuxtLink :to="`/products/${item.product.slug}`" class="shrink-0 relative">
              <img
                :src="item.product.variants.find(v => v.color === item.variantColor)?.images[0] ?? item.product.variants[0]?.images[0]"
                :alt="item.product.name"
                class="w-24 h-28 object-cover rounded-xl"
                :class="isItemOos(item) ? 'grayscale-[40%]' : ''"
                width="96" height="112"
                loading="lazy"
              />
              <!-- OOS overlay on image -->
              <div v-if="isItemOos(item)" class="absolute inset-0 rounded-xl bg-white/60 flex items-center justify-center">
                <span class="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-white px-1.5 py-0.5 rounded shadow">Out of Stock</span>
              </div>
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
                  <!-- OOS notice -->
                  <p v-if="isItemOos(item)" class="mt-1 text-[10px] font-semibold text-red-500 font-ui">This size is currently out of stock — please remove it before checkout.</p>
                  <!-- Low stock notice (not OOS but ≤5) -->
                  <p v-else-if="getItemStock(item) <= 5 && getItemStock(item) > 0" class="mt-1 text-[10px] font-semibold text-amber-600 font-ui">
                    Only {{ getItemStock(item) }} left in stock!
                  </p>
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
                <!-- Quantity controls (disabled when OOS) -->
                <div class="flex items-center gap-2">
                  <!-- Minus: disabled at qty=1 to prevent accidental removal -->
                  <button
                    class="qty-btn"
                    :disabled="isItemOos(item) || item.quantity <= 1"
                    :aria-label="`Decrease quantity of ${item.product.name}`"
                    @click="item.quantity > 1 && cart.updateQuantity(item.productId, item.variantColor, item.size, item.quantity - 1, getItemStock(item))"
                  >−</button>
                  <span class="w-8 text-center font-ui font-semibold text-sm text-charcoal" aria-live="polite">{{ item.quantity }}</span>
                  <!-- Plus: disabled when OOS or at stock limit -->
                  <div class="relative group/maxstock">
                    <button
                      class="qty-btn"
                      :disabled="isItemOos(item) || item.quantity >= getItemStock(item)"
                      :aria-label="`Increase quantity of ${item.product.name}`"
                      @click="!isItemOos(item) && item.quantity < getItemStock(item) && cart.updateQuantity(item.productId, item.variantColor, item.size, item.quantity + 1, getItemStock(item))"
                    >+</button>
                    <!-- Stock limit tooltip -->
                    <div
                      v-if="!isItemOos(item) && item.quantity >= getItemStock(item)"
                      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-charcoal text-white text-[10px] font-ui font-semibold rounded-lg whitespace-nowrap shadow-md pointer-events-none opacity-0 group-hover/maxstock:opacity-100 transition-opacity z-10"
                    >
                      Max stock reached
                    </div>
                  </div>
                </div>
                <!-- Price -->
                <div class="text-right">
                  <p class="font-sans font-semibold" :class="isItemOos(item) ? 'text-mid-gray line-through' : 'text-charcoal'">{{ formatPrice(item.product.price * item.quantity) }}</p>
                  <p v-if="item.quantity > 1" class="text-xs text-mid-gray font-ui">{{ formatPrice(item.product.price) }} each</p>
                </div>
              </div>
            </div>
          </article>

          <!-- OOS separator: shown when there are both in-stock and OOS items -->
          <div v-if="hasOosItems && hasInStockItems" class="flex items-center gap-3 py-1">
            <div class="flex-1 h-px bg-red-100" />
            <span class="text-[10px] font-bold font-ui uppercase tracking-wider text-red-400 shrink-0">Out of stock items below</span>
            <div class="flex-1 h-px bg-red-100" />
          </div>

          <!-- Gift Wrap Offer Card -->
          <div
            v-if="!cart.giftWrap && !ignoredGiftWrap"
            class="mt-6 p-5 bg-gradient-to-br from-[#FCFAF8] to-[#FAF2EA] border border-rose-blush/40 rounded-3xl relative overflow-hidden shadow-soft animate-fade-in"
          >
            <div class="absolute inset-0.5 rounded-[22px] border border-dashed border-rose-blush/35 pointer-events-none" />
            <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-start gap-4">
                <span class="text-3xl animate-pulse-slow">🎁</span>
                <div class="space-y-1">
                  <h4 class="font-serif font-bold text-deep-plum text-sm leading-snug">A gift for someone special?</h4>
                  <p class="text-xs text-charcoal/60 font-ui leading-relaxed">
                    Make it unforgettable. Add our signature premium gift wrap with a customized card for just ₹59.
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                <button
                  @click="ignoredGiftWrap = true"
                  class="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal/45 hover:text-charcoal/70 transition-all font-ui"
                >
                  Ignore
                </button>
                <button
                  @click="cart.setGiftWrap(true)"
                  class="px-5 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-xl text-xs font-semibold shadow-premium transition-all"
                >
                  Add Gift Wrap – ₹59
                </button>
              </div>
            </div>
          </div>

          <!-- Gift Wrap Added Confirmation -->
          <div
            v-if="cart.giftWrap"
            class="mt-6 p-4 bg-green-50 border border-green-200 rounded-3xl relative overflow-hidden shadow-soft animate-fade-in"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="text-2xl">💝</span>
                <div>
                  <h4 class="font-serif font-bold text-green-800 text-sm">Gift wrapping added successfully!</h4>
                  <p class="text-[11px] text-green-700 font-ui">Your order will be elegantly hand-wrapped (₹59).</p>
                </div>
              </div>
              <button
                @click="cart.setGiftWrap(false)"
                class="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all text-xs font-semibold font-ui cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>

          <!-- Continue shopping -->
          <div class="pt-6">
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
                  placeholder="e.g. WELCOME10"
                  class="input-base flex-1"
                  aria-label="Coupon code"
                />
                <AppButton size="sm" variant="secondary" :loading="applyingCoupon" @click="applyCoupon">Apply</AppButton>
              </div>
              <div v-if="!cart.couponCode" class="mt-2 text-right">
                <button @click="showCouponList = true" class="text-xs font-ui text-deep-plum font-semibold hover:underline">
                  View available offers
                </button>
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
              <div v-if="cart.giftWrap" class="flex justify-between text-sm font-ui text-charcoal">
                <span>Gift Wrapper</span>
                <span>{{ formatPrice(59) }}</span>
              </div>
              <p v-if="cart.shippingCost > 0" class="text-xs text-mid-gray font-ui">
                Add {{ formatPrice(499 - cart.subtotal) }} more for free shipping
              </p>
            </div>

            <!-- Total -->
            <div class="flex justify-between items-center py-3 border-t border-charcoal">
              <span class="font-ui font-bold text-charcoal">Total</span>
              <span class="font-sans font-bold text-xl text-charcoal">{{ formatPrice(cart.grandTotal) }}</span>
            </div>
            <p class="text-xs text-green-600 font-ui -mt-1">You save {{ formatPrice(cart.totalSavings) }} on this order</p>

            <!-- Checkout CTA -->
            <button @click="proceedToCheckout" class="btn-primary w-full text-center block">
              Proceed to Checkout
            </button>

            <!-- Trust badges -->
            <div class="flex items-center justify-center gap-4 pt-2">
              <div v-for="badge in ['🔒 Secure', '↩️ Easy Returns', '🚚 Fast Delivery']" :key="badge"
                   class="text-[10px] text-mid-gray font-ui">{{ badge }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <CouponListModal 
      :is-open="showCouponList" 
      @close="showCouponList = false" 
      @apply="handleCouponApply" 
    />
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/formatters'
import { useAuthStore } from '~/stores/auth'

import CouponListModal from '~/components/organisms/CouponListModal.vue'

definePageMeta({ layout: 'default' })

const cart = useCartStore()
const ui = useUIStore()
const auth = useAuthStore()
const couponInput = ref('')
const showCouponList = ref(false)
const ignoredGiftWrap = ref(false)

const applyingCoupon = ref(false)

const handleCouponApply = (code: string) => {
  couponInput.value = code
  applyCoupon()
}

const applyCoupon = async () => {
  if (!couponInput.value.trim()) return
  applyingCoupon.value = true
  const result = await cart.applyCoupon(couponInput.value.trim())
  applyingCoupon.value = false
  ui.addToast(result.success ? 'success' : 'error', result.message)
  if (result.success) couponInput.value = ''
}

const proceedToCheckout = () => {
  // Check for OOS items before allowing checkout
  const oosItems = cart.items.filter(item => isItemOos(item))
  if (oosItems.length > 0) {
    const names = oosItems.map(i => i.product.name).join(', ')
    ui.addToast('error', `Some items are out of stock: ${names}. Please remove them before checkout.`)
    return
  }
  if (!auth.isLoggedIn) {
    ui.setAuthRedirect('/checkout')
    ui.openAuthModal('/checkout')
  } else {
    navigateTo('/checkout')
  }
}

// Check if a cart item's selected size is now out of stock
const isItemOos = (item: any): boolean => {
  const variant = item.product?.variants?.find((v: any) => v.color === item.variantColor)
  if (!variant?.stockPerSize) return false
  const stock = variant.stockPerSize[item.size]
  return typeof stock === 'number' && stock === 0
}

// Get available stock for a cart item's selected size (10 as fallback if no tracking)
const getItemStock = (item: any): number => {
  const variant = item.product?.variants?.find((v: any) => v.color === item.variantColor)
  if (!variant?.stockPerSize) return 10
  const stock = variant.stockPerSize[item.size]
  return typeof stock === 'number' ? Math.max(0, stock) : 10
}

// Sort bag: in-stock items first, OOS items at the bottom
const sortedCartItems = computed(() => {
  const inStock = cart.items.filter(item => !isItemOos(item))
  const oos = cart.items.filter(item => isItemOos(item))
  return [...inStock, ...oos]
})

const hasOosItems = computed(() => cart.items.some(item => isItemOos(item)))
const hasInStockItems = computed(() => cart.items.some(item => !isItemOos(item)))

useSeoMeta({
  title: 'Shopping Bag – Van Elvina',
  description: 'Review your shopping bag and proceed to checkout. Free shipping on orders above ₹499.',
})
</script>
