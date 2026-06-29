import { defineStore } from 'pinia'
import type { Product } from '~/types'
import { useAuthStore } from '~/stores/auth'
import { useUIStore } from '~/stores/ui'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as Product[],
    loading: false
  }),

  getters: {
    count: (state) => state.items.length,
    isWishlisted: (state) => (productId: string) => {
      if (!productId) return false
      return state.items.some((p) => p.id === productId || (p as any)._id === productId)
    },
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    async fetchWishlist() {
      const auth = useAuthStore()
      if (!auth.isLoggedIn || !auth.token) {
        if (import.meta.client) {
          try {
            const stored = localStorage.getItem('ve_guest_wishlist')
            if (stored) this.items = JSON.parse(stored)
          } catch (err) { }
        }
        return
      }

      this.loading = true
      const config = useRuntimeConfig()
      try {
        const data = await $fetch<any[]>(`${config.public.apiBase}/wishlist`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        })
        
        this.items = data.map(item => ({
          ...item,
          id: item._id || item.id
        }))
      } catch (err: any) {
        console.error('Failed to fetch backend wishlist:', err)
      } finally {
        this.loading = false
      }
    },

    async toggle(product: Product) {
      const auth = useAuthStore()
      const ui = useUIStore()
      const pId = product.id || (product as any)._id

      if (auth.isLoggedIn && auth.token) {
        const config = useRuntimeConfig()
        try {
          const res = await $fetch<any>(`${config.public.apiBase}/wishlist/toggle`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${auth.token}` },
            body: { productId: pId }
          })
          
          if (res.action === 'added') {
            this.items.push({ ...product, id: pId })
            ui.addToast('success', `Added to wishlist ♡`)
          } else {
            this.items = this.items.filter((p) => (p.id || (p as any)._id) !== pId)
            ui.addToast('info', `Removed from wishlist`)
          }
        } catch (err: any) {
          console.error('Failed to toggle wishlist item on server:', err)
          ui.addToast('error', 'Could not update wishlist on server')
        }
      } else {
        const idx = this.items.findIndex((p) => (p.id || (p as any)._id) === pId)
        if (idx !== -1) {
          this.items.splice(idx, 1)
          ui.addToast('info', `Removed from wishlist`)
        } else {
          this.items.push(product)
          ui.addToast('success', `Added to wishlist ♡`)
        }
        if (import.meta.client) {
          localStorage.setItem('ve_guest_wishlist', JSON.stringify(this.items))
        }
      }
    },

    async remove(productId: string) {
      const auth = useAuthStore()
      const ui = useUIStore()
      const targetId = productId

      if (auth.isLoggedIn && auth.token) {
        const config = useRuntimeConfig()
        try {
          await $fetch<any>(`${config.public.apiBase}/wishlist/toggle`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${auth.token}` },
            body: { productId: targetId }
          })
          this.items = this.items.filter((p) => (p.id || (p as any)._id) !== targetId)
          ui.addToast('info', `Removed from wishlist`)
        } catch (err: any) {
          console.error('Failed to remove wishlist item from server:', err)
          ui.addToast('error', 'Could not remove wishlist item')
        }
      } else {
        this.items = this.items.filter((p) => (p.id || (p as any)._id) !== targetId)
        ui.addToast('info', `Removed from wishlist`)
        if (import.meta.client) {
          localStorage.setItem('ve_guest_wishlist', JSON.stringify(this.items))
        }
      }
    },

    async syncWishlistAfterLogin() {
      const auth = useAuthStore()
      if (!auth.isLoggedIn || !auth.token || this.items.length === 0) return

      const config = useRuntimeConfig()
      try {
        const productIds = this.items.map(item => item.id || (item as any)._id).filter(Boolean)
        await $fetch<any>(`${config.public.apiBase}/wishlist/merge`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${auth.token}` },
          body: { productIds }
        })
        if (import.meta.client) {
          localStorage.removeItem('ve_guest_wishlist')
        }
        await this.fetchWishlist()
      } catch (err) {
        console.error('Error syncing local wishlist items to server:', err)
      }
    },

    clear() {
      this.items = []
    },
  },
})
