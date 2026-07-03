declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaMeasurementId

  if (!gaId) {
    console.log('Google Analytics is disabled (no NUXT_PUBLIC_GA_MEASUREMENT_ID provided).')
  }

  // Inject Google Tag Manager script first (if GA is configured)
  if (gaId) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }

    window.gtag('js', new Date())
    // Track the initial page load (first paint) explicitly
    window.gtag('config', gaId, {
      page_path: window.location.pathname + window.location.search,
      page_title: document.title
    })
  }

  // Track page views dynamically on SPA route changes AFTER GA is initialized
  const router = useRouter()
  router.afterEach((to) => {
    // 1. Custom internal analytics DB logging (always run, regardless of GA)
    trackVisit(to.fullPath, (to.meta.title as string) || document.title)

    // 2. Google Analytics — guard to ensure gtag is initialized before calling
    if (gaId && typeof window.gtag === 'function') {
      window.gtag('config', gaId, {
        page_path: to.fullPath,
        page_title: (to.meta.title as string) || document.title
      })
    }
  })
})
