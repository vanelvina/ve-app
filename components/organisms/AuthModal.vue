<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="ui.authModalOpen"
        class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="activeTab === 'login' ? 'Sign in to Van Elvina' : 'Create your Van Elvina account'"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="ui.closeAuthModal" />

        <Transition name="modal-slide">
          <div v-if="ui.authModalOpen" class="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10">
            <!-- Brand gradient bar -->
            <div class="h-1.5 w-full bg-gradient-to-r from-[#2A1B18] via-[#CBA39E] to-[#D4AF37]" />

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

            <div class="px-6 pt-5 pb-7 max-h-[90vh] overflow-y-auto">

              <!-- Header — title changes per step -->
              <div class="text-center mb-5">
                <h2 class="font-serif text-2xl font-bold text-deep-plum">
                  <template v-if="activeTab === 'login'">Welcome back</template>
                  <template v-else-if="signupStep === 'otp'">Verify your email</template>
                  <template v-else>Create account</template>
                </h2>
                <p class="text-xs text-charcoal/50 mt-1 font-ui">
                  <template v-if="activeTab === 'login' && loginStep === 'credentials'">Sign in to continue shopping</template>
                  <template v-else-if="activeTab === 'login' && loginStep === 'otp-email'">Enter your email and we'll send a one-time code</template>
                  <template v-else-if="activeTab === 'login' && loginStep === 'otp-verify'">Code sent to <span class="font-semibold text-deep-plum">{{ loginEmail }}</span></template>
                  <template v-else-if="signupStep === 'otp'">Code sent to <span class="font-semibold text-deep-plum">{{ signupEmail }}</span></template>
                  <template v-else>Join Van Elvina for exclusive offers &amp; comfort</template>
                </p>
              </div>

              <!-- Tabs — hidden during OTP steps to keep focus -->
              <div v-if="!(signupStep === 'otp') && !(loginStep === 'otp-verify')" class="flex border-b border-charcoal/10 mb-6">
                <button
                  id="auth-tab-login"
                  @click="switchTab('login')"
                  class="flex-1 pb-3 text-sm font-ui font-semibold transition-colors"
                  :class="activeTab === 'login' ? 'text-deep-plum border-b-2 border-deep-plum' : 'text-charcoal/40 hover:text-charcoal/70'"
                >Sign In</button>
                <button
                  id="auth-tab-signup"
                  @click="switchTab('signup')"
                  class="flex-1 pb-3 text-sm font-ui font-semibold transition-colors"
                  :class="activeTab === 'signup' ? 'text-deep-plum border-b-2 border-deep-plum' : 'text-charcoal/40 hover:text-charcoal/70'"
                >Sign Up</button>
              </div>

              <!-- ────────────────────────────────────────────────────────
                   LOGIN: Email + Password form
              ──────────────────────────────────────────────────────────── -->
              <div v-if="activeTab === 'login' && loginStep === 'credentials'" class="space-y-4">
                <!-- Email -->
                <div>
                  <label for="login-email" class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Email</label>
                  <input
                    id="login-email"
                    ref="loginEmailRef"
                    v-model="loginEmail"
                    type="email"
                    placeholder="Enter email address"
                    autocomplete="email"
                    class="w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none transition-all"
                    :class="loginEmailError ? 'border-red-400 bg-red-50/40' : 'border-charcoal/20 focus:border-deep-plum'"
                    @keydown.enter="loginPasswordRef?.focus()"
                    @blur="validateLoginEmail"
                    @input="loginEmailError = ''; errorMsg = ''"
                  />
                  <p v-if="loginEmailError" class="mt-1.5 text-xs text-red-500 font-ui flex items-center gap-1">
                    <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                    {{ loginEmailError }}
                  </p>
                </div>

                <!-- Password -->
                <div>
                  <div class="flex justify-between items-center mb-1.5">
                    <label for="login-password" class="text-xs font-semibold text-charcoal/60 uppercase tracking-wider font-ui">Password</label>
                    <button type="button" @click="switchToOtpLogin" class="text-[11px] text-deep-plum/70 hover:text-deep-plum font-ui underline underline-offset-2 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                  <div class="relative">
                    <input
                      id="login-password"
                      ref="loginPasswordRef"
                      v-model="loginPassword"
                      :type="showLoginPassword ? 'text' : 'password'"
                      placeholder="Enter your password"
                      autocomplete="current-password"
                      class="w-full px-4 py-3 pr-11 border rounded-xl text-sm font-ui focus:outline-none transition-all"
                      :class="loginPasswordError ? 'border-red-400 bg-red-50/40' : 'border-charcoal/20 focus:border-deep-plum'"
                      @keydown.enter="handleLogin"
                      @input="loginPasswordError = ''; errorMsg = ''"
                    />
                    <button
                      type="button"
                      @click="showLoginPassword = !showLoginPassword"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/35 hover:text-charcoal/70 transition-colors"
                      :aria-label="showLoginPassword ? 'Hide password' : 'Show password'"
                    >
                      <!-- Eye off -->
                      <svg v-if="showLoginPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                      <!-- Eye -->
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </div>
                  <p v-if="loginPasswordError" class="mt-1.5 text-xs text-red-500 font-ui flex items-center gap-1">
                    <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                    {{ loginPasswordError }}
                  </p>
                </div>

                <!-- Server error -->
                <p v-if="errorMsg" class="text-red-600 text-xs font-ui bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 flex items-start gap-2">
                  <svg class="w-3.5 h-3.5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                  {{ errorMsg }}
                </p>

                <!-- Sign In button -->
                <button
                  id="btn-signin"
                  @click="handleLogin"
                  :disabled="loading"
                  class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#473021] active:scale-[0.98] disabled:opacity-50 transition-all flex justify-center items-center gap-2 shadow-sm"
                >
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {{ loading ? 'Signing in…' : 'Sign In' }}
                </button>

                <!-- Divider -->
                <div class="relative flex items-center gap-3">
                  <div class="flex-1 h-px bg-charcoal/10" />
                  <span class="text-xs text-charcoal/30 font-ui uppercase tracking-wider">or</span>
                  <div class="flex-1 h-px bg-charcoal/10" />
                </div>

                <!-- Google -->
                <button id="btn-google-login" @click="handleGoogleLogin" :disabled="loading" class="w-full py-3 border-2 border-charcoal/15 rounded-xl flex items-center justify-center gap-3 hover:bg-warm-ivory hover:border-charcoal/25 active:scale-[0.98] transition-all disabled:opacity-50">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span class="text-sm font-ui font-semibold text-charcoal/80">Continue with Google</span>
                </button>

                <!-- Cross-link to signup -->
                <p class="text-center text-xs text-charcoal/40 font-ui">
                  Don't have an account?
                  <button @click="switchTab('signup')" class="text-deep-plum font-semibold hover:underline ml-1 transition-colors">Sign up</button>
                </p>
              </div>

              <!-- ────────────────────────────────────────────────────────
                   LOGIN: OTP mode — email entry (forgot password / OTP option)
              ──────────────────────────────────────────────────────────── -->
              <div v-if="activeTab === 'login' && loginStep === 'otp-email'" class="space-y-4">
                <div class="flex items-center gap-2 -mt-1 mb-1">
                  <button @click="loginStep = 'credentials'; errorMsg = ''" class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-warm-ivory text-charcoal/50 hover:text-deep-plum transition-all" aria-label="Back to password login">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <p class="text-xs font-ui text-charcoal/50">We'll send a one-time code to your email</p>
                </div>
                <div>
                  <label for="login-otp-email" class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Email</label>
                  <input
                    id="login-otp-email"
                    v-model="loginEmail"
                    type="email"
                    placeholder="Enter email address"
                    autocomplete="email"
                    class="w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none transition-all"
                    :class="loginEmailError ? 'border-red-400' : 'border-charcoal/20 focus:border-deep-plum'"
                    @keydown.enter="sendLoginOtp"
                    @input="loginEmailError = ''; errorMsg = ''"
                  />
                  <p v-if="loginEmailError" class="mt-1 text-xs text-red-500 font-ui">{{ loginEmailError }}</p>
                </div>
                <p v-if="errorMsg" class="text-red-600 text-xs font-ui bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">{{ errorMsg }}</p>
                <button @click="sendLoginOtp" :disabled="loading" class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#473021] disabled:opacity-50 transition-all flex justify-center items-center gap-2">
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {{ loading ? 'Sending…' : 'Send OTP' }}
                </button>
              </div>

              <!-- ────────────────────────────────────────────────────────
                   LOGIN: OTP verification step (6 boxes)
              ──────────────────────────────────────────────────────────── -->
              <div v-if="activeTab === 'login' && loginStep === 'otp-verify'" class="space-y-5">
                <div class="text-center">
                  <div class="w-14 h-14 bg-deep-plum/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg class="w-7 h-7 text-deep-plum" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <button @click="loginStep = 'otp-email'; resetLoginOtpBoxes(); errorMsg = ''" class="text-xs text-charcoal/40 hover:text-deep-plum flex items-center gap-1 mx-auto font-ui transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    Change email
                  </button>
                </div>

                <!-- 6-box OTP -->
                <div>
                  <p class="text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-3 font-ui text-center">Enter 6-digit code</p>
                  <div class="flex gap-2 justify-center">
                    <input
                      v-for="(_, i) in 6"
                      :key="'lotp-' + i"
                      :ref="(el) => { loginOtpRefs[i] = el as HTMLInputElement }"
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      class="w-11 h-12 text-center text-lg font-bold border-2 rounded-xl font-ui focus:outline-none transition-all"
                      :class="loginOtpBoxes[i] ? 'border-deep-plum bg-deep-plum/5 text-deep-plum' : 'border-charcoal/20 focus:border-deep-plum'"
                      :value="loginOtpBoxes[i]"
                      @input="handleLoginOtpInput(i, $event)"
                      @keydown="handleLoginOtpKeydown(i, $event)"
                      @paste.prevent="handleLoginOtpPaste($event)"
                    />
                  </div>
                </div>

                <p v-if="errorMsg" class="text-red-600 text-xs font-ui bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 text-center">{{ errorMsg }}</p>

                <button
                  id="btn-verify-login-otp"
                  @click="verifyLoginOtp"
                  :disabled="loading || loginOtp.length < 6"
                  class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#473021] disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                >
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {{ loading ? 'Verifying…' : 'Verify & Sign In' }}
                </button>
                <div class="text-center">
                  <button @click="sendLoginOtp" :disabled="resendCooldown > 0 || loading" class="text-xs text-charcoal/40 hover:text-deep-plum font-ui disabled:cursor-not-allowed transition-colors">
                    {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code' }}
                  </button>
                </div>
              </div>

              <!-- ────────────────────────────────────────────────────────
                   SIGNUP: Step 1 — Details form
              ──────────────────────────────────────────────────────────── -->
              <div v-if="activeTab === 'signup' && signupStep === 'form'" class="space-y-4">
                <!-- Google CTA prominent at top for signup -->
                <button id="btn-google-signup" @click="handleGoogleLogin" :disabled="loading" class="w-full py-3 border-2 border-charcoal/15 rounded-xl flex items-center justify-center gap-3 hover:bg-warm-ivory hover:border-charcoal/25 active:scale-[0.98] transition-all disabled:opacity-50">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span class="text-sm font-ui font-semibold text-charcoal/80">Continue with Google</span>
                </button>

                <!-- Divider -->
                <div class="relative flex items-center gap-2">
                  <div class="flex-1 h-px bg-charcoal/10" />
                  <span class="text-[11px] text-charcoal/30 font-ui uppercase tracking-wider whitespace-nowrap">or sign up with email</span>
                  <div class="flex-1 h-px bg-charcoal/10" />
                </div>

                <!-- Full Name -->
                <div>
                  <label for="signup-name" class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Full Name</label>
                  <input
                    id="signup-name"
                    ref="signupNameRef"
                    v-model="signupName"
                    type="text"
                    placeholder="Enter full name"
                    autocomplete="name"
                    class="w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none transition-all"
                    :class="signupNameError ? 'border-red-400 bg-red-50/40' : 'border-charcoal/20 focus:border-deep-plum'"
                    @keydown.enter="signupEmailRef?.focus()"
                    @input="signupNameError = ''; errorMsg = ''"
                  />
                  <p v-if="signupNameError" class="mt-1 text-xs text-red-500 font-ui">{{ signupNameError }}</p>
                </div>

                <!-- Email -->
                <div>
                  <label for="signup-email" class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Email</label>
                  <div class="relative">
                    <input
                      id="signup-email"
                      ref="signupEmailRef"
                      v-model="signupEmail"
                      type="email"
                      placeholder="Enter email address"
                      autocomplete="email"
                      class="w-full px-4 py-3 border rounded-xl text-sm font-ui focus:outline-none transition-all"
                      :class="signupEmailError ? 'border-red-400 bg-red-50/40' : (signupEmail && isValidEmail(signupEmail)) ? 'border-green-400' : 'border-charcoal/20 focus:border-deep-plum'"
                      @keydown.enter="signupPasswordRef?.focus()"
                      @blur="validateSignupEmail"
                      @input="signupEmailError = ''; errorMsg = ''"
                    />
                    <!-- green check when email is valid -->
                    <svg v-if="signupEmail && isValidEmail(signupEmail) && !signupEmailError" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p v-if="signupEmailError" class="mt-1 text-xs text-red-500 font-ui flex items-center gap-1">
                    <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                    {{ signupEmailError }}
                  </p>
                </div>

                <!-- Password + strength indicator -->
                <div>
                  <label for="signup-password" class="block text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5 font-ui">Password</label>
                  <div class="relative">
                    <input
                      id="signup-password"
                      ref="signupPasswordRef"
                      v-model="signupPassword"
                      :type="showSignupPassword ? 'text' : 'password'"
                      placeholder="Min. 6 characters"
                      autocomplete="new-password"
                      class="w-full px-4 py-3 pr-11 border rounded-xl text-sm font-ui focus:outline-none transition-all"
                      :class="signupPasswordError ? 'border-red-400 bg-red-50/40' : 'border-charcoal/20 focus:border-deep-plum'"
                      @keydown.enter="handleSignup"
                      @input="signupPasswordError = ''; errorMsg = ''"
                    />
                    <button
                      type="button"
                      @click="showSignupPassword = !showSignupPassword"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/35 hover:text-charcoal/70 transition-colors"
                      :aria-label="showSignupPassword ? 'Hide password' : 'Show password'"
                    >
                      <svg v-if="showSignupPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </div>
                  <!-- Password strength bar -->
                  <div v-if="signupPassword" class="mt-2 space-y-1">
                    <div class="flex gap-1">
                      <div v-for="n in 4" :key="n" class="h-1 flex-1 rounded-full transition-all duration-300"
                        :class="n <= passwordStrengthScore ? passwordStrengthBarColor : 'bg-charcoal/10'"
                      />
                    </div>

                  </div>
                  <p v-if="signupPasswordError" class="mt-1 text-xs text-red-500 font-ui">{{ signupPasswordError }}</p>
                </div>

                <!-- Server error -->
                <p v-if="errorMsg" class="text-red-600 text-xs font-ui bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 flex items-start gap-2">
                  <svg class="w-3.5 h-3.5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                  <span>{{ errorMsg }} <button v-if="errorMsg.includes('already exists')" @click="switchTab('login')" class="underline font-semibold">Sign in instead</button></span>
                </p>

                <!-- Create Account button -->
                <button
                  id="btn-create-account"
                  @click="handleSignup"
                  :disabled="loading"
                  class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#473021] active:scale-[0.98] disabled:opacity-50 transition-all flex justify-center items-center gap-2 shadow-sm"
                >
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {{ loading ? 'Sending code…' : 'Create Account' }}
                </button>

                <!-- Cross-link to login -->
                <p class="text-center text-xs text-charcoal/40 font-ui">
                  Already have an account?
                  <button @click="switchTab('login')" class="text-deep-plum font-semibold hover:underline ml-1 transition-colors">Sign in</button>
                </p>
              </div>

              <!-- ────────────────────────────────────────────────────────
                   SIGNUP: Step 2 — OTP verification (6 boxes)
              ──────────────────────────────────────────────────────────── -->
              <div v-if="activeTab === 'signup' && signupStep === 'otp'" class="space-y-5">
                <!-- Email envelope icon -->
                <div class="text-center">
                  <div class="w-16 h-16 bg-deep-plum/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg class="w-8 h-8 text-deep-plum" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <button
                    @click="signupStep = 'form'; resetSignupOtpBoxes(); errorMsg = ''"
                    class="text-xs text-charcoal/40 hover:text-deep-plum flex items-center gap-1 mx-auto font-ui transition-colors"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    Back to details
                  </button>
                </div>

                <!-- 6-box OTP -->
                <div>
                  <p class="text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-3 font-ui text-center">Enter verification code</p>
                  <div class="flex gap-2 justify-center">
                    <input
                      v-for="(_, i) in 6"
                      :key="'sotp-' + i"
                      :ref="(el) => { signupOtpRefs[i] = el as HTMLInputElement }"
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      class="w-11 h-12 text-center text-lg font-bold border-2 rounded-xl font-ui focus:outline-none transition-all select-none"
                      :class="signupOtpBoxes[i] ? 'border-deep-plum bg-deep-plum/5 text-deep-plum' : 'border-charcoal/20 focus:border-deep-plum focus:bg-warm-ivory/50'"
                      :value="signupOtpBoxes[i]"
                      @input="handleSignupOtpInput(i, $event)"
                      @keydown="handleSignupOtpKeydown(i, $event)"
                      @paste.prevent="handleSignupOtpPaste($event)"
                    />
                  </div>
                </div>

                <p v-if="errorMsg" class="text-red-600 text-xs font-ui bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 text-center">{{ errorMsg }}</p>

                <button
                  id="btn-verify-signup-otp"
                  @click="verifySignupOtp"
                  :disabled="loading || signupOtp.length < 6"
                  class="w-full py-3 bg-deep-plum text-white rounded-xl font-ui font-semibold text-sm hover:bg-[#473021] active:scale-[0.98] disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                >
                  <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {{ loading ? 'Verifying…' : 'Verify & Complete' }}
                </button>

                <div class="text-center">
                  <button
                    @click="resendSignupOtp"
                    :disabled="resendCooldown > 0 || loading"
                    class="text-xs text-charcoal/40 hover:text-deep-plum font-ui disabled:cursor-not-allowed transition-colors"
                  >
                    {{ resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code' }}
                  </button>
                </div>
              </div>

              <!-- ── Terms ───────────────────────────────────────────────── -->
              <p class="text-center text-[11px] text-charcoal/35 font-ui mt-5 leading-relaxed">
                By continuing, you agree to Van Elvina's
                <NuxtLink to="/terms" class="underline hover:text-deep-plum transition-colors" @click="ui.closeAuthModal">Terms</NuxtLink>
                &amp;
                <NuxtLink to="/privacy-policy" class="underline hover:text-deep-plum transition-colors" @click="ui.closeAuthModal">Privacy Policy</NuxtLink>
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
import { useUIStore } from '~/stores/ui'
import { useAuthStore } from '~/stores/auth'

const ui = useUIStore()
const auth = useAuthStore()
const wishlist = useWishlistStore()
const cart = useCartStore()

// ── Tab ──────────────────────────────────────────────────────────────────
const activeTab = ref<'login' | 'signup'>('login')

// ── Login state ──────────────────────────────────────────────────────────
// loginStep:
//   'credentials' → email + password form (default)
//   'otp-email'   → email input for OTP-based login (forgot password / alternative)
//   'otp-verify'  → 6-box OTP verification
const loginStep = ref<'credentials' | 'otp-email' | 'otp-verify'>('credentials')
const loginEmail = ref('')
const loginPassword = ref('')
const loginEmailError = ref('')
const loginPasswordError = ref('')
const showLoginPassword = ref(false)

// Login OTP boxes
const loginOtpBoxes = ref<string[]>(Array(6).fill(''))
const loginOtpRefs: (HTMLInputElement | null)[] = Array(6).fill(null)
const loginOtp = computed(() => loginOtpBoxes.value.join(''))

// ── Signup state ─────────────────────────────────────────────────────────
const signupStep = ref<'form' | 'otp'>('form')
const signupName = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const showSignupPassword = ref(false)
const signupNameError = ref('')
const signupEmailError = ref('')
const signupPasswordError = ref('')

// Signup OTP boxes
const signupOtpBoxes = ref<string[]>(Array(6).fill(''))
const signupOtpRefs: (HTMLInputElement | null)[] = Array(6).fill(null)
const signupOtp = computed(() => signupOtpBoxes.value.join(''))

// ── Template refs for auto-focus ─────────────────────────────────────────
const loginEmailRef = ref<HTMLInputElement | null>(null)
const loginPasswordRef = ref<HTMLInputElement | null>(null)
const signupNameRef = ref<HTMLInputElement | null>(null)
const signupEmailRef = ref<HTMLInputElement | null>(null)
const signupPasswordRef = ref<HTMLInputElement | null>(null)

// ── Shared ───────────────────────────────────────────────────────────────
const loading = ref(false)
const errorMsg = ref('')
const resendCooldown = ref(0)
let cooldownTimer: ReturnType<typeof setInterval> | null = null

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

// ── Password strength ─────────────────────────────────────────────────────
const passwordStrengthScore = computed(() => {
  const p = signupPassword.value
  if (!p || p.length < 6) return Math.min(p.length > 0 ? 1 : 0, 1)
  let score = 1
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++
  if (/[0-9]/.test(p) || /[^A-Za-z0-9]/.test(p)) score++
  return score
})

const passwordStrengthLabel = computed(() => {
  if (!signupPassword.value) return ''
  const s = passwordStrengthScore.value
  if (s <= 1) return 'Weak — add more characters'
  if (s === 2) return 'Fair — try mixing numbers & letters'
  if (s === 3) return 'Good password'
  return 'Strong password ✓'
})

const passwordStrengthBarColor = computed(() => {
  const s = passwordStrengthScore.value
  if (s <= 1) return 'bg-red-400'
  if (s === 2) return 'bg-amber-400'
  if (s === 3) return 'bg-blue-400'
  return 'bg-green-500'
})

const passwordStrengthTextColor = computed(() => {
  const s = passwordStrengthScore.value
  if (s <= 1) return 'text-red-500'
  if (s === 2) return 'text-amber-600'
  if (s === 3) return 'text-blue-600'
  return 'text-green-600'
})

// ── Validation ────────────────────────────────────────────────────────────
const validateLoginEmail = () => {
  const v = loginEmail.value.trim()
  if (!v) loginEmailError.value = 'Email is required'
  else if (!isValidEmail(v)) loginEmailError.value = 'Enter a valid email address'
  else loginEmailError.value = ''
}

const validateSignupEmail = () => {
  const v = signupEmail.value.trim()
  if (!v) signupEmailError.value = 'Email is required'
  else if (!isValidEmail(v)) signupEmailError.value = 'Enter a valid email address'
  else signupEmailError.value = ''
}

// ── Reset helpers ─────────────────────────────────────────────────────────
const resetLoginOtpBoxes = () => { loginOtpBoxes.value = Array(6).fill('') }
const resetSignupOtpBoxes = () => { signupOtpBoxes.value = Array(6).fill('') }

const resetAll = () => {
  loginStep.value = 'credentials'
  loginEmail.value = ''
  loginPassword.value = ''
  loginEmailError.value = ''
  loginPasswordError.value = ''
  showLoginPassword.value = false
  resetLoginOtpBoxes()
  signupStep.value = 'form'
  signupName.value = ''
  signupEmail.value = ''
  signupPassword.value = ''
  showSignupPassword.value = false
  signupNameError.value = ''
  signupEmailError.value = ''
  signupPasswordError.value = ''
  resetSignupOtpBoxes()
  errorMsg.value = ''
  resendCooldown.value = 0
  if (cooldownTimer) clearInterval(cooldownTimer)
}

// ── Tab switch ────────────────────────────────────────────────────────────
const switchTab = (tab: 'login' | 'signup') => {
  if (activeTab.value === tab) return
  activeTab.value = tab
  resetAll()
}

// ── Auto-focus management ─────────────────────────────────────────────────
watch(() => ui.authModalOpen, (open) => {
  if (open) {
    nextTick(() => loginEmailRef.value?.focus())
  } else {
    resetAll()
  }
})

watch(activeTab, (tab) => {
  nextTick(() => {
    if (tab === 'login') loginEmailRef.value?.focus()
    else signupNameRef.value?.focus()
  })
})

watch(signupStep, (step) => {
  if (step === 'otp') nextTick(() => signupOtpRefs[0]?.focus())
})

watch(loginStep, (step) => {
  if (step === 'otp-verify') nextTick(() => loginOtpRefs[0]?.focus())
  else if (step === 'credentials') nextTick(() => loginEmailRef.value?.focus())
})

// ── Resend cooldown ───────────────────────────────────────────────────────
const startResendCooldown = () => {
  resendCooldown.value = 30
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0 && cooldownTimer) clearInterval(cooldownTimer)
  }, 1000)
}

