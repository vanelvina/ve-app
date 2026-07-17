<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal/50 backdrop-blur-sm" @click.self="closeModal">
      <div class="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md overflow-hidden shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="coupon-modal-title">

        <div class="flex items-center justify-between p-4 border-b border-border-gray">
          <h2 id="coupon-modal-title" class="font-serif text-lg font-bold text-deep-plum">Available Offers</h2>
          <button @click="closeModal" class="p-2 text-mid-gray hover:text-charcoal transition-colors rounded-full hover:bg-warm-ivory" aria-label="Close modal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="p-4 overflow-y-auto max-h-[65vh] space-y-3">
          <!-- Loading State -->
          <div v-if="loading" class="py-12 flex flex-col items-center justify-center gap-3">
            <div class="w-8 h-8 border-4 border-rose-blush border-t-deep-plum rounded-full animate-spin"></div>
            <p class="text-sm font-ui text-mid-gray">Checking your eligibility…</p>
          </div>

          <!-- Login Prompt -->
          <div v-else-if="!isLoggedIn" class="bg-warm-ivory border border-rose-blush rounded-xl p-5 text-center">
            <p class="text-sm font-ui text-charcoal mb-3">Please log in to view and apply your exclusive loyalty coupons.</p>
            <AppButton size="sm" @click="ui.openAuthModal()">Log In / Sign Up</AppButton>
          </div>

          <!-- Coupons List -->
          <template v-else>
            <div
              v-for="coupon in coupons"
              :key="coupon.code"
              class="border rounded-xl p-4 transition-all"
              :class="[
                coupon.used
                  ? 'border-charcoal/10 bg-gray-50 opacity-70'
                  : coupon.eligible
                    ? 'border-border-gray bg-white hover:border-deep-plum hover:shadow-soft'
                    : 'border-gray-100 bg-gray-50 opacity-55'
              ]"
            >
              <div class="flex justify-between items-start gap-3">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <span class="font-mono font-bold text-deep-plum bg-rose-blush/30 px-2 py-0.5 rounded text-sm">{{ coupon.code }}</span>
                    <span class="text-xs font-bold text-white bg-deep-plum px-1.5 py-0.5 rounded">{{ coupon.discountLabel }}</span>
                    <!-- USED badge -->
                    <span v-if="coupon.used" class="text-[10px] font-bold text-white bg-charcoal/50 px-1.5 py-0.5 rounded uppercase tracking-wide">Used</span>
                  </div>
                  <p class="text-xs font-ui text-charcoal font-medium mt-1.5">{{ coupon.title }}</p>
                  <p class="text-[10px] font-ui text-mid-gray mt-0.5 leading-relaxed">{{ coupon.description }}</p>

                  <!-- Used-in-order message (specific order reference) -->
                  <p v-if="coupon.used && coupon.usedInOrderRef" class="text-[10px] font-ui text-charcoal/60 font-semibold mt-1.5 flex items-center gap-1">
                    <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Used in {{ coupon.usedInOrderRef }}
                  </p>
                  <!-- Ineligible reason -->
                  <p v-else-if="!coupon.eligible && !coupon.used" class="text-[10px] font-ui text-amber-600 font-medium mt-1.5 flex items-center gap-1">
                    <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    {{ coupon.reason }}
                  </p>
                </div>

                <AppButton
                  size="sm"
                  :variant="coupon.eligible && !coupon.used ? 'primary' : 'secondary'"
                  :disabled="!coupon.eligible || coupon.used"
                  @click="applyCode(coupon.code)"
                >
                  {{ coupon.used ? 'Used' : coupon.eligible ? 'Apply' : 'Locked' }}
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
const ordersList = ref<any[]>([])
const activeCoupons = ref<any[]>([])
const isLoggedIn = computed(() => auth.isLoggedIn)

// ── Load user order history ───────────────────────────────────────────────
const loadEligibility = async () => {
  if (!isLoggedIn.value) return
  loading.value = true
  try {
    const orders = await auth.fetchMyOrders()
    if (Array.isArray(orders)) {
      ordersList.value = orders
      deliveredCount.value = orders.filter(
        (o: any) => o.orderStatus === 'delivered' || o.status === 'delivered'
      ).length
    } else {
      ordersList.value = []
      deliveredCount.value = 0
    }
  } catch (err) {
    console.error('Failed to fetch orders for coupon modal', err)
    ordersList.value = []
    deliveredCount.value = 0
  } finally {
    loading.value = false
  }
}

