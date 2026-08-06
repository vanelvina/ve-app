<template>
  <div class="min-h-screen bg-warm-ivory py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      
      <!-- Back button and breadcrumb -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <nav class="flex text-xs font-ui text-charcoal/50" aria-label="Breadcrumb">
          <NuxtLink to="/" class="hover:text-deep-plum transition-colors">Home</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/myorders" class="hover:text-deep-plum transition-colors">My Orders</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-charcoal font-semibold">Order Details</span>
        </nav>
        <NuxtLink
          to="/myorders"
          class="inline-flex items-center text-xs font-bold text-deep-plum hover:underline font-ui self-start sm:self-auto"
        >
          ← Back to Orders
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
          to="/myorders"
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
          
          <!-- Timeline Steps -->
          <div class="relative">
            <!-- Desktop Horizontal Timeline -->
            <div class="hidden md:flex relative items-center justify-between">
              <!-- Background Line -->
              <div class="absolute left-0 right-0 top-4 -translate-y-1/2 h-0.5 bg-rose-blush z-0"></div>
              <!-- Progress Fill Line -->
              <div 
                class="absolute left-0 top-4 -translate-y-1/2 h-0.5 bg-deep-plum transition-all duration-500 z-0"
                :style="{ width: getProgressWidth(order.orderStatus) }"
              ></div>

              <!-- Steps -->
              <div 
                v-for="(step, idx) in timelineSteps" 
                :key="'desk-'+idx" 
                class="relative z-10 flex flex-col items-center"
              >
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 font-ui text-xs font-bold border-2"
                  :class="getStepClass(step.id)"
                >
                  <svg v-if="isStepCompleted(step.id)" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-[10px] font-bold font-ui mt-2 text-charcoal/70 uppercase tracking-wider text-center max-w-[70px]">
                  {{ step.label }}
                </span>
                <span v-if="getStepTimestamp(step.id)" class="text-[8px] font-ui mt-0.5 text-charcoal/50 text-center max-w-[70px]">
                  {{ getStepTimestamp(step.id) }}
                </span>
              </div>
            </div>

            <!-- Mobile Vertical Timeline -->
            <div class="flex md:hidden flex-col space-y-6 relative pl-2">
              <!-- Background Line -->
              <div class="absolute left-6 top-2 bottom-4 w-0.5 bg-rose-blush z-0"></div>
              <!-- Progress Fill Line -->
              <div 
                class="absolute left-6 top-2 w-0.5 bg-deep-plum transition-all duration-500 z-0"
                :style="{ height: getProgressWidth(order.orderStatus) }"
              ></div>

              <!-- Steps -->
              <div 
                v-for="(step, idx) in timelineSteps" 
                :key="'mob-'+idx" 
                class="relative z-10 flex items-start gap-4"
              >
                <div 
                  class="w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 font-ui text-xs font-bold border-2"
                  :class="getStepClass(step.id)"
                >
                  <svg v-if="isStepCompleted(step.id)" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div class="pt-1.5">
                  <span class="text-[11px] font-bold font-ui text-charcoal/80 uppercase tracking-wider block">
                    {{ step.label }}
                  </span>
                  <span v-if="getStepTimestamp(step.id)" class="text-[10px] font-ui mt-0.5 text-charcoal/50 block">
                    {{ getStepTimestamp(step.id) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Cancelled State Timeline -->
          <div v-if="order.orderStatus === 'cancelled'" class="mt-6 flex items-center gap-4 px-4 py-3 bg-red-50 rounded-2xl border border-red-200 text-red-800">
            <svg class="w-6 h-6 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="font-ui font-bold text-sm">Order Cancelled</p>
              <p class="text-xs text-red-700/80 mt-0.5 font-ui">This order has been cancelled and will not be processed further.</p>
            </div>
          </div>
        </div>

        <!-- Live Shiprocket Tracking -->
        <div v-if="order.awbCode" class="bg-white rounded-3xl p-6 shadow-card border border-rose-blush/30">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-xs font-bold text-charcoal/40 font-ui tracking-wide uppercase">Live Shipment Tracking</h3>
            <div class="flex items-center gap-2">
              <span v-if="order.courierName" class="text-[10px] font-bold font-ui text-charcoal/50 uppercase bg-rose-blush/20 px-2 py-0.5 rounded-full">{{ order.courierName }}</span>
              <span class="font-mono text-xs font-bold text-deep-plum">{{ order.awbCode }}</span>
              <button @click="fetchTracking" :disabled="trackingLoading" class="p-1.5 rounded-lg hover:bg-rose-blush/20 text-charcoal/40 hover:text-deep-plum transition-all" title="Refresh tracking">
                <svg :class="trackingLoading ? 'animate-spin' : ''" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Expected Delivery -->
          <div v-if="tracking?.expectedDelivery" class="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-2xl border border-emerald-200 mb-5">
            <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Expected Delivery</p>
              <p class="text-sm font-bold text-emerald-800 font-ui mt-0.5">{{ tracking.expectedDelivery }}</p>
            </div>
          </div>

          <!-- Delivered Banner -->
          <div v-if="tracking?.deliveredDate" class="flex items-center gap-3 px-4 py-3 bg-emerald-50 rounded-2xl border border-emerald-200 mb-5">
            <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Delivered</p>
              <p class="text-sm font-bold text-emerald-800 font-ui mt-0.5">{{ tracking.deliveredDate }}</p>
            </div>
          </div>

          <!-- Tracking Loading -->
          <div v-if="trackingLoading" class="py-8 text-center">
            <svg class="animate-spin h-6 w-6 text-rose-blush mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <p class="text-xs text-charcoal/40 font-ui">Fetching live updates…</p>
          </div>

          <!-- Tracking Events -->
          <div v-else-if="tracking?.events?.length" class="space-y-0">
            <div
              v-for="(evt, i) in tracking.events"
              :key="i"
              class="relative flex gap-4 pb-5 last:pb-0"
            >
              <!-- Timeline dot and line -->
              <div class="flex flex-col items-center">
                <div :class="i === 0 ? 'bg-deep-plum ring-4 ring-rose-blush/40' : 'bg-charcoal/20'" class="w-2.5 h-2.5 rounded-full mt-1 shrink-0 transition-all"/>
                <div v-if="i < tracking.events.length - 1" class="w-px flex-1 bg-rose-blush/30 mt-1"/>
              </div>
              <!-- Event info -->
              <div class="pb-1 min-w-0">
                <p class="text-sm font-bold font-ui text-deep-plum leading-tight">{{ evt.activity }}</p>
                <p v-if="evt.location" class="text-xs text-charcoal/50 font-ui mt-0.5">📍 {{ evt.location }}</p>
                <p class="text-[10px] text-charcoal/40 font-ui mt-1">{{ evt.date }}</p>
              </div>
            </div>
          </div>

          <!-- No events yet -->
          <div v-else-if="!trackingLoading" class="py-6 text-center">
            <p class="text-xs text-charcoal/40 font-ui">No tracking events yet. Check back after pickup is scheduled.</p>
          </div>
        </div>

        <!-- Tracking not yet available (no AWB) -->
        <div v-else-if="['shipped', 'out_for_delivery', 'delivered'].includes(order.orderStatus) && !order.awbCode"
          class="bg-amber-50 rounded-3xl p-5 border border-amber-200 flex items-center gap-4">
          <svg class="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-xs font-ui text-amber-800">Tracking details will appear here once your shipment is handed to the courier.</p>
        </div>

        <!-- Cancel Order (pre-ship only) -->
        <div
          v-if="isCancellable"
          class="bg-red-50 rounded-3xl p-5 border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h3 class="font-bold text-red-800 text-sm uppercase tracking-wide">Cancel This Order</h3>
            <p class="text-xs text-red-700/80 mt-1 font-ui leading-relaxed">
              Your order hasn't shipped yet. You can cancel it now and we'll process your refund (if applicable) within 5–7 business days.
            </p>
          </div>
          <button
            id="cancel-order-btn"
            @click="cancelOrder"
            :disabled="cancelling"
            class="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-sm"
            aria-label="Cancel this order"
          >
            <svg v-if="cancelling" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            {{ cancelling ? 'Cancelling…' : 'Cancel Order' }}
          </button>
        </div>

        <!-- Return / Exchange Actions -->
        <div v-if="isEligibleForReturnOrExchange" class="bg-rose-blush/10 rounded-3xl p-6 shadow-card border border-rose-blush/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 class="font-bold text-deep-plum text-sm uppercase tracking-wide">Return & Exchange Window Open</h3>
            <p class="text-xs text-charcoal/70 mt-1">You have <strong>3 days</strong> from delivery to request a return or exchange for this order.</p>
          </div>
          <div class="flex gap-3">
            <button @click="requestExchange" class="px-5 py-2.5 bg-white border border-rose-blush text-deep-plum font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-rose-blush/20 transition-all shadow-soft">
              Exchange
            </button>
            <button @click="requestReturn" class="px-5 py-2.5 bg-deep-plum text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-deep-plum/90 transition-all shadow-premium">
              Return
            </button>
          </div>
        </div>
        
        <div v-else-if="order.orderStatus === 'return_requested' || order.orderStatus === 'exchange_requested' || order.orderStatus === 'returned' || order.orderStatus === 'exchanged'" class="bg-blue-50 rounded-3xl p-6 shadow-card border border-blue-200">
          <div class="flex gap-4 items-start text-blue-800">
            <svg class="w-6 h-6 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div class="flex-1">
              <p class="font-bold text-sm uppercase">{{ order.orderStatus.replace(/_/g, ' ') }}</p>
              <p class="text-xs mt-0.5 opacity-80">Your request has been received. Our logistics partner will coordinate pickup within 2–3 business days.</p>
              <!-- Return AWB Tracking -->
              <div v-if="order.returnAwbCode" class="mt-3 flex flex-wrap items-center gap-2">
                <div class="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-blue-200">
                  <svg class="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  <div>
                    <p class="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Return Pickup AWB</p>
                    <p class="font-mono text-sm font-bold text-blue-800">{{ order.returnAwbCode }}</p>
                  </div>
                </div>
                <span v-if="order.returnCourierName" class="text-xs font-bold text-blue-600/70 uppercase px-2 py-1 bg-blue-100 rounded-lg">{{ order.returnCourierName }}</span>
                <span v-if="order.returnPickupDate" class="text-xs text-blue-700 font-ui">Pickup: {{ order.returnPickupDate }}</span>
              </div>
              <div v-else class="mt-2">
                <p class="text-[11px] text-blue-700/70 font-ui italic">Return pickup AWB will be assigned shortly. You'll receive a notification once confirmed.</p>
              </div>
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
import { ref, onMounted, computed } from 'vue'

definePageMeta({
  middleware: [
    function (to) {
      if (import.meta.server) return  // auth state lives in localStorage – client only
      const auth = useAuthStore()
      auth.init()  // read token from localStorage before checking isLoggedIn
      const ui = useUIStore()
      if (!auth.isLoggedIn) {
        ui.openAuthModal(to.fullPath)
        ui.addToast('info', 'Please sign in to view your order details.')
        return navigateTo(`/?auth_trigger=true&redirect=${encodeURIComponent(to.fullPath)}`)
      }
    }
  ]
})

const route = useRoute()
const config = useRuntimeConfig()
const auth = useAuthStore()

// ── State ─────────────────────────────────────────────────────────────────────
const order = ref<any>(null)
const loading = ref(true)
const error = ref('')

// ── Timeline steps config (4 steps) ──────────────────────────────────────────
const timelineSteps = computed(() => {
  const baseSteps = [
    { id: 'received',         label: 'Order Received' },
    { id: 'shipped',          label: 'Shipped' },
    { id: 'out_for_delivery', label: 'Out for Delivery' },
    { id: 'delivered',        label: 'Delivered' }
  ]

  if (order.value?.orderStatus === 'cancelled') {
    const history = order.value.statusHistory || []
    const nonCancelHistory = history.filter((h: any) => h.status !== 'cancelled')
    const lastStatus = nonCancelHistory.length > 0 ? nonCancelHistory[nonCancelHistory.length - 1].status : 'placed'
    const lastIdx = baseSteps.findIndex(s => s.id === normalizeStatus(lastStatus))
    const steps = baseSteps.slice(0, lastIdx + 1)
    steps.push({ id: 'cancelled', label: 'Cancelled' })
    return steps
  }

  return baseSteps
})

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
    // Auto-fetch tracking if AWB is available
    if (data?.awbCode) fetchTracking()
  } catch (err: any) {
    console.error('Fetch order error:', err)
    error.value = err.data?.message || 'Could not find the order details.'
  } finally {
    loading.value = false
  }
})

