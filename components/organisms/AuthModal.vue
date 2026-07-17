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
                <button @click="switchTab('login')" class="flex-1 pb-3 text-sm font-ui font-semibold transition-colors" :class="activeTab === 'login' ? 'text-deep-plum border-b-2 border-deep-plum' : 'text-charcoal/40 hover:text-charcoal/70'">Login</button>
                <button @click="switchTab('signup')" class="flex-1 pb-3 text-sm font-ui font-semibold transition-colors" :class="activeTab === 'signup' ? 'text-deep-plum border-b-2 border-deep-plum' : 'text-charcoal/40 hover:text-charcoal/70'">Sign Up</button>
              </div>

              <!-- ── LOGIN: Step 1 — Email ──────────────────────────────── -->
              <div v-if="activeTab === 'login' && loginStep === 'email'" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Email</label>
                  <input
                    v-model="loginEmail"
                    type="email"
                    placeholder="you@example.com"
                    class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all"
                    :class="loginEmailError ? 'border-red-400' : ''"
                    @keydown.enter="sendLoginOtp"
                    @input="loginEmailError = ''"
                    autocomplete="email"
                  />
                  <p v-if="loginEmailError" class="mt-1 text-xs text-red-500 font-ui">{{ loginEmailError }}</p>
                </div>

                <p v-if="errorMsg" class="text-red-500 text-xs font-ui">{{ errorMsg }}</p>

                <button @click="sendLoginOtp" :disabled="loading" class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#7a3e4a] disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {{ loading ? 'Sending OTP…' : 'Send OTP' }}
                </button>
              </div>

              <!-- ── LOGIN: Step 2 — OTP ────────────────────────────────── -->
              <div v-if="activeTab === 'login' && loginStep === 'otp'" class="space-y-4">
                <div class="text-center mb-2">
                  <p class="text-sm font-ui text-charcoal/70">OTP sent to <span class="font-semibold text-deep-plum">{{ loginEmail }}</span></p>
                  <button @click="loginStep = 'email'; otp = ''; errorMsg = ''" class="text-xs text-charcoal/40 hover:text-deep-plum underline mt-1 font-ui">Change email</button>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Enter OTP</label>
                  <input
                    v-model="otp"
                    type="text"
                    inputmode="numeric"
                    maxlength="6"
                    placeholder="6-digit code"
                    class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all tracking-widest text-center text-lg"
                    @keydown.enter="verifyLoginOtp"
                    @input="errorMsg = ''"
                    autocomplete="one-time-code"
                  />
                </div>

                <p v-if="errorMsg" class="text-red-500 text-xs font-ui">{{ errorMsg }}</p>

                <button @click="verifyLoginOtp" :disabled="loading || otp.length < 6" class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#7a3e4a] disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {{ loading ? 'Verifying…' : 'Verify & Login' }}
                </button>

                <div class="text-center">
                  <button
                    @click="sendLoginOtp"
                    :disabled="resendCooldown > 0 || loading"
                    class="text-xs text-charcoal/40 hover:text-deep-plum font-ui disabled:cursor-not-allowed transition-colors"
                  >
                    {{ resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP' }}
                  </button>
                </div>
              </div>

              <!-- ── SIGNUP Form ─────────────────────────────────────────── -->
              <!-- ── SIGNUP Form: Step 1 (Details) ─────────────────────────── -->
              <div v-if="activeTab === 'signup' && signupStep === 'form'" class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Full Name</label>
                  <input v-model="signupName" type="text" placeholder="Priya Sharma" class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all" @keydown.enter="sendSignupOtp" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Email</label>
                  <input v-model="signupEmail" type="email" placeholder="you@example.com" class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all" @keydown.enter="sendSignupOtp" @input="errorMsg = ''" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Password</label>
                  <input v-model="signupPassword" type="password" placeholder="At least 6 characters" class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all" @keydown.enter="sendSignupOtp" />
                </div>

                <p v-if="errorMsg" class="text-red-500 text-xs font-ui">{{ errorMsg }}</p>

                <button @click="sendSignupOtp" :disabled="loading" class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#7a3e4a] disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {{ loading ? 'Sending OTP…' : 'Create Account' }}
                </button>
              </div>

              <!-- ── SIGNUP Form: Step 2 (OTP Verification) ───────────────── -->
              <div v-if="activeTab === 'signup' && signupStep === 'otp'" class="space-y-4">
                <div class="text-center mb-2">
                  <p class="text-sm font-ui text-charcoal/70">OTP sent to <span class="font-semibold text-deep-plum">{{ signupEmail }}</span></p>
                  <button @click="signupStep = 'form'; signupOtp = ''; errorMsg = ''" class="text-xs text-charcoal/40 hover:text-deep-plum underline mt-1 font-ui">Change details</button>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Enter OTP</label>
                  <input
                    v-model="signupOtp"
                    type="text"
                    inputmode="numeric"
                    maxlength="6"
                    placeholder="6-digit code"
                    class="w-full px-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum transition-all tracking-widest text-center text-lg font-bold"
                    @keydown.enter="verifySignupOtp"
                    @input="errorMsg = ''"
                    autocomplete="one-time-code"
                  />
                </div>

                <p v-if="errorMsg" class="text-red-500 text-xs font-ui">{{ errorMsg }}</p>

                <button @click="verifySignupOtp" :disabled="loading || signupOtp.length < 6" class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#7a3e4a] disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {{ loading ? 'Verifying…' : 'Verify & Create Account' }}
                </button>

                <div class="text-center">
                  <button
                    @click="sendSignupOtp"
                    :disabled="resendCooldown > 0 || loading"
                    class="text-xs text-charcoal/40 hover:text-deep-plum font-ui disabled:cursor-not-allowed transition-colors"
                  >
                    {{ resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP' }}
                  </button>
                </div>
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

// ── Tab state ────────────────────────────────────────────────────────────
const activeTab = ref<'login' | 'signup'>('login')

// ── Login flow (OTP-based) ───────────────────────────────────────────────
const loginStep = ref<'email' | 'otp'>('email')
const loginEmail = ref('')
const loginEmailError = ref('')
const otp = ref('')
const resendCooldown = ref(0)
let cooldownTimer: ReturnType<typeof setInterval> | null = null

// ── Signup state ─────────────────────────────────────────────────────────
const signupName = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const signupStep = ref<'form' | 'otp'>('form')
const signupOtp = ref('')

// ── Shared ───────────────────────────────────────────────────────────────
const loading = ref(false)
const errorMsg = ref('')

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

// Reset all state when modal closes
watch(() => ui.authModalOpen, (open) => {
  if (!open) {
    activeTab.value = 'login'
    loginStep.value = 'email'
    loginEmail.value = ''
    loginEmailError.value = ''
    otp.value = ''
    signupName.value = ''
    signupEmail.value = ''
    signupPassword.value = ''
    signupStep.value = 'form'
    signupOtp.value = ''
    errorMsg.value = ''
    resendCooldown.value = 0
    if (cooldownTimer) clearInterval(cooldownTimer)
  }
})

// Clear all state when switching tabs
const switchTab = (tab: 'login' | 'signup') => {
  activeTab.value = tab
  loginStep.value = 'email'
  loginEmail.value = ''
  loginEmailError.value = ''
  otp.value = ''
  signupName.value = ''
  signupEmail.value = ''
  signupPassword.value = ''
  signupStep.value = 'form'
  signupOtp.value = ''
  errorMsg.value = ''
}

// Start a 30s countdown before allowing resend
const startResendCooldown = () => {
  resendCooldown.value = 30
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0 && cooldownTimer) clearInterval(cooldownTimer)
  }, 1000)
}

const sendLoginOtp = async () => {
  loginEmailError.value = ''
  errorMsg.value = ''
  const trimmed = loginEmail.value.trim()
  if (!trimmed) { loginEmailError.value = 'Email is required'; return }
  if (!isValidEmail(trimmed)) { loginEmailError.value = 'Enter a valid email address'; return }
  loginEmail.value = trimmed
  loading.value = true
  try {
    await auth.sendOtp(trimmed)
    loginStep.value = 'otp'
    startResendCooldown()
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to send OTP. Please try again.'
  } finally {
    loading.value = false
  }
}

const verifyLoginOtp = async () => {
  errorMsg.value = ''
  if (otp.value.length < 6) { errorMsg.value = 'Enter the 6-digit OTP'; return }
  loading.value = true
  try {
    await auth.verifyOtp(loginEmail.value, otp.value)
    await Promise.all([
      wishlist.syncWishlistAfterLogin(),
      cart.syncCartAfterLogin()
    ])
    const redirectPath = ui.authRedirect
    ui.closeAuthModal()
    ui.addToast('success', `Welcome back${auth.user?.name ? `, ${auth.user.name}` : ''}! 🎉`)

    const nuxtApp = useNuxtApp()
    if (nuxtApp.$registerPush) {
      nuxtApp.$registerPush().catch((err: any) => console.error('Push error:', err))
    }
    if (redirectPath) {
      await nextTick()
      navigateTo(redirectPath)
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Invalid OTP. Please try again.'
  } finally {
    loading.value = false
  }
}

const sendSignupOtp = async () => {
  errorMsg.value = ''
  const trimmedEmail = signupEmail.value.trim()
  if (!signupName.value.trim() || !trimmedEmail || !signupPassword.value) {
    errorMsg.value = 'All fields are required'
    return
  }
  if (!isValidEmail(trimmedEmail)) {
    errorMsg.value = 'Enter a valid email address'
    return
  }
  if (signupPassword.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters'
    return
  }
  loading.value = true
  try {
    const res = await auth.sendOtp(trimmedEmail)
    if (res && res.purpose === 'login') {
      errorMsg.value = 'An account with this email already exists. Please login instead.'
      return
    }
    signupStep.value = 'otp'
    startResendCooldown()
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to send verification code'
  } finally {
    loading.value = false
  }
}

const verifySignupOtp = async () => {
  errorMsg.value = ''
  if (signupOtp.value.length < 6) {
    errorMsg.value = 'Enter the 6-digit OTP'
    return
  }
  loading.value = true
  try {
    await auth.verifyOtp(signupEmail.value.trim(), signupOtp.value, signupName.value.trim(), signupPassword.value)
    await Promise.all([
      wishlist.syncWishlistAfterLogin(),
      cart.syncCartAfterLogin()
    ])
    const redirectPath = ui.authRedirect
    ui.closeAuthModal()
    ui.addToast('success', `Welcome${auth.user?.name ? `, ${auth.user.name}` : ''}! 🎉`)

    const nuxtApp = useNuxtApp()
    if (nuxtApp.$registerPush) {
      nuxtApp.$registerPush().catch((err: any) => console.error('Push error:', err))
    }
    if (redirectPath) {
      await nextTick()
      navigateTo(redirectPath)
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Verification failed. Please check the code.'
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

  const redirectUrl = ui.authRedirect || (window.location.pathname + window.location.search)
  const safeRedirect = (redirectUrl.includes('/auth') || redirectUrl.includes('/login')) ? '/' : redirectUrl
  sessionStorage.setItem('ve_auth_redirect', safeRedirect)

  window.location.href = authUrl
}
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-slide-enter-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease; }
.modal-slide-leave-active { transition: transform 0.2s ease-in, opacity 0.2s ease-in; }
.modal-slide-enter-from { transform: translateY(20px); opacity: 0; }
.modal-slide-leave-to { transform: translateY(10px); opacity: 0; }
@media (max-width: 639px) {
  .modal-slide-enter-from { transform: translateY(100%); }
  .modal-slide-leave-to { transform: translateY(100%); }
}
</style>
