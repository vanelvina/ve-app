import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    mobileMenuOpen: false,
    searchOverlayOpen: false,
    quickViewProductSlug: null as string | null,
    sizeGuideOpen: false,
    filterDrawerOpen: false,
    profileDrawerOpen: false,
    authModalOpen: false,
    authRedirect: null as string | null,
    toasts: [] as Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>,
  }),

  actions: {
    setAuthRedirect(path: string | null) { this.authRedirect = path },
    openMobileMenu() { this.mobileMenuOpen = true },
    closeMobileMenu() { this.mobileMenuOpen = false },
    toggleMobileMenu() { this.mobileMenuOpen = !this.mobileMenuOpen },

    openSearch() { this.searchOverlayOpen = true },
    closeSearch() { this.searchOverlayOpen = false },

    openQuickView(slug: string) { this.quickViewProductSlug = slug },
    closeQuickView() { this.quickViewProductSlug = null },

    openSizeGuide() { this.sizeGuideOpen = true },
    closeSizeGuide() { this.sizeGuideOpen = false },

    openFilterDrawer() { this.filterDrawerOpen = true },
    closeFilterDrawer() { this.filterDrawerOpen = false },
    toggleFilterDrawer() { this.filterDrawerOpen = !this.filterDrawerOpen },

    openProfileDrawer() { this.profileDrawerOpen = true },
    closeProfileDrawer() { this.profileDrawerOpen = false },
    toggleProfileDrawer() { this.profileDrawerOpen = !this.profileDrawerOpen },

    openAuthModal(redirectPath: string | null = null) {
      this.authModalOpen = true
      if (redirectPath) {
        this.authRedirect = redirectPath
      } else if (import.meta.client) {
        const currentPath = window.location.pathname + window.location.search
        if (!this.authRedirect && !currentPath.includes('/auth/')) {
          this.authRedirect = currentPath
        }
      }
    },
    closeAuthModal() { this.authModalOpen = false },

    addToast(type: 'success' | 'error' | 'info', message: string) {
      const id = Date.now().toString()
      this.toasts.push({ id, type, message })
      setTimeout(() => this.removeToast(id), 3500)
    },
    removeToast(id: string) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
  },
})