// ── Live Tracking ──────────────────────────────────────────────────────────────────
const tracking = ref<any>(null)
const trackingLoading = ref(false)

const fetchTracking = async () => {
  if (!order.value?.awbCode) return
  trackingLoading.value = true
  try {
    const data = await $fetch<any>(`/api/shiprocket/track?awb=${order.value.awbCode}`)
    if (data?.success) tracking.value = data
  } catch (err) {
    console.warn('Tracking fetch failed:', err)
  } finally {
    trackingLoading.value = false
  }
}

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
    case 'accepted':
    case 'confirmed':
    case 'label_created':
    case 'ready_to_ship':
    case 'packed':
      return 'bg-amber-50 text-amber-800 border border-amber-200'
    case 'shipped':
      return 'bg-indigo-50 text-indigo-800 border border-indigo-200'
    case 'out_for_delivery':
    case 'in_transit':
      return 'bg-blue-50 text-blue-800 border border-blue-200'
    case 'delivered':
      return 'bg-emerald-50 text-emerald-800 border border-emerald-200'
    case 'cancelled':
      return 'bg-rose-50 text-rose-800 border border-rose-200'
    default:
      return 'bg-gray-50 text-gray-800 border border-gray-200'
  }
}

// Helper to normalize any raw/internal status → 4-step timeline IDs
const normalizeStatus = (status: string) => {
  const s = status ? status.toLowerCase() : 'placed'
  // All pre-ship stages collapse to 'received'
  if (['placed', 'accepted', 'confirmed', 'label_created', 'ready_to_ship', 'packed'].includes(s)) return 'received'
  // in_transit maps to out_for_delivery
  if (s === 'in_transit') return 'out_for_delivery'
  return s
}

