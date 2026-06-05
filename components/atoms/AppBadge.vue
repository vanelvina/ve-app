<template>
  <span :class="[baseClasses, variantClasses]" role="status" :aria-label="label">
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  variant?: 'sale' | 'new' | 'bestseller' | 'trending' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const baseClasses = 'inline-flex items-center text-[10px] font-ui font-semibold px-2 py-0.5 rounded uppercase tracking-wider'

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'sale':
      return 'bg-red-500 text-white'
    case 'new':
      return 'bg-deep-plum text-white'
    case 'bestseller':
      return 'bg-soft-gold text-white'
    case 'trending':
      return 'bg-dusty-rose text-white'
    default:
      return 'bg-charcoal text-white'
  }
})
</script>
