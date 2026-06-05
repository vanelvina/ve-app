<template>
  <section class="section-padding bg-gradient-to-br from-deep-plum to-plum-900" aria-labelledby="usp-heading">
    <div class="page-container">
      <div class="section-heading mb-10">
        <p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">{{ widget?.subtitle || 'Why Choose Van Elvina' }}</p>
        <h2 id="usp-heading" class="text-white">{{ widget?.title || 'The Van Elvina Promise' }}</h2>
        <p class="text-white/70">{{ widget?.description || 'We believe every woman deserves innerwear that\'s as beautiful as it is comfortable.' }}</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="usp in (widget?.items || usps)"
          :key="usp.title"
          class="group flex flex-col items-center text-center p-5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-default"
        >
          <div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">{{ usp.icon }}</div>
          <h3 class="font-ui font-semibold text-white text-sm mb-1.5">{{ usp.title }}</h3>
          <p class="text-white/60 text-xs leading-relaxed">{{ usp.desc }}</p>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-12 text-center">
        <NuxtLink to="/products" class="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-deep-plum rounded-full font-ui font-semibold text-sm hover:bg-rose-blush transition-colors duration-250">
          Shop Now &amp; Experience the Difference
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const usps = [
  { icon: '🌿', title: 'Pure Fabrics', desc: 'OEKO-TEX certified, skin-safe materials' },
  { icon: '📏', title: 'Perfect Fit', desc: 'Inclusive sizing from 28A to 44H' },
  { icon: '🚀', title: 'Fast Delivery', desc: 'Delivered in 2–5 business days' },
  { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free exchange policy' },
  { icon: '🔒', title: 'Secure Packing', desc: 'Discreet, privacy-first packaging' },
  { icon: '💰', title: 'Best Value', desc: 'Premium quality at honest prices' },
]
</script>
