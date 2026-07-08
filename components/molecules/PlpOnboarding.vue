<template>
  <Teleport to="body">
    <Transition name="onboard-fade">
      <div
        v-if="visible"
        class="fixed inset-0 z-[999] flex items-end justify-center pointer-events-none"
        aria-live="polite"
        role="dialog"
        aria-modal="true"
        :aria-label="steps[step].title"
      >
        <!-- Soft scrim -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-auto" @click="dismiss" />

        <!-- Coach card -->
        <div
          class="relative pointer-events-auto mb-24 mx-4 w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
          style="box-shadow: 0 24px 56px rgba(42,27,24,0.22);"
        >
          <!-- Gradient accent strip -->
          <div class="h-1 w-full" :style="`background: ${steps[step].accent};`" />

          <!-- Step illustrations -->
          <div class="relative h-36 flex items-center justify-center overflow-hidden bg-[#FDF8F5]">

            <!-- ── Step 0: Color switch illustration ── -->
            <div v-if="step === 0" class="flex flex-col items-center gap-3">
              <!-- Mock product card strip -->
              <div class="flex items-center gap-1.5 bg-white px-4 py-2 rounded-2xl shadow-soft border border-charcoal/10">
                <div class="w-10 h-14 rounded-lg bg-gradient-to-b from-[#E8C5D0] to-[#C49BAD] shrink-0" />
                <div class="space-y-1.5 pl-1">
                  <div class="h-2 w-20 bg-charcoal/10 rounded-full" />
                  <div class="h-1.5 w-14 bg-charcoal/8 rounded-full" />
                  <!-- Animated swatches -->
                  <div class="flex gap-1.5 mt-1">
                    <span
                      v-for="(c, i) in swatchColors"
                      :key="i"
                      class="w-4 h-4 rounded-full border-2 transition-all duration-300 cursor-pointer"
                      :class="activeDemo === i ? 'scale-125 border-deep-plum shadow-md' : 'border-white shadow-sm'"
                      :style="`background:${c};`"
                    />
                  </div>
                </div>
              </div>
              <!-- Tap hand -->
              <div class="tap-hand text-2xl select-none" aria-hidden="true">👆</div>
            </div>

            <!-- ── Step 1: Swipe illustration ── -->
            <div v-else class="flex flex-col items-center gap-3">
              <!-- Mock card with sliding image -->
              <div class="relative w-24 h-28 rounded-2xl overflow-hidden border border-charcoal/10 shadow-soft">
                <div
                  class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                  :style="`transform: translateX(${-swipeOffset * 100}%);`"
                >
                  <div class="w-full h-full shrink-0 bg-gradient-to-b from-[#D4A0B5] to-[#A87090]" />
                  <div class="w-full h-full shrink-0 bg-gradient-to-b from-[#8090C4] to-[#6070A8]" />
                  <div class="w-full h-full shrink-0 bg-gradient-to-b from-[#8AB87A] to-[#5A8045]" />
                </div>
                <!-- Dot indicator -->
                <div class="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
                  <span v-for="i in 3" :key="i" class="w-1 h-1 rounded-full transition-all duration-300"
                    :class="swipeOffset === i - 1 ? 'bg-white w-2.5' : 'bg-white/50'" />
                </div>
              </div>
              <!-- Swipe hand -->
              <div class="swipe-hand text-2xl select-none" aria-hidden="true">👈</div>
            </div>
          </div>

          <!-- Text content -->
          <div class="px-5 pt-4 pb-5">
            <!-- Progress dots -->
            <div class="flex items-center gap-1.5 mb-3">
              <span v-for="(s, i) in steps" :key="i"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="i === step ? 'w-5 bg-deep-plum' : 'w-1.5 bg-charcoal/15'"
              />
            </div>

            <h3 class="font-serif text-[17px] font-bold text-deep-plum leading-snug mb-1">
              {{ steps[step].title }}
            </h3>
            <p class="text-[12.5px] text-charcoal/60 font-ui leading-relaxed">
              {{ steps[step].desc }}
            </p>

            <!-- Actions -->
            <div class="flex items-center justify-between mt-4">
              <button
                class="text-[12px] font-ui font-semibold text-charcoal/40 hover:text-charcoal/70 transition-colors px-1"
                @click="dismiss"
              >
                Skip tour
              </button>
              <button
                class="px-5 py-2 rounded-full text-[13px] font-semibold font-ui text-white transition-all duration-200 active:scale-95 shadow-sm"
                :style="`background: ${steps[step].accent};`"
                @click="next"
              >
                {{ step < steps.length - 1 ? 'Next →' : 'Got it 🎉' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const STORAGE_KEY = 've_plp_onboarding_done'

const visible = ref(false)
const step = ref(0)

const steps = [
  {
    title: 'Switch colours instantly',
    desc: 'Tap any colour dot on a product card to preview it in that shade — no need to open the product.',
    accent: 'linear-gradient(135deg, #6B2D4E, #A84878)',
  },
  {
    title: 'Swipe through images',
    desc: 'Swipe left or right on any product card to flip through all its photos right from the listing.',
    accent: 'linear-gradient(135deg, #2D5B6B, #4A90A8)',
  },
]

// Swatch demo cycling
const swatchColors = ['#D4A0B5', '#8090C4', '#8AB87A', '#C49B30']
const activeDemo = ref(0)
let swatchTimer: ReturnType<typeof setInterval> | null = null

// Swipe demo cycling
const swipeOffset = ref(0)
let swipeTimer: ReturnType<typeof setInterval> | null = null

function startSwatchAnim () {
  swatchTimer = setInterval(() => {
    activeDemo.value = (activeDemo.value + 1) % swatchColors.length
  }, 700)
}

function stopSwatchAnim () {
  if (swatchTimer) { clearInterval(swatchTimer); swatchTimer = null }
}

function startSwipeAnim () {
  swipeTimer = setInterval(() => {
    swipeOffset.value = (swipeOffset.value + 1) % 3
  }, 900)
}

function stopSwipeAnim () {
  if (swipeTimer) { clearInterval(swipeTimer); swipeTimer = null }
}

watch(step, (val) => {
  stopSwatchAnim(); stopSwipeAnim()
  if (val === 0) startSwatchAnim()
  else startSwipeAnim()
})

function next () {
  if (step.value < steps.length - 1) {
    step.value++
  } else {
    dismiss()
  }
}

function dismiss () {
  visible.value = false
  stopSwatchAnim(); stopSwipeAnim()
  if (import.meta.client) localStorage.setItem(STORAGE_KEY, '1')
}

onMounted(() => {
  if (!import.meta.client) return
  if (localStorage.getItem(STORAGE_KEY)) return
  // Delay slightly so the user first sees the product grid load
  setTimeout(() => {
    visible.value = true
    startSwatchAnim()
  }, 1800)
})

onUnmounted(() => { stopSwatchAnim(); stopSwipeAnim() })
</script>

<style scoped>
.onboard-fade-enter-active { transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
.onboard-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.onboard-fade-enter-from { opacity: 0; transform: translateY(40px); }
.onboard-fade-leave-to   { opacity: 0; transform: translateY(20px); }

/* Tap pulse animation */
@keyframes tap-pulse {
  0%, 100% { transform: scale(1) translateY(0); }
  40%       { transform: scale(0.85) translateY(4px); }
  70%       { transform: scale(1.05) translateY(-2px); }
}
.tap-hand { animation: tap-pulse 1.1s ease-in-out infinite; }

/* Swipe hand animation */
@keyframes swipe-left {
  0%   { transform: translateX(16px) rotate(-5deg); opacity: 0.4; }
  30%  { opacity: 1; }
  80%  { transform: translateX(-16px) rotate(5deg); opacity: 1; }
  100% { transform: translateX(-16px) rotate(5deg); opacity: 0.3; }
}
.swipe-hand { animation: swipe-left 1.4s ease-in-out infinite; }
</style>