// ── Load admin-created promo coupons ──────────────────────────────────────
const loadActiveCoupons = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/widgets`)
    activeCoupons.value = (data || [])
      .filter((w: any) => w.type === 'coupon' && w.enabled && w.image !== 'hidden')
      .map((w: any) => {
        const discountVal = w.items !== undefined && w.items !== null
          ? Number(w.items)
          : (w.subtitle ? parseFloat(w.subtitle) : 0)
        const percent = discountVal > 1 ? discountVal : Math.round(discountVal * 100)
        // Check date-based expiry
        const isDateExpired = w.expiresAt ? new Date(w.expiresAt) < new Date() : false
        const expiryLabel = w.expiresAt
          ? new Date(w.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
          : null
        return {
          code: w.title.toUpperCase(),
          discountLabel: `${percent}% OFF`,
          title: `Promo: ${w.title}`,
          description: `Get ${percent}% off the single most expensive product in your bag.${expiryLabel && !isDateExpired ? ` Valid until ${expiryLabel}.` : ''}`,
          isDynamic: true,
          isDateExpired,
          expiryLabel,
        }
      })
  } catch (err) {
    console.error('Failed to load active coupons:', err)
  }
}

watch(() => props.isOpen, (open) => {
  if (open) {
    loadEligibility()
    loadActiveCoupons()
  }
})

watch(isLoggedIn, (loggedIn) => {
  if (props.isOpen && loggedIn) {
    loadEligibility()
  }
})

// ── Ordinal helper ────────────────────────────────────────────────────────
const ordinal = (n: number) => ['1st', '2nd', '3rd', '4th', '5th'][n - 1] || `${n}th`

// ── Build coupon list with precise used/eligible state ────────────────────
const coupons = computed(() => {
  const nonCancelled = ordersList.value.filter(
    (o: any) => o.orderStatus !== 'cancelled' && o.status !== 'cancelled'
  )

  // Map: couponCode → order reference label
  const usedMap = new Map<string, string>()
  nonCancelled.forEach((o: any, idx: number) => {
    const code = (o.couponCode || o.coupon_code || '').toUpperCase()
    if (code) {
      const orderLabel = o.orderId
        ? `Order #${o.orderId}`
        : `your ${ordinal(idx + 1)} order`
      usedMap.set(code, orderLabel)
    }
  })

  const loyalty = [
    {
      code: 'WELCOME10',
      discountLabel: '10% OFF',
      title: 'First Order Welcome Discount',
      description: 'Get 10% off the most expensive item on your very first order. One-time use only.',
      used: usedMap.has('WELCOME10'),
      usedInOrderRef: usedMap.get('WELCOME10') || null,
      eligible: nonCancelled.length === 0 && !usedMap.has('WELCOME10'),
      reason: 'Only valid for your 1st ever order.',
    },
    {
      code: 'ELVINAROYAL20',
      discountLabel: '20% OFF',
      title: 'Loyalty Reward — 2nd Order',
      description: 'Unlocks after your 1st delivered order. Get 20% off your highest-priced item.',
      used: usedMap.has('ELVINAROYAL20'),
      usedInOrderRef: usedMap.get('ELVINAROYAL20') || null,
      eligible: deliveredCount.value >= 1 && !usedMap.has('ELVINAROYAL20'),
      reason: deliveredCount.value < 1
        ? 'Unlocks after your 1st delivered order.'
        : 'Already used.',
    },
    {
      code: 'ELVINAROYAL30',
      discountLabel: '30% OFF',
      title: 'Loyalty Reward — 3rd Order',
      description: 'Unlocks after your 2nd delivered order. Get 30% off your highest-priced item.',
      used: usedMap.has('ELVINAROYAL30'),
      usedInOrderRef: usedMap.get('ELVINAROYAL30') || null,
      eligible: deliveredCount.value >= 2 && !usedMap.has('ELVINAROYAL30'),
      reason: deliveredCount.value < 2
        ? `Unlocks after your 2nd delivered order. (${deliveredCount.value}/2 delivered)`
        : 'Already used.',
    },
    {
      code: 'ELVINAROYAL40',
      discountLabel: '40% OFF',
      title: 'Loyalty Reward — 4th Order',
      description: 'Unlocks after your 3rd delivered order. Get 40% off your highest-priced item.',
      used: usedMap.has('ELVINAROYAL40'),
      usedInOrderRef: usedMap.get('ELVINAROYAL40') || null,
      eligible: deliveredCount.value >= 3 && !usedMap.has('ELVINAROYAL40'),
      reason: deliveredCount.value < 3
        ? `Unlocks after your 3rd delivered order. (${deliveredCount.value}/3 delivered)`
        : 'Already used.',
    },
    {
      code: 'ELVINAROYAL50',
      discountLabel: '50% OFF',
      title: 'Loyalty Reward — 5th Order',
      description: 'Unlocks after your 4th delivered order. Get 50% off your highest-priced item.',
      used: usedMap.has('ELVINAROYAL50'),
      usedInOrderRef: usedMap.get('ELVINAROYAL50') || null,
      eligible: deliveredCount.value >= 4 && !usedMap.has('ELVINAROYAL50'),
      reason: deliveredCount.value < 4
        ? `Unlocks after your 4th delivered order. (${deliveredCount.value}/4 delivered)`
        : 'Already used.',
    },
  ]

  // Dynamic coupons — check single-use against order history + date expiry
  const dynamic = activeCoupons.value.map((ac: any) => {
    const used = usedMap.has(ac.code)
    const isExpired = ac.isDateExpired === true
    const isEligible = !used && !isExpired
    let reason = ''
    if (used) reason = `Used in ${usedMap.get(ac.code)}.`
    else if (isExpired) reason = `Expired on ${ac.expiryLabel}.`
    return {
      ...ac,
      used,
      usedInOrderRef: usedMap.get(ac.code) || null,
      eligible: isEligible,
      reason,
    }
  })

  return [...loyalty, ...dynamic]
})

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
