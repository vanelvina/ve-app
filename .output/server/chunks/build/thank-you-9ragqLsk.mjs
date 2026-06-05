import { _ as __nuxt_component_1 } from './nuxt-link-CUeF3yRu.mjs';
import { _ as _sfc_main$1 } from './ProductCard-DbRZuopT.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { a as useRoute } from './server.mjs';
import { u as useUIStore } from './ui-De1hAQUT.mjs';
import { u as useProducts } from './useProducts-B0vDGKs3.mjs';
import { u as useSeoMeta } from './v3-Bm7UdMXu.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './products-Bors2uVq.mjs';
import 'pinia';
import './formatters-CRqlhyd1.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const customerName = "Priya";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "thank-you",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useUIStore();
    const { bestSellers } = useProducts();
    const orderId = computed(() => route.query.order || "VE000000000");
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1e3).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
    const recommended = computed(() => bestSellers.value.slice(0, 5));
    const timeline = [
      { icon: "\u2705", label: "Order Confirmed", desc: "Your payment has been received and order is confirmed." },
      { icon: "\u{1F4E6}", label: "Packing", desc: "Your items are being carefully packed with love." },
      { icon: "\u{1F69A}", label: "Shipped", desc: "Your order will be dispatched within 24 hours." },
      { icon: "\u{1F3E0}", label: "Delivered", desc: `Expected by ${deliveryDate}.` }
    ];
    useSeoMeta({
      title: "Order Confirmed \u2013 Van Elvina",
      description: "Your Van Elvina order has been confirmed. Thank you for shopping with us!",
      robots: "noindex"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_ProductCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-warm-ivory min-h-screen py-10" }, _attrs))}><div class="page-container max-w-2xl text-center"><div class="relative w-28 h-28 mx-auto mb-6"><div class="absolute inset-0 rounded-full bg-green-100 animate-pulse-soft"></div><div class="absolute inset-3 rounded-full bg-green-200"></div><div class="absolute inset-0 flex items-center justify-center text-5xl" aria-hidden="true">\u2705</div></div><h1 class="font-serif text-3xl md:text-4xl text-deep-plum font-bold mb-3">Order Confirmed!</h1><p class="text-mid-gray font-ui text-base mb-2"> Thank you for shopping with Van Elvina, <strong class="text-charcoal">${ssrInterpolate(customerName)}</strong>! \u{1F389} </p><p class="text-sm text-mid-gray font-ui mb-6"> Your order <span class="font-semibold text-charcoal">#${ssrInterpolate(unref(orderId))}</span> has been placed successfully. We&#39;ve sent a confirmation to your email. </p><div class="bg-white rounded-2xl shadow-soft border border-border-gray p-6 mb-6 text-left"><h2 class="font-ui font-semibold text-charcoal mb-4">Order Details</h2><div class="grid grid-cols-2 gap-y-3 text-sm font-ui"><span class="text-mid-gray">Order ID</span><span class="text-charcoal font-semibold">#${ssrInterpolate(unref(orderId))}</span><span class="text-mid-gray">Date</span><span class="text-charcoal">${ssrInterpolate(unref(today))}</span><span class="text-mid-gray">Est. Delivery</span><span class="text-charcoal">${ssrInterpolate(unref(deliveryDate))}</span><span class="text-mid-gray">Payment</span><span class="text-green-600 font-medium">Confirmed \u2713</span></div></div><div class="bg-white rounded-2xl shadow-soft border border-border-gray p-6 mb-8 text-left"><h2 class="font-ui font-semibold text-charcoal mb-4">What happens next?</h2><div class="relative space-y-4"><div class="absolute left-4 top-2 bottom-2 w-0.5 bg-border-gray" aria-hidden="true"></div><!--[-->`);
      ssrRenderList(timeline, (step, idx) => {
        _push(`<div class="relative flex items-start gap-4 pl-10"><div class="${ssrRenderClass([idx === 0 ? "bg-green-100 text-green-600" : "bg-light-gray text-mid-gray", "absolute left-0 w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"])}" aria-hidden="true">${ssrInterpolate(step.icon)}</div><div><p class="text-sm font-ui font-semibold text-charcoal">${ssrInterpolate(step.label)}</p><p class="text-xs text-mid-gray font-ui">${ssrInterpolate(step.desc)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="flex flex-col sm:flex-row gap-3 justify-center mb-10">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Continue Shopping`);
          } else {
            return [
              createTextVNode("Continue Shopping")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="btn-secondary">Track My Order</button></div><div class="text-left"><h2 class="font-serif text-2xl text-deep-plum font-semibold mb-4">You Might Also Like</h2><div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2"><!--[-->`);
      ssrRenderList(unref(recommended), (product) => {
        _push(`<div class="w-44 shrink-0">`);
        _push(ssrRenderComponent(_component_ProductCard, { product }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/thank-you.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=thank-you-9ragqLsk.mjs.map
