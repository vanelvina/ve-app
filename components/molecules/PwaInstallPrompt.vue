<template>
  <Transition name="slide-up">
    <div 
      v-if="showPrompt" 
      class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/95 backdrop-blur-md border border-rose-blush/40 shadow-premium p-4 rounded-2xl z-50 flex items-center justify-between gap-4 font-ui"
    >
      <div class="flex-1 space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-lg">✨</span>
          <h4 class="font-serif font-bold text-deep-plum text-sm">Install Van Elvina App</h4>
        </div>
        <p class="text-[10px] text-charcoal/70 leading-relaxed">
          Add to your home screen for a premium, native innerwear shopping experience with offline access.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button 
          @click="dismissPrompt" 
          class="px-2.5 py-1.5 rounded-lg text-charcoal/50 hover:text-charcoal hover:bg-charcoal/5 text-[11px] font-bold transition-colors"
        >
          Later
        </button>
        <button 
          @click="triggerInstall" 
          class="px-3.5 py-1.5 rounded-xl bg-deep-plum text-white hover:bg-plum-800 text-[11px] font-bold shadow-soft transition-all"
        >
          Install
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showPrompt = ref(false)
const deferredPrompt = ref<any>(null)

const handleBeforeInstallPrompt = (e: Event) => {
  e.preventDefault()
  deferredPrompt.value = e
  showPrompt.value = true
}

const handleAppInstalled = () => {
  deferredPrompt.value = null
  showPrompt.value = false
  console.log('PWA was successfully installed!')
}

onMounted(() => {
  if (import.meta.client) {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone
    if (!isStandalone) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.addEventListener('appinstalled', handleAppInstalled)
    }
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.removeEventListener('appinstalled', handleAppInstalled)
  }
})

const triggerInstall = async () => {
  if (!deferredPrompt.value) return
  
  deferredPrompt.value.prompt()
  
  const { outcome } = await deferredPrompt.value.userChoice
  console.log(`PWA install prompt outcome: ${outcome}`)
  
  deferredPrompt.value = null
  showPrompt.value = false
}

const dismissPrompt = () => {
  showPrompt.value = false
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translate(-50%, 100%) scale(0.9);
  opacity: 0;
}
</style>
