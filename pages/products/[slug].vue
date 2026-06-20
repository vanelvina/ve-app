<template>
  <div>
    <div v-if="product" class="bg-warm-ivory min-h-screen">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-border-gray">
      <div class="page-container py-3">
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-xs font-ui text-mid-gray flex-wrap">
            <li><NuxtLink to="/" class="hover:text-deep-plum">Home</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li><NuxtLink to="/products" class="hover:text-deep-plum">Products</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li><NuxtLink :to="`/products?category=${product.category}`" class="hover:text-deep-plum">{{ product.category }}</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li class="text-charcoal font-medium truncate max-w-[200px]">{{ product.name }}</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="page-container py-6 lg:py-10">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">

        <!-- Gallery -->
        <div class="space-y-3">
          <div 
            class="relative aspect-product bg-light-gray rounded-2xl overflow-hidden cursor-zoom-in group/gallery"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @click="openLightbox"
          >
            <img
              :src="activeImage"
              :alt="product.name"
              class="w-full h-full object-cover transition-all duration-300"
              width="600" height="800"
              fetchpriority="high"
            />
            
            <!-- Desktop Arrow Indicators -->
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300">
              <button 
                @click.stop="prevImage" 
                class="hidden md:flex w-9 h-9 rounded-full bg-white/75 hover:bg-white text-deep-plum items-center justify-center shadow-md transition-all border border-rose-blush/20"
                aria-label="Previous Image"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300">
              <button 
                @click.stop="nextImage" 
                class="hidden md:flex w-9 h-9 rounded-full bg-white/75 hover:bg-white text-deep-plum items-center justify-center shadow-md transition-all border border-rose-blush/20"
                aria-label="Next Image"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Top Overlay Badges & Zoom Icon -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <AppBadge v-if="product.badge" :variant="product.badge" :label="product.badge === 'bestseller' ? 'Best Seller' : product.badge" />
              <AppBadge v-if="product.discount" :label="`${product.discount}% OFF`" variant="sale" />
            </div>
            
            <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/75 hover:bg-white text-deep-plum flex items-center justify-center shadow-md transition-all pointer-events-none border border-rose-blush/20">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>
          </div>
          <!-- Thumbnails -->
          <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              v-for="(img, idx) in allImages"
              :key="idx"
              class="w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200"
              :class="activeImageIdx === idx ? 'border-deep-plum' : 'border-transparent hover:border-border-gray'"
              :aria-label="`View image ${idx + 1}`"
              :aria-pressed="activeImageIdx === idx"
              @click="activeImageIdx = idx"
            >
              <img :src="img" :alt="`Product view ${idx + 1}`" class="w-full h-full object-cover" width="64" height="64" loading="lazy" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-5">
          <!-- Category & Name -->
          <div>
            <p class="text-xs text-dusty-rose font-ui font-semibold uppercase tracking-wider mb-1">{{ product.category }}</p>
            <h1 class="font-serif text-2xl md:text-3xl text-deep-plum font-bold leading-tight mb-2">{{ product.name }}</h1>
            <div class="flex items-center gap-3 flex-wrap">
              <AppRating :rating="product.rating" :count="product.reviewCount" show-count show-value />
              <span class="text-xs text-mid-gray font-ui">SKU: {{ product.sku }}</span>
            </div>
          </div>

          <!-- Price -->
          <div class="flex items-end gap-3 pb-4 border-b border-border-gray">
            <span class="text-3xl font-semibold text-charcoal font-sans">{{ formatPrice(product.price) }}</span>
            <span v-if="product.originalPrice > product.price" class="text-lg text-mid-gray line-through font-ui mb-0.5">{{ formatPrice(product.originalPrice) }}</span>
            <span v-if="product.discount" class="text-sm font-semibold text-green-600 font-ui mb-0.5">
              You save {{ formatPrice(product.originalPrice - product.price) }}
            </span>
          </div>

          <!-- Variant / Color -->
          <div>
            <p class="text-sm font-ui font-semibold text-charcoal mb-2">
              Color: <span class="font-normal text-mid-gray">{{ product.variants[selectedVariant].color }}</span>
            </p>
            <div class="flex gap-2.5">
              <button
                v-for="(variant, idx) in product.variants"
                :key="variant.color"
                class="w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer"
                :class="selectedVariant === idx ? 'border-deep-plum scale-110 shadow-md' : 'border-white shadow-sm hover:scale-105'"
                :style="{ backgroundColor: variant.colorHex }"
                :aria-label="variant.color"
                :aria-pressed="selectedVariant === idx"
                @click="selectedVariant = idx; selectedSize = ''; activeImageIdx = 0"
              />
            </div>
          </div>

          <!-- Size Selection -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-ui font-semibold text-charcoal">
                Size: <span class="font-normal text-mid-gray">{{ selectedSize || 'Select a size' }}</span>
              </p>
              <button
                class="text-xs text-dusty-rose font-ui hover:text-deep-plum underline"
                @click="ui.openSizeGuide"
              >
                Size Guide
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.variants[selectedVariant].sizes"
                :key="size"
                class="min-w-[48px] px-3 py-2 border rounded-lg text-sm font-ui font-medium transition-all duration-200 cursor-pointer"
                :class="selectedSize === size
                  ? 'border-deep-plum bg-deep-plum text-white shadow-sm'
                  : 'border-border-gray text-charcoal hover:border-dusty-rose hover:text-dusty-rose'"
                :aria-pressed="selectedSize === size"
                :aria-label="`Size ${size}`"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
            <p v-if="sizeError" class="mt-1.5 text-xs text-red-500 font-ui" role="alert">Please select a size to continue.</p>
          </div>

          <!-- Quantity -->
          <div>
            <p class="text-sm font-ui font-semibold text-charcoal mb-2">Quantity</p>
            <div class="flex items-center gap-3">
              <button class="qty-btn" aria-label="Decrease quantity" @click="qty = Math.max(1, qty - 1)">−</button>
              <span class="w-8 text-center font-ui font-semibold text-charcoal" aria-live="polite" aria-label="Quantity">{{ qty }}</span>
              <button class="qty-btn" aria-label="Increase quantity" @click="qty = Math.min(10, qty + 1)">+</button>
              <span class="text-xs text-mid-gray font-ui ml-2">{{ product.stockCount }} in stock</span>
            </div>
          </div>

          <!-- Add to Cart + Wishlist -->
          <div class="flex gap-3 pb-5 border-b border-border-gray">
            <AppButton size="lg" :full="true" :loading="adding" @click="handleAddToCart">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart
            </AppButton>
            <button
              class="w-12 h-12 shrink-0 rounded-xl border-2 border-border-gray flex items-center justify-center hover:border-dusty-rose hover:text-dusty-rose transition-all"
              :class="{ 'border-dusty-rose text-dusty-rose bg-rose-blush': isWishlisted }"
              :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
              :aria-pressed="isWishlisted"
              @click="wishlist.toggle(product)"
            >
              <svg class="w-5 h-5" :fill="isWishlisted ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <!-- Delivery check -->
          <div class="bg-light-gray rounded-xl p-4">
            <p class="text-sm font-ui font-semibold text-charcoal mb-2">Check Delivery</p>
            <div class="flex gap-2">
              <input
                v-model="pincode"
                type="text"
                maxlength="6"
                placeholder="Enter PIN code"
                class="input-base flex-1"
                aria-label="Enter pincode to check delivery"
              />
              <AppButton size="sm" variant="secondary" @click="checkDelivery">Check</AppButton>
            </div>
            <p v-if="deliveryMsg" class="mt-2 text-xs font-ui" :class="deliveryOk ? 'text-green-600' : 'text-red-500'" role="alert">
              {{ deliveryMsg }}
            </p>
          </div>

          <!-- Highlights -->
          <div>
            <h2 class="text-sm font-ui font-semibold text-charcoal mb-2">Product Highlights</h2>
            <ul class="space-y-1.5">
              <li v-for="h in product.highlights" :key="h" class="flex items-start gap-2 text-sm font-ui text-mid-gray">
                <svg class="w-4 h-4 text-dusty-rose shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ h }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Product details tabs -->
      <div class="mt-12 bg-white rounded-2xl shadow-soft border border-border-gray overflow-hidden">
        <!-- Tab headers -->
        <div class="flex border-b border-border-gray overflow-x-auto scrollbar-hide">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="px-6 py-4 text-sm font-ui font-medium whitespace-nowrap transition-colors border-b-2 shrink-0"
            :class="activeTab === tab
              ? 'border-deep-plum text-deep-plum'
              : 'border-transparent text-mid-gray hover:text-charcoal'"
            :aria-selected="activeTab === tab"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Tab content -->
        <div class="p-6">
          <div v-if="activeTab === 'Description'">
            <p class="text-sm font-ui text-mid-gray leading-relaxed">{{ product.description }}</p>
          </div>
          <div v-else-if="activeTab === 'Fabric & Care'" class="space-y-4">
            <div>
              <h3 class="font-ui font-semibold text-charcoal text-sm mb-2">Fabric Composition</h3>
              <p class="text-sm text-mid-gray font-ui">{{ product.fabric }}</p>
            </div>
            <div>
              <h3 class="font-ui font-semibold text-charcoal text-sm mb-2">Care Instructions</h3>
              <ul class="space-y-1.5">
                <li v-for="care in product.care" :key="care" class="flex items-center gap-2 text-sm text-mid-gray font-ui">
                  <span class="text-base" aria-hidden="true">🏷️</span>{{ care }}
                </li>
              </ul>
            </div>
          </div>
          <div v-else-if="activeTab === 'Reviews'">
            <div class="flex items-center gap-6 mb-6">
              <div class="text-center">
                <p class="font-serif text-5xl font-bold text-deep-plum">{{ product.rating }}</p>
                <AppRating :rating="product.rating" class="justify-center my-1" />
                <p class="text-xs text-mid-gray font-ui">{{ product.reviewCount }} reviews</p>
              </div>
              <div class="flex-1">
                <div v-for="r in [5,4,3,2,1]" :key="r" class="flex items-center gap-2 mb-1">
                  <span class="text-xs font-ui text-mid-gray w-3">{{ r }}</span>
                  <svg class="w-3 h-3 star-filled" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <div class="flex-1 h-2 bg-light-gray rounded-full overflow-hidden">
                    <div class="h-full bg-soft-gold rounded-full" :style="{ width: `${r * 18}%` }" />
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <ReviewCard v-for="review in productReviews" :key="review.id" :review="review" />
            </div>
          </div>
          <div v-else-if="activeTab === 'FAQs'">
            <div v-for="(faq, idx) in faqs" :key="faq.id" class="border-b border-border-gray last:border-0">
              <button
                class="w-full flex items-center justify-between py-4 text-left text-sm font-ui font-medium text-charcoal hover:text-deep-plum transition-colors"
                :aria-expanded="openFaq === idx"
                @click="openFaq = openFaq === idx ? null : idx"
              >
                {{ faq.question }}
                <svg class="w-4 h-4 shrink-0 transition-transform" :class="openFaq === idx ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Transition name="expand">
                <div v-if="openFaq === idx" class="pb-4 text-sm text-mid-gray font-ui leading-relaxed">
                  {{ faq.answer }}
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Products -->
      <div class="mt-12">
        <h2 class="font-serif text-2xl text-deep-plum font-semibold mb-6">Similar Products</h2>
        <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          <div v-for="p in similarProducts" :key="p.id" class="w-48 md:w-56 shrink-0">
            <ProductCard :product="p" />
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky mobile add-to-cart -->
    <div class="sticky-add-to-cart md:hidden" aria-label="Add to cart bar">
      <div class="flex-1">
        <p class="font-sans font-semibold text-sm text-charcoal line-clamp-1">{{ product.name }}</p>
        <p class="text-xs text-dusty-rose font-ui">{{ formatPrice(product.price) }}</p>
      </div>
      <AppButton size="md" @click="handleAddToCart">
        {{ selectedSize ? 'Add to Cart' : 'Select Size' }}
      </AppButton>
    </div>
  </div>

  <!-- 404 state -->
  <div v-else class="page-container py-20 text-center">
    <p class="font-serif text-2xl text-deep-plum mb-4">Product not found</p>
    <NuxtLink to="/products" class="btn-primary">Browse All Products</NuxtLink>
  </div>

  <!-- LIGHTBOX OVERLAY -->
  <Transition name="fade">
    <div 
      v-if="showLightbox" 
      class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center select-none outline-none"
      @keydown.esc="closeLightbox"
      @keydown.left="prevImage"
      @keydown.right="nextImage"
      tabindex="0"
      ref="lightboxRef"
    >
      <!-- Close button -->
      <button 
        @click="closeLightbox" 
        class="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 p-2.5 rounded-full transition-all z-50 cursor-pointer"
        aria-label="Close image gallery"
      >
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Navigation arrows (Desktop) -->
      <button 
        @click="prevImage" 
        class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-all z-10 cursor-pointer"
        aria-label="Previous image"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        @click="nextImage" 
        class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-all z-10 cursor-pointer"
        aria-label="Next image"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Main Lightbox Image Area -->
      <div 
        class="w-full max-w-4xl px-4 flex items-center justify-center h-[75vh] cursor-zoom-out"
        @click.self="closeLightbox"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <Transition name="slide-fade" mode="out-in">
          <img 
            :key="activeImageIdx" 
            :src="allImages[activeImageIdx]" 
            :alt="`Product detailed image ${activeImageIdx + 1}`"
            class="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-350 select-none"
            @click="closeLightbox"
          />
        </Transition>
      </div>

      <!-- Lightbox Counter and Dots indicator -->
      <div class="mt-6 text-center space-y-4">
        <p class="text-white/60 text-xs font-semibold tracking-widest font-ui uppercase">
          {{ activeImageIdx + 1 }} / {{ allImages.length }}
        </p>
        <div class="flex gap-2.5 justify-center">
          <button
            v-for="(_, idx) in allImages"
            :key="idx"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
            :class="activeImageIdx === idx ? 'bg-white scale-125' : 'bg-white/20 hover:bg-white/40'"
            @click="activeImageIdx = idx"
            :aria-label="`Go to image ${idx + 1}`"
          />
        </div>
      </div>
    </div>
  </Transition>
  </div>
