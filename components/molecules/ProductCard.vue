<template>
  <article class="group relative card cursor-pointer flex flex-col h-full bg-white rounded-none overflow-hidden hover:shadow-premium transition-all duration-300 border border-charcoal/15 hover:border-charcoal/40" :aria-label="product.name">
    <!-- Image Container -->
    <div class="relative overflow-hidden aspect-product bg-warm-ivory shrink-0">
      
      <!-- Mobile Swipeable Image Gallery -->
      <div class="md:hidden w-full h-full relative">
        <div 
          class="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
          @scroll="handleScroll"
        >
          <div 
            v-for="(img, idx) in allProductImages" 
            :key="idx" 
            class="w-full h-full shrink-0 snap-start snap-always"
          >
            <NuxtLink 
              :to="`/products/${product.slug}`" 
              class="block w-full h-full" 
              @click="trackProductClick(product.id || (product as any)._id, product.name, product.category, product.price)"
            >
              <img
                :src="img"
                :alt="`${product.name} view ${idx + 1}`"
                class="w-full h-full object-cover object-center"
                loading="lazy"
                width="300"
                height="400"
              />
            </NuxtLink>
          </div>
        </div>

        <!-- Dots Indicator -->
        <div 
          v-if="allProductImages.length > 1"
          class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 pointer-events-none"
        >
          <span 
            v-for="(_, index) in allProductImages" 
            :key="index"
            class="w-1.2 h-1.2 rounded-full transition-all duration-200"
            :class="index === activeImageIndex ? 'bg-deep-plum w-2.5' : 'bg-charcoal/20'"
          />
        </div>
      </div>

      <!-- Desktop Hover Layout -->
      <NuxtLink 
        :to="`/products/${product.slug}`" 
        class="hidden md:block w-full h-full relative" 
        @click="trackProductClick(product.id || (product as any)._id, product.name, product.category, product.price)"
      >
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

      <!-- Status Badges Stack (Top-Left) -->
      <div class="absolute top-2 left-2 md:top-2.5 md:left-2.5 z-10 flex flex-col gap-1 items-start">
        <span
          v-if="product.badge"
          class="px-1.5 py-0.5 md:px-2.5 md:py-0.5 rounded text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-white shadow-soft"
          :class="product.badge === 'bestseller' ? 'bg-amber-500' : product.badge === 'new' ? 'bg-deep-plum' : 'bg-dusty-rose'"
        >
          {{ product.badge === 'bestseller' ? 'Best Seller' : product.badge }}
        </span>
        
        <span 
          v-if="product.discount > 0" 
          class="px-1.5 py-0.5 md:px-2 md:py-0.5 rounded text-[8px] md:text-[9px] font-ui font-bold uppercase tracking-wider text-white bg-red-500 shadow-soft"
        >
          {{ product.discount }}% OFF
        </span>
      </div>

      <!-- Wishlist Heart Icon -->
      <button
        class="wishlist-btn text-charcoal/60 hover:text-red-500 hover:bg-red-50 p-1 md:p-1.5"
        :class="{ '!text-red-500': isWishlisted }"
        :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
        :aria-pressed="isWishlisted"
        @click.prevent="handleWishlist"
      >
        <svg class="w-3.5 h-3.5 md:w-4 md:h-4" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <!-- Product Details Content -->
    <div class="p-2 sm:p-3 md:p-4 flex flex-col flex-1">
      <NuxtLink :to="`/products/${product.slug}`" class="flex-1" @click="trackProductClick(product.id || (product as any)._id, product.name, product.category, product.price)">
        <p class="text-[9px] md:text-[10px] text-dusty-rose font-ui font-semibold uppercase tracking-wider mb-0.5 md:mb-1">
          {{ product.category }}
        </p>
        <h3 class="font-sans font-semibold text-charcoal text-xs sm:text-sm leading-snug line-clamp-2 hover:text-deep-plum transition-colors mb-1 md:mb-2">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Star Rating -->
      <div class="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
        <AppRating :rating="product.rating" :count="product.reviewCount" show-count />
      </div>

      <!-- Price Layout -->
      <div class="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
        <span class="font-sans font-bold text-deep-plum text-xs sm:text-sm md:text-base">
          {{ formatPrice(product.price) }}
        </span>
        <span v-if="product.originalPrice > product.price" class="text-[9px] md:text-[11px] text-mid-gray line-through font-ui">
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- Color Variant Swatches -->
      <div class="flex items-center gap-1 md:gap-1.5 mt-2 md:mt-3">
        <div
          v-for="variant in product.variants.slice(0, 4)"
          :key="variant.color"
          class="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-charcoal/15 shadow-sm transition-transform hover:scale-110 cursor-pointer"
          :style="{ backgroundColor: variant.colorHex }"
          :title="variant.color"
        />
        <span v-if="product.variants.length > 4" class="text-[9px] md:text-[10px] text-mid-gray font-ui">
          +{{ product.variants.length - 4 }}
        </span>
      </div>

      <!-- Add to Cart (mobile visible) -->
      <button
        class="mt-2.5 md:mt-3 w-full py-1.5 md:py-2.5 rounded-lg bg-rose-blush text-deep-plum text-[10px] md:text-xs font-ui font-semibold hover:bg-deep-plum hover:text-white transition-all duration-250 md:hidden"
        :aria-label="`Add ${product.name} to cart`"
        @click.prevent="handleQuickAdd"
      >
        Add to Cart
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '~/types'
import { formatPrice } from '~/utils/formatters'

const props = defineProps<{ product: Product }>()

const ui = useUIStore()
const { toggle, isWishlisted: isWishlistedFn } = useWishlist()

const isWishlisted = computed(() => {
  const pId = props.product.id || (props.product as any)._id
  return pId ? isWishlistedFn(pId) : false
})

const primaryImage = computed(
  () => props.product.variants[0]?.images[0] || 'https://via.placeholder.com/300x400?text=Van+Elvina',
)
const secondaryImage = computed(() => props.product.variants[0]?.images[1] || null)

// Extract swipeable image set for mobile
const allProductImages = computed(() => {
  const imgs: string[] = []
  if (props.product.variants && Array.isArray(props.product.variants)) {
    props.product.variants.forEach((v: any) => {
      if (v.images && Array.isArray(v.images)) {
        v.images.forEach((img: string) => {
          if (img && !imgs.includes(img)) {
            imgs.push(img)
          }
        })
      }
    })
  }

  if (imgs.length === 0 && props.product.images && Array.isArray(props.product.images)) {
    props.product.images.forEach((img: string) => {
      if (img && !imgs.includes(img)) {
        imgs.push(img)
      }
    })
  }

  if (imgs.length === 0) {
    if (primaryImage.value) imgs.push(primaryImage.value)
    if (secondaryImage.value) imgs.push(secondaryImage.value)
  }

  return imgs.slice(0, 4) // limit to 4 for performance
})

const activeImageIndex = ref(0)
const handleScroll = (event: Event) => {
  const el = event.target as HTMLElement
  const scrollPosition = el.scrollLeft
  const width = el.clientWidth
  activeImageIndex.value = Math.round(scrollPosition / width)
}

const handleWishlist = () => toggle(props.product)

const handleQuickAdd = () => {
  trackProductClick(props.product.id || (props.product as any)._id, props.product.name, props.product.category, props.product.price)
  ui.openQuickView(props.product.slug)
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