// ── OTP Box handlers — LOGIN ──────────────────────────────────────────────
const handleLoginOtpInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement
  const val = input.value.replace(/\D/g, '').slice(-1)
  const next = [...loginOtpBoxes.value]
  next[index] = val
  loginOtpBoxes.value = next
  input.value = val
  errorMsg.value = ''
  if (val && index < 5) loginOtpRefs[index + 1]?.focus()
}

const handleLoginOtpKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace') {
    const next = [...loginOtpBoxes.value]
    if (next[index]) {
      next[index] = ''
      loginOtpBoxes.value = next
    } else if (index > 0) {
      next[index - 1] = ''
      loginOtpBoxes.value = next
      loginOtpRefs[index - 1]?.focus()
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    loginOtpRefs[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < 5) {
    loginOtpRefs[index + 1]?.focus()
  }
}

const handleLoginOtpPaste = (event: ClipboardEvent) => {
  const text = event.clipboardData?.getData('text') || ''
  const digits = text.replace(/\D/g, '').slice(0, 6)
  const next = Array(6).fill('')
  digits.split('').forEach((d, i) => { next[i] = d })
  loginOtpBoxes.value = next
  const focusIdx = Math.min(digits.length, 5)
  nextTick(() => loginOtpRefs[focusIdx]?.focus())
}

