declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaMeasurementId

  // Track page views dynamically on single-page app route changes
  const router = useRouter()
  router.afterEach((to) => {
    // 1. Custom Executive Analytics DB logging (Always run)
    trackVisit(to.fullPath, (to.meta.title as string) || document.title)

    // 2. Google Analytics (If configured)
    if (gaId && window.gtag) {
      window.gtag('config', gaId, {
        page_path: to.fullPath,
        page_title: to.meta.title || document.title
      })
    }
  })

  if (!gaId) {
    console.log('Google Analytics is disabled (no NUXT_PUBLIC_GA_MEASUREMENT_ID provided).')
    return
  }

  // Inject Google Tag Manager script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: any[]) {
    window.dataLayer.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', gaId)

})

