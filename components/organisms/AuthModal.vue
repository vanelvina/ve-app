<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="ui.authModalOpen"
        class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Sign in to Van Elvina"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="ui.closeAuthModal"
        />

        <!-- Modal Panel -->
        <Transition name="modal-slide">
          <div
            v-if="ui.authModalOpen"
            class="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            <!-- Decorative header gradient -->
            <div class="h-1.5 w-full bg-gradient-to-r from-[#8A4F5A] via-[#B76E79] to-[#C59B27]" />

            <!-- Close button -->
            <button
              @click="ui.closeAuthModal"
              class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-warm-ivory hover:bg-rose-blush/30 text-charcoal/60 hover:text-deep-plum transition-all z-10"
              aria-label="Close"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="px-6 pt-5 pb-7">
              <!-- Brand heading -->
              <div class="text-center mb-5">
                <h2 class="font-serif text-2xl font-bold text-deep-plum">Welcome</h2>
                <p class="text-xs text-charcoal/50 mt-1 font-ui">Sign in or create your Van Elvina account</p>
              </div>

              <!-- Step: OTP entry (email sent) -->
              <div v-if="step === 'otp'" class="space-y-4">
                <div class="text-center space-y-1">
                  <p class="text-sm font-ui text-charcoal/70">Code sent to</p>
                  <p class="font-semibold text-deep-plum text-sm">{{ email }}</p>
                  <p class="text-xs text-charcoal/40 font-ui">Check your inbox (and spam folder)</p>
                </div>

                <!-- OTP digit inputs -->
                <div class="flex justify-center gap-2 mt-2">
                  <input
                    v-for="(_, i) in 6"
                    :key="i"
                    :ref="el => otpRefs[i] = el as HTMLInputElement"
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    class="w-11 h-12 text-center text-lg font-bold font-ui border-2 rounded-xl focus:outline-none focus:border-deep-plum transition-all bg-warm-ivory/50 text-deep-plum"
                    :class="otpDigits[i] ? 'border-deep-plum bg-rose-blush/20' : 'border-charcoal/20'"
                    :value="otpDigits[i]"
                    @input="handleOtpInput($event, i)"
                    @keydown="handleOtpKeydown($event, i)"
                    @paste="handleOtpPaste"
                  />
                </div>

                <!-- Name input (for new users) -->
                <div v-if="isNewUser" class="space-y-1">
                  <label class="text-xs font-semibold text-charcoal/60 uppercase tracking-wider font-ui">Your Name</label>
                  <input
                    v-model="name"
                    type="text"
                    placeholder="Priya Sharma"
                    class="w-full px-4 py-2.5 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum focus:ring-2 focus:ring-deep-plum/10 transition-all"
                  />
                </div>

                <!-- Error -->
                <p v-if="errorMsg" class="text-red-500 text-xs text-center font-ui">{{ errorMsg }}</p>

                <!-- Verify button -->
                <button
                  @click="verifyOtp"
                  :disabled="loading || otpCode.length < 6"
                  class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#7a3e4a] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {{ loading ? 'Verifying...' : 'Verify & Continue' }}
                </button>

                <!-- Resend countdown -->
                <div class="text-center">
                  <button
                    v-if="resendCountdown === 0"
                    @click="sendOtp"
                    class="text-xs text-deep-plum font-semibold hover:underline font-ui"
                  >Resend code</button>
                  <p v-else class="text-xs text-charcoal/40 font-ui">
                    Resend in <span class="font-semibold text-deep-plum">{{ resendCountdown }}s</span>
                  </p>
                </div>

                <button
                  @click="step = 'email'"
                  class="w-full text-xs text-charcoal/50 hover:text-deep-plum font-ui text-center transition-colors"
                >← Change email</button>
              </div>

              <!-- Step: Email input -->
              <div v-else-if="activeTab === 'email'" class="space-y-4">
                <div class="relative">
                  <label class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Email Address</label>
                  <div class="relative">
                    <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input
                      id="auth-email"
                      v-model="email"
                      type="email"
                      placeholder="you@example.com"
                      autocomplete="email"
                      class="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-xl text-sm font-ui focus:outline-none focus:border-deep-plum focus:ring-2 focus:ring-deep-plum/10 transition-all"
                      @keydown.enter="sendOtp"
                    />
                  </div>
                </div>

                <p v-if="errorMsg" class="text-red-500 text-xs font-ui">{{ errorMsg }}</p>

                <button
                  @click="sendOtp"
                  :disabled="loading || !email"
                  class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#7a3e4a] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {{ loading ? 'Sending code...' : 'Send Verification Code' }}
                </button>

                <!-- Divider -->
                <div class="relative flex items-center gap-3">
                  <div class="flex-1 h-px bg-charcoal/10" />
                  <span class="text-xs text-charcoal/30 font-ui uppercase tracking-wider">or</span>
                  <div class="flex-1 h-px bg-charcoal/10" />
                </div>

                <!-- Google Button -->
                <button
                  @click="handleGoogleLogin"
                  :disabled="loading"
                  class="w-full py-3 border-2 border-charcoal/15 rounded-xl flex items-center justify-center gap-3 hover:bg-warm-ivory hover:border-charcoal/25 transition-all disabled:opacity-50"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span class="text-sm font-ui font-semibold text-charcoal/80">Continue with Google</span>
                </button>
              </div>

              <!-- Terms notice -->
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
import { ref, computed, watch, nextTick } from 'vue'
import { useWishlistStore } from '~/stores/wishlist'
import { useCartStore } from '~/stores/cart'

