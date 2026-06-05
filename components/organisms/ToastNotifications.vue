<template>
  <Teleport to="body">
    <div
      class="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      <TransitionGroup name="toast">
        <div
          v-for="toast in ui.toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 min-w-[280px] max-w-xs bg-white rounded-xl shadow-modal border border-border-gray px-4 py-3"
          role="alert"
          :aria-label="toast.message"
        >
          <!-- Icon -->
          <span class="text-lg shrink-0 mt-0.5" aria-hidden="true">
            {{ toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️' }}
          </span>
          <!-- Message -->
          <p class="text-sm font-ui text-charcoal flex-1 leading-snug">{{ toast.message }}</p>
          <!-- Close -->
          <button
            class="text-mid-gray hover:text-charcoal shrink-0"
            :aria-label="`Dismiss: ${toast.message}`"
            @click="ui.removeToast(toast.id)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const ui = useUIStore()
</script>

<style scoped>
.toast-enter-active { transition: all 0.3s ease; }
.toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from { opacity: 0; transform: translateX(100%) scale(0.9); }
.toast-leave-to { opacity: 0; transform: translateX(100%) scale(0.9); }
.toast-move { transition: transform 0.3s ease; }
</style>
