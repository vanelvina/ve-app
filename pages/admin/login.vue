<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-warm-ivory relative overflow-hidden font-ui">
    <!-- Grid decorative background -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#FAF0F1_1px,transparent_1px),linear-gradient(to_bottom,#FAF0F1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

    <!-- Ambient glowing orbs -->
    <div class="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-rose-blush/60 blur-3xl animate-pulse-soft" />
    <div class="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-deep-plum/5 blur-3xl animate-pulse-soft" />

    <div class="max-w-md w-full space-y-8 relative z-10 animate-fade-in">
      <div class="text-center space-y-2">
        <h1 class="font-serif text-5xl text-deep-plum font-bold tracking-tight text-gradient-plum">Van Elvina</h1>
        <p class="text-xs text-charcoal/50 font-ui uppercase tracking-[0.25em] font-medium">Control Center &amp; Catalog Portal</p>
      </div>

      <div class="glass-panel p-8 rounded-3xl shadow-premium border border-white/60 relative">
        <!-- Dashboard ornament frame -->
        <div class="absolute inset-0.5 rounded-[22px] border border-dashed border-rose-blush pointer-events-none" />

        <form class="space-y-6 relative z-10" @submit.prevent="handleLogin">
          <div class="space-y-1.5 text-center">
            <h2 class="text-lg font-bold text-deep-plum">Administrator Login</h2>
            <p class="text-xs text-charcoal/60">Enter your official credentials to access store controls</p>
          </div>

          <!-- Alert Box -->
          <Transition name="fade">
            <div v-if="errorMsg" class="p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium">
              <span class="text-sm">⚠️</span>
              <span>{{ errorMsg }}</span>
            </div>
          </Transition>

          <div class="space-y-4">
            <div>
              <label for="username" class="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5">Username</label>
              <div class="relative rounded-xl shadow-soft">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg class="h-4.5 w-4.5 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  required
                  class="w-full pl-10 pr-4 py-3 bg-white/70 border border-charcoal/20 text-charcoal text-sm rounded-xl focus:outline-none focus:border-deep-plum focus:ring-2 focus:ring-deep-plum/10 transition-all font-sans placeholder-charcoal/30"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-xs font-semibold text-charcoal/70 uppercase tracking-wider mb-1.5">Password</label>
              <div class="relative rounded-xl shadow-soft">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg class="h-4.5 w-4.5 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full pl-10 pr-10 py-3 bg-white/70 border border-charcoal/20 text-charcoal text-sm rounded-xl focus:outline-none focus:border-deep-plum focus:ring-2 focus:ring-deep-plum/10 transition-all font-sans placeholder-charcoal/30"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal/40 hover:text-deep-plum transition-colors"
                >
                  <svg v-if="showPassword" class="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                  <svg v-else class="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 bg-deep-plum text-white hover:bg-plum-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-semibold tracking-wide shadow-premium hover:shadow-card hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <svg v-if="loading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ loading ? 'Authenticating...' : 'Secure Sign In' }}</span>
            </button>
          </div>
        </form>
      </div>

      <div class="text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-xs text-charcoal/50 hover:text-deep-plum font-medium tracking-wide transition-colors">
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Storefront
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAdminStore } from '~/stores/admin'
import { useUIStore } from '~/stores/ui'

definePageMeta({
  layout: 'admin'
})

const adminStore = useAdminStore()
const uiStore = useUIStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
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
      
      const nuxtApp = useNuxtApp()
      if (nuxtApp.$registerPush) {
        nuxtApp.$registerPush().catch((err: any) => console.error('Push error:', err))
      }
      
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
