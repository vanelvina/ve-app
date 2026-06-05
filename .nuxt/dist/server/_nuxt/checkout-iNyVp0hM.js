import { defineComponent, computed, mergeProps, unref, useSSRContext, ref, reactive, withCtx, createTextVNode, isRef, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./AppButton-f0i-AWLW.js";
import { f as formatPrice, g as generateOrderId } from "./formatters-CRqlhyd1.js";
import "C:/Project/Van Elvina/van-elvina/node_modules/hookable/dist/index.mjs";
import { u as useRouter } from "../server.mjs";
import { u as useCartStore } from "./cart-ZOlaOW26.js";
import { u as useUIStore } from "./ui-De1hAQUT.js";
import { u as useSeoMeta } from "./v3-Bm7UdMXu.js";
import "C:/Project/Van Elvina/van-elvina/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Project/Van Elvina/van-elvina/node_modules/unctx/dist/index.mjs";
import "C:/Project/Van Elvina/van-elvina/node_modules/h3/dist/index.mjs";
import "pinia";
import "C:/Project/Van Elvina/van-elvina/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "C:/Project/Van Elvina/van-elvina/node_modules/ufo/dist/index.mjs";
import "C:/Project/Van Elvina/van-elvina/node_modules/klona/dist/index.mjs";
import "C:/Project/Van Elvina/van-elvina/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    type: { default: "text" },
    placeholder: {},
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    error: {},
    hint: {},
    maxlength: {},
    id: {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2, 7)}`);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", unref(inputId))} class="block text-sm font-ui font-medium text-charcoal mb-1.5">${ssrInterpolate(__props.label)} `);
        if (__props.required) {
          _push(`<span class="text-dusty-rose ml-0.5">*</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative">`);
      if (_ctx.$slots.prefix) {
        _push(`<span class="absolute left-3 top-1/2 -translate-y-1/2 text-mid-gray" aria-hidden="true">`);
        ssrRenderSlot(_ctx.$slots, "prefix", {}, null, _push, _parent);
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttrs(mergeProps({ id: unref(inputId) }, _ctx.$attrs, {
        type: __props.type,
        value: __props.modelValue,
        placeholder: __props.placeholder,
        disabled: __props.disabled,
        required: __props.required,
        maxlength: __props.maxlength,
        class: [
          "input-base",
          _ctx.$slots.prefix ? "pl-10" : "",
          _ctx.$slots.suffix ? "pr-10" : "",
          __props.error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "",
          __props.disabled ? "opacity-60 cursor-not-allowed bg-light-gray" : ""
        ],
        "aria-invalid": !!__props.error,
        "aria-describedby": __props.error ? `${unref(inputId)}-error` : void 0
      }))}>`);
      if (_ctx.$slots.suffix) {
        _push(`<span class="absolute right-3 top-1/2 -translate-y-1/2 text-mid-gray" aria-hidden="true">`);
        ssrRenderSlot(_ctx.$slots, "suffix", {}, null, _push, _parent);
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.error) {
        _push(`<p${ssrRenderAttr("id", `${unref(inputId)}-error`)} class="mt-1 text-xs text-red-500 font-ui" role="alert">${ssrInterpolate(__props.error)}</p>`);
      } else if (__props.hint) {
        _push(`<p class="mt-1 text-xs text-mid-gray font-ui">${ssrInterpolate(__props.hint)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/atoms/AppInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const cart = useCartStore();
    useUIStore();
    const currentStep = ref(0);
    const steps = ["Address", "Shipping", "Payment"];
    const placing = ref(false);
    const selectedShipping = ref("standard");
    const selectedPayment = ref("upi");
    const cardNumber = ref("");
    const cardExpiry = ref("");
    const cardCvv = ref("");
    const form = reactive({ fullName: "", phone: "", email: "", line1: "", line2: "", pincode: "", city: "", state: "" });
    const errors = reactive({ fullName: "", phone: "", email: "", line1: "", pincode: "", city: "" });
    const shippingOptions = [
      { id: "standard", name: "Standard Delivery", desc: "3–5 business days", price: cart.subtotal >= 999 ? 0 : 79 },
      { id: "express", name: "Express Delivery", desc: "1–2 business days (Metro cities)", price: 149 }
    ];
    const paymentMethods = [
      { id: "upi", icon: "💳", name: "UPI", desc: "Google Pay, PhonePe, Paytm, BHIM" },
      { id: "card", icon: "🏦", name: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay, Amex" },
      { id: "netbanking", icon: "🌐", name: "Net Banking", desc: "All major Indian banks" },
      { id: "cod", icon: "💵", name: "Cash on Delivery", desc: "Available in select PIN codes" }
    ];
    const shippingFee = computed(() => shippingOptions.find((o) => o.id === selectedShipping.value)?.price ?? 0);
    const orderTotal = computed(() => cart.subtotal - cart.appliedDiscount + shippingFee.value);
    const getStepClass = (idx) => {
      if (currentStep.value > idx) return "completed";
      if (currentStep.value === idx) return "active";
      return "pending";
    };
    const placeOrder = async () => {
      placing.value = true;
      await new Promise((r) => setTimeout(r, 1500));
      const orderId = generateOrderId();
      cart.clearCart();
      router.push(`/thank-you?order=${orderId}`);
    };
    const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
    useSeoMeta({ title: "Checkout – Van Elvina", description: "Secure checkout for Van Elvina innerwear. Multiple payment options available." });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppInput = _sfc_main$1;
      const _component_AppButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-warm-ivory min-h-screen py-6" }, _attrs))}><div class="page-container max-w-5xl"><div class="mb-8"><div class="step-indicator justify-center"><!--[-->`);
      ssrRenderList(steps, (step, idx) => {
        _push(`<div class="flex items-center"><div class="flex flex-col items-center gap-1"><div class="${ssrRenderClass([getStepClass(idx), "step-dot"])}">`);
        if (unref(currentStep) > idx) {
          _push(`<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>`);
        } else {
          _push(`<span>${ssrInterpolate(idx + 1)}</span>`);
        }
        _push(`</div><span class="text-[10px] font-ui text-mid-gray whitespace-nowrap">${ssrInterpolate(step)}</span></div>`);
        if (idx < steps.length - 1) {
          _push(`<div class="${ssrRenderClass([unref(currentStep) > idx ? "completed" : "", "step-line w-12 md:w-20 mx-2 mb-4"])}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-5"><div class="bg-white rounded-2xl shadow-soft border border-border-gray p-6" style="${ssrRenderStyle(unref(currentStep) === 0 ? null : { display: "none" })}"><h2 class="font-ui font-semibold text-charcoal text-base mb-5">Delivery Address</h2><form class="space-y-4" novalidate aria-label="Delivery address form"><div class="grid sm:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(form).fullName,
        "onUpdate:modelValue": ($event) => unref(form).fullName = $event,
        label: "Full Name",
        placeholder: "Priya Sharma",
        required: "",
        error: unref(errors).fullName
      }, null, _parent));
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(form).phone,
        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
        label: "Phone Number",
        type: "tel",
        placeholder: "9876543210",
        required: "",
        error: unref(errors).phone
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        label: "Email Address",
        type: "email",
        placeholder: "priya@email.com",
        required: "",
        error: unref(errors).email
      }, null, _parent));
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(form).line1,
        "onUpdate:modelValue": ($event) => unref(form).line1 = $event,
        label: "Address Line 1",
        placeholder: "House No, Building, Street",
        required: "",
        error: unref(errors).line1
      }, null, _parent));
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(form).line2,
        "onUpdate:modelValue": ($event) => unref(form).line2 = $event,
        label: "Address Line 2 (Optional)",
        placeholder: "Landmark, Area"
      }, null, _parent));
      _push(`<div class="grid sm:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(form).pincode,
        "onUpdate:modelValue": ($event) => unref(form).pincode = $event,
        label: "PIN Code",
        placeholder: "400001",
        maxlength: "6",
        required: "",
        error: unref(errors).pincode
      }, null, _parent));
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(form).city,
        "onUpdate:modelValue": ($event) => unref(form).city = $event,
        label: "City",
        placeholder: "Mumbai",
        required: "",
        error: unref(errors).city
      }, null, _parent));
      _push(`<div><label class="block text-sm font-ui font-medium text-charcoal mb-1.5" for="state-select">State <span class="text-dusty-rose">*</span></label><select id="state-select" class="input-base" required aria-required="true"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).state) ? ssrLooseContain(unref(form).state, "") : ssrLooseEqual(unref(form).state, "")) ? " selected" : ""}>Select State</option><!--[-->`);
      ssrRenderList(indianStates, (state) => {
        _push(`<option${ssrRenderAttr("value", state)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).state) ? ssrLooseContain(unref(form).state, state) : ssrLooseEqual(unref(form).state, state)) ? " selected" : ""}>${ssrInterpolate(state)}</option>`);
      });
      _push(`<!--]--></select></div></div>`);
      _push(ssrRenderComponent(_component_AppButton, {
        type: "submit",
        size: "lg",
        full: true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Continue to Shipping`);
          } else {
            return [
              createTextVNode("Continue to Shipping")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div><div class="bg-white rounded-2xl shadow-soft border border-border-gray p-6" style="${ssrRenderStyle(unref(currentStep) === 1 ? null : { display: "none" })}"><h2 class="font-ui font-semibold text-charcoal text-base mb-5">Shipping Method</h2><div class="space-y-3" role="radiogroup" aria-label="Shipping options"><!--[-->`);
      ssrRenderList(shippingOptions, (option) => {
        _push(`<label class="${ssrRenderClass([unref(selectedShipping) === option.id ? "border-deep-plum bg-rose-blush/40" : "border-border-gray hover:border-dusty-rose", "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all"])}"><div class="flex items-center gap-3"><input type="radio"${ssrRenderAttr("value", option.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedShipping), option.id)) ? " checked" : ""} class="text-deep-plum"${ssrRenderAttr("aria-label", option.name)}><div><p class="text-sm font-ui font-semibold text-charcoal">${ssrInterpolate(option.name)}</p><p class="text-xs text-mid-gray font-ui">${ssrInterpolate(option.desc)}</p></div></div><span class="${ssrRenderClass([option.price === 0 ? "text-green-600" : "text-charcoal", "text-sm font-ui font-semibold"])}">${ssrInterpolate(option.price === 0 ? "FREE" : unref(formatPrice)(option.price))}</span></label>`);
      });
      _push(`<!--]--></div><div class="flex gap-3 mt-6">`);
      _push(ssrRenderComponent(_component_AppButton, {
        variant: "secondary",
        onClick: ($event) => currentStep.value = 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Back`);
          } else {
            return [
              createTextVNode("Back")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AppButton, {
        full: true,
        size: "lg",
        onClick: ($event) => currentStep.value = 2
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Continue to Payment`);
          } else {
            return [
              createTextVNode("Continue to Payment")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="bg-white rounded-2xl shadow-soft border border-border-gray p-6" style="${ssrRenderStyle(unref(currentStep) === 2 ? null : { display: "none" })}"><h2 class="font-ui font-semibold text-charcoal text-base mb-5">Payment Method</h2><div class="space-y-3" role="radiogroup" aria-label="Payment methods"><!--[-->`);
      ssrRenderList(paymentMethods, (method) => {
        _push(`<label class="${ssrRenderClass([unref(selectedPayment) === method.id ? "border-deep-plum bg-rose-blush/40" : "border-border-gray hover:border-dusty-rose", "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"])}"><input type="radio"${ssrRenderAttr("value", method.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedPayment), method.id)) ? " checked" : ""} class="text-deep-plum"${ssrRenderAttr("aria-label", method.name)}><span class="text-lg" aria-hidden="true">${ssrInterpolate(method.icon)}</span><div><p class="text-sm font-ui font-semibold text-charcoal">${ssrInterpolate(method.name)}</p><p class="text-xs text-mid-gray font-ui">${ssrInterpolate(method.desc)}</p></div></label>`);
      });
      _push(`<!--]--></div>`);
      if (unref(selectedPayment) === "card") {
        _push(`<div class="mt-4 space-y-3 p-4 bg-light-gray rounded-xl">`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(cardNumber),
          "onUpdate:modelValue": ($event) => isRef(cardNumber) ? cardNumber.value = $event : null,
          label: "Card Number",
          placeholder: "1234 5678 9012 3456",
          maxlength: "19"
        }, null, _parent));
        _push(`<div class="grid grid-cols-2 gap-3">`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(cardExpiry),
          "onUpdate:modelValue": ($event) => isRef(cardExpiry) ? cardExpiry.value = $event : null,
          label: "Expiry",
          placeholder: "MM/YY",
          maxlength: "5"
        }, null, _parent));
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(cardCvv),
          "onUpdate:modelValue": ($event) => isRef(cardCvv) ? cardCvv.value = $event : null,
          label: "CVV",
          placeholder: "123",
          maxlength: "3"
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-4 flex flex-wrap gap-3 items-center"><!--[-->`);
      ssrRenderList(["🔒 SSL Secured", "✅ PCI Compliant", "🏦 100% Safe"], (b) => {
        _push(`<div class="text-xs font-ui text-mid-gray flex items-center gap-1">${ssrInterpolate(b)}</div>`);
      });
      _push(`<!--]--></div><div class="flex gap-3 mt-6">`);
      _push(ssrRenderComponent(_component_AppButton, {
        variant: "secondary",
        onClick: ($event) => currentStep.value = 1
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Back`);
          } else {
            return [
              createTextVNode("Back")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_AppButton, {
        full: true,
        size: "lg",
        loading: unref(placing),
        onClick: placeOrder
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Place Order – ${ssrInterpolate(unref(formatPrice)(unref(orderTotal)))}`);
          } else {
            return [
              createTextVNode("Place Order – " + toDisplayString(unref(formatPrice)(unref(orderTotal))), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="lg:col-span-1"><div class="bg-white rounded-2xl shadow-soft border border-border-gray p-5 sticky top-24"><h2 class="font-ui font-semibold text-charcoal mb-4">Your Order</h2><div class="space-y-3 max-h-64 overflow-y-auto scrollbar-hide"><!--[-->`);
      ssrRenderList(unref(cart).items, (item) => {
        _push(`<div class="flex gap-3"><img${ssrRenderAttr("src", item.product.variants[0]?.images[0])}${ssrRenderAttr("alt", item.product.name)} class="w-12 h-14 object-cover rounded-lg shrink-0" width="48" height="56"><div class="min-w-0"><p class="text-xs font-ui font-medium text-charcoal line-clamp-2">${ssrInterpolate(item.product.name)}</p><p class="text-[10px] text-mid-gray font-ui">${ssrInterpolate(item.variantColor)} · ${ssrInterpolate(item.size)} · Qty ${ssrInterpolate(item.quantity)}</p><p class="text-xs font-semibold text-charcoal font-ui">${ssrInterpolate(unref(formatPrice)(item.product.price * item.quantity))}</p></div></div>`);
      });
      _push(`<!--]--></div><div class="border-t border-border-gray mt-4 pt-4 space-y-2 text-sm font-ui"><div class="flex justify-between text-mid-gray"><span>Subtotal</span><span>${ssrInterpolate(unref(formatPrice)(unref(cart).subtotal))}</span></div>`);
      if (unref(cart).appliedDiscount) {
        _push(`<div class="flex justify-between text-green-600"><span>Discount</span><span>−${ssrInterpolate(unref(formatPrice)(unref(cart).appliedDiscount))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between text-mid-gray"><span>Shipping</span><span class="${ssrRenderClass(unref(shippingFee) === 0 ? "text-green-600" : "")}">${ssrInterpolate(unref(shippingFee) === 0 ? "FREE" : unref(formatPrice)(unref(shippingFee)))}</span></div><div class="flex justify-between font-bold text-charcoal border-t pt-2"><span>Total</span><span>${ssrInterpolate(unref(formatPrice)(unref(orderTotal)))}</span></div></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=checkout-iNyVp0hM.js.map
