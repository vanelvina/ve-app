<template>
  <section class="section-padding bg-gradient-rose" :aria-labelledby="`fit-heading-${widget?.key}`">
    <div class="page-container">
      <div class="bg-white rounded-3xl overflow-hidden border border-rose-blush/20 shadow-card flex flex-col lg:flex-row min-h-[360px]">
        <!-- Image Banner Left Side (or background) -->
        <div class="lg:w-1/2 relative min-h-[240px] lg:min-h-[auto] bg-warm-ivory">
          <img
            :src="widget?.image || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80'"
            alt="Women styling size guide"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-deep-plum/20" />
        </div>

        <!-- Info details and Modal Trigger -->
        <div class="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
          <div>
            <p v-if="widget?.subtitle" class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2.5">
              {{ widget.subtitle }}
            </p>
            <h2 :id="`fit-heading-${widget?.key}`" class="font-serif text-2xl md:text-3.5xl text-deep-plum font-bold leading-tight">
              {{ widget?.title || 'Calculate Your Perfect Bra Fit' }}
            </h2>
            <p class="text-charcoal/70 text-sm leading-relaxed mt-4">
              {{ widget?.description || '80% of women wear the wrong bra size. Take our 60-second sizing test to find your exact match and shop with confidence.' }}
            </p>
          </div>

          <div>
            <button
              @click="showModal = true"
              class="inline-flex items-center gap-2 px-8 py-3.5 bg-deep-plum text-white rounded-full font-ui font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-plum-800 hover:shadow-lg transition-all duration-250 pulse-button"
            >
              {{ widget?.items?.btnText || 'Start Sizing Test' }}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SIZING CALCULATOR MODAL -->
    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Sizing Calculator">
        <div class="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 border border-rose-blush/20 shadow-xl relative overflow-hidden">
          <!-- Close button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors p-2"
            aria-label="Close fit finder"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- QUIZ MULTI-STEPS -->
          <div class="space-y-6">
            <div class="text-center">
              <span class="text-xs font-bold uppercase tracking-wider text-dusty-rose bg-rose-blush px-3 py-1 rounded-full">Fit Finder Quiz</span>
              <h3 class="text-xl font-serif text-deep-plum font-bold mt-2">Find Your True Size</h3>
            </div>

            <!-- STEP 1: Underbust (Band) -->
            <div v-if="step === 1" class="space-y-4">
              <p class="text-xs text-center text-charcoal/60 leading-relaxed">
                Step 1: Wrap the tape snug around your ribcage directly under your bust. Keep the tape level.
              </p>
              <div class="space-y-2">
                <label class="block text-xs font-semibold text-charcoal/70">Underbust Measurement (inches)</label>
                <select v-model="underbust" class="w-full p-3 border border-rose-blush rounded-xl bg-warm-ivory/30 focus:outline-none focus:border-deep-plum text-sm font-medium">
                  <option v-for="val in underbustRange" :key="val" :value="val">{{ val }}"</option>
                </select>
              </div>
              <button @click="step = 2" class="w-full py-3 bg-deep-plum text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-plum-800 transition-colors">
                Next Step
              </button>
            </div>

            <!-- STEP 2: Overbust (Cup) -->
            <div v-if="step === 2" class="space-y-4">
              <p class="text-xs text-center text-charcoal/60 leading-relaxed">
                Step 2: Wrap the tape loosely around the fullest part of your chest. Make sure the tape is level.
              </p>
              <div class="space-y-2">
                <label class="block text-xs font-semibold text-charcoal/70">Overbust Measurement (inches)</label>
                <select v-model="overbust" class="w-full p-3 border border-rose-blush rounded-xl bg-warm-ivory/30 focus:outline-none focus:border-deep-plum text-sm font-medium">
                  <option v-for="val in overbustRange" :key="val" :value="val">{{ val }}"</option>
                </select>
              </div>
              <div class="flex gap-3">
                <button @click="step = 1" class="w-1/3 py-3 border border-rose-blush text-charcoal rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-light-gray transition-colors">
                  Back
                </button>
                <button @click="calculateSize" class="w-2/3 py-3 bg-deep-plum text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-plum-800 transition-colors">
                  Find My Size
                </button>
              </div>
            </div>

            <!-- STEP 3: RESULT -->
            <div v-if="step === 3" class="text-center space-y-6 py-4">
              <div class="space-y-1">
                <p class="text-xs text-charcoal/50 font-bold uppercase tracking-widest">Recommended Bra Size</p>
                <h4 class="text-4xl md:text-5xl font-serif text-deep-plum font-extrabold tracking-tight scale-in">{{ calculatedSize }}</h4>
              </div>

              <div class="bg-rose-blush/35 rounded-2xl p-4 border border-rose-blush/60 space-y-2">
                <p class="text-xs text-deep-plum font-bold uppercase">🎁 Unlock Your Comfort Reward</p>
                <p class="text-[11px] text-charcoal/80 leading-relaxed">
                  Use code <strong class="text-deep-plum select-all">FITCODE10</strong> at checkout for <strong>10% Off</strong> your perfect fit bra.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <button @click="resetCalculator" class="py-3 px-4 border border-rose-blush text-charcoal rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-light-gray transition-colors">
                  Calculate Again
                </button>
                <NuxtLink :to="`/products?size=${calculatedSize}`" @click="closeModal" class="flex-1 py-3 px-6 bg-deep-plum text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-plum-800 transition-colors flex items-center justify-center gap-2">
                  Shop {{ calculatedSize }} Styles
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const showModal = ref(false)
const step = ref(1)

