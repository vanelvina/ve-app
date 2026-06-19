<template>
  <section class="section-padding bg-gradient-to-tr from-rose-blush/10 via-warm-ivory to-rose-blush/35 relative overflow-hidden" aria-labelledby="everyday-heading">
    <!-- Background design element -->
    <div class="absolute -bottom-16 -left-16 w-88 h-88 rounded-full bg-dusty-rose/5 blur-3xl pointer-events-none"></div>

    <div class="page-container relative z-10">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <!-- Editorial image (Clovia Stamp frame style) -->
        <div class="flex justify-center">
          <div class="relative group stamp-frame w-full max-w-md aspect-[4/3] overflow-hidden transform md:-rotate-1 hover:rotate-0 transition-transform duration-500 shadow-premium">
            <img
              :src="widget?.image || 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80'"
              :alt="widget?.title || 'Everyday Comfort Collection by Van Elvina'"
              class="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
              loading="lazy"
              width="800"
              height="600"
            />
            <div class="absolute inset-0 bg-gradient-to-tr from-deep-plum/20 to-transparent pointer-events-none" />
            <div class="absolute bottom-4 left-4">
              <AppBadge variant="new" :label="widget?.subtitle || 'Premium Quality'" />
            </div>
          </div>
        </div>

        <!-- Content (Zivame typography and spacing) -->
        <div class="space-y-6">
          <div class="space-y-3">
            <p class="text-xs font-ui font-bold text-dusty-rose uppercase tracking-[0.25em]">{{ widget?.subtitle || 'Everyday Essentials' }}</p>
            <h2 id="everyday-heading" class="font-serif text-3xl sm:text-4xl lg:text-5xl text-deep-plum font-extrabold leading-[1.15]" v-html="widget?.title || 'Everyday Comfort<br />Collection'">
            </h2>
            <p class="text-charcoal/70 font-ui text-sm sm:text-base leading-relaxed">
              {{ widget?.description || "Designed for real life — from morning rush to evening wind-down. Our Everyday Comfort Collection features ultra-soft fabrics, thoughtful fits, and styles that move with you. Because comfort isn't a luxury. It's a daily right." }}
            </p>
          </div>

          <!-- Feature items rendered as modern dynamic chips -->
          <div class="flex flex-wrap gap-2.5">
            <div
              v-for="feature in (widget?.items || features)"
              :key="feature"
              class="px-4 py-2 bg-white hover:bg-rose-blush border border-rose-blush/30 rounded-full text-[11px] sm:text-xs font-ui font-semibold text-deep-plum shadow-soft flex items-center gap-2 transition-all duration-300 hover:scale-105 select-none"
            >
              <span class="text-dusty-rose text-xs">🌿</span>
              <span>{{ feature }}</span>
            </div>
          </div>

          <div class="flex gap-3.5 flex-wrap pt-2">
            <NuxtLink to="/products" class="btn-primary shadow-lg shadow-deep-plum/10 rounded-full">Shop Collection</NuxtLink>
            <NuxtLink to="/products?category=bras" class="btn-secondary rounded-full">Explore Bras</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const features = [
  'All-day comfort without compromise',
  'Premium breathable fabrics',
  'No-pinch, no-poke designs',
  'Available in sizes 28A to 44H',
  'Machine washable & durable',
]
</script>
