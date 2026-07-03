<template>
  <Teleport to="body">
    <div
      class="fixed z-[9999] flex flex-col gap-3 pointer-events-none top-4 left-4 right-4 md:top-6 md:right-6 md:left-auto md:w-full md:max-w-sm"
      aria-live="polite"
      aria-label="Notifications"
    >
      <TransitionGroup name="toast">
        <div
          v-for="toast in ui.toasts"
          :key="toast.id"
          class="pointer-events-auto relative overflow-hidden flex items-start gap-3 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_30px_rgba(42,27,24,0.08)] border px-4 py-3.5 transition-all duration-300 transform"
          :class="{
            'border-emerald-500/20 shadow-emerald-500/5': toast.type === 'success',
            'border-rose-500/20 shadow-rose-500/5': toast.type === 'error',
            'border-rose-blush/30 shadow-deep-plum/5': toast.type === 'info',
          }"
          role="alert"
          :aria-label="toast.message"
        >
          <!-- Left Decorative Accent Highlight -->
          <div
            class="absolute left-0 top-0 bottom-0 w-1.5"
            :class="{
              'bg-emerald-500': toast.type === 'success',
              'bg-rose-500': toast.type === 'error',
              'bg-deep-plum': toast.type === 'info'
            }"
          ></div>

          <!-- Icon Wrapper -->
          <div
            class="shrink-0 rounded-xl p-1.5 flex items-center justify-center mt-0.5"
            :class="{
              'bg-emerald-500/10 text-emerald-600': toast.type === 'success',
              'bg-rose-500/10 text-rose-600': toast.type === 'error',
              'bg-rose-blush/20 text-deep-plum': toast.type === 'info'
            }"
          >
            <!-- Success Icon -->
            <svg v-if="toast.type === 'success'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <!-- Error Icon -->
            <svg v-else-if="toast.type === 'error'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <!-- Info Icon -->
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <!-- Message & Title Section -->
          <div class="flex-1 min-w-0 pr-2">
            <h5 class="text-[10px] font-bold font-sans uppercase tracking-wider"
              :class="{
                'text-emerald-700': toast.type === 'success',
                'text-rose-700': toast.type === 'error',
                'text-deep-plum': toast.type === 'info'
              }"
            >
              {{ toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Notification' }}
            </h5>
            <p class="text-xs font-ui text-charcoal/80 leading-relaxed mt-0.5 font-medium">{{ toast.message }}</p>
          </div>

          <!-- Close Action -->
          <button
            class="text-charcoal/30 hover:text-charcoal/80 transition-colors p-0.5 rounded-lg hover:bg-charcoal/5 self-start -mt-1 -mr-1"
            :aria-label="`Dismiss: ${toast.message}`"
            @click="ui.removeToast(toast.id)"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Animated Progress Bar -->
          <div
            class="absolute bottom-0 left-0 right-0 h-[2.5px] progress-bar"
            :class="{
              'bg-emerald-500': toast.type === 'success',
              'bg-rose-500': toast.type === 'error',
              'bg-deep-plum': toast.type === 'info'
            }"
          ></div>
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
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}
@media (min-width: 768px) {
  .toast-enter-from {
    opacity: 0;
    transform: translateX(24px) scale(0.95);
  }
}
.toast-leave-to {
  opacity: 0;
  transform: scale(0.95);
  filter: blur(2px);
}
.toast-move {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.progress-bar {
  animation: shrink 3.5s linear forwards;
}

@keyframes shrink {
  from {
    transform: scaleX(1);
    transform-origin: left;
  }
  to {
    transform: scaleX(0);
    transform-origin: left;
  }
}
</style>
