<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="product"
      class="overlay-backdrop"
      aria-hidden="true"
      @click="ui.closeQuickView"
    />
  </Transition>

  <!-- Modal -->
  <Transition name="scale-fade">
    <div
      v-if="product"
      class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      :aria-label="`Quick view: ${product.name}`"
    >
      <div class="relative w-full max-w-3xl bg-white rounded-2xl shadow-modal overflow-hidden max-h-[90vh] flex flex-col md:flex-row">

        <!-- Close -->
        <button
          class="absolute top-4 right-4 z-10 btn-icon bg-white shadow-sm"
          aria-label="Close quick view"
          @click="ui.closeQuickView"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Image -->
        <div class="w-full md:w-2/5 shrink-0 aspect-product bg-light-gray overflow-hidden">
          <img
            :src="product.variants[selectedVariant]?.images[0]"
            :alt="product.name"
            class="w-full h-full object-cover"
            width="400"
            height="533"
          />
        </div>

        <!-- Details -->
        <div class="flex-1 overflow-y-auto p-5 md:p-7">
          <!-- Category + Name -->
          <p class="text-xs text-dusty-rose font-ui font-medium uppercase tracking-wider mb-1">{{ product.category }}</p>
          <h2 class="font-serif text-xl text-deep-plum font-semibold mb-2">{{ product.name }}</h2>

          <!-- Rating -->
          <AppRating :rating="product.rating" :count="product.reviewCount" show-count class="mb-3" />

          <!-- Price -->
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl font-semibold text-charcoal font-sans">{{ formatPrice(product.price) }}</span>
            <span v-if="product.originalPrice > product.price" class="text-sm text-mid-gray line-through font-ui">{{ formatPrice(product.originalPrice) }}</span>
            <AppBadge v-if="product.discount" :label="`${product.discount}% OFF`" variant="sale" />
          </div>

          <!-- Variant -->
          <div class="mb-3">
            <p class="text-xs font-ui font-semibold text-charcoal uppercase tracking-wider mb-2">
              Color: <span class="normal-case font-normal text-mid-gray">{{ product.variants[selectedVariant]?.color }}</span>
            </p>
            <div class="flex gap-2">
              <button
                v-for="(variant, idx) in product.variants"
                :key="variant.color"
                class="w-7 h-7 rounded-full border-2 transition-all duration-200 cursor-pointer"
                :class="selectedVariant === idx ? 'border-deep-plum scale-110 shadow-md' : 'border-white shadow-sm hover:scale-105'"
                :style="{ backgroundColor: variant.colorHex }"
                :aria-label="variant.color"
                :aria-pressed="selectedVariant === idx"
                @click="selectedVariant = idx; selectedSize = ''"
              />
            </div>
          </div>

          <!-- Size -->
          <div class="mb-4">
            <p class="text-xs font-ui font-semibold text-charcoal uppercase tracking-wider mb-2">Size</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.variants[selectedVariant]?.sizes"
                :key="size"
                class="min-w-[42px] px-3 py-1.5 border rounded text-xs font-ui font-medium transition-all duration-200 cursor-pointer"
                :class="selectedSize === size
                  ? 'border-deep-plum bg-deep-plum text-white'
                  : 'border-border-gray text-charcoal hover:border-dusty-rose'"
                :aria-pressed="selectedSize === size"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <AppButton
              :full="true"
              size="lg"
              :disabled="!selectedSize"
              @click="handleAddToCart"
            >
              {{ selectedSize ? 'Add to Cart' : 'Select Size' }}
            </AppButton>
            <NuxtLink
              :to="`/products/${product.slug}`"
              class="btn-secondary px-4 shrink-0 text-sm"
              @click="ui.closeQuickView"
            >
              View Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/formatters'

const ui = useUIStore()
const { getBySlug } = useProducts()
const { addToCart } = useCart()

const product = computed(() =>
  ui.quickViewProductSlug ? getBySlug(ui.quickViewProductSlug) : null,
)

const selectedVariant = ref(0)
const selectedSize = ref('')

watch(() => ui.quickViewProductSlug, () => {
  selectedVariant.value = 0
  selectedSize.value = ''
})

const handleAddToCart = () => {
  if (!product.value || !selectedSize.value) return
  const variant = product.value.variants[selectedVariant.value]
  addToCart(product.value, variant.color, selectedSize.value)
  ui.closeQuickView()
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.scale-fade-enter-active, .scale-fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.scale-fade-enter-from, .scale-fade-leave-to { opacity: 0; transform: scale(0.95); }
</style>
