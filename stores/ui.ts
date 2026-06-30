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
    activeRequests: 0,
  }),

  getters: {
    apiLoading: (state) => state.activeRequests > 0,
  },

  actions: {
    incrementActiveRequests() { this.activeRequests++ },
    decrementActiveRequests() {
      if (this.activeRequests > 0) this.activeRequests--
    },
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

    openAuthModal(redirectPath: any = null) {
      this.authModalOpen = true
      if (redirectPath && typeof redirectPath === 'string') {
        this.authRedirect = redirectPath
      } else if (import.meta.client && !this.authRedirect) {
        const currentPath = window.location.pathname + window.location.search
        if (!currentPath.includes('/auth/')) {
          this.authRedirect = currentPath
        } else {
          this.authRedirect = '/'
        }
      }
    },
    closeAuthModal() {
      this.authModalOpen = false
      this.authRedirect = null
    },

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

