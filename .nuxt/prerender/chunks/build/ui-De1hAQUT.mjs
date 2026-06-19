import { defineStore } from 'file://C:/Projects/Website/ve-app/node_modules/pinia/dist/pinia.prod.cjs';

const useUIStore = defineStore("ui", {
  state: () => ({
    mobileMenuOpen: false,
    searchOverlayOpen: false,
    quickViewProductSlug: null,
    sizeGuideOpen: false,
    filterDrawerOpen: false,
    toasts: []
  }),
  actions: {
    openMobileMenu() {
      this.mobileMenuOpen = true;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    openSearch() {
      this.searchOverlayOpen = true;
    },
    closeSearch() {
      this.searchOverlayOpen = false;
    },
    openQuickView(slug) {
      this.quickViewProductSlug = slug;
    },
    closeQuickView() {
      this.quickViewProductSlug = null;
    },
    openSizeGuide() {
      this.sizeGuideOpen = true;
    },
    closeSizeGuide() {
      this.sizeGuideOpen = false;
    },
    openFilterDrawer() {
      this.filterDrawerOpen = true;
    },
    closeFilterDrawer() {
      this.filterDrawerOpen = false;
    },
    toggleFilterDrawer() {
      this.filterDrawerOpen = !this.filterDrawerOpen;
    },
    addToast(type, message) {
      const id = Date.now().toString();
      this.toasts.push({ id, type, message });
      setTimeout(() => this.removeToast(id), 3500);
    },
    removeToast(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    }
  }
});

export { useUIStore as u };
//# sourceMappingURL=ui-De1hAQUT.mjs.map
