<template>
  <Transition name="slide-down">
    <div
      v-if="showPrompt"
      class="fixed top-0 left-0 right-0 z-[100] w-full bg-white border-b border-rose-blush/30 shadow-md p-4 animate-fade-in md:px-8"
      role="dialog"
      aria-label="Notification Prompt"
    >
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Message -->
        <div class="flex items-center gap-3 text-left">
          <div class="w-10 h-10 rounded-full bg-rose-blush/20 flex items-center justify-center text-deep-plum shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <h4 class="font-serif font-bold text-deep-plum text-sm leading-normal">
              Van Elvina Comfort Alerts
            </h4>
            <p class="text-xs font-ui text-mid-gray leading-normal mt-0.5">
              Van Elvina would love to send gentle notifications about premium comfort for delicate ladies.
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
          <button
            @click="declineNotifications"
            class="flex-1 md:flex-initial px-4 py-2 text-xs font-ui font-semibold text-charcoal bg-warm-ivory rounded-xl hover:bg-[#E8DDD5] transition-colors"
          >
            Decline
          </button>
          <button
            @click="acceptNotifications"
            class="flex-1 md:flex-initial px-4 py-2 text-xs font-ui font-semibold text-white bg-deep-plum rounded-xl shadow-md shadow-deep-plum/20 hover:bg-[#473021] transition-all"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showPrompt = ref(false)

const declineNotifications = () => {
  showPrompt.value = false
  localStorage.setItem('ve_soft_push_prompt', 'declined')
}

const acceptNotifications = async () => {
  showPrompt.value = false
  localStorage.setItem('ve_soft_push_prompt', 'allowed')
  
  if (typeof window === 'undefined') return
  
  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const { $registerPush } = useNuxtApp()
      if ($registerPush) {
        await $registerPush()
      }
    }
  } catch (err) {
    console.error('Error requesting notification permission:', err)
  }
}

onMounted(() => {
  if (!import.meta.client) return

  // Verify support & state
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return
  if (Notification.permission !== 'default') return

  // Prevent double prompt if already answered
  const softPromptChoice = localStorage.getItem('ve_soft_push_prompt')
  if (softPromptChoice) return

  // Display prompt after a subtle delay
  setTimeout(() => {
    showPrompt.value = true
  }, 4000)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
