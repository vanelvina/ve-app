import { _ as __nuxt_component_1$1 } from './nuxt-link-CUeF3yRu.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, ref, computed, watch, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { c as categoriesData } from './categories-Cn3mOoH3.mjs';
import { u as useUIStore } from './ui-De1hAQUT.mjs';
import { u as useCartStore } from './cart-ZOlaOW26.mjs';
import { b as useWishlistStore, a as _sfc_main$8, _ as _sfc_main$1$1 } from './products-Bors2uVq.mjs';
import { _ as _export_sfc } from './server.mjs';
import { f as formatPrice } from './formatters-CRqlhyd1.mjs';
import { u as useProducts } from './useProducts-B0vDGKs3.mjs';
import { _ as _sfc_main$7 } from './AppButton-f0i-AWLW.mjs';
import { u as useCart } from './useCart-B731HVld.mjs';
import { _ as __nuxt_component_6 } from './ToastNotifications-CIWmlby1.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'pinia';
import 'vue-router';

const _imports_0 = publicAssetsURL("/logo.png");
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TheNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    useUIStore();
    const cart = useCartStore();
    const wishlist = useWishlistStore();
    const navCategories = categoriesData.slice(0, 6);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: "sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-navbar",
        role: "banner"
      }, _attrs))}><div class="page-container"><nav class="flex items-center h-16 gap-4" aria-label="Main navigation"><button class="btn-icon md:hidden shrink-0" aria-label="Open menu" aria-expanded="ui.mobileMenuOpen" aria-controls="mobile-menu"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex flex-col items-center justify-center shrink-0",
        "aria-label": "Van Elvina \u2013 Home"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="Van Elvina Logo" class="h-9 md:h-11 w-auto object-contain"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "Van Elvina Logo",
                class: "h-9 md:h-11 w-auto object-contain"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden lg:flex items-center gap-0 ml-6 flex-1" aria-label="Category navigation"><!--[-->`);
      ssrRenderList(unref(navCategories), (cat) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: cat.slug,
          to: `/products?category=${cat.slug}`,
          class: "px-3 py-1.5 text-sm font-ui text-charcoal hover:text-deep-plum hover:bg-rose-blush rounded-lg transition-all duration-200 whitespace-nowrap",
          "active-class": "text-deep-plum font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(cat.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(cat.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products?badge=sale",
        class: "px-3 py-1.5 text-sm font-ui font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sale \u{1F525} `);
          } else {
            return [
              createTextVNode(" Sale \u{1F525} ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex-1 lg:flex-none"></div><div class="hidden md:flex items-center flex-1 max-w-xs xl:max-w-sm relative"><button class="w-full flex items-center gap-2 px-4 py-2 bg-light-gray rounded-full text-sm text-mid-gray font-ui hover:bg-rose-blush transition-colors duration-200" aria-label="Search products"><svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><span>Search bras, panties...</span></button></div><div class="flex items-center gap-1"><button class="btn-icon md:hidden" aria-label="Search"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/wishlist",
        class: "btn-icon relative",
        "aria-label": "Wishlist"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"${_scopeId}></path></svg>`);
            if (unref(wishlist).count > 0) {
              _push2(`<span class="absolute -top-1 -right-1 w-4 h-4 bg-dusty-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center" aria-label="\`\${wishlist.count} items in wishlist\`"${_scopeId}>${ssrInterpolate(unref(wishlist).count)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                })
              ])),
              unref(wishlist).count > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute -top-1 -right-1 w-4 h-4 bg-dusty-rose text-white text-[9px] font-bold rounded-full flex items-center justify-center",
                "aria-label": "`${wishlist.count} items in wishlist`"
              }, toDisplayString(unref(wishlist).count), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/account",
        class: "btn-icon hidden sm:flex",
        "aria-label": "My account"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cart",
        class: "btn-icon relative",
        "aria-label": "Shopping cart"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"${_scopeId}></path></svg>`);
            if (unref(cart).count > 0) {
              _push2(`<span class="absolute -top-1 -right-1 w-4 h-4 bg-deep-plum text-white text-[9px] font-bold rounded-full flex items-center justify-center" aria-label="\`\${cart.count} items in cart\`"${_scopeId}>${ssrInterpolate(unref(cart).count)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                })
              ])),
              unref(cart).count > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute -top-1 -right-1 w-4 h-4 bg-deep-plum text-white text-[9px] font-bold rounded-full flex items-center justify-center",
                "aria-label": "`${cart.count} items in cart`"
              }, toDisplayString(unref(cart).count), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav></div></header>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/TheNavbar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "MobileMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const ui = useUIStore();
    const categories = categoriesData;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<!--[-->`);
      if (unref(ui).mobileMenuOpen) {
        _push(`<div class="overlay-backdrop md:hidden" aria-hidden="true" data-v-ea5a37c6></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(ui).mobileMenuOpen) {
        _push(`<aside id="mobile-menu" class="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-modal flex flex-col md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu" data-v-ea5a37c6><div class="flex items-center justify-between px-5 py-4 border-b border-border-gray" data-v-ea5a37c6><span class="font-serif text-deep-plum text-lg font-bold" data-v-ea5a37c6>Van Elvina</span><button class="btn-icon" aria-label="Close menu" data-v-ea5a37c6><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-ea5a37c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-ea5a37c6></path></svg></button></div><nav class="flex-1 overflow-y-auto px-4 py-4 space-y-1" aria-label="Mobile navigation" data-v-ea5a37c6><!--[-->`);
        ssrRenderList(unref(categories), (cat) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: cat.slug,
            to: `/products?category=${cat.slug}`,
            class: "flex items-center justify-between px-3 py-3 rounded-xl text-charcoal font-ui text-sm hover:bg-rose-blush hover:text-deep-plum transition-colors",
            "active-class": "bg-rose-blush text-deep-plum font-medium",
            onClick: unref(ui).closeMobileMenu
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-ea5a37c6${_scopeId}>${ssrInterpolate(cat.name)}</span><span class="text-xs text-mid-gray" data-v-ea5a37c6${_scopeId}>${ssrInterpolate(cat.productCount)}+</span>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(cat.name), 1),
                  createVNode("span", { class: "text-xs text-mid-gray" }, toDisplayString(cat.productCount) + "+", 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><div class="border-t border-border-gray my-3" data-v-ea5a37c6></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products?badge=sale",
          class: "flex items-center px-3 py-3 rounded-xl font-ui text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors",
          onClick: unref(ui).closeMobileMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F525} Sale `);
            } else {
              return [
                createTextVNode(" \u{1F525} Sale ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products?badge=new",
          class: "flex items-center px-3 py-3 rounded-xl font-ui text-sm font-medium text-deep-plum hover:bg-rose-blush transition-colors",
          onClick: unref(ui).closeMobileMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u2728 New Arrivals `);
            } else {
              return [
                createTextVNode(" \u2728 New Arrivals ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</nav><div class="border-t border-border-gray px-4 py-4 space-y-2" data-v-ea5a37c6>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/account",
          class: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-ui text-charcoal hover:bg-rose-blush hover:text-deep-plum transition-colors",
          onClick: unref(ui).closeMobileMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-ea5a37c6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-ea5a37c6${_scopeId}></path></svg> My Account `);
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
                    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  })
                ])),
                createTextVNode(" My Account ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/wishlist",
          class: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-ui text-charcoal hover:bg-rose-blush hover:text-deep-plum transition-colors",
          onClick: unref(ui).closeMobileMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-ea5a37c6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-ea5a37c6${_scopeId}></path></svg> Wishlist `);
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
                    d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  })
                ])),
                createTextVNode(" Wishlist ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/MobileMenu.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-ea5a37c6"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SearchOverlay",
  __ssrInlineRender: true,
  setup(__props) {
    const ui = useUIStore();
    const { searchProducts } = useProducts();
    const searchInput = ref(null);
    const query = ref("");
    const results = computed(() => query.value.length > 1 ? searchProducts(query.value) : []);
    const popularSearches = ["Cotton Bra", "Push-Up", "Seamless", "Sports Bra", "Lace Brief", "Nursing Bra", "Shapewear", "Bamboo"];
    watch(() => ui.searchOverlayOpen, (open) => {
      if (open) {
        nextTick(() => {
          var _a;
          return (_a = searchInput.value) == null ? void 0 : _a.focus();
        });
        query.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1$1;
      if (unref(ui).searchOverlayOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Search"
        }, _attrs))} data-v-2b16b8a4><div class="w-full max-w-xl bg-white rounded-2xl shadow-modal animate-slide-up overflow-hidden" data-v-2b16b8a4><div class="flex items-center gap-3 px-5 py-4 border-b border-border-gray" data-v-2b16b8a4><svg class="w-5 h-5 text-dusty-rose shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-2b16b8a4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-2b16b8a4></path></svg><input${ssrRenderAttr("value", unref(query))} type="search" placeholder="Search bras, panties, sleepwear..." class="flex-1 text-base font-ui text-charcoal bg-transparent outline-none placeholder-mid-gray" autocomplete="off" aria-label="Search products" data-v-2b16b8a4><button class="text-mid-gray hover:text-charcoal" aria-label="Clear search" data-v-2b16b8a4>`);
        if (unref(query)) {
          _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-2b16b8a4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-2b16b8a4></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button><button class="text-xs font-ui text-mid-gray hover:text-deep-plum ml-2" data-v-2b16b8a4> Close </button></div><div class="max-h-80 overflow-y-auto" data-v-2b16b8a4>`);
        if (unref(query).length > 1) {
          _push(`<!--[-->`);
          if (unref(results).length) {
            _push(`<div class="p-3 space-y-1" data-v-2b16b8a4><!--[-->`);
            ssrRenderList(unref(results), (product) => {
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: product.id,
                to: `/products/${product.slug}`,
                class: "flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-blush transition-colors group",
                onClick: unref(ui).closeSearch
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  var _a, _b;
                  if (_push2) {
                    _push2(`<img${ssrRenderAttr("src", (_a = product.variants[0]) == null ? void 0 : _a.images[0])}${ssrRenderAttr("alt", product.name)} class="w-10 h-10 object-cover rounded-lg shrink-0" width="40" height="40" data-v-2b16b8a4${_scopeId}><div class="min-w-0" data-v-2b16b8a4${_scopeId}><p class="text-sm font-ui font-medium text-charcoal group-hover:text-deep-plum truncate" data-v-2b16b8a4${_scopeId}>${ssrInterpolate(product.name)}</p><p class="text-xs text-dusty-rose font-ui" data-v-2b16b8a4${_scopeId}>${ssrInterpolate(product.category)} \xB7 ${ssrInterpolate(unref(formatPrice)(product.price))}</p></div>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: (_b = product.variants[0]) == null ? void 0 : _b.images[0],
                        alt: product.name,
                        class: "w-10 h-10 object-cover rounded-lg shrink-0",
                        width: "40",
                        height: "40"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "min-w-0" }, [
                        createVNode("p", { class: "text-sm font-ui font-medium text-charcoal group-hover:text-deep-plum truncate" }, toDisplayString(product.name), 1),
                        createVNode("p", { class: "text-xs text-dusty-rose font-ui" }, toDisplayString(product.category) + " \xB7 " + toDisplayString(unref(formatPrice)(product.price)), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<div class="py-10 text-center text-mid-gray font-ui text-sm" data-v-2b16b8a4> No results for &quot;${ssrInterpolate(unref(query))}&quot; </div>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<div class="p-4" data-v-2b16b8a4><p class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3" data-v-2b16b8a4>Popular Searches</p><div class="flex flex-wrap gap-2" data-v-2b16b8a4><!--[-->`);
          ssrRenderList(popularSearches, (term) => {
            _push(`<button class="filter-chip" data-v-2b16b8a4>${ssrInterpolate(term)}</button>`);
          });
          _push(`<!--]--></div></div>`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/SearchOverlay.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-2b16b8a4"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "QuickViewModal",
  __ssrInlineRender: true,
  setup(__props) {
    const ui = useUIStore();
    const { getBySlug } = useProducts();
    const { addToCart } = useCart();
    const product = computed(
      () => ui.quickViewProductSlug ? getBySlug(ui.quickViewProductSlug) : null
    );
    const selectedVariant = ref(0);
    const selectedSize = ref("");
    watch(() => ui.quickViewProductSlug, () => {
      selectedVariant.value = 0;
      selectedSize.value = "";
    });
    const handleAddToCart = () => {
      if (!product.value || !selectedSize.value) return;
      const variant = product.value.variants[selectedVariant.value];
      addToCart(product.value, variant.color, selectedSize.value);
      ui.closeQuickView();
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_AppRating = _sfc_main$8;
      const _component_AppBadge = _sfc_main$1$1;
      const _component_AppButton = _sfc_main$7;
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<!--[-->`);
      if (unref(product)) {
        _push(`<div class="overlay-backdrop" aria-hidden="true" data-v-9437d48b></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(product)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", `Quick view: ${unref(product).name}`)} data-v-9437d48b><div class="relative w-full max-w-3xl bg-white rounded-2xl shadow-modal overflow-hidden max-h-[90vh] flex flex-col md:flex-row" data-v-9437d48b><button class="absolute top-4 right-4 z-10 btn-icon bg-white shadow-sm" aria-label="Close quick view" data-v-9437d48b><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-9437d48b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-9437d48b></path></svg></button><div class="w-full md:w-2/5 shrink-0 aspect-product bg-light-gray overflow-hidden" data-v-9437d48b><img${ssrRenderAttr("src", (_a = unref(product).variants[unref(selectedVariant)]) == null ? void 0 : _a.images[0])}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-cover" width="400" height="533" data-v-9437d48b></div><div class="flex-1 overflow-y-auto p-5 md:p-7" data-v-9437d48b><p class="text-xs text-dusty-rose font-ui font-medium uppercase tracking-wider mb-1" data-v-9437d48b>${ssrInterpolate(unref(product).category)}</p><h2 class="font-serif text-xl text-deep-plum font-semibold mb-2" data-v-9437d48b>${ssrInterpolate(unref(product).name)}</h2>`);
        _push(ssrRenderComponent(_component_AppRating, {
          rating: unref(product).rating,
          count: unref(product).reviewCount,
          "show-count": "",
          class: "mb-3"
        }, null, _parent));
        _push(`<div class="flex items-center gap-3 mb-4" data-v-9437d48b><span class="text-2xl font-semibold text-charcoal font-sans" data-v-9437d48b>${ssrInterpolate(unref(formatPrice)(unref(product).price))}</span>`);
        if (unref(product).originalPrice > unref(product).price) {
          _push(`<span class="text-sm text-mid-gray line-through font-ui" data-v-9437d48b>${ssrInterpolate(unref(formatPrice)(unref(product).originalPrice))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).discount) {
          _push(ssrRenderComponent(_component_AppBadge, {
            label: `${unref(product).discount}% OFF`,
            variant: "sale"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mb-3" data-v-9437d48b><p class="text-xs font-ui font-semibold text-charcoal uppercase tracking-wider mb-2" data-v-9437d48b> Color: <span class="normal-case font-normal text-mid-gray" data-v-9437d48b>${ssrInterpolate((_b = unref(product).variants[unref(selectedVariant)]) == null ? void 0 : _b.color)}</span></p><div class="flex gap-2" data-v-9437d48b><!--[-->`);
        ssrRenderList(unref(product).variants, (variant, idx) => {
          _push(`<button class="${ssrRenderClass([unref(selectedVariant) === idx ? "border-deep-plum scale-110 shadow-md" : "border-white shadow-sm hover:scale-105", "w-7 h-7 rounded-full border-2 transition-all duration-200 cursor-pointer"])}" style="${ssrRenderStyle({ backgroundColor: variant.colorHex })}"${ssrRenderAttr("aria-label", variant.color)}${ssrRenderAttr("aria-pressed", unref(selectedVariant) === idx)} data-v-9437d48b></button>`);
        });
        _push(`<!--]--></div></div><div class="mb-4" data-v-9437d48b><p class="text-xs font-ui font-semibold text-charcoal uppercase tracking-wider mb-2" data-v-9437d48b>Size</p><div class="flex flex-wrap gap-2" data-v-9437d48b><!--[-->`);
        ssrRenderList((_c = unref(product).variants[unref(selectedVariant)]) == null ? void 0 : _c.sizes, (size) => {
          _push(`<button class="${ssrRenderClass([unref(selectedSize) === size ? "border-deep-plum bg-deep-plum text-white" : "border-border-gray text-charcoal hover:border-dusty-rose", "min-w-[42px] px-3 py-1.5 border rounded text-xs font-ui font-medium transition-all duration-200 cursor-pointer"])}"${ssrRenderAttr("aria-pressed", unref(selectedSize) === size)} data-v-9437d48b>${ssrInterpolate(size)}</button>`);
        });
        _push(`<!--]--></div></div><div class="flex gap-3" data-v-9437d48b>`);
        _push(ssrRenderComponent(_component_AppButton, {
          full: true,
          size: "lg",
          disabled: !unref(selectedSize),
          onClick: handleAddToCart
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(selectedSize) ? "Add to Cart" : "Select Size")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(selectedSize) ? "Add to Cart" : "Select Size"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/products/${unref(product).slug}`,
          class: "btn-secondary px-4 shrink-0 text-sm",
          onClick: unref(ui).closeQuickView
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View Details `);
            } else {
              return [
                createTextVNode(" View Details ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/QuickViewModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-9437d48b"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SizeGuideModal",
  __ssrInlineRender: true,
  setup(__props) {
    const ui = useUIStore();
    const tabs = ["Bra", "Panty", "How to Measure"];
    const activeTab = ref("Bra");
    const braHeaders = ["Size", "Band (inches)", "Bust (inches)", "Cup"];
    const braSizes = [
      ["30A", "27-28", "31-32", "A"],
      ["30B", "27-28", "32-33", "B"],
      ["32B", "29-30", "34-35", "B"],
      ["32C", "29-30", "35-36", "C"],
      ["34B", "31-32", "36-37", "B"],
      ["34C", "31-32", "37-38", "C"],
      ["34D", "31-32", "38-39", "D"],
      ["36B", "33-34", "38-39", "B"],
      ["36C", "33-34", "39-40", "C"],
      ["36D", "33-34", "40-41", "D"],
      ["38C", "35-36", "41-42", "C"],
      ["38D", "35-36", "42-43", "D"]
    ];
    const pantyHeaders = ["Size", "Waist (inches)", "Hip (inches)"];
    const pantySizes = [
      ["XS", "24-26", "34-36"],
      ["S", "26-28", "36-38"],
      ["M", "28-30", "38-40"],
      ["L", "30-32", "40-42"],
      ["XL", "32-34", "42-44"],
      ["XXL", "34-36", "44-46"],
      ["3XL", "36-38", "46-48"]
    ];
    const measureSteps = [
      { icon: "\u{1F4CF}", title: "Band Size", desc: "Wrap a measuring tape snugly around your ribcage, directly below your bust. Round to the nearest even number. This is your band size." },
      { icon: "\u{1F380}", title: "Bust Size", desc: "Measure around the fullest part of your bust, keeping the tape parallel to the ground. Do not pull too tight." },
      { icon: "\u2728", title: "Cup Size", desc: 'Subtract your band size from your bust measurement. The difference determines your cup: 1" = A, 2" = B, 3" = C, 4" = D.' },
      { icon: "\u{1F4A1}", title: "Pro Tip", desc: "If you are between sizes, we recommend sizing up. For bralettes and wire-free styles, choose your usual panty/clothing size." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (unref(ui).sizeGuideOpen) {
        _push(`<div class="overlay-backdrop" aria-hidden="true" data-v-1abf1660></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(ui).sizeGuideOpen) {
        _push(`<div class="fixed inset-0 z-50 flex items-end md:items-center justify-center px-4 pb-0 md:py-8" role="dialog" aria-modal="true" aria-label="Size guide" data-v-1abf1660><div class="w-full max-w-2xl bg-white rounded-t-3xl md:rounded-2xl shadow-modal overflow-hidden max-h-[90vh] flex flex-col" data-v-1abf1660><div class="flex items-center justify-between px-6 py-4 border-b border-border-gray shrink-0" data-v-1abf1660><h2 class="font-serif text-lg text-deep-plum font-semibold" data-v-1abf1660>Size Guide</h2><button class="btn-icon" aria-label="Close size guide" data-v-1abf1660><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-1abf1660><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-1abf1660></path></svg></button></div><div class="flex border-b border-border-gray shrink-0" data-v-1abf1660><!--[-->`);
        ssrRenderList(tabs, (tab) => {
          _push(`<button class="${ssrRenderClass([unref(activeTab) === tab ? "text-deep-plum border-b-2 border-deep-plum" : "text-mid-gray hover:text-charcoal", "flex-1 py-3 text-sm font-ui font-medium transition-colors"])}"${ssrRenderAttr("aria-selected", unref(activeTab) === tab)} data-v-1abf1660>${ssrInterpolate(tab)}</button>`);
        });
        _push(`<!--]--></div><div class="flex-1 overflow-y-auto p-6" data-v-1abf1660>`);
        if (unref(activeTab) === "Bra") {
          _push(`<div class="space-y-4" data-v-1abf1660><p class="text-sm text-mid-gray font-ui mb-4" data-v-1abf1660>Measurements in inches. Measure your band (under bust) and cup (fullest point).</p><div class="overflow-x-auto rounded-xl border border-border-gray" data-v-1abf1660><table class="w-full text-sm font-ui" data-v-1abf1660><thead class="bg-rose-blush" data-v-1abf1660><tr data-v-1abf1660><!--[-->`);
          ssrRenderList(braHeaders, (h) => {
            _push(`<th class="px-4 py-2.5 text-left text-xs font-semibold text-deep-plum uppercase tracking-wider" data-v-1abf1660>${ssrInterpolate(h)}</th>`);
          });
          _push(`<!--]--></tr></thead><tbody class="divide-y divide-border-gray" data-v-1abf1660><!--[-->`);
          ssrRenderList(braSizes, (row) => {
            _push(`<tr class="hover:bg-light-gray transition-colors" data-v-1abf1660><!--[-->`);
            ssrRenderList(row, (cell, i) => {
              _push(`<td class="px-4 py-2.5 text-charcoal" data-v-1abf1660>${ssrInterpolate(cell)}</td>`);
            });
            _push(`<!--]--></tr>`);
          });
          _push(`<!--]--></tbody></table></div></div>`);
        } else if (unref(activeTab) === "Panty") {
          _push(`<div class="space-y-4" data-v-1abf1660><p class="text-sm text-mid-gray font-ui mb-4" data-v-1abf1660>Measurements in inches. Measure your waist and hips at the widest point.</p><div class="overflow-x-auto rounded-xl border border-border-gray" data-v-1abf1660><table class="w-full text-sm font-ui" data-v-1abf1660><thead class="bg-rose-blush" data-v-1abf1660><tr data-v-1abf1660><!--[-->`);
          ssrRenderList(pantyHeaders, (h) => {
            _push(`<th class="px-4 py-2.5 text-left text-xs font-semibold text-deep-plum uppercase tracking-wider" data-v-1abf1660>${ssrInterpolate(h)}</th>`);
          });
          _push(`<!--]--></tr></thead><tbody class="divide-y divide-border-gray" data-v-1abf1660><!--[-->`);
          ssrRenderList(pantySizes, (row) => {
            _push(`<tr class="hover:bg-light-gray transition-colors" data-v-1abf1660><!--[-->`);
            ssrRenderList(row, (cell, i) => {
              _push(`<td class="px-4 py-2.5 text-charcoal" data-v-1abf1660>${ssrInterpolate(cell)}</td>`);
            });
            _push(`<!--]--></tr>`);
          });
          _push(`<!--]--></tbody></table></div></div>`);
        } else {
          _push(`<div class="space-y-4" data-v-1abf1660><!--[-->`);
          ssrRenderList(measureSteps, (step) => {
            _push(`<div class="flex gap-4 p-4 bg-rose-blush/50 rounded-xl" data-v-1abf1660><span class="text-2xl shrink-0" data-v-1abf1660>${ssrInterpolate(step.icon)}</span><div data-v-1abf1660><h4 class="font-ui font-semibold text-deep-plum text-sm mb-1" data-v-1abf1660>${ssrInterpolate(step.title)}</h4><p class="text-xs text-mid-gray leading-relaxed" data-v-1abf1660>${ssrInterpolate(step.desc)}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/SizeGuideModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1abf1660"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TheFooter",
  __ssrInlineRender: true,
  setup(__props) {
    useUIStore();
    const email = ref("");
    const subscribing = ref(false);
    const socials = [
      { name: "Instagram", icon: "\u{1F4F8}", url: "https://instagram.com/vanelvina" },
      { name: "Facebook", icon: "\u{1F44D}", url: "https://facebook.com/vanelvina" },
      { name: "Pinterest", icon: "\u{1F4CC}", url: "https://pinterest.com/vanelvina" },
      { name: "YouTube", icon: "\u25B6\uFE0F", url: "https://youtube.com/vanelvina" }
    ];
    const shopLinks = [
      { label: "Bras", href: "/products?category=bras" },
      { label: "Panties", href: "/products?category=panties" },
      { label: "Shapewear", href: "/products?category=shapewear" },
      { label: "Sleepwear", href: "/products?category=sleepwear" },
      { label: "Activewear", href: "/products?category=activewear" },
      { label: "New Arrivals", href: "/products?badge=new" },
      { label: "Sale", href: "/products?badge=sale" }
    ];
    const helpLinks = [
      { label: "Size Guide", href: "/size-guide" },
      { label: "FAQs", href: "/faqs" },
      { label: "Track Order", href: "/track-order" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Contact Us", href: "/contact" }
    ];
    const policies = [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Return Policy", href: "/returns" },
      { label: "Sitemap", href: "/sitemap" }
    ];
    const trustBadges = ["100% Secure", "OEKO-TEX\xAE", "ISO Certified", "Easy Returns"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppButton = _sfc_main$7;
      const _component_NuxtLink = __nuxt_component_1$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({
        class: "bg-charcoal text-white",
        role: "contentinfo"
      }, _attrs))}><div class="bg-deep-plum"><div class="page-container py-10 flex flex-col md:flex-row items-center justify-between gap-6"><div class="text-center md:text-left"><h3 class="font-serif text-xl text-white font-semibold mb-1">Join the Van Elvina Circle</h3><p class="text-rose-blush/80 text-sm font-ui">Get 10% off your first order + early access to sales &amp; new collections.</p></div><form class="flex w-full max-w-md gap-2" novalidate aria-label="Newsletter signup"><label for="footer-email" class="sr-only">Email address</label><input id="footer-email"${ssrRenderAttr("value", unref(email))} type="email" placeholder="Enter your email" class="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 font-ui text-sm focus:outline-none focus:border-white/60 transition-colors" required aria-required="true">`);
      _push(ssrRenderComponent(_component_AppButton, {
        type: "submit",
        variant: "gold",
        size: "md",
        loading: unref(subscribing)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Subscribe `);
          } else {
            return [
              createTextVNode(" Subscribe ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div><div class="page-container py-12"><div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10"><div class="col-span-2 md:col-span-1"><div class="flex flex-col items-start gap-1 mb-4"><img${ssrRenderAttr("src", _imports_0)} alt="Van Elvina Logo" class="h-9 w-auto object-contain brightness-0 invert"></div><p class="text-sm text-white/65 font-ui leading-relaxed mb-5"> Premium innerwear crafted for the modern Indian woman \u2014 where elegance meets everyday comfort. </p><div class="flex items-center gap-3"><!--[-->`);
      ssrRenderList(socials, (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/10 hover:bg-dusty-rose flex items-center justify-center transition-colors duration-250"${ssrRenderAttr("aria-label", `Follow Van Elvina on ${social.name}`)}><span class="text-sm" aria-hidden="true">${ssrInterpolate(social.icon)}</span></a>`);
      });
      _push(`<!--]--></div></div><div><h4 class="font-ui font-semibold text-white text-sm uppercase tracking-wider mb-4">Shop</h4><ul class="space-y-2.5"><!--[-->`);
      ssrRenderList(shopLinks, (link) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.href,
          class: "text-sm text-white/65 hover:text-dusty-rose font-ui transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div><h4 class="font-ui font-semibold text-white text-sm uppercase tracking-wider mb-4">Help</h4><ul class="space-y-2.5"><!--[-->`);
      ssrRenderList(helpLinks, (link) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.href,
          class: "text-sm text-white/65 hover:text-dusty-rose font-ui transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div><h4 class="font-ui font-semibold text-white text-sm uppercase tracking-wider mb-4">Contact</h4><ul class="space-y-3"><li class="flex items-start gap-2 text-sm text-white/65 font-ui"><span class="shrink-0 mt-0.5" aria-hidden="true">\u{1F4DE}</span><span>1800-XXX-XXXX<br><span class="text-xs text-white/40">Mon\u2013Sat, 9am\u20137pm</span></span></li><li class="flex items-start gap-2 text-sm text-white/65 font-ui"><span class="shrink-0 mt-0.5" aria-hidden="true">\u2709\uFE0F</span><a href="mailto:support@vanelvina.com" class="hover:text-dusty-rose transition-colors"> support@vanelvina.com </a></li><li class="flex items-start gap-2 text-sm text-white/65 font-ui"><span class="shrink-0 mt-0.5" aria-hidden="true">\u{1F4AC}</span><a href="#" class="hover:text-dusty-rose transition-colors">Live Chat</a></li></ul><div class="mt-5 flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(trustBadges, (badge) => {
        _push(`<div class="px-2 py-1 bg-white/10 rounded text-[10px] text-white/60 font-ui">${ssrInterpolate(badge)}</div>`);
      });
      _push(`<!--]--></div></div></div><div class="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 font-ui"><p>\xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Van Elvina. All rights reserved.</p><div class="flex flex-wrap justify-center gap-4"><!--[-->`);
      ssrRenderList(policies, (policy) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: policy.label,
          to: policy.href,
          class: "hover:text-white/70 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(policy.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(policy.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="flex items-center gap-2 flex-wrap justify-center md:justify-end"><span>Made with \u2764\uFE0F in India</span><span class="text-white/20">\u2022</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/login",
        class: "hover:text-white/70 transition-colors font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Admin Portal`);
          } else {
            return [
              createTextVNode("Admin Portal")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/TheFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TheNavbar = _sfc_main$6;
      const _component_MobileMenu = __nuxt_component_1;
      const _component_SearchOverlay = __nuxt_component_2;
      const _component_QuickViewModal = __nuxt_component_3;
      const _component_SizeGuideModal = __nuxt_component_4;
      const _component_TheFooter = _sfc_main$1;
      const _component_ToastNotifications = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-warm-ivory" }, _attrs))}><div class="bg-deep-plum text-white text-center text-xs py-2 px-4 font-ui tracking-wide"> \u{1F389} Free shipping on orders above \u20B9999 \xA0|\xA0 Use code <span class="font-semibold underline cursor-pointer">ELVINA10</span> for 10% off </div>`);
      _push(ssrRenderComponent(_component_TheNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_MobileMenu, null, null, _parent));
      _push(ssrRenderComponent(_component_SearchOverlay, null, null, _parent));
      _push(ssrRenderComponent(_component_QuickViewModal, null, null, _parent));
      _push(ssrRenderComponent(_component_SizeGuideModal, null, null, _parent));
      _push(`<main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_TheFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_ToastNotifications, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-CXWegLGN.mjs.map
