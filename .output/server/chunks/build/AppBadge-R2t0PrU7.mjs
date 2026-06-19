import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';

const baseClasses = "inline-flex items-center text-[10px] font-ui font-semibold px-2 py-0.5 rounded uppercase tracking-wider";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppBadge",
  __ssrInlineRender: true,
  props: {
    label: {},
    variant: { default: "default" }
  },
  setup(__props) {
    const props = __props;
    const variantClasses = computed(() => {
      switch (props.variant) {
        case "sale":
          return "bg-red-500 text-white";
        case "new":
          return "bg-deep-plum text-white";
        case "bestseller":
          return "bg-soft-gold text-white";
        case "trending":
          return "bg-dusty-rose text-white";
        default:
          return "bg-charcoal text-white";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: [baseClasses, unref(variantClasses)],
        role: "status",
        "aria-label": __props.label
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(__props.label)}`);
      }, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/atoms/AppBadge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AppBadge-R2t0PrU7.mjs.map
