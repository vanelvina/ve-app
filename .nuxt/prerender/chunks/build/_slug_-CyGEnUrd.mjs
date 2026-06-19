import { _ as __nuxt_component_1 } from './nuxt-link-D2oXBkcL.mjs';
import { _ as _sfc_main$1 } from './AppBadge-R2t0PrU7.mjs';
import { a as useCart, b as useWishlistStore, _ as _sfc_main$2 } from './products-DbFjrDEZ.mjs';
import { _ as _sfc_main$3 } from './AppButton-f0i-AWLW.mjs';
import { p as productSchema, b as breadcrumbSchema, f as faqSchema, _ as _sfc_main$4 } from './schema-BlAIJBud.mjs';
import { _ as _sfc_main$5 } from './ProductCard-duDewXZZ.mjs';
import { defineComponent, computed, ref, watch, watchEffect, unref, mergeProps, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, useSSRContext } from 'file://C:/Projects/Website/ve-app/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'file://C:/Projects/Website/ve-app/node_modules/vue/server-renderer/index.mjs';
import { f as formatPrice, i as isValidPincode } from './cart-BC2fjYev.mjs';
import { _ as _export_sfc, a as useRoute } from './server.mjs';
import { u as useUIStore } from './ui-De1hAQUT.mjs';
import { u as useProducts } from './useProducts-D0EBEr25.mjs';
import { u as useSeoMeta, a as useHead } from './v3-B1OjdVjd.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/ufo/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/pinia/dist/pinia.prod.cjs';
import 'file://C:/Projects/Website/ve-app/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/destr/dist/index.mjs';
import 'file://C:/Projects/Website/ve-app/node_modules/hookable/dist/index.mjs';
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

