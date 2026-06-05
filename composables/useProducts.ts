import { useProductsStore } from '~/stores/products'
import type { Product, FilterState, SortOption } from '~/types'

export const useProducts = () => {
  const store = useProductsStore()

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return store.all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    ).slice(0, 10)
  }

  // Fetch products if they aren't loaded yet
  if (import.meta.client && store.all.length === 0 && !store.loading) {
    store.fetchProducts()
  }

  return {
    all: computed(() => store.all),
    filtered: computed(() => store.filtered),
    paginated: computed(() => store.paginated),
    featured: computed(() => store.featured),
    newArrivals: computed(() => store.newArrivals),
    bestSellers: computed(() => store.bestSellers),
    totalCount: computed(() => store.totalCount),
    totalPages: computed(() => store.totalPages),
    currentPage: computed(() => store.page),
    currentSort: computed(() => store.sort),
    currentFilters: computed(() => store.filters),
    loading: computed(() => store.loading),
    recentlyViewed: computed(() => store.recentlyViewed),
    fetchProducts: () => store.fetchProducts(),
    getBySlug: (slug: string) => store.getBySlug(slug),
    getByCategory: (cat: string) => store.getByCategory(cat),
    setFilters: (filters: Partial<FilterState>) => store.setFilters(filters),
    resetFilters: () => store.resetFilters(),
    setSort: (sort: SortOption) => store.setSort(sort),
    setPage: (page: number) => store.setPage(page),
    searchProducts,
    addRecentlyViewed: (product: Product) => store.addRecentlyViewed(product),
  }
}
