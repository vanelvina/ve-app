<template>
  <Transition name="slide-up">
    <div
      v-if="showPrompt"
      class="fixed bottom-4 left-4 right-4 z-50 bg-white rounded-2xl border border-rose-blush/30 shadow-modal p-5 md:max-w-sm md:left-auto md:right-6 animate-fade-in flex flex-col space-y-4"
      role="dialog"
      aria-label="Install App Prompt"
    >
      <!-- Close action button -->
      <button
        @click="dismissPrompt"
        class="absolute top-3 right-3 text-charcoal/40 hover:text-charcoal transition-colors p-1"
        aria-label="Dismiss app install prompt"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- App description banner -->
      <div class="flex items-center gap-3">
        <!-- VE Monogram circle -->
        <div class="w-12 h-12 rounded-xl bg-deep-plum flex items-center justify-center text-white font-serif font-bold text-lg shadow-soft shrink-0">
          VE
        </div>
        <div>
          <h4 class="font-sans font-bold text-charcoal text-sm">Install Van Elvina App</h4>
          <p class="text-xs text-charcoal/60 leading-normal mt-0.5">
            Add to home screen for a premium mobile-first shopping experience.
          </p>
        </div>
      </div>

      <!-- Installation CTA / Instructions -->
      <div class="pt-1">
        <!-- iOS Safari helper -->
        <div v-if="isIOS" class="bg-rose-blush/30 rounded-xl p-3 border border-rose-blush/50 text-[11px] text-charcoal/80 leading-relaxed">
          <p class="font-semibold text-deep-plum mb-1">To install on iOS Safari:</p>
          <ol class="list-decimal pl-4 space-y-1">
            <li>Tap the share icon <strong class="bg-white/80 px-1 py-0.5 rounded border border-rose-blush">Share 📤</strong> at the bottom.</li>
            <li>Scroll down and select <strong class="bg-white/80 px-1 py-0.5 rounded border border-rose-blush">Add to Home Screen ➕</strong>.</li>
          </ol>
        </div>

        <!-- Android/Chrome standard install trigger -->
        <button
          v-else
          @click="triggerInstall"
          class="w-full py-2.5 bg-deep-plum text-white hover:bg-plum-800 rounded-xl text-xs font-ui font-semibold uppercase tracking-wider shadow-sm transition-all duration-250 flex items-center justify-center gap-1.5"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Install Now
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showPrompt = ref(false)
const isIOS = ref(false)
const deferredPrompt = ref<any>(null)

const dismissPrompt = () => {
  showPrompt.value = false
  // Store in sessionStorage so it only dismisses for the current browsing session.
  // Next time they open the browser, they will be prompted again.
  sessionStorage.setItem('pwa_prompt_dismissed_session', 'true')
}

const triggerInstall = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt')
    }
    deferredPrompt.value = null
    showPrompt.value = false
  }
}

onMounted(() => {
  if (!import.meta.client) return

  // 1. Check if already running in standalone PWA mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone
  if (isStandalone) {
    // If they have it installed and are currently running it, hide prompt.
    showPrompt.value = false
    return
  }

  // 2. Check if dismissed during this session
  const dismissedThisSession = sessionStorage.getItem('pwa_prompt_dismissed_session') === 'true'
  if (dismissedThisSession) return

  // 3. Detect mobile device
  const userAgent = window.navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent)
  
  if (!isMobile) return // Only show on mobile devices

  isIOS.value = /iphone|ipad|ipod/.test(userAgent)
  const isSafari = /safari/.test(userAgent) && !/crios|fxios|chrome|firefox|opera/.test(userAgent)

  // 4. Capture beforeinstallprompt event for Android / Chrome / Edge
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showPrompt.value = true
  })

  // 5. If iOS Safari, trigger the prompt instructions after a small delay
  if (isIOS.value && isSafari) {
    setTimeout(() => {
      showPrompt.value = true
    }, 4000)
  }

  // 6. Listen for successful install
  window.addEventListener('appinstalled', () => {
    showPrompt.value = false
    console.log('App was successfully installed!')
  })
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
