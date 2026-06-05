import { defineStore } from 'pinia'
import type { Product } from '~/types'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as Product[],
  }),

  getters: {
    count: (state) => state.items.length,
    isWishlisted: (state) => (productId: string) => state.items.some((p) => p.id === productId),
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    toggle(product: Product) {
      const idx = this.items.findIndex((p) => p.id === product.id)
      if (idx !== -1) {
        this.items.splice(idx, 1)
      } else {
        this.items.push(product)
      }
    },
    remove(productId: string) {
      this.items = this.items.filter((p) => p.id !== productId)
    },
    clear() {
      this.items = []
    },
  },
})
