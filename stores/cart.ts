import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types'
import { useAuthStore } from '~/stores/auth'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    couponCode: '' as string,
    appliedDiscount: 0 as number,
    isOpen: false as boolean,
    loading: false as boolean,
    giftWrap: false as boolean
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

      const hasTestProduct = state.items.some((item) =>
        item.product?.name?.toLowerCase().includes('test'),
      )

      if (subtotal >= 499 || hasTestProduct) return 0

      return 40
    },
    giftWrapCost: (state) => state.giftWrap ? 59 : 0,
    grandTotal(): number {
      return this.subtotal - this.appliedDiscount + this.shippingCost + this.giftWrapCost
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
          headers: { Authorization: `Bearer ${auth.token}` },
          silent: this.items.length > 0
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
          body: { items: this.items },
          silent: true
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
            headers: { Authorization: `Bearer ${auth.token}` },
            silent: true
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

    async applyCoupon(code: string): Promise<{ success: boolean; message: string }> {
      const upper = code.toUpperCase().trim()

      if (this.items.length === 0) return { success: false, message: 'Your bag is empty.' }

      const maxPrice = Math.max(...this.items.map(item => item.product?.price ?? 0))

      // ── Loyalty coupon definitions ────────────────────────────────────────
      const loyaltyCoupons: Record<string, { discount: number; requiredDelivered: number }> = {
        WELCOME10:      { discount: 0.1, requiredDelivered: 0 },
        ELVINAROYAL20:  { discount: 0.2, requiredDelivered: 1 },
        ELVINAROYAL30:  { discount: 0.3, requiredDelivered: 2 },
        ELVINAROYAL40:  { discount: 0.4, requiredDelivered: 3 },
        ELVINAROYAL50:  { discount: 0.5, requiredDelivered: 4 },
      }

      if (loyaltyCoupons[upper]) {
        const auth = useAuthStore()
        if (!auth.isLoggedIn) {
          return { success: false, message: 'Please log in to use loyalty coupons.' }
        }
        try {
          const orders = await auth.fetchMyOrders()
          const ordersList: any[] = Array.isArray(orders) ? orders : []

          // Exclude cancelled orders from all checks
          const nonCancelled = ordersList.filter((o: any) =>
            o.orderStatus !== 'cancelled' && o.status !== 'cancelled'
          )
          const delivered = ordersList.filter((o: any) =>
            o.orderStatus === 'delivered' || o.status === 'delivered'
          )
          const deliveredCount = delivered.length

          // ── Single-use enforcement: find the specific order it was used in ──
          const usedInOrder = nonCancelled.find((o: any) =>
            (o.couponCode || o.coupon_code || '').toUpperCase() === upper
          )
          if (usedInOrder) {
            const orderId = usedInOrder.orderId || usedInOrder._id || 'a previous order'
            return {
              success: false,
              message: `Coupon ${upper} was already used in Order #${orderId}. Each coupon can only be used once.`
            }
          }

          // ── WELCOME10: only for absolute first order ──────────────────────
          if (upper === 'WELCOME10' && nonCancelled.length > 0) {
            return { success: false, message: 'WELCOME10 is valid only for your very first order.' }
          }

          // ── Tier unlock check ─────────────────────────────────────────────
          const required = loyaltyCoupons[upper].requiredDelivered
          if (deliveredCount < required) {
            const needed = required - deliveredCount
            const ordinal = (n: number) => ['1st','2nd','3rd','4th'][n - 1] || `${n}th`
            return {
              success: false,
              message: `${upper} unlocks after your ${ordinal(required)} delivered order. You need ${needed} more delivered order${needed > 1 ? 's' : ''}.`
            }
          }

          this.couponCode = upper
          this.appliedDiscount = Math.round(maxPrice * loyaltyCoupons[upper].discount)
          return {
            success: true,
            message: `${upper} applied! You saved ₹${this.appliedDiscount} on the highest-priced item.`
          }

        } catch (err) {
          return { success: false, message: 'Could not validate coupon. Please try again.' }
        }
      }

      // ── Dynamic (admin-created) coupons ───────────────────────────────────
      const config = useRuntimeConfig()
      const auth = useAuthStore()
      let dynamicDiscountRate = 0
      let dynamicWidget: any = null

      try {
        const widgets = await $fetch<any[]>(`${config.public.apiBase}/widgets`)
        const cw = (widgets || []).find(
          (w: any) => w.type === 'coupon' && w.enabled && w.title.toUpperCase() === upper
        )
        if (cw) {
          // Check date-based expiry (expiresAt field set by admin)
          if (cw.expiresAt && new Date(cw.expiresAt) < new Date()) {
            const expiredDate = new Date(cw.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
            return { success: false, message: `Coupon ${upper} expired on ${expiredDate} and is no longer valid.` }
          }
          const discountVal = cw.items !== undefined && cw.items !== null
            ? Number(cw.items)
            : (cw.subtitle ? parseFloat(cw.subtitle) : 0)
          dynamicDiscountRate = discountVal > 1 ? discountVal / 100 : discountVal
          dynamicWidget = cw
        }
      } catch (err) {
        console.error('Failed to load dynamic coupons:', err)
      }

      if (dynamicDiscountRate > 0) {
        // Single-use check for dynamic coupons (if user is logged in)
        if (auth.isLoggedIn) {
          try {
            const orders = await auth.fetchMyOrders()
            const ordersList: any[] = Array.isArray(orders) ? orders : []
            const nonCancelled = ordersList.filter((o: any) =>
              o.orderStatus !== 'cancelled' && o.status !== 'cancelled'
            )
            const usedInOrder = nonCancelled.find((o: any) =>
              (o.couponCode || o.coupon_code || '').toUpperCase() === upper
            )
            if (usedInOrder) {
              const orderId = usedInOrder.orderId || usedInOrder._id || 'a previous order'
              return {
                success: false,
                message: `Coupon ${upper} was already used in Order #${orderId}. Each coupon can only be used once.`
              }
            }
          } catch (_) { /* proceed if order fetch fails */ }
        }

        this.couponCode = upper
        this.appliedDiscount = Math.round(maxPrice * dynamicDiscountRate)
        return {
          success: true,
          message: `${upper} applied! You saved ₹${this.appliedDiscount} on the highest-priced item.`
        }
      }

      return { success: false, message: `"${upper}" is not a valid coupon code.` }
    },

    removeCoupon() {
      this.couponCode = ''
      this.appliedDiscount = 0
    },

    async clearCart() {
      this.items = []
      this.couponCode = ''
      this.appliedDiscount = 0
      this.giftWrap = false
      await this.syncCart()
    },

    setGiftWrap(val: boolean) {
      this.giftWrap = val
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },
  },
})
