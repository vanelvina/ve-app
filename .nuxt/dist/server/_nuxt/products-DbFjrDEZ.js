import { defineComponent, mergeProps, useSSRContext, computed } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { u as useCartStore } from "./cart-BC2fjYev.js";
import { u as useUIStore } from "./ui-De1hAQUT.js";
import { defineStore } from "pinia";
import { b as useRuntimeConfig } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppRating",
  __ssrInlineRender: true,
  props: {
    rating: {},
    count: { default: 0 },
    showCount: { type: Boolean, default: false },
    showValue: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flex items-center gap-0.5",
        "aria-label": `Rating: ${__props.rating} out of 5`,
        role: "img"
      }, _attrs))}><!--[-->`);
      ssrRenderList(5, (n) => {
        _push(`<svg class="${ssrRenderClass([n <= Math.round(__props.rating) ? "star-filled" : "star-empty", "w-3.5 h-3.5 flex-shrink-0"])}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`);
      });
      _push(`<!--]-->`);
      if (__props.showCount) {
        _push(`<span class="ml-1.5 text-xs text-mid-gray font-ui">(${ssrInterpolate(__props.count.toLocaleString("en-IN"))})</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showValue) {
        _push(`<span class="ml-1.5 text-xs font-semibold text-charcoal font-ui">${ssrInterpolate(__props.rating)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/atoms/AppRating.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
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
const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    items: []
  }),
  getters: {
    count: (state) => state.items.length,
    isWishlisted: (state) => (productId) => state.items.some((p) => p.id === productId),
    isEmpty: (state) => state.items.length === 0
  },
  actions: {
    toggle(product) {
      const idx = this.items.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        this.items.splice(idx, 1);
      } else {
        this.items.push(product);
      }
    },
    remove(productId) {
      this.items = this.items.filter((p) => p.id !== productId);
    },
    clear() {
      this.items = [];
    }
  }
});
const useProductsStore = defineStore("products", {
  state: () => ({
    all: [],
    recentlyViewed: [],
    loading: false,
    filters: {
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [0, 2e3],
      rating: null,
      inStock: false
    },
    sort: "popularity",
    page: 1,
    pageSize: 12
  }),
  getters: {
    filtered: (state) => {
      let result = [...state.all];
      if (state.filters.categories.length > 0) {
        result = result.filter((p) => state.filters.categories.includes(p.category));
      }
      if (state.filters.sizes.length > 0) {
        result = result.filter(
          (p) => p.variants.some((v) => v.sizes.some((s) => state.filters.sizes.includes(s)))
        );
      }
      if (state.filters.colors.length > 0) {
        result = result.filter(
          (p) => p.variants.some((v) => state.filters.colors.includes(v.color))
        );
      }
      result = result.filter(
        (p) => p.price >= state.filters.priceRange[0] && p.price <= state.filters.priceRange[1]
      );
      if (state.filters.rating !== null) {
        result = result.filter((p) => p.rating >= (state.filters.rating ?? 0));
      }
      if (state.filters.inStock) {
        result = result.filter((p) => p.inStock);
      }
      switch (state.sort) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          result = result.filter((p) => p.badge === "new").concat(result.filter((p) => p.badge !== "new"));
          break;
        case "discount":
          result.sort((a, b) => b.discount - a.discount);
          break;
        default:
          result.sort((a, b) => b.reviewCount - a.reviewCount);
      }
      return result;
    },
    paginated() {
      const start = (this.page - 1) * this.pageSize;
      return this.filtered.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.filtered.length / this.pageSize);
    },
    totalCount() {
      return this.filtered.length;
    },
    getBySlug: (state) => (slug) => state.all.find((p) => p.slug === slug),
    getByCategory: (state) => (category) => state.all.filter((p) => p.category.toLowerCase() === category.toLowerCase()),
    featured: (state) => state.all.filter((p) => p.badge === "bestseller").slice(0, 8),
    newArrivals: (state) => state.all.filter((p) => p.badge === "new").slice(0, 8),
    bestSellers: (state) => [...state.all].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8)
  },
  actions: {
    async fetchProducts() {
      this.loading = true;
      const config = useRuntimeConfig();
      try {
        const data = await $fetch(`${config.public.apiBase}/products`);
        this.all = data;
      } catch (error) {
        console.error("Failed to fetch products from API:", error);
      } finally {
        this.loading = false;
      }
    },
    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
      this.page = 1;
    },
    resetFilters() {
      this.filters = {
        categories: [],
        sizes: [],
        colors: [],
        priceRange: [0, 2e3],
        rating: null,
        inStock: false
      };
      this.page = 1;
    },
    setSort(sort) {
      this.sort = sort;
      this.page = 1;
    },
    setPage(page) {
      this.page = page;
    },
    addRecentlyViewed(product) {
      this.recentlyViewed = [
        product,
        ...this.recentlyViewed.filter((p) => p.id !== product.id)
      ].slice(0, 8);
    }
  }
});
export {
  _sfc_main as _,
  useCart as a,
  useWishlistStore as b,
  useProductsStore as u
};
//# sourceMappingURL=products-DbFjrDEZ.js.map
