import { defineStore } from 'pinia';
import { n as navigateTo, b as useRuntimeConfig } from './server.mjs';

const useAdminStore = defineStore("admin", {
  state: () => ({
    token: null,
    isAuthenticated: false,
    adminUser: null,
    loading: false
  }),
  actions: {
    init() {
    },
    async login(username, password) {
      var _a;
      this.loading = true;
      const config = useRuntimeConfig();
      try {
        const response = await $fetch(`${config.public.apiBase}/auth/login`, {
          method: "POST",
          body: { username, password }
        });
        this.token = response.token;
        this.isAuthenticated = true;
        this.adminUser = response.admin;
        if (false) ;
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        throw new Error(((_a = error.data) == null ? void 0 : _a.message) || "Login failed");
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      this.adminUser = null;
      navigateTo("/");
    },
    async checkAuth() {
      if (!this.token) {
        this.isAuthenticated = false;
        return false;
      }
      const config = useRuntimeConfig();
      try {
        const response = await $fetch(`${config.public.apiBase}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        this.isAuthenticated = true;
        this.adminUser = response.admin;
        return true;
      } catch (error) {
        console.error("Session verification failed:", error);
        this.logout();
        return false;
      }
    },
    getHeaders() {
      return {
        Authorization: `Bearer ${this.token}`
      };
    },
    // CRUD Banners
    async createBanner(bannerData) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/banners`, {
        method: "POST",
        headers: this.getHeaders(),
        body: bannerData
      });
    },
    async updateBanner(id, bannerData) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/banners/${id}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: bannerData
      });
    },
    async deleteBanner(id) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/banners/${id}`, {
        method: "DELETE",
        headers: this.getHeaders()
      });
    },
    // CRUD Categories
    async createCategory(catData) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/categories`, {
        method: "POST",
        headers: this.getHeaders(),
        body: catData
      });
    },
    async updateCategory(id, catData) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/categories/${id}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: catData
      });
    },
    async deleteCategory(id) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/categories/${id}`, {
        method: "DELETE",
        headers: this.getHeaders()
      });
    },
    // CRUD Products
    async createProduct(productData) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/products`, {
        method: "POST",
        headers: this.getHeaders(),
        body: productData
      });
    },
    async updateProduct(id, productData) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/products/${id}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: productData
      });
    },
    async deleteProduct(id) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/products/${id}`, {
        method: "DELETE",
        headers: this.getHeaders()
      });
    },
    // CRUD Widgets
    async createWidget(widgetData) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/widgets`, {
        method: "POST",
        headers: this.getHeaders(),
        body: widgetData
      });
    },
    async updateWidget(id, widgetData) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/widgets/${id}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: widgetData
      });
    },
    async deleteWidget(id) {
      const config = useRuntimeConfig();
      return $fetch(`${config.public.apiBase}/widgets/${id}`, {
        method: "DELETE",
        headers: this.getHeaders()
      });
    },
    // File Upload
    async uploadImage(file) {
      const config = useRuntimeConfig();
      const formData = new FormData();
      formData.append("image", file);
      return $fetch(`${config.public.apiBase}/upload`, {
        method: "POST",
        headers: this.getHeaders(),
        body: formData
      });
    }
  }
});

export { useAdminStore as u };
//# sourceMappingURL=admin-Cv882IlH.mjs.map
