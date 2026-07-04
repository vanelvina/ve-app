<template>
  <Transition name="slide-down">
    <div
      v-if="showPrompt"
      class="fixed top-0 left-0 right-0 z-[100] w-full bg-white border-b border-rose-blush/30 shadow-md animate-fade-in"
      role="dialog"
      aria-label="Notification Prompt"
    >
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-3 md:px-8">
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
            :disabled="accepting"
            class="flex-1 md:flex-initial px-4 py-2 text-xs font-ui font-semibold text-white bg-deep-plum rounded-xl shadow-md shadow-deep-plum/20 hover:bg-[#473021] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <svg v-if="accepting" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ accepting ? 'Enabling...' : 'Allow' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showPrompt = ref(false)
const accepting = ref(false)

const declineNotifications = () => {
  showPrompt.value = false
  localStorage.setItem('ve_soft_push_prompt', 'declined')
}

const acceptNotifications = async () => {
  accepting.value = true
  localStorage.setItem('ve_soft_push_prompt', 'allowed')

  try {
    const { $registerPush } = useNuxtApp()
    if ($registerPush) {
      // $registerPush triggers permission request if not yet granted, then subscribes
      await ($registerPush as Function)()
    }
  } catch (err) {
    console.error('[Prompt] Error enabling notifications:', err)
  } finally {
    accepting.value = false
    showPrompt.value = false
  }
}

onMounted(() => {
  if (!import.meta.client) return
  if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) return

  const permission = Notification.permission
  const softPromptChoice = localStorage.getItem('ve_soft_push_prompt')

  // Case 1: Never answered → show prompt to ask
  if (permission === 'default' && !softPromptChoice) {
    setTimeout(() => { showPrompt.value = true }, 4000)
    return
  }

  // Case 2: User previously clicked "Allow" on our prompt but maybe didn't get subscribed
  // (e.g. VAPID keys were missing before). Re-try silently if permission is granted.
  if (permission === 'granted' && softPromptChoice === 'allowed') {
    // The push plugin handles re-sync automatically, nothing to show here
    return
  }

  // Case 3: Browser permission is granted but user never saw our soft prompt
  // (e.g. they allowed via some other trigger). Mark it and sync silently.
  if (permission === 'granted' && !softPromptChoice) {
    localStorage.setItem('ve_soft_push_prompt', 'allowed')
    // The plugin will handle sync on load
    return
  }
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
