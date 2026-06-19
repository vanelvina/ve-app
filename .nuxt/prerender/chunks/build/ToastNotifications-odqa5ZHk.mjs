import { defineComponent, unref, useSSRContext } from 'file://C:/Projects/Website/ve-app/node_modules/vue/index.mjs';
import { ssrRenderTeleport, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'file://C:/Projects/Website/ve-app/node_modules/vue/server-renderer/index.mjs';
import { u as useUIStore } from './ui-De1hAQUT.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ToastNotifications",
  __ssrInlineRender: true,
  setup(__props) {
    const ui = useUIStore();
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none" aria-live="polite" aria-label="Notifications" data-v-476f2638><!--[-->`);
        ssrRenderList(unref(ui).toasts, (toast) => {
          _push2(`<div class="pointer-events-auto flex items-start gap-3 min-w-[280px] max-w-xs bg-white rounded-xl shadow-modal border border-border-gray px-4 py-3" role="alert"${ssrRenderAttr("aria-label", toast.message)} data-v-476f2638><span class="text-lg shrink-0 mt-0.5" aria-hidden="true" data-v-476f2638>${ssrInterpolate(toast.type === "success" ? "\u2705" : toast.type === "error" ? "\u274C" : "\u2139\uFE0F")}</span><p class="text-sm font-ui text-charcoal flex-1 leading-snug" data-v-476f2638>${ssrInterpolate(toast.message)}</p><button class="text-mid-gray hover:text-charcoal shrink-0"${ssrRenderAttr("aria-label", `Dismiss: ${toast.message}`)} data-v-476f2638><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-476f2638><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-476f2638></path></svg></button></div>`);
        });
        _push2(`<!--]--></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/ToastNotifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-476f2638"]]);

export { __nuxt_component_6 as _ };
//# sourceMappingURL=ToastNotifications-odqa5ZHk.mjs.map
