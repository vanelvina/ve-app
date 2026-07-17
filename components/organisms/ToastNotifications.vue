<template>
  <Teleport to="body">
    <div
      class="fixed z-[9999] flex flex-col gap-2 pointer-events-none bottom-20 left-4 right-4 md:bottom-6 md:right-6 md:left-auto md:w-auto"
      aria-live="polite"
      aria-label="Notifications"
    >
      <TransitionGroup name="toast">
        <div
          v-for="toast in ui.toasts"
          :key="toast.id"
          class="pointer-events-auto inline-flex items-center gap-2.5 bg-[#1C1C1E]/80 text-white/90 pl-3 pr-2 py-2 rounded-2xl shadow-xl w-full md:w-auto md:min-w-[220px] md:max-w-xs backdrop-blur-sm"
          role="alert"
          :aria-label="toast.message"
        >
          <!-- Status dot -->
          <span
            class="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            :class="{
              'bg-emerald-500': toast.type === 'success',
              'bg-red-500': toast.type === 'error',
              'bg-blue-500': toast.type === 'info',
            }"
          >
            <svg v-if="toast.type === 'success'" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="toast.type === 'error'" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>

          <!-- Message -->
          <span class="text-sm font-medium font-ui flex-1 leading-tight">{{ toast.message }}</span>

          <!-- Dismiss -->
          <button
            class="text-white/40 hover:text-white/80 transition-colors p-1 rounded-lg ml-1 shrink-0"
            :aria-label="`Dismiss`"
            @click="ui.removeToast(toast.id)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useUIStore } from '~/stores/ui'
const ui = useUIStore()
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: all 0.25s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}
.toast-leave-to {
  opacity: 0;
  transform: scale(0.94);
}
.toast-move {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
