import { _ as __nuxt_component_1 } from "./nuxt-link-CUeF3yRu.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, useSSRContext, computed } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "C:/Project/Van Elvina/van-elvina/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import { _ as _sfc_main$a } from "./ProductCard-DbRZuopT.js";
import { u as useProducts } from "./useProducts-B0vDGKs3.js";
import { _ as _sfc_main$b } from "./products-Bors2uVq.js";
import { _ as _sfc_main$c, o as organizationSchema } from "./schema-DAHRKZVa.js";
import { u as useSeoMeta, a as useHead } from "./v3-Bm7UdMXu.js";
import "C:/Project/Van Elvina/van-elvina/node_modules/ufo/dist/index.mjs";
import "C:/Project/Van Elvina/van-elvina/node_modules/defu/dist/defu.mjs";
import "C:/Project/Van Elvina/van-elvina/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Project/Van Elvina/van-elvina/node_modules/unctx/dist/index.mjs";
import "C:/Project/Van Elvina/van-elvina/node_modules/h3/dist/index.mjs";
import "pinia";
import "vue-router";
import "C:/Project/Van Elvina/van-elvina/node_modules/klona/dist/index.mjs";
import "./formatters-CRqlhyd1.js";
import "./ui-De1hAQUT.js";
import "C:/Project/Van Elvina/van-elvina/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "HeroBanner",
  __ssrInlineRender: true,
  setup(__props) {
    const banners = ref([]);
    const current = ref(0);
    ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "relative overflow-hidden bg-black",
        "aria-label": "Featured banners"
      }, _attrs))}><div class="flex transition-transform duration-700 ease-in-out" style="${ssrRenderStyle({ transform: `translateX(-${unref(current) * 100}%)` })}"><!--[-->`);
      ssrRenderList(unref(banners), (banner) => {
        _push(`<div class="relative w-full shrink-0 aspect-[16/7] min-h-[320px] md:min-h-[480px]"><img${ssrRenderAttr("src", banner.image)}${ssrRenderAttr("alt", banner.title)} class="absolute inset-0 w-full h-full object-cover"${ssrRenderAttr("loading", banner.id === "b001" ? "eager" : "lazy")} fetchpriority="high"><div class="${ssrRenderClass([banner.textColor === "light" ? "bg-gradient-to-r from-black/60 via-black/30 to-transparent" : "bg-gradient-to-r from-white/70 via-white/40 to-transparent", "absolute inset-0"])}"></div><div class="${ssrRenderClass([{
          "justify-start": banner.align === "left",
          "justify-center": banner.align === "center",
          "justify-end": banner.align === "right"
        }, "absolute inset-0 flex items-center"])}"><div class="${ssrRenderClass([{ "text-center": banner.align === "center", "text-right": banner.align === "right" }, "px-8 md:px-16 lg:px-24 max-w-lg"])}">`);
        if (banner.badge) {
          _push(`<div class="${ssrRenderClass([banner.textColor === "light" ? "bg-dusty-rose/80 text-white" : "bg-deep-plum text-white", "inline-block px-3 py-1 rounded-full text-xs font-ui font-semibold mb-3 uppercase tracking-wider"])}">${ssrInterpolate(banner.badge)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h2 class="${ssrRenderClass([banner.textColor === "light" ? "text-white" : "text-deep-plum", "font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"])}">${ssrInterpolate(banner.title)}</h2><p class="${ssrRenderClass([banner.textColor === "light" ? "text-white/85" : "text-charcoal/80", "font-ui text-sm md:text-base leading-relaxed mb-6 max-w-sm"])}"${ssrRenderAttr("class2", banner.align === "center" ? "mx-auto" : "")}>${ssrInterpolate(banner.subtitle)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: banner.ctaLink,
          class: ["inline-flex items-center gap-2 px-7 py-3 rounded-full font-ui font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md", banner.textColor === "light" ? "bg-white text-deep-plum hover:bg-rose-blush" : "bg-deep-plum text-white hover:bg-plum-800"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(banner.cta)} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(toDisplayString(banner.cta) + " ", 1),
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
                    d: "M9 5l7 7-7 7"
                  })
                ]))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><button class="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center transition-all duration-200 text-white" aria-label="Previous banner"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><button class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center transition-all duration-200 text-white" aria-label="Next banner"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button><div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10" role="tablist" aria-label="Banner navigation"><!--[-->`);
      ssrRenderList(unref(banners), (_, idx) => {
        _push(`<button class="${ssrRenderClass([idx === unref(current) ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80", "transition-all duration-300 rounded-full"])}"${ssrRenderAttr("aria-label", `Go to slide ${idx + 1}`)}${ssrRenderAttr("aria-selected", idx === unref(current))} role="tab"></button>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/HeroBanner.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "SectionFeaturedProducts",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const { featured } = useProducts();
    const products = computed(() => featured.value.slice(0, 8));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = _sfc_main$a;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-warm-ivory",
        "aria-labelledby": "featured-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading"><p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">${ssrInterpolate(__props.widget?.subtitle || "Handpicked For You")}</p><h2 id="featured-heading">${ssrInterpolate(__props.widget?.title || "Featured Products")}</h2><p>${ssrInterpolate(__props.widget?.description || "Our bestselling styles — tried, tested, and loved by thousands of women across India.")}</p></div><div class="product-grid"><!--[-->`);
      ssrRenderList(unref(products), (product) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="text-center mt-10">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products?badge=bestseller",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All Bestsellers `);
          } else {
            return [
              createTextVNode(" View All Bestsellers ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionFeaturedProducts.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SectionNewArrivals",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const { newArrivals } = useProducts();
    const products = computed(() => newArrivals.value.slice(0, 6));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = _sfc_main$a;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-rose-blush/40",
        "aria-labelledby": "new-arrivals-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading"><p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">${ssrInterpolate(__props.widget?.subtitle || "Just Landed")}</p><h2 id="new-arrivals-heading">${ssrInterpolate(__props.widget?.title || "New Arrivals")}</h2><p>${ssrInterpolate(__props.widget?.description || "Fresh styles added every week — be the first to wear the latest.")}</p></div><div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:grid md:product-grid"><!--[-->`);
      ssrRenderList(unref(products), (product) => {
        _push(`<div class="shrink-0 w-48 md:w-auto">`);
        _push(ssrRenderComponent(_component_ProductCard, { product }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="text-center mt-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products?badge=new",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Explore New Arrivals `);
          } else {
            return [
              createTextVNode(" Explore New Arrivals ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionNewArrivals.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "SectionEverydayComfort",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const features = [
      "All-day comfort without compromise",
      "Premium breathable fabrics",
      "No-pinch, no-poke designs",
      "Available in sizes 28A to 44H",
      "Machine washable & durable"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBadge = _sfc_main$b;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding",
        "aria-labelledby": "everyday-heading"
      }, _attrs))}><div class="page-container"><div class="grid md:grid-cols-2 gap-8 items-center"><div class="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card-hover"><img${ssrRenderAttr("src", __props.widget?.image || "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80")}${ssrRenderAttr("alt", __props.widget?.title || "Everyday Comfort Collection by Van Elvina")} class="absolute inset-0 w-full h-full object-cover" loading="lazy" width="800" height="600"><div class="absolute inset-0 bg-gradient-to-tr from-deep-plum/40 to-transparent"></div><div class="absolute bottom-5 left-5">`);
      _push(ssrRenderComponent(_component_AppBadge, {
        variant: "new",
        label: __props.widget?.subtitle || "New Collection"
      }, null, _parent));
      _push(`</div></div><div class="space-y-5"><div><p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">${ssrInterpolate(__props.widget?.subtitle || "Everyday Essentials")}</p><h2 id="everyday-heading" class="font-serif text-3xl md:text-4xl text-deep-plum font-bold leading-tight mb-4">${(__props.widget?.title || "Everyday Comfort<br />Collection") ?? ""}</h2><p class="text-mid-gray font-ui leading-relaxed text-sm md:text-base mb-6">${ssrInterpolate(__props.widget?.description || "Designed for real life — from morning rush to evening wind-down. Our Everyday Comfort Collection features ultra-soft fabrics, thoughtful fits, and styles that move with you. Because comfort isn't a luxury. It's a daily right.")}</p></div><ul class="space-y-3"><!--[-->`);
      ssrRenderList(__props.widget?.items || features, (feature) => {
        _push(`<li class="flex items-center gap-3 text-sm font-ui text-charcoal"><span class="w-5 h-5 rounded-full bg-rose-blush flex items-center justify-center shrink-0" aria-hidden="true"><svg class="w-3 h-3 text-dusty-rose" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></span> ${ssrInterpolate(feature)}</li>`);
      });
      _push(`<!--]--></ul><div class="flex gap-3 flex-wrap">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Shop Collection`);
          } else {
            return [
              createTextVNode("Shop Collection")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products?category=bras",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Explore Bras`);
          } else {
            return [
              createTextVNode("Explore Bras")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionEverydayComfort.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SectionBestSellers",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const { bestSellers } = useProducts();
    const products = computed(() => bestSellers.value.slice(0, 8));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = _sfc_main$a;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-white",
        "aria-labelledby": "bestsellers-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading"><p class="text-xs font-ui font-semibold text-soft-gold uppercase tracking-[0.2em] mb-2">${ssrInterpolate(__props.widget?.subtitle || "Customer Favourites")}</p><h2 id="bestsellers-heading">${ssrInterpolate(__props.widget?.title || "Best Sellers")}</h2><p>${ssrInterpolate(__props.widget?.description || "Styles our customers keep coming back for — rated 4.5+ and loved by thousands.")}</p></div><div class="product-grid"><!--[-->`);
      ssrRenderList(unref(products), (product) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="text-center mt-10">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View All Products`);
          } else {
            return [
              createTextVNode("View All Products")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionBestSellers.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CategoryTile",
  __ssrInlineRender: true,
  props: {
    category: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/products?category=${__props.category.slug}`,
        class: "group relative block overflow-hidden rounded-xl aspect-square bg-light-gray shadow-card hover:shadow-card-hover transition-all duration-350",
        "aria-label": `Shop ${__props.category.name}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.category.image)}${ssrRenderAttr("alt", __props.category.name)} class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="300" height="300"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-deep-plum/70 via-deep-plum/20 to-transparent"${_scopeId}></div><div class="absolute bottom-0 left-0 right-0 p-4"${_scopeId}><h3 class="font-serif text-white text-lg font-semibold leading-tight"${_scopeId}>${ssrInterpolate(__props.category.name)}</h3><p class="text-rose-blush/80 text-xs font-ui mt-0.5"${_scopeId}>${ssrInterpolate(__props.category.productCount)}+ styles</p></div><div class="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"${_scopeId}><svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg></div>`);
          } else {
            return [
              createVNode("img", {
                src: __props.category.image,
                alt: __props.category.name,
                class: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                loading: "lazy",
                width: "300",
                height: "300"
              }, null, 8, ["src", "alt"]),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-deep-plum/70 via-deep-plum/20 to-transparent" }),
              createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-4" }, [
                createVNode("h3", { class: "font-serif text-white text-lg font-semibold leading-tight" }, toDisplayString(__props.category.name), 1),
                createVNode("p", { class: "text-rose-blush/80 text-xs font-ui mt-0.5" }, toDisplayString(__props.category.productCount) + "+ styles", 1)
              ]),
              createVNode("div", { class: "absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-3.5 h-3.5 text-white",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5l7 7-7 7"
                  })
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/molecules/CategoryTile.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SectionShopByCategory",
  __ssrInlineRender: true,
  setup(__props) {
    const categories = ref([]);
    ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CategoryTile = _sfc_main$4;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-rose-blush/30",
        "aria-labelledby": "categories-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading"><p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">Find Your Style</p><h2 id="categories-heading">Shop By Category</h2><p>Explore our full range — from everyday essentials to special occasion pieces.</p></div><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(ssrRenderComponent(_component_CategoryTile, {
          key: category.id,
          category
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionShopByCategory.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SectionCustomerReviews",
  __ssrInlineRender: true,
  setup(__props) {
    const reviews = ref([]);
    ref(true);
    const stats = [
      { value: "50,000+", label: "Happy Customers" },
      { value: "4.7★", label: "Average Rating" },
      { value: "95%", label: "Would Recommend" },
      { value: "30-Day", label: "Easy Returns" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ReviewCard = _sfc_main$c;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-warm-ivory",
        "aria-labelledby": "reviews-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading"><p class="text-xs font-ui font-semibold text-soft-gold uppercase tracking-[0.2em] mb-2">Real Women, Real Stories</p><h2 id="reviews-heading">What Our Customers Say</h2><p>Join 50,000+ happy customers who trust Van Elvina for everyday comfort.</p></div><div class="flex flex-wrap justify-center gap-8 md:gap-16 mb-10"><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(`<div class="text-center"><p class="font-serif text-3xl font-bold text-deep-plum">${ssrInterpolate(stat.value)}</p><p class="text-xs text-mid-gray font-ui mt-1">${ssrInterpolate(stat.label)}</p></div>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(unref(reviews), (review) => {
        _push(ssrRenderComponent(_component_ReviewCard, {
          key: review.id,
          review
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionCustomerReviews.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SectionBrandUSP",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const usps = [
      { icon: "🌿", title: "Pure Fabrics", desc: "OEKO-TEX certified, skin-safe materials" },
      { icon: "📏", title: "Perfect Fit", desc: "Inclusive sizing from 28A to 44H" },
      { icon: "🚀", title: "Fast Delivery", desc: "Delivered in 2–5 business days" },
      { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free exchange policy" },
      { icon: "🔒", title: "Secure Packing", desc: "Discreet, privacy-first packaging" },
      { icon: "💰", title: "Best Value", desc: "Premium quality at honest prices" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-gradient-to-br from-deep-plum to-plum-900",
        "aria-labelledby": "usp-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading mb-10"><p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">${ssrInterpolate(__props.widget?.subtitle || "Why Choose Van Elvina")}</p><h2 id="usp-heading" class="text-white">${ssrInterpolate(__props.widget?.title || "The Van Elvina Promise")}</h2><p class="text-white/70">${ssrInterpolate(__props.widget?.description || "We believe every woman deserves innerwear that's as beautiful as it is comfortable.")}</p></div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"><!--[-->`);
      ssrRenderList(__props.widget?.items || usps, (usp) => {
        _push(`<div class="group flex flex-col items-center text-center p-5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-default"><div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">${ssrInterpolate(usp.icon)}</div><h3 class="font-ui font-semibold text-white text-sm mb-1.5">${ssrInterpolate(usp.title)}</h3><p class="text-white/60 text-xs leading-relaxed">${ssrInterpolate(usp.desc)}</p></div>`);
      });
      _push(`<!--]--></div><div class="mt-12 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "inline-flex items-center gap-2 px-8 py-3.5 bg-white text-deep-plum rounded-full font-ui font-semibold text-sm hover:bg-rose-blush transition-colors duration-250"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Shop Now &amp; Experience the Difference <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(" Shop Now & Experience the Difference "),
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
                  d: "M9 5l7 7-7 7"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionBrandUSP.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const widgets = ref([]);
    ref(true);
    const activeWidgets = computed(() => {
      return [...widgets.value].filter((w) => w.enabled).sort((a, b) => a.order - b.order);
    });
    useSeoMeta({
      title: "Van Elvina – Women Comfort First | Premium Innerwear",
      description: "Shop India's most comfortable women's innerwear. Bras, panties, shapewear, sleepwear & activewear. Free shipping above ₹999. Easy 30-day returns.",
      ogTitle: "Van Elvina – Women Comfort First",
      ogDescription: "Premium innerwear for the modern Indian woman. Discover bras, panties, shapewear, and more — crafted for all-day comfort and elegance.",
      ogImage: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&h=630&q=80",
      ogUrl: "https://vanelvina.com",
      twitterCard: "summary_large_image"
    });
    useHead({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify(organizationSchema())
        }
      ],
      link: [{ rel: "canonical", href: "https://vanelvina.com" }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroBanner = _sfc_main$9;
      const _component_SectionFeaturedProducts = _sfc_main$8;
      const _component_SectionNewArrivals = _sfc_main$7;
      const _component_SectionEverydayComfort = _sfc_main$6;
      const _component_SectionBestSellers = _sfc_main$5;
      const _component_SectionShopByCategory = _sfc_main$3;
      const _component_SectionCustomerReviews = _sfc_main$2;
      const _component_SectionBrandUSP = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><!--[-->`);
      ssrRenderList(unref(activeWidgets), (widget) => {
        _push(`<div>`);
        if (widget.key === "hero") {
          _push(ssrRenderComponent(_component_HeroBanner, { widget }, null, _parent));
        } else if (widget.key === "featured") {
          _push(ssrRenderComponent(_component_SectionFeaturedProducts, { widget }, null, _parent));
        } else if (widget.key === "new-arrivals") {
          _push(ssrRenderComponent(_component_SectionNewArrivals, { widget }, null, _parent));
        } else if (widget.key === "everyday-comfort") {
          _push(ssrRenderComponent(_component_SectionEverydayComfort, { widget }, null, _parent));
        } else if (widget.key === "best-sellers") {
          _push(ssrRenderComponent(_component_SectionBestSellers, { widget }, null, _parent));
        } else if (widget.key === "categories") {
          _push(ssrRenderComponent(_component_SectionShopByCategory, { widget }, null, _parent));
        } else if (widget.key === "reviews") {
          _push(ssrRenderComponent(_component_SectionCustomerReviews, { widget }, null, _parent));
        } else if (widget.key === "usp") {
          _push(ssrRenderComponent(_component_SectionBrandUSP, { widget }, null, _parent));
        } else if (widget.type === "banner") {
          _push(`<section class="section-padding bg-warm-ivory"><div class="page-container"><div class="relative overflow-hidden rounded-2xl aspect-[16/6] shadow-card-hover min-h-[220px]"><img${ssrRenderAttr("src", widget.image)}${ssrRenderAttr("alt", widget.title)} class="absolute inset-0 w-full h-full object-cover"><div class="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6"><div>`);
          if (widget.subtitle) {
            _push(`<span class="inline-block px-3 py-1 bg-deep-plum text-white text-xs rounded-full uppercase tracking-wider mb-2">${ssrInterpolate(widget.subtitle)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<h2 class="text-2xl md:text-5xl font-serif text-white font-bold mb-3">${ssrInterpolate(widget.title)}</h2><p class="text-white/80 text-sm md:text-base max-w-lg mx-auto">${ssrInterpolate(widget.description)}</p></div></div></div></div></section>`);
        } else if (widget.type === "editorial") {
          _push(`<section class="section-padding bg-white"><div class="page-container"><div class="grid md:grid-cols-2 gap-8 items-center"><div class="space-y-4">`);
          if (widget.subtitle) {
            _push(`<span class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-wider">${ssrInterpolate(widget.subtitle)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<h2 class="text-3xl md:text-4xl font-serif text-deep-plum font-bold">${ssrInterpolate(widget.title)}</h2><p class="text-mid-gray text-sm md:text-base leading-relaxed">${ssrInterpolate(widget.description)}</p></div>`);
          if (widget.image) {
            _push(`<div class="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md min-h-[200px]"><img${ssrRenderAttr("src", widget.image)}${ssrRenderAttr("alt", widget.title)} class="w-full h-full object-cover"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></section>`);
        } else if (widget.type === "html") {
          _push(`<section class="section-padding bg-warm-ivory"><div class="page-container">${widget.description ?? ""}</div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CHJoN6ig.js.map
