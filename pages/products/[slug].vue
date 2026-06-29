<template>
  <div>
    <div v-if="product" class="bg-warm-ivory min-h-screen">
    <!-- Breadcrumb -->
    <div class="bg-white border-b border-border-gray">
      <div class="page-container py-2.5">
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-1.5 text-xs font-ui text-mid-gray flex-wrap">
            <li><NuxtLink to="/" class="hover:text-deep-plum">Home</NuxtLink></li>
            <li aria-hidden="true" class="text-border-gray">/</li>
            <li><NuxtLink to="/products" class="hover:text-deep-plum">Products</NuxtLink></li>
            <li aria-hidden="true" class="text-border-gray">/</li>
            <li><NuxtLink :to="`/products?category=${product.category}`" class="hover:text-deep-plum">{{ product.category }}</NuxtLink></li>
            <li aria-hidden="true" class="text-border-gray">/</li>
            <li class="text-charcoal font-medium truncate max-w-[160px] md:max-w-[320px]">{{ product.name }}</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="page-container py-6 lg:py-10">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">

        <!-- Gallery -->
        <div class="space-y-3">
          <div 
            class="relative aspect-product bg-light-gray rounded-none overflow-hidden cursor-zoom-in group/gallery"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @click="openLightbox"
          >
            <Transition :name="slideDirection">
              <img
                :key="activeImage"
                :src="activeImage"
                :alt="product.name"
                class="absolute inset-0 w-full h-full object-cover"
                width="600" height="800"
                fetchpriority="high"
              />
            </Transition>
            
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
              class="w-16 h-16 shrink-0 rounded-none overflow-hidden border-2 transition-all duration-200"
              :class="activeImageIdx === idx ? 'border-deep-plum' : 'border-transparent hover:border-border-gray'"
              :aria-label="`View image ${idx + 1}`"
              :aria-pressed="activeImageIdx === idx"
              @click.stop="setActiveImageIdx(idx)"
            >
              <img :src="img" :alt="`Product view ${idx + 1}`" class="w-full h-full object-cover" width="64" height="64" loading="lazy" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-4">
          <!-- Category & Name -->
          <div>
            <p class="text-[11px] text-dusty-rose font-ui font-semibold uppercase tracking-widest mb-1">{{ product.category }}</p>
            <h1 class="font-serif text-xl md:text-3xl text-deep-plum font-bold leading-snug mb-1.5">{{ product.name }}</h1>
            <div class="flex items-center gap-2 flex-wrap">
              <AppRating :rating="product.rating" :count="product.reviewCount" show-count show-value />
              <span class="text-[11px] text-mid-gray font-ui">SKU: {{ product.sku }}</span>
            </div>
          </div>

          <!-- Price -->
          <div class="flex items-center gap-3 pb-3 border-b border-border-gray">
            <span class="text-2xl md:text-3xl font-bold text-charcoal font-sans">{{ formatPrice(product.price) }}</span>
            <span v-if="product.originalPrice > product.price" class="text-base text-mid-gray line-through font-ui">{{ formatPrice(product.originalPrice) }}</span>
            <span v-if="product.discount" class="text-xs font-semibold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full font-ui">
              {{ product.discount }}% off
            </span>
          </div>

          <!-- Available Offer & Share Link -->
          <div v-if="product.availableOffer" class="bg-rose-blush/20 border border-rose-blush/50 rounded-2xl p-4.5 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-deep-plum uppercase tracking-wider">🏷️ Available Offer</span>
              <button @click="copyShareLink" class="text-xs text-dusty-rose hover:text-deep-plum font-semibold flex items-center gap-1 transition-all" title="Share this offer">
                <span>🔗 Share Offer</span>
              </button>
            </div>
            <p class="text-xs font-ui text-charcoal font-medium leading-relaxed">
              {{ product.availableOffer }}
            </p>
          </div>

          <!-- Variant / Color -->
          <div>
            <p class="text-xs font-ui font-semibold text-charcoal mb-2">
              Colour: <span class="font-normal text-mid-gray">{{ product.variants[selectedVariant].color }}</span>
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
                @click="selectedVariant = idx; selectedSize = ''; setActiveImageIdx(0)"
              />
            </div>
          </div>

          <!-- Size Selection -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <p class="text-xs font-ui font-semibold text-charcoal">
                Size: <span class="font-normal text-mid-gray">{{ selectedSize || 'Select a size' }}</span>
              </p>
              <button class="text-xs text-dusty-rose font-ui hover:text-deep-plum underline" @click="ui.openSizeGuide">Size Guide</button>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="size in product.variants[selectedVariant].sizes"
                :key="size"
                class="min-w-[44px] px-2.5 py-1.5 border rounded-lg text-xs font-ui font-semibold transition-all duration-200 cursor-pointer"
                :class="selectedSize === size
                  ? 'border-deep-plum bg-deep-plum text-white shadow-sm'
                  : 'border-border-gray text-charcoal hover:border-deep-plum'"
                :aria-pressed="selectedSize === size"
                :aria-label="`Size ${size}`"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
            <p v-if="sizeError" class="mt-1 text-xs text-red-500 font-ui" role="alert">Please select a size to continue.</p>
          </div>

          <!-- Quantity + Add to Cart (inline on mobile) -->
          <div class="flex items-center gap-3 pb-4 border-b border-border-gray">
            <div class="flex items-center border border-border-gray rounded-lg overflow-hidden">
              <button class="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-light-gray transition-colors text-lg font-light" aria-label="Decrease quantity" @click="qty = Math.max(1, qty - 1)">−</button>
              <span class="w-8 text-center text-sm font-semibold text-charcoal border-x border-border-gray h-9 flex items-center justify-center" aria-live="polite">{{ qty }}</span>
              <button class="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-light-gray transition-colors text-lg font-light" aria-label="Increase quantity" @click="qty = Math.min(10, qty + 1)">+</button>
            </div>
            <span class="text-xs text-mid-gray font-ui">{{ product.stockCount }} in stock</span>
            <div class="flex-1">
              <AppButton size="md" :full="true" :loading="adding" @click="handleAddToCart" class="hidden md:inline-flex w-full">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {{ isAlreadyInBag ? 'Go to Bag' : 'Add to Bag' }}
              </AppButton>
            </div>
          </div>

          <!-- Delivery check -->
          <div class="bg-light-gray rounded-lg p-3">
            <p class="text-xs font-ui font-semibold text-charcoal mb-2">Check Delivery</p>
            <div class="flex gap-2">
              <input
                v-model="pincode"
                type="text"
                inputmode="numeric"
                maxlength="6"
                placeholder="Enter 6-digit PIN code"
                class="input-base flex-1 text-sm"
                aria-label="Enter pincode to check delivery"
              />
              <AppButton size="sm" variant="secondary" @click="checkDelivery">Check</AppButton>
            </div>
            <p v-if="deliveryMsg" class="mt-1.5 text-xs font-ui" :class="deliveryOk ? 'text-green-600' : 'text-red-500'" role="alert">{{ deliveryMsg }}</p>
          </div>

          <!-- Policy Indicators -->
          <div class="divide-y divide-border-gray border border-border-gray rounded-xl overflow-hidden bg-white">
            <!-- Returns -->
            <div class="flex items-center gap-3 px-3 py-2.5">
              <!-- Return/Exchange Icon -->
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-charcoal" aria-hidden="true">
                <path d="M1 4v6h6"/>
                <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
              </svg>
              <span class="text-[12.5px] font-ui text-charcoal">7-day return and size exchange</span>
            </div>
            <!-- Free Delivery -->
            <div class="flex items-center gap-3 px-3 py-2.5">
              <!-- Delivery Truck Icon -->
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-charcoal" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" rx="1"/>
                <path d="M16 8h4l3 3v5h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <span class="text-[12.5px] font-ui text-charcoal">
                <span v-if="product.price >= 999">Free delivery on this order</span>
                <span v-else>Free delivery on ₹999+ orders</span>
              </span>
            </div>
            <!-- COD -->
            <div class="flex items-center gap-3 px-3 py-2.5">
              <!-- COD / Cash Icon -->
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-charcoal" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
                <line x1="6" y1="15" x2="10" y2="15"/>
              </svg>
              <span class="text-[12.5px] font-ui text-charcoal">
                <span v-if="product.price >= 500 || product.price === 1">COD available on this order</span>
                <span v-else>COD on ₹500+ orders</span>
              </span>
            </div>
          </div>

          <!-- Highlights -->
          <div>
            <h2 class="text-xs font-ui font-semibold text-charcoal uppercase tracking-wider mb-2">Highlights</h2>
            <ul class="space-y-1">
              <li v-for="h in product.highlights" :key="h" class="flex items-start gap-2 text-xs font-ui text-mid-gray leading-relaxed">
                <svg class="w-3.5 h-3.5 text-dusty-rose shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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
          <div v-if="activeTab === 'Description'" class="space-y-6">
            <p class="text-sm font-ui text-mid-gray leading-relaxed">{{ product.description }}</p>

            <!-- Key Features -->
            <div v-if="product.features && product.features.length" class="space-y-2 mt-4">
              <h3 class="font-ui font-semibold text-charcoal text-sm">Key Product Features</h3>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li v-for="feature in product.features" :key="feature" class="flex items-start gap-2 text-sm font-ui text-mid-gray">
                  <span class="text-dusty-rose mt-0.5">•</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Additional Information -->
            <div v-if="product.additionalInfo" class="space-y-2 mt-4 border-t border-border-gray pt-4">
              <h3 class="font-ui font-semibold text-charcoal text-sm">Additional Product Information</h3>
              <p class="text-sm font-ui text-mid-gray leading-relaxed whitespace-pre-line">{{ product.additionalInfo }}</p>
            </div>

            <!-- YouTube Video Embed -->
            <div v-if="product.videoUrl" class="mt-6 border-t border-border-gray pt-6">
              <h3 class="font-ui font-semibold text-charcoal text-sm mb-3.5">Product Showcase Video</h3>
              <div class="relative aspect-video rounded-2xl overflow-hidden shadow-soft max-w-2xl bg-black">
                <iframe 
                  :src="product.videoUrl" 
                  class="absolute inset-0 w-full h-full" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <!-- Descriptive/Lifestyle Images Grid -->
            <div v-if="product.descriptiveImages && product.descriptiveImages.length" class="mt-6 border-t border-border-gray pt-6">
              <h3 class="font-ui font-semibold text-charcoal text-sm mb-4">Product Gallery & Lifestyle Details</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img 
                  v-for="(descImg, dIdx) in product.descriptiveImages" 
                  :key="dIdx" 
                  :src="descImg" 
                  class="w-full object-cover rounded-2xl shadow-soft hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy" 
                />
              </div>
            </div>
          </div>
          <div v-else-if="activeTab === 'Fabric, Care & Origin'" class="space-y-4">
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
            <div class="border-t border-border-gray pt-4 mt-4">
              <h3 class="font-ui font-semibold text-charcoal text-sm mb-2">Manufacturer & Brand Details</h3>
              <div class="text-xs text-mid-gray font-ui space-y-1.5 leading-relaxed">
                <p><strong>Brand Name:</strong> {{ product.brand || 'Van Elvina' }}</p>
                <p><strong>Country of Origin:</strong> India 🇮🇳</p>
                <p><strong>Manufactured & Marketed By:</strong> Van Elvina Private Limited, 1/1, Motiwala Complex, Nirala Bazar, Aurangabad, 431001, Maharashtra, India.</p>
                <p><strong>Customer Care Support:</strong> support@vanelvina.com | +91 87885 66695 | +91 95791 82097</p>
              </div>
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

            <!-- Rate This Product Form -->
            <div class="border-t border-border-gray pt-6 mt-8">
              <h3 class="font-ui font-semibold text-charcoal text-sm mb-1">Rate &amp; Review This Product</h3>
              <p class="text-[11px] text-mid-gray mb-4 font-ui">Your review will help other customers make an informed choice. Required fields are marked *</p>
              
              <form @submit.prevent="submitReview" class="space-y-4 max-w-xl">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-ui text-charcoal font-medium">Your Rating *</span>
                  <div class="flex gap-1">
                    <button 
                      v-for="star in 5" 
                      :key="star" 
                      type="button" 
                      @click="newReviewRating = star"
                      class="text-xl focus:outline-none transition-transform hover:scale-110"
                      :class="star <= newReviewRating ? 'text-soft-gold' : 'text-border-gray'"
                    >
                      ★
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[10px] font-semibold text-charcoal/70 mb-1 font-ui">Your Name *</label>
                    <input v-model="newReviewAuthor" type="text" required placeholder="e.g. Elena Smith" class="w-full p-2 border border-border-gray rounded-xl text-xs font-sans focus:outline-none focus:border-deep-plum bg-white" />
                  </div>
                  <div>
                    <label class="block text-[10px] font-semibold text-charcoal/70 mb-1 font-ui">Review Title *</label>
                    <input v-model="newReviewTitle" type="text" required placeholder="e.g. Extremely comfortable!" class="w-full p-2 border border-border-gray rounded-xl text-xs font-sans focus:outline-none focus:border-deep-plum bg-white" />
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-semibold text-charcoal/70 mb-1 font-ui">Review Details *</label>
                  <textarea v-model="newReviewBody" rows="3" required placeholder="Tell others what you liked or disliked about this product..." class="w-full p-2 border border-border-gray rounded-xl text-xs font-sans focus:outline-none focus:border-deep-plum bg-white"></textarea>
                </div>

                <button 
                  type="submit" 
                  class="bg-deep-plum text-white hover:bg-plum-800 rounded-xl text-xs font-semibold px-4.5 py-2 shadow-premium transition-all"
                  :disabled="submittingReview"
                >
                  {{ submittingReview ? 'Submitting...' : 'Submit Review' }}
                </button>
              </form>
            </div>
          </div>
          <div v-else-if="activeTab === 'FAQs'">
            <div v-if="!productFaqs.length" class="p-6 text-center text-xs text-mid-gray italic">
              No FAQs configured for this product yet.
            </div>
            <div v-else v-for="(faq, idx) in productFaqs" :key="idx" class="border-b border-border-gray last:border-0">
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

      <!-- Loyalty Discount Banner -->
      <div class="mt-10">
        <LoyaltyDiscountBanner />
      </div>

      <!-- Similar Products -->
      <div class="mt-10">
        <h2 class="font-serif text-2xl text-deep-plum font-semibold mb-6">Similar Products</h2>
        <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          <div v-for="p in similarProducts" :key="p.id" class="w-48 md:w-56 shrink-0">
            <ProductCard :product="p" />
          </div>
        </div>
      </div>
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

  <!-- Mobile Sticky Bottom Bar -->
  <div v-if="product" class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white flex shadow-[0_-4px_16px_rgba(0,0,0,0.1)] h-[60px]">
    <button 
      @click="wishlist.toggle(product)" 
      class="w-[20%] flex items-center justify-center border-r border-border-gray/50 transition-colors bg-white"
      :class="wishlist.isWishlisted(product.id || product._id) ? 'text-deep-plum' : 'text-mid-gray'"
      aria-label="Wishlist"
    >
      <svg v-if="wishlist.isWishlisted(product.id || product._id)" class="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    </button>
    
    <button 
      @click="handleAddToCart" 
      :disabled="!product.inStock || adding"
      class="w-[80%] bg-deep-plum text-white font-ui font-bold tracking-wider text-sm hover:bg-[#473021] transition-colors rounded-none flex items-center justify-center gap-2 disabled:opacity-50"
    >
      <span v-if="adding" class="flex items-center gap-2">
        <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        ADDING...
      </span>
      <span v-else class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        ADD TO BAG
      </span>
    </button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice, isValidPincode } from '~/utils/formatters'
