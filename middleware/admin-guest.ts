// middleware/admin-guest.ts
// Client-side route guard to redirect logged in admins away from the login page to the dashboard.
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const adminStore = useAdminStore()
  adminStore.init()

  if (adminStore.isAuthenticated && adminStore.adminUser) {
    return navigateTo('/admin/dashboard')
  }
})
