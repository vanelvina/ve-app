<template>
  <div class="min-h-screen bg-warm-ivory text-charcoal font-sans selection:bg-rose-blush selection:text-deep-plum py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto space-y-10">
      
      <!-- Page Header -->
      <div class="text-center space-y-3">
        <span class="text-xs uppercase tracking-[0.25em] text-deep-plum font-bold font-ui">Discover Van Elvina</span>
        <h1 class="text-3xl md:text-5xl font-serif font-bold text-deep-plum tracking-wide">Find Your Perfect Fit</h1>
        <div class="w-12 h-0.5 bg-deep-plum mx-auto"></div>
        <p class="text-xs md:text-sm text-charcoal/70 max-w-xl mx-auto font-ui">
          Beautifully crafted lingerie deserves a flawless fit. Explore our interactive tools to calculate your size, shop by sizes, or select products by colors.
        </p>
      </div>

      <!-- Tab Navigation -->
      <div class="flex justify-center border-b border-rose-blush/20">
        <nav class="flex space-x-6 md:space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            class="pb-4 text-xs md:text-sm font-ui uppercase tracking-wider font-bold transition-all border-b-2"
            :class="activeTab === tab.id 
              ? 'border-deep-plum text-deep-plum' 
              : 'border-transparent text-charcoal/60 hover:text-deep-plum'"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content Area -->
      <div class="bg-white rounded-3xl border border-rose-blush/30 shadow-premium p-6 md:p-10 relative overflow-hidden">
        <div class="absolute inset-0.5 rounded-[22px] border border-dashed border-rose-blush/20 pointer-events-none"></div>

        <!-- ── TAB 1: CALCULATOR ── -->
        <div v-if="activeTab === 'calculator'" class="relative z-10 space-y-8">
          <div class="text-center max-w-xl mx-auto space-y-2">
            <h2 class="text-xl md:text-2xl font-serif font-bold text-deep-plum">Bra Size Calculator</h2>
            <p class="text-xs md:text-sm text-charcoal/60">
              Input your measurements below to calculate your estimated band and cup size. For best accuracy, use a soft measuring tape.
            </p>
          </div>

          <!-- Unit Selector -->
          <div class="flex justify-center">
            <div class="inline-flex rounded-lg border border-rose-blush/30 p-1 bg-warm-ivory">
              <button
                @click="unit = 'in'"
                class="px-4 py-1.5 rounded-md text-xs font-ui uppercase tracking-wider font-bold transition-all"
                :class="unit === 'in' ? 'bg-deep-plum text-white shadow' : 'text-charcoal/60 hover:text-deep-plum'"
              >
                Inches
              </button>
              <button
                @click="unit = 'cm'"
                class="px-4 py-1.5 rounded-md text-xs font-ui uppercase tracking-wider font-bold transition-all"
                :class="unit === 'cm' ? 'bg-deep-plum text-white shadow' : 'text-charcoal/60 hover:text-deep-plum'"
              >
                Centimeters
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <!-- Inputs Column -->
            <div class="space-y-6 bg-warm-ivory/40 p-6 rounded-2xl border border-rose-blush/10">
              <!-- 1. Underbust -->
              <div class="space-y-2">
                <div class="flex justify-between items-center text-xs md:text-sm">
                  <label for="underbust-slider" class="font-bold text-deep-plum font-ui">1. Underbust Measurement</label>
                  <span class="font-bold font-mono text-deep-plum bg-rose-blush/20 px-2.5 py-0.5 rounded">
                    {{ underbustDisplay }} {{ unit }}
                  </span>
                </div>
                <input
                  id="underbust-slider"
                  type="range"
                  :min="unit === 'in' ? 26 : 65"
                  :max="unit === 'in' ? 46 : 120"
                  step="0.5"
                  v-model="underbustVal"
                  class="w-full accent-deep-plum cursor-pointer"
                />
                <p class="text-[11px] text-charcoal/50 leading-normal">
                  Measure around your ribcage, directly under your bust where your bra band sits. Keep tape snug and level.
                </p>
              </div>

              <!-- 2. Bust -->
              <div class="space-y-2">
                <div class="flex justify-between items-center text-xs md:text-sm">
                  <label for="bust-slider" class="font-bold text-deep-plum font-ui">2. Overbust (Bust) Measurement</label>
                  <span class="font-bold font-mono text-deep-plum bg-rose-blush/20 px-2.5 py-0.5 rounded">
                    {{ bustDisplay }} {{ unit }}
                  </span>
                </div>
                <input
                  id="bust-slider"
                  type="range"
                  :min="unit === 'in' ? 28 : 70"
                  :max="unit === 'in' ? 56 : 145"
                  step="0.5"
                  v-model="bustVal"
                  class="w-full accent-deep-plum cursor-pointer"
                />
                <p class="text-[11px] text-charcoal/50 leading-normal">
                  Measure around the fullest part of your bust (usually across the nipples). Keep tape slightly loose.
                </p>
              </div>

              <button
                @click="calculateSize"
                class="w-full py-3 bg-deep-plum text-white rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-deep-plum/90 transition-all font-ui shadow-premium"
              >
                Calculate Size
              </button>
            </div>

            <!-- Results Column -->
            <div class="flex flex-col justify-center items-center h-full min-h-[250px] border border-dashed border-rose-blush/30 rounded-2xl p-6 text-center">
              <div v-if="!sizeCalculated" class="space-y-2">
                <div class="text-4xl text-rose-blush" aria-hidden="true">📏</div>
                <h3 class="font-serif font-bold text-deep-plum text-sm md:text-base">Ready to Calculate</h3>
                <p class="text-xs text-charcoal/60 max-w-[250px] mx-auto">
                  Adjust the sliders on the left and click calculate to check your perfect Van Elvina fit.
                </p>
              </div>

              <div v-else class="space-y-6 animate-fade-in w-full">
                <div class="space-y-1">
                  <span class="text-xs uppercase tracking-widest text-dusty-rose font-bold font-ui">Your Estimated Size</span>
                  <div class="text-4xl md:text-5xl font-serif font-bold text-deep-plum tracking-wide animate-scale-up">
                    {{ calculatedBand }}{{ calculatedCup }}
                  </div>
                  <p class="text-xs text-charcoal/50 font-mono mt-1">
                    (Band Size: {{ calculatedBand }} | Cup Size: {{ calculatedCup }})
                  </p>
                </div>

                <div class="border-t border-rose-blush/10 my-4"></div>

                <div class="space-y-3">
                  <button
                    @click="shopCalculatedSize"
                    class="w-full py-3 bg-deep-plum text-white rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-deep-plum/90 transition-all font-ui shadow-premium flex items-center justify-center gap-2"
                  >
                    <span>Shop Bras in {{ calculatedBand }}{{ calculatedCup }}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <button
                    @click="resetCalculator"
                    class="text-xs text-dusty-rose font-ui hover:text-deep-plum hover:underline"
                  >
                    Calculate Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── TAB 2: FIND YOUR FIT GUIDE ── -->
        <div v-if="activeTab === 'fit-guide'" class="relative z-10 space-y-8">
          <div class="text-center max-w-xl mx-auto space-y-2">
            <h2 class="text-xl md:text-2xl font-serif font-bold text-deep-plum">How to Measure</h2>
            <p class="text-xs md:text-sm text-charcoal/60">
              Follow these simple steps with a soft measuring tape while wearing a non-padded underwire bra.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <!-- Step 1 -->
            <div class="space-y-4 p-6 bg-warm-ivory/30 rounded-2xl border border-rose-blush/20 relative">
              <span class="absolute top-4 right-4 text-3xl font-serif font-bold text-rose-blush/40 select-none">01</span>
              <div class="w-10 h-10 rounded-full bg-deep-plum text-white flex items-center justify-center font-bold text-sm">
                Band
              </div>
              <h3 class="text-sm md:text-base font-serif font-bold text-deep-plum">Measure Your Underbust</h3>
              <p class="text-xs text-charcoal/70 leading-relaxed">
                Wrap the measuring tape firmly around your ribcage, directly under your bust. Make sure the tape is level all the way around your back. Pull it snug but not uncomfortably tight. Note this measurement.
              </p>
              <div class="border-t border-rose-blush/10 pt-2 text-[11px] text-deep-plum font-semibold">
                💡 Tip: Breathe out naturally to get the most accurate fit.
              </div>
            </div>

            <!-- Step 2 -->
            <div class="space-y-4 p-6 bg-warm-ivory/30 rounded-2xl border border-rose-blush/20 relative">
              <span class="absolute top-4 right-4 text-3xl font-serif font-bold text-rose-blush/40 select-none">02</span>
              <div class="w-10 h-10 rounded-full bg-deep-plum text-white flex items-center justify-center font-bold text-sm">
                Cup
              </div>
              <h3 class="text-sm md:text-base font-serif font-bold text-deep-plum">Measure Your Overbust</h3>
              <p class="text-xs text-charcoal/70 leading-relaxed">
                Wrap the measuring tape around the fullest part of your bust (usually at nipple level). Keep the tape straight across your back, but do not pull it tight. Ensure it rests gently against your body. Note this measurement.
              </p>
              <div class="border-t border-rose-blush/10 pt-2 text-[11px] text-deep-plum font-semibold">
                💡 Tip: Do not squeeze or compress your breasts.
              </div>
            </div>
          </div>

          <!-- Sister Sizes Tip Card -->
          <div class="p-6 bg-rose-blush/5 border border-rose-blush/20 rounded-2xl space-y-3">
            <h4 class="text-xs uppercase tracking-wider font-bold text-deep-plum font-ui flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Understanding Sister Sizes
            </h4>
            <p class="text-xs text-charcoal/70 leading-relaxed">
              If your calculated size feels slightly tight in the band but perfect in the cup, try going up a band size and down a cup size (e.g. from 32C to 34B). If the band feels loose but the cup fits well, try going down a band size and up a cup size (e.g. from 34B to 32C).
            </p>
          </div>
        </div>

        <!-- ── TAB 3: SHOP BY SIZE ── -->
        <div v-if="activeTab === 'shop-by-size'" class="relative z-10 space-y-8">
          <div class="text-center max-w-xl mx-auto space-y-2">
            <h2 class="text-xl md:text-2xl font-serif font-bold text-deep-plum">Shop By Sizes</h2>
            <p class="text-xs md:text-sm text-charcoal/60">
              Select your product category and size below to automatically filter and browse matching inventory.
            </p>
          </div>

          <!-- Selection Card -->
          <div class="max-w-md mx-auto bg-warm-ivory/30 border border-rose-blush/20 p-6 rounded-3xl space-y-6">
            <!-- 1. Category Selector -->
            <div class="space-y-2">
              <span class="block text-xs font-bold font-ui text-deep-plum uppercase tracking-wider">1. What are you looking for?</span>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="shopType = 'bras'"
                  class="py-3 border-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-ui"
                  :class="shopType === 'bras' 
                    ? 'border-deep-plum bg-deep-plum text-white shadow' 
                    : 'border-rose-blush/30 hover:border-deep-plum text-charcoal/70'"
                >
                  Bras
                </button>
                <button
                  @click="shopType = 'panties'"
                  class="py-3 border-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all font-ui"
                  :class="shopType === 'panties' 
                    ? 'border-deep-plum bg-deep-plum text-white shadow' 
                    : 'border-rose-blush/30 hover:border-deep-plum text-charcoal/70'"
                >
                  Panties
                </button>
              </div>
            </div>

            <!-- 2. Size Dropdowns -->
            <div class="space-y-4 animate-fade-in" v-if="shopType === 'bras'">
              <span class="block text-xs font-bold font-ui text-deep-plum uppercase tracking-wider">2. Select Bra Size</span>
              <div class="grid grid-cols-2 gap-4">
                <!-- Band -->
                <div class="space-y-1.5">
                  <label for="band-select" class="text-[10px] text-charcoal/50 uppercase font-bold">Band Size</label>
                  <select
                    id="band-select"
                    v-model="selectedBand"
                    class="w-full px-3 py-2.5 bg-white border border-rose-blush/30 rounded-xl text-xs font-semibold focus:outline-none focus:border-deep-plum"
                  >
                    <option v-for="b in bands" :key="b" :value="b">{{ b }}</option>
                  </select>
                </div>
                <!-- Cup -->
                <div class="space-y-1.5">
                  <label for="cup-select" class="text-[10px] text-charcoal/50 uppercase font-bold">Cup Size</label>
                  <select
                    id="cup-select"
                    v-model="selectedCup"
                    class="w-full px-3 py-2.5 bg-white border border-rose-blush/30 rounded-xl text-xs font-semibold focus:outline-none focus:border-deep-plum"
                  >
                    <option v-for="c in cups" :key="c" :value="c">{{ c }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="space-y-3 animate-fade-in" v-else-if="shopType === 'panties'">
              <span class="block text-xs font-bold font-ui text-deep-plum uppercase tracking-wider">2. Select Panty Size</span>
              <div class="space-y-1.5">
                <label for="panty-select" class="text-[10px] text-charcoal/50 uppercase font-bold">Size</label>
                <select
                  id="panty-select"
                  v-model="selectedPantySize"
                  class="w-full px-3 py-2.5 bg-white border border-rose-blush/30 rounded-xl text-xs font-semibold focus:outline-none focus:border-deep-plum"
                >
                  <option v-for="s in pantySizes" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              @click="shopBySizeRedirect"
              class="w-full py-3.5 bg-deep-plum hover:bg-deep-plum/90 text-white rounded-xl text-xs uppercase tracking-wider font-bold transition-all font-ui shadow-premium flex items-center justify-center gap-2"
            >
              <span>Explore Products</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        <!-- ── TAB 4: SHOP BY COLOR ── -->
        <div v-if="activeTab === 'shop-by-color'" class="relative z-10 space-y-8">
          <div class="text-center max-w-xl mx-auto space-y-2">
            <h2 class="text-xl md:text-2xl font-serif font-bold text-deep-plum">Shop By Colours</h2>
            <p class="text-xs md:text-sm text-charcoal/60">
              Browse our collections grouped by color tones. Click on a color shade to find matching bras, panties, or sleepwear.
            </p>
          </div>

          <!-- Color Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto pt-4">
            <button
              v-for="color in colors"
              :key="color.name"
              @click="shopByColorRedirect(color.name)"
              class="flex flex-col items-center gap-3 p-4 rounded-2xl border border-rose-blush/10 hover:border-deep-plum/40 hover:bg-warm-ivory/20 transition-all group text-center"
            >
              <!-- Swatch Circle -->
              <span
                class="w-12 h-12 rounded-full shadow-inner border border-black/10 group-hover:scale-110 transition-transform"
                :style="{ backgroundColor: color.hex }"
                :aria-label="`Color Swatch: ${color.name}`"
              ></span>
              <span class="block text-xs font-bold font-ui text-deep-plum group-hover:underline">
                {{ color.displayName }}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Settings
useHead({
  title: 'Find Your Perfect Fit & Size Guide — Van Elvina',
  meta: [
    { name: 'description', content: 'Explore the Van Elvina interactive Bra Size Calculator, measurement guides, and shop our innerwear catalog by sizes or color swatches.' }
  ]
})

const route = useRoute()
const router = useRouter()

// Tabs definition
const tabs = [
  { id: 'calculator', name: 'Bra Calculator' },
  { id: 'fit-guide', name: 'Find Your Fit' },
  { id: 'shop-by-size', name: 'Shop By Size' },
  { id: 'shop-by-color', name: 'Shop By Color' }
]
const activeTab = ref('calculator')

// Units toggle: 'in' = inches, 'cm' = centimeters
const unit = ref<'in' | 'cm'>('in')

// Slider raw values
const underbustVal = ref(32)
const bustVal = ref(34)

// Displays for sliders
const underbustDisplay = computed(() => Number(underbustVal.value).toFixed(1))
const bustDisplay = computed(() => Number(bustVal.value).toFixed(1))

// Calculated results
const calculatedBand = ref<number | null>(null)
const calculatedCup = ref<string | null>(null)
const sizeCalculated = ref(false)

// Calculator logic
const calculateSize = () => {
  // Convert cm to inches internally if cm is chosen
  let rawUnderbust = Number(underbustVal.value)
  let rawBust = Number(bustVal.value)
  
  if (unit.value === 'cm') {
    rawUnderbust = rawUnderbust / 2.54
    rawBust = rawBust / 2.54
  }

  // Calculate Band Size (underbust + 4 if even, + 5 if odd)
  let band = Math.round(rawUnderbust)
  if (band % 2 === 0) {
    band += 4
  } else {
    band += 5
  }

  // Calculate Cup Size (Bust - Band Size)
  const diff = Math.round(rawBust - band)
  let cup = 'A'
  if (diff <= 0) cup = 'AA'
  else if (diff === 1) cup = 'A'
  else if (diff === 2) cup = 'B'
  else if (diff === 3) cup = 'C'
  else if (diff === 4) cup = 'D'
  else if (diff === 5) cup = 'DD'
  else if (diff === 6) cup = 'E'
  else if (diff === 7) cup = 'F'
  else cup = 'FF'

  calculatedBand.value = band
  calculatedCup.value = cup
  sizeCalculated.value = true
}

const shopCalculatedSize = () => {
  if (calculatedBand.value && calculatedCup.value) {
    const size = `${calculatedBand.value}${calculatedCup.value}`
    router.push({ path: '/products', query: { category: 'bras', size } })
  }
}

const resetCalculator = () => {
  sizeCalculated.value = false
  underbustVal.value = unit.value === 'in' ? 32 : 80
  bustVal.value = unit.value === 'in' ? 34 : 85
}

// Watch unit toggle to adapt slider values
watch(unit, (newUnit) => {
  if (newUnit === 'cm') {
    underbustVal.value = Math.round(underbustVal.value * 2.54)
    bustVal.value = Math.round(bustVal.value * 2.54)
  } else {
    underbustVal.value = Math.round(underbustVal.value / 2.54)
    bustVal.value = Math.round(bustVal.value / 2.54)
  }
  sizeCalculated.value = false
})

// Shop by Size Options
const shopType = ref<'bras' | 'panties'>('bras')
const selectedBand = ref('34')
const selectedCup = ref('B')
const selectedPantySize = ref('M')

const bands = ['30', '32', '34', '36', '38', '40', '42', '44']
const cups = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF']
const pantySizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const shopBySizeRedirect = () => {
  if (shopType.value === 'bras') {
    router.push({
      path: '/products',
      query: { category: 'bras', size: `${selectedBand.value}${selectedCup.value}` }
    })
  } else {
    router.push({
      path: '/products',
      query: { category: 'panties', size: selectedPantySize.value }
    })
  }
}

// Colors swatches data
const colors = [
  { name: 'Black', displayName: 'Velvet Black', hex: '#121212' },
  { name: 'White', displayName: 'Ivory White', hex: '#FAF9F6' },
  { name: 'Red', displayName: 'Crimson Ruby', hex: '#991B1B' },
  { name: 'Pink', displayName: 'Rose Blush', hex: '#FBCFE8' },
  { name: 'Blue', displayName: 'Midnight Indigo', hex: '#1E3A8A' },
  { name: 'Beige', displayName: 'Nude Sand', hex: '#E6C2A4' },
  { name: 'Maroon', displayName: 'Wine Red', hex: '#581845' },
  { name: 'Lavender', displayName: 'Lilac Haze', hex: '#DCD0FF' }
]

const shopByColorRedirect = (colorName: string) => {
  router.push({ path: '/products', query: { color: colorName } })
}

// Router hash/query tab toggle
const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
  router.replace({ hash: `#${tabId}` })
}

const syncTabFromHash = (rawHash: string) => {
  const hash = rawHash.replace('#', '')
  if (hash && tabs.some(t => t.id === hash)) {
    activeTab.value = hash
  }
}

// Set active tab on mount based on hash
onMounted(() => {
  if (route.hash) {
    syncTabFromHash(route.hash)
  } else if (route.query.tab && tabs.some(t => t.id === route.query.tab)) {
    activeTab.value = String(route.query.tab)
  }
})

// Watch route hash changes for same-page transitions
watch(() => route.hash, (newHash) => {
  syncTabFromHash(newHash)
})
</script>

<style scoped>
.shadow-premium {
  box-shadow: 0 20px 40px -15px rgba(138, 79, 90, 0.12);
}

.animate-fade-in {
  animation: fadeIn 0.4s ease forwards;
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>