const reviewsData = [
  {
    id: "r001",
    productId: "p001",
    productName: "Everyday Soft Cotton Bra",
    author: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    title: "Best bra I've ever owned!",
    body: "I've been searching for a comfortable everyday bra for years and Van Elvina finally nailed it. The cotton is incredibly soft, no irritation even after a 10-hour workday. The fit is true to size and I love that there's no underwire digging in. Bought 3 more colors immediately!",
    date: "2025-11-15",
    verified: true,
    helpful: 47
  },
  {
    id: "r002",
    productId: "p006",
    productName: "Modal Sleep Bralette",
    author: "Aarti Mehta",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    title: "Like sleeping on clouds",
    body: "The modal fabric is absolutely divine. I've been wearing this every night for 3 weeks and it still feels brand new. Washes perfectly, holds its shape. This is now my go-to sleep bralette. Highly recommend to anyone who wants comfort without sacrificing style.",
    date: "2025-12-02",
    verified: true,
    helpful: 38
  },
  {
    id: "r003",
    productId: "p009",
    productName: "Maternity & Nursing Bra",
    author: "Sunita Patel",
    avatar: "https://i.pravatar.cc/150?img=25",
    rating: 5,
    title: "A nursing mom's best friend",
    body: "As a new mom, comfort is everything. This nursing bra is absolutely fantastic \u2014 the one-handed clip works perfectly even when I'm half asleep at 3am! The fabric is gentle against sensitive skin and it expanded perfectly throughout my pregnancy. Worth every rupee.",
    date: "2025-10-18",
    verified: true,
    helpful: 62
  },
  {
    id: "r004",
    productId: "p003",
    productName: "Seamless Push-Up Bra",
    author: "Kavitha Reddy",
    avatar: "https://i.pravatar.cc/150?img=19",
    rating: 4,
    title: "Great lift, excellent under fitted tops",
    body: "This push-up bra gives exactly the right amount of lift without being too padded. The seamless design is perfect under my silk blouses \u2014 completely invisible. My only minor issue is the straps could be slightly wider but overall a fantastic product.",
    date: "2025-09-28",
    verified: true,
    helpful: 29
  },
  {
    id: "r005",
    productId: "p005",
    productName: "Wireless Active Sports Bra",
    author: "Meera Krishnan",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4,
    title: "Perfect for yoga and pilates",
    body: "I've tried so many sports bras and this is the best wireless option I've found. Stays in place during downward dog, doesn't ride up, and dries super fast. The coral color is gorgeous in person. Will definitely buy the navy one next!",
    date: "2025-11-08",
    verified: true,
    helpful: 21
  },
  {
    id: "r006",
    productId: "p002",
    productName: "Lace Trim Comfort Brief",
    author: "Divya Singh",
    avatar: "https://i.pravatar.cc/150?img=44",
    rating: 5,
    title: "Finally, pretty AND comfortable",
    body: "I used to think I had to choose between beautiful lingerie and comfort. Van Elvina proved me wrong. These briefs have the prettiest lace detail but feel like you're wearing nothing. The cotton gusset is a thoughtful touch. Will be ordering more!",
    date: "2025-12-10",
    verified: true,
    helpful: 34
  },
  {
    id: "r007",
    productId: "p010",
    productName: "Padded Floral Lace Bralette",
    author: "Nisha Agarwal",
    avatar: "https://i.pravatar.cc/150?img=36",
    rating: 5,
    title: "Gorgeous and comfortable \u2013 rare combo!",
    body: "This bralette is stunning. The floral lace pattern is so delicate and feminine. I wear it both as a bralette and sometimes as a top with high-waisted jeans. The removable pads are a great feature. Sizing is slightly small so order up if you're between sizes.",
    date: "2025-11-22",
    verified: true,
    helpful: 41
  },
  {
    id: "r008",
    productId: "p004",
    productName: "Bamboo Hipster Panty",
    author: "Lakshmi Iyer",
    avatar: "https://i.pravatar.cc/150?img=55",
    rating: 5,
    title: "Eco-friendly AND incredibly soft",
    body: "I switched to bamboo fabric a year ago and Van Elvina's version is the best I've tried. Softer than cotton, stays fresh throughout the day, and washes beautifully. Love that they're sustainable too. The sage green color is exactly as shown \u2014 beautiful!",
    date: "2025-10-05",
    verified: true,
    helpful: 18
  },
  {
    id: "r009",
    productId: "p001",
    productName: "Everyday Soft Cotton Bra",
    author: "Radha Nair",
    avatar: "https://i.pravatar.cc/150?img=28",
    rating: 4,
    title: "Good quality but runs slightly small",
    body: "The quality is excellent and the cotton is beautifully soft. I found it runs about half a size small so I'd recommend sizing up if you're between sizes. Once I exchanged for a larger size the fit was perfect. Customer service was also very helpful!",
    date: "2025-09-14",
    verified: true,
    helpful: 15
  },
  {
    id: "r010",
    productId: "p011",
    productName: "High-Waist Shaping Brief",
    author: "Anjali Gupta",
    avatar: "https://i.pravatar.cc/150?img=61",
    rating: 4,
    title: "Excellent shaping with breathing room",
    body: "Most shapewear leaves me gasping but this is different. Good control without the suffocating compression. The open-bust design means I can wear my own bra. Completely invisible under my sarees and fitted dresses. Very happy with this purchase!",
    date: "2025-12-01",
    verified: true,
    helpful: 27
  },
  {
    id: "r011",
    productId: "p007",
    productName: "Full Coverage Minimizer Bra",
    author: "Deepa Venkatesh",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 5,
    title: "Finally a minimizer that actually works",
    body: "I've been wearing a 38D for years and finding a comfortable minimizer is always a challenge. This bra is absolutely perfect \u2014 distributes everything evenly, the straps don't dig in, and it's comfortable enough for 12-hour days at work. A true game changer.",
    date: "2025-11-30",
    verified: true,
    helpful: 53
  },
  {
    id: "r012",
    productId: "p006",
    productName: "Modal Sleep Bralette",
    author: "Pooja Malhotra",
    avatar: "https://i.pravatar.cc/150?img=16",
    rating: 5,
    title: "I never sleep without it now",
    body: "Started wearing this sleep bralette on a whim and now I can't sleep without it. The modal is incredibly breathable \u2014 I used to wake up sweaty in regular cotton but not anymore. The fit is relaxed and comfortable. Gifted two to my sisters!",
    date: "2025-10-25",
    verified: true,
    helpful: 31
  }
];
const faqsData = [
  {
    id: "f001",
    question: "How do I find my correct bra size?",
    answer: "To find your correct bra size, measure your band size (ribcage just below bust) and your bust size (fullest part of bust). The difference between bust and band gives your cup size: 1 inch = A, 2 inches = B, 3 inches = C, 4 inches = D. We also offer a free size guide in every product page with detailed measurement instructions.",
    category: "Sizing"
  },
  {
    id: "f002",
    question: "What is your return and exchange policy?",
    answer: "We offer a 30-day easy return and exchange policy on all unworn, unwashed items with original tags attached. Intimate apparel (panties, shapewear) cannot be returned for hygiene reasons unless defective. Exchange for a different size is always free. To initiate a return, visit your Order History page and select 'Return/Exchange'.",
    category: "Returns"
  },
  {
    id: "f003",
    question: "How long does delivery take?",
    answer: "Standard delivery takes 3-5 business days across India. Express delivery (1-2 days) is available in metro cities for an additional \u20B999. Orders above \u20B9999 get free standard shipping. You'll receive a tracking link via SMS and email once your order is dispatched.",
    category: "Shipping"
  },
  {
    id: "f004",
    question: "Are Van Elvina products safe for sensitive skin?",
    answer: "Yes! All our products are OEKO-TEX certified, meaning they're tested for harmful substances and safe for sensitive skin. Our cotton and modal range is especially recommended for sensitive skin types. The cotton gusset in all our panties provides an additional layer of skin-friendly comfort.",
    category: "Product"
  },
  {
    id: "f005",
    question: "Do you offer plus sizes?",
    answer: "Absolutely! Van Elvina is committed to inclusive sizing. Our bra range goes from 28A to 44H, and our panties range from XS to 4XL. We're continuously expanding our size range. If you can't find your size, you can join our waitlist and we'll notify you when it's available.",
    category: "Sizing"
  },
  {
    id: "f006",
    question: "How should I care for my lingerie to make it last longer?",
    answer: "For maximum longevity: hand wash or use a lingerie bag in the washing machine on a gentle cycle. Use cold water and mild detergent. Never put bras in the dryer \u2014 heat damages the elastic and foam. Rotate your bras (don't wear the same bra two days in a row) to allow the elastic to recover. Store bras with cups stacked, not folded.",
    category: "Care"
  },
  {
    id: "f007",
    question: "Can I track my order?",
    answer: "Yes! Once your order is dispatched, you'll receive an SMS and email with a tracking link. You can also track your order by visiting the 'My Orders' section in your account, or by using the 'Track Order' feature on our website with your order number and registered phone number.",
    category: "Shipping"
  },
  {
    id: "f008",
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking, EMI (no-cost EMI available on orders above \u20B93,000), and Cash on Delivery (available in select pin codes).",
    category: "Payment"
  },
  {
    id: "f009",
    question: "Do you have a loyalty/rewards program?",
    answer: "Yes! Our 'Elvina Rewards' program lets you earn points on every purchase (1 point per \u20B910 spent). Points can be redeemed for discounts on future orders. You also get bonus points for referrals, reviews, and birthday rewards. Premium members (\u20B95,000+ annual spend) get early access to sales and free express shipping.",
    category: "Loyalty"
  },
  {
    id: "f010",
    question: "What is the difference between wired and wireless bras?",
    answer: "Wired bras have an underwire that provides structure and lift, making them ideal for larger cup sizes or formal occasions. Wireless bras rely on fabric construction, seaming, and padding for support \u2014 they're more comfortable for everyday wear and highly recommended for home or casual use. Both styles have their place in every wardrobe, and Van Elvina offers premium options in both categories.",
    category: "Product"
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useUIStore();
    const { getBySlug, all } = useProducts();
    const { addToCart } = useCart();
    const wishlist = useWishlistStore();
    const product = computed(() => getBySlug(route.params.slug));
    const selectedVariant = ref(0);
    const selectedSize = ref("");
    const qty = ref(1);
    const sizeError = ref(false);
    const adding = ref(false);
    const pincode = ref("");
    const deliveryMsg = ref("");
    const deliveryOk = ref(false);
    const activeImageIdx = ref(0);
    const activeTab = ref("Description");
    const openFaq = ref(null);
    const tabs = ["Description", "Fabric & Care", "Reviews", "FAQs"];
    const faqs = faqsData.slice(0, 5);
    const allImages = computed(
      () => {
        var _a, _b, _c;
        return (_c = (_b = (_a = product.value) == null ? void 0 : _a.variants[selectedVariant.value]) == null ? void 0 : _b.images) != null ? _c : [];
      }
    );
    const activeImage = computed(() => {
      var _a;
      return (_a = allImages.value[activeImageIdx.value]) != null ? _a : "";
    });
    const isWishlisted = computed(
      () => product.value ? wishlist.isWishlisted(product.value.id) : false
    );
    const productReviews = computed(
      () => reviewsData.filter((r) => {
        var _a;
        return r.productId === ((_a = product.value) == null ? void 0 : _a.id);
      }).slice(0, 3)
    );
    const similarProducts = computed(
      () => all.value.filter((p) => {
        var _a, _b;
        return p.category === ((_a = product.value) == null ? void 0 : _a.category) && p.id !== ((_b = product.value) == null ? void 0 : _b.id);
      }).slice(0, 6)
    );
    const handleAddToCart = async () => {
      if (!selectedSize.value) {
        sizeError.value = true;
        return;
      }
      sizeError.value = false;
      adding.value = true;
      await new Promise((r) => setTimeout(r, 400));
      adding.value = false;
      if (!product.value) return;
      addToCart(product.value, product.value.variants[selectedVariant.value].color, selectedSize.value, qty.value);
    };
    const checkDelivery = () => {
      var _a, _b, _c, _d;
      if (!isValidPincode(pincode.value)) {
        deliveryMsg.value = "Please enter a valid 6-digit PIN code.";
        deliveryOk.value = false;
        return;
      }
      deliveryOk.value = true;
      deliveryMsg.value = `\u2705 Delivery available! Estimated in ${(_b = (_a = product.value) == null ? void 0 : _a.deliveryDays) != null ? _b : 3}-${((_d = (_c = product.value) == null ? void 0 : _c.deliveryDays) != null ? _d : 3) + 2} business days.`;
    };
    watch(selectedSize, () => {
      if (selectedSize.value) sizeError.value = false;
    });
    watchEffect(() => {
      var _a;
      if (!product.value) return;
      useSeoMeta({
        title: `${product.value.name} \u2013 Van Elvina`,
        description: product.value.description.slice(0, 160),
        ogTitle: product.value.name,
        ogDescription: product.value.description.slice(0, 160),
        ogImage: (_a = product.value.variants[0]) == null ? void 0 : _a.images[0]
      });
      useHead({
        script: [
          { type: "application/ld+json", children: JSON.stringify(productSchema(product.value, `https://vanelvina.com/products/${product.value.slug}`)) },
          { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema([{ name: "Home", url: "https://vanelvina.com" }, { name: "Products", url: "https://vanelvina.com/products" }, { name: product.value.name, url: `https://vanelvina.com/products/${product.value.slug}` }])) },
          { type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) }
        ]
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      const _component_AppBadge = _sfc_main$1;
      const _component_AppRating = _sfc_main$2;
      const _component_AppButton = _sfc_main$3;
      const _component_ReviewCard = _sfc_main$4;
      const _component_ProductCard = _sfc_main$5;
      if (unref(product)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-warm-ivory min-h-screen" }, _attrs))} data-v-faf7017c><div class="bg-white border-b border-border-gray" data-v-faf7017c><div class="page-container py-3" data-v-faf7017c><nav aria-label="Breadcrumb" data-v-faf7017c><ol class="flex items-center gap-2 text-xs font-ui text-mid-gray flex-wrap" data-v-faf7017c><li data-v-faf7017c>`);
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
        _push(`</li><li aria-hidden="true" data-v-faf7017c>/</li><li data-v-faf7017c>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "hover:text-deep-plum"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Products`);
            } else {
              return [
                createTextVNode("Products")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li aria-hidden="true" data-v-faf7017c>/</li><li data-v-faf7017c>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/products?category=${unref(product).category}`,
          class: "hover:text-deep-plum"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(product).category)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(product).category), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li aria-hidden="true" data-v-faf7017c>/</li><li class="text-charcoal font-medium truncate max-w-[200px]" data-v-faf7017c>${ssrInterpolate(unref(product).name)}</li></ol></nav></div></div><div class="page-container py-6 lg:py-10" data-v-faf7017c><div class="grid lg:grid-cols-2 gap-8 lg:gap-12" data-v-faf7017c><div class="space-y-3" data-v-faf7017c><div class="relative aspect-product bg-light-gray rounded-2xl overflow-hidden" data-v-faf7017c><img${ssrRenderAttr("src", unref(activeImage))}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-cover transition-all duration-300" width="600" height="800" fetchpriority="high" data-v-faf7017c><div class="absolute top-4 left-4 flex flex-col gap-2" data-v-faf7017c>`);
        if (unref(product).badge) {
          _push(ssrRenderComponent(_component_AppBadge, {
            variant: unref(product).badge,
            label: unref(product).badge === "bestseller" ? "Best Seller" : unref(product).badge
          }, null, _parent));
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
        _push(`</div></div><div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1" data-v-faf7017c><!--[-->`);
        ssrRenderList(unref(allImages), (img, idx) => {
          _push(`<button class="${ssrRenderClass([unref(activeImageIdx) === idx ? "border-deep-plum" : "border-transparent hover:border-border-gray", "w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200"])}"${ssrRenderAttr("aria-label", `View image ${idx + 1}`)}${ssrRenderAttr("aria-pressed", unref(activeImageIdx) === idx)} data-v-faf7017c><img${ssrRenderAttr("src", img)}${ssrRenderAttr("alt", `Product view ${idx + 1}`)} class="w-full h-full object-cover" width="64" height="64" loading="lazy" data-v-faf7017c></button>`);
        });
        _push(`<!--]--></div></div><div class="space-y-5" data-v-faf7017c><div data-v-faf7017c><p class="text-xs text-dusty-rose font-ui font-semibold uppercase tracking-wider mb-1" data-v-faf7017c>${ssrInterpolate(unref(product).category)}</p><h1 class="font-serif text-2xl md:text-3xl text-deep-plum font-bold leading-tight mb-2" data-v-faf7017c>${ssrInterpolate(unref(product).name)}</h1><div class="flex items-center gap-3 flex-wrap" data-v-faf7017c>`);
        _push(ssrRenderComponent(_component_AppRating, {
          rating: unref(product).rating,
          count: unref(product).reviewCount,
          "show-count": "",
          "show-value": ""
        }, null, _parent));
        _push(`<span class="text-xs text-mid-gray font-ui" data-v-faf7017c>SKU: ${ssrInterpolate(unref(product).sku)}</span></div></div><div class="flex items-end gap-3 pb-4 border-b border-border-gray" data-v-faf7017c><span class="text-3xl font-semibold text-charcoal font-sans" data-v-faf7017c>${ssrInterpolate(unref(formatPrice)(unref(product).price))}</span>`);
        if (unref(product).originalPrice > unref(product).price) {
          _push(`<span class="text-lg text-mid-gray line-through font-ui mb-0.5" data-v-faf7017c>${ssrInterpolate(unref(formatPrice)(unref(product).originalPrice))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).discount) {
          _push(`<span class="text-sm font-semibold text-green-600 font-ui mb-0.5" data-v-faf7017c> You save ${ssrInterpolate(unref(formatPrice)(unref(product).originalPrice - unref(product).price))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-faf7017c><p class="text-sm font-ui font-semibold text-charcoal mb-2" data-v-faf7017c> Color: <span class="font-normal text-mid-gray" data-v-faf7017c>${ssrInterpolate(unref(product).variants[unref(selectedVariant)].color)}</span></p><div class="flex gap-2.5" data-v-faf7017c><!--[-->`);
        ssrRenderList(unref(product).variants, (variant, idx) => {
          _push(`<button class="${ssrRenderClass([unref(selectedVariant) === idx ? "border-deep-plum scale-110 shadow-md" : "border-white shadow-sm hover:scale-105", "w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer"])}" style="${ssrRenderStyle({ backgroundColor: variant.colorHex })}"${ssrRenderAttr("aria-label", variant.color)}${ssrRenderAttr("aria-pressed", unref(selectedVariant) === idx)} data-v-faf7017c></button>`);
        });
        _push(`<!--]--></div></div><div data-v-faf7017c><div class="flex items-center justify-between mb-2" data-v-faf7017c><p class="text-sm font-ui font-semibold text-charcoal" data-v-faf7017c> Size: <span class="font-normal text-mid-gray" data-v-faf7017c>${ssrInterpolate(unref(selectedSize) || "Select a size")}</span></p><button class="text-xs text-dusty-rose font-ui hover:text-deep-plum underline" data-v-faf7017c> Size Guide </button></div><div class="flex flex-wrap gap-2" data-v-faf7017c><!--[-->`);
        ssrRenderList(unref(product).variants[unref(selectedVariant)].sizes, (size) => {
          _push(`<button class="${ssrRenderClass([unref(selectedSize) === size ? "border-deep-plum bg-deep-plum text-white shadow-sm" : "border-border-gray text-charcoal hover:border-dusty-rose hover:text-dusty-rose", "min-w-[48px] px-3 py-2 border rounded-lg text-sm font-ui font-medium transition-all duration-200 cursor-pointer"])}"${ssrRenderAttr("aria-pressed", unref(selectedSize) === size)}${ssrRenderAttr("aria-label", `Size ${size}`)} data-v-faf7017c>${ssrInterpolate(size)}</button>`);
        });
        _push(`<!--]--></div>`);
        if (unref(sizeError)) {
          _push(`<p class="mt-1.5 text-xs text-red-500 font-ui" role="alert" data-v-faf7017c>Please select a size to continue.</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-faf7017c><p class="text-sm font-ui font-semibold text-charcoal mb-2" data-v-faf7017c>Quantity</p><div class="flex items-center gap-3" data-v-faf7017c><button class="qty-btn" aria-label="Decrease quantity" data-v-faf7017c>\u2212</button><span class="w-8 text-center font-ui font-semibold text-charcoal" aria-live="polite" aria-label="Quantity" data-v-faf7017c>${ssrInterpolate(unref(qty))}</span><button class="qty-btn" aria-label="Increase quantity" data-v-faf7017c>+</button><span class="text-xs text-mid-gray font-ui ml-2" data-v-faf7017c>${ssrInterpolate(unref(product).stockCount)} in stock</span></div></div><div class="flex gap-3 pb-5 border-b border-border-gray" data-v-faf7017c>`);
        _push(ssrRenderComponent(_component_AppButton, {
          size: "lg",
          full: true,
          loading: unref(adding),
          onClick: handleAddToCart
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-faf7017c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-faf7017c${_scopeId}></path></svg> Add to Cart `);
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
                    d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  })
                ])),
                createTextVNode(" Add to Cart ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="${ssrRenderClass([{ "border-dusty-rose text-dusty-rose bg-rose-blush": unref(isWishlisted) }, "w-12 h-12 shrink-0 rounded-xl border-2 border-border-gray flex items-center justify-center hover:border-dusty-rose hover:text-dusty-rose transition-all"])}"${ssrRenderAttr("aria-label", unref(isWishlisted) ? "Remove from wishlist" : "Add to wishlist")}${ssrRenderAttr("aria-pressed", unref(isWishlisted))} data-v-faf7017c><svg class="w-5 h-5"${ssrRenderAttr("fill", unref(isWishlisted) ? "currentColor" : "none")} stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" data-v-faf7017c><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-faf7017c></path></svg></button></div><div class="bg-light-gray rounded-xl p-4" data-v-faf7017c><p class="text-sm font-ui font-semibold text-charcoal mb-2" data-v-faf7017c>Check Delivery</p><div class="flex gap-2" data-v-faf7017c><input${ssrRenderAttr("value", unref(pincode))} type="text" maxlength="6" placeholder="Enter PIN code" class="input-base flex-1" aria-label="Enter pincode to check delivery" data-v-faf7017c>`);
        _push(ssrRenderComponent(_component_AppButton, {
          size: "sm",
          variant: "secondary",
          onClick: checkDelivery
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Check`);
            } else {
              return [
                createTextVNode("Check")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(deliveryMsg)) {
          _push(`<p class="${ssrRenderClass([unref(deliveryOk) ? "text-green-600" : "text-red-500", "mt-2 text-xs font-ui"])}" role="alert" data-v-faf7017c>${ssrInterpolate(unref(deliveryMsg))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-faf7017c><h2 class="text-sm font-ui font-semibold text-charcoal mb-2" data-v-faf7017c>Product Highlights</h2><ul class="space-y-1.5" data-v-faf7017c><!--[-->`);
        ssrRenderList(unref(product).highlights, (h) => {
          _push(`<li class="flex items-start gap-2 text-sm font-ui text-mid-gray" data-v-faf7017c><svg class="w-4 h-4 text-dusty-rose shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" data-v-faf7017c><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-v-faf7017c></path></svg> ${ssrInterpolate(h)}</li>`);
        });
        _push(`<!--]--></ul></div></div></div><div class="mt-12 bg-white rounded-2xl shadow-soft border border-border-gray overflow-hidden" data-v-faf7017c><div class="flex border-b border-border-gray overflow-x-auto scrollbar-hide" data-v-faf7017c><!--[-->`);
        ssrRenderList(tabs, (tab) => {
          _push(`<button class="${ssrRenderClass([unref(activeTab) === tab ? "border-deep-plum text-deep-plum" : "border-transparent text-mid-gray hover:text-charcoal", "px-6 py-4 text-sm font-ui font-medium whitespace-nowrap transition-colors border-b-2 shrink-0"])}"${ssrRenderAttr("aria-selected", unref(activeTab) === tab)} data-v-faf7017c>${ssrInterpolate(tab)}</button>`);
        });
        _push(`<!--]--></div><div class="p-6" data-v-faf7017c>`);
        if (unref(activeTab) === "Description") {
          _push(`<div data-v-faf7017c><p class="text-sm font-ui text-mid-gray leading-relaxed" data-v-faf7017c>${ssrInterpolate(unref(product).description)}</p></div>`);
        } else if (unref(activeTab) === "Fabric & Care") {
          _push(`<div class="space-y-4" data-v-faf7017c><div data-v-faf7017c><h3 class="font-ui font-semibold text-charcoal text-sm mb-2" data-v-faf7017c>Fabric Composition</h3><p class="text-sm text-mid-gray font-ui" data-v-faf7017c>${ssrInterpolate(unref(product).fabric)}</p></div><div data-v-faf7017c><h3 class="font-ui font-semibold text-charcoal text-sm mb-2" data-v-faf7017c>Care Instructions</h3><ul class="space-y-1.5" data-v-faf7017c><!--[-->`);
          ssrRenderList(unref(product).care, (care) => {
            _push(`<li class="flex items-center gap-2 text-sm text-mid-gray font-ui" data-v-faf7017c><span class="text-base" aria-hidden="true" data-v-faf7017c>\u{1F3F7}\uFE0F</span>${ssrInterpolate(care)}</li>`);
          });
          _push(`<!--]--></ul></div></div>`);
        } else if (unref(activeTab) === "Reviews") {
          _push(`<div data-v-faf7017c><div class="flex items-center gap-6 mb-6" data-v-faf7017c><div class="text-center" data-v-faf7017c><p class="font-serif text-5xl font-bold text-deep-plum" data-v-faf7017c>${ssrInterpolate(unref(product).rating)}</p>`);
          _push(ssrRenderComponent(_component_AppRating, {
            rating: unref(product).rating,
            class: "justify-center my-1"
          }, null, _parent));
          _push(`<p class="text-xs text-mid-gray font-ui" data-v-faf7017c>${ssrInterpolate(unref(product).reviewCount)} reviews</p></div><div class="flex-1" data-v-faf7017c><!--[-->`);
          ssrRenderList([5, 4, 3, 2, 1], (r) => {
            _push(`<div class="flex items-center gap-2 mb-1" data-v-faf7017c><span class="text-xs font-ui text-mid-gray w-3" data-v-faf7017c>${ssrInterpolate(r)}</span><svg class="w-3 h-3 star-filled" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" data-v-faf7017c><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-faf7017c></path></svg><div class="flex-1 h-2 bg-light-gray rounded-full overflow-hidden" data-v-faf7017c><div class="h-full bg-soft-gold rounded-full" style="${ssrRenderStyle({ width: `${r * 18}%` })}" data-v-faf7017c></div></div></div>`);
          });
          _push(`<!--]--></div></div><div class="space-y-4" data-v-faf7017c><!--[-->`);
          ssrRenderList(unref(productReviews), (review) => {
            _push(ssrRenderComponent(_component_ReviewCard, {
              key: review.id,
              review
            }, null, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else if (unref(activeTab) === "FAQs") {
          _push(`<div data-v-faf7017c><!--[-->`);
          ssrRenderList(unref(faqs), (faq, idx) => {
            _push(`<div class="border-b border-border-gray last:border-0" data-v-faf7017c><button class="w-full flex items-center justify-between py-4 text-left text-sm font-ui font-medium text-charcoal hover:text-deep-plum transition-colors"${ssrRenderAttr("aria-expanded", unref(openFaq) === idx)} data-v-faf7017c>${ssrInterpolate(faq.question)} <svg class="${ssrRenderClass([unref(openFaq) === idx ? "rotate-180" : "", "w-4 h-4 shrink-0 transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-v-faf7017c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-faf7017c></path></svg></button>`);
            if (unref(openFaq) === idx) {
              _push(`<div class="pb-4 text-sm text-mid-gray font-ui leading-relaxed" data-v-faf7017c>${ssrInterpolate(faq.answer)}</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="mt-12" data-v-faf7017c><h2 class="font-serif text-2xl text-deep-plum font-semibold mb-6" data-v-faf7017c>Similar Products</h2><div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2" data-v-faf7017c><!--[-->`);
        ssrRenderList(unref(similarProducts), (p) => {
          _push(`<div class="w-48 md:w-56 shrink-0" data-v-faf7017c>`);
          _push(ssrRenderComponent(_component_ProductCard, { product: p }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div><div class="sticky-add-to-cart md:hidden" aria-label="Add to cart bar" data-v-faf7017c><div class="flex-1" data-v-faf7017c><p class="font-sans font-semibold text-sm text-charcoal line-clamp-1" data-v-faf7017c>${ssrInterpolate(unref(product).name)}</p><p class="text-xs text-dusty-rose font-ui" data-v-faf7017c>${ssrInterpolate(unref(formatPrice)(unref(product).price))}</p></div>`);
        _push(ssrRenderComponent(_component_AppButton, {
          size: "md",
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
        _push(`</div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container py-20 text-center" }, _attrs))} data-v-faf7017c><p class="font-serif text-2xl text-deep-plum mb-4" data-v-faf7017c>Product not found</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/products",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Browse All Products`);
            } else {
              return [
                createTextVNode("Browse All Products")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-faf7017c"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-CyGEnUrd.mjs.map