const underbust = ref(30)
const overbust = ref(33)
const calculatedSize = ref('34C')

// Dropdown ranges
const underbustRange = Array.from({ length: 20 }, (_, i) => 26 + i)
const overbustRange = computed(() => {
  // Overbust must be greater than or equal to underbust
  return Array.from({ length: 25 }, (_, i) => underbust.value + i)
})

// Recalculate overbust when underbust changes to ensure validity
watch(underbust, (newVal) => {
  if (overbust.value < newVal) {
    overbust.value = newVal + 3
  }
})

const calculateSize = () => {
  // Band calculation
  // Standard rule: Underbust is mapped to nearest band size (even numbers).
  // If underbust is even, add 4. If odd, add 5.
  let band = 34
  const ub = underbust.value
  if (ub % 2 === 0) {
    band = ub + 4
  } else {
    band = ub + 5
  }

  // Cup calculation
  // Difference between bust and calculated band
  // Alternatively: Difference between overbust and underbust is more commonly used in US/UK sizing.
  // Standard: Overbust - Underbust difference:
  // 1" = A, 2" = B, 3" = C, 4" = D, 5" = DD (E), 6" = DDD (F), 7" = G, 8" = H
  const diff = overbust.value - ub
  let cup = 'A'
  
  if (diff <= 1) cup = 'A'
  else if (diff === 2) cup = 'B'
  else if (diff === 3) cup = 'C'
  else if (diff === 4) cup = 'D'
  else if (diff === 5) cup = 'DD'
  else if (diff === 6) cup = 'E'
  else if (diff === 7) cup = 'F'
  else if (diff === 8) cup = 'G'
  else if (diff > 8) cup = 'H'

  calculatedSize.value = `${band}${cup}`
  step.value = 3
}

const resetCalculator = () => {
  step.value = 1
  underbust.value = 30
  overbust.value = 33
}

const closeModal = () => {
  showModal.value = false
  setTimeout(resetCalculator, 300)
}
</script>

<style scoped>
@keyframes pulseGlow {
  0% { transform: scale(1); box-shadow: 0 4px 6px rgba(107, 45, 78, 0.15); }
  50% { transform: scale(1.03); box-shadow: 0 8px 20px rgba(212, 116, 140, 0.4); }
  100% { transform: scale(1); box-shadow: 0 4px 6px rgba(107, 45, 78, 0.15); }
}

.pulse-button {
  animation: pulseGlow 2.5s infinite ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-in {
  animation: scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
