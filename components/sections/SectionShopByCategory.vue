<template>
  <section class="section-padding bg-rose-blush/30" aria-labelledby="categories-heading">
    <div class="page-container">
      <div class="section-heading">
        <p class="text-xs font-ui font-semibold text-dusty-rose uppercase tracking-[0.2em] mb-2">Find Your Style</p>
        <h2 id="categories-heading">Shop By Category</h2>
        <p>Explore our full range — from everyday essentials to special occasion pieces.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        <CategoryTile
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
