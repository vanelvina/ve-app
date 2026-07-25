// Helper to resolve the correct API base URL
const getApiBase = () => {
  const envBase = process.env.NUXT_PUBLIC_API_BASE;

  // If the env variable points to the old Render backend, ignore it and use Supabase
  if (envBase && envBase.includes('onrender.com')) {
    return 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api';
  }

  // In production, relative '/api' calls won't work without a server proxy, so force Supabase URL
  if (process.env.NODE_ENV === 'production') {
    if (!envBase || envBase === '/api') {
      return 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api';
    }
  }

  return envBase || '/api';
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // Vite dev configuration
  vite: {
    server: {
      hmr: {
        overlay: false
      }
    }
  },

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
    '@vercel/analytics',
    '@nuxtjs/sitemap',
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  // Sitemap Configuration
  // Auto-generates /sitemap.xml with all static pages + dynamic product & blog URLs
  sitemap: {
    sitemapName: 'sitemap.xml',
    // Fetch dynamic URLs from the Supabase API at build/request time
    sources: [
      '/api/__sitemap__/urls',
    ],
    // Exclude private/user-facing routes from Google indexing
    exclude: [
      '/admin/**',
      '/account/**',
      '/auth/**',
      '/bag',
      '/checkout',
      '/thank-you',
      '/myaccount',
      '/myorders',
      '/track-order',
    ],
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // App config
  app: {
    // Custom scroll behavior: restore position for back/forward, scroll to top for new navigations
    router: {
      scrollBehaviorType: 'smooth',
    },
    head: {
      title: 'Van Elvina – Women Comfort First',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'Shop premium women\'s innerwear at Van Elvina. Discover unmatched comfort, elegant designs, and everyday essentials for the modern woman.' },
        { name: 'theme-color', content: '#2A1B18' },
        { property: 'og:site_name', content: 'Van Elvina' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://vanelvina.com/icons/icon-512x512.png' },
        { property: 'og:image:width', content: '512' },
        { property: 'og:image:height', content: '512' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://vanelvina.com/icons/icon-512x512.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon2.png?v=3' },
        { rel: 'shortcut icon', href: '/favicon2.png?v=3' },
        { rel: 'apple-touch-icon', href: '/favicon2.png?v=3' },
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
    pageTransition: { name: 'page' },
  },

  // Route Cache Control Rules (Bypass CDNs and browser cache for SW)
  routeRules: {
    '/sw.js': { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' } },
    '/_payload.json': { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' } },
    '/manifest.webmanifest': { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' } },
    '/admin/**': { ssr: false },
    // Ensure static assets have long-term caching (safe as they have hashes in filenames)
    '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    // Avoid caching page HTML files so updates are immediately visible
    '/**': { headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache', 'Expires': '0' } },
  },

  // Runtime config
  runtimeConfig: {
    // Private — server-side only (never exposed to browser)
    shiprocketEmail: process.env.SHIPROCKET_EMAIL || '',
    shiprocketPassword: process.env.SHIPROCKET_PASSWORD || '',
    public: {
      appName: 'Van Elvina',
      appUrl: 'https://vanelvina.com',
      apiBase: getApiBase(),
      vapidPublicKey: process.env.NUXT_PUBLIC_VAPID_PUBLIC_KEY || '',
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
        // Transparent icon — used for browser tab, bookmarks, general display
        { src: '/favicon2.png', sizes: '500x500', type: 'image/png', purpose: 'any' },
        { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        // Maskable icons with solid brand background — required for Android home screen / PWA install prompt
        // (transparent icons fill with black otherwise)
        { src: '/icons/icon-192x192-maskable.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
        { src: '/icons/icon-512x512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
      categories: ['shopping', 'lifestyle'],
    },
    workbox: {
      navigateFallback: null,
      globPatterns: ['**/*.{js,css,png,svg,ico,woff2}'],
      importScripts: ['/sw-push.js'],
      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,
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
      // Proxy all Supabase backend routes to the edge function
      // Exclude /api/shiprocket — that's a local Nuxt server route (credentials must stay server-side)
      '/api/user-auth': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/products': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/categories': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/orders': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/cart': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/wishlist': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/banners': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/blogs': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/reviews': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/about': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/inquiries': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/upload': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/widgets': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      '/api/auth': { target: 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api', changeOrigin: true },
      // NOTE: /api/shiprocket and /api/__sitemap__ are intentionally NOT proxied — handled locally by Nitro
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