</template>

<script setup lang="ts">
import { formatPrice, isValidPincode } from '~/utils/formatters'
import { productSchema, breadcrumbSchema, faqSchema } from '~/utils/schema'
import reviewsData from '~/data/reviews.json'
import faqsData from '~/data/faqs.json'

const route = useRoute()
const ui = useUIStore()
const { getBySlug, all, addRecentlyViewed } = useProducts()
const { addToCart } = useCart()
const wishlist = useWishlistStore()

const product = computed(() => getBySlug(route.params.slug as string))

const selectedVariant = ref(0)
const selectedSize = ref('')
const qty = ref(1)
const sizeError = ref(false)
const adding = ref(false)
const pincode = ref('')
const deliveryMsg = ref('')
const deliveryOk = ref(false)
const activeImageIdx = ref(0)
const activeTab = ref('Description')
const openFaq = ref<number | null>(null)

// Lightbox and Swipe functionality states
const showLightbox = ref(false)
const lightboxRef = ref<HTMLElement | null>(null)

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
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextImage()
    } else {
      prevImage()
    }
  }
}

const nextImage = () => {
  if (allImages.value.length === 0) return
  activeImageIdx.value = (activeImageIdx.value + 1) % allImages.value.length
}

const prevImage = () => {
  if (allImages.value.length === 0) return
  activeImageIdx.value = (activeImageIdx.value - 1 + allImages.value.length) % allImages.value.length
}

