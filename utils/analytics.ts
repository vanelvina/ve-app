import { useAuthStore } from '~/stores/auth'

// ── Safe GA wrapper ─────────────────────────────────────────────────────────
// Safely calls window.gtag if it's been initialized. Prevents errors if GA is
// disabled or if called before the analytics plugin has initialized.
export const trackGA = (event: string, params: Record<string, any> = {}) => {
  if (import.meta.client && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

// ── GA Ecommerce Events ─────────────────────────────────────────────────────
export const trackGAAddToCart = (productId: string, productName: string, category: string, price: number, quantity: number = 1) => {
  trackGA('add_to_cart', {
    currency: 'INR',
    value: price * quantity,
    items: [{
      item_id: productId,
      item_name: productName,
      item_category: category,
      price,
      quantity
    }]
  })
}

export const trackGAPurchase = (orderId: string, total: number, items: Array<{ productId: string; name: string; price: number; quantity: number; category?: string }>) => {
  trackGA('purchase', {
    transaction_id: orderId,
    currency: 'INR',
    value: total,
    items: items.map(item => ({
      item_id: item.productId,
      item_name: item.name,
      item_category: item.category || '',
      price: item.price,
      quantity: item.quantity
    }))
  })
}

export const trackGAViewItem = (productId: string, productName: string, category: string, price: number) => {
  trackGA('view_item', {
    currency: 'INR',
    value: price,
    items: [{
      item_id: productId,
      item_name: productName,
      item_category: category,
      price,
      quantity: 1
    }]
  })
}

export const trackGABeginCheckout = (total: number, items: any[]) => {
  trackGA('begin_checkout', {
    currency: 'INR',
    value: total,
    items: items.map(item => ({
      item_id: item.productId || item.id,
      item_name: item.name || item.product?.name,
      price: item.price || item.product?.price,
      quantity: item.quantity
    }))
  })
}

// ── Internal Analytics Events ───────────────────────────────────────────────
export const trackEvent = async (eventType: string, eventData: any = {}) => {
  if (!import.meta.client) return

  try {
    const auth = useAuthStore()
    const config = useRuntimeConfig()

    const userEmail = auth.isLoggedIn ? auth.user?.email : null
    const userName = auth.isLoggedIn ? auth.user?.name : null

    await $fetch(`${config.public.apiBase}/inquiries/event`, {
      method: 'POST',
      keepalive: true,
      body: {
        eventType,
        userEmail,
        userName,
        eventData: {
          ...eventData,
          timestamp: new Date().toISOString()
        }
      }
    })
  } catch (err) {
    console.error(`Failed to log analytics event (${eventType}):`, err)
  }
}

export const trackVisit = (path: string, title: string) => {
  // Only track meaningful page navigations; skip asset/API paths
  if (path.startsWith('/_nuxt') || path.startsWith('/api')) return
  trackEvent('analytics_visit', {
    path,
    title,
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`
  })
}

export const trackProductImpression = (productId: string, productName: string, category: string, price: number) => {
  trackEvent('analytics_impression', {
    productId,
    productName,
    category,
    price
  })
}

export const trackProductClick = (productId: string, productName: string, category: string, price: number) => {
  trackEvent('analytics_click', {
    productId,
    productName,
    category,
    price
  })
}

export const trackAddToCart = (productId: string, productName: string, price: number, color: string, size: string, quantity: number) => {
  trackEvent('analytics_add_to_cart', {
    productId,
    productName,
    price,
    color,
    size,
    quantity
  })
  // Also fire GA ecommerce event
  trackGAAddToCart(productId, productName, '', price, quantity)
}

export const trackCheckout = (orderId: string, total: number, itemsCount: number, items: any[]) => {
  trackEvent('analytics_checkout', {
    orderId,
    total,
    itemsCount,
    items: items.map(item => ({
      productId: item.productId || item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size || 'Standard'
    }))
  })
  // Also fire GA purchase conversion event
  trackGAPurchase(orderId, total, items.map(item => ({
    productId: item.productId || item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity
  })))
}

export const trackProductView = (productId: string, productName: string, category: string, price: number) => {
  trackEvent('analytics_product_view', {
    productId,
    productName,
    category,
    price
  })
  // Also fire GA view_item ecommerce event
  trackGAViewItem(productId, productName, category, price)
}

export const trackCheckoutStarted = (itemsCount: number, total: number) => {
  trackEvent('analytics_checkout_started', {
    itemsCount,
    total
  })
}

export const trackCheckoutAbandoned = (itemsCount: number, total: number, lastStep: string) => {
  trackEvent('analytics_checkout_abandoned', {
    itemsCount,
    total,
    lastStep
  })
}

export const trackLogin = (email: string, name: string) => {
  trackEvent('analytics_login', {
    email,
    name,
    loginTime: new Date().toISOString()
  })
  // Also fire GA login event
  trackGA('login', { method: 'email' })
}
