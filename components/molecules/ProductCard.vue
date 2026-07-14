<template>
  <article class="group relative card cursor-pointer flex flex-col h-full bg-white rounded-none overflow-hidden hover:shadow-premium transition-all duration-300 border border-charcoal/15 hover:border-charcoal/40" :aria-label="product.name">
    <!-- Image Container -->
    <div 
      class="relative overflow-hidden aspect-product bg-warm-ivory shrink-0"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <NuxtLink 
        :to="`/products/${product.slug}`" 
        class="block w-full h-full relative" 
        @click="trackProductClick(product.id || (product as any)._id, product.name, product.category, product.price)"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <!-- Main Image Container — transitions via slide direction per active variant or image change -->
        <Transition :name="slideDirection">
          <div :key="activeVariantIdx + '-' + activeImageIndex" class="absolute inset-0 w-full h-full overflow-hidden">
            <!-- Skeleton shown while image is loading -->
            <div
              v-if="!isImageLoaded(activeVariantImages[activeImageIndex])"
              class="absolute inset-0 w-full h-full bg-[#F0EDED] flex items-center justify-center overflow-hidden"
              aria-hidden="true"
            >
              <!-- Shimmer sweep -->
              <div class="absolute inset-0 skeleton-shimmer" />
              <!-- Faded brand watermark -->
              <img
                src="/favicon2.png"
                alt=""
                class="w-12 h-12 opacity-[0.13] object-contain select-none pointer-events-none"
                aria-hidden="true"
              />
            </div>
            <img
              :src="activeVariantImages[activeImageIndex] || '/favicon2.png'"
              :alt="product.name"
              class="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 md:group-hover:scale-105"
              :class="isImageLoaded(activeVariantImages[activeImageIndex]) ? 'opacity-100' : 'opacity-0'"
              loading="lazy"
              width="300"
              height="400"
              @load="markImageLoaded(activeVariantImages[activeImageIndex])"
            />
          </div>
        </Transition>
      </NuxtLink>

      <!-- Out of Stock overlay (Flipkart-style: still clickable, clearly marked) -->
      <div
        v-if="product.inStock === false || product.stockCount === 0"
        class="absolute inset-0 bg-white/60 flex items-center justify-center z-10 pointer-events-none"
        aria-hidden="true"
      >
        <span class="bg-charcoal/80 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
          Out of Stock
        </span>
      </div>

      <!-- Status Badges Stack (Top-Left) -->
      <div class="absolute top-2 left-2 md:top-2.5 md:left-2.5 z-10 flex flex-col gap-1 items-start">
        <span
          v-if="product.inStock === false || product.stockCount === 0"
          class="px-1.5 py-0.5 md:px-2.5 md:py-0.5 rounded text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-white bg-gray-500 shadow-soft"
        >
          Out of Stock
        </span>
        <span
          v-else-if="product.badge"
          class="px-1.5 py-0.5 md:px-2.5 md:py-0.5 rounded text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-white shadow-soft"
          :class="product.badge === 'bestseller' ? 'bg-amber-500' : product.badge === 'new' ? 'bg-deep-plum' : 'bg-dusty-rose'"
        >
          {{ product.badge === 'bestseller' ? 'Best Seller' : product.badge }}
        </span>
        
        <span 
          v-if="product.discount > 0 && product.inStock !== false && product.stockCount !== 0" 
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

      <!-- Price Layout -->
      <div class="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
        <span class="font-sans font-bold text-deep-plum text-xs sm:text-sm md:text-base">
          {{ formatPrice(product.price) }}
        </span>
        <span v-if="product.originalPrice > product.price" class="text-[9px] md:text-[11px] text-mid-gray line-through font-ui">
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- Color Variant Swatches — clickable, switch images -->
      <div class="flex items-center gap-1 md:gap-1.5 mt-2 md:mt-3">
        <button
          v-for="(variant, vIdx) in product.variants.slice(0, 5)"
          :key="variant.color"
          type="button"
          class="w-3.5 h-3.5 rounded-full border transition-all duration-200 cursor-pointer focus:outline-none"
          :class="[
            activeVariantIdx === vIdx
              ? 'border-deep-plum scale-110 ring-1 ring-deep-plum/60'
              : 'border border-charcoal/15 hover:scale-105'
          ]"
          :style="{ backgroundColor: variant.colorHex }"
          :title="variant.color"
          :aria-label="`View in ${variant.color}`"
          :aria-pressed="activeVariantIdx === vIdx"
          @click.prevent="selectVariant(vIdx)"
        />
        <span v-if="product.variants.length > 5" class="text-[9px] md:text-[10px] text-mid-gray font-ui">
          +{{ product.variants.length - 5 }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import type { Product } from '~/types'
import { formatPrice } from '~/utils/formatters'

const props = defineProps<{ product: Product }>()

const ui = useUIStore()
const { toggle, isWishlisted: isWishlistedFn } = useWishlist()

// ─── Image loading state ──────────────────────────────────────────────────────
const loadedImages = ref<Set<string>>(new Set())

const isImageLoaded = (src: string | undefined) => {
  if (!src) return false
  return loadedImages.value.has(src)
}

const markImageLoaded = (src: string | undefined) => {
  if (!src) return
  loadedImages.value = new Set([...loadedImages.value, src])
}

const isWishlisted = computed(() => {
  const pId = props.product.id || (props.product as any)._id
  return pId ? isWishlistedFn(pId) : false
})

// ─── Active variant tracking ──────────────────────────────────────────────────
const activeVariantIdx = ref(0)
const slideDirection = ref('slide-left')
const isTransitioning = ref(false)
const activeImageIndex = ref(0)

const selectVariant = (idx: number) => {
  if (idx === activeVariantIdx.value) return
  slideDirection.value = idx > activeVariantIdx.value ? 'slide-left' : 'slide-right'
  activeVariantIdx.value = idx
  activeImageIndex.value = 0 // Reset image index to first image on variant switch
  
  if (hoverInterval) {
    clearInterval(hoverInterval)
    hoverInterval = setInterval(() => {
      slideDirection.value = 'slide-left'
      activeImageIndex.value = (activeImageIndex.value + 1) % activeVariantImages.value.length
    }, 2000)
  }
  
  isTransitioning.value = true
  setTimeout(() => {
    isTransitioning.value = false
  }, 400)
}

// Images for the currently active variant (excludes YouTube/video URLs)
const activeVariantImages = computed(() => {
  const variant = props.product.variants[activeVariantIdx.value]
  const imgs: string[] = []

  const isVideoUrl = (url: string) =>
    url.includes('youtube.com') || url.includes('youtu.be') || url.endsWith('.mp4') || url.includes('/video')

  if (variant?.images?.length) {
    variant.images.forEach((img: string) => {
      if (img && !imgs.includes(img) && !isVideoUrl(img)) imgs.push(img)
    })
  }

  // Fallback: all variant images then product-level images
  if (imgs.length === 0) {
    props.product.variants?.forEach((v: any) => {
      v.images?.forEach((img: string) => {
        if (img && !imgs.includes(img) && !isVideoUrl(img)) imgs.push(img)
      })
    })
  }
  if (imgs.length === 0) {
    props.product.images?.forEach((img: string) => {
      if (img && !imgs.includes(img) && !isVideoUrl(img)) imgs.push(img)
    })
  }

  return imgs.slice(0, 4)
})

// ─── Desktop Hover & Slideshow Tracking ──────────────────────────────────────────
let hoverInterval: any = null

const handleMouseEnter = () => {
  if (activeVariantImages.value.length > 1) {
    // Show the next image immediately on hover to make it feel responsive
    slideDirection.value = 'slide-left'
    activeImageIndex.value = (activeImageIndex.value + 1) % activeVariantImages.value.length

    // Then start the 2-second cycle
    hoverInterval = setInterval(() => {
      slideDirection.value = 'slide-left'
      activeImageIndex.value = (activeImageIndex.value + 1) % activeVariantImages.value.length
    }, 2000)
  }
}

const handleMouseLeave = () => {
  if (hoverInterval) {
    clearInterval(hoverInterval)
    hoverInterval = null
  }
  slideDirection.value = 'slide-right'
  activeImageIndex.value = 0
}

onBeforeUnmount(() => {
  if (hoverInterval) {
    clearInterval(hoverInterval)
  }
})

// ─── Mobile Touch Swipe Tracking ───────────────────────────────────────────────
const touchStartX = ref(0)
const touchEndX = ref(0)

const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  touchEndX.value = e.touches[0].clientX
}

const onTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const onTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  const swipeThreshold = 50
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // swipe left -> next image
      slideDirection.value = 'slide-left'
      activeImageIndex.value = (activeImageIndex.value + 1) % activeVariantImages.value.length
    } else {
      // swipe right -> prev image
      slideDirection.value = 'slide-right'
      activeImageIndex.value = (activeImageIndex.value - 1 + activeVariantImages.value.length) % activeVariantImages.value.length
    }
  }
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

/* Skeleton loading shimmer */
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.45) 40%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0.45) 60%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>

<style>
/* Global horizontal slide animations for PLP/PDP card color switches to avoid scoped style attributes mismatches */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.slide-left-enter-from { transform: translateX(100%) !important; }
.slide-left-leave-to { transform: translateX(-100%) !important; }
.slide-right-enter-from { transform: translateX(-100%) !important; }
.slide-right-leave-to { transform: translateX(100%) !important; }
</style>

