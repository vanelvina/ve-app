import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import type { Product, FilterState, SortOption } from '~/types'

export const useProductsStore = defineStore('products', {
  state: () => ({
    all: shallowRef<Product[]>([]),
    recentlyViewed: [] as Product[],
    loading: false,
    filters: {
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [0, 2000] as [number, number],
      rating: null,
      inStock: false,
    } as FilterState,
    sort: 'popularity' as SortOption,
    page: 1,
    pageSize: 12,
  }),

  getters: {
    filtered: (state): Product[] => {
      let result = [...state.all]

      // Category filter
      if (state.filters.categories.length > 0) {
        result = result.filter((p) => {
          const productCats = (p.category || '').split(',').map(s => s.trim().toLowerCase())
          return state.filters.categories.some(c => productCats.includes(c.toLowerCase()))
        })
      }

      // Size filter
      if (state.filters.sizes.length > 0) {
        result = result.filter((p) =>
          p.variants.some((v) => v.sizes.some((s) => state.filters.sizes.includes(s))),
        )
      }

      // Color filter
      if (state.filters.colors.length > 0) {
        result = result.filter((p) =>
          p.variants.some((v) => state.filters.colors.includes(v.color)),
        )
      }

      // Price range
      result = result.filter(
        (p) =>
          p.price >= state.filters.priceRange[0] && p.price <= state.filters.priceRange[1],
      )

      // Rating
      if (state.filters.rating !== null) {
        result = result.filter((p) => p.rating >= (state.filters.rating ?? 0))
      }

      // In stock
      if (state.filters.inStock) {
        result = result.filter((p) => p.inStock)
      }

      // Sort
      switch (state.sort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          result.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          result.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          result = result.filter((p) => p.badge === 'new').concat(result.filter((p) => p.badge !== 'new'))
          break
        case 'discount':
          result.sort((a, b) => b.discount - a.discount)
          break
        default:
          result.sort((a, b) => b.reviewCount - a.reviewCount)
      }

      return result
    },

    paginated(): Product[] {
      const start = (this.page - 1) * this.pageSize
      return this.filtered.slice(start, start + this.pageSize)
    },

    totalPages(): number {
      return Math.ceil(this.filtered.length / this.pageSize)
    },

    totalCount(): number {
      return this.filtered.length
    },

    infiniteCycleBase(): Product[] {
      const allProducts = this.all
      const filteredProducts = this.filtered // Tier 1: exact matches
      
      const addedIds = new Set(filteredProducts.map(p => p.id))
      const result = [...filteredProducts]
      
      // Tier 2: Same Categories (ignore size/color filters)
      if (this.filters.categories.length > 0) {
        const sameCatProducts = allProducts.filter(p => {
          if (addedIds.has(p.id)) return false
          const productCats = (p.category || '').split(',').map(s => s.trim().toLowerCase())
          return this.filters.categories.some(c => productCats.includes(c.toLowerCase()))
        })
        sameCatProducts.forEach(p => {
          result.push(p)
          addedIds.add(p.id)
        })
      }
      
      // Tier 3: Same Subcategories (based on products found so far)
      const activeSubcats = new Set<string>()
      result.forEach(p => {
        if (p.subcategory) {
          activeSubcats.add(p.subcategory.toLowerCase())
        }
      })
      if (activeSubcats.size > 0) {
        const sameSubcatProducts = allProducts.filter(p => {
          if (addedIds.has(p.id)) return false
          if (!p.subcategory) return false
          return activeSubcats.has(p.subcategory.toLowerCase())
        })
        sameSubcatProducts.forEach(p => {
          result.push(p)
          addedIds.add(p.id)
        })
      }
      
      // Tier 4: All remaining products
      allProducts.forEach(p => {
        if (!addedIds.has(p.id)) {
          result.push(p)
          addedIds.add(p.id)
        }
      })
      
      return result
    },

    getBySlug: (state) => (slug: string) => state.all.find((p) => p.slug === slug),

    getByCategory: (state) => (category: string) =>
      state.all.filter((p) => p.category.toLowerCase() === category.toLowerCase()),

    featured: (state) => state.all.filter((p) => p.badge === 'bestseller').slice(0, 8),
    newArrivals: (state) => state.all.filter((p) => p.badge === 'new').slice(0, 8),
    bestSellers: (state) =>
      [...state.all].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8),
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      const config = useRuntimeConfig()
      try {
        const data = await $fetch<Product[]>(`${config.public.apiBase}/products`, {
          silent: this.all.length > 0
        })
        this.all = data
      } catch (error) {
        console.error('Failed to fetch products from API:', error)
      } finally {
        this.loading = false
      }
    },
    setFilters(filters: Partial<FilterState>) {
      this.filters = { ...this.filters, ...filters }
      this.page = 1
    },
    resetFilters() {
      this.filters = {
        categories: [],
        sizes: [],
        colors: [],
        priceRange: [0, 2000],
        rating: null,
        inStock: false,
      }
      this.page = 1
    },
    setSort(sort: SortOption) {
      this.sort = sort
      this.page = 1
    },
    setPage(page: number) {
      this.page = page
    },
    addRecentlyViewed(product: Product) {
      this.recentlyViewed = [
        product,
        ...this.recentlyViewed.filter((p) => p.id !== product.id),
      ].slice(0, 8)
    },
  },
})
