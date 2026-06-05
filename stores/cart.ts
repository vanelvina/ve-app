import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    couponCode: '' as string,
    appliedDiscount: 0 as number,
    isOpen: false as boolean,
  }),

  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) =>
      state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    originalTotal: (state) =>
      state.items.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0),
    totalSavings: (state): number => {
      const savingsOnItems = state.items.reduce(
        (sum, item) =>
          sum + (item.product.originalPrice - item.product.price) * item.quantity,
        0,
      )
      return savingsOnItems + state.appliedDiscount
    },
    shippingCost: (state) => {
      const subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      )
      return subtotal >= 999 ? 0 : 79
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
    addItem(product: Product, variantColor: string, size: string, quantity = 1) {
      const existing = this.findItem(product.id, variantColor, size)
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, 10)
      } else {
        this.items.push({
          productId: product.id,
          variantColor,
          size,
          quantity,
          product,
        })
      }
    },

    removeItem(productId: string, variantColor: string, size: string) {
      this.items = this.items.filter(
        (i) => !(i.productId === productId && i.variantColor === variantColor && i.size === size),
      )
    },

    updateQuantity(productId: string, variantColor: string, size: string, quantity: number) {
      const item = this.findItem(productId, variantColor, size)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId, variantColor, size)
        } else {
          item.quantity = Math.min(quantity, 10)
        }
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

    clearCart() {
      this.items = []
      this.couponCode = ''
      this.appliedDiscount = 0
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },
  },
})