import { productSchema, breadcrumbSchema, faqSchema } from '~/utils/schema'
import { useCartStore } from '~/stores/cart'
import reviewsData from '~/data/reviews.json'
import faqsData from '~/data/faqs.json'

const route = useRoute()
const ui = useUIStore()
const { getBySlug, all, addRecentlyViewed } = useProducts()
const { addToCart } = useCart()
const wishlist = useWishlistStore()
const cart = useCartStore()
const auth = useAuthStore()

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

const slideDirection = ref('slide-left')

const setActiveImageIdx = (idx: number) => {
  slideDirection.value = idx > activeImageIdx.value ? 'slide-left' : 'slide-right'
  activeImageIdx.value = idx
}

const nextImage = () => {
  if (allImages.value.length === 0) return
  slideDirection.value = 'slide-left'
  activeImageIdx.value = (activeImageIdx.value + 1) % allImages.value.length
}

const prevImage = () => {
  if (allImages.value.length === 0) return
  slideDirection.value = 'slide-right'
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

const tabs = ['Description', 'Fabric, Care & Origin', 'Reviews', 'FAQs']
const faqs = faqsData.slice(0, 5)

const allImages = computed(() =>
  product.value?.variants[selectedVariant.value]?.images ?? []
)
const activeImage = computed(() => allImages.value[activeImageIdx.value] ?? '')

const isWishlisted = computed(() =>
  product.value ? wishlist.isWishlisted(product.value.id) : false
)

const newReviewRating = ref(5)
const newReviewAuthor = ref('')
const newReviewTitle = ref('')
const newReviewBody = ref('')
const submittingReview = ref(false)
const localReviews = ref<any[]>([])

const productReviews = computed(() => {
  const fileReviews = reviewsData.filter(r => r.productId === product.value?.id)
  return [...localReviews.value, ...fileReviews]
})

const productFaqs = computed(() => {
  if (product.value?.faqs && product.value.faqs.length) {
    return product.value.faqs
  }
  return faqsData.slice(0, 5)
})

const submitReview = async () => {
  if (!newReviewAuthor.value || !newReviewTitle.value || !newReviewBody.value) return
  submittingReview.value = true
  await new Promise(r => setTimeout(r, 600))
  
  const newReview = {
    id: `local-rev-${Date.now()}`,
    productId: product.value?.id ?? '',
    productName: product.value?.name ?? '',
    author: newReviewAuthor.value,
    avatar: '',
    rating: newReviewRating.value,
    title: newReviewTitle.value,
    body: newReviewBody.value,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    verified: true,
    helpful: 0
  }
  
  localReviews.value.unshift(newReview)
  ui.addToast('success', 'Thank you! Your review has been submitted.')
  
  newReviewAuthor.value = ''
  newReviewTitle.value = ''
  newReviewBody.value = ''
  newReviewRating.value = 5
  submittingReview.value = false
}

const copyShareLink = () => {
  if (typeof window !== 'undefined') {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    ui.addToast('success', 'Product link copied to clipboard! Share it with your friends.')
  }
}

const handleShare = async () => {
  if (typeof window === 'undefined') return
  const url = window.location.href
  const title = product.value?.name ?? 'Check out this product'
  const text = `${title} – Van Elvina`
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
    } catch {
      // user dismissed — no action needed
    }
  } else {
    await navigator.clipboard.writeText(url)
    ui.addToast('success', 'Link copied! Share it with your friends. 🔗')
  }
}

