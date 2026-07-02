<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 backdrop-blur-sm p-4" @click.self="closeModal">
      <div class="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="coupon-modal-title">
        
        <div class="flex items-center justify-between p-4 border-b border-border-gray">
          <h2 id="coupon-modal-title" class="font-serif text-lg font-bold text-deep-plum">Available Offers</h2>
          <button @click="closeModal" class="p-2 text-mid-gray hover:text-charcoal transition-colors rounded-full hover:bg-warm-ivory" aria-label="Close modal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="p-4 overflow-y-auto max-h-[60vh] space-y-4">
          <!-- Loading State -->
          <div v-if="loading" class="py-12 flex flex-col items-center justify-center">
            <div class="w-8 h-8 border-4 border-rose-blush border-t-deep-plum rounded-full animate-spin mb-4"></div>
            <p class="text-sm font-ui text-mid-gray">Checking your eligibility...</p>
          </div>

          <!-- Login Prompt -->
          <div v-else-if="!isLoggedIn" class="bg-warm-ivory border border-rose-blush rounded-xl p-4 text-center">
            <p class="text-sm font-ui text-charcoal mb-3">Please log in to view and apply your exclusive loyalty coupons.</p>
            <AppButton size="sm" @click="ui.openAuthModal()">Log In / Sign Up</AppButton>
          </div>

          <!-- Coupons List -->
          <template v-else>
            <div v-for="coupon in coupons" :key="coupon.code" 
              class="border rounded-xl p-4 transition-all"
              :class="coupon.eligible ? 'border-border-gray bg-white hover:border-deep-plum hover:shadow-soft' : 'border-gray-100 bg-gray-50 opacity-60'">
              
              <div class="flex justify-between items-start gap-3">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-mono font-bold text-deep-plum bg-rose-blush/30 px-2 py-0.5 rounded text-sm">{{ coupon.code }}</span>
                    <span class="text-xs font-bold text-white bg-deep-plum px-1.5 py-0.5 rounded">{{ coupon.discountLabel }}</span>
                  </div>
                  <p class="text-xs font-ui text-charcoal font-medium mt-2">{{ coupon.title }}</p>
                  <p class="text-[10px] font-ui text-mid-gray mt-1">{{ coupon.description }}</p>
                  
                  <p v-if="!coupon.eligible" class="text-[10px] font-ui text-red-500 font-medium mt-2">
                    🔒 {{ coupon.reason }}
                  </p>
                </div>
                
                <AppButton 
                  size="sm" 
                  :variant="coupon.eligible ? 'primary' : 'secondary'"
                  :disabled="!coupon.eligible"
                  @click="applyCode(coupon.code)"
                >
                  Apply
                </AppButton>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'apply'])

const auth = useAuthStore()
const ui = useUIStore()

const loading = ref(false)
const deliveredCount = ref(0)
const isLoggedIn = computed(() => auth.isLoggedIn)

const loadEligibility = async () => {
  if (!isLoggedIn.value) return
  loading.value = true
  try {
    const orders = await auth.fetchMyOrders()
    if (Array.isArray(orders)) {
      deliveredCount.value = orders.filter((o: any) => o.orderStatus === 'delivered' || o.status === 'delivered').length
    } else {
      deliveredCount.value = 0
    }
  } catch (err) {
    console.error('Failed to fetch orders for coupon modal', err)
    deliveredCount.value = 0
  } finally {
    loading.value = false
  }
}

watch(() => props.isOpen, (open) => {
  if (open) {
    loadEligibility()
  }
})

watch(isLoggedIn, (loggedIn) => {
  if (props.isOpen && loggedIn) {
    loadEligibility()
  }
})

const coupons = computed(() => [
  {
    code: 'ELVINA10',
    discountLabel: '10% OFF',
    title: 'First Order Discount',
    description: 'Get 10% off the most expensive item in your bag on your very first order.',
    eligible: deliveredCount.value === 0,
    reason: 'Only valid for your 1st order.'
  },
  {
    code: 'ELVINAROYAL20',
    discountLabel: '20% OFF',
    title: '2nd Order Unlock',
    description: 'Get 20% off your most expensive item. Unlocks when your 1st order is delivered.',
    eligible: deliveredCount.value === 1,
    reason: deliveredCount.value < 1 ? 'Your 1st order is not yet marked as delivered.' : 'Already claimed.'
  },
  {
    code: 'ELVINAROYAL30',
    discountLabel: '30% OFF',
    title: '3rd Order Unlock',
    description: 'Get 30% off your most expensive item. Unlocks when your 2nd order is delivered.',
    eligible: deliveredCount.value === 2,
    reason: deliveredCount.value < 2 ? 'Your 2nd order is not yet marked as delivered.' : 'Already claimed.'
  },
  {
    code: 'ELVINAROYAL40',
    discountLabel: '40% OFF',
    title: '4th Order Unlock',
    description: 'Get 40% off your most expensive item. Unlocks when your 3rd order is delivered.',
    eligible: deliveredCount.value === 3,
    reason: deliveredCount.value < 3 ? 'Your 3rd order is not yet marked as delivered.' : 'Already claimed.'
  },
  {
    code: 'ELVINAROYAL50',
    discountLabel: '50% OFF',
    title: '5th Order Unlock',
    description: 'Get 50% off your most expensive item. Unlocks when your 4th order is delivered.',
    eligible: deliveredCount.value === 4,
    reason: deliveredCount.value < 4 ? 'Your 4th order is not yet marked as delivered.' : 'Already claimed.'
  }
])

const applyCode = (code: string) => {
  emit('apply', code)
  closeModal()
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