// ── OTP Box handlers — SIGNUP ─────────────────────────────────────────────
const handleSignupOtpInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement
  const val = input.value.replace(/\D/g, '').slice(-1)
  const next = [...signupOtpBoxes.value]
  next[index] = val
  signupOtpBoxes.value = next
  input.value = val
  errorMsg.value = ''
  if (val && index < 5) {
    signupOtpRefs[index + 1]?.focus()
  }
  // Auto-submit when all 6 digits entered
  if (next.every(b => b !== '') && !loading.value) {
    nextTick(() => verifySignupOtp())
  }
}

const handleSignupOtpKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace') {
    const next = [...signupOtpBoxes.value]
    if (next[index]) {
      next[index] = ''
      signupOtpBoxes.value = next
    } else if (index > 0) {
      next[index - 1] = ''
      signupOtpBoxes.value = next
      signupOtpRefs[index - 1]?.focus()
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    signupOtpRefs[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < 5) {
    signupOtpRefs[index + 1]?.focus()
  }
}

const handleSignupOtpPaste = (event: ClipboardEvent) => {
  const text = event.clipboardData?.getData('text') || ''
  const digits = text.replace(/\D/g, '').slice(0, 6)
  const next = Array(6).fill('')
  digits.split('').forEach((d, i) => { next[i] = d })
  signupOtpBoxes.value = next
  const focusIdx = Math.min(digits.length, 5)
  nextTick(() => {
    signupOtpRefs[focusIdx]?.focus()
    if (digits.length === 6 && !loading.value) verifySignupOtp()
  })
}

