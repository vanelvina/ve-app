// plugins/push-notifications.client.ts
import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/stores/auth'
import { useAdminStore } from '~/stores/admin'
import { watch } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore()
  const admin = useAdminStore()

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const syncSubscription = async (subscription: PushSubscription | null) => {
    if (!subscription) return
    const config = useRuntimeConfig()
    
    let email = 'anonymous'
    let name = 'Anonymous'

    if (auth.isLoggedIn && auth.user) {
      email = auth.user.email
      name = auth.user.name
    } else {
      admin.init()
      if (admin.isAuthenticated) {
        email = 'admin'
        name = 'Admin User'
      }
    }

    try {
      await $fetch(`${config.public.apiBase}/inquiries/push-subscribe`, {
        method: 'POST',
        body: {
          email,
          name,
          subscription
        }
      })
      console.log('[Push] Subscription successfully registered on server for:', email)
    } catch (err) {
      console.error('[Push] Failed to register subscription on server:', err)
    }
  }

  const registerPush = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('[Push] Push notifications not supported in this browser.')
      return
    }

    try {
      const registration = await navigator.serviceWorker.ready
      
      // Request permission
      let permission = Notification.permission
      if (permission === 'default') {
        permission = await Notification.requestPermission()
      }
      
      if (permission !== 'granted') {
        console.warn('[Push] Permission was not granted for push notifications.')
        return
      }

      // VAPID Public Key
      const publicVapidKey = 'BF2ljIBKIQS12D8ynJn2rLVbA8LFcsEsOm4Pjik6HAMWto3LaGWwh29Sud_KGZzfODX5zPTE-ZugvVveDWCGwzY'
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      })

      console.log('[Push] Subscription received on client:', subscription)
      await syncSubscription(subscription)
    } catch (err) {
      console.error('[Push] Registration / subscription failed:', err)
    }
  }

  // Watch for auth or admin state changes
  watch(() => auth.isLoggedIn, () => {
    registerPush()
  })
  
  watch(() => admin.isAuthenticated, () => {
    registerPush()
  })

  // Trigger push registration on page load
  if (import.meta.client) {
    setTimeout(() => {
      registerPush()
    }, 2000)
  }
})
