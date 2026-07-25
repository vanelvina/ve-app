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
  '@id': 'https://vanelvina.com/#organization',
  name: 'Van Elvina',
  description: "India's premium women's innerwear brand",
  url: 'https://vanelvina.com',
  // Google requires logo as ImageObject (not plain string) to display it next to the site name in search results
  logo: {
    '@type': 'ImageObject',
    '@id': 'https://vanelvina.com/#logo',
    url: 'https://vanelvina.com/icons/icon-512x512.png',
    contentUrl: 'https://vanelvina.com/icons/icon-512x512.png',
    width: 512,
    height: 512,
    caption: 'Van Elvina',
  },
  image: { '@id': 'https://vanelvina.com/#logo' },
  sameAs: [
    'https://www.instagram.com/van_elvina_official?igsh=Nmp2OWc3Yjg0MDhy',
    'https://www.facebook.com/share/1CgGsR3nV2/',
    'https://x.com/VanElvinaX',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
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
