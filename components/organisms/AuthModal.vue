<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="ui.authModalOpen" class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label="Sign in to Van Elvina">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="ui.closeAuthModal" />

        <Transition name="modal-slide">
          <div v-if="ui.authModalOpen" class="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10">
            <div class="h-1.5 w-full bg-gradient-to-r from-[#2A1B18] via-[#CBA39E] to-[#D4AF37]" />

            <button @click="ui.closeAuthModal" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-warm-ivory hover:bg-rose-blush/30 text-charcoal/60 hover:text-deep-plum transition-all z-10" aria-label="Close">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="px-6 pt-5 pb-7">
              <div class="text-center mb-5">
                <h2 class="font-serif text-2xl font-bold text-deep-plum">Welcome</h2>
                <p class="text-xs text-charcoal/50 mt-1 font-ui">Sign in or create your Van Elvina account</p>
              </div>

              <!-- Tabs -->
              <div class="flex border-b border-charcoal/10 mb-6">
                <button @click="activeTab = 'login'" class="flex-1 pb-3 text-sm font-ui font-semibold transition-colors" :class="activeTab === 'login' ? 'text-deep-plum border-b-2 border-deep-plum' : 'text-charcoal/40 hover:text-charcoal/70'">Login</button>
                <button @click="activeTab = 'signup'" class="flex-1 pb-3 text-sm font-ui font-semibold transition-colors" :class="activeTab === 'signup' ? 'text-deep-plum border-b-2 border-deep-plum' : 'text-charcoal/40 hover:text-charcoal/70'">Sign Up</button>
              </div>

              <!-- Login Form -->
              <div v-if="activeTab === 'login'" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Email</label>
                  <input v-model="email" type="email" placeholder="you@example.com" class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all" @keydown.enter="handleLogin" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Password</label>
                  <input v-model="password" type="password" placeholder="••••••••" class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all" @keydown.enter="handleLogin" />
                </div>

                <p v-if="errorMsg" class="text-red-500 text-xs font-ui">{{ errorMsg }}</p>

                <button @click="handleLogin" :disabled="loading" class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#7a3e4a] disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {{ loading ? 'Logging in...' : 'Login' }}
                </button>
              </div>

              <!-- Signup Form -->
              <div v-else class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Full Name</label>
                  <input v-model="name" type="text" placeholder="Priya Sharma" class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all" @keydown.enter="handleSignup" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Email</label>
                  <input v-model="email" type="email" placeholder="you@example.com" class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all" @keydown.enter="handleSignup" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Password</label>
                  <input v-model="password" type="password" placeholder="At least 6 characters" class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all" @keydown.enter="handleSignup" />
                </div>

                <p v-if="errorMsg" class="text-red-500 text-xs font-ui">{{ errorMsg }}</p>

                <button @click="handleSignup" :disabled="loading" class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#7a3e4a] disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {{ loading ? 'Signing up...' : 'Create Account' }}
                </button>
              </div>

              <!-- Divider -->
              <div class="relative flex items-center gap-3 mt-6 mb-4">
                <div class="flex-1 h-px bg-charcoal/10" />
                <span class="text-xs text-charcoal/30 font-ui uppercase tracking-wider">or</span>
                <div class="flex-1 h-px bg-charcoal/10" />
              </div>

              <!-- Google Button -->
              <button @click="handleGoogleLogin" :disabled="loading" class="w-full py-3 border-2 border-charcoal/15 rounded-xl flex items-center justify-center gap-3 hover:bg-warm-ivory hover:border-charcoal/25 transition-all disabled:opacity-50">
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span class="text-sm font-ui font-semibold text-charcoal/80">Continue with Google</span>
              </button>

              <p class="text-center text-[11px] text-charcoal/35 font-ui mt-4 leading-relaxed">
                By continuing, you agree to Van Elvina's
                <NuxtLink to="/terms" class="underline hover:text-deep-plum" @click="ui.closeAuthModal">Terms</NuxtLink>
                &amp;
                <NuxtLink to="/privacy" class="underline hover:text-deep-plum" @click="ui.closeAuthModal">Privacy Policy</NuxtLink>
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWishlistStore } from '~/stores/wishlist'
import { useCartStore } from '~/stores/cart'
import { useUIStore } from '~/stores/ui'
import { useAuthStore } from '~/stores/auth'

const ui = useUIStore()
const auth = useAuthStore()
const wishlist = useWishlistStore()
const cart = useCartStore()

const activeTab = ref<'login' | 'signup'>('login')
const email = ref('')
const name = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

watch(() => ui.authModalOpen, (open) => {
  if (!open) {
    activeTab.value = 'login'
    email.value = ''
    name.value = ''
    password.value = ''
    errorMsg.value = ''
  }
})

const handleLogin = async () => {
  errorMsg.value = ''
  if (!email.value || !password.value) {
    errorMsg.value = 'Email and password are required'
    return
  }
  loading.value = true
  try {
    await auth.loginWithPassword(email.value.trim(), password.value)
    await Promise.all([
      wishlist.syncWishlistAfterLogin(),
      cart.syncCartAfterLogin()
    ])
    ui.closeAuthModal()
    ui.addToast('success', `Welcome back${auth.user?.name ? `, ${auth.user.name}` : ''}! 🎉`)
    
    if (ui.authRedirect) {
      navigateTo(ui.authRedirect)
      ui.setAuthRedirect(null)
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}

const handleSignup = async () => {
  errorMsg.value = ''
  if (!email.value || !password.value || !name.value) {
    errorMsg.value = 'All fields are required'
    return
  }
  if (password.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters'
    return
  }
  loading.value = true
  try {
    await auth.signupWithPassword(name.value.trim(), email.value.trim(), password.value)
    await Promise.all([
      wishlist.syncWishlistAfterLogin(),
      cart.syncCartAfterLogin()
    ])
    ui.closeAuthModal()
    ui.addToast('success', `Welcome${auth.user?.name ? `, ${auth.user.name}` : ''}! 🎉`)
    
    if (ui.authRedirect) {
      navigateTo(ui.authRedirect)
      ui.setAuthRedirect(null)
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Signup failed'
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = () => {
  if (typeof window === 'undefined') return
  const clientId = useRuntimeConfig().public.googleClientId as string
  if (!clientId) {
    ui.addToast('error', 'Google login is not available right now')
    return
  }
  
  const redirectUri = encodeURIComponent(`${window.location.origin}/auth/google/callback`)
  const nonce = Math.random().toString(36).substring(2)
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=id_token&scope=email profile&nonce=${nonce}`
  if (ui.authRedirect) {
    sessionStorage.setItem('ve_auth_redirect', ui.authRedirect)
  }
  window.location.href = authUrl
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
}
.modal-slide-enter-from,
.modal-slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
@media (min-width: 640px) {
  .modal-slide-enter-from,
  .modal-slide-leave-to {
    transform: scale(0.95) translateY(10px);
  }
}
</style>
