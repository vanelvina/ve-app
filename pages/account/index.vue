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

            <!-- Profile Info Display -->
            <div class="space-y-4">
              <div v-if="!isEditing" class="space-y-4">
                <div class="flex justify-between items-start">
                  <div class="min-w-0 flex-1">
                    <span class="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider font-ui block mb-1">Display Name</span>
                    <span class="text-sm font-ui font-bold text-charcoal/80 block truncate">{{ auth.user?.name || 'Not provided' }}</span>
                  </div>
                  <button 
                    @click="startEdit" 
                    class="text-xs font-bold text-deep-plum hover:underline font-ui flex items-center gap-1 shrink-0 ml-4 cursor-pointer"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                  </button>
                </div>

                <div class="border-t border-rose-blush/10 my-2"></div>

                <div>
                  <span class="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider font-ui block mb-1">Mobile Number</span>
                  <span class="text-sm font-ui font-semibold text-charcoal/80">{{ auth.user?.phone || 'Not provided' }}</span>
                </div>
              </div>

              <!-- Profile Edit Mode -->
              <div v-else class="space-y-3">
                <div class="space-y-1">
                  <label class="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Display Name</label>
                  <input
                    v-model="editName"
                    type="text"
                    placeholder="Enter your name"
                    class="w-full px-3 py-2 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum/20 transition-all bg-warm-ivory/20"
                  />
                </div>

                <div class="space-y-1">
                  <label class="text-[10px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Mobile Number</label>
                  <input
                    v-model="editPhone"
                    type="text"
                    placeholder="Enter mobile number"
                    class="w-full px-3 py-2 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum/20 transition-all bg-warm-ivory/20"
                  />
                </div>

                <div class="flex gap-2 justify-end pt-2">
                  <button 
                    @click="isEditing = false"
                    class="px-3 py-1.5 border border-charcoal/20 rounded-lg text-xs font-ui font-semibold text-charcoal/70 hover:bg-light-gray transition-colors cursor-pointer"
                  >Cancel</button>
                  <button 
                    @click="saveProfile"
                    :disabled="saving"
                    class="px-3 py-1.5 bg-deep-plum text-white rounded-lg text-xs font-ui font-semibold hover:bg-[#7a3e4a] disabled:opacity-50 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <svg v-if="saving" class="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Save
                  </button>
                </div>
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

          <!-- Saved Addresses Card -->
          <div class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30 animate-slide-up space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="font-serif text-xl font-bold text-deep-plum">Saved Addresses</h2>
              <button 
                v-if="!showAddAddress"
                @click="showAddAddress = true"
                class="px-3 py-1.5 bg-warm-ivory border border-deep-plum/25 hover:bg-rose-blush/10 text-deep-plum font-ui font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New
              </button>
            </div>

            <!-- Add Address Form -->
            <div v-if="showAddAddress" class="border border-rose-blush/30 rounded-2xl p-4 bg-warm-ivory/10 space-y-3.5">
              <h3 class="font-serif text-sm font-bold text-deep-plum">{{ editingAddressId ? 'Edit Address Details' : 'New Address Details' }}</h3>
              
              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1 col-span-2">
                  <label class="text-[9px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Full Name *</label>
                  <input
                    v-model="newAddress.fullName"
                    type="text"
                    placeholder="Receiver's name"
                    class="w-full px-3 py-1.5 border border-charcoal/20 rounded-xl text-xs font-ui focus:outline-none focus:border-deep-plum bg-white"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-[9px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Phone *</label>
                  <input
                    v-model="newAddress.phone"
                    type="text"
                    placeholder="10-digit number"
                    class="w-full px-3 py-1.5 border border-charcoal/20 rounded-xl text-xs font-ui focus:outline-none focus:border-deep-plum bg-white"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-[9px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Email (Optional)</label>
                  <input
                    v-model="newAddress.email"
                    type="email"
                    placeholder="For order updates"
                    class="w-full px-3 py-1.5 border border-charcoal/20 rounded-xl text-xs font-ui focus:outline-none focus:border-deep-plum bg-white"
                  />
                </div>
                <div class="space-y-1 col-span-2">
                  <label class="text-[9px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Address Line 1 *</label>
                  <input
                    v-model="newAddress.line1"
                    type="text"
                    placeholder="Flat, House, Building, Street"
                    class="w-full px-3 py-1.5 border border-charcoal/20 rounded-xl text-xs font-ui focus:outline-none focus:border-deep-plum bg-white"
                  />
                </div>
                <div class="space-y-1 col-span-2">
                  <label class="text-[9px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Address Line 2 (Optional)</label>
                  <input
                    v-model="newAddress.line2"
                    type="text"
                    placeholder="Area, Colony, Landmark"
                    class="w-full px-3 py-1.5 border border-charcoal/20 rounded-xl text-xs font-ui focus:outline-none focus:border-deep-plum bg-white"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-[9px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">City *</label>
                  <input
                    v-model="newAddress.city"
                    type="text"
                    placeholder="City"
                    class="w-full px-3 py-1.5 border border-charcoal/20 rounded-xl text-xs font-ui focus:outline-none focus:border-deep-plum bg-white"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-[9px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">State *</label>
                  <input
                    v-model="newAddress.state"
                    type="text"
                    placeholder="State"
                    class="w-full px-3 py-1.5 border border-charcoal/20 rounded-xl text-xs font-ui focus:outline-none focus:border-deep-plum bg-white"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-[9px] font-bold text-charcoal/50 uppercase tracking-wider font-ui">Pincode *</label>
                  <input
                    v-model="newAddress.pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    class="w-full px-3 py-1.5 border border-charcoal/20 rounded-xl text-xs font-ui focus:outline-none focus:border-deep-plum bg-white"
                  />
                </div>
                <div class="flex items-center gap-2 col-span-2 pt-1">
                  <input
                    id="isDefaultCheckbox"
                    v-model="newAddress.isDefault"
                    type="checkbox"
                    class="rounded border-charcoal/30 text-deep-plum focus:ring-deep-plum/20 w-4 h-4 cursor-pointer"
                  />
                  <label for="isDefaultCheckbox" class="text-xs font-ui text-charcoal/70 cursor-pointer select-none">Set as default address</label>
                </div>
              </div>

              <div class="flex gap-2 justify-end pt-3">
                <button 
                  @click="resetAddressForm"
                  class="px-3 py-1.5 border border-charcoal/20 rounded-lg text-xs font-ui font-semibold text-charcoal/70 hover:bg-light-gray transition-colors cursor-pointer"
                >Cancel</button>
                <button 
                  @click="saveAddress"
                  :disabled="savingAddress"
                  class="px-4 py-1.5 bg-deep-plum text-white rounded-lg text-xs font-ui font-semibold hover:bg-[#7a3e4a] disabled:opacity-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <svg v-if="savingAddress" class="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Save Address
                </button>
              </div>
            </div>

            <!-- Addresses List -->
            <div v-if="auth.user?.addresses && auth.user.addresses.length > 0" class="space-y-3">
              <div 
                v-for="address in auth.user.addresses" 
                :key="address._id"
                class="border border-rose-blush/30 hover:border-dusty-rose/30 rounded-2xl p-4 bg-warm-ivory/5 transition-all flex justify-between items-start"
              >
                <div class="space-y-1.5 text-xs font-ui text-charcoal/80">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-charcoal">{{ address.fullName }}</span>
                    <span v-if="address.isDefault" class="px-1.5 py-0.5 bg-deep-plum/10 text-deep-plum text-[9px] font-bold uppercase rounded-md tracking-wider">Default</span>
                  </div>
                  <p class="text-charcoal/60">{{ address.phone }} {{ address.email ? `| ${address.email}` : '' }}</p>
                  <p class="mt-1 font-light leading-relaxed">
                    {{ address.line1 }}<template v-if="address.line2">, {{ address.line2 }}</template><br />
                    {{ address.city }}, {{ address.state }} - {{ address.pincode }}
                  </p>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button 
                    @click="startEditAddress(address)"
                    class="text-charcoal/40 hover:text-deep-plum transition-colors p-1 cursor-pointer"
                    title="Edit Address"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    @click="deleteAddress(address._id)"
                    class="text-charcoal/40 hover:text-red-500 transition-colors p-1 cursor-pointer"
                    title="Delete Address"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div v-else-if="!showAddAddress" class="text-center py-6 border border-dashed border-rose-blush/30 rounded-2xl bg-warm-ivory/5">
              <svg class="w-8 h-8 text-charcoal/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="text-xs text-charcoal/50 font-ui font-medium">No saved addresses found</p>
            </div>
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
const editPhone = ref('')
const saving = ref(false)

// ── Saved Addresses State ─────────────────────────────────────────────────────
const showAddAddress = ref(false)
const editingAddressId = ref<string | null>(null)
const savingAddress = ref(false)
const newAddress = ref({
  fullName: '',
  phone: '',
  email: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
  isDefault: false
})

const resetAddressForm = () => {
  newAddress.value = {
    fullName: '',
    phone: '',
    email: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  }
  showAddAddress.value = false
  editingAddressId.value = null
}

const startEditAddress = (address: any) => {
  editingAddressId.value = address._id
  newAddress.value = {
    fullName: address.fullName || '',
    phone: address.phone || '',
    email: address.email || '',
    line1: address.line1 || '',
    line2: address.line2 || '',
    city: address.city || '',
    state: address.state || '',
    pincode: address.pincode || '',
    isDefault: address.isDefault || false
  }
  showAddAddress.value = true
}

const saveAddress = async () => {
  const { fullName, phone, line1, city, state, pincode } = newAddress.value
  if (!fullName.trim() || !phone.trim() || !line1.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
    ui.addToast('warning', 'Please fill in all required fields.')
    return
  }
  
  savingAddress.value = true
  try {
    if (editingAddressId.value) {
      await auth.updateAddress(editingAddressId.value, { ...newAddress.value })
      ui.addToast('success', 'Address updated successfully.')
    } else {
      await auth.addAddress({ ...newAddress.value })
      ui.addToast('success', 'Address added successfully.')
    }
    resetAddressForm()
  } catch (err: any) {
    ui.addToast('error', err.message || 'Failed to save address.')
  } finally {
    savingAddress.value = false
  }
}

const deleteAddress = async (id: string) => {
  if (!confirm('Are you sure you want to delete this address?')) return
  try {
    await auth.removeAddress(id)
    ui.addToast('success', 'Address deleted successfully.')
  } catch (err: any) {
    ui.addToast('error', err.message || 'Failed to delete address.')
  }
}

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
  editPhone.value = auth.user?.phone || ''
  isEditing.value = true
}

const saveProfile = async () => {
  const nameTrimmed = editName.value.trim()
  const phoneTrimmed = editPhone.value.trim()
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
      body: { name: nameTrimmed, phone: phoneTrimmed },
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
