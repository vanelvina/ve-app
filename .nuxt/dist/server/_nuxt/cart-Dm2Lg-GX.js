import { _ as __nuxt_component_1 } from "./nuxt-link-D2oXBkcL.js";
import { _ as _sfc_main$1 } from "./AppButton-f0i-AWLW.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { u as useCartStore, f as formatPrice } from "./cart-BC2fjYev.js";
import "C:/Projects/Website/ve-app/node_modules/hookable/dist/index.mjs";
import { u as useUIStore } from "./ui-De1hAQUT.js";
import { u as useSeoMeta } from "./v3-B1OjdVjd.js";
import "C:/Projects/Website/ve-app/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "C:/Projects/Website/ve-app/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Projects/Website/ve-app/node_modules/unctx/dist/index.mjs";
import "C:/Projects/Website/ve-app/node_modules/h3/dist/index.mjs";
import "pinia";
import "C:/Projects/Website/ve-app/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "C:/Projects/Website/ve-app/node_modules/klona/dist/index.mjs";
import "C:/Projects/Website/ve-app/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const cart = useCartStore();
    const ui = useUIStore();
    const couponInput = ref("");
    const applyCoupon = () => {
      if (!couponInput.value.trim()) return;
      const result = cart.applyCoupon(couponInput.value.trim());
      ui.addToast(result.success ? "success" : "error", result.message);
      if (result.success) couponInput.value = "";
    };
    useSeoMeta({
      title: "Shopping Cart – Van Elvina",
      description: "Review your cart and proceed to checkout. Free shipping on orders above ₹999."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_AppButton = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-warm-ivory min-h-screen" }, _attrs))}><div class="page-container py-8"><h1 class="font-serif text-2xl text-deep-plum font-bold mb-6">Shopping Cart <span class="text-base font-ui font-normal text-mid-gray ml-2">(${ssrInterpolate(unref(cart).count)} items)</span></h1>`);
      if (unref(cart).isEmpty) {
        _push(`<div class="text-center py-20"><div class="text-7xl mb-4" aria-hidden="true">🛍️</div><h2 class="font-serif text-2xl text-deep-plum mb-2">Your cart is empty</h2><p class="text-mid-gray font-ui text-sm mb-8">Looks like you haven&#39;t added anything yet. Let&#39;s fix that!</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Start Shopping`);
            } else {
              return [
                createTextVNode("Start Shopping")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-4"><!--[-->`);
        ssrRenderList(unref(cart).items, (item) => {
          _push(`<article class="bg-white rounded-2xl shadow-soft border border-border-gray p-4 flex gap-4"${ssrRenderAttr("aria-label", item.product.name)}>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${item.product.slug}`,
            class: "shrink-0"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", item.product.variants.find((v) => v.color === item.variantColor)?.images[0] ?? item.product.variants[0]?.images[0])}${ssrRenderAttr("alt", item.product.name)} class="w-24 h-28 object-cover rounded-xl" width="96" height="112" loading="lazy"${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: item.product.variants.find((v) => v.color === item.variantColor)?.images[0] ?? item.product.variants[0]?.images[0],
                    alt: item.product.name,
                    class: "w-24 h-28 object-cover rounded-xl",
                    width: "96",
                    height: "112",
                    loading: "lazy"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="flex-1 min-w-0"><div class="flex items-start justify-between gap-2"><div><p class="text-xs text-dusty-rose font-ui font-medium mb-0.5">${ssrInterpolate(item.product.category)}</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${item.product.slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<h3 class="font-sans font-medium text-charcoal text-sm leading-snug hover:text-deep-plum transition-colors"${_scopeId}>${ssrInterpolate(item.product.name)}</h3>`);
              } else {
                return [
                  createVNode("h3", { class: "font-sans font-medium text-charcoal text-sm leading-snug hover:text-deep-plum transition-colors" }, toDisplayString(item.product.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<p class="text-xs text-mid-gray font-ui mt-1">Color: ${ssrInterpolate(item.variantColor)} · Size: ${ssrInterpolate(item.size)}</p></div><button class="text-mid-gray hover:text-red-500 transition-colors shrink-0"${ssrRenderAttr("aria-label", `Remove ${item.product.name} from cart`)}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="mt-3 flex items-center justify-between"><div class="flex items-center gap-2"><button class="qty-btn"${ssrRenderAttr("aria-label", `Decrease quantity of ${item.product.name}`)}>−</button><span class="w-8 text-center font-ui font-semibold text-sm text-charcoal" aria-live="polite">${ssrInterpolate(item.quantity)}</span><button class="qty-btn"${ssrRenderAttr("aria-label", `Increase quantity of ${item.product.name}`)}>+</button></div><div class="text-right"><p class="font-sans font-semibold text-charcoal">${ssrInterpolate(unref(formatPrice)(item.product.price * item.quantity))}</p>`);
          if (item.quantity > 1) {
            _push(`<p class="text-xs text-mid-gray font-ui">${ssrInterpolate(unref(formatPrice)(item.product.price))} each</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></article>`);
        });
        _push(`<!--]--><div class="pt-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn-ghost text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Continue Shopping `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                  })
                ])),
                createTextVNode(" Continue Shopping ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="lg:col-span-1"><div class="bg-white rounded-2xl shadow-soft border border-border-gray p-6 sticky top-24 space-y-4"><h2 class="font-ui font-semibold text-charcoal text-base">Order Summary</h2><div><p class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-2">Coupon Code</p>`);
        if (!unref(cart).couponCode) {
          _push(`<div class="flex gap-2"><input${ssrRenderAttr("value", unref(couponInput))} type="text" placeholder="e.g. ELVINA10" class="input-base flex-1" aria-label="Coupon code">`);
          _push(ssrRenderComponent(_component_AppButton, {
            size: "sm",
            variant: "secondary",
            onClick: applyCoupon
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Apply`);
              } else {
                return [
                  createTextVNode("Apply")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2"><span class="text-sm font-ui font-semibold text-green-700">${ssrInterpolate(unref(cart).couponCode)} applied ✓</span><button class="text-xs text-mid-gray hover:text-red-500">Remove</button></div>`);
        }
        _push(`</div><div class="space-y-2.5 py-4 border-t border-border-gray"><div class="flex justify-between text-sm font-ui text-charcoal"><span>Subtotal (${ssrInterpolate(unref(cart).count)} items)</span><span>${ssrInterpolate(unref(formatPrice)(unref(cart).subtotal))}</span></div>`);
        if (unref(cart).appliedDiscount > 0) {
          _push(`<div class="flex justify-between text-sm font-ui text-green-600"><span>Coupon Discount</span><span>−${ssrInterpolate(unref(formatPrice)(unref(cart).appliedDiscount))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-between text-sm font-ui text-charcoal"><span>Shipping</span><span class="${ssrRenderClass(unref(cart).shippingCost === 0 ? "text-green-600 font-medium" : "")}">${ssrInterpolate(unref(cart).shippingCost === 0 ? "FREE" : unref(formatPrice)(unref(cart).shippingCost))}</span></div>`);
        if (unref(cart).shippingCost > 0) {
          _push(`<p class="text-xs text-mid-gray font-ui"> Add ${ssrInterpolate(unref(formatPrice)(999 - unref(cart).subtotal))} more for free shipping </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex justify-between items-center py-3 border-t border-charcoal"><span class="font-ui font-bold text-charcoal">Total</span><span class="font-sans font-bold text-xl text-charcoal">${ssrInterpolate(unref(formatPrice)(unref(cart).grandTotal))}</span></div><p class="text-xs text-green-600 font-ui -mt-1">You save ${ssrInterpolate(unref(formatPrice)(unref(cart).totalSavings))} on this order</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/checkout",
          class: "btn-primary w-full text-center block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Proceed to Checkout `);
            } else {
              return [
                createTextVNode(" Proceed to Checkout ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex items-center justify-center gap-4 pt-2"><!--[-->`);
        ssrRenderList(["🔒 Secure", "↩️ Easy Returns", "🚚 Fast Delivery"], (badge) => {
          _push(`<div class="text-[10px] text-mid-gray font-ui">${ssrInterpolate(badge)}</div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=cart-Dm2Lg-GX.js.map
