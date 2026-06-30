import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '~/stores/auth'
import { useAdminStore } from '~/stores/admin'

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore()
  const admin = useAdminStore()

  auth.init()
  admin.init()
})
