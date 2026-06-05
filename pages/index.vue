<template>
  <div>
    <!-- Render widgets dynamically based on active order and status -->
    <div v-for="widget in activeWidgets" :key="widget.key">
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

      <!-- Custom Banners -->
      <section v-else-if="widget.type === 'banner'" class="section-padding bg-warm-ivory">
        <div class="page-container">
          <div class="relative overflow-hidden rounded-2xl aspect-[16/6] shadow-card-hover min-h-[220px]">
            <img :src="widget.image" :alt="widget.title" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
              <div>
                <span v-if="widget.subtitle" class="inline-block px-3 py-1 bg-deep-plum text-white text-xs rounded-full uppercase tracking-wider mb-2">{{ widget.subtitle }}</span>
                <h2 class="text-2xl md:text-5xl font-serif text-white font-bold mb-3">{{ widget.title }}</h2>
                <p class="text-white/80 text-sm md:text-base max-w-lg mx-auto">{{ widget.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Custom Editorial/Comfort sections -->
      <section v-else-if="widget.type === 'editorial'" class="section-padding bg-white">
        <div class="page-container">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="space-y-4">
              <span v-if="widget.subtitle" class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-wider">{{ widget.subtitle }}</span>
              <h2 class="text-3xl md:text-4xl font-serif text-deep-plum font-bold">{{ widget.title }}</h2>
              <p class="text-mid-gray text-sm md:text-base leading-relaxed">{{ widget.description }}</p>
            </div>
            <div v-if="widget.image" class="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md min-h-[200px]">
              <img :src="widget.image" :alt="widget.title" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <!-- Custom HTML blocks -->
      <section v-else-if="widget.type === 'html'" class="section-padding bg-warm-ivory">
        <div class="page-container" v-html="widget.description"></div>
      </section>
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
