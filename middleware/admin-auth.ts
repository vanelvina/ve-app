// middleware/admin-auth.ts
// Client-side route guard to ensure the admin is logged in and verified before accessing admin portal dashboards.
export default defineNuxtRouteMiddleware(async (to) => {
  // Admin pages are client-only. Skip entirely on server.
  if (import.meta.server) return

  const adminStore = useAdminStore()
  adminStore.init()

  // If no token at all, redirect to login
  if (!adminStore.isAuthenticated) {
    return navigateTo('/admin/login')
  }

  // If adminUser was restored from localStorage in init(), allow through immediately.
  // If not (e.g. first login before ve_admin_user was stored), verify with backend.
  if (!adminStore.adminUser) {
    try {
      const valid = await adminStore.checkAuth()
      if (!valid) {
        // checkAuth already calls handleUnauthorized() on 401/403
        // which clears credentials and navigates to /admin/login
        return navigateTo('/admin/login')
      }
    } catch (e) {
      // Network/server error — don't block access if token exists
      console.warn('Admin session check failed (network error), allowing access with stored token:', e)
    }
  }
})