const ui = useUIStore()
const auth = useAuthStore()
const wishlist = useWishlistStore()
const cart = useCartStore()

// ── State ─────────────────────────────────────────────────────────────────────
const activeTab = ref<'email'>('email')
const step = ref<'email' | 'otp'>('email')
const email = ref('')
const name = ref('')
const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const otpRefs = ref<HTMLInputElement[]>([])
const loading = ref(false)
const errorMsg = ref('')
const isNewUser = ref(false)
const resendCountdown = ref(0)
let countdownInterval: ReturnType<typeof setInterval> | null = null

const otpCode = computed(() => otpDigits.value.join(''))

// Reset on modal close
watch(() => ui.authModalOpen, (open) => {
  if (!open) {
    step.value = 'email'
    email.value = ''
    name.value = ''
    otpDigits.value = ['', '', '', '', '', '']
    errorMsg.value = ''
    isNewUser.value = false
    resendCountdown.value = 0
    if (countdownInterval) clearInterval(countdownInterval)
  }
})

// ── OTP Input handlers ────────────────────────────────────────────────────────
const handleOtpInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '').slice(-1)
  otpDigits.value[index] = value
  if (value && index < 5) {
    nextTick(() => otpRefs.value[index + 1]?.focus())
  }
}

const handleOtpKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    nextTick(() => otpRefs.value[index - 1]?.focus())
  }
}

const handleOtpPaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pasted = event.clipboardData?.getData('text')?.replace(/\D/g, '').slice(0, 6) || ''
  pasted.split('').forEach((char, i) => {
    if (i < 6) otpDigits.value[i] = char
  })
  nextTick(() => otpRefs.value[Math.min(pasted.length, 5)]?.focus())
}

// ── Send OTP ──────────────────────────────────────────────────────────────────
const sendOtp = async () => {
  errorMsg.value = ''
  const emailVal = email.value.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    errorMsg.value = 'Please enter a valid email address'
    return
  }
  loading.value = true
  try {
    const res = await auth.sendOtp(emailVal)
    isNewUser.value = res.purpose === 'signup'
    step.value = 'otp'
    otpDigits.value = ['', '', '', '', '', '']
    startCountdown()
    nextTick(() => otpRefs.value[0]?.focus())
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to send code'
  } finally {
    loading.value = false
  }
}

const startCountdown = () => {
  resendCountdown.value = 60
  if (countdownInterval) clearInterval(countdownInterval)
  countdownInterval = setInterval(() => {
    if (resendCountdown.value > 0) {
      resendCountdown.value--
    } else {
      if (countdownInterval) clearInterval(countdownInterval)
    }
  }, 1000)
}

// ── Verify OTP ────────────────────────────────────────────────────────────────
const verifyOtp = async () => {
  errorMsg.value = ''
  if (otpCode.value.length < 6) {
    errorMsg.value = 'Please enter the 6-digit code'
    return
  }
  loading.value = true
  try {
    const nameVal = isNewUser.value ? name.value.trim() : undefined
    await auth.verifyOtp(email.value.trim(), otpCode.value, nameVal)
    await Promise.all([
      wishlist.syncWishlistAfterLogin(),
      cart.syncCartAfterLogin()
    ])
    ui.closeAuthModal()
    useUIStore().addToast('success', `Welcome${auth.user?.name ? `, ${auth.user.name}` : ''}! 🎉`)
  } catch (err: any) {
    errorMsg.value = err.message || 'Invalid code. Please try again.'
  } finally {
    loading.value = false
  }
}

// ── Google Login ──────────────────────────────────────────────────────────────
const handleGoogleLogin = () => {
  if (typeof window === 'undefined') return
  const clientId = useRuntimeConfig().public.googleClientId as string
  if (!clientId || !window.google) {
    useUIStore().addToast('error', 'Google login is not available right now')
    return
  }
  window.google.accounts.id.initialize({
    client_id: clientId,
    callback: async (response: any) => {
      loading.value = true
      try {
        await auth.loginWithGoogle(response.credential)
        await Promise.all([
          wishlist.syncWishlistAfterLogin(),
          cart.syncCartAfterLogin()
        ])
        ui.closeAuthModal()
        useUIStore().addToast('success', `Welcome, ${auth.user?.name}! 🎉`)
      } catch (err: any) {
        errorMsg.value = err.message || 'Google login failed'
      } finally {
        loading.value = false
      }
    },
  })
  window.google.accounts.id.prompt()
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
