import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    return new Promise((resolve) => {
      let resolved = false

      const doResolve = (pos: any) => {
        if (resolved) return
        resolved = true
        resolve(pos)
      }

      // Check if scrolling to a hash anchor
      if (to.hash) {
        doResolve({
          el: to.hash,
          behavior: 'smooth',
        })
        return
      }

      // Wait for page transition to finish before restoring scroll position
      nuxtApp.hooks.hookOnce('page:transition:finish', () => {
        setTimeout(() => {
          doResolve(savedPosition ? { ...savedPosition, behavior: 'auto' } : { top: 0, behavior: 'auto' })
        }, 50)
      })

      // Fallback timer if hook doesn't fire (e.g. transition is disabled or skipped)
      setTimeout(() => {
        doResolve(savedPosition ? { ...savedPosition, behavior: 'auto' } : { top: 0, behavior: 'auto' })
      }, 400)
    })
  }
}
