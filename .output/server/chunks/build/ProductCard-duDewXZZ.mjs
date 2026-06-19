import { _ as __nuxt_component_1 } from './nuxt-link-D2oXBkcL.mjs';
import { a as useCart, _ as _sfc_main$1, b as useWishlistStore } from './products-DbFjrDEZ.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { f as formatPrice } from './cart-BC2fjYev.mjs';
import { u as useUIStore } from './ui-De1hAQUT.mjs';

const useWishlist = () => {
  const wishlist = useWishlistStore();
  const ui = useUIStore();
  const toggle = (product) => {
    const wasWishlisted = wishlist.isWishlisted(product.id);
    wishlist.toggle(product);
    ui.addToast(
      wasWishlisted ? "info" : "success",
      wasWishlisted ? `Removed from wishlist` : `Added to wishlist \u2661`
    );
  };
  return {
    items: computed(() => wishlist.items),
    count: computed(() => wishlist.count),
    isEmpty: computed(() => wishlist.isEmpty),
    isWishlisted: (productId) => wishlist.isWishlisted(productId),
    toggle,
    remove: (productId) => wishlist.remove(productId)
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const props = __props;
    useUIStore();
    useCart();
    const { isWishlisted: isWishlistedFn } = useWishlist();
    const isWishlisted = computed(() => isWishlistedFn(props.product.id));
    const primaryImage = computed(
      () => {
        var _a;
        return ((_a = props.product.variants[0]) == null ? void 0 : _a.images[0]) || "https://via.placeholder.com/300x400?text=Van+Elvina";
      }
    );
    const secondaryImage = computed(() => {
      var _a;
      return ((_a = props.product.variants[0]) == null ? void 0 : _a.images[1]) || null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_AppRating = _sfc_main$1;
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: "group relative card cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-premium transition-shadow duration-300 border border-rose-blush/20",
        "aria-label": __props.product.name
      }, _attrs))}><div class="relative overflow-hidden aspect-product bg-warm-ivory">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.product.slug}`,
        class: "block h-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(primaryImage))}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" loading="lazy" width="300" height="400"${_scopeId}>`);
            if (unref(secondaryImage)) {
              _push2(`<img${ssrRenderAttr("src", unref(secondaryImage))}${ssrRenderAttr("alt", `${__props.product.name} alternate view`)} class="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100" loading="lazy" width="300" height="400"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("img", {
                src: unref(primaryImage),
                alt: __props.product.name,
                class: "w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105",
                loading: "lazy",
                width: "300",
                height: "400"
              }, null, 8, ["src", "alt"]),
              unref(secondaryImage) ? (openBlock(), createBlock("img", {
                key: 0,
                src: unref(secondaryImage),
                alt: `${__props.product.name} alternate view`,
                class: "absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100",
                loading: "lazy",
                width: "300",
                height: "400"
              }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="absolute top-2.5 left-2.5 z-10">`);
      if (__props.product.badge) {
        _push(`<span class="${ssrRenderClass([__props.product.badge === "bestseller" ? "bg-amber-500" : __props.product.badge === "new" ? "bg-deep-plum" : "bg-dusty-rose", "px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-white shadow-soft"])}">${ssrInterpolate(__props.product.badge === "bestseller" ? "Best Seller" : __props.product.badge)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.product.discount > 0) {
        _push(`<div class="absolute top-2.5 right-2.5 z-10 bg-red-500 text-white text-[10px] font-ui font-bold px-2 py-0.5 rounded shadow-soft">${ssrInterpolate(__props.product.discount)}% OFF </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="${ssrRenderClass([{ "!text-red-500": unref(isWishlisted) }, "wishlist-btn text-charcoal/60 hover:text-red-500 hover:bg-red-50"])}"${ssrRenderAttr("aria-label", unref(isWishlisted) ? "Remove from wishlist" : "Add to wishlist")}${ssrRenderAttr("aria-pressed", unref(isWishlisted))}><svg class="w-4 h-4"${ssrRenderAttr("fill", unref(isWishlisted) ? "currentColor" : "none")} stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></button><div class="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-all duration-300 hidden md:block border-t border-rose-blush/20"><p class="text-[9px] text-charcoal/50 font-bold uppercase tracking-wider text-center mb-1.5">Quick Add Size</p><div class="flex flex-wrap gap-1 justify-center"><!--[-->`);
      ssrRenderList(((_a = __props.product.variants[0]) == null ? void 0 : _a.sizes) || [], (size) => {
        _push(`<button class="px-2.5 py-1 text-[10px] font-bold border border-rose-blush hover:border-deep-plum hover:bg-deep-plum hover:text-white rounded-md transition-all cursor-pointer text-charcoal">${ssrInterpolate(size)}</button>`);
      });
      _push(`<!--]--></div></div></div><div class="p-3 md:p-4 flex flex-col flex-1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.product.slug}`,
        class: "flex-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-[10px] text-dusty-rose font-ui font-semibold uppercase tracking-wider mb-1"${_scopeId}>${ssrInterpolate(__props.product.category)}</p><h3 class="font-sans font-semibold text-charcoal text-xs sm:text-sm leading-snug line-clamp-2 hover:text-deep-plum transition-colors mb-2"${_scopeId}>${ssrInterpolate(__props.product.name)}</h3>`);
          } else {
            return [
              createVNode("p", { class: "text-[10px] text-dusty-rose font-ui font-semibold uppercase tracking-wider mb-1" }, toDisplayString(__props.product.category), 1),
              createVNode("h3", { class: "font-sans font-semibold text-charcoal text-xs sm:text-sm leading-snug line-clamp-2 hover:text-deep-plum transition-colors mb-2" }, toDisplayString(__props.product.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-2 mb-2">`);
      _push(ssrRenderComponent(_component_AppRating, {
        rating: __props.product.rating,
        count: __props.product.reviewCount,
        "show-count": ""
      }, null, _parent));
      _push(`</div><div class="flex items-baseline gap-2 flex-wrap"><span class="font-sans font-bold text-deep-plum text-sm sm:text-base">${ssrInterpolate(unref(formatPrice)(__props.product.price))}</span>`);
      if (__props.product.originalPrice > __props.product.price) {
        _push(`<span class="text-[11px] text-mid-gray line-through font-ui">${ssrInterpolate(unref(formatPrice)(__props.product.originalPrice))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-1.5 mt-3"><!--[-->`);
      ssrRenderList(__props.product.variants.slice(0, 4), (variant) => {
        _push(`<div class="w-3.5 h-3.5 rounded-full border border-charcoal/15 shadow-sm transition-transform hover:scale-110 cursor-pointer" style="${ssrRenderStyle({ backgroundColor: variant.colorHex })}"${ssrRenderAttr("title", variant.color)}></div>`);
      });
      _push(`<!--]-->`);
      if (__props.product.variants.length > 4) {
        _push(`<span class="text-[10px] text-mid-gray font-ui"> +${ssrInterpolate(__props.product.variants.length - 4)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="mt-3 w-full py-2.5 rounded-lg bg-rose-blush text-deep-plum text-xs font-ui font-semibold hover:bg-deep-plum hover:text-white transition-all duration-250 md:hidden"${ssrRenderAttr("aria-label", `Add ${__props.product.name} to cart`)}> Add to Cart </button></div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/molecules/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ProductCard-duDewXZZ.mjs.map
