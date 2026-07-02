<template>
  <div class="loyalty-banner" role="region" aria-label="Exclusive loyalty offers">

    <!-- Header -->
    <div class="loyalty-header">
      <div class="loyalty-icon-wrap" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 12V22H4V12"/>
          <path d="M22 7H2v5h20V7z"/>
          <path d="M12 22V7"/>
          <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
          <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
        </svg>
      </div>
      <div>
        <p class="loyalty-title">Save big on your orders</p>
        <p class="loyalty-sub">Exclusive rewards for Van Elvina customers</p>
      </div>
    </div>

    <!-- Tier steps -->
    <div class="loyalty-tiers" role="list">
      <div
        v-for="tier in tiers"
        :key="tier.order"
        class="loyalty-tier"
        :class="{
          'tier-active': isLoggedIn && orderCount === tier.order - 1,
          'tier-done': isLoggedIn && orderCount >= tier.order,
          'tier-locked': !isLoggedIn || orderCount < tier.order - 1,
        }"
        role="listitem"
      >
        <!-- Status indicator -->
        <div class="tier-status" aria-hidden="true">
          <svg v-if="isLoggedIn && orderCount >= tier.order" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else-if="!isLoggedIn || orderCount < tier.order - 1" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6a5 5 0 00-10 0v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zm-6 9a2 2 0 110-4 2 2 0 010 4zm3.1-9H8.9V6a3.1 3.1 0 116.2 0v2z"/></svg>
        </div>
        <p class="tier-label">{{ ordinalLabel(tier.order) }}</p>
        <p class="tier-sub">Order</p>
        <span class="tier-badge" :class="tier.special ? 'badge-gold' : ''">{{ tier.label }}</span>
      </div>
    </div>

    <!-- Single product note -->
    <p class="loyalty-note">
      ⚠ Discount applies to <strong>one item only</strong>, even if bag has multiple products.
    </p>

    <!-- Guest CTA -->
    <div v-if="!isLoggedIn" class="loyalty-cta-guest">
      <div class="cta-text">
        <strong>Login &amp; get 10% off your 1st order</strong>
        <span class="cta-code">ELVINA10</span>
      </div>
      <button class="cta-btn" @click="handleLogin" aria-label="Login to unlock loyalty discounts">
        Login
      </button>
    </div>

    <!-- Logged-in state -->
    <div v-else class="loyalty-cta-user">
      <div v-if="currentTier">
        <span>Your next order earns</span>
        <strong class="cta-highlight"> {{ currentTier.label }}</strong>
        <span v-if="currentTier.code"> — use code <span class="cta-code-inline">{{ currentTier.code }}</span></span>
        <span v-else> — applied automatically</span>
      </div>
      <div v-else class="cta-maxed">
        🏆 You've unlocked all tiers! Enjoy your exclusive loyalty status.
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const ui = useUIStore()

const isLoggedIn = computed(() => auth.isLoggedIn)
const orderCount = ref(0)

const tiers = [
  { order: 1, label: '10% Off', code: 'ELVINA10',      special: false },
  { order: 2, label: '20% Off', code: 'ELVINAROYAL20', special: false },
  { order: 3, label: '30% Off', code: 'ELVINAROYAL30', special: false },
  { order: 4, label: '40% Off', code: 'ELVINAROYAL40', special: false },
  { order: 5, label: '50% Off', code: 'ELVINAROYAL50', special: true  },
]

const currentTier = computed(() =>
  isLoggedIn.value ? (tiers.find(t => t.order === orderCount.value + 1) ?? null) : null
)

const ordinalLabel = (n: number) =>
  (['1st','2nd','3rd','4th','5th'])[n - 1] ?? `${n}th`

const handleLogin = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('ve_auth_redirect', window.location.pathname)
  }
  ui.openAuthModal()
}

const loadOrders = async () => {
  try {
    const orders = await auth.fetchMyOrders()
    orderCount.value = Array.isArray(orders) ? orders.filter((o: any) => o.orderStatus === 'delivered' || o.status === 'delivered').length : 0
  } catch { orderCount.value = 0 }
}

onMounted(() => { if (isLoggedIn.value) loadOrders() })
watch(isLoggedIn, (val) => { if (val) loadOrders() })
</script>

<style scoped>
/* ── Container ──────────────────────────────────────────── */
.loyalty-banner {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fafafa;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ── Header ─────────────────────────────────────────────── */
.loyalty-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.loyalty-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  flex-shrink: 0;
}

.loyalty-title {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.loyalty-sub {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
}

/* ── Tiers ──────────────────────────────────────────────── */
.loyalty-tiers {
  display: flex;
  gap: 6px;
}

.loyalty-tier {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 10px 4px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  position: relative;
  transition: border-color 0.2s, background 0.2s;
  min-width: 0;
}

.tier-active {
  border-color: #334155;
  background: #f8fafc;
}

.tier-done {
  border-color: #cbd5e1;
  background: #f1f5f9;
}

.tier-locked {
  opacity: 0.45;
}

.tier-status {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #cbd5e1;
  line-height: 1;
}

.tier-done .tier-status { color: #64748b; }
.tier-active .tier-status { color: #334155; }

.tier-label {
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  margin-top: 2px;
}

.tier-active .tier-label { color: #0f172a; }
.tier-done .tier-label   { color: #64748b; }

.tier-sub {
  font-size: 9px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 500;
}

.tier-badge {
  font-size: 9px;
  font-weight: 700;
  background: #f1f5f9;
  color: #334155;
  border-radius: 20px;
  padding: 2px 6px;
  white-space: nowrap;
  margin-top: 2px;
}

.badge-gold {
  background: #f8fafc;
  color: #0f172a;
  border: 1px solid #cbd5e1;
}

.tier-active .tier-badge {
  background: #1e293b;
  color: #f8fafc;
}

/* ── Note ───────────────────────────────────────────────── */
.loyalty-note {
  font-size: 10.5px;
  color: #64748b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 10px;
  line-height: 1.5;
}

/* ── Guest CTA ──────────────────────────────────────────── */
.loyalty-cta-guest {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #1e293b;
  border-radius: 8px;
  padding: 11px 14px;
}

.cta-text {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
  flex: 1;
}

.cta-text strong { color: #f8fafc; }

.cta-code {
  background: rgba(255,255,255,0.08);
  border: 1px dashed rgba(255,255,255,0.25);
  color: #e2e8f0;
  font-weight: 800;
  padding: 1px 7px;
  border-radius: 4px;
  font-size: 11px;
  letter-spacing: 0.05em;
}

.cta-btn {
  background: #f1f5f9;
  color: #1e293b;
  font-weight: 700;
  font-size: 12px;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: inherit;
}
.cta-btn:hover  { background: #e2e8f0; transform: scale(1.02); }
.cta-btn:active { transform: scale(0.98); }

/* ── Logged-in CTA ──────────────────────────────────────── */
.loyalty-cta-user {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 12px;
  color: #475569;
  line-height: 1.5;
}

.cta-highlight {
  color: #0f172a;
  font-weight: 700;
}

.cta-code-inline {
  font-weight: 800;
  color: #1e293b;
  background: #e2e8f0;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.cta-maxed {
  color: #334155;
  font-weight: 600;
}
</style>

