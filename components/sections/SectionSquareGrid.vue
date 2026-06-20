<template>
  <section class="py-10 bg-white relative group" :aria-labelledby="widget?.key ? `square-grid-${widget.key}` : undefined">
    <div class="page-container">
      <!-- Section Header -->
      <div v-if="widget?.title" class="border-b border-gray-200/80 pb-3 mb-8 relative">
        <div class="flex items-center justify-center">
          <h2 :id="widget?.key ? `square-grid-${widget.key}` : undefined" class="text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-[#8A4F5A] text-center">
            {{ widget.title }}
          </h2>
        </div>
        <!-- Bold border bottom at the start/left of the line -->
        <div class="absolute bottom-0 left-0 h-[3px] bg-black w-24 -mb-[1.5px]"></div>
      </div>

      <!-- Center Aligned Squares Grid -->
      <div class="flex flex-wrap justify-center items-center gap-4 sm:gap-5 md:gap-6">
        <div
          v-for="(item, idx) in sortedItems"
          :key="idx"
          class="relative shrink-0 w-[135px] xs:w-[150px] sm:w-[165px] md:w-[180px] lg:w-[195px] aspect-square overflow-hidden"
        >
          <NuxtLink :to="item.link || '/products'" class="block w-full h-full">
            <img
              :src="item.image"
              :alt="item.title || 'Square promotion image'"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  widget: any
}>()

// Safely retrieve items array and slice to max 8 items
const sortedItems = computed(() => {
  const list = Array.isArray(props.widget?.items) ? props.widget.items : []
  return list.slice(0, 8)
})
</script>
