<template>
  <button
    :id="id"
    :type="type"
    :disabled="disabled || loading"
    :class="[baseClasses, variantClasses, sizeClasses, { 'opacity-60 cursor-not-allowed': disabled || loading }]"
    :aria-label="ariaLabel || label"
    class="no-tap-highlight"
    v-bind="$attrs"
  >
    <AppSpinner v-if="loading" class="w-4 h-4" />
    <slot v-else>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  label?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  full?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  full: false,
})

const baseClasses = computed(() =>
  [
    'inline-flex items-center justify-center gap-2 font-ui font-medium tracking-wide rounded-lg',
    'transition-all duration-250 cursor-pointer select-none active:scale-[0.98]',
    props.full ? 'w-full' : '',
  ].join(' '),
)

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-white text-deep-plum border-2 border-deep-plum hover:bg-rose-blush'
    case 'ghost':
      return 'text-charcoal hover:text-deep-plum hover:bg-rose-blush'
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600'
    case 'gold':
      return 'bg-gradient-gold text-white hover:opacity-90 shadow-sm'
    default:
      return 'bg-deep-plum text-white hover:bg-plum-800 shadow-sm'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-4 py-1.5 text-xs'
    case 'lg':
      return 'px-8 py-3.5 text-base'
    case 'xl':
      return 'px-10 py-4 text-base'
    default:
      return 'px-6 py-2.5 text-sm'
  }
})
</script>
