import { useAuthStore } from '~/stores/auth'

export const trackEvent = async (eventType: string, eventData: any = {}) => {
  if (!import.meta.client) return
  
  try {
    const auth = useAuthStore()
    const config = useRuntimeConfig()
    
    const userEmail = auth.isLoggedIn ? auth.user?.email : null
    const userName = auth.isLoggedIn ? auth.user?.name : null
    
    await $fetch(`${config.public.apiBase}/inquiries/event`, {
      method: 'POST',
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
}

export const trackLogin = (email: string, name: string) => {
  trackEvent('analytics_login', {
    email,
    name,
    loginTime: new Date().toISOString()
  })
}
