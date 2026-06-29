<template>
  <footer class="bg-[#f5f5f5] text-charcoal border-t border-[#e8e8e8]" role="contentinfo">

    <!-- ── Desktop-only brand + columns grid ── -->
    <div class="hidden md:block page-container py-12">
      <div class="grid grid-cols-5 gap-8 mb-10">
        <!-- Brand column -->
        <div class="col-span-1 flex flex-col items-start gap-4">
          <img src="/logo.png" alt="Van Elvina Logo" class="h-9 w-auto object-contain" />
          <p class="text-xs text-gray-500 leading-relaxed font-ui">
            Buy Bras, Panties, Lingerie, Swimwear, Sportswear &amp; Apparel from Van Elvina - The Online Lingerie &amp; Fashion Destination in India. You'll love our beautifully crafted bras, panties, lingerie &amp; accessories. Use our bra size calculator to get your best fit.
          </p>
        </div>

        <!-- Top Categories -->
        <div>
          <h4 class="font-ui font-bold text-black text-xs uppercase tracking-wider mb-4">Top Categories</h4>
          <ul class="space-y-2">
            <li v-for="link in categoriesLinks" :key="link.label">
              <NuxtLink :to="link.href" class="text-xs text-gray-600 hover:text-deep-plum font-ui transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Help & Support -->
        <div>
          <h4 class="font-ui font-bold text-black text-xs uppercase tracking-wider mb-4">Help &amp; Support</h4>
          <ul class="space-y-2">
            <li v-for="link in helpLinks" :key="link.label">
              <NuxtLink :to="link.href" class="text-xs text-gray-600 hover:text-deep-plum font-ui transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Discover Van Elvina -->
        <div>
          <h4 class="font-ui font-bold text-black text-xs uppercase tracking-wider mb-4">Discover Van Elvina</h4>
          <ul class="space-y-2">
            <li v-for="link in discoverLinks" :key="link.label">
              <NuxtLink :to="link.href" class="text-xs text-gray-600 hover:text-deep-plum font-ui transition-colors">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Get in Touch -->
        <div class="flex flex-col gap-3">
          <h4 class="font-ui font-bold text-black text-xs uppercase tracking-wider mb-1">Get in Touch</h4>
          <div class="space-y-2 text-xs text-gray-600 font-ui leading-relaxed">
            <p><span class="font-semibold text-black">Address:</span> 1/1, Motiwala Complex, Nirala Bazar. Aurangabad. 431001 Maharashtra.</p>
            <p><span class="font-semibold text-black">Phone:</span> +91 87885 66695 | +91 95791 82097</p>
            <p><span class="font-semibold text-black">Email:</span> <a href="mailto:support@vanelvina.com" class="hover:text-deep-plum transition-colors">support@vanelvina.com</a></p>
          </div>
          <div class="flex flex-wrap items-center gap-2 mt-2">
            <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer"
               class="w-7 h-7 rounded-full border border-gray-400 hover:border-deep-plum text-gray-600 hover:text-white hover:bg-deep-plum flex items-center justify-center transition-all animate-fade-in"
               :aria-label="`Follow Van Elvina on ${social.name}`">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path :d="social.path" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-300/60 my-6"></div>

      <!-- Payment & Security & Availability -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <!-- Pay Using -->
        <div class="flex flex-col items-center md:items-start gap-2">
          <span class="text-[10px] font-bold text-black uppercase tracking-wider font-ui">Pay Securely Using</span>
          <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm w-fit">
            <svg class="w-6 h-6 text-[#002C8F] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z"/></svg>
            <div class="flex flex-col leading-none">
              <span class="font-sans font-extrabold text-sm text-[#002C8F] tracking-tight">Razorpay</span>
              <span class="text-[9px] text-gray-400 font-ui font-semibold uppercase tracking-wider">Secure Payment</span>
            </div>
            <span class="text-gray-300 text-sm mx-1">|</span>
            <span class="text-[10px] text-gray-500 font-ui">Cards, UPI, Netbanking, Wallets</span>
          </div>
        </div>

        <!-- Available On -->
        <div class="flex flex-col items-center md:items-center gap-2">
          <span class="text-[10px] font-bold text-black uppercase tracking-wider font-ui">Also Available On</span>
          <div class="flex items-center gap-5 justify-center mt-1">
            <a v-for="store in marketplaces" :key="store.name" :href="store.url" target="_blank" rel="noopener noreferrer"
               class="hover:scale-110 transition-transform duration-200 block">
              <img :src="store.image" :alt="store.name" :class="[store.class || '', 'h-10 w-auto object-contain']" />
            </a>
          </div>
        </div>

        <!-- Security -->
        <div class="flex flex-col items-center md:items-end gap-2">
          <span class="text-[10px] font-bold text-black uppercase tracking-wider font-ui">100% Secured Payment</span>
          <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm w-fit">
            <svg class="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24"><path d="M12 2L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-3z" fill="#0083C8"/><path d="M12 3.5v17c4.3-1.1 7.5-5.3 7.5-10V6.1L12 3.5z" fill="#00A2E8"/><path d="M10 14.5l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4L10 14.5z" fill="#FFFFFF"/></svg>
            <div class="flex flex-col leading-none">
              <span class="font-sans font-extrabold text-sm text-gray-800 tracking-tight">PCI DSS</span>
              <span class="text-[9px] text-[#0083C8] font-ui font-semibold uppercase tracking-wider">Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Mobile collapsible accordion ── -->
    <div class="md:hidden">
      <!-- Each accordion section -->
      <div
        v-for="section in mobileSections"
        :key="section.title"
        class="border-b border-[#e0e0e0]"
      >
        <button
          class="w-full flex items-center justify-between px-4 py-4 text-left bg-[#f5f5f5] hover:bg-[#ececec] transition-colors"
          @click="toggleSection(section.title)"
          :aria-expanded="openSection === section.title"
        >
          <span class="font-ui font-bold text-[11px] uppercase tracking-[0.12em] text-charcoal">{{ section.title }}</span>
          <svg
            class="w-5 h-5 text-charcoal/60 transition-transform duration-300"
            :class="openSection === section.title ? 'rotate-180' : ''"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Links list -->
        <Transition name="accordion">
          <div v-if="openSection === section.title" class="bg-white px-4 pb-4 pt-2 space-y-3">
            <!-- Normal link list -->
            <template v-if="section.links">
              <NuxtLink
                v-for="link in section.links"
                :key="link.label"
                :to="link.href"
                class="block text-sm text-gray-600 hover:text-deep-plum font-ui transition-colors py-0.5"
              >
                {{ link.label }}
              </NuxtLink>
            </template>

            <!-- Contact info -->
            <template v-if="section.contact">
              <div class="space-y-2 text-sm text-gray-600 font-ui leading-relaxed">
                <p><span class="font-semibold text-black">Address:</span> 1/1, Motiwala Complex, Nirala Bazar. Aurangabad. 431001 Maharashtra.</p>
                <p><span class="font-semibold text-black">Phone:</span> +91 87885 66695 | +91 95791 82097</p>
                <p><span class="font-semibold text-black">Email:</span> <a href="mailto:support@vanelvina.com" class="hover:text-deep-plum transition-colors">support@vanelvina.com</a></p>
              </div>
              <div class="flex flex-wrap items-center gap-2.5 mt-3">
                <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer"
                   class="w-8 h-8 rounded-full border border-gray-400 hover:border-deep-plum text-gray-600 hover:text-white hover:bg-deep-plum flex items-center justify-center transition-all animate-fade-in"
                   :aria-label="`Follow Van Elvina on ${social.name}`">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="social.path" />
                  </svg>
                </a>
              </div>
            </template>
          </div>
        </Transition>
      </div>

      <!-- Mobile Pay Using & Security -->
      <div class="px-4 py-5 bg-white border-b border-[#e0e0e0] space-y-4">
        <div>
          <p class="font-ui font-bold text-[11px] uppercase tracking-wider text-charcoal mb-3">Pay Using</p>
          <div class="flex items-center gap-2 bg-[#f5f5f5] px-3 py-2 rounded-lg border border-gray-200 w-fit">
            <svg class="w-5 h-5 text-[#002C8F] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z"/></svg>
            <div class="flex flex-col leading-none">
              <span class="font-sans font-extrabold text-sm text-[#002C8F] tracking-tight">Razorpay</span>
              <span class="text-[9px] text-gray-400 font-ui font-semibold uppercase tracking-wider">Secure Payment</span>
            </div>
            <span class="text-gray-300 text-sm mx-1">|</span>
            <span class="text-[10px] text-gray-500 font-ui">Cards, UPI</span>
          </div>
        </div>

        <div>
          <p class="font-ui font-bold text-[11px] uppercase tracking-wider text-charcoal mb-3">Also Available On</p>
          <div class="flex items-center gap-5 mt-1">
            <a v-for="store in marketplaces" :key="store.name" :href="store.url" target="_blank" rel="noopener noreferrer"
               class="hover:scale-110 transition-transform duration-200 block">
              <img :src="store.image" :alt="store.name" :class="[store.class || '', 'h-10 w-auto object-contain']" />
            </a>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center gap-1.5">
            <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24"><path d="M12 2L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-3z" fill="#0083C8"/><path d="M12 3.5v17c4.3-1.1 7.5-5.3 7.5-10V6.1L12 3.5z" fill="#00A2E8"/><path d="M10 14.5l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4L10 14.5z" fill="#FFFFFF"/></svg>
            <span class="text-xs font-semibold text-gray-700">PCI DSS Compliant</span>
          </div>
          <p class="font-ui font-bold text-[10px] uppercase tracking-wider text-charcoal">100% Secured</p>
        </div>
      </div>
    </div>

    <!-- Copyright (full-width black bar) -->
    <div class="bg-black pt-4 pb-20 md:pb-4 text-center">
      <div class="page-container flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/50 font-ui">
        <p class="w-full md:text-left text-center">© Copyright 2026 Van Elvina. All rights reserved.</p>
        <div class="w-full md:text-right text-center flex items-center justify-center md:justify-end gap-3 text-[10px] text-white/30">
          <NuxtLink to="/admin/login" class="hover:text-white/60 transition-colors">Admin Portal</NuxtLink>
          <span>•</span>
          <span>Made with ❤️ in India</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socials = [
  { 
    name: 'Facebook', 
    url: 'https://www.facebook.com/share/1CgGsR3nV2/', 
    path: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z' 
  },
  { 
    name: 'X', 
    url: 'https://x.com/VanElvinaX', 
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' 
  },
  { 
    name: 'Pinterest', 
    url: 'https://pin.it/5QgsUPlET', 
    path: 'M12 2C6.48 2 2 6.48 2 12c0 4.27 2.68 7.91 6.46 9.33-.09-.8-.17-2.02.04-2.89l1.24-5.27s-.32-.64-.32-1.59c0-1.49.86-2.6 1.94-2.6.91 0 1.36.69 1.36 1.51 0 .92-.58 2.29-.89 3.56-.25 1.07.54 1.95 1.6 1.95 1.92 0 3.4-2.03 3.4-4.96 0-2.59-1.86-4.41-4.52-4.41-3.08 0-4.89 2.31-4.89 4.7 0 .93.36 1.93.8 2.46.09.11.1.2.07.31l-.3 1.23c-.05.2-.16.24-.37.15-1.39-.65-2.26-2.69-2.26-4.32 0-3.52 2.56-6.75 7.37-6.75 3.87 0 6.87 2.76 6.87 6.44 0 3.85-2.43 6.94-5.8 6.94-1.13 0-2.2-.59-2.56-1.28l-.7 2.67c-.25.97-.93 2.18-1.39 2.92C10.04 21.89 11.01 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z' 
  },
  { 
    name: 'YouTube', 
    url: 'https://youtube.com/@vanelvina?si=Yfz2TgWVHHAnU8nh', 
    path: 'M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 002.11 2.11c1.858.508 9.388.508 9.388.508s7.53 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' 
  },
  { 
    name: 'Instagram', 
    url: 'https://www.instagram.com/van_elvina_official?igsh=Nmp2OWc3Yjg0MDhy', 
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' 
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/company/van-elvina/', 
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' 
  },
  { 
    name: 'Quora', 
    url: 'https://www.quora.com/profile/Van-Elvina?ch=10&oid=3206353536&share=5756498f&srid=54q8ot&target_type=user', 
    path: 'M12 2C6.48 2 2 6.48 2 12c0 2.21.72 4.25 1.94 5.92L3 21l3.08-.94C7.75 21.28 9.79 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1.75 13.56c-.57.34-1.25.56-1.95.56-2.28 0-4.12-1.63-4.12-3.62 0-2 1.84-3.62 4.12-3.62.7 0 1.38.22 1.95.56l.66-2.56h1.56l-1.66 6.47c.5.56.88 1.28.88 2.06 0 1.16-.84 2.12-2 2.37l.86 2.37h-1.57l-.76-2.25zm-.2-.93c.69 0 1.25-.72 1.25-1.62 0-.9-.56-1.62-1.25-1.62-.69 0-1.25.72-1.25 1.62 0 .9.56 1.62 1.25 1.62z' 
  },
  { 
    name: 'Reddit', 
    url: 'https://www.reddit.com/user/van_elvina/', 
    path: 'M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.23-1.72l1.35-4.24 3.71.79c.07.9.81 1.62 1.72 1.62 1.1 0 2-1 2-2s-.9-2-2-2c-.84 0-1.56.53-1.86 1.29l-4.12-.88c-.3-.06-.6.11-.68.4l-1.62 5.07c-2.43.02-4.69.66-6.37 1.69C5.35 8.98 4.45 8.5 3.5 8.5c-1.65 0-3 1.35-3 3 0 1.09.6 2.05 1.48 2.58-.08.28-.12.58-.12.89 0 4.14 4.54 7.5 10.14 7.5s10.14-3.36 10.14-7.5c0-.31-.04-.61-.12-.89.88-.53 1.48-1.49 1.48-2.58zM8.5 14c.83 0 1.5.67 1.5 1.5S9.33 17 8.5 17s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm8.12 4.12c-.93.93-2.69.93-3.62 0-.15-.15-.15-.4 0-.54.15-.15.4-.15.54 0 .63.63 1.91.63 2.54 0 .15-.15.4-.15.54 0 .15.15.15.4 0 .54zm-.62-2.62c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z' 
  }
]

