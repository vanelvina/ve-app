// middleware/auth-redirect.ts
// Route guard: if a non-logged-in user lands directly on /checkout,
// redirect them to /bag and open the auth modal pointing back to /checkout.
// This completely eliminates the "homepage flash" bug.

export default defineNuxtRouteMiddleware((to) => {
  // Only run on the client (auth state lives in localStorage)
  if (import.meta.server) return

  const auth = useAuthStore()
  auth.init()

  if (!auth.isLoggedIn) {
    const ui = useUIStore()
    // Schedule modal open after navigation completes
    nextTick(() => {
      ui.openAuthModal('/checkout')
    })
    return navigateTo('/bag')
  }
})
