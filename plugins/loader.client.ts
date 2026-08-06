import { defineNuxtPlugin } from '#app'
import { useUIStore } from '~/stores/ui'

// ─── URL segments that should show the full-screen global loader ─────────────
// Keep this list SHORT. Only include flows where:
//   a) the user is waiting for something critical (OTP, payment)
//   b) there is no other inline loading indicator already on screen
// Everything else (products, cart, wishlist, profile, bag) must be SILENT.
const LOADING_WHITELIST = [
  '/user-auth/send-otp',
  '/user-auth/verify-otp',
  '/user-auth/google',
  '/orders/create-razorpay-order',
  '/orders/verify-payment',
]

export default defineNuxtPlugin(() => {
  const ui = useUIStore()
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const originalFetch = globalThis.$fetch
  if (!originalFetch) return

  const wrappedFetch = function (request: any, options: any = {}) {
    const urlStr = typeof request === 'string' ? request : (request?.url || '')

    // Only show loader if the URL matches the whitelist AND caller hasn't opted out
    const shouldLoad = !options.silent &&
      LOADING_WHITELIST.some(pattern => urlStr.includes(pattern))

    if (shouldLoad) {
      ui.incrementActiveRequests()
      return originalFetch(request, options)
        .then((res: any) => { ui.decrementActiveRequests(); return res })
        .catch((err: any) => { ui.decrementActiveRequests(); throw err })
    }

    return originalFetch(request, options)
  }

  // Copy all properties (like create, raw, native, etc.) from the original $fetch
  Object.assign(wrappedFetch, originalFetch)
  globalThis.$fetch = wrappedFetch as any
})