// ── Post-auth helper ──────────────────────────────────────────────────────
const postAuthSuccess = async (welcomeMsg: string) => {
  await Promise.all([
    wishlist.syncWishlistAfterLogin(),
    cart.syncCartAfterLogin(),
  ])
  const redirectPath = ui.authRedirect
  ui.closeAuthModal()
  ui.addToast('success', welcomeMsg)
  const nuxtApp = useNuxtApp()
  if (nuxtApp.$registerPush) {
    nuxtApp.$registerPush().catch((err: any) => console.error('Push error:', err))
  }
  if (redirectPath) {
    await nextTick()
    navigateTo(redirectPath)
  }
}

// ── LOGIN: email + password ───────────────────────────────────────────────
const handleLogin = async () => {
  loginEmailError.value = ''
  loginPasswordError.value = ''
  errorMsg.value = ''
  const email = loginEmail.value.trim()
  if (!email) { loginEmailError.value = 'Email is required'; return }
  if (!isValidEmail(email)) { loginEmailError.value = 'Enter a valid email address'; return }
  if (!loginPassword.value) { loginPasswordError.value = 'Password is required'; return }
  loading.value = true
  try {
    await auth.loginWithPassword(email, loginPassword.value)
    await postAuthSuccess(`Welcome back${auth.user?.name ? `, ${auth.user.name}` : ''}! 🎉`)
  } catch (err: any) {
    const msg: string = err.message || ''
    if (msg.toLowerCase().includes('not found') || msg.toLowerCase().includes('no account')) {
      errorMsg.value = 'No account found with this email. Please sign up.'
    } else if (msg.toLowerCase().includes('password') || msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('incorrect')) {
      errorMsg.value = 'Incorrect password. Try again or use "Forgot password?"'
    } else {
      errorMsg.value = msg || 'Sign in failed. Please try again.'
    }
    loginPassword.value = ''
  } finally {
    loading.value = false
  }
}

