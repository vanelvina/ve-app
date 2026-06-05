import { u as useCartStore } from './cart-ZOlaOW26.mjs';
import { u as useUIStore } from './ui-De1hAQUT.mjs';
import { computed } from 'file://C:/Project/Van%20Elvina/van-elvina/node_modules/vue/index.mjs';

const useCart = () => {
  const cart = useCartStore();
  const ui = useUIStore();
  const addToCart = (product, color, size, qty = 1) => {
    cart.addItem(product, color, size, qty);
    ui.addToast("success", `${product.name} added to cart!`);
  };
  const removeFromCart = (productId, color, size) => {
    cart.removeItem(productId, color, size);
  };
  const updateQty = (productId, color, size, qty) => {
    cart.updateQuantity(productId, color, size, qty);
  };
  const applyCoupon = (code) => {
    const result = cart.applyCoupon(code);
    ui.addToast(result.success ? "success" : "error", result.message);
    return result;
  };
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
    toggleCart: () => cart.toggleCart()
  };
};

export { useCart as u };
//# sourceMappingURL=useCart-B731HVld.mjs.map