const marketplaces = [
  {
    name: 'Amazon',
    url: 'https://amazon.in',
    image: '/amazon.png',
    class: 'mt-1.5'
  },
  {
    name: 'Flipkart',
    url: 'https://flipkart.com',
    image: '/flipkart.png',
    class: ''
  },
  {
    name: 'Myntra',
    url: 'https://myntra.com',
    image: '/myntra.png',
    class: ''
  }
]

const categoriesLinks = [
  { label: 'New Arrivals', href: '/products?badge=new' },
  { label: 'Bras', href: '/products?category=bras' },
  { label: 'Lingerie', href: '/products?category=sleepwear' },
  { label: 'Activewear', href: '/products?category=activewear' },
  { label: 'Panties', href: '/products?category=panties' },
  { label: 'Shapewear', href: '/products?category=shapewear' },
  { label: 'Maternity Wear', href: '/products?category=maternity' },
]

const helpLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Returns & Exchange Policy', href: '/returns' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Track your Order', href: '/track-order' },
  { label: 'Payment Policy', href: '/payment-policy' },
  { label: 'Customer Support', href: '/contact' },
]

const discoverLinks = [
  { label: 'About Van Elvina', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Find Your Fit', href: '/size-guide#fit-guide' },
  { label: 'Bra Size Calculator', href: '/size-guide#calculator' },
  { label: 'Bras By Size', href: '/size-guide#shop-by-size' },
  { label: 'Shop by Sizes', href: '/size-guide#shop-by-size' },
  { label: 'Shop by Colours', href: '/size-guide#shop-by-color' },
  { label: 'Van Elvina Reviews', href: '#' },
  { label: 'FAQs', href: '/faqs' },
]

// Mobile accordion sections
const mobileSections = [
  { title: 'Top Categories', links: categoriesLinks },
  { title: 'Help & Support', links: helpLinks },
  { title: 'Discover Van Elvina', links: discoverLinks },
  { title: 'Get In Touch', contact: true },
]

const openSection = ref<string | null>(null)
const toggleSection = (title: string) => {
  openSection.value = openSection.value === title ? null : title
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.35s ease, opacity 0.3s ease;
  overflow: hidden;
  max-height: 600px;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
