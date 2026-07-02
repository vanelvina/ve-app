import { defineNuxtPlugin } from '#app'
import { useUIStore } from '~/stores/ui'

export default defineNuxtPlugin((nuxtApp) => {
  const ui = useUIStore()
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const originalFetch = globalThis.$fetch
  if (originalFetch) {
    const wrappedFetch = function (request: any, options: any = {}) {
      const urlStr = typeof request === 'string' ? request : (request?.url || '')
      const isApiRequest = !options.silent && (urlStr.includes(apiBase) || 
                            urlStr.startsWith('/api') || 
                            urlStr.includes('/user-auth') || 
                            urlStr.includes('/orders') || 
                            urlStr.includes('/cart') || 
                            urlStr.includes('/wishlist'))

      if (isApiRequest) {
        ui.incrementActiveRequests()
        return originalFetch(request, options)
          .then((res) => {
            ui.decrementActiveRequests()
            return res
          })
          .catch((err) => {
            ui.decrementActiveRequests()
            throw err
          })
      } else {
        return originalFetch(request, options)
      }
    }
    // Copy all properties (like create, raw, native, etc.) from the original $fetch
    Object.assign(wrappedFetch, originalFetch)
    globalThis.$fetch = wrappedFetch as any
  }
})
