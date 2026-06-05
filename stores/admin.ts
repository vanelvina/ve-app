import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: null as string | null,
    isAuthenticated: false,
    adminUser: null as any | null,
    loading: false,
  }),

  actions: {
    init() {
      if (import.meta.client) {
        const storedToken = localStorage.getItem('ve_admin_token')
        if (storedToken) {
          this.token = storedToken
          this.isAuthenticated = true
        }
      }
    },

    async login(username: string, password: string) {
      this.loading = true
      const config = useRuntimeConfig()
      try {
        const response = await $fetch<any>(`${config.public.apiBase}/auth/login`, {
          method: 'POST',
          body: { username, password }
        })

        this.token = response.token
        this.isAuthenticated = true
        this.adminUser = response.admin

        if (import.meta.client) {
          localStorage.setItem('ve_admin_token', response.token)
        }
        return true
      } catch (error: any) {
        console.error('Login failed:', error)
        throw new Error(error.data?.message || 'Login failed')
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.isAuthenticated = false
      this.adminUser = null
      if (import.meta.client) {
        localStorage.removeItem('ve_admin_token')
      }
      navigateTo('/')
    },

    async checkAuth() {
      if (!this.token) {
        this.isAuthenticated = false
        return false
      }

      const config = useRuntimeConfig()
      try {
        const response = await $fetch<any>(`${config.public.apiBase}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.isAuthenticated = true
        this.adminUser = response.admin
        return true
      } catch (error) {
        console.error('Session verification failed:', error)
        this.logout()
        return false
      }
    },

    getHeaders() {
      return {
        Authorization: `Bearer ${this.token}`
      }
    },

    // CRUD Banners
    async createBanner(bannerData: any) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/banners`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: bannerData
      })
    },
    async updateBanner(id: string, bannerData: any) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/banners/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: bannerData
      })
    },
    async deleteBanner(id: string) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/banners/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      })
    },

    // CRUD Categories
    async createCategory(catData: any) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/categories`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: catData
      })
    },
    async updateCategory(id: string, catData: any) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/categories/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: catData
      })
    },
    async deleteCategory(id: string) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/categories/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      })
    },

    // CRUD Products
    async createProduct(productData: any) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/products`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: productData
      })
    },
    async updateProduct(id: string, productData: any) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/products/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: productData
      })
    },
    async deleteProduct(id: string) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/products/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      })
    },

    // CRUD Widgets
    async createWidget(widgetData: any) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/widgets`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: widgetData
      })
    },
    async updateWidget(id: string, widgetData: any) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/widgets/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: widgetData
      })
    },
    async deleteWidget(id: string) {
      const config = useRuntimeConfig()
      return $fetch(`${config.public.apiBase}/widgets/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      })
    },

    // File Upload
    async uploadImage(file: File) {
      const config = useRuntimeConfig()
      const formData = new FormData()
      formData.append('image', file)

      return $fetch<any>(`${config.public.apiBase}/upload`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: formData
      })
    }
  }
})
