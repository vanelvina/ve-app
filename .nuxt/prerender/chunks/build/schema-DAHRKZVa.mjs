import { a as _sfc_main$1 } from './products-Bors2uVq.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'file://C:/Project/Van%20Elvina/van-elvina/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'file://C:/Project/Van%20Elvina/van-elvina/node_modules/vue/server-renderer/index.mjs';
import { a as formatDate } from './formatters-CRqlhyd1.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ReviewCard",
  __ssrInlineRender: true,
  props: {
    review: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppRating = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl p-5 shadow-soft border border-border-gray" }, _attrs))}><div class="flex items-start justify-between gap-3 mb-3"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", __props.review.avatar)}${ssrRenderAttr("alt", __props.review.author)} class="w-10 h-10 rounded-full object-cover" width="40" height="40" loading="lazy"><div><p class="font-ui font-semibold text-sm text-charcoal">${ssrInterpolate(__props.review.author)}</p><p class="text-xs text-mid-gray font-ui">${ssrInterpolate(unref(formatDate)(__props.review.date))}</p></div></div><div class="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full shrink-0"><svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg><span class="text-[10px] text-green-700 font-ui font-medium">Verified</span></div></div>`);
      _push(ssrRenderComponent(_component_AppRating, {
        rating: __props.review.rating,
        "show-value": "",
        class: "mb-2"
      }, null, _parent));
      _push(`<h4 class="font-sans font-semibold text-charcoal text-sm mb-1.5">${ssrInterpolate(__props.review.title)}</h4><p class="text-sm text-mid-gray font-ui leading-relaxed line-clamp-3">${ssrInterpolate(__props.review.body)}</p><p class="mt-2 text-xs text-dusty-rose font-ui"> For: ${ssrInterpolate(__props.review.productName)}</p><div class="mt-3 flex items-center gap-1.5 text-xs text-mid-gray font-ui"><button class="hover:text-deep-plum transition-colors" aria-label="Mark as helpful"> \u{1F44D} Helpful (${ssrInterpolate(__props.review.helpful)}) </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/molecules/ReviewCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const productSchema = (product, url) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  sku: product.sku,
  brand: {
    "@type": "Brand",
    name: "Van Elvina"
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: product.price,
    priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
    availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    url
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: product.rating,
    reviewCount: product.reviewCount,
    bestRating: 5,
    worstRating: 1
  }
});
const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: item.url
  }))
});
const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});
const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Van Elvina",
  description: "India's premium women's innerwear brand",
  url: "https://vanelvina.com",
  logo: "https://vanelvina.com/icons/icon-512x512.png",
  sameAs: [
    "https://instagram.com/vanelvina",
    "https://facebook.com/vanelvina",
    "https://twitter.com/vanelvina"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-1800-XXX-XXXX",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"]
  }
});

export { _sfc_main as _, breadcrumbSchema as b, faqSchema as f, organizationSchema as o, productSchema as p };
//# sourceMappingURL=schema-DAHRKZVa.mjs.map