const openLightbox = () => {
  showLightbox.value = true
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
  nextTick(() => {
    lightboxRef.value?.focus()
  })
}

const closeLightbox = () => {
  showLightbox.value = false
  if (typeof window !== 'undefined') {
    document.body.style.overflow = ''
  }
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const tabs = ['Description', 'Fabric & Care', 'Reviews', 'FAQs']
const faqs = faqsData.slice(0, 5)

const allImages = computed(() =>
  product.value?.variants[selectedVariant.value]?.images ?? []
)
const activeImage = computed(() => allImages.value[activeImageIdx.value] ?? '')

const isWishlisted = computed(() =>
  product.value ? wishlist.isWishlisted(product.value.id) : false
)

const productReviews = computed(() =>
  reviewsData.filter(r => r.productId === product.value?.id).slice(0, 3)
)

const similarProducts = computed(() =>
  all.value
    .filter(p => p.category === product.value?.category && p.id !== product.value?.id)
    .slice(0, 6)
)

const handleAddToCart = async () => {
  if (!selectedSize.value) { sizeError.value = true; return }
  sizeError.value = false
  adding.value = true
  await new Promise(r => setTimeout(r, 400))
  adding.value = false
  if (!product.value) return
  addToCart(product.value, product.value.variants[selectedVariant.value].color, selectedSize.value, qty.value)
}

const checkDelivery = () => {
  if (!isValidPincode(pincode.value)) {
    deliveryMsg.value = 'Please enter a valid 6-digit PIN code.'
    deliveryOk.value = false
    return
  }
  deliveryOk.value = true
  deliveryMsg.value = `✅ Delivery available! Estimated in ${product.value?.deliveryDays ?? 3}-${(product.value?.deliveryDays ?? 3) + 2} business days.`
}

watch(selectedSize, () => { if (selectedSize.value) sizeError.value = false })

onMounted(() => { if (product.value) addRecentlyViewed(product.value) })

// SEO
watchEffect(() => {
  if (!product.value) return
  useSeoMeta({
    title: `${product.value.name} – Van Elvina`,
    description: product.value.description.slice(0, 160),
    ogTitle: product.value.name,
    ogDescription: product.value.description.slice(0, 160),
    ogImage: product.value.variants[0]?.images[0],
  })
  useHead({
    script: [
      { type: 'application/ld+json', children: JSON.stringify(productSchema(product.value, `https://vanelvina.com/products/${product.value.slug}`)) },
      { type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: 'https://vanelvina.com' }, { name: 'Products', url: 'https://vanelvina.com/products' }, { name: product.value.name, url: `https://vanelvina.com/products/${product.value.slug}` }])) },
      { type: 'application/ld+json', children: JSON.stringify(faqSchema(faqs)) },
    ],
  })
})
</script>

<style scoped>
.expand-enter-active, .expand-leave-active { transition: all 0.25s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }
.expand-enter-to, .expand-leave-from { max-height: 300px; opacity: 1; }

/* Lightbox Image Swiping Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(15px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
