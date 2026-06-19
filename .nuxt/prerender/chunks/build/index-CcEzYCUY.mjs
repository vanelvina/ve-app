import { _ as __nuxt_component_1 } from './nuxt-link-D2oXBkcL.mjs';
import { u as useProductsStore, _ as _sfc_main$1 } from './products-DbFjrDEZ.mjs';
import { _ as _sfc_main$2 } from './ProductCard-duDewXZZ.mjs';
import { _ as _sfc_main$3 } from './AppButton-f0i-AWLW.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'file://C:/Projects/Website/ve-app/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrLooseEqual, ssrRenderClass } from 'file://C:/Projects/Website/ve-app/node_modules/vue/server-renderer/index.mjs';
import { c as categoriesData } from './categories-Cn3mOoH3.mjs';
import { u as useUIStore } from './ui-De1hAQUT.mjs';
import { u as useSeoMeta } from './v3-B1OjdVjd.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/ufo/dist/index.mjs';
import './cart-BC2fjYev.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/pinia/dist/pinia.prod.cjs';
import '../_/renderer.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/destr/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/hookable/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/ofetch/dist/node.mjs';
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
import 'file://C:/Projects/Website/ve-app/node_modules/vue-router/vue-router.node.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useProductsStore();
    const ui = useUIStore();
    const categories = categoriesData;
    const selectedCategories = ref([]);
    const priceRange = ref([0, 2e3]);
    const selectedRating = ref(null);
    const inStockOnly = ref(false);
    const sortValue = ref("popularity");
    const hasActiveFilters = computed(() => selectedCategories.value.length > 0);
    watch([selectedCategories, priceRange, selectedRating, inStockOnly], () => {
      store.setFilters({
        categories: selectedCategories.value,
        priceRange: priceRange.value,
        rating: selectedRating.value,
        inStock: inStockOnly.value
      });
    }, { deep: true });
    watch(sortValue, (val) => store.setSort(val));
    useSeoMeta({
      title: "All Products \u2013 Van Elvina | Premium Women's Innerwear",
      description: "Browse our complete collection of premium women's innerwear \u2014 bras, panties, shapewear, sleepwear, activewear, and maternity. Shop now with free shipping above \u20B9999."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_AppRating = _sfc_main$1;
      const _component_ProductCard = _sfc_main$2;
      const _component_AppButton = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-warm-ivory" }, _attrs))} data-v-9cf4160f><div class="bg-white border-b border-border-gray" data-v-9cf4160f><div class="page-container py-3" data-v-9cf4160f><nav aria-label="Breadcrumb" data-v-9cf4160f><ol class="flex items-center gap-2 text-xs font-ui text-mid-gray" data-v-9cf4160f><li data-v-9cf4160f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-deep-plum"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li aria-hidden="true" data-v-9cf4160f>/</li><li class="text-charcoal font-medium" data-v-9cf4160f>All Products</li></ol></nav></div></div><div class="page-container py-6" data-v-9cf4160f><div class="flex gap-6" data-v-9cf4160f><aside class="hidden lg:block w-64 shrink-0" aria-label="Product filters" data-v-9cf4160f><div class="sticky top-24 bg-white rounded-2xl shadow-soft p-5 border border-border-gray" data-v-9cf4160f><div class="flex items-center justify-between mb-5" data-v-9cf4160f><h2 class="font-ui font-semibold text-charcoal" data-v-9cf4160f>Filters</h2><button class="text-xs text-dusty-rose font-ui hover:text-deep-plum" data-v-9cf4160f> Clear All </button></div><div class="mb-6" data-v-9cf4160f><h3 class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3" data-v-9cf4160f>Category</h3><div class="space-y-2" data-v-9cf4160f><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<label class="flex items-center gap-2.5 cursor-pointer group" data-v-9cf4160f><input type="checkbox"${ssrRenderAttr("value", cat.name)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategories)) ? ssrLooseContain(unref(selectedCategories), cat.name) : unref(selectedCategories)) ? " checked" : ""} class="w-4 h-4 rounded border-border-gray text-deep-plum focus:ring-dusty-rose"${ssrRenderAttr("aria-label", cat.name)} data-v-9cf4160f><span class="text-sm font-ui text-charcoal group-hover:text-deep-plum transition-colors" data-v-9cf4160f>${ssrInterpolate(cat.name)}</span><span class="ml-auto text-xs text-mid-gray" data-v-9cf4160f>${ssrInterpolate(cat.productCount)}</span></label>`);
      });
      _push(`<!--]--></div></div><div class="mb-6" data-v-9cf4160f><h3 class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3" data-v-9cf4160f> Price: \u20B9${ssrInterpolate(unref(priceRange)[0])} \u2013 \u20B9${ssrInterpolate(unref(priceRange)[1])}</h3><input type="range" min="0" max="2000" step="50"${ssrRenderAttr("value", unref(priceRange)[1])} class="w-full accent-deep-plum"${ssrRenderAttr("aria-label", `Maximum price: \u20B9${unref(priceRange)[1]}`)} data-v-9cf4160f></div><div class="mb-6" data-v-9cf4160f><h3 class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3" data-v-9cf4160f>Min Rating</h3><div class="space-y-2" data-v-9cf4160f><!--[-->`);
      ssrRenderList([4, 3, 2], (r) => {
        _push(`<label class="flex items-center gap-2.5 cursor-pointer" data-v-9cf4160f><input type="radio"${ssrRenderAttr("value", r)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedRating), r)) ? " checked" : ""} name="rating" class="w-4 h-4 text-deep-plum"${ssrRenderAttr("aria-label", `${r} stars and above`)} data-v-9cf4160f>`);
        _push(ssrRenderComponent(_component_AppRating, { rating: r }, null, _parent));
        _push(`<span class="text-xs text-mid-gray font-ui" data-v-9cf4160f>&amp; above</span></label>`);
      });
      _push(`<!--]--></div></div><div data-v-9cf4160f><label class="flex items-center gap-2.5 cursor-pointer" data-v-9cf4160f><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(inStockOnly)) ? ssrLooseContain(unref(inStockOnly), null) : unref(inStockOnly)) ? " checked" : ""} class="w-4 h-4 rounded border-border-gray text-deep-plum" aria-label="In stock only" data-v-9cf4160f><span class="text-sm font-ui text-charcoal" data-v-9cf4160f>In Stock Only</span></label></div></div></aside><main class="flex-1 min-w-0" id="product-listing" data-v-9cf4160f><div class="flex flex-wrap items-center justify-between gap-3 mb-5" data-v-9cf4160f><div class="flex items-center gap-3" data-v-9cf4160f><button class="lg:hidden flex items-center gap-2 px-4 py-2 border border-border-gray rounded-lg text-sm font-ui text-charcoal hover:border-dusty-rose hover:text-deep-plum transition-colors" aria-label="Open filters" data-v-9cf4160f><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-9cf4160f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 4a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm4 4a1 1 0 011-1h2a1 1 0 010 2h-2a1 1 0 01-1-1z" data-v-9cf4160f></path></svg> Filters </button><p class="text-sm text-mid-gray font-ui" data-v-9cf4160f><span class="font-semibold text-charcoal" data-v-9cf4160f>${ssrInterpolate(unref(store).totalCount)}</span> products </p></div><div class="flex items-center gap-2" data-v-9cf4160f><label for="sort-select" class="text-sm font-ui text-mid-gray" data-v-9cf4160f>Sort by:</label><select id="sort-select" class="px-3 py-2 border border-border-gray rounded-lg text-sm font-ui text-charcoal bg-white focus:outline-none focus:border-dusty-rose" data-v-9cf4160f><option value="popularity" data-v-9cf4160f${ssrIncludeBooleanAttr(Array.isArray(unref(sortValue)) ? ssrLooseContain(unref(sortValue), "popularity") : ssrLooseEqual(unref(sortValue), "popularity")) ? " selected" : ""}>Most Popular</option><option value="rating" data-v-9cf4160f${ssrIncludeBooleanAttr(Array.isArray(unref(sortValue)) ? ssrLooseContain(unref(sortValue), "rating") : ssrLooseEqual(unref(sortValue), "rating")) ? " selected" : ""}>Top Rated</option><option value="newest" data-v-9cf4160f${ssrIncludeBooleanAttr(Array.isArray(unref(sortValue)) ? ssrLooseContain(unref(sortValue), "newest") : ssrLooseEqual(unref(sortValue), "newest")) ? " selected" : ""}>Newest First</option><option value="price-asc" data-v-9cf4160f${ssrIncludeBooleanAttr(Array.isArray(unref(sortValue)) ? ssrLooseContain(unref(sortValue), "price-asc") : ssrLooseEqual(unref(sortValue), "price-asc")) ? " selected" : ""}>Price: Low to High</option><option value="price-desc" data-v-9cf4160f${ssrIncludeBooleanAttr(Array.isArray(unref(sortValue)) ? ssrLooseContain(unref(sortValue), "price-desc") : ssrLooseEqual(unref(sortValue), "price-desc")) ? " selected" : ""}>Price: High to Low</option><option value="discount" data-v-9cf4160f${ssrIncludeBooleanAttr(Array.isArray(unref(sortValue)) ? ssrLooseContain(unref(sortValue), "discount") : ssrLooseEqual(unref(sortValue), "discount")) ? " selected" : ""}>Best Discount</option></select></div></div>`);
      if (unref(hasActiveFilters)) {
        _push(`<div class="flex flex-wrap gap-2 mb-4" data-v-9cf4160f><!--[-->`);
        ssrRenderList(unref(selectedCategories), (cat) => {
          _push(`<button class="filter-chip active flex items-center gap-1.5" data-v-9cf4160f>${ssrInterpolate(cat)} <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-9cf4160f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-9cf4160f></path></svg></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="product-grid" data-v-9cf4160f><!--[-->`);
      ssrRenderList(unref(store).paginated, (product) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      if (unref(store).totalCount === 0) {
        _push(`<div class="py-20 text-center" data-v-9cf4160f><div class="text-6xl mb-4" aria-hidden="true" data-v-9cf4160f>\u{1F50D}</div><h3 class="font-serif text-xl text-deep-plum mb-2" data-v-9cf4160f>No products found</h3><p class="text-mid-gray font-ui text-sm mb-6" data-v-9cf4160f>Try adjusting your filters.</p>`);
        _push(ssrRenderComponent(_component_AppButton, {
          onClick: unref(store).resetFilters
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Clear All Filters`);
            } else {
              return [
                createTextVNode("Clear All Filters")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(store).totalPages > 1) {
        _push(`<div class="mt-10 flex items-center justify-center gap-2" data-v-9cf4160f><button class="px-3 py-2 border border-border-gray rounded-lg text-sm font-ui hover:border-dusty-rose disabled:opacity-40"${ssrIncludeBooleanAttr(unref(store).page === 1) ? " disabled" : ""} aria-label="Previous page" data-v-9cf4160f> \u2039 </button><!--[-->`);
        ssrRenderList(unref(store).totalPages, (p) => {
          _push(`<button class="${ssrRenderClass([unref(store).page === p ? "bg-deep-plum text-white" : "border border-border-gray text-charcoal hover:border-dusty-rose", "w-9 h-9 rounded-lg text-sm font-ui transition-colors"])}"${ssrRenderAttr("aria-label", `Page ${p}`)}${ssrRenderAttr("aria-current", unref(store).page === p ? "page" : void 0)} data-v-9cf4160f>${ssrInterpolate(p)}</button>`);
        });
        _push(`<!--]--><button class="px-3 py-2 border border-border-gray rounded-lg text-sm font-ui hover:border-dusty-rose disabled:opacity-40"${ssrIncludeBooleanAttr(unref(store).page === unref(store).totalPages) ? " disabled" : ""} aria-label="Next page" data-v-9cf4160f> \u203A </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div>`);
      if (unref(ui).filterDrawerOpen) {
        _push(`<div class="overlay-backdrop lg:hidden" aria-hidden="true" data-v-9cf4160f></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(ui).filterDrawerOpen) {
        _push(`<div class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-modal p-6 max-h-[85vh] overflow-y-auto lg:hidden" role="dialog" aria-modal="true" aria-label="Filter products" data-v-9cf4160f><div class="flex items-center justify-between mb-5" data-v-9cf4160f><h2 class="font-ui font-semibold text-charcoal" data-v-9cf4160f>Filters</h2><button class="btn-icon" aria-label="Close filters" data-v-9cf4160f><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-9cf4160f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-9cf4160f></path></svg></button></div><div class="mb-5" data-v-9cf4160f><h3 class="text-xs font-ui font-semibold text-mid-gray uppercase tracking-wider mb-3" data-v-9cf4160f>Category</h3><div class="flex flex-wrap gap-2" data-v-9cf4160f><!--[-->`);
        ssrRenderList(unref(categories), (cat) => {
          _push(`<button class="${ssrRenderClass([{ active: unref(selectedCategories).includes(cat.name) }, "filter-chip"])}" data-v-9cf4160f>${ssrInterpolate(cat.name)}</button>`);
        });
        _push(`<!--]--></div></div>`);
        _push(ssrRenderComponent(_component_AppButton, {
          full: true,
          onClick: unref(ui).closeFilterDrawer
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Apply Filters`);
            } else {
              return [
                createTextVNode("Apply Filters")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9cf4160f"]]);

export { index as default };
//# sourceMappingURL=index-CcEzYCUY.mjs.map
