import { _ as _sfc_main$1 } from "./AppButton-f0i-AWLW.js";
import { _ as __nuxt_component_1 } from "./nuxt-link-D2oXBkcL.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { u as useAdminStore } from "./admin-Cv882IlH.js";
import { u as useUIStore } from "./ui-De1hAQUT.js";
import "C:/Projects/Website/ve-app/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "C:/Projects/Website/ve-app/node_modules/ufo/dist/index.mjs";
import "C:/Projects/Website/ve-app/node_modules/defu/dist/defu.mjs";
import "pinia";
import "C:/Projects/Website/ve-app/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Projects/Website/ve-app/node_modules/unctx/dist/index.mjs";
import "C:/Projects/Website/ve-app/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Projects/Website/ve-app/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAdminStore();
    useUIStore();
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const errorMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppButton = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-warm-ivory relative overflow-hidden" }, _attrs))}><div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-rose-blush/20 blur-3xl"></div><div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-deep-plum/5 blur-3xl"></div><div class="max-w-md w-full space-y-8 relative z-10"><div class="text-center"><h1 class="font-serif text-4xl text-deep-plum font-bold tracking-tight">Van Elvina</h1><p class="mt-2 text-sm text-charcoal/70 font-ui uppercase tracking-wider">Admin Portal</p></div><div class="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-card border border-rose-blush/30"><form class="space-y-6">`);
      if (unref(errorMsg)) {
        _push(`<div class="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2 font-ui"><span>⚠️</span><span>${ssrInterpolate(unref(errorMsg))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-4"><div><label for="username" class="block text-xs font-ui font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5">Username</label><input id="username"${ssrRenderAttr("value", unref(username))} type="text" required class="w-full px-4 py-2.5 bg-white border border-rose-blush/40 text-charcoal text-sm rounded-lg focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum transition-all" placeholder="Enter username"></div><div><label for="password" class="block text-xs font-ui font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5">Password</label><input id="password"${ssrRenderAttr("value", unref(password))} type="password" required class="w-full px-4 py-2.5 bg-white border border-rose-blush/40 text-charcoal text-sm rounded-lg focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum transition-all" placeholder="••••••••"></div></div><div>`);
      _push(ssrRenderComponent(_component_AppButton, {
        type: "submit",
        full: "",
        loading: unref(loading),
        class: "w-full py-3 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-sm font-semibold tracking-wide shadow-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign In `);
          } else {
            return [
              createTextVNode(" Sign In ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div><div class="text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xs text-dusty-rose hover:underline font-ui font-medium flex items-center justify-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Return to Storefront `);
          } else {
            return [
              createTextVNode(" ← Return to Storefront ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-Dr1xYFwv.js.map
