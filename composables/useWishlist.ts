import { useWishlistStore } from '~/stores/wishlist'
import { useUIStore } from '~/stores/ui'
import type { Product } from '~/types'

export const useWishlist = () => {
  const wishlist = useWishlistStore()
  const ui = useUIStore()

  const toggle = (product: Product) => {
    wishlist.toggle(product)
  }

  return {
    items: computed(() => wishlist.items),
    count: computed(() => wishlist.count),
    isEmpty: computed(() => wishlist.isEmpty),
    isWishlisted: (productId: string) => wishlist.isWishlisted(productId),
    toggle,
    remove: (productId: string) => wishlist.remove(productId),
  }
}
