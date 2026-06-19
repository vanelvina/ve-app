import { defineStore } from 'file://C:/Projects/Website/ve-app/node_modules/pinia/dist/pinia.prod.cjs';

const formatPrice = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};
const isValidPincode = (pincode) => {
  return /^[1-9][0-9]{5}$/.test(pincode);
};
const generateOrderId = () => {
  const prefix = "VE";
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1e3).toString().padStart(3, "0");
  return `${prefix}${timestamp}${random}`;
};
const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    couponCode: "",
    appliedDiscount: 0,
    isOpen: false
  }),
  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    originalTotal: (state) => state.items.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0),
    totalSavings: (state) => {
      const savingsOnItems = state.items.reduce(
        (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
        0
      );
      return savingsOnItems + state.appliedDiscount;
    },
    shippingCost: (state) => {
      const subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return subtotal >= 999 ? 0 : 79;
    },
    grandTotal() {
      return this.subtotal - this.appliedDiscount + this.shippingCost;
    },
    isEmpty: (state) => state.items.length === 0,
    findItem: (state) => (productId, color, size) => state.items.find(
      (i) => i.productId === productId && i.variantColor === color && i.size === size
    )
  },
  actions: {
    addItem(product, variantColor, size, quantity = 1) {
      const existing = this.findItem(product.id, variantColor, size);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, 10);
      } else {
        this.items.push({
          productId: product.id,
          variantColor,
          size,
          quantity,
          product
        });
      }
    },
    removeItem(productId, variantColor, size) {
      this.items = this.items.filter(
        (i) => !(i.productId === productId && i.variantColor === variantColor && i.size === size)
      );
    },
    updateQuantity(productId, variantColor, size, quantity) {
      const item = this.findItem(productId, variantColor, size);
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId, variantColor, size);
        } else {
          item.quantity = Math.min(quantity, 10);
        }
      }
    },
    applyCoupon(code) {
      const coupons = {
        ELVINA10: 0.1,
        WELCOME20: 0.2,
        COMFORT15: 0.15,
        FIRST30: 0.3
      };
      const upper = code.toUpperCase();
      if (coupons[upper]) {
        this.couponCode = upper;
        this.appliedDiscount = Math.round(this.subtotal * coupons[upper]);
        return { success: true, message: `Coupon applied! You saved \u20B9${this.appliedDiscount}` };
      }
      return { success: false, message: "Invalid coupon code. Try ELVINA10 or WELCOME20." };
    },
    removeCoupon() {
      this.couponCode = "";
      this.appliedDiscount = 0;
    },
    clearCart() {
      this.items = [];
      this.couponCode = "";
      this.appliedDiscount = 0;
    },
    toggleCart() {
      this.isOpen = !this.isOpen;
    }
  }
});

export { formatDate as a, formatPrice as f, generateOrderId as g, isValidPincode as i, useCartStore as u };
//# sourceMappingURL=cart-BC2fjYev.mjs.map
