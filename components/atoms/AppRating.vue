<template>
  <div class="flex items-center gap-0.5" :aria-label="`Rating: ${rating} out of 5`" role="img">
    <template v-for="n in 5" :key="n">
      <svg
        class="w-3.5 h-3.5 flex-shrink-0"
        :class="n <= Math.round(rating) ? 'star-filled' : 'star-empty'"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </template>
    <span v-if="showCount" class="ml-1.5 text-xs text-mid-gray font-ui">({{ count.toLocaleString('en-IN') }})</span>
    <span v-if="showValue" class="ml-1.5 text-xs font-semibold text-charcoal font-ui">{{ rating }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rating: number
  count?: number
  showCount?: boolean
  showValue?: boolean
}

withDefaults(defineProps<Props>(), {
  count: 0,
  showCount: false,
  showValue: false,
})
</script>
