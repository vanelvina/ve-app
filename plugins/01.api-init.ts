// plugins/01.api-init.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const currentApiBase = config.public.apiBase
  
  // Intercept and correct the API URL if it's set to the old Render backend or relative in production
  if (
    !currentApiBase ||
    currentApiBase === '/api' ||
    (typeof currentApiBase === 'string' && currentApiBase.includes('onrender.com'))
  ) {
    config.public.apiBase = 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api'
    console.log(`[API Init] API base URL adjusted at runtime: ${config.public.apiBase}`)
  }
})
