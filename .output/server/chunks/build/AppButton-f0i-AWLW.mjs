import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppSpinner",
  __ssrInlineRender: true,
  props: {
    size: { default: "md" }
  },
  setup(__props) {
    const props = __props;
    const sizeClass = computed(() => {
      switch (props.size) {
        case "sm":
          return "w-3 h-3";
        case "lg":
          return "w-8 h-8";
        default:
          return "w-5 h-5";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        class: ["animate-spin", unref(sizeClass)],
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, _attrs))}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/atoms/AppSpinner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppButton",
  __ssrInlineRender: true,
  props: {
    id: {},
    label: {},
    variant: { default: "primary" },
    size: { default: "md" },
    type: { default: "button" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    full: { type: Boolean, default: false },
    ariaLabel: {}
  },
  setup(__props) {
    const props = __props;
    const baseClasses = computed(
      () => [
        "inline-flex items-center justify-center gap-2 font-ui font-medium tracking-wide rounded-lg",
        "transition-all duration-250 cursor-pointer select-none active:scale-[0.98]",
        props.full ? "w-full" : ""
      ].join(" ")
    );
    const variantClasses = computed(() => {
      switch (props.variant) {
        case "secondary":
          return "bg-white text-deep-plum border-2 border-deep-plum hover:bg-rose-blush";
        case "ghost":
          return "text-charcoal hover:text-deep-plum hover:bg-rose-blush";
        case "danger":
          return "bg-red-500 text-white hover:bg-red-600";
        case "gold":
          return "bg-gradient-gold text-white hover:opacity-90 shadow-sm";
        default:
          return "bg-deep-plum text-white hover:bg-plum-800 shadow-sm";
      }
    });
    const sizeClasses = computed(() => {
      switch (props.size) {
        case "sm":
          return "px-4 py-1.5 text-xs";
        case "lg":
          return "px-8 py-3.5 text-base";
        case "xl":
          return "px-10 py-4 text-base";
        default:
          return "px-6 py-2.5 text-sm";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppSpinner = _sfc_main$1;
      _push(`<button${ssrRenderAttrs(mergeProps({
        id: __props.id,
        type: __props.type,
        disabled: __props.disabled || __props.loading,
        class: [[unref(baseClasses), unref(variantClasses), unref(sizeClasses), { "opacity-60 cursor-not-allowed": __props.disabled || __props.loading }], "no-tap-highlight"],
        "aria-label": __props.ariaLabel || __props.label
      }, _ctx.$attrs, _attrs))}>`);
      if (__props.loading) {
        _push(ssrRenderComponent(_component_AppSpinner, { class: "w-4 h-4" }, null, _parent));
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(__props.label)}`);
        }, _push, _parent);
      }
      _push(`</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/atoms/AppButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AppButton-f0i-AWLW.mjs.map
