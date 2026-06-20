<template>
  <article class="group relative card cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-premium transition-shadow duration-300 border border-rose-blush/20" :aria-label="product.name">
    <!-- Image Container -->
    <div class="relative overflow-hidden aspect-product bg-warm-ivory">
      <NuxtLink :to="`/products/${product.slug}`" class="block h-full">
        <!-- Main Image -->
        <img
          :src="primaryImage"
          :alt="product.name"
          class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          width="300"
          height="400"
        />
        <!-- Hover secondary image -->
        <img
          v-if="secondaryImage"
          :src="secondaryImage"
          :alt="`${product.name} alternate view`"
          class="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          loading="lazy"
          width="300"
          height="400"
        />
      </NuxtLink>

      <!-- Badge (New, Bestseller etc) -->
      <div class="absolute top-2.5 left-2.5 z-10">
        <span
          v-if="product.badge"
          class="px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-white shadow-soft"
          :class="product.badge === 'bestseller' ? 'bg-amber-500' : product.badge === 'new' ? 'bg-deep-plum' : 'bg-dusty-rose'"
        >
          {{ product.badge === 'bestseller' ? 'Best Seller' : product.badge }}
        </span>
      </div>

      <!-- Discount Badge (Clovia Seal Style) -->
      <div v-if="product.discount > 0" class="absolute top-2.5 right-2.5 z-10 bg-red-500 text-white text-[10px] font-ui font-bold px-2 py-0.5 rounded shadow-soft">
        {{ product.discount }}% OFF
      </div>

      <!-- Wishlist Heart Icon -->
      <button
        class="wishlist-btn text-charcoal/60 hover:text-red-500 hover:bg-red-50"
        :class="{ '!text-red-500': isWishlisted }"
        :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
        :aria-pressed="isWishlisted"
        @click.prevent="handleWishlist"
      >
        <svg class="w-4 h-4" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <!-- Product Details Content -->
    <div class="p-3 md:p-4 flex flex-col flex-1">
      <NuxtLink :to="`/products/${product.slug}`" class="flex-1">
        <p class="text-[10px] text-dusty-rose font-ui font-semibold uppercase tracking-wider mb-1">
          {{ product.category }}
        </p>
        <h3 class="font-sans font-semibold text-charcoal text-xs sm:text-sm leading-snug line-clamp-2 hover:text-deep-plum transition-colors mb-2">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Star Rating -->
      <div class="flex items-center gap-2 mb-2">
        <AppRating :rating="product.rating" :count="product.reviewCount" show-count />
      </div>

      <!-- Price Layout -->
      <div class="flex items-baseline gap-2 flex-wrap">
        <span class="font-sans font-bold text-deep-plum text-sm sm:text-base">
          {{ formatPrice(product.price) }}
        </span>
        <span v-if="product.originalPrice > product.price" class="text-[11px] text-mid-gray line-through font-ui">
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- Color Variant Swatches -->
      <div class="flex items-center gap-1.5 mt-3">
        <div
          v-for="variant in product.variants.slice(0, 4)"
          :key="variant.color"
          class="w-3.5 h-3.5 rounded-full border border-charcoal/15 shadow-sm transition-transform hover:scale-110 cursor-pointer"
          :style="{ backgroundColor: variant.colorHex }"
          :title="variant.color"
        />
        <span v-if="product.variants.length > 4" class="text-[10px] text-mid-gray font-ui">
          +{{ product.variants.length - 4 }}
        </span>
      </div>

      <!-- Add to Cart (mobile visible) -->
      <button
        class="mt-3 w-full py-2.5 rounded-lg bg-rose-blush text-deep-plum text-xs font-ui font-semibold hover:bg-deep-plum hover:text-white transition-all duration-250 md:hidden"
        :aria-label="`Add ${product.name} to cart`"
        @click.prevent="handleQuickAdd"
      >
        Add to Cart
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types'
import { formatPrice } from '~/utils/formatters'
import { useCart } from '~/composables/useCart'

const props = defineProps<{ product: Product }>()

const ui = useUIStore()
const { addToCart } = useCart()
const { toggle, isWishlisted: isWishlistedFn } = useWishlist()

const isWishlisted = computed(() => isWishlistedFn(props.product.id))

const primaryImage = computed(
  () => props.product.variants[0]?.images[0] || 'https://via.placeholder.com/300x400?text=Van+Elvina',
)
const secondaryImage = computed(() => props.product.variants[0]?.images[1] || null)

const handleWishlist = () => toggle(props.product)

const handleQuickAdd = () => {
  ui.openQuickView(props.product.slug)
}
</script>
