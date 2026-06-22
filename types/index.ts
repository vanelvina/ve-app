// Shared TypeScript types for Van Elvina

export interface ProductVariant {
  color: string
  colorHex: string
  sizes: string[]
  images: string[]
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  subcategory: string
  description: string
  highlights: string[]
  fabric: string
  care: string[]
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  badge?: 'new' | 'bestseller' | 'sale' | 'trending'
  tags: string[]
  variants: ProductVariant[]
  inStock: boolean
  stockCount: number
  sku: string
  styleId?: string
  deliveryDays: number
  isWishlisted?: boolean
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productCount: number
  subcategories: { id: string; name: string; slug: string }[]
}

export interface Review {
  id: string
  productId: string
  productName: string
  author: string
  avatar: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
  helpful: number
  images?: string[]
}

export interface Banner {
  id: string
  title: string
  subtitle: string
  cta: string
  ctaLink: string
  image: string
  imageMobile: string
  badge?: string
  textColor: 'light' | 'dark'
  align: 'left' | 'center' | 'right'
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface CartItem {
  productId: string
  variantColor: string
  size: string
  quantity: number
  product: Product
}

export interface Address {
  fullName: string
  phone: string
  email: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  isDefault?: boolean
}

export interface FilterState {
  categories: string[]
  sizes: string[]
  colors: string[]
  priceRange: [number, number]
  rating: number | null
  inStock: boolean
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'discount'
