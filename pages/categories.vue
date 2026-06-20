<template>
  <div class="min-h-screen bg-warm-ivory flex flex-col items-center justify-center px-6 py-20 text-center">
    <!-- Animated illustration -->
    <div class="relative mb-8">
      <div class="w-32 h-32 rounded-full bg-rose-blush flex items-center justify-center animate-pulse">
        <span class="text-6xl" aria-hidden="true">🛠️</span>
      </div>
      <!-- Orbit dots -->
      <div class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-dusty-rose/40 animate-bounce" style="animation-delay: 0.2s;" />
      <div class="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-soft-gold/50 animate-bounce" style="animation-delay: 0.5s;" />
    </div>

    <h1 class="font-serif text-3xl md:text-4xl text-deep-plum font-bold mb-3 tracking-tight">
      Something Beautiful is Coming
    </h1>
    <p class="text-mid-gray font-ui text-sm md:text-base max-w-sm leading-relaxed mb-8">
      We're crafting an amazing category experience for you. Check back soon — it'll be worth the wait! 💕
    </p>

    <!-- Progress bar -->
    <div class="w-64 h-1.5 bg-border-gray rounded-full overflow-hidden mb-8">
      <div class="h-full bg-gradient-to-r from-dusty-rose to-deep-plum rounded-full animate-progress" />
    </div>

    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <NuxtLink to="/" class="btn-primary">← Back to Home</NuxtLink>
      <NuxtLink to="/products" class="btn-secondary">Browse All Products</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Categories – Coming Soon | Van Elvina',
  description: 'Our new categories page is under construction. Browse all products in the meantime.',
})
</script>

<style scoped>
@keyframes progress-fill {
  0% { width: 15%; }
  50% { width: 75%; }
  100% { width: 55%; }
}
.animate-progress {
  animation: progress-fill 3s ease-in-out infinite alternate;
}
</style>
