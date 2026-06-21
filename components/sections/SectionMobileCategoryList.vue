<template>
  <section
    class="md:hidden py-3 bg-white border-b border-[#EEE5DC]"
    :aria-label="widget?.title || 'Shop by category'"
  >
    <!-- Optional heading (shown only when title is set) -->
    <div v-if="widget?.title" class="px-4 pb-2 flex items-center justify-between">
      <h2 class="text-sm font-bold font-serif text-deep-plum tracking-tight">
        {{ widget.title }}
      </h2>
      <NuxtLink
        v-if="widget?.items?.viewAllLink"
        :to="widget.items.viewAllLink"
        class="text-[10px] font-ui font-bold text-dusty-rose hover:text-deep-plum transition-colors"
      >
        View All →
      </NuxtLink>
    </div>

    <!-- Horizontal scroll row -->
    <div class="overflow-x-auto scrollbar-hide">
      <div class="flex items-start gap-3 px-4 pb-1" style="width: max-content;">
        <NuxtLink
          v-for="(item, i) in items"
          :key="i"
          :to="item.link || '/products'"
          class="flex flex-col items-center"
        >
          <!-- Actual image as it is, no circles, hover effects, overlays or custom borders -->
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.label || 'Category Image'"
            class="max-h-20 w-auto block"
            loading="lazy"
          />
          <!-- Label below image (only if exists) -->
          <span
            v-if="item.label"
            class="text-[10px] font-ui font-semibold text-charcoal/80 text-center leading-tight tracking-wide mt-1"
          >
            {{ item.label }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const items = computed(() => {
  const raw = props.widget?.items?.list ?? props.widget?.items ?? []
  if (Array.isArray(raw)) return raw
  return []
})
</script>
