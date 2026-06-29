import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types'
import { useAuthStore } from '~/stores/auth'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    couponCode: '' as string,
    appliedDiscount: 0 as number,
    isOpen: false as boolean,
    loading: false as boolean
  }),

  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) =>
      state.items.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0),
    originalTotal: (state) =>
      state.items.reduce((sum, item) => sum + (item.product?.originalPrice ?? 0) * item.quantity, 0),
    totalSavings: (state): number => {
      const savingsOnItems = state.items.reduce(
        (sum, item) =>
          sum + ((item.product?.originalPrice ?? 0) - (item.product?.price ?? 0)) * item.quantity,
        0,
      )
      return savingsOnItems + state.appliedDiscount
    },
    shippingCost: (state) => {
      const subtotal = state.items.reduce(
        (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
        0,
      )
      if (state.items.length === 0) return 0
      if (subtotal >= 999) return 0
      
      const allFreeShipping = state.items.every(item => item.product?.isFreeShipping === true)
      return allFreeShipping ? 0 : 79
    },
    grandTotal(): number {
      return this.subtotal - this.appliedDiscount + this.shippingCost
    },
    isEmpty: (state) => state.items.length === 0,
    findItem: (state) => (productId: string, color: string, size: string) =>
      state.items.find(
        (i) => i.productId === productId && i.variantColor === color && i.size === size,
      ),
  },

  actions: {
    async fetchCart() {
      const auth = useAuthStore()
      if (!auth.isLoggedIn || !auth.token) {
        if (import.meta.client) {
          try {
            const stored = localStorage.getItem('ve_guest_cart')
            if (stored) this.items = JSON.parse(stored)
          } catch (err) { }
        }
        return
      }

      this.loading = true
      const config = useRuntimeConfig()
      try {
        const data = await $fetch<any[]>(`${config.public.apiBase}/cart`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        })
        
        this.items = data
          .filter(item => item.productId) // Ensure product exists
          .map(item => ({
            productId: item.productId._id || item.productId.id,
            variantColor: item.color,
            size: item.size,
            quantity: item.quantity,
            product: {
              ...item.productId,
              id: item.productId._id || item.productId.id
            }
          }))
      } catch (err) {
        console.error('Failed to fetch cart from server:', err)
      } finally {
        this.loading = false
      }
    },

    async syncCart() {
      const auth = useAuthStore()
      if (!auth.isLoggedIn || !auth.token) {
        if (import.meta.client) {
          localStorage.setItem('ve_guest_cart', JSON.stringify(this.items))
        }
        return
      }

      const config = useRuntimeConfig()
      try {
        await $fetch<any>(`${config.public.apiBase}/cart`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${auth.token}` },
          body: { items: this.items }
        })
      } catch (err) {
        console.error('Failed to sync cart with server:', err)
      }
    },

    async addItem(product: Product, variantColor: string, size: string, quantity = 1) {
      const existing = this.findItem(product.id || (product as any)._id, variantColor, size)
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, 10)
      } else {
        this.items.push({
          productId: product.id || (product as any)._id,
          variantColor,
          size,
          quantity,
          product,
        })
      }
      
      // Track add to cart event
      trackAddToCart(
        product.id || (product as any)._id,
        product.name,
        product.price,
        variantColor,
        size,
        quantity
      )

      await this.syncCart()
    },

    async removeItem(productId: string, variantColor: string, size: string) {
      this.items = this.items.filter(
        (i) => !(i.productId === productId && i.variantColor === variantColor && i.size === size),
      )
      await this.syncCart()
    },

    async updateQuantity(productId: string, variantColor: string, size: string, quantity: number) {
      const item = this.findItem(productId, variantColor, size)
      if (item) {
        if (quantity <= 0) {
          await this.removeItem(productId, variantColor, size)
        } else {
          item.quantity = Math.min(quantity, 10)
          await this.syncCart()
        }
      }
    },

    async syncCartAfterLogin() {
      const auth = useAuthStore()
      if (!auth.isLoggedIn || !auth.token) return

      const config = useRuntimeConfig()
      try {
        // If there are guest items, post them to merge/save on server
        if (this.items.length > 0) {
          // Get server items first to merge without duplicates
          const serverData = await $fetch<any[]>(`${config.public.apiBase}/cart`, {
            headers: { Authorization: `Bearer ${auth.token}` }
          })
          
          // Merge local and server items
          for (const item of serverData) {
            const serverPId = item.productId?._id || item.productId?.id || item.productId
            if (!serverPId) continue
            const existing = this.items.find(
              (i) => i.productId === serverPId && i.variantColor === (item.color || item.variantColor) && i.size === item.size
            )
            if (existing) {
              existing.quantity = Math.min(existing.quantity + item.quantity, 10)
            } else {
              this.items.push({
                productId: serverPId,
                variantColor: item.color || item.variantColor,
                size: item.size,
                quantity: item.quantity,
                product: item.productId ? {
                  ...item.productId,
                  id: serverPId
                } : undefined
              })
            }
          }
          await this.syncCart()
        }
        if (import.meta.client) {
          localStorage.removeItem('ve_guest_cart')
        }
        await this.fetchCart()
      } catch (err) {
        console.error('Error syncing local cart to server:', err)
      }
    },

    applyCoupon(code: string): { success: boolean; message: string } {
      const coupons: Record<string, number> = {
        ELVINA10: 0.1,
        WELCOME20: 0.2,
        COMFORT15: 0.15,
        FIRST30: 0.3,
      }
      const upper = code.toUpperCase()
      if (coupons[upper]) {
        this.couponCode = upper
        this.appliedDiscount = Math.round(this.subtotal * coupons[upper])
        return { success: true, message: `Coupon applied! You saved ₹${this.appliedDiscount}` }
      }
      return { success: false, message: 'Invalid coupon code. Try ELVINA10 or WELCOME20.' }
    },

    removeCoupon() {
      this.couponCode = ''
      this.appliedDiscount = 0
    },

    async clearCart() {
      this.items = []
      this.couponCode = ''
      this.appliedDiscount = 0
      await this.syncCart()
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },
  },
})
