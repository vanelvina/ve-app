<template>
  <Transition name="slide-fade">
    <div
      v-if="visible"
      class="fixed bottom-6 right-6 z-50 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-premium border border-rose-blush p-4 flex items-center gap-3"
      role="alert"
      aria-live="polite"
    >
      <!-- Close button (cross icon) -->
      <button
        @click="dismiss"
        class="absolute top-2.5 right-2.5 text-charcoal/50 hover:text-deep-plum transition-colors p-1"
        aria-label="Dismiss discount popup"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Promo Icon -->
      <div class="w-10 h-10 rounded-full bg-rose-blush flex items-center justify-center shrink-0 shadow-sm animate-pulse-slow">
        <span class="text-lg">🎟️</span>
      </div>

      <!-- Text Content -->
      <div class="flex-1 min-w-0 pr-4">
        <p class="text-[10px] uppercase font-bold tracking-wider text-dusty-rose">Special Offer</p>
        <p class="text-xs text-charcoal leading-snug mt-0.5">
          Use <strong class="text-deep-plum select-all bg-rose-blush/30 px-1 py-0.5 rounded font-mono">ELVINA10</strong> to claim <span class="font-bold text-deep-plum">10% OFF</span>
        </p>
      </div>

      <!-- Copy Action Button -->
      <button
        @click="copyCoupon"
        class="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200"
        :class="copied ? 'bg-green-50 border-green-200 text-green-600' : 'bg-warm-ivory border-rose-blush/60 hover:bg-rose-blush text-charcoal hover:text-deep-plum'"
        :aria-label="copied ? 'Coupon copied' : 'Copy coupon code'"
      >
        <Transition name="scale" mode="out-in">
          <!-- Copy icon -->
          <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <!-- Checked icon -->
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </Transition>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)
const copied = ref(false)

const copyCoupon = async () => {
  try {
    await navigator.clipboard.writeText('ELVINA10')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const dismiss = () => {
  visible.value = false
  if (process.client) {
    localStorage.setItem('coupon_popup_dismissed', 'true')
  }
}

onMounted(() => {
  if (process.client) {
    const dismissed = localStorage.getItem('coupon_popup_dismissed')
    if (!dismissed) {
      // Small delay before slide-in for premium feel
      setTimeout(() => {
        visible.value = true
      }, 1200)
    }
  }
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.7, 0, 0.84, 0);
}
.slide-fade-enter-from {
  transform: translateX(100%) translateY(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(100%) translateY(20px);
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-enter-from, .scale-leave-to {
  transform: scale(0.85);
  opacity: 0;
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 3s infinite ease-in-out;
}
</style>
