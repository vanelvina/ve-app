<template>
  <section class="section-padding" aria-labelledby="everyday-heading">
    <div class="page-container">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- Editorial image -->
        <div class="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card-hover">
          <img
            :src="widget?.image || 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80'"
            :alt="widget?.title || 'Everyday Comfort Collection by Van Elvina'"
            class="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            width="800"
            height="600"
          />
          <div class="absolute inset-0 bg-gradient-to-tr from-deep-plum/40 to-transparent" />
          <div class="absolute bottom-5 left-5">
            <AppBadge variant="new" :label="widget?.subtitle || 'New Collection'" />
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-5">
          <div>
            <p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">{{ widget?.subtitle || 'Everyday Essentials' }}</p>
            <h2 id="everyday-heading" class="font-serif text-3xl md:text-4xl text-deep-plum font-bold leading-tight mb-4" v-html="widget?.title || 'Everyday Comfort<br />Collection'">
            </h2>
            <p class="text-mid-gray font-ui leading-relaxed text-sm md:text-base mb-6">
              {{ widget?.description || "Designed for real life — from morning rush to evening wind-down. Our Everyday Comfort Collection features ultra-soft fabrics, thoughtful fits, and styles that move with you. Because comfort isn't a luxury. It's a daily right." }}
            </p>
          </div>

          <!-- Feature list -->
          <ul class="space-y-3">
            <li v-for="feature in (widget?.items || features)" :key="feature" class="flex items-center gap-3 text-sm font-ui text-charcoal">
              <span class="w-5 h-5 rounded-full bg-rose-blush flex items-center justify-center shrink-0" aria-hidden="true">
                <svg class="w-3 h-3 text-dusty-rose" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </span>
              {{ feature }}
            </li>
          </ul>

          <div class="flex gap-3 flex-wrap">
            <NuxtLink to="/products" class="btn-primary">Shop Collection</NuxtLink>
            <NuxtLink to="/products?category=bras" class="btn-secondary">Explore Bras</NuxtLink>
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
