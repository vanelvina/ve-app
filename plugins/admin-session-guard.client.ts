// plugins/admin-session-guard.client.ts
// Globally intercepts $fetch responses for admin pages.
// If a 401 or 403 comes back while the admin is on /admin/* routes,
// it clears their session and redirects to /admin/login.

export default defineNuxtPlugin(() => {
  const adminStore = useAdminStore()
  const router = useRouter()

  // Only activate on admin routes
  const isAdminRoute = () =>
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin/')

  // Attach a global $fetch response interceptor
  // Nuxt's useFetch/ofetch supports onResponseError hooks
  const { hook } = useNuxtApp()

  hook('app:error', (error: any) => {
    if (!isAdminRoute()) return
    const status = error?.statusCode || error?.response?.status || error?.status
    if ((status === 401 || status === 403) && adminStore.isAuthenticated) {
      console.warn('[AdminGuard] Unauthorized response detected — redirecting to login')
      adminStore.handleUnauthorized()
    }
  })
})
