import { _ as __nuxt_component_1 } from './nuxt-link-D2oXBkcL.mjs';
import { _ as __nuxt_component_6 } from './ToastNotifications-odqa5ZHk.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'file://C:/Projects/Website/ve-app/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'file://C:/Projects/Website/ve-app/node_modules/vue/server-renderer/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/ufo/dist/index.mjs';
import './server.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/destr/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/hookable/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Projects/Website/ve-app/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/Projects/Website/ve-app/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/ohash/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/klona/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/defu/dist/defu.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/scule/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Projects/Website/ve-app/node_modules/pathe/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/unhead/dist/server.mjs';
import 'node:async_hooks';
import 'file://C:/Projects/Website/ve-app/node_modules/devalue/index.js';
import 'file://C:/Projects/Website/ve-app/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/unhead/dist/utils.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/unctx/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/pinia/dist/pinia.prod.cjs';
import 'file://C:/Projects/Website/ve-app/node_modules/vue-router/vue-router.node.mjs';
import './ui-De1hAQUT.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_ToastNotifications = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-warm-ivory" }, _attrs))}><header class="bg-white border-b border-border-gray shadow-soft"><div class="page-container h-14 flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "font-serif text-xl text-deep-plum font-semibold tracking-wide"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Van Elvina `);
          } else {
            return [
              createTextVNode(" Van Elvina ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-2 text-xs text-mid-gray font-ui"><svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg><span>100% Secure Checkout</span></div></div></header><main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-white border-t border-border-gray py-6 text-center"><p class="text-xs text-mid-gray font-ui"> \xA9 2025 Van Elvina. All rights reserved. `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy-policy",
        class: "hover:text-deep-plum ml-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "hover:text-deep-plum ml-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms &amp; Conditions`);
          } else {
            return [
              createTextVNode("Terms & Conditions")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></footer>`);
      _push(ssrRenderComponent(_component_ToastNotifications, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-Dg75qWQY.mjs.map
