<template>
  <div v-if="$pwa?.needRefresh" class="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[9999] bg-white p-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-rose-blush max-w-sm flex flex-col gap-3" role="alert" aria-live="polite">
    <div class="flex items-start justify-between">
      <div>
        <h3 class="font-serif text-lg font-semibold text-deep-plum">Update Available!</h3>
        <p class="text-xs font-ui text-mid-gray mt-1 leading-relaxed">A new version of Van Elvina is available. Refresh to get the latest features and improved performance.</p>
      </div>
      <button @click="$pwa?.cancelPrompt()" class="text-mid-gray hover:text-charcoal p-1" aria-label="Close">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
    
    <div class="flex justify-end gap-3 mt-2">
      <button @click="$pwa?.cancelPrompt()" class="px-4 py-2 text-xs font-ui font-semibold text-charcoal bg-warm-ivory rounded-xl hover:bg-[#E8DDD5] transition-colors">
        Later
      </button>
      <button @click="refreshCache" class="px-4 py-2 text-xs font-ui font-semibold text-white bg-deep-plum rounded-xl shadow-md shadow-deep-plum/20 hover:bg-[#473021] transition-all flex items-center gap-1.5">
        <svg v-if="loading" class="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        {{ loading ? 'Refreshing...' : 'Refresh Cache' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { $pwa } = useNuxtApp()
const loading = ref(false)

const refreshCache = async () => {
  if (typeof window === 'undefined') return
  
  loading.value = true
  
  try {
    // 1. Session Storage
    sessionStorage.clear()
    
    // 2. Local Storage (save auth state only)
    const token = localStorage.getItem('ve_user_token')
    const user = localStorage.getItem('ve_user')
    localStorage.clear()
    if (token) localStorage.setItem('ve_user_token', token)
    if (user) localStorage.setItem('ve_user', user)
    
    // 3. Cookies
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }
    
    // 4. System Cache (CacheStorage)
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map(name => caches.delete(name)))
      } catch (err) {
        console.error('Failed to clear CacheStorage:', err)
      }
    }
    
    // 5. Trigger PWA update which reloads the page
    if ($pwa && $pwa.updateServiceWorker) {
      await $pwa.updateServiceWorker()
    } else {
      window.location.reload()
    }
  } catch (error) {
    console.error('Error during cache refresh:', error)
    window.location.reload()
  }
}
</script>
