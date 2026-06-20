<template>
  <div class="min-h-screen bg-warm-ivory flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="text-8xl mb-6" aria-hidden="true">{{ error?.statusCode === 404 ? '🔍' : '⚠️' }}</div>
      <h1 class="font-serif text-4xl text-deep-plum font-bold mb-3">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
      </h1>
      <p class="text-mid-gray font-ui mb-8">
        {{ error?.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : 'An unexpected error occurred. Please try again.' }}
      </p>
      <div class="flex gap-3 justify-center">
        <button class="btn-primary" @click="handleGoHome">Go Home</button>
        <button class="btn-secondary" @click="handleBrowse">Browse Products</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message?: string } | null }>()
const { clearError } = useError()

const handleGoHome = async () => {
  await clearError()
  await navigateTo('/')
}

const handleBrowse = async () => {
  await clearError()
  await navigateTo('/products')
}
</script>
