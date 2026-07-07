<template>
  <div class="min-h-screen bg-warm-ivory flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="text-8xl mb-6" aria-hidden="true">{{ error?.statusCode === 404 ? '🔍' : '⚠️' }}</div>
      <h1 class="font-serif text-4xl text-deep-plum font-bold mb-3">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
      </h1>
      <p class="text-mid-gray font-ui mb-2">
        {{ error?.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : 'An unexpected error occurred. Please try again.' }}
      </p>
      <p v-if="error?.message" class="text-xs text-red-400 font-mono mb-6 break-all">{{ error.message }}</p>
      <div class="flex gap-3 justify-center flex-wrap">
        <button v-if="isAdminRoute" class="btn-primary" @click="handleAdminLogin">Back to Admin Login</button>
        <button v-else class="btn-primary" @click="handleGoHome">Go Home</button>
        <button v-if="!isAdminRoute" class="btn-secondary" @click="handleBrowse">Browse Products</button>
        <button class="btn-secondary" @click="handleRetry">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message?: string; url?: string } | null }>()
const { clearError } = useError()
const route = useRoute()

const isAdminRoute = computed(() => {
  const url = props.error?.url || route.path || ''
  return url.startsWith('/admin')
})

const handleGoHome = async () => {
  await clearError()
  await navigateTo('/')
}

const handleBrowse = async () => {
  await clearError()
  await navigateTo('/products')
}

const handleAdminLogin = async () => {
  await clearError()
  if (import.meta.client) {
    window.location.href = '/admin/login'
  } else {
    await navigateTo('/admin/login')
  }
}

const handleRetry = async () => {
  await clearError()
  if (import.meta.client) {
    window.location.reload()
  }
}
</script>
