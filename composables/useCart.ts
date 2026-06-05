import { useCartStore } from '~/stores/cart'
import { useUIStore } from '~/stores/ui'
import type { Product } from '~/types'

export const useCart = () => {
  const cart = useCartStore()
  const ui = useUIStore()

  const addToCart = (product: Product, color: string, size: string, qty = 1) => {
    cart.addItem(product, color, size, qty)
    ui.addToast('success', `${product.name} added to cart!`)
  }

  const removeFromCart = (productId: string, color: string, size: string) => {
    cart.removeItem(productId, color, size)
  }

  const updateQty = (productId: string, color: string, size: string, qty: number) => {
    cart.updateQuantity(productId, color, size, qty)
  }

  const applyCoupon = (code: string) => {
    const result = cart.applyCoupon(code)
    ui.addToast(result.success ? 'success' : 'error', result.message)
    return result
  }

  return {
    items: computed(() => cart.items),
    count: computed(() => cart.itemCount),
    subtotal: computed(() => cart.subtotal),
    totalSavings: computed(() => cart.totalSavings),
    shippingCost: computed(() => cart.shippingCost),
    grandTotal: computed(() => cart.grandTotal),
    couponCode: computed(() => cart.couponCode),
    appliedDiscount: computed(() => cart.appliedDiscount),
    isEmpty: computed(() => cart.isEmpty),
    isOpen: computed(() => cart.isOpen),
    addToCart,
    removeFromCart,
    updateQty,
    applyCoupon,
    removeCoupon: () => cart.removeCoupon(),
    clearCart: () => cart.clearCart(),
    toggleCart: () => cart.toggleCart(),
  }
}
