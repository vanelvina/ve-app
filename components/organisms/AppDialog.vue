<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div
        v-if="state.open"
        class="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        :aria-label="state.title"
        @click.self="onBackdrop"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-hidden="true" />

        <!-- Panel -->
        <div class="relative w-full sm:max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden dialog-panel">

          <!-- Top accent bar -->
          <div
            class="h-1 w-full"
            :class="{
              'bg-deep-plum': state.type !== 'alert' || !isError,
              'bg-red-500': state.type === 'alert' && isError,
            }"
          />

          <div class="px-6 pt-5 pb-6 space-y-4">

            <!-- Icon + Title -->
            <div class="flex items-center gap-3">
              <!-- Alert / error icon -->
              <span
                v-if="state.type === 'alert'"
                class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                :class="isError ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <!-- Confirm icon -->
              <span
                v-else-if="state.type === 'confirm'"
                class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-rose-blush/40 text-deep-plum"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <!-- Prompt icon -->
              <span
                v-else
                class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-deep-plum/10 text-deep-plum"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </span>

              <h2 class="font-serif text-base font-semibold text-charcoal leading-snug">
                {{ state.title }}
              </h2>
            </div>

            <!-- Message -->
            <p class="text-sm font-ui text-charcoal/70 leading-relaxed">{{ state.message }}</p>

            <!-- Prompt input -->
            <div v-if="state.type === 'prompt'" class="mt-1">
              <input
                ref="promptInput"
                v-model="state.inputValue"
                type="text"
                :placeholder="state.placeholder || 'Type here…'"
                class="w-full px-4 py-2.5 rounded-xl border border-rose-blush/60 focus:outline-none focus:border-deep-plum focus:ring-2 focus:ring-deep-plum/10 text-sm font-ui text-charcoal bg-white transition-all"
                @keydown.enter="submitPrompt"
                @keydown.esc="cancel"
              />
            </div>

            <!-- Actions -->
            <div class="flex gap-2.5 pt-1" :class="state.type === 'alert' ? 'justify-end' : 'justify-end'">

              <!-- Cancel (confirm / prompt only) -->
              <button
                v-if="state.type !== 'alert'"
                @click="cancel"
                class="px-5 py-2.5 rounded-xl border border-charcoal/15 text-charcoal/70 text-xs font-bold font-ui uppercase tracking-wider hover:bg-light-gray transition-all"
              >
                Cancel
              </button>

              <!-- Primary action -->
              <button
                @click="confirm"
                class="px-5 py-2.5 rounded-xl text-xs font-bold font-ui uppercase tracking-wider transition-all"
                :class="{
                  'bg-deep-plum text-white hover:bg-deep-plum/90': state.type !== 'alert' || !isError,
                  'bg-red-600 text-white hover:bg-red-700': state.type === 'alert' && isError,
                }"
                :autofocus="state.type === 'alert' || state.type === 'confirm'"
              >
                {{ state.type === 'alert' ? 'OK' : state.type === 'confirm' ? 'Confirm' : 'Submit' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useDialog } from '~/composables/useDialog'

const { _state: state, _settle: settle } = useDialog()

const promptInput = ref<HTMLInputElement | null>(null)

// Error detection — crude but effective for common error messages
const isError = computed(() => {
  const m = (state.value.message || '').toLowerCase()
  return m.includes('fail') || m.includes('error') || m.includes('invalid') || m.includes('wrong')
})

watch(
  () => state.value.open,
  async (open) => {
    if (open && state.value.type === 'prompt') {
      await nextTick()
      promptInput.value?.focus()
    }
  }
)

const confirm = () => {
  if (state.value.type === 'prompt') {
    settle(state.value.inputValue || null)
  } else if (state.value.type === 'confirm') {
    settle(true)
  } else {
    settle(undefined)
  }
}

const cancel = () => {
  if (state.value.type === 'confirm') settle(false)
  else if (state.value.type === 'prompt') settle(null)
  else settle(undefined)
}

const submitPrompt = () => confirm()

// Clicking backdrop on alert = dismiss; on confirm = cancel; on prompt = cancel
const onBackdrop = () => cancel()
</script>

<style scoped>
.dialog-fade-enter-active {
  transition: opacity 0.2s ease;
}
.dialog-fade-leave-active {
  transition: opacity 0.18s ease-in;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
.dialog-fade-enter-from .dialog-panel {
  transform: translateY(20px) scale(0.97);
}
.dialog-fade-enter-active .dialog-panel {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.dialog-panel {
  transform: translateY(0) scale(1);
}
</style>