// ── LOGIN: switch to OTP login (forgot password) ──────────────────────────
const switchToOtpLogin = () => {
  loginStep.value = 'otp-email'
  loginPassword.value = ''
  loginPasswordError.value = ''
  errorMsg.value = ''
}

// ── LOGIN: send OTP ───────────────────────────────────────────────────────
const sendLoginOtp = async () => {
  loginEmailError.value = ''
  errorMsg.value = ''
  const email = loginEmail.value.trim()
  if (!email) { loginEmailError.value = 'Email is required'; return }
  if (!isValidEmail(email)) { loginEmailError.value = 'Enter a valid email address'; return }
  loginEmail.value = email
  loading.value = true
  try {
    await auth.sendOtp(email)
    loginStep.value = 'otp-verify'
    resetLoginOtpBoxes()
    startResendCooldown()
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to send OTP. Please try again.'
  } finally {
    loading.value = false
  }
}

// ── LOGIN: verify OTP ─────────────────────────────────────────────────────
const verifyLoginOtp = async () => {
  errorMsg.value = ''
  if (loginOtp.value.length < 6) { errorMsg.value = 'Enter all 6 digits'; return }
  loading.value = true
  try {
    await auth.verifyOtp(loginEmail.value, loginOtp.value)
    await postAuthSuccess(`Welcome back${auth.user?.name ? `, ${auth.user.name}` : ''}! 🎉`)
  } catch (err: any) {
    errorMsg.value = err.message || 'Invalid OTP. Please try again.'
    resetLoginOtpBoxes()
    nextTick(() => loginOtpRefs[0]?.focus())
  } finally {
    loading.value = false
  }
}

