import { defineStore } from 'pinia'

interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string
  authMethod: 'email' | 'google'
  phone?: string
  addresses?: any[]
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
        await this.fetchProfile()
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
        await this.fetchProfile()
        if (data.user) {
          trackLogin(data.user.email, data.user.name)
        }
        return data
      } catch (err: any) {
        throw new Error(err.data?.message || 'Google login failed')
      } finally {
        this.loading = false
      }
    },

    // ── Password Auth ──────────────────────────────────────────────
    async loginWithPassword(email: string, password: string) {
      this.loading = true
      const config = useRuntimeConfig()
      try {
        const data = await $fetch<any>(`${config.public.apiBase}/user-auth/login`, {
          method: 'POST',
          body: { email, password },
        })
        this.setAuth(data.token, data.user)
        await this.fetchProfile()
        if (data.user) {
          trackLogin(data.user.email, data.user.name)
        }
        return data
      } catch (err: any) {
        throw new Error(err.data?.message || 'Login failed')
      } finally {
        this.loading = false
      }
    },

    async signupWithPassword(name: string, email: string, password: string) {
      this.loading = true
      const config = useRuntimeConfig()
      try {
        const data = await $fetch<any>(`${config.public.apiBase}/user-auth/signup`, {
          method: 'POST',
          body: { name, email, password },
        })
        this.setAuth(data.token, data.user)
        await this.fetchProfile()
        if (data.user) {
          trackLogin(data.user.email, data.user.name)
        }
        return data
      } catch (err: any) {
        throw new Error(err.data?.message || 'Signup failed')
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

    // ── Profile Updates ──────────────────────────────────────────────
    async updateProfile(payload: { name?: string; phone?: string }) {
      const config = useRuntimeConfig()
      const data = await $fetch<any>(`${config.public.apiBase}/user-auth/me`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: payload,
      })
      await this.fetchProfile()
      return data
    },

    // ── Addresses ───────────────────────────────────────────────────
    async addAddress(address: any) {
      const config = useRuntimeConfig()
      const data = await $fetch<any>(`${config.public.apiBase}/user-auth/addresses`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: address,
      })
      await this.fetchProfile()
      return data
    },

    async removeAddress(addressId: string) {
      const config = useRuntimeConfig()
      const data = await $fetch<any>(`${config.public.apiBase}/user-auth/addresses/${addressId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      })
      await this.fetchProfile()
      return data
    },

    async updateAddress(addressId: string, address: any) {
      const config = useRuntimeConfig()
      const data = await $fetch<any>(`${config.public.apiBase}/user-auth/addresses/${addressId}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: address,
      })
      await this.fetchProfile()
      return data
    },

    // ── Place an order ─────────────────────────────────────────────
    async placeOrder(orderPayload: any) {
      const config = useRuntimeConfig()
      const body = { ...orderPayload }

      return $fetch<any>(`${config.public.apiBase}/orders`, {
        method: 'POST',
        headers: this.getHeaders(),
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
        headers: this.getHeaders(),
        body: { amount },
      })
    },

    async verifyPayment(payload: any) {
      const config = useRuntimeConfig()
      const body = { ...payload }

      return $fetch<any>(`${config.public.apiBase}/orders/verify-payment`, {
        method: 'POST',
        headers: this.getHeaders(),
        body,
      })
    },
  },
})
