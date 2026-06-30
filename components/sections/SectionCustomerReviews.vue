<template>
  <section class="section-padding bg-warm-ivory" aria-labelledby="reviews-heading">
    <div class="page-container">
      <div class="section-heading">
        <p class="text-xs font-ui font-semibold text-soft-gold uppercase tracking-[0.2em] mb-2">Real Women, Real Stories</p>
        <h2 id="reviews-heading">What Our Customers Say</h2>
        <p>Join 50,000+ happy customers who trust Van Elvina for everyday comfort.</p>
      </div>

      <!-- Stats bar -->
      <div class="flex flex-wrap justify-center gap-8 md:gap-16 mb-10">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <p class="font-serif text-3xl font-bold text-deep-plum">{{ stat.value }}</p>
          <p class="text-xs text-mid-gray font-ui mt-1">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Reviews grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const reviews = useState<any[]>('homepage-reviews', () => [])
const loading = ref(reviews.value.length === 0)

const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '4.7★', label: 'Average Rating' },
  { value: '95%', label: 'Would Recommend' },
  { value: '30-Day', label: 'Easy Returns' },
]

const fetchReviews = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/reviews`)
    reviews.value = data.slice(0, 6)
  } catch (error) {
    console.error('Failed to load reviews:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (reviews.value.length === 0) {
    fetchReviews()
  } else {
    loading.value = false
  }
})
</script>
