<template>
  <Transition name="fade">
    <div
      v-if="ui.sizeGuideOpen"
      class="overlay-backdrop"
      aria-hidden="true"
      @click="ui.closeSizeGuide"
    />
  </Transition>

  <Transition name="slide-up">
    <div
      v-if="ui.sizeGuideOpen"
      class="fixed inset-0 z-50 flex items-end md:items-center justify-center px-4 pb-0 md:py-8"
      role="dialog"
      aria-modal="true"
      aria-label="Size guide"
    >
      <div class="w-full max-w-2xl bg-white rounded-t-3xl md:rounded-2xl shadow-modal overflow-hidden max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-border-gray shrink-0">
          <h2 class="font-serif text-lg text-deep-plum font-semibold">Size Guide</h2>
          <button class="btn-icon" aria-label="Close size guide" @click="ui.closeSizeGuide">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-border-gray shrink-0">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="flex-1 py-3 text-sm font-ui font-medium transition-colors"
            :class="activeTab === tab ? 'text-deep-plum border-b-2 border-deep-plum' : 'text-mid-gray hover:text-charcoal'"
            :aria-selected="activeTab === tab"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- Bra sizes -->
          <div v-if="activeTab === 'Bra'" class="space-y-4">
            <p class="text-sm text-mid-gray font-ui mb-4">Measurements in inches. Measure your band (under bust) and cup (fullest point).</p>
            <div class="overflow-x-auto rounded-xl border border-border-gray">
              <table class="w-full text-sm font-ui">
                <thead class="bg-rose-blush">
                  <tr>
                    <th v-for="h in braHeaders" :key="h" class="px-4 py-2.5 text-left text-xs font-semibold text-deep-plum uppercase tracking-wider">{{ h }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-gray">
                  <tr v-for="row in braSizes" :key="row[0]" class="hover:bg-light-gray transition-colors">
                    <td v-for="(cell, i) in row" :key="i" class="px-4 py-2.5 text-charcoal">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Panty sizes -->
          <div v-else-if="activeTab === 'Panty'" class="space-y-4">
            <p class="text-sm text-mid-gray font-ui mb-4">Measurements in inches. Measure your waist and hips at the widest point.</p>
            <div class="overflow-x-auto rounded-xl border border-border-gray">
              <table class="w-full text-sm font-ui">
                <thead class="bg-rose-blush">
                  <tr>
                    <th v-for="h in pantyHeaders" :key="h" class="px-4 py-2.5 text-left text-xs font-semibold text-deep-plum uppercase tracking-wider">{{ h }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-gray">
                  <tr v-for="row in pantySizes" :key="row[0]" class="hover:bg-light-gray transition-colors">
                    <td v-for="(cell, i) in row" :key="i" class="px-4 py-2.5 text-charcoal">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- How to measure -->
          <div v-else class="space-y-4">
            <div v-for="step in measureSteps" :key="step.title" class="flex gap-4 p-4 bg-rose-blush/50 rounded-xl">
              <span class="text-2xl shrink-0">{{ step.icon }}</span>
              <div>
                <h4 class="font-ui font-semibold text-deep-plum text-sm mb-1">{{ step.title }}</h4>
                <p class="text-xs text-mid-gray leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const ui = useUIStore()
const tabs = ['Bra', 'Panty', 'How to Measure']
const activeTab = ref('Bra')

const braHeaders = ['Size', 'Band (inches)', 'Bust (inches)', 'Cup']
const braSizes = [
  ['30A', '27-28', '31-32', 'A'],
  ['30B', '27-28', '32-33', 'B'],
  ['32B', '29-30', '34-35', 'B'],
  ['32C', '29-30', '35-36', 'C'],
  ['34B', '31-32', '36-37', 'B'],
  ['34C', '31-32', '37-38', 'C'],
  ['34D', '31-32', '38-39', 'D'],
  ['36B', '33-34', '38-39', 'B'],
  ['36C', '33-34', '39-40', 'C'],
  ['36D', '33-34', '40-41', 'D'],
  ['38C', '35-36', '41-42', 'C'],
  ['38D', '35-36', '42-43', 'D'],
]

const pantyHeaders = ['Size', 'Waist (inches)', 'Hip (inches)']
const pantySizes = [
  ['XS', '24-26', '34-36'],
  ['S', '26-28', '36-38'],
  ['M', '28-30', '38-40'],
  ['L', '30-32', '40-42'],
  ['XL', '32-34', '42-44'],
  ['XXL', '34-36', '44-46'],
  ['3XL', '36-38', '46-48'],
]

const measureSteps = [
  { icon: '📏', title: 'Band Size', desc: 'Wrap a measuring tape snugly around your ribcage, directly below your bust. Round to the nearest even number. This is your band size.' },
  { icon: '🎀', title: 'Bust Size', desc: 'Measure around the fullest part of your bust, keeping the tape parallel to the ground. Do not pull too tight.' },
  { icon: '✨', title: 'Cup Size', desc: 'Subtract your band size from your bust measurement. The difference determines your cup: 1" = A, 2" = B, 3" = C, 4" = D.' },
  { icon: '💡', title: 'Pro Tip', desc: 'If you are between sizes, we recommend sizing up. For bralettes and wire-free styles, choose your usual panty/clothing size.' },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(30px); }
</style>