// ── Timeline calculations ──────────────────────────────────────────────────────
const statusLevels = computed(() => {
  const base: Record<string, number> = {
    'received':         1,
    'shipped':          2,
    'out_for_delivery': 3,
    'delivered':        4
  }

  if (order.value?.orderStatus === 'cancelled') {
    const steps = timelineSteps.value
    const levels: Record<string, number> = {}
    steps.forEach((step, idx) => {
      levels[step.id] = idx + 1
    })
    return levels
  }

  return base
})

const getProgressWidth = (status: string) => {
  const s = normalizeStatus(status)
  const levels = statusLevels.value
  const level = levels[s] || 1
  const total = Object.keys(levels).length
  return total > 1 ? `${((level - 1) / (total - 1)) * 100}%` : '0%'
}

const isStepCompleted = (stepId: string) => {
  if (!order.value) return false
  const currentStatus = normalizeStatus(order.value.orderStatus)
  const levels = statusLevels.value
  const stepLevel = levels[stepId] || 1
  const currentLevel = levels[currentStatus] || 1
  return stepLevel <= currentLevel
}

const getStepClass = (stepId: string) => {
  if (!order.value) return 'border-charcoal/15 bg-white'
  const currentStatus = normalizeStatus(order.value.orderStatus)
  const levels = statusLevels.value
  const stepLevel = levels[stepId] || 1
  const currentLevel = levels[currentStatus] || 1

  if (stepLevel <= currentLevel) {
    // Completed or current — same dark fill
    if (currentStatus === 'cancelled' && stepId === 'cancelled') {
      return 'border-red-600 bg-red-600 text-white shadow-sm'
    }
    return 'border-deep-plum bg-deep-plum text-white shadow-sm'
  } else {
    // Pending — plain white ring
    return 'border-charcoal/20 bg-white'
  }
}

