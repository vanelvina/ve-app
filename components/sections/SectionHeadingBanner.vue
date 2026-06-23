<template>
  <section class="py-10 bg-white relative group" :aria-labelledby="widget?.key ? `heading-banner-${widget.key}` : undefined">
    <div class="page-container">
      <!-- Section Header -->
      <div v-if="widget?.title" class="pb-3 mb-6 relative">
        <div class="flex items-center justify-center">
          <h2 :id="widget?.key ? `heading-banner-${widget.key}` : undefined" class="text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-[#2A1B18] text-center">
            {{ widget.title }}
          </h2>
        </div>
        <!-- Thicker Grey Divider Line (4px) -->
        <div class="absolute bottom-0 left-0 right-0 h-[4px] bg-gray-200/60"></div>
        <!-- Thicker Black Accent Bar (4px) on top of the grey line on the left -->
        <div class="absolute bottom-0 left-0 h-[4px] bg-black w-28 z-10"></div>
      </div>

      <!-- Banner Image Wrap -->
      <div class="overflow-hidden rounded-2xl shadow-premium hover:shadow-card-hover transition-all duration-300">
        <NuxtLink :to="widget.items?.link || '/products'" class="block w-full">
          <picture class="block w-full">
            <source media="(max-width: 768px)" :srcset="widget.imageMobile || widget.image" />
            <img
              :src="widget.image"
              :alt="widget.title || widget.name || 'Heading Banner Image'"
              class="w-full h-auto block hover:scale-[1.01] transition-transform duration-500"
              loading="lazy"
            />
          </picture>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  widget: any
}>()
</script>
