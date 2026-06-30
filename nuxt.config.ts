// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // Component Auto-imports Configuration (Nested Flat Names)
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // App config
  app: {
    head: {
      title: 'Van Elvina – Women Comfort First',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'Shop premium women\'s innerwear at Van Elvina. Discover unmatched comfort, elegant designs, and everyday essentials for the modern woman.' },
        { name: 'theme-color', content: '#2A1B18' },
        { property: 'og:site_name', content: 'Van Elvina' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap',
        },
        // Preload main woff2 font file for instant text rendering and improved CLS
        {
          rel: 'preload',
          href: 'https://db.onlinewebfonts.com/t/2da648610423269fab0d0cceaada478b.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ],
      script: [
        { src: 'https://accounts.google.com/gsi/client', async: true, defer: true },
        { src: 'https://checkout.razorpay.com/v1/checkout.js' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // Route Cache Control Rules (Bypass CDNs and browser cache for SW)
  routeRules: {
    '/sw.js': { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' } },
    '/_payload.json': { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' } },
    '/manifest.webmanifest': { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' } },
  },

  // Runtime config
  runtimeConfig: {
    public: {
      appName: 'Van Elvina',
      appUrl: 'https://vanelvina.com',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || (process.env.NODE_ENV === 'development' ? '/api' : 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api'),
      googleClientId: '1095271875819-6sh520q88vas8u7g3n4ukrh0o2aihgib.apps.googleusercontent.com',
      razorpayKeyId: process.env.NUXT_PUBLIC_RAZORPAY_KEY_ID || 'TEST_KEY_ID',
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID || '',
    },
  },

  // PWA Configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Van Elvina – Women Comfort First',
      short_name: 'Van Elvina',
      description: 'Premium women\'s innerwear brand. Comfort, elegance, and style.',
      theme_color: '#2A1B18',
      background_color: '#FDF8F5',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      icons: [
        { src: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
        { src: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
        { src: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
        { src: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
        { src: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
        { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
      categories: ['shopping', 'lifestyle'],
    },
    workbox: {
      navigateFallback: null,
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
      importScripts: ['/sw-push.js'],
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'unsplash-images-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        // Cache Supabase API layout endpoints using StaleWhileRevalidate
        {
          urlPattern: /^https:\/\/klixyrdhwlloswsspmqk\.supabase\.co\/functions\/v1\/api\/(widgets|banners|categories|products|blogs|reviews|about).*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'supabase-api-cache',
            expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 }, // 1 day
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: false,
      type: 'module',
    },
  },

  // Nitro
  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: ['/'],
    },
    devProxy: {
      '/api': {
        target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api',
        changeOrigin: true,
      }
    }
  },

  // Vite Build & Rollup chunk optimizations
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/swiper')) {
              return 'swiper-vendor'
            }
            if (id.includes('node_modules/pinia') || id.includes('node_modules/@pinia')) {
              return 'pinia-vendor'
            }
          }
        }
      }
    }
  },

  // TypeScript
  typescript: {
    strict: true,
    shim: false,
  },
})
