<template>
  <div class="min-h-screen bg-warm-ivory py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      
      <!-- Back button and breadcrumb -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <nav class="flex text-xs font-ui text-charcoal/50" aria-label="Breadcrumb">
          <NuxtLink to="/" class="hover:text-deep-plum transition-colors">Home</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/account" class="hover:text-deep-plum transition-colors">My Account</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-charcoal font-semibold">Order Details</span>
        </nav>
        <NuxtLink
          to="/account"
          class="inline-flex items-center text-xs font-bold text-deep-plum hover:underline font-ui self-start sm:self-auto"
        >
          ← Back to Account
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-3xl p-8 shadow-card border border-rose-blush/30 animate-pulse space-y-6">
        <div class="h-6 bg-charcoal/10 rounded w-1/3"></div>
        <div class="h-24 bg-charcoal/5 rounded-2xl"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="h-32 bg-charcoal/5 rounded-2xl"></div>
          <div class="h-32 bg-charcoal/5 rounded-2xl"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-3xl p-8 shadow-card border border-rose-blush/30 text-center py-12 space-y-4">
        <div class="w-16 h-16 rounded-full bg-rose-blush flex items-center justify-center mx-auto text-deep-plum">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="font-serif text-xl font-bold text-deep-plum">Failed to Load Order</h2>
        <p class="text-xs text-charcoal/50 max-w-sm mx-auto font-ui">{{ error }}</p>
        <NuxtLink
          to="/account"
          class="inline-block px-6 py-2.5 bg-deep-plum text-white font-ui font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-[#7a3e4a] transition-all"
        >
          View All Orders
        </NuxtLink>
      </div>

      <!-- Order Details Content -->
      <div v-else-if="order" class="space-y-6 animate-slide-up">
        
        <!-- Header Info Card -->
        <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span class="text-[10px] font-bold text-charcoal/40 font-ui tracking-wide uppercase">Order Reference</span>
              <h1 class="font-ui font-black text-xl text-deep-plum mt-0.5">{{ order.orderId }}</h1>
              <p class="text-xs text-charcoal/50 mt-1 font-ui">
                Placed on {{ formatDate(order.createdAt) }}
              </p>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <span 
                class="px-3 py-1.5 text-xs font-bold font-ui rounded-full uppercase tracking-wider"
                :class="getStatusClass(order.orderStatus)"
              >
                Status: {{ order.orderStatus }}
              </span>
              <span 
                v-if="order.paymentStatus"
                class="px-3 py-1.5 text-xs font-bold font-ui rounded-full uppercase tracking-wider"
                :class="order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'"
              >
                Payment: {{ order.paymentStatus }}
              </span>
            </div>
          </div>
        </div>

        <!-- Progress Timeline Bar -->
        <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 overflow-hidden">
          <h3 class="text-xs font-bold text-charcoal/40 font-ui tracking-wide uppercase mb-6">Delivery Timeline</h3>
          
          <!-- Standard Status Steps -->
          <div v-if="order.orderStatus !== 'cancelled'" class="relative flex items-center justify-between">
            <!-- Background Line -->
            <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-rose-blush z-0"></div>
            <!-- Progress Fill Line -->
            <div 
              class="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-deep-plum transition-all duration-500 z-0"
              :style="{ width: getProgressWidth(order.orderStatus) }"
            ></div>

            <!-- Steps -->
            <div 
              v-for="(step, idx) in timelineSteps" 
              :key="idx" 
              class="relative z-10 flex flex-col items-center"
            >
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 font-ui text-xs font-bold border-2"
                :class="getStepClass(step.id)"
              >
                <svg v-if="isStepCompleted(step.id)" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else>{{ idx + 1 }}</span>
              </div>
              <span class="text-[10px] font-bold font-ui mt-2 text-charcoal/70 uppercase tracking-wider text-center max-w-[70px]">
                {{ step.label }}
              </span>
            </div>
          </div>

          <!-- Cancelled State Timeline -->
          <div v-else class="flex items-center gap-4 px-4 py-3 bg-red-50 rounded-2xl border border-red-200 text-red-800">
            <svg class="w-6 h-6 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="font-ui font-bold text-sm">Order Cancelled</p>
              <p class="text-xs text-red-700/80 mt-0.5 font-ui">This order has been cancelled and will not be processed further.</p>
            </div>
          </div>
        </div>

        <!-- 2-Column Info Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Shipping Address Card -->
          <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 space-y-4">
            <h3 class="text-xs font-bold text-charcoal/40 font-ui tracking-wide uppercase">Shipping Address</h3>
            <div class="space-y-1 font-ui text-sm text-charcoal/80">
              <p class="font-bold text-deep-plum">{{ order.shippingAddress.name }}</p>
              <p>{{ order.shippingAddress.line1 }}</p>
              <p v-if="order.shippingAddress.line2">{{ order.shippingAddress.line2 }}</p>
              <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} - {{ order.shippingAddress.pincode }}</p>
              <p class="pt-2 text-xs text-charcoal/60 font-semibold">Phone: {{ order.shippingAddress.phone }}</p>
            </div>
          </div>

          <!-- Payment & Delivery Methods Card -->
          <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 space-y-4">
            <h3 class="text-xs font-bold text-charcoal/40 font-ui tracking-wide uppercase">Billing & Shipping</h3>
            <div class="space-y-3 font-ui text-sm text-charcoal/80">
              <div>
                <span class="text-[10px] font-bold text-charcoal/40 tracking-wider uppercase block">Payment Method</span>
                <p class="font-semibold text-deep-plum uppercase mt-0.5">{{ order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod }}</p>
              </div>
              <div>
                <span class="text-[10px] font-bold text-charcoal/40 tracking-wider uppercase block">Shipping Method</span>
                <p class="font-semibold text-deep-plum uppercase mt-0.5">{{ order.shippingMethod === 'express' ? 'Express Delivery' : 'Standard Shipping' }}</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Items Ordered Card -->
        <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30">
          <h3 class="text-xs font-bold text-charcoal/40 font-ui tracking-wide uppercase mb-4">Items Ordered</h3>
          
          <div class="divide-y divide-rose-blush/20">
            <div 
              v-for="(item, idx) in order.items" 
              :key="idx" 
              class="py-4 flex gap-4 items-center"
            >
              <!-- Item Image -->
              <div class="w-16 h-20 rounded-xl bg-warm-ivory border border-rose-blush/30 overflow-hidden flex items-center justify-center shrink-0">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                <svg v-else class="w-6 h-6 text-charcoal/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>

              <!-- Item Info -->
              <div class="flex-1 min-w-0">
                <h4 class="font-serif font-bold text-sm text-deep-plum truncate">{{ item.name }}</h4>
                <p class="text-xs text-charcoal/50 font-ui mt-1">
                  Qty: {{ item.quantity }} · Size: {{ item.size || 'Standard' }}
                </p>
              </div>

              <!-- Item Pricing -->
              <div class="text-right shrink-0">
                <p class="text-xs font-ui font-semibold text-charcoal/80">₹{{ item.price.toLocaleString('en-IN') }}</p>
                <p class="text-xs font-serif font-bold text-deep-plum mt-1">₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pricing Summary Card -->
        <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 max-w-sm ml-auto">
          <h3 class="text-xs font-bold text-charcoal/40 font-ui tracking-wide uppercase mb-4">Summary</h3>
          
          <div class="space-y-2.5 font-ui text-sm text-charcoal/70">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span class="font-semibold">₹{{ order.subtotal.toLocaleString('en-IN') }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping Fee</span>
              <span class="font-semibold">{{ order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}` }}</span>
            </div>
            <div v-if="order.discount > 0" class="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span class="font-semibold">-₹{{ order.discount.toLocaleString('en-IN') }}</span>
            </div>
            <div class="border-t border-rose-blush/20 my-3"></div>
            <div class="flex justify-between text-base font-bold text-deep-plum">
              <span class="font-serif">Total Amount</span>
              <span class="font-serif text-lg">₹{{ order.total.toLocaleString('en-IN') }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const route = useRoute()
const config = useRuntimeConfig()
const auth = useAuthStore()

// ── State ─────────────────────────────────────────────────────────────────────
const order = ref<any>(null)
const loading = ref(true)
const error = ref('')

// ── Timeline steps config ──────────────────────────────────────────────────────
const timelineSteps = [
  { id: 'placed', label: 'Placed' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'shipped', label: 'Shipped' },
  { id: 'delivered', label: 'Delivered' }
]

// ── Fetch order details ───────────────────────────────────────────────────────
onMounted(async () => {
  const orderId = route.params.id as string
  if (!orderId) {
    error.value = 'Invalid Order Reference'
    loading.value = false
    return
  }

  try {
    const data = await $fetch<any>(`${config.public.apiBase}/orders/${orderId}`, {
      headers: auth.getHeaders()
    })
    order.value = data
  } catch (err: any) {
    console.error('Fetch order error:', err)
    error.value = err.data?.message || 'Could not find the order details.'
  } finally {
    loading.value = false
  }
})

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status: string) => {
  const s = status ? status.toLowerCase() : ''
  switch (s) {
    case 'placed':
      return 'bg-amber-50 text-amber-800 border border-amber-200'
    case 'confirmed':
      return 'bg-blue-50 text-blue-800 border border-blue-200'
    case 'shipped':
      return 'bg-indigo-50 text-indigo-800 border border-indigo-200'
    case 'delivered':
      return 'bg-emerald-50 text-emerald-800 border border-emerald-200'
    case 'cancelled':
      return 'bg-rose-50 text-rose-800 border border-rose-200'
    default:
      return 'bg-gray-50 text-gray-800 border border-gray-200'
  }
}

// ── Timeline calculations ──────────────────────────────────────────────────────
const statusLevels: Record<string, number> = {
  'placed': 1,
  'confirmed': 2,
  'shipped': 3,
  'delivered': 4
}

const getProgressWidth = (status: string) => {
  const s = status ? status.toLowerCase() : 'placed'
  const level = statusLevels[s] || 1
  return `${((level - 1) / 3) * 100}%`
}

const isStepCompleted = (stepId: string) => {
  if (!order.value) return false
  const currentStatus = order.value.orderStatus.toLowerCase()
  const stepLevel = statusLevels[stepId]
  const currentLevel = statusLevels[currentStatus] || 1
  return stepLevel <= currentLevel
}

const getStepClass = (stepId: string) => {
  if (!order.value) return 'border-charcoal/20 bg-white text-charcoal/40'
  const currentStatus = order.value.orderStatus.toLowerCase()
  const stepLevel = statusLevels[stepId]
  const currentLevel = statusLevels[currentStatus] || 1

  if (stepLevel < currentLevel) {
    return 'border-deep-plum bg-deep-plum text-white scale-100 shadow-sm'
  } else if (stepLevel === currentLevel) {
    return 'border-deep-plum bg-white text-deep-plum scale-110 ring-4 ring-deep-plum/10 font-bold'
  } else {
    return 'border-charcoal/15 bg-white text-charcoal/40'
  }
}
</script>
