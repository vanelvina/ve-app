<template>
  <div class="min-h-screen bg-warm-ivory py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      
      <!-- Breadcrumb -->
      <nav class="flex text-xs font-ui mb-6 text-charcoal/50" aria-label="Breadcrumb">
        <NuxtLink to="/" class="hover:text-deep-plum transition-colors">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/myaccount" class="hover:text-deep-plum transition-colors">My Account</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-charcoal font-semibold">My Orders</span>
      </nav>

      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="font-serif text-3xl font-bold text-deep-plum">Order History</h1>
        <p class="text-xs text-charcoal/50 mt-1 font-ui">Track and manage your recent orders</p>
      </div>

      <!-- Orders Container -->
      <div v-if="auth.isLoggedIn" class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 animate-slide-up">
        
        <!-- Loading Shimmer State -->
        <div v-if="loadingOrders" class="space-y-4">
          <div v-for="i in 3" :key="i" class="border border-rose-blush/20 rounded-2xl p-5 space-y-3 animate-pulse">
            <div class="flex justify-between items-center">
              <div class="h-4 bg-charcoal/10 rounded w-1/3"></div>
              <div class="h-5 bg-charcoal/10 rounded-full w-20"></div>
            </div>
            <div class="h-3 bg-charcoal/10 rounded w-1/4"></div>
            <div class="border-t border-rose-blush/10 pt-3 flex justify-between">
              <div class="h-4 bg-charcoal/10 rounded w-16"></div>
              <div class="h-4 bg-charcoal/10 rounded w-24"></div>
            </div>
          </div>
        </div>

        <!-- Orders List -->
        <div v-else-if="orders.length > 0" class="space-y-4">
          <div
            v-for="order in orders"
            :key="order._id"
            class="border border-rose-blush/30 hover:border-dusty-rose/30 rounded-2xl p-5 transition-all bg-warm-ivory/5 group hover:shadow-soft"
          >
            <!-- Order Header Info -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <span class="text-xs font-bold text-charcoal/50 font-ui tracking-wide">ORDER ID</span>
                <h3 class="font-ui font-black text-sm text-deep-plum">{{ order.orderId }}</h3>
              </div>
              <div class="flex items-center gap-3 sm:self-start">
                <!-- Status Badge -->
                <span 
                  class="px-2.5 py-1 text-[10px] font-bold font-ui rounded-full uppercase tracking-wider"
                  :class="getStatusClass(order.orderStatus)"
                >
                  {{ order.orderStatus }}
                </span>
                <!-- Payment Status Badge -->
                <span
                  v-if="order.paymentStatus !== 'pending'"
                  class="px-2 py-0.5 text-[9px] font-bold font-ui rounded-md uppercase tracking-wider"
                  :class="order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
                >
                  {{ order.paymentStatus }}
                </span>
              </div>
            </div>

            <!-- Placed Date -->
            <p class="text-xs text-charcoal/50 font-ui mt-1">
              Placed on {{ formatDate(order.createdAt) }}
            </p>

            <!-- Divider -->
            <div class="border-t border-rose-blush/20 my-4"></div>

            <!-- Summary Details -->
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <!-- Items Images (Preview up to 4 items) -->
                <div class="flex -space-x-2.5 overflow-hidden">
                  <div 
                    v-for="(item, idx) in order.items.slice(0, 4)" 
                    :key="idx" 
                    class="w-10 h-10 rounded-lg border border-white bg-warm-ivory shadow-xs overflow-hidden flex items-center justify-center shrink-0"
                  >
                    <img 
                      v-if="item.image" 
                      :src="item.image" 
                      :alt="item.name" 
                      class="w-full h-full object-cover" 
                    />
                    <div v-else class="w-full h-full bg-rose-blush/20 flex items-center justify-center">
                      <svg class="w-4 h-4 text-charcoal/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  </div>
                  <div 
                    v-if="order.items.length > 4" 
                    class="w-10 h-10 rounded-lg border border-white bg-deep-plum text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-xs"
                  >
                    +{{ order.items.length - 4 }}
                  </div>
                </div>
                
                <div>
                  <p class="text-xs text-charcoal/60 font-ui font-semibold">
                    {{ order.items.length }} {{ order.items.length === 1 ? 'item' : 'items' }}
                  </p>
                  <p class="text-sm font-sans font-bold text-charcoal mt-0.5">
                    {{ formatPrice(order.total) }}
                  </p>
                </div>
              </div>

              <!-- View Details Button -->
              <NuxtLink 
                :to="`/account/orders/${order.orderId}`" 
                class="px-4 py-2 border border-deep-plum/20 hover:border-deep-plum/60 hover:bg-rose-blush/5 text-deep-plum font-ui font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
              >
                View Details
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>

          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <svg class="w-16 h-16 text-charcoal/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 class="font-serif text-lg text-deep-plum font-bold mb-1">No orders yet</h3>
          <p class="text-xs text-mid-gray font-ui mb-6">Looks like you haven't made your first purchase yet.</p>
          <NuxtLink to="/products" class="inline-block px-6 py-2.5 bg-deep-plum text-white font-ui font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#7a3e4a] transition-all">
            Start Shopping
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/formatters'

definePageMeta({
  middleware: [
    function (to, from) {
      const auth = useAuthStore()
      const ui = useUIStore()
      if (!auth.isLoggedIn) {
        ui.openAuthModal(to.fullPath)
        ui.addToast('warning', 'Please sign in to view your orders.')
        return navigateTo(`/?auth_trigger=true&redirect=${encodeURIComponent(to.fullPath)}`)
      }
    }
  ]
})

const auth = useAuthStore()
const ui = useUIStore()

const orders = ref<any[]>([])
const loadingOrders = ref(false)

onMounted(async () => {
  if (auth.isLoggedIn) {
    loadingOrders.value = true
    try {
      orders.value = await auth.fetchMyOrders()
    } catch (err) {
      console.error('Fetch orders error:', err)
      ui.addToast('error', 'Could not load order history.')
    } finally {
      loadingOrders.value = false
    }
  }
})

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
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
</script>
