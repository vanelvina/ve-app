import { u as useProductsStore } from './products-Bors2uVq.mjs';
import { computed } from 'file://C:/Project/Van%20Elvina/van-elvina/node_modules/vue/index.mjs';

const useProducts = () => {
  const store = useProductsStore();
  const searchProducts = (query) => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return store.all.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
    ).slice(0, 10);
  };
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
    getBySlug: (slug) => store.getBySlug(slug),
    getByCategory: (cat) => store.getByCategory(cat),
    setFilters: (filters) => store.setFilters(filters),
    resetFilters: () => store.resetFilters(),
    setSort: (sort) => store.setSort(sort),
    setPage: (page) => store.setPage(page),
    searchProducts,
    addRecentlyViewed: (product) => store.addRecentlyViewed(product)
  };
};

export { useProducts as u };
//# sourceMappingURL=useProducts-B0vDGKs3.mjs.map
