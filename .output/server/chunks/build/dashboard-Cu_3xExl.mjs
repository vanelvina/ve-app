import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useAdminStore } from './admin-Cv882IlH.mjs';
import { u as useUIStore } from './ui-De1hAQUT.mjs';
import 'pinia';
import './server.mjs';
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
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    useAdminStore();
    useUIStore();
    const activeTab = ref("overview");
    const tabs = [
      { id: "overview", name: "Overview", icon: "\u{1F4CA}" },
      { id: "banners", name: "Banners Carousel", icon: "\u{1F5BC}\uFE0F" },
      { id: "categories", name: "Categories", icon: "\u{1F5C2}\uFE0F" },
      { id: "products", name: "Products", icon: "\u{1F6CD}\uFE0F" },
      { id: "widgets", name: "Widgets & Layout", icon: "\u2699\uFE0F" }
    ];
    const banners = ref([]);
    const categories = ref([]);
    const products = ref([]);
    const widgets = ref([]);
    ref(false);
    const bannerModal = ref({
      show: false,
      isEdit: false,
      itemId: "",
      form: {
        title: "",
        subtitle: "",
        cta: "",
        ctaLink: "",
        image: "",
        imageMobile: "",
        badge: "",
        textColor: "light",
        align: "left"
      }
    });
    const categoryModal = ref({
      show: false,
      isEdit: false,
      itemId: "",
      form: {
        name: "",
        slug: "",
        description: "",
        image: "",
        subcategories: []
      }
    });
    const productModal = ref({
      show: false,
      isEdit: false,
      itemId: "",
      form: {
        name: "",
        slug: "",
        category: "",
        subcategory: "",
        description: "",
        price: 0,
        originalPrice: 0,
        badge: null,
        fabric: "",
        deliveryDays: 3,
        stockCount: 10,
        inStock: true,
        variants: []
      }
    });
    const widgetModal = ref({
      show: false,
      isNew: false,
      itemId: "",
      form: {
        key: "",
        name: "",
        type: "system",
        title: "",
        subtitle: "",
        description: "",
        image: "",
        items: []
      }
    });
    const selectedCategorySubcategories = computed(() => {
      const catName = productModal.value.form.category;
      const found = categories.value.find((c) => c.name.toLowerCase() === catName.toLowerCase());
      return found ? found.subcategories || [] : [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-warm-ivory/50 py-10 px-4 sm:px-6 lg:px-8 font-ui" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-rose-blush/20 shadow-sm mb-8"><div><h1 class="text-2xl font-serif text-deep-plum font-bold">Admin Console</h1><p class="text-xs text-charcoal/60 mt-1">Manage your storefront, upload products, custom widgets and banners.</p></div><div class="flex items-center gap-3"><span class="text-xs px-3 py-1 bg-rose-blush text-deep-plum rounded-full font-semibold">Logged as: admin</span><button class="px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg text-xs font-semibold tracking-wide transition-all"> Sign Out </button></div></div><div class="grid grid-cols-1 lg:grid-cols-4 gap-8"><div class="lg:col-span-1 space-y-2.5"><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.id ? "bg-deep-plum text-white border-deep-plum shadow-md" : "bg-white text-charcoal/80 hover:bg-rose-blush/20 border-rose-blush/20 hover:text-deep-plum", "w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-left text-sm font-semibold transition-all border"])}"><span>${ssrInterpolate(tab.name)}</span><span class="text-lg">${ssrInterpolate(tab.icon)}</span></button>`);
      });
      _push(`<!--]--></div><div class="lg:col-span-3 bg-white p-6 md:p-8 rounded-2xl border border-rose-blush/20 shadow-sm min-h-[500px]">`);
      if (unref(activeTab) === "overview") {
        _push(`<div class="space-y-8"><h2 class="text-xl font-serif text-deep-plum font-semibold">Store Overview</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-warm-ivory p-5 rounded-xl border border-rose-blush/20 text-center"><span class="text-3xl">\u{1F6CD}\uFE0F</span><h3 class="text-2xl font-bold text-deep-plum mt-2">${ssrInterpolate(unref(products).length)}</h3><p class="text-[11px] uppercase tracking-wider text-charcoal/50 mt-1">Total Products</p></div><div class="bg-warm-ivory p-5 rounded-xl border border-rose-blush/20 text-center"><span class="text-3xl">\u{1F5C2}\uFE0F</span><h3 class="text-2xl font-bold text-deep-plum mt-2">${ssrInterpolate(unref(categories).length)}</h3><p class="text-[11px] uppercase tracking-wider text-charcoal/50 mt-1">Categories</p></div><div class="bg-warm-ivory p-5 rounded-xl border border-rose-blush/20 text-center"><span class="text-3xl">\u{1F5BC}\uFE0F</span><h3 class="text-2xl font-bold text-deep-plum mt-2">${ssrInterpolate(unref(banners).length)}</h3><p class="text-[11px] uppercase tracking-wider text-charcoal/50 mt-1">Hero Banners</p></div><div class="bg-warm-ivory p-5 rounded-xl border border-rose-blush/20 text-center"><span class="text-3xl">\u2699\uFE0F</span><h3 class="text-2xl font-bold text-deep-plum mt-2">${ssrInterpolate(unref(widgets).length)}</h3><p class="text-[11px] uppercase tracking-wider text-charcoal/50 mt-1">Active Widgets</p></div></div><div class="bg-rose-blush/10 border border-rose-blush/30 rounded-xl p-5 space-y-3"><h4 class="font-semibold text-deep-plum text-xs uppercase tracking-wider">Quick Instructions</h4><ul class="text-xs text-charcoal/80 space-y-2 list-disc pl-4"><li>Go to <strong>Banners</strong> to update the sliding carousel on the top page.</li><li>Go to <strong>Products</strong> to upload and update new clothing styles, configure colors, sizes, and upload pictures.</li><li>Go to <strong>Categories</strong> to manage top-level lines (e.g. Bras, Panties) and their subcategories.</li><li>Go to <strong>Widgets</strong> to customize sections title/details, enable/disable segments, create custom banners and reorder homepage layout.</li></ul></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTab) === "banners") {
        _push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-xl font-serif text-deep-plum font-semibold">Manage Hero Banners</h2><button class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-xs font-semibold shadow-sm"> + Add Slide </button></div><div class="border border-rose-blush/20 rounded-xl overflow-hidden"><table class="w-full text-left border-collapse text-xs"><thead><tr class="bg-warm-ivory text-deep-plum border-b border-rose-blush/20 font-semibold"><th class="p-3">Preview</th><th class="p-3">Destination Link</th><th class="p-3 text-right">Actions</th></tr></thead><tbody class="divide-y divide-rose-blush/10"><!--[-->`);
        ssrRenderList(unref(banners), (banner) => {
          _push(`<tr class="hover:bg-warm-ivory/20"><td class="p-3"><img${ssrRenderAttr("src", banner.image)} class="w-28 h-12 object-cover rounded shadow-sm bg-warm-ivory"></td><td class="p-3 text-charcoal font-semibold">${ssrInterpolate(banner.ctaLink)}</td><td class="p-3 text-right space-x-1.5"><button class="text-deep-plum hover:underline font-semibold">Edit</button><button class="text-red-500 hover:underline font-semibold">Delete</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTab) === "categories") {
        _push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-xl font-serif text-deep-plum font-semibold">Manage Categories</h2><button class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-xs font-semibold shadow-sm"> + Add Category </button></div><div class="border border-rose-blush/20 rounded-xl overflow-hidden"><table class="w-full text-left border-collapse text-xs"><thead><tr class="bg-warm-ivory text-deep-plum border-b border-rose-blush/20 font-semibold"><th class="p-3">Image</th><th class="p-3">Name / Slug</th><th class="p-3">Subcategories</th><th class="p-3 text-right">Actions</th></tr></thead><tbody class="divide-y divide-rose-blush/10"><!--[-->`);
        ssrRenderList(unref(categories), (cat) => {
          _push(`<tr class="hover:bg-warm-ivory/20"><td class="p-3"><img${ssrRenderAttr("src", cat.image)} class="w-10 h-10 object-cover rounded shadow-sm bg-warm-ivory"></td><td class="p-3"><p class="font-semibold text-charcoal">${ssrInterpolate(cat.name)}</p><p class="text-[10px] text-charcoal/50 mt-0.5">${ssrInterpolate(cat.slug)}</p></td><td class="p-3"><div class="flex flex-wrap gap-1"><!--[-->`);
          ssrRenderList(cat.subcategories, (sub) => {
            _push(`<span class="px-2 py-0.5 bg-rose-blush/50 text-deep-plum rounded-[4px] text-[10px]">${ssrInterpolate(sub.name)}</span>`);
          });
          _push(`<!--]--></div></td><td class="p-3 text-right space-x-1.5"><button class="text-deep-plum hover:underline font-semibold">Edit</button><button class="text-red-500 hover:underline font-semibold">Delete</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTab) === "products") {
        _push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-xl font-serif text-deep-plum font-semibold">Manage Products</h2><button class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-xs font-semibold shadow-sm"> + Add Product </button></div><div class="border border-rose-blush/20 rounded-xl overflow-hidden"><table class="w-full text-left border-collapse text-xs"><thead><tr class="bg-warm-ivory text-deep-plum border-b border-rose-blush/20 font-semibold"><th class="p-3">Thumbnail</th><th class="p-3">Name / Category</th><th class="p-3">Price</th><th class="p-3">Badge &amp; Stock</th><th class="p-3 text-right">Actions</th></tr></thead><tbody class="divide-y divide-rose-blush/10"><!--[-->`);
        ssrRenderList(unref(products), (product) => {
          var _a, _b, _c;
          _push(`<tr class="hover:bg-warm-ivory/20"><td class="p-3"><img${ssrRenderAttr("src", ((_c = (_b = (_a = product.variants) == null ? void 0 : _a[0]) == null ? void 0 : _b.images) == null ? void 0 : _c[0]) || "https://via.placeholder.com/150")} class="w-10 h-10 object-cover rounded shadow-sm bg-warm-ivory"></td><td class="p-3"><p class="font-semibold text-charcoal">${ssrInterpolate(product.name)}</p><p class="text-[10px] text-charcoal/50 mt-0.5">${ssrInterpolate(product.category)} - ${ssrInterpolate(product.subcategory)}</p></td><td class="p-3 font-semibold text-deep-plum"> \u20B9${ssrInterpolate(product.price)} `);
          if (product.originalPrice) {
            _push(`<span class="text-charcoal/45 line-through font-normal">\u20B9${ssrInterpolate(product.originalPrice)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td class="p-3">`);
          if (product.badge) {
            _push(`<span class="${ssrRenderClass([product.badge === "bestseller" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800", "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase mr-1.5"])}">${ssrInterpolate(product.badge)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="${ssrRenderClass([product.inStock ? "text-green-600" : "text-red-500", "text-[10px] font-medium"])}">${ssrInterpolate(product.inStock ? `In Stock (${product.stockCount})` : "Out of stock")}</span></td><td class="p-3 text-right space-x-1.5"><button class="text-deep-plum hover:underline font-semibold">Edit</button><button class="text-red-500 hover:underline font-semibold">Delete</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTab) === "widgets") {
        _push(`<div class="space-y-6"><div class="flex items-center justify-between"><h2 class="text-xl font-serif text-deep-plum font-semibold">Home Page Widgets &amp; Layout</h2><button class="px-4 py-2 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-xs font-semibold shadow-sm"> + Create Custom Widget </button></div><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(widgets), (widget, index) => {
          _push(`<div class="flex items-center justify-between p-4 bg-warm-ivory/30 border border-rose-blush/20 rounded-xl hover:shadow-sm transition-all"><div class="flex items-center gap-3"><div class="flex flex-col gap-1.5"><button${ssrIncludeBooleanAttr(index === 0) ? " disabled" : ""} class="text-charcoal/40 hover:text-deep-plum disabled:opacity-20 text-xs">\u25B2</button><button${ssrIncludeBooleanAttr(index === unref(widgets).length - 1) ? " disabled" : ""} class="text-charcoal/40 hover:text-deep-plum disabled:opacity-20 text-xs">\u25BC</button></div><div><div class="flex items-center gap-2"><p class="font-semibold text-deep-plum text-sm">${ssrInterpolate(widget.name)}</p><span class="px-2 py-0.5 bg-deep-plum/10 text-deep-plum rounded-full text-[9px] uppercase font-bold">${ssrInterpolate(widget.type)}</span></div>`);
          if (widget.title) {
            _push(`<p class="text-xs text-charcoal/60 mt-1">Title: ${ssrInterpolate(widget.title)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="text-[10px] text-charcoal/45 mt-0.5">Section Key: ${ssrInterpolate(widget.key)}</p></div></div><div class="flex items-center gap-4"><div class="flex items-center gap-2"><span class="text-[10px] font-semibold text-charcoal/50">Status:</span><button class="${ssrRenderClass([widget.enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase transition-all"])}">${ssrInterpolate(widget.enabled ? "Enabled" : "Disabled")}</button></div><div class="space-x-2"><button class="text-xs font-semibold text-deep-plum hover:underline">Edit settings</button>`);
          if (widget.type !== "system") {
            _push(`<button class="text-xs font-semibold text-red-500 hover:underline">Delete</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (unref(bannerModal).show) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"><div class="bg-white rounded-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] border border-rose-blush/20 shadow-xl space-y-4"><h3 class="text-lg font-serif text-deep-plum font-bold">${ssrInterpolate(unref(bannerModal).isEdit ? "Edit Banner Slide" : "Add Banner Slide")}</h3><form class="space-y-4 text-xs font-ui"><div><label class="block font-semibold mb-1 text-charcoal/70">Image URL *</label><input${ssrRenderAttr("value", unref(bannerModal).form.image)} type="text" placeholder="https://example.com/image.jpg" required class="w-full p-2 border border-rose-blush/30 rounded"><p class="text-[10px] text-charcoal/40 mt-1">Image size tip: 1400x600 pixels (or wider) is best.</p></div><div><label class="block font-semibold mb-1 text-charcoal/70">Click Destination Link (e.g. /products?category=bras) *</label><input${ssrRenderAttr("value", unref(bannerModal).form.ctaLink)} type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="/products"></div><div class="flex justify-end gap-2 pt-2"><button type="button" class="px-4 py-2 border border-rose-blush/40 rounded text-charcoal">Cancel</button><button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded">Save</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(categoryModal).show) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"><div class="bg-white rounded-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] border border-rose-blush/20 shadow-xl space-y-4"><h3 class="text-lg font-serif text-deep-plum font-bold">${ssrInterpolate(unref(categoryModal).isEdit ? "Edit Category" : "Create Category")}</h3><form class="space-y-4 text-xs font-ui"><div><label class="block font-semibold mb-1 text-charcoal/70">Category Name *</label><input${ssrRenderAttr("value", unref(categoryModal).form.name)} type="text" required class="w-full p-2 border border-rose-blush/30 rounded"></div><div><label class="block font-semibold mb-1 text-charcoal/70">Category Slug *</label><input${ssrRenderAttr("value", unref(categoryModal).form.slug)} type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="bras"></div><div><label class="block font-semibold mb-1 text-charcoal/70">Description</label><textarea rows="2" class="w-full p-2 border border-rose-blush/30 rounded">${ssrInterpolate(unref(categoryModal).form.description)}</textarea></div><div><label class="block font-semibold mb-1 text-charcoal/70">Cover Image URL *</label><input${ssrRenderAttr("value", unref(categoryModal).form.image)} type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="https://example.com/image.jpg"></div><div><div class="flex items-center justify-between mb-1"><label class="block font-semibold text-charcoal/70">Subcategories</label><button type="button" class="text-deep-plum font-semibold hover:underline">+ Add subcategory</button></div><div class="space-y-2"><!--[-->`);
        ssrRenderList(unref(categoryModal).form.subcategories, (sub, idx) => {
          _push(`<div class="flex gap-2 items-center"><input${ssrRenderAttr("value", sub.name)} placeholder="Name (e.g. T-Shirt Bras)" required class="flex-1 p-2 border border-rose-blush/30 rounded"><input${ssrRenderAttr("value", sub.slug)} placeholder="Slug (e.g. t-shirt-bras)" required class="flex-1 p-2 border border-rose-blush/30 rounded"><button type="button" class="text-red-500 hover:underline">Remove</button></div>`);
        });
        _push(`<!--]--></div></div><div class="flex justify-end gap-2 pt-2"><button type="button" class="px-4 py-2 border border-rose-blush/40 rounded text-charcoal">Cancel</button><button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded">Save</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(productModal).show) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"><div class="bg-white rounded-2xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh] border border-rose-blush/20 shadow-xl space-y-4"><h3 class="text-lg font-serif text-deep-plum font-bold">${ssrInterpolate(unref(productModal).isEdit ? "Edit Product" : "Add New Product")}</h3><form class="space-y-4 text-xs font-ui"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block font-semibold mb-1 text-charcoal/70">Product Name *</label><input${ssrRenderAttr("value", unref(productModal).form.name)} type="text" required class="w-full p-2 border border-rose-blush/30 rounded"></div><div><label class="block font-semibold mb-1 text-charcoal/70">Product Slug *</label><input${ssrRenderAttr("value", unref(productModal).form.slug)} type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="everyday-cotton-bra"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block font-semibold mb-1 text-charcoal/70">Category *</label><select required class="w-full p-2 border border-rose-blush/30 rounded"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.category) ? ssrLooseContain(unref(productModal).form.category, "") : ssrLooseEqual(unref(productModal).form.category, "")) ? " selected" : ""}>-- Select Category --</option><!--[-->`);
        ssrRenderList(unref(categories), (cat) => {
          _push(`<option${ssrRenderAttr("value", cat.name)}${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.category) ? ssrLooseContain(unref(productModal).form.category, cat.name) : ssrLooseEqual(unref(productModal).form.category, cat.name)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
        });
        _push(`<!--]--></select></div><div><label class="block font-semibold mb-1 text-charcoal/70">Subcategory</label><select class="w-full p-2 border border-rose-blush/30 rounded"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.subcategory) ? ssrLooseContain(unref(productModal).form.subcategory, "") : ssrLooseEqual(unref(productModal).form.subcategory, "")) ? " selected" : ""}>-- None --</option><!--[-->`);
        ssrRenderList(unref(selectedCategorySubcategories), (sub) => {
          _push(`<option${ssrRenderAttr("value", sub.name)}${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.subcategory) ? ssrLooseContain(unref(productModal).form.subcategory, sub.name) : ssrLooseEqual(unref(productModal).form.subcategory, sub.name)) ? " selected" : ""}>${ssrInterpolate(sub.name)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label class="block font-semibold mb-1 text-charcoal/70">Price (INR) *</label><input${ssrRenderAttr("value", unref(productModal).form.price)} type="number" required class="w-full p-2 border border-rose-blush/30 rounded"></div><div><label class="block font-semibold mb-1 text-charcoal/70">Original Price (INR) *</label><input${ssrRenderAttr("value", unref(productModal).form.originalPrice)} type="number" required class="w-full p-2 border border-rose-blush/30 rounded"></div><div><label class="block font-semibold mb-1 text-charcoal/70">Badge</label><select class="w-full p-2 border border-rose-blush/30 rounded"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.badge) ? ssrLooseContain(unref(productModal).form.badge, null) : ssrLooseEqual(unref(productModal).form.badge, null)) ? " selected" : ""}>-- None --</option><option value="new"${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.badge) ? ssrLooseContain(unref(productModal).form.badge, "new") : ssrLooseEqual(unref(productModal).form.badge, "new")) ? " selected" : ""}>New</option><option value="bestseller"${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.badge) ? ssrLooseContain(unref(productModal).form.badge, "bestseller") : ssrLooseEqual(unref(productModal).form.badge, "bestseller")) ? " selected" : ""}>Best Seller</option><option value="sale"${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.badge) ? ssrLooseContain(unref(productModal).form.badge, "sale") : ssrLooseEqual(unref(productModal).form.badge, "sale")) ? " selected" : ""}>Sale</option><option value="trending"${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.badge) ? ssrLooseContain(unref(productModal).form.badge, "trending") : ssrLooseEqual(unref(productModal).form.badge, "trending")) ? " selected" : ""}>Trending</option></select></div></div><div><label class="block font-semibold mb-1 text-charcoal/70">Description</label><textarea rows="3" class="w-full p-2 border border-rose-blush/30 rounded">${ssrInterpolate(unref(productModal).form.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block font-semibold mb-1 text-charcoal/70">Fabric Details</label><input${ssrRenderAttr("value", unref(productModal).form.fabric)} type="text" class="w-full p-2 border border-rose-blush/30 rounded" placeholder="85% Cotton, 15% Spandex"></div><div><label class="block font-semibold mb-1 text-charcoal/70">Delivery Days</label><input${ssrRenderAttr("value", unref(productModal).form.deliveryDays)} type="number" class="w-full p-2 border border-rose-blush/30 rounded"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block font-semibold mb-1 text-charcoal/70">Stock Count</label><input${ssrRenderAttr("value", unref(productModal).form.stockCount)} type="number" class="w-full p-2 border border-rose-blush/30 rounded"></div><div class="flex items-center pt-5"><label class="inline-flex items-center cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(productModal).form.inStock) ? ssrLooseContain(unref(productModal).form.inStock, null) : unref(productModal).form.inStock) ? " checked" : ""} class="sr-only peer"><div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div><span class="ms-3 text-xs font-semibold text-charcoal/85">In Stock</span></label></div></div><div class="border-t border-rose-blush/10 pt-3"><div class="flex items-center justify-between mb-2"><h4 class="font-serif text-deep-plum font-semibold">Product Variants (Colors &amp; Sizes)</h4><button type="button" class="px-2.5 py-1 bg-rose-blush text-deep-plum rounded text-[10px] font-bold">+ Add Color Variant</button></div><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(productModal).form.variants, (v, vIdx) => {
          _push(`<div class="bg-warm-ivory/20 p-3 rounded-lg border border-rose-blush/25 space-y-3"><div class="flex justify-between items-center"><span class="font-bold text-[10px] uppercase text-deep-plum">Color Variant #${ssrInterpolate(vIdx + 1)}</span><button type="button" class="text-red-500 hover:underline text-[10px]">Remove Color</button></div><div class="grid grid-cols-2 gap-3"><div><label class="block font-semibold mb-1 text-charcoal/50">Color Name (e.g. Ivory White)</label><input${ssrRenderAttr("value", v.color)} required class="w-full p-2 border border-rose-blush/30 rounded"></div><div><label class="block font-semibold mb-1 text-charcoal/50">Color Hex (e.g. #FDF8F5)</label><input${ssrRenderAttr("value", v.colorHex)} required class="w-full p-2 border border-rose-blush/30 rounded"></div></div><div><label class="block font-semibold mb-1 text-charcoal/50">Sizes (Comma separated, e.g. S, M, L or 32B, 34C)</label><input${ssrRenderAttr("value", v.sizes.join(", "))} class="w-full p-2 border border-rose-blush/30 rounded"></div><div><div class="flex items-center justify-between mb-1"><label class="block font-semibold text-charcoal/50">Images URLs</label><button type="button" class="text-deep-plum font-bold text-[10px]">+ Add Image URL</button></div><div class="space-y-2"><!--[-->`);
          ssrRenderList(v.images, (img, imgIdx) => {
            _push(`<div class="flex gap-2"><input${ssrRenderAttr("value", v.images[imgIdx])} placeholder="https://example.com/image.jpg" class="flex-1 p-2 border border-rose-blush/30 rounded"><button type="button" class="text-red-500 hover:underline font-semibold">Remove</button></div>`);
          });
          _push(`<!--]--></div></div></div>`);
        });
        _push(`<!--]--></div></div><div class="flex justify-end gap-2 pt-2 border-t border-rose-blush/10"><button type="button" class="px-4 py-2 border border-rose-blush/40 rounded text-charcoal">Cancel</button><button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded">Save Product</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(widgetModal).show) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"><div class="bg-white rounded-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] border border-rose-blush/20 shadow-xl space-y-4"><h3 class="text-lg font-serif text-deep-plum font-bold">Configure ${ssrInterpolate(unref(widgetModal).form.name || "Widget")}</h3><form class="space-y-4 text-xs font-ui">`);
        if (unref(widgetModal).isNew) {
          _push(`<div><label class="block font-semibold mb-1 text-charcoal/70">Widget Name *</label><input${ssrRenderAttr("value", unref(widgetModal).form.name)} type="text" required class="w-full p-2 border border-rose-blush/30 rounded"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(widgetModal).isNew) {
          _push(`<div><label class="block font-semibold mb-1 text-charcoal/70">Widget Unique Key *</label><input${ssrRenderAttr("value", unref(widgetModal).form.key)} type="text" required class="w-full p-2 border border-rose-blush/30 rounded" placeholder="summer-promo"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(widgetModal).isNew) {
          _push(`<div><label class="block font-semibold mb-1 text-charcoal/70">Widget Type *</label><select required class="w-full p-2 border border-rose-blush/30 rounded"><option value="banner"${ssrIncludeBooleanAttr(Array.isArray(unref(widgetModal).form.type) ? ssrLooseContain(unref(widgetModal).form.type, "banner") : ssrLooseEqual(unref(widgetModal).form.type, "banner")) ? " selected" : ""}>Banner (Full screen promotional banner)</option><option value="editorial"${ssrIncludeBooleanAttr(Array.isArray(unref(widgetModal).form.type) ? ssrLooseContain(unref(widgetModal).form.type, "editorial") : ssrLooseEqual(unref(widgetModal).form.type, "editorial")) ? " selected" : ""}>Editorial (Side-by-side text and picture)</option><option value="html"${ssrIncludeBooleanAttr(Array.isArray(unref(widgetModal).form.type) ? ssrLooseContain(unref(widgetModal).form.type, "html") : ssrLooseEqual(unref(widgetModal).form.type, "html")) ? " selected" : ""}>Custom HTML (Embed scripts/custom components)</option><option value="promo-grid"${ssrIncludeBooleanAttr(Array.isArray(unref(widgetModal).form.type) ? ssrLooseContain(unref(widgetModal).form.type, "promo-grid") : ssrLooseEqual(unref(widgetModal).form.type, "promo-grid")) ? " selected" : ""}>Promo Cards Grid (Clickable banners grid)</option><option value="collection-tabs"${ssrIncludeBooleanAttr(Array.isArray(unref(widgetModal).form.type) ? ssrLooseContain(unref(widgetModal).form.type, "collection-tabs") : ssrLooseEqual(unref(widgetModal).form.type, "collection-tabs")) ? " selected" : ""}>Curated Collection Tabs (Category switcher)</option><option value="fit-calculator"${ssrIncludeBooleanAttr(Array.isArray(unref(widgetModal).form.type) ? ssrLooseContain(unref(widgetModal).form.type, "fit-calculator") : ssrLooseEqual(unref(widgetModal).form.type, "fit-calculator")) ? " selected" : ""}>Fit Sizing Calculator</option><option value="offers-slider"${ssrIncludeBooleanAttr(Array.isArray(unref(widgetModal).form.type) ? ssrLooseContain(unref(widgetModal).form.type, "offers-slider") : ssrLooseEqual(unref(widgetModal).form.type, "offers-slider")) ? " selected" : ""}>Special Packs &amp; Offers Slider</option></select></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><label class="block font-semibold mb-1 text-charcoal/70">Section Header (Main Title)</label><input${ssrRenderAttr("value", unref(widgetModal).form.title)} type="text" class="w-full p-2 border border-rose-blush/30 rounded"></div><div><label class="block font-semibold mb-1 text-charcoal/70">Subtitle (Small top badge)</label><input${ssrRenderAttr("value", unref(widgetModal).form.subtitle)} type="text" class="w-full p-2 border border-rose-blush/30 rounded"></div><div><label class="block font-semibold mb-1 text-charcoal/70">Description Text (or raw HTML code)</label><textarea rows="4" class="w-full p-2 border border-rose-blush/30 rounded">${ssrInterpolate(unref(widgetModal).form.description)}</textarea></div>`);
        if (unref(widgetModal).form.type !== "html") {
          _push(`<div><label class="block font-semibold mb-1 text-charcoal/70">Section Image URL (Banner / Editorial Image)</label><input${ssrRenderAttr("value", unref(widgetModal).form.image)} type="text" class="w-full p-2 border border-rose-blush/30 rounded" placeholder="https://example.com/image.jpg"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(widgetModal).form.key === "everyday-comfort") {
          _push(`<div><div class="flex items-center justify-between mb-1"><label class="block font-semibold text-charcoal/70">Features Checklist Points</label><button type="button" class="text-deep-plum font-semibold">+ Add Point</button></div><div class="space-y-2"><!--[-->`);
          ssrRenderList(unref(widgetModal).form.items, (_, index) => {
            _push(`<div class="flex gap-2 items-center"><input${ssrRenderAttr("value", unref(widgetModal).form.items[index])} class="flex-1 p-2 border border-rose-blush/30 rounded" required><button type="button" class="text-red-500">Remove</button></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(widgetModal).form.type === "promo-grid") {
          _push(`<div><div class="flex items-center justify-between mb-2"><label class="block font-semibold text-charcoal/70">Promo Cards (Banners)</label><button type="button" class="text-deep-plum font-semibold hover:underline">+ Add Promo Card</button></div><div class="space-y-3"><!--[-->`);
          ssrRenderList(unref(widgetModal).form.items, (item, idx) => {
            _push(`<div class="p-3 bg-warm-ivory/40 rounded border border-rose-blush/30 space-y-2"><div class="flex justify-between items-center"><span class="font-bold text-[10px] uppercase text-deep-plum">Card #${ssrInterpolate(idx + 1)}</span><button type="button" class="text-red-500 hover:underline">Remove</button></div><div class="grid grid-cols-2 gap-2"><input${ssrRenderAttr("value", item.image)} placeholder="Image URL *" required class="p-2 border border-rose-blush/30 rounded"><input${ssrRenderAttr("value", item.link)} placeholder="Destination Link (e.g. /products)" required class="p-2 border border-rose-blush/30 rounded"></div><input${ssrRenderAttr("value", item.title)} placeholder="Accessible Title (e.g. Buy 2 Get 1)" class="w-full p-2 border border-rose-blush/30 rounded"></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(widgetModal).form.type === "collection-tabs") {
          _push(`<div><div class="flex items-center justify-between mb-2"><label class="block font-semibold text-charcoal/70">Category Tabs Showcase</label><button type="button" class="text-deep-plum font-semibold hover:underline">+ Add Tab</button></div><div class="space-y-2"><!--[-->`);
          ssrRenderList(unref(widgetModal).form.items, (_, index) => {
            _push(`<div class="flex gap-2 items-center"><input${ssrRenderAttr("value", unref(widgetModal).form.items[index])} placeholder="Category name (e.g. Bras)" class="flex-1 p-2 border border-rose-blush/30 rounded" required><button type="button" class="text-red-500">Remove</button></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(widgetModal).form.type === "fit-calculator") {
          _push(`<div class="space-y-3"><div><label class="block font-semibold mb-1 text-charcoal/70">Sizing Test Button Text</label><input${ssrRenderAttr("value", unref(widgetModal).form.items.btnText)} placeholder="Start Sizing Test" required class="w-full p-2 border border-rose-blush/30 rounded"></div><div><label class="block font-semibold mb-1 text-charcoal/70">Sizing Test Button Link</label><input${ssrRenderAttr("value", unref(widgetModal).form.items.btnLink)} placeholder="#" required class="w-full p-2 border border-rose-blush/30 rounded"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(widgetModal).form.type === "offers-slider") {
          _push(`<div><div class="flex items-center justify-between mb-2"><label class="block font-semibold text-charcoal/70">Saver Packs &amp; Combos</label><button type="button" class="text-deep-plum font-semibold hover:underline">+ Add Combo Card</button></div><div class="space-y-3"><!--[-->`);
          ssrRenderList(unref(widgetModal).form.items, (item, idx) => {
            _push(`<div class="p-3 bg-warm-ivory/40 rounded border border-rose-blush/30 space-y-2"><div class="flex justify-between items-center"><span class="font-bold text-[10px] uppercase text-deep-plum">Offer #${ssrInterpolate(idx + 1)}</span><button type="button" class="text-red-500 hover:underline">Remove</button></div><div class="grid grid-cols-2 gap-2"><input${ssrRenderAttr("value", item.image)} placeholder="Image URL *" required class="p-2 border border-rose-blush/30 rounded"><input${ssrRenderAttr("value", item.link)} placeholder="Combo Link (e.g. /products/combo)" required class="p-2 border border-rose-blush/30 rounded"></div><div class="grid grid-cols-3 gap-2"><input${ssrRenderAttr("value", item.title)} placeholder="Offer Title *" required class="col-span-2 p-2 border border-rose-blush/30 rounded"><input${ssrRenderAttr("value", item.price)} placeholder="Price (e.g. \u20B9799) *" required class="p-2 border border-rose-blush/30 rounded"></div><input${ssrRenderAttr("value", item.subtitle)} placeholder="Offer Description / Subtitle" class="w-full p-2 border border-rose-blush/30 rounded"></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-end gap-2 pt-2 border-t border-rose-blush/10"><button type="button" class="px-4 py-2 border border-rose-blush/40 rounded text-charcoal">Cancel</button><button type="submit" class="px-5 py-2 bg-deep-plum text-white rounded">Save Config</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-Cu_3xExl.mjs.map