const similarProducts = computed(() => {
  if (!product.value) return []
  
  const currentId = product.value.id || (product.value as any)._id
  const currentCategory = product.value.category
  const currentSubcategory = product.value.subcategory

  return all.value
    .filter(p => {
      const pId = p.id || (p as any)._id
      return pId !== currentId
    })
    .map(p => {
      let score = 0
      if (p.category === currentCategory) {
        score += 2
      }
      if (p.subcategory && currentSubcategory && p.subcategory === currentSubcategory) {
        score += 3
      }
      return { product: p, score }
    })
    .filter(item => item.score > 0) // Must match at least one attribute
    .sort((a, b) => b.score - a.score) // Sort highest score first (both matching category & subcategory)
    .map(item => item.product)
    .slice(0, 6)
})

const isAlreadyInBag = computed(() => {
  if (!product.value) return false
  const pId = product.value.id || (product.value as any)._id
  return !!cart.findItem(pId, product.value.variants[selectedVariant.value].color, selectedSize.value)
})

const handleAddToCart = async () => {
  if (!selectedSize.value) { sizeError.value = true; return }
  sizeError.value = false
  
  if (isAlreadyInBag.value) {
    navigateTo('/bag')
    return
  }

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
      { type: 'application/ld+json', children: JSON.stringify(faqSchema(productFaqs.value)) },
    ],
  })
})
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-left-enter-from { transform: translateX(100%); }
.slide-left-leave-to { transform: translateX(-100%); }
.slide-right-enter-from { transform: translateX(-100%); }
.slide-right-leave-to { transform: translateX(100%); }

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
