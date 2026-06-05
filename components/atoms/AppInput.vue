<template>
  <div class="relative w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-ui font-medium text-charcoal mb-1.5"
    >
      {{ label }}
      <span v-if="required" class="text-dusty-rose ml-0.5">*</span>
    </label>

    <div class="relative">
      <span
        v-if="$slots.prefix"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-mid-gray"
        aria-hidden="true"
      >
        <slot name="prefix" />
      </span>

      <input
        :id="inputId"
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :maxlength="maxlength"
        :class="[
          'input-base',
          $slots.prefix ? 'pl-10' : '',
          $slots.suffix ? 'pr-10' : '',
          error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : '',
          disabled ? 'opacity-60 cursor-not-allowed bg-light-gray' : '',
        ]"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : undefined"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <span
        v-if="$slots.suffix"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-mid-gray"
        aria-hidden="true"
      >
        <slot name="suffix" />
      </span>
    </div>

    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="mt-1 text-xs text-red-500 font-ui"
      role="alert"
    >
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-1 text-xs text-mid-gray font-ui">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  maxlength?: number
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2, 7)}`)
</script>
