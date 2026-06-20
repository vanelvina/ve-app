<template>
  <div>
    <!-- Render widgets dynamically based on active order and status -->
    <div>
      <div 
        v-for="widget in activeWidgets" 
        :key="widget.key"
        :class="{
          'mt-4 md:mt-8': widget.margins?.top,
          'mb-4 md:mb-8': widget.margins?.bottom,
          'ml-4 md:ml-6': widget.margins?.left,
          'mr-4 md:mr-6': widget.margins?.right
        }"
      >
      <!-- Hero Banner -->
      <HeroBanner v-if="widget.key === 'hero'" :widget="widget" />

      <!-- Featured Products -->
      <SectionFeaturedProducts v-else-if="widget.key === 'featured'" :widget="widget" />

      <!-- New Arrivals -->
      <SectionNewArrivals v-else-if="widget.key === 'new-arrivals'" :widget="widget" />

      <!-- Everyday Comfort Editorial -->
      <SectionEverydayComfort v-else-if="widget.key === 'everyday-comfort'" :widget="widget" />

      <!-- Best Sellers -->
      <SectionBestSellers v-else-if="widget.key === 'best-sellers'" :widget="widget" />

      <!-- Shop By Category -->
      <SectionShopByCategory v-else-if="widget.key === 'categories'" :widget="widget" />

      <!-- Customer Reviews -->
      <SectionCustomerReviews v-else-if="widget.key === 'reviews'" :widget="widget" />

      <!-- Brand USP -->
      <SectionBrandUSP v-else-if="widget.key === 'usp'" :widget="widget" />

      <!-- Promo Cards Grid -->
      <SectionPromoGrid v-else-if="widget.type === 'promo-grid'" :widget="widget" />

      <!-- Curated Collection Tabs -->
      <SectionCollectionTabs v-else-if="widget.type === 'collection-tabs'" :widget="widget" />

      <!-- Fit Sizing Calculator -->
      <SectionFitCalculator v-else-if="widget.type === 'fit-calculator'" :widget="widget" />

      <!-- Special Combos Offers Slider -->
      <SectionOffersSlider v-else-if="widget.type === 'offers-slider'" :widget="widget" />

      <!-- Countdown Sales Banner with Timer -->
      <SectionCountdownBanner v-else-if="widget.type === 'countdown-banner'" :widget="widget" />

      <!-- Custom Image Only Banners (no text, no timer, natural proportions) -->
      <section v-else-if="widget.type === 'image-only'" class="w-full bg-white" :aria-labelledby="`image-only-heading-${widget?.key}`">
        <!-- Optional Section Header -->
        <div v-if="widget?.title || widget?.subtitle" class="section-heading py-6 mb-0">
          <span v-if="widget?.subtitle" class="subtitle">
            {{ widget.subtitle }}
          </span>
          <h2 :id="`image-only-heading-${widget?.key}`">
            {{ widget.title }}
          </h2>
          <p v-if="widget?.description" class="text-mid-gray text-xs md:text-sm max-w-lg mx-auto font-sans leading-relaxed mt-2 text-center">
            {{ widget.description }}
          </p>
        </div>
        <NuxtLink :to="widget.items?.link || '/products'" class="block w-full">
          <picture>
            <source media="(max-width: 768px)" :srcset="widget.imageMobile || widget.image" />
            <img
              :src="widget.image"
              :alt="widget.name || 'Promotional Banner'"
              class="w-full h-auto block"
              loading="lazy"
            />
          </picture>
        </NuxtLink>
      </section>

      <!-- Custom Vertical Cards Auto-Play Carousel -->
      <SectionVerticalCarousel v-else-if="widget.type === 'vertical-carousel'" :widget="widget" />

      <!-- Heading Banner (Full-width image banner) -->
      <SectionHeadingBanner v-else-if="widget.type === 'heading-banner'" :widget="widget" />

      <!-- Flexible Image Grid (1, 2, 3, or 4 photos grid) -->
      <SectionFlexibleGrid v-else-if="widget.type === 'flexible-grid'" :widget="widget" />

      <!-- Custom Banners -->
      <section v-else-if="widget.type === 'banner'" class="w-full">
        <NuxtLink :to="widget.items?.link || '/products'" class="block w-full">
          <picture>
            <source media="(max-width: 768px)" :srcset="widget.imageMobile || widget.image" />
            <img :src="widget.image" :alt="widget.title" class="w-full h-auto block" loading="lazy" />
          </picture>
        </NuxtLink>
      </section>

      <!-- Custom Editorial/Comfort sections -->
      <section v-else-if="widget.type === 'editorial'" class="section-padding bg-white">
        <div class="page-container">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="space-y-4">
              <span v-if="widget.subtitle" class="subtitle text-left">{{ widget.subtitle }}</span>
              <h2 class="text-3xl md:text-4xl font-serif text-deep-plum font-medium tracking-tight">{{ widget.title }}</h2>
              <p class="text-mid-gray text-sm md:text-base leading-relaxed font-sans">{{ widget.description }}</p>
            </div>
            <div v-if="widget.image">
              <picture>
                <source media="(max-width: 768px)" :srcset="widget.imageMobile || widget.image" />
                <img :src="widget.image" :alt="widget.title" class="w-full h-auto block" loading="lazy" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <!-- Custom HTML blocks -->
      <section v-else-if="widget.type === 'html'" class="section-padding bg-warm-ivory">
        <div class="page-container" v-html="widget.description"></div>
      </section>

      <!-- 3 Set Carousel -->
      <SectionThreeSetCarousel v-else-if="widget.type === '3-set-carousel'" :widget="widget" />
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { organizationSchema } from '~/utils/schema'

const widgets = ref<any[]>([])
const loading = ref(true)

const fetchWidgets = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/widgets`)
    widgets.value = data
  } catch (error) {
    console.error('Failed to load layout widgets:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWidgets()
})

const activeWidgets = computed(() => {
  return [...widgets.value]
    .filter(w => w.enabled)
    .sort((a, b) => a.order - b.order)
})

useSeoMeta({
  title: 'Van Elvina – Women Comfort First | Premium Innerwear',
  description: "Shop India's most comfortable women's innerwear. Bras, panties, shapewear, sleepwear & activewear. Free shipping above ₹999. Easy 30-day returns.",
  ogTitle: 'Van Elvina – Women Comfort First',
  ogDescription: "Premium innerwear for the modern Indian woman. Discover bras, panties, shapewear, and more — crafted for all-day comfort and elegance.",
  ogImage: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&h=630&q=80',
  ogUrl: 'https://vanelvina.com',
  twitterCard: 'summary_large_image',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema()),
    },
  ],
  link: [{ rel: 'canonical', href: 'https://vanelvina.com' }],
})
</script>
