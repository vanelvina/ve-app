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

    // Determine identity: customer takes priority, then check admin from localStorage
    let email = 'anonymous'
    let name = 'Anonymous'

    if (auth.isLoggedIn && auth.user) {
      email = auth.user.email
      name = auth.user.name || 'Customer'
    } else {
      // Admin: always read from localStorage since admin.adminUser may not be hydrated
      const adminToken = import.meta.client ? localStorage.getItem('ve_admin_token') : null
      if (adminToken || admin.isAuthenticated) {
        // Use stored admin email if available, otherwise use canonical 'admin' identifier
        const storedAdminEmail = import.meta.client 
          ? (localStorage.getItem('ve_admin_email') || 'admin')
          : 'admin'
        email = storedAdminEmail
        name = import.meta.client 
          ? (localStorage.getItem('ve_admin_name') || 'Admin User')
          : 'Admin User'
      }
    }

    try {
      await $fetch(`${config.public.apiBase}/inquiries/push-subscribe`, {
        method: 'POST',
        body: { email, name, subscription }
      })
      console.log('[Push] Subscription successfully registered on server for:', email)
    } catch (err) {
      console.error('[Push] Failed to register subscription on server:', err)
    }
  }

  const registerPush = async (forceRequest = false) => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('[Push] Push notifications not supported in this browser.')
      return
    }

    const config = useRuntimeConfig()
    const publicVapidKey = config.public.vapidPublicKey
    if (!publicVapidKey) {
      console.warn('[Push] VAPID public key is not configured. Push subscription skipped.')
      return
    }

    try {
      let permission = Notification.permission

      if (permission === 'default' && forceRequest) {
        // Only request permission if explicitly triggered (e.g. user clicked Allow)
        permission = await Notification.requestPermission()
      }

      if (permission !== 'granted') {
        console.warn('[Push] Permission not granted:', permission)
        return
      }

      // Wait for service worker ready (with a timeout fallback)
      const registration = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('SW ready timeout')), 10000))
      ]).catch((err) => {
        console.warn('[Push] Service worker not ready in time:', err)
        return null
      }) as ServiceWorkerRegistration | null

      if (!registration) return

      // Check for existing subscription first and always re-sync it to server
      const existingSubscription = await registration.pushManager.getSubscription()
      if (existingSubscription) {
        console.log('[Push] Re-syncing existing browser subscription to server')
        await syncSubscription(existingSubscription)
        return
      }

      // Create a new subscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      })

      console.log('[Push] New subscription created:', subscription.endpoint)
      await syncSubscription(subscription)
    } catch (err) {
      console.error('[Push] Registration / subscription failed:', err)
    }
  }

  // Watch for CUSTOMER auth state changes — re-register when they log in
  watch(() => auth.isLoggedIn, async (loggedIn) => {
    if (loggedIn && Notification.permission === 'granted') {
      await registerPush()
    }
  })

  // Watch for ADMIN auth state changes — register when admin authenticates
  watch(() => admin.isAuthenticated, async (isAuth) => {
    if (isAuth && Notification.permission === 'granted') {
      await registerPush()
    }
  })

  // On page load: if permission is already granted, immediately re-sync subscription
  // This ensures both admins (token in localStorage) and returning customers stay subscribed
  if (import.meta.client) {
    // Wait for SW to be active before trying to sync
    navigator.serviceWorker?.ready.then(() => {
      if (Notification.permission === 'granted') {
        registerPush()
      }
    }).catch(() => {})

    // Also try after a small delay as a fallback (covers cases where SW activates late)
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        registerPush()
      }
    }, 3000)
  }

  return {
    provide: {
      // forceRequest=true causes the browser permission dialog to appear if not yet granted
      registerPush: () => registerPush(true)
    }
  }
})
