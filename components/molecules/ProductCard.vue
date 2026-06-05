<template>
  <article class="group relative card cursor-pointer" :aria-label="product.name">
    <!-- Image Container -->
    <div class="relative overflow-hidden aspect-product bg-light-gray">
      <NuxtLink :to="`/products/${product.slug}`" class="block h-full">
        <img
          :src="primaryImage"
          :alt="product.name"
          class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width="300"
          height="400"
        />
        <!-- Hover secondary image -->
        <img
          v-if="secondaryImage"
          :src="secondaryImage"
          :alt="`${product.name} alternate view`"
          class="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          loading="lazy"
          width="300"
          height="400"
        />
      </NuxtLink>

      <!-- Badge -->
      <div class="absolute top-2.5 left-2.5 z-10">
        <AppBadge v-if="product.badge" :variant="product.badge" :label="product.badge === 'bestseller' ? 'Best Seller' : product.badge" />
      </div>

      <!-- Discount Badge -->
      <div v-if="product.discount > 0" class="absolute top-2.5 right-2.5 z-10 bg-red-500 text-white text-[10px] font-ui font-bold px-2 py-0.5 rounded">
        {{ product.discount }}% OFF
      </div>

      <!-- Wishlist -->
      <button
        class="wishlist-btn"
        :class="{ 'text-dusty-rose': isWishlisted }"
        :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
        :aria-pressed="isWishlisted"
        @click.prevent="handleWishlist"
      >
        <svg class="w-4 h-4" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <!-- Quick View (desktop hover) -->
      <div class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
        <button
          class="w-full py-2.5 bg-deep-plum/90 backdrop-blur-sm text-white text-xs font-ui font-medium hover:bg-deep-plum transition-colors"
          :aria-label="`Quick view ${product.name}`"
          @click.prevent="ui.openQuickView(product.slug)"
        >
          Quick View
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-3 md:p-4">
      <NuxtLink :to="`/products/${product.slug}`">
        <p class="text-[11px] text-dusty-rose font-ui font-medium uppercase tracking-wider mb-1">
          {{ product.category }}
        </p>
        <h3 class="font-sans font-medium text-charcoal text-sm leading-snug line-clamp-2 hover:text-deep-plum transition-colors mb-2">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Rating -->
      <div class="flex items-center gap-2 mb-2">
        <AppRating :rating="product.rating" :count="product.reviewCount" show-count />
      </div>

      <!-- Price -->
      <div class="flex items-center gap-2 flex-wrap">
        <span class="font-sans font-semibold text-charcoal text-base">
          {{ formatPrice(product.price) }}
        </span>
        <span v-if="product.originalPrice > product.price" class="text-xs text-mid-gray line-through font-ui">
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- Color dots -->
      <div class="flex items-center gap-1.5 mt-2">
        <button
          v-for="variant in product.variants.slice(0, 4)"
          :key="variant.color"
          class="w-4 h-4 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110 cursor-pointer"
          :style="{ backgroundColor: variant.colorHex }"
          :aria-label="variant.color"
          :title="variant.color"
        />
        <span v-if="product.variants.length > 4" class="text-xs text-mid-gray font-ui">
          +{{ product.variants.length - 4 }}
        </span>
      </div>

      <!-- Add to Cart (mobile visible) -->
      <button
        class="mt-3 w-full py-2 rounded-lg bg-rose-blush text-deep-plum text-xs font-ui font-semibold hover:bg-deep-plum hover:text-white transition-all duration-250 md:hidden"
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

const props = defineProps<{ product: Product }>()

const ui = useUIStore()
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