const getStepTimestamp = (stepId: string) => {
  if (!order.value?.statusHistory) return ''
  const entry = order.value.statusHistory.find((h: any) => h.status === stepId)
  if (!entry) return ''
  const date = new Date(entry.timestamp)
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const isEligibleForReturnOrExchange = computed(() => {
  if (!order.value || order.value.orderStatus !== 'delivered') return false
  // If every item in the order is flagged non-returnable, hide buttons
  const allNonReturnable = order.value.items?.length > 0 &&
    order.value.items.every((item: any) => item.isReturnable === false)
  if (allNonReturnable) return false
  const deliveredEntry = order.value.statusHistory?.slice().reverse().find((h: any) => h.status === 'delivered')
  const deliveredDate = deliveredEntry ? new Date(deliveredEntry.timestamp).getTime() : new Date(order.value.updatedAt).getTime()
  // Return window: 3 days from delivery (must match backend)
  const threeDays = 3 * 24 * 60 * 60 * 1000
  return (Date.now() - deliveredDate) <= threeDays
})

// Cancellable only before shipped stage
const NON_CANCELLABLE_STATUSES = ['shipped', 'out_for_delivery', 'delivered', 'cancelled',
  'return_requested', 'exchange_requested', 'returned', 'exchanged']

const isCancellable = computed(() => {
  if (!order.value) return false
  return !NON_CANCELLABLE_STATUSES.includes(order.value.orderStatus)
})

const cancelling = ref(false)
const { $alert, $confirm, $prompt } = useDialog()

const cancelOrder = async () => {
  if (!order.value) return
  const confirmed = await $confirm(
    `Are you sure you want to cancel Order #${order.value.orderId}? This action cannot be undone.`,
    { title: 'Cancel Order' }
  )
  if (!confirmed) return

  const reason = await $prompt('Reason for cancellation (optional):', {
    title: 'Cancellation Reason',
    placeholder: 'e.g. Changed my mind…'
  }) ?? ''

  cancelling.value = true
  try {
    await $fetch(`${config.public.apiBase}/orders/${order.value._id}/cancel`, {
      method: 'POST',
      headers: auth.getHeaders(),
      body: { reason: reason || 'Cancelled by customer' }
    })
    location.reload()
  } catch (err: any) {
    await $alert(err.data?.message || 'Failed to cancel order. Please try again.')
  } finally {
    cancelling.value = false
  }
}


const requestReturn = async () => {
  const reason = await $prompt('Please provide a reason for the return:', {
    title: 'Request Return',
    placeholder: 'e.g. Wrong size, damaged item…'
  })
  if (!reason) return
  
  try {
    await $fetch(`${config.public.apiBase}/orders/${order.value._id}/return`, {
      method: 'POST',
      headers: auth.getHeaders(),
      body: { reason }
    })
    await $alert('Return requested successfully. Our team will reach out shortly.')
    location.reload()
  } catch (err: any) {
    await $alert(err.data?.message || 'Failed to request return')
  }
}

const requestExchange = async () => {
  const reason = await $prompt('Please provide a reason for the exchange:', {
    title: 'Request Exchange',
    placeholder: 'e.g. Need a different size…'
  })
  if (!reason) return
  
  try {
    await $fetch(`${config.public.apiBase}/orders/${order.value._id}/exchange`, {
      method: 'POST',
      headers: auth.getHeaders(),
      body: { reason }
    })
    await $alert('Exchange requested successfully. Our team will reach out shortly.')
    location.reload()
  } catch (err: any) {
    await $alert(err.data?.message || 'Failed to request exchange')
  }
}
</script>