// ── SIGNUP: validate form & send OTP ─────────────────────────────────────
const handleSignup = async () => {
  signupNameError.value = ''
  signupEmailError.value = ''
  signupPasswordError.value = ''
  errorMsg.value = ''
  const name = signupName.value.trim()
  const email = signupEmail.value.trim()
  if (!name) { signupNameError.value = 'Full name is required'; return }
  if (name.length < 2) { signupNameError.value = 'Please enter your full name'; return }
  if (!email) { signupEmailError.value = 'Email is required'; return }
  if (!isValidEmail(email)) { signupEmailError.value = 'Enter a valid email address'; return }
  if (!signupPassword.value) { signupPasswordError.value = 'Password is required'; return }
  if (signupPassword.value.length < 6) { signupPasswordError.value = 'Password must be at least 6 characters'; return }
  loading.value = true
  try {
    await auth.sendOtp(email)
    signupStep.value = 'otp'
    resetSignupOtpBoxes()
    startResendCooldown()
  } catch (err: any) {
    const msg: string = err.message || ''
    if (msg.toLowerCase().includes('exists') || msg.toLowerCase().includes('already')) {
      errorMsg.value = 'An account with this email already exists.'
    } else {
      errorMsg.value = msg || 'Failed to send verification code. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

// ── SIGNUP: resend OTP ────────────────────────────────────────────────────
const resendSignupOtp = async () => {
  errorMsg.value = ''
  loading.value = true
  try {
    await auth.sendOtp(signupEmail.value.trim())
    resetSignupOtpBoxes()
    startResendCooldown()
    nextTick(() => signupOtpRefs[0]?.focus())
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to resend code'
  } finally {
    loading.value = false
  }
}

// ── SIGNUP: verify OTP & create account ──────────────────────────────────
const verifySignupOtp = async () => {
  errorMsg.value = ''
  if (signupOtp.value.length < 6) { errorMsg.value = 'Enter all 6 digits'; return }
  if (loading.value) return
  loading.value = true
  try {
    await auth.verifyOtp(signupEmail.value.trim(), signupOtp.value, signupName.value.trim(), signupPassword.value)
    await postAuthSuccess(`Welcome to Van Elvina${auth.user?.name ? `, ${auth.user.name}` : ''}! 🎉`)
  } catch (err: any) {
    errorMsg.value = err.message || 'Verification failed. Please check the code.'
    resetSignupOtpBoxes()
    nextTick(() => signupOtpRefs[0]?.focus())
  } finally {
    loading.value = false
  }
}

// ── Google OAuth ──────────────────────────────────────────────────────────
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
