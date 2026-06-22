import type { Product, Review } from '~/types'

// Product JSON-LD schema
export const productSchema = (product: Product, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  sku: product.sku,
  mpn: product.styleId,
  brand: {
    '@type': 'Brand',
    name: 'Van Elvina',
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: product.price,
    priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    availability: product.inStock
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    url,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.reviewCount,
    bestRating: 5,
    worstRating: 1,
  },
})

// Breadcrumb JSON-LD schema
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.url,
  })),
})

// FAQ JSON-LD schema
export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

// Organization JSON-LD schema
export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Van Elvina',
  description: "India's premium women's innerwear brand",
  url: 'https://vanelvina.com',
  logo: 'https://vanelvina.com/icons/icon-512x512.png',
  sameAs: [
    'https://instagram.com/vanelvina',
    'https://facebook.com/vanelvina',
    'https://twitter.com/vanelvina',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-1800-XXX-XXXX',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
})

// Review JSON-LD schema
export const reviewSchema = (review: Review) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  author: { '@type': 'Person', name: review.author },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.rating,
    bestRating: 5,
  },
  reviewBody: review.body,
  datePublished: review.date,
})
