<template>
  <div
    class="skeleton"
    :class="classes"
    :style="style"
    role="status"
    aria-label="Loading..."
    aria-busy="true"
  />
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  rounded?: string
  class?: string
}
const props = defineProps<Props>()

const classes = computed(() => props.class || '')
const style = computed(() => ({
  width: props.width || '100%',
  height: props.height || '1rem',
  borderRadius: props.rounded || '0.375rem',
}))
</script>
