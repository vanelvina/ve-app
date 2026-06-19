<template>
  <section class="py-6 md:py-8 bg-rose-blush/20 relative" aria-labelledby="categories-heading">
    <!-- Decorative background shape -->
    <div class="absolute inset-0 bg-gradient-to-tr from-rose-blush/10 to-transparent pointer-events-none"></div>

    <div class="page-container relative z-10">
      <div class="section-heading mb-6">
        <p class="text-xs font-ui font-bold text-dusty-rose uppercase tracking-[0.25em] mb-1">{{ widget?.subtitle || 'Find Your Style' }}</p>
        <h2 id="categories-heading" class="text-2xl md:text-3xl text-deep-plum font-serif font-bold">{{ widget?.title || 'Shop By Category' }}</h2>
        <p class="text-xs text-charcoal/60 mt-1">{{ widget?.description || 'Explore our full range — from everyday essentials to special occasion pieces.' }}</p>
      </div>

      <!-- Scrollable category list on all screens, fits in single horizontal row -->
      <div class="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide w-full justify-start md:justify-center items-start snap-x snap-mandatory">
        <div
          v-for="category in categories"
          :key="category.id"
          class="shrink-0 w-20 sm:w-24 snap-start"
        >
          <CategoryTile :category="category" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  widget?: any
}>()

const categories = ref<any[]>([])
const loading = ref(true)

const fetchCategories = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/categories`)
    categories.value = data
  } catch (error) {
    console.error('Failed to load categories:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>
