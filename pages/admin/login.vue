<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-warm-ivory relative overflow-hidden">
    <!-- Background styling element -->
    <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-rose-blush/20 blur-3xl" />
    <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-deep-plum/5 blur-3xl" />

    <div class="max-w-md w-full space-y-8 relative z-10">
      <div class="text-center">
        <h1 class="font-serif text-4xl text-deep-plum font-bold tracking-tight">Van Elvina</h1>
        <p class="mt-2 text-sm text-charcoal/70 font-ui uppercase tracking-wider">Admin Portal</p>
      </div>

      <div class="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-card border border-rose-blush/30">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Alert Box -->
          <div v-if="errorMsg" class="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2 font-ui">
            <span>⚠️</span>
            <span>{{ errorMsg }}</span>
          </div>

          <div class="space-y-4">
            <div>
              <label for="username" class="block text-xs font-ui font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5">Username</label>
              <input
                id="username"
                v-model="username"
                type="text"
                required
                class="w-full px-4 py-2.5 bg-white border border-rose-blush/40 text-charcoal text-sm rounded-lg focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum transition-all"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label for="password" class="block text-xs font-ui font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-4 py-2.5 bg-white border border-rose-blush/40 text-charcoal text-sm rounded-lg focus:outline-none focus:border-deep-plum focus:ring-1 focus:ring-deep-plum transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <AppButton
              type="submit"
              full
              :loading="loading"
              class="w-full py-3 bg-deep-plum text-white hover:bg-plum-800 rounded-lg text-sm font-semibold tracking-wide shadow-md"
            >
              Sign In
            </AppButton>
          </div>
        </form>
      </div>
      
      <div class="text-center">
        <NuxtLink to="/" class="text-xs text-dusty-rose hover:underline font-ui font-medium flex items-center justify-center gap-1">
          ← Return to Storefront
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin'
import { useUIStore } from '~/stores/ui'

definePageMeta({
  layout: 'admin'
})

const adminStore = useAdminStore()
const uiStore = useUIStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  adminStore.init()
  if (adminStore.isAuthenticated) {
    const valid = await adminStore.checkAuth()
    if (valid) {
      navigateTo('/admin/dashboard')
    }
  }
})

const handleLogin = async () => {
  errorMsg.value = ''
  loading.value = true
  try {
    const success = await adminStore.login(username.value, password.value)
    if (success) {
      uiStore.addToast('success', 'Logged in successfully! Welcome to dashboard.')
      navigateTo('/admin/dashboard')
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Invalid username or password'
    uiStore.addToast('error', errorMsg.value)
  } finally {
    loading.value = false
  }
}
</script>
