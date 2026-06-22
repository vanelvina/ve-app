<template>
  <div class="min-h-screen bg-warm-ivory py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      
      <!-- Breadcrumb -->
      <nav class="flex text-xs font-ui mb-6 text-charcoal/50" aria-label="Breadcrumb">
        <NuxtLink to="/" class="hover:text-deep-plum transition-colors">Home</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-charcoal font-semibold">My Account</span>
      </nav>

      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-deep-plum">My Account</h1>
        <p class="text-xs text-charcoal/50 mt-1 font-ui">Manage your profile and track your orders</p>
      </div>

      <!-- Main Layout Grid -->
      <div v-if="auth.isLoggedIn" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Profile Column -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- Profile Card -->
          <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 animate-slide-up">
            <div class="flex flex-col items-center text-center">
              
              <!-- Avatar -->
              <div class="w-24 h-24 rounded-full border-2 border-deep-plum/20 flex items-center justify-center bg-rose-blush text-3xl font-bold text-deep-plum font-serif shadow-sm overflow-hidden mb-4 relative">
                <img v-if="auth.user?.avatar" :src="auth.user.avatar" :alt="auth.user.name" class="w-full h-full object-cover" />
                <span v-else>{{ userInitials }}</span>
              </div>

              <!-- Name & Email -->
              <h2 class="font-serif text-xl font-bold text-deep-plum truncate max-w-full">{{ auth.user?.name || 'Customer' }}</h2>
              <p class="text-xs text-charcoal/60 mt-1 font-ui truncate max-w-full">{{ auth.user?.email }}</p>

              <!-- Auth Method badge -->
              <div class="mt-3 flex items-center gap-1.5 px-3 py-1 bg-warm-ivory rounded-full border border-charcoal/10">
                <span class="w-1.5 h-1.5 rounded-full" :class="auth.user?.authMethod === 'google' ? 'bg-emerald-500' : 'bg-deep-plum'"></span>
                <span class="text-[10px] font-ui font-bold text-charcoal/70 tracking-wider uppercase">
                  Verified via {{ auth.user?.authMethod || 'email' }}
                </span>
              </div>
            </div>

            <div class="border-t border-rose-blush/20 my-6"></div>

            <!-- Profile form / Edit name -->
            <div class="space-y-4">
              <div v-if="!isEditing" class="flex justify-between items-center">
                <span class="text-xs font-semibold text-charcoal/60 font-ui">Name</span>
                <button 
                  @click="startEdit" 
                  class="text-xs font-bold text-deep-plum hover:underline font-ui"
                >Edit</button>
              </div>

              <div v-if="isEditing" class="space-y-3">
                <div class="space-y-1">
                  <label class="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Edit Display Name</label>
                  <input
                    v-model="editName"
                    type="text"
                    placeholder="Enter your name"
                    class="w-full px-3 py-2 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum/20 transition-all bg-warm-ivory/20"
                  />
                </div>
                <div class="flex gap-2 justify-end">
                  <button 
                    @click="isEditing = false"
                    class="px-3 py-1.5 border border-charcoal/20 rounded-lg text-xs font-ui font-semibold text-charcoal/70 hover:bg-light-gray transition-colors"
                  >Cancel</button>
                  <button 
                    @click="saveProfile"
                    :disabled="saving"
                    class="px-3 py-1.5 bg-deep-plum text-white rounded-lg text-xs font-ui font-semibold hover:bg-[#7a3e4a] disabled:opacity-50 transition-colors flex items-center gap-1"
                  >
                    <svg v-if="saving" class="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Save
                  </button>
                </div>
              </div>
              <div v-else class="text-sm font-ui text-charcoal/80">
                {{ auth.user?.name || 'Not provided' }}
              </div>
            </div>

            <!-- Logout Button -->
            <button
              @click="handleLogout"
              class="w-full mt-6 py-2.5 border-2 border-red-500/10 hover:border-red-500/20 text-red-500 hover:bg-red-50/30 rounded-xl font-ui font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>

          </div>
        </div>

        <!-- Orders History Column -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 animate-slide-up">
            <h2 class="font-serif text-xl font-bold text-deep-plum mb-6">Order History</h2>

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
                      <p class="text-xs text-charcoal/40 font-ui font-medium">
                        Payment: {{ order.paymentMethod.toUpperCase() }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <div class="text-right">
                      <span class="text-[10px] font-bold text-charcoal/40 font-ui tracking-wide">TOTAL</span>
                      <p class="font-serif font-bold text-base text-deep-plum">₹{{ order.total.toLocaleString('en-IN') }}</p>
                    </div>

                    <!-- View Details Link -->
                    <NuxtLink
                      :to="`/account/orders/${order.orderId}`"
                      class="px-4 py-2 border border-deep-plum/20 hover:border-deep-plum hover:bg-rose-blush/10 rounded-xl text-xs font-bold text-deep-plum font-ui tracking-wider uppercase transition-all"
                    >
                      Details
                    </NuxtLink>
                  </div>
                </div>

              </div>
            </div>

            <!-- Empty Orders State -->
            <div v-else class="text-center py-12 px-4 space-y-4">
              <div class="w-16 h-16 rounded-full bg-rose-blush flex items-center justify-center mx-auto text-deep-plum">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div class="space-y-1">
                <h3 class="font-serif text-lg font-bold text-deep-plum">No Orders Yet</h3>
                <p class="text-xs text-charcoal/50 max-w-sm mx-auto font-ui">
                  Explore our luxury, beautifully crafted lingerie and premium collections. Your first order is just a click away!
                </p>
              </div>
              <NuxtLink
                to="/products"
                class="inline-block px-6 py-2.5 bg-deep-plum text-white font-ui font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-[#7a3e4a] transition-all shadow-sm"
              >
                Start Shopping
              </NuxtLink>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const auth = useAuthStore()
const ui = useUIStore()
const router = useRouter()

// ── State ─────────────────────────────────────────────────────────────────────
const orders = ref<any[]>([])
const loadingOrders = ref(false)
const isEditing = ref(false)
const editName = ref('')
const saving = ref(false)

// ── Initials for avatar placeholder ──────────────────────────────────────────
const userInitials = computed(() => {
  const name = auth.user?.name || ''
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
})

// ── Authentication Check & Fetching ───────────────────────────────────────────
onMounted(async () => {
  if (!auth.isLoggedIn) {
    ui.addToast('warning', 'Please sign in to view your profile.')
    ui.openAuthModal()
    router.replace('/')
  } else {
    loadingOrders.value = true
    try {
      await auth.fetchProfile()
      orders.value = await auth.fetchMyOrders()
    } catch (err) {
      console.error('Fetch profile/orders error:', err)
      ui.addToast('error', 'Could not load order history.')
    } finally {
      loadingOrders.value = false
    }
  }
})

// ── Edit Profile ──────────────────────────────────────────────────────────────
const startEdit = () => {
  editName.value = auth.user?.name || ''
  isEditing.value = true
}

const saveProfile = async () => {
  const nameTrimmed = editName.value.trim()
  if (!nameTrimmed) {
    ui.addToast('warning', 'Name cannot be empty')
    return
  }
  saving.value = true
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any>(`${config.public.apiBase}/user-auth/me`, {
      method: 'PUT',
      headers: auth.getHeaders(),
      body: { name: nameTrimmed },
    })
    auth.user = data
    localStorage.setItem('ve_user', JSON.stringify(data))
    isEditing.value = false
    ui.addToast('success', 'Profile updated successfully')
  } catch (err: any) {
    ui.addToast('error', err.data?.message || 'Failed to update profile')
  } finally {
    saving.value = false
  }
}

const handleLogout = () => {
  auth.logout()
  ui.addToast('info', 'Signed out successfully.')
  router.replace('/')
}

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
