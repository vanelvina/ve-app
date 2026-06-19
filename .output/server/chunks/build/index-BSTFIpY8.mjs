import { _ as __nuxt_component_1 } from './nuxt-link-D2oXBkcL.mjs';
import { defineComponent, ref, computed, unref, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as _sfc_main$e } from './ProductCard-duDewXZZ.mjs';
import { u as useProducts } from './useProducts-D0EBEr25.mjs';
import { _ as _sfc_main$f } from './AppBadge-R2t0PrU7.mjs';
import { o as organizationSchema, _ as _sfc_main$g } from './schema-BlAIJBud.mjs';
import { u as useSeoMeta, a as useHead } from './v3-B1OjdVjd.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import './products-DbFjrDEZ.mjs';
import './cart-BC2fjYev.mjs';
import './ui-De1hAQUT.mjs';

const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "HeroBanner",
  __ssrInlineRender: true,
  setup(__props) {
    const banners = ref([]);
    const current = ref(0);
    ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "relative overflow-hidden bg-warm-ivory border-b border-rose-blush/20",
        "aria-label": "Featured banners"
      }, _attrs))}><div class="flex transition-transform duration-700 ease-in-out" style="${ssrRenderStyle({ transform: `translateX(-${unref(current) * 100}%)` })}"><!--[-->`);
      ssrRenderList(unref(banners), (banner, idx) => {
        _push(`<div class="w-full shrink-0 relative aspect-[16/7] md:aspect-[16/6] min-h-[180px] sm:min-h-[300px] md:min-h-[420px] lg:min-h-[500px]">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: banner.ctaLink || "/products",
          class: "block w-full h-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", banner.image)}${ssrRenderAttr("alt", banner.title || "Featured Banner")} class="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"${ssrRenderAttr("loading", idx === 0 ? "eager" : "lazy")}${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: banner.image,
                  alt: banner.title || "Featured Banner",
                  class: "w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]",
                  loading: idx === 0 ? "eager" : "lazy"
                }, null, 8, ["src", "alt", "loading"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><button class="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/35 hover:bg-white/50 text-deep-plum hover:text-plum-800 flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-premium border border-white/20" aria-label="Previous banner"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg></button><button class="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/35 hover:bg-white/50 text-deep-plum hover:text-plum-800 flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-premium border border-white/20" aria-label="Next banner"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg></button><div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10" role="tablist" aria-label="Banner navigation"><!--[-->`);
      ssrRenderList(unref(banners), (_, idx) => {
        _push(`<button class="${ssrRenderClass([idx === unref(current) ? "w-8 h-2 bg-deep-plum shadow-premium" : "w-2.5 h-2.5 bg-deep-plum/20 hover:bg-deep-plum/50", "transition-all duration-300 rounded-full"])}"${ssrRenderAttr("aria-label", `Go to slide ${idx + 1}`)}${ssrRenderAttr("aria-selected", idx === unref(current))} role="tab"></button>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/HeroBanner.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "SectionFeaturedProducts",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const { featured } = useProducts();
    const products = computed(() => featured.value.slice(0, 8));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_ProductCard = _sfc_main$e;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-warm-ivory",
        "aria-labelledby": "featured-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading"><p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">${ssrInterpolate(((_a = __props.widget) == null ? void 0 : _a.subtitle) || "Handpicked For You")}</p><h2 id="featured-heading">${ssrInterpolate(((_b = __props.widget) == null ? void 0 : _b.title) || "Featured Products")}</h2><p>${ssrInterpolate(((_c = __props.widget) == null ? void 0 : _c.description) || "Our bestselling styles \u2014 tried, tested, and loved by thousands of women across India.")}</p></div><div class="product-grid"><!--[-->`);
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionFeaturedProducts.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "SectionNewArrivals",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const { newArrivals } = useProducts();
    const products = computed(() => newArrivals.value.slice(0, 6));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_ProductCard = _sfc_main$e;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-rose-blush/40",
        "aria-labelledby": "new-arrivals-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading"><p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">${ssrInterpolate(((_a = __props.widget) == null ? void 0 : _a.subtitle) || "Just Landed")}</p><h2 id="new-arrivals-heading">${ssrInterpolate(((_b = __props.widget) == null ? void 0 : _b.title) || "New Arrivals")}</h2><p>${ssrInterpolate(((_c = __props.widget) == null ? void 0 : _c.description) || "Fresh styles added every week \u2014 be the first to wear the latest.")}</p></div><div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:grid md:product-grid"><!--[-->`);
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
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionNewArrivals.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_AppBadge = _sfc_main$f;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-gradient-to-tr from-rose-blush/10 via-warm-ivory to-rose-blush/35 relative overflow-hidden",
        "aria-labelledby": "everyday-heading"
      }, _attrs))}><div class="absolute -bottom-16 -left-16 w-88 h-88 rounded-full bg-dusty-rose/5 blur-3xl pointer-events-none"></div><div class="page-container relative z-10"><div class="grid md:grid-cols-2 gap-10 items-center"><div class="flex justify-center"><div class="relative group stamp-frame w-full max-w-md aspect-[4/3] overflow-hidden transform md:-rotate-1 hover:rotate-0 transition-transform duration-500 shadow-premium"><img${ssrRenderAttr("src", ((_a = __props.widget) == null ? void 0 : _a.image) || "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80")}${ssrRenderAttr("alt", ((_b = __props.widget) == null ? void 0 : _b.title) || "Everyday Comfort Collection by Van Elvina")} class="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105" loading="lazy" width="800" height="600"><div class="absolute inset-0 bg-gradient-to-tr from-deep-plum/20 to-transparent pointer-events-none"></div><div class="absolute bottom-4 left-4">`);
      _push(ssrRenderComponent(_component_AppBadge, {
        variant: "new",
        label: ((_c = __props.widget) == null ? void 0 : _c.subtitle) || "Premium Quality"
      }, null, _parent));
      _push(`</div></div></div><div class="space-y-6"><div class="space-y-3"><p class="text-xs font-ui font-bold text-dusty-rose uppercase tracking-[0.25em]">${ssrInterpolate(((_d = __props.widget) == null ? void 0 : _d.subtitle) || "Everyday Essentials")}</p><h2 id="everyday-heading" class="font-serif text-3xl sm:text-4xl lg:text-5xl text-deep-plum font-extrabold leading-[1.15]">${(_f = ((_e = __props.widget) == null ? void 0 : _e.title) || "Everyday Comfort<br />Collection") != null ? _f : ""}</h2><p class="text-charcoal/70 font-ui text-sm sm:text-base leading-relaxed">${ssrInterpolate(((_g = __props.widget) == null ? void 0 : _g.description) || "Designed for real life \u2014 from morning rush to evening wind-down. Our Everyday Comfort Collection features ultra-soft fabrics, thoughtful fits, and styles that move with you. Because comfort isn't a luxury. It's a daily right.")}</p></div><div class="flex flex-wrap gap-2.5"><!--[-->`);
      ssrRenderList(((_h = __props.widget) == null ? void 0 : _h.items) || features, (feature) => {
        _push(`<div class="px-4 py-2 bg-white hover:bg-rose-blush border border-rose-blush/30 rounded-full text-[11px] sm:text-xs font-ui font-semibold text-deep-plum shadow-soft flex items-center gap-2 transition-all duration-300 hover:scale-105 select-none"><span class="text-dusty-rose text-xs">\u{1F33F}</span><span>${ssrInterpolate(feature)}</span></div>`);
      });
      _push(`<!--]--></div><div class="flex gap-3.5 flex-wrap pt-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "btn-primary shadow-lg shadow-deep-plum/10 rounded-full"
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
        class: "btn-secondary rounded-full"
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionEverydayComfort.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "SectionBestSellers",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const { bestSellers } = useProducts();
    const products = computed(() => bestSellers.value.slice(0, 8));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_ProductCard = _sfc_main$e;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-white",
        "aria-labelledby": "bestsellers-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading"><p class="text-xs font-ui font-semibold text-soft-gold uppercase tracking-[0.2em] mb-2">${ssrInterpolate(((_a = __props.widget) == null ? void 0 : _a.subtitle) || "Customer Favourites")}</p><h2 id="bestsellers-heading">${ssrInterpolate(((_b = __props.widget) == null ? void 0 : _b.title) || "Best Sellers")}</h2><p>${ssrInterpolate(((_c = __props.widget) == null ? void 0 : _c.description) || "Styles our customers keep coming back for \u2014 rated 4.5+ and loved by thousands.")}</p></div><div class="product-grid"><!--[-->`);
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionBestSellers.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
        class: "group flex flex-col items-center text-center p-2 transition-all duration-300",
        "aria-label": `Shop ${__props.category.name}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="category-ring-container w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow-premium overflow-hidden bg-white"${_scopeId}><img${ssrRenderAttr("src", __props.category.image)}${ssrRenderAttr("alt", __props.category.name)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width="100" height="100"${_scopeId}></div><div class="mt-2 space-y-0.5"${_scopeId}><h3 class="font-sans text-charcoal group-hover:text-deep-plum text-xs sm:text-sm font-bold leading-tight transition-colors"${_scopeId}>${ssrInterpolate(__props.category.name)}</h3><p class="text-dusty-rose text-[9px] uppercase tracking-wider font-bold"${_scopeId}>${ssrInterpolate(__props.category.productCount || 0)}+ Styles </p></div>`);
          } else {
            return [
              createVNode("div", { class: "category-ring-container w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow-premium overflow-hidden bg-white" }, [
                createVNode("img", {
                  src: __props.category.image,
                  alt: __props.category.name,
                  class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                  loading: "lazy",
                  width: "100",
                  height: "100"
                }, null, 8, ["src", "alt"])
              ]),
              createVNode("div", { class: "mt-2 space-y-0.5" }, [
                createVNode("h3", { class: "font-sans text-charcoal group-hover:text-deep-plum text-xs sm:text-sm font-bold leading-tight transition-colors" }, toDisplayString(__props.category.name), 1),
                createVNode("p", { class: "text-dusty-rose text-[9px] uppercase tracking-wider font-bold" }, toDisplayString(__props.category.productCount || 0) + "+ Styles ", 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/molecules/CategoryTile.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SectionShopByCategory",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const categories = ref([]);
    ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_CategoryTile = _sfc_main$8;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "py-6 md:py-8 bg-rose-blush/20 relative",
        "aria-labelledby": "categories-heading"
      }, _attrs))}><div class="absolute inset-0 bg-gradient-to-tr from-rose-blush/10 to-transparent pointer-events-none"></div><div class="page-container relative z-10"><div class="section-heading mb-6"><p class="text-xs font-ui font-bold text-dusty-rose uppercase tracking-[0.25em] mb-1">${ssrInterpolate(((_a = __props.widget) == null ? void 0 : _a.subtitle) || "Find Your Style")}</p><h2 id="categories-heading" class="text-2xl md:text-3xl text-deep-plum font-serif font-bold">${ssrInterpolate(((_b = __props.widget) == null ? void 0 : _b.title) || "Shop By Category")}</h2><p class="text-xs text-charcoal/60 mt-1">${ssrInterpolate(((_c = __props.widget) == null ? void 0 : _c.description) || "Explore our full range \u2014 from everyday essentials to special occasion pieces.")}</p></div><div class="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide w-full justify-start md:justify-center items-start snap-x snap-mandatory"><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<div class="shrink-0 w-20 sm:w-24 snap-start">`);
        _push(ssrRenderComponent(_component_CategoryTile, { category }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionShopByCategory.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "SectionCustomerReviews",
  __ssrInlineRender: true,
  setup(__props) {
    const reviews = ref([]);
    ref(true);
    const stats = [
      { value: "50,000+", label: "Happy Customers" },
      { value: "4.7\u2605", label: "Average Rating" },
      { value: "95%", label: "Would Recommend" },
      { value: "30-Day", label: "Easy Returns" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ReviewCard = _sfc_main$g;
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionCustomerReviews.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SectionBrandUSP",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const usps = [
      { icon: "\u{1F33F}", title: "Pure Fabrics", desc: "OEKO-TEX certified, skin-safe materials" },
      { icon: "\u{1F4CF}", title: "Perfect Fit", desc: "Inclusive sizing from 28A to 44H" },
      { icon: "\u{1F680}", title: "Fast Delivery", desc: "Delivered in 2\u20135 business days" },
      { icon: "\u21A9\uFE0F", title: "Easy Returns", desc: "30-day hassle-free exchange policy" },
      { icon: "\u{1F512}", title: "Secure Packing", desc: "Discreet, privacy-first packaging" },
      { icon: "\u{1F4B0}", title: "Best Value", desc: "Premium quality at honest prices" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-gradient-to-br from-deep-plum to-plum-900",
        "aria-labelledby": "usp-heading"
      }, _attrs))}><div class="page-container"><div class="section-heading mb-10"><p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">${ssrInterpolate(((_a = __props.widget) == null ? void 0 : _a.subtitle) || "Why Choose Van Elvina")}</p><h2 id="usp-heading" class="text-white">${ssrInterpolate(((_b = __props.widget) == null ? void 0 : _b.title) || "The Van Elvina Promise")}</h2><p class="text-white/70">${ssrInterpolate(((_c = __props.widget) == null ? void 0 : _c.description) || "We believe every woman deserves innerwear that's as beautiful as it is comfortable.")}</p></div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"><!--[-->`);
      ssrRenderList(((_d = __props.widget) == null ? void 0 : _d.items) || usps, (usp) => {
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionBrandUSP.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SectionPromoGrid",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const props = __props;
    const promoItems = computed(() => {
      var _a;
      return ((_a = props.widget) == null ? void 0 : _a.items) || [];
    });
    const gridColsClass = computed(() => {
      const count = promoItems.value.length;
      if (count === 1) return "grid-cols-1";
      if (count === 2) return "grid-cols-1 sm:grid-cols-2";
      if (count === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      return "grid-cols-2 md:grid-cols-4";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-warm-ivory/30",
        "aria-labelledby": `promo-heading-${(_a = __props.widget) == null ? void 0 : _a.key}`
      }, _attrs))}><div class="page-container">`);
      if (((_b = __props.widget) == null ? void 0 : _b.title) || ((_c = __props.widget) == null ? void 0 : _c.subtitle)) {
        _push(`<div class="section-heading mb-8">`);
        if ((_d = __props.widget) == null ? void 0 : _d.subtitle) {
          _push(`<p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">${ssrInterpolate(__props.widget.subtitle)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h2${ssrRenderAttr("id", `promo-heading-${(_e = __props.widget) == null ? void 0 : _e.key}`)} class="font-serif text-2xl md:text-3xl text-deep-plum font-bold">${ssrInterpolate(__props.widget.title)}</h2>`);
        if ((_f = __props.widget) == null ? void 0 : _f.description) {
          _push(`<p class="text-charcoal/65 mt-1 text-sm">${ssrInterpolate(__props.widget.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([unref(gridColsClass), "grid gap-4 md:gap-6"])}"><!--[-->`);
      ssrRenderList(unref(promoItems), (item, idx) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: idx,
          to: item.link || "/products",
          class: "group relative block overflow-hidden rounded-2xl bg-warm-ivory shadow-soft hover:shadow-card-hover transition-all duration-350 border border-rose-blush/30 aspect-[4/3] sm:aspect-[16/10]",
          "aria-label": item.title || "Promotional Offer"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title || "Promo Offer")} class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy"${_scopeId}><div class="absolute inset-2 border border-dashed border-white/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"${_scopeId}></div>`);
            } else {
              return [
                createVNode("img", {
                  src: item.image,
                  alt: item.title || "Promo Offer",
                  class: "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                  loading: "lazy"
                }, null, 8, ["src", "alt"]),
                createVNode("div", { class: "absolute inset-2 border border-dashed border-white/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" })
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionPromoGrid.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SectionCollectionTabs",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const props = __props;
    const { getByCategory } = useProducts();
    const tabs = computed(() => {
      var _a;
      return ((_a = props.widget) == null ? void 0 : _a.items) || ["Bras", "Panties"];
    });
    const activeTab = ref(tabs.value[0] || "Bras");
    const activeProducts = computed(() => {
      return getByCategory(activeTab.value).slice(0, 4);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_ProductCard = _sfc_main$e;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-white",
        "aria-labelledby": `tabs-heading-${(_a = __props.widget) == null ? void 0 : _a.key}`
      }, _attrs))} data-v-06a0e138><div class="page-container" data-v-06a0e138><div class="section-heading mb-6" data-v-06a0e138>`);
      if ((_b = __props.widget) == null ? void 0 : _b.subtitle) {
        _push(`<p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2" data-v-06a0e138>${ssrInterpolate(__props.widget.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2${ssrRenderAttr("id", `tabs-heading-${(_c = __props.widget) == null ? void 0 : _c.key}`)} class="font-serif text-2xl md:text-3xl text-deep-plum font-bold" data-v-06a0e138>${ssrInterpolate(((_d = __props.widget) == null ? void 0 : _d.title) || "Shop Curated Collections")}</h2>`);
      if ((_e = __props.widget) == null ? void 0 : _e.description) {
        _push(`<p class="text-charcoal/65 mt-1 text-sm" data-v-06a0e138>${ssrInterpolate(__props.widget.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex justify-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2" data-v-06a0e138><!--[-->`);
      ssrRenderList(unref(tabs), (tab) => {
        _push(`<button class="${ssrRenderClass([unref(activeTab) === tab ? "bg-deep-plum text-white border-deep-plum shadow-md" : "bg-warm-ivory/50 text-charcoal/80 border-rose-blush hover:bg-rose-blush/20 hover:text-deep-plum", "px-5 py-2.5 rounded-full text-xs font-ui font-bold uppercase tracking-wider transition-all duration-350 border shrink-0"])}" data-v-06a0e138>${ssrInterpolate(tab)}</button>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" data-v-06a0e138><!--[-->`);
      ssrRenderList(unref(activeProducts), (product) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="text-center mt-10" data-v-06a0e138>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products?category=${unref(activeTab)}`,
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Explore All ${ssrInterpolate(unref(activeTab))}`);
          } else {
            return [
              createTextVNode(" Explore All " + toDisplayString(unref(activeTab)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionCollectionTabs.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_9 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-06a0e138"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SectionFitCalculator",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const showModal = ref(false);
    const step = ref(1);
    const underbust = ref(30);
    const overbust = ref(33);
    const calculatedSize = ref("34C");
    const underbustRange = Array.from({ length: 20 }, (_, i) => 26 + i);
    const overbustRange = computed(() => {
      return Array.from({ length: 25 }, (_, i) => underbust.value + i);
    });
    watch(underbust, (newVal) => {
      if (overbust.value < newVal) {
        overbust.value = newVal + 3;
      }
    });
    const resetCalculator = () => {
      step.value = 1;
      underbust.value = 30;
      overbust.value = 33;
    };
    const closeModal = () => {
      showModal.value = false;
      setTimeout(resetCalculator, 300);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-gradient-rose",
        "aria-labelledby": `fit-heading-${(_a = __props.widget) == null ? void 0 : _a.key}`
      }, _attrs))} data-v-658fdd62><div class="page-container" data-v-658fdd62><div class="bg-white rounded-3xl overflow-hidden border border-rose-blush/20 shadow-card flex flex-col lg:flex-row min-h-[360px]" data-v-658fdd62><div class="lg:w-1/2 relative min-h-[240px] lg:min-h-[auto] bg-warm-ivory" data-v-658fdd62><img${ssrRenderAttr("src", ((_b = __props.widget) == null ? void 0 : _b.image) || "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80")} alt="Women styling size guide" class="absolute inset-0 w-full h-full object-cover" data-v-658fdd62><div class="absolute inset-0 bg-deep-plum/20" data-v-658fdd62></div></div><div class="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6" data-v-658fdd62><div data-v-658fdd62>`);
      if ((_c = __props.widget) == null ? void 0 : _c.subtitle) {
        _push(`<p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2.5" data-v-658fdd62>${ssrInterpolate(__props.widget.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2${ssrRenderAttr("id", `fit-heading-${(_d = __props.widget) == null ? void 0 : _d.key}`)} class="font-serif text-2xl md:text-3.5xl text-deep-plum font-bold leading-tight" data-v-658fdd62>${ssrInterpolate(((_e = __props.widget) == null ? void 0 : _e.title) || "Calculate Your Perfect Bra Fit")}</h2><p class="text-charcoal/70 text-sm leading-relaxed mt-4" data-v-658fdd62>${ssrInterpolate(((_f = __props.widget) == null ? void 0 : _f.description) || "80% of women wear the wrong bra size. Take our 60-second sizing test to find your exact match and shop with confidence.")}</p></div><div data-v-658fdd62><button class="inline-flex items-center gap-2 px-8 py-3.5 bg-deep-plum text-white rounded-full font-ui font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-plum-800 hover:shadow-lg transition-all duration-250 pulse-button" data-v-658fdd62>${ssrInterpolate(((_h = (_g = __props.widget) == null ? void 0 : _g.items) == null ? void 0 : _h.btnText) || "Start Sizing Test")} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-658fdd62><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" data-v-658fdd62></path></svg></button></div></div></div></div>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Sizing Calculator" data-v-658fdd62><div class="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 border border-rose-blush/20 shadow-xl relative overflow-hidden" data-v-658fdd62><button class="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors p-2" aria-label="Close fit finder" data-v-658fdd62><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-658fdd62><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-658fdd62></path></svg></button><div class="space-y-6" data-v-658fdd62><div class="text-center" data-v-658fdd62><span class="text-xs font-bold uppercase tracking-wider text-dusty-rose bg-rose-blush px-3 py-1 rounded-full" data-v-658fdd62>Fit Finder Quiz</span><h3 class="text-xl font-serif text-deep-plum font-bold mt-2" data-v-658fdd62>Find Your True Size</h3></div>`);
        if (unref(step) === 1) {
          _push(`<div class="space-y-4" data-v-658fdd62><p class="text-xs text-center text-charcoal/60 leading-relaxed" data-v-658fdd62> Step 1: Wrap the tape snug around your ribcage directly under your bust. Keep the tape level. </p><div class="space-y-2" data-v-658fdd62><label class="block text-xs font-semibold text-charcoal/70" data-v-658fdd62>Underbust Measurement (inches)</label><select class="w-full p-3 border border-rose-blush rounded-xl bg-warm-ivory/30 focus:outline-none focus:border-deep-plum text-sm font-medium" data-v-658fdd62><!--[-->`);
          ssrRenderList(unref(underbustRange), (val) => {
            _push(`<option${ssrRenderAttr("value", val)} data-v-658fdd62${ssrIncludeBooleanAttr(Array.isArray(unref(underbust)) ? ssrLooseContain(unref(underbust), val) : ssrLooseEqual(unref(underbust), val)) ? " selected" : ""}>${ssrInterpolate(val)}&quot;</option>`);
          });
          _push(`<!--]--></select></div><button class="w-full py-3 bg-deep-plum text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-plum-800 transition-colors" data-v-658fdd62> Next Step </button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(step) === 2) {
          _push(`<div class="space-y-4" data-v-658fdd62><p class="text-xs text-center text-charcoal/60 leading-relaxed" data-v-658fdd62> Step 2: Wrap the tape loosely around the fullest part of your chest. Make sure the tape is level. </p><div class="space-y-2" data-v-658fdd62><label class="block text-xs font-semibold text-charcoal/70" data-v-658fdd62>Overbust Measurement (inches)</label><select class="w-full p-3 border border-rose-blush rounded-xl bg-warm-ivory/30 focus:outline-none focus:border-deep-plum text-sm font-medium" data-v-658fdd62><!--[-->`);
          ssrRenderList(unref(overbustRange), (val) => {
            _push(`<option${ssrRenderAttr("value", val)} data-v-658fdd62${ssrIncludeBooleanAttr(Array.isArray(unref(overbust)) ? ssrLooseContain(unref(overbust), val) : ssrLooseEqual(unref(overbust), val)) ? " selected" : ""}>${ssrInterpolate(val)}&quot;</option>`);
          });
          _push(`<!--]--></select></div><div class="flex gap-3" data-v-658fdd62><button class="w-1/3 py-3 border border-rose-blush text-charcoal rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-light-gray transition-colors" data-v-658fdd62> Back </button><button class="w-2/3 py-3 bg-deep-plum text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-plum-800 transition-colors" data-v-658fdd62> Find My Size </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(step) === 3) {
          _push(`<div class="text-center space-y-6 py-4" data-v-658fdd62><div class="space-y-1" data-v-658fdd62><p class="text-xs text-charcoal/50 font-bold uppercase tracking-widest" data-v-658fdd62>Recommended Bra Size</p><h4 class="text-4xl md:text-5xl font-serif text-deep-plum font-extrabold tracking-tight scale-in" data-v-658fdd62>${ssrInterpolate(unref(calculatedSize))}</h4></div><div class="bg-rose-blush/35 rounded-2xl p-4 border border-rose-blush/60 space-y-2" data-v-658fdd62><p class="text-xs text-deep-plum font-bold uppercase" data-v-658fdd62>\u{1F381} Unlock Your Comfort Reward</p><p class="text-[11px] text-charcoal/80 leading-relaxed" data-v-658fdd62> Use code <strong class="text-deep-plum select-all" data-v-658fdd62>FITCODE10</strong> at checkout for <strong data-v-658fdd62>10% Off</strong> your perfect fit bra. </p></div><div class="flex flex-col sm:flex-row gap-3 pt-2" data-v-658fdd62><button class="py-3 px-4 border border-rose-blush text-charcoal rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-light-gray transition-colors" data-v-658fdd62> Calculate Again </button>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products?size=${unref(calculatedSize)}`,
            onClick: closeModal,
            class: "flex-1 py-3 px-6 bg-deep-plum text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-plum-800 transition-colors flex items-center justify-center gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Shop ${ssrInterpolate(unref(calculatedSize))} Styles <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-658fdd62${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-v-658fdd62${_scopeId}></path></svg>`);
              } else {
                return [
                  createTextVNode(" Shop " + toDisplayString(unref(calculatedSize)) + " Styles ", 1),
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
                      d: "M14 5l7 7m0 0l-7 7m7-7H3"
                    })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionFitCalculator.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_10 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-658fdd62"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SectionOffersSlider",
  __ssrInlineRender: true,
  props: {
    widget: {}
  },
  setup(__props) {
    const props = __props;
    const offerItems = computed(() => {
      var _a;
      return ((_a = props.widget) == null ? void 0 : _a.items) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section-padding bg-warm-ivory/50",
        "aria-labelledby": `offers-heading-${(_a = __props.widget) == null ? void 0 : _a.key}`
      }, _attrs))}><div class="page-container"><div class="section-heading mb-8">`);
      if ((_b = __props.widget) == null ? void 0 : _b.subtitle) {
        _push(`<p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">${ssrInterpolate(__props.widget.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h2${ssrRenderAttr("id", `offers-heading-${(_c = __props.widget) == null ? void 0 : _c.key}`)} class="font-serif text-2xl md:text-3xl text-deep-plum font-bold">${ssrInterpolate(((_d = __props.widget) == null ? void 0 : _d.title) || "Special Packs & Combos")}</h2>`);
      if ((_e = __props.widget) == null ? void 0 : _e.description) {
        _push(`<p class="text-charcoal/65 mt-1 text-sm">${ssrInterpolate(__props.widget.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex gap-6 overflow-x-auto scrollbar-hide pb-6 pt-2 snap-x snap-mandatory"><!--[-->`);
      ssrRenderList(unref(offerItems), (offer, idx) => {
        _push(`<div class="w-72 sm:w-88 shrink-0 bg-white rounded-2xl border border-rose-blush/20 shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col snap-start group"><div class="relative aspect-[4/3] bg-warm-ivory overflow-hidden"><img${ssrRenderAttr("src", offer.image)}${ssrRenderAttr("alt", offer.title)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">`);
        if (offer.price) {
          _push(`<div class="absolute bottom-3 right-3 bg-deep-plum text-white text-xs font-ui font-bold px-3 py-1.5 rounded-full shadow-md">${ssrInterpolate(offer.price)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="p-5 flex flex-col flex-1 space-y-3"><div><h3 class="font-serif text-charcoal font-semibold text-base group-hover:text-deep-plum transition-colors line-clamp-1">${ssrInterpolate(offer.title)}</h3><p class="text-xs text-charcoal/60 mt-1 line-clamp-2 leading-relaxed">${ssrInterpolate(offer.subtitle)}</p></div><div class="pt-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: offer.link || "/products",
          class: "w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-rose-blush text-deep-plum rounded-xl text-xs font-ui font-semibold hover:bg-deep-plum hover:text-white transition-all duration-250"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Shop Combo Pack <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" Shop Combo Pack "),
                (openBlock(), createBlock("svg", {
                  class: "w-3.5 h-3.5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 8l4 4m0 0l-4 4m4-4H3"
                  })
                ]))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionOffersSlider.vue");
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
      title: "Van Elvina \u2013 Women Comfort First | Premium Innerwear",
      description: "Shop India's most comfortable women's innerwear. Bras, panties, shapewear, sleepwear & activewear. Free shipping above \u20B9999. Easy 30-day returns.",
      ogTitle: "Van Elvina \u2013 Women Comfort First",
      ogDescription: "Premium innerwear for the modern Indian woman. Discover bras, panties, shapewear, and more \u2014 crafted for all-day comfort and elegance.",
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
      const _component_HeroBanner = _sfc_main$d;
      const _component_SectionFeaturedProducts = _sfc_main$c;
      const _component_SectionNewArrivals = _sfc_main$b;
      const _component_SectionEverydayComfort = _sfc_main$a;
      const _component_SectionBestSellers = _sfc_main$9;
      const _component_SectionShopByCategory = _sfc_main$7;
      const _component_SectionCustomerReviews = _sfc_main$6;
      const _component_SectionBrandUSP = _sfc_main$5;
      const _component_SectionPromoGrid = _sfc_main$4;
      const _component_SectionCollectionTabs = __nuxt_component_9;
      const _component_SectionFitCalculator = __nuxt_component_10;
      const _component_SectionOffersSlider = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><!--[-->`);
      ssrRenderList(unref(activeWidgets), (widget) => {
        var _a;
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
        } else if (widget.type === "promo-grid") {
          _push(ssrRenderComponent(_component_SectionPromoGrid, { widget }, null, _parent));
        } else if (widget.type === "collection-tabs") {
          _push(ssrRenderComponent(_component_SectionCollectionTabs, { widget }, null, _parent));
        } else if (widget.type === "fit-calculator") {
          _push(ssrRenderComponent(_component_SectionFitCalculator, { widget }, null, _parent));
        } else if (widget.type === "offers-slider") {
          _push(ssrRenderComponent(_component_SectionOffersSlider, { widget }, null, _parent));
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
          _push(`<section class="section-padding bg-warm-ivory"><div class="page-container">${(_a = widget.description) != null ? _a : ""}</div></section>`);
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

export { _sfc_main as default };
//# sourceMappingURL=index-BSTFIpY8.mjs.map
