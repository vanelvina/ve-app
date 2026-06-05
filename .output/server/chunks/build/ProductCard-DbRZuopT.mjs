import { _ as __nuxt_component_1 } from './nuxt-link-CUeF3yRu.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2, b as useWishlistStore } from './products-Bors2uVq.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { f as formatPrice } from './formatters-CRqlhyd1.mjs';
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
      const _component_NuxtLink = __nuxt_component_1;
      const _component_AppBadge = _sfc_main$1;
      const _component_AppRating = _sfc_main$2;
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: "group relative card cursor-pointer",
        "aria-label": __props.product.name
      }, _attrs))}><div class="relative overflow-hidden aspect-product bg-light-gray">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.product.slug}`,
        class: "block h-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(primaryImage))}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy" width="300" height="400"${_scopeId}>`);
            if (unref(secondaryImage)) {
              _push2(`<img${ssrRenderAttr("src", unref(secondaryImage))}${ssrRenderAttr("alt", `${__props.product.name} alternate view`)} class="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" loading="lazy" width="300" height="400"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("img", {
                src: unref(primaryImage),
                alt: __props.product.name,
                class: "w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105",
                loading: "lazy",
                width: "300",
                height: "400"
              }, null, 8, ["src", "alt"]),
              unref(secondaryImage) ? (openBlock(), createBlock("img", {
                key: 0,
                src: unref(secondaryImage),
                alt: `${__props.product.name} alternate view`,
                class: "absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100",
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
        _push(ssrRenderComponent(_component_AppBadge, {
          variant: __props.product.badge,
          label: __props.product.badge === "bestseller" ? "Best Seller" : __props.product.badge
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.product.discount > 0) {
        _push(`<div class="absolute top-2.5 right-2.5 z-10 bg-red-500 text-white text-[10px] font-ui font-bold px-2 py-0.5 rounded">${ssrInterpolate(__props.product.discount)}% OFF </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="${ssrRenderClass([{ "text-dusty-rose": unref(isWishlisted) }, "wishlist-btn"])}"${ssrRenderAttr("aria-label", unref(isWishlisted) ? "Remove from wishlist" : "Add to wishlist")}${ssrRenderAttr("aria-pressed", unref(isWishlisted))}><svg class="w-4 h-4"${ssrRenderAttr("fill", unref(isWishlisted) ? "currentColor" : "none")} stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></button><div class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block"><button class="w-full py-2.5 bg-deep-plum/90 backdrop-blur-sm text-white text-xs font-ui font-medium hover:bg-deep-plum transition-colors"${ssrRenderAttr("aria-label", `Quick view ${__props.product.name}`)}> Quick View </button></div></div><div class="p-3 md:p-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.product.slug}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-[11px] text-dusty-rose font-ui font-medium uppercase tracking-wider mb-1"${_scopeId}>${ssrInterpolate(__props.product.category)}</p><h3 class="font-sans font-medium text-charcoal text-sm leading-snug line-clamp-2 hover:text-deep-plum transition-colors mb-2"${_scopeId}>${ssrInterpolate(__props.product.name)}</h3>`);
          } else {
            return [
              createVNode("p", { class: "text-[11px] text-dusty-rose font-ui font-medium uppercase tracking-wider mb-1" }, toDisplayString(__props.product.category), 1),
              createVNode("h3", { class: "font-sans font-medium text-charcoal text-sm leading-snug line-clamp-2 hover:text-deep-plum transition-colors mb-2" }, toDisplayString(__props.product.name), 1)
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
      _push(`</div><div class="flex items-center gap-2 flex-wrap"><span class="font-sans font-semibold text-charcoal text-base">${ssrInterpolate(unref(formatPrice)(__props.product.price))}</span>`);
      if (__props.product.originalPrice > __props.product.price) {
        _push(`<span class="text-xs text-mid-gray line-through font-ui">${ssrInterpolate(unref(formatPrice)(__props.product.originalPrice))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-1.5 mt-2"><!--[-->`);
      ssrRenderList(__props.product.variants.slice(0, 4), (variant) => {
        _push(`<button class="w-4 h-4 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110 cursor-pointer" style="${ssrRenderStyle({ backgroundColor: variant.colorHex })}"${ssrRenderAttr("aria-label", variant.color)}${ssrRenderAttr("title", variant.color)}></button>`);
      });
      _push(`<!--]-->`);
      if (__props.product.variants.length > 4) {
        _push(`<span class="text-xs text-mid-gray font-ui"> +${ssrInterpolate(__props.product.variants.length - 4)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="mt-3 w-full py-2 rounded-lg bg-rose-blush text-deep-plum text-xs font-ui font-semibold hover:bg-deep-plum hover:text-white transition-all duration-250 md:hidden"${ssrRenderAttr("aria-label", `Add ${__props.product.name} to cart`)}> Add to Cart </button></div></article>`);
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
//# sourceMappingURL=ProductCard-DbRZuopT.mjs.map
