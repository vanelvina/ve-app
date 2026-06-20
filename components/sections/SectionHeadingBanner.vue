<template>
  <section class="w-full relative bg-white">
    <NuxtLink :to="widget.items?.link || '/products'" class="block w-full">
      <picture class="block w-full">
        <source media="(max-width: 768px)" :srcset="widget.imageMobile || widget.image" />
        <img
          :src="widget.image"
          :alt="widget.name || 'Heading Banner'"
          class="w-full h-auto block"
          loading="lazy"
        />
      </picture>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  widget: any
}>()
</script>
