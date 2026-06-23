import { defineStore } from 'pinia'

interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string
  authMethod: 'email' | 'google'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUser | null,
    token: null as string | null,
    isLoggedIn: false,
    loading: false,
  }),

  actions: {
    init() {
      if (import.meta.client) {
        const storedToken = localStorage.getItem('ve_user_token')
        const storedUser = localStorage.getItem('ve_user')
        if (storedToken && storedUser) {
          try {
            this.token = storedToken
            this.user = JSON.parse(storedUser)
            this.isLoggedIn = true
          } catch {
            this.clearAuth()
          }
        }
      }
    },

    setAuth(token: string, user: AuthUser) {
      this.token = token
      this.user = user
      this.isLoggedIn = true
      if (import.meta.client) {
        localStorage.setItem('ve_user_token', token)
        localStorage.setItem('ve_user', JSON.stringify(user))
      }
    },

    clearAuth() {
      this.token = null
      this.user = null
      this.isLoggedIn = false
      if (import.meta.client) {
        localStorage.removeItem('ve_user_token')
        localStorage.removeItem('ve_user')
      }
    },

    logout() {
      this.clearAuth()
    },

    // ── Send OTP to email ──────────────────────────────────────────
    async sendOtp(email: string) {
      this.loading = true
      const config = useRuntimeConfig()
      try {
        const data = await $fetch<any>(`${config.public.apiBase}/user-auth/send-otp`, {
          method: 'POST',
          body: { identifier: email, type: 'email' },
        })
        return data
      } catch (err: any) {
        throw new Error(err.data?.message || 'Failed to send verification code')
      } finally {
        this.loading = false
      }
    },

    // ── Verify OTP ─────────────────────────────────────────────────
    async verifyOtp(email: string, otp: string, name?: string) {
      this.loading = true
      const config = useRuntimeConfig()
      try {
        const data = await $fetch<any>(`${config.public.apiBase}/user-auth/verify-otp`, {
          method: 'POST',
          body: { identifier: email, otp, name },
        })
        this.setAuth(data.token, data.user)
        return data
      } catch (err: any) {
        throw new Error(err.data?.message || 'Invalid verification code')
      } finally {
        this.loading = false
      }
    },

    // ── Google OAuth ───────────────────────────────────────────────
    async loginWithGoogle(idToken: string) {
      this.loading = true
      const config = useRuntimeConfig()
      try {
        const data = await $fetch<any>(`${config.public.apiBase}/user-auth/google`, {
          method: 'POST',
          body: { idToken },
        })
        this.setAuth(data.token, data.user)
        return data
      } catch (err: any) {
        throw new Error(err.data?.message || 'Google login failed')
      } finally {
        this.loading = false
      }
    },

    // ── Fetch fresh profile ────────────────────────────────────────
    async fetchProfile() {
      if (!this.token) return
      const config = useRuntimeConfig()
      try {
        const data = await $fetch<any>(`${config.public.apiBase}/user-auth/me`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = data
        if (import.meta.client) {
          localStorage.setItem('ve_user', JSON.stringify(data))
        }
      } catch {
        this.clearAuth()
      }
    },

    getHeaders() {
      return this.token ? { Authorization: `Bearer ${this.token}` } : {}
    },

    // ── Place an order ─────────────────────────────────────────────
    async placeOrder(orderPayload: any) {
      const config = useRuntimeConfig()
      const body = { ...orderPayload }
      if (this.isLoggedIn && this.user) {
        body.userId = this.user.id
        body.isGuest = false
      } else {
        body.isGuest = true
        body.guestInfo = {
          name: orderPayload.shippingAddress?.name || '',
          email: orderPayload.shippingAddress?.email || '',
          phone: orderPayload.shippingAddress?.phone || '',
        }
      }

      return $fetch<any>(`${config.public.apiBase}/orders`, {
        method: 'POST',
        body,
      })
    },

    // ── Fetch my orders ────────────────────────────────────────────
    async fetchMyOrders() {
      const config = useRuntimeConfig()
      return $fetch<any>(`${config.public.apiBase}/orders/my`, {
        headers: this.getHeaders(),
      })
    },
    // ── Razorpay Integration ───────────────────────────────────────
    async createRazorpayOrder(amount: number) {
      const config = useRuntimeConfig()
      return $fetch<any>(`${config.public.apiBase}/orders/create-razorpay-order`, {
        method: 'POST',
        body: { amount },
      })
    },

    async verifyPayment(payload: any) {
      const config = useRuntimeConfig()
      
      const body = { ...payload }
      if (this.isLoggedIn && this.user) {
        body.userId = this.user.id
        body.isGuest = false
      } else {
        body.isGuest = true
        body.guestInfo = {
          name: payload.shippingAddress?.name || '',
          email: payload.shippingAddress?.email || '',
          phone: payload.shippingAddress?.phone || '',
        }
      }

      return $fetch<any>(`${config.public.apiBase}/orders/verify-payment`, {
        method: 'POST',
        body,
      })
    },
  },
})
