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
            <p><span class="font-semibold text-black">Address:</span> Reliance Retail Limited, 3rd Floor, Court House, Lokmanya Tilak Marg, Dhobi Talao, Mumbai - 400 002</p>
            <p><span class="font-semibold text-black">Phone:</span> 080-40245577 / 080-68305577</p>
            <p><span class="font-semibold text-black">Email:</span> <a href="mailto:feedback@vanelvina.com" class="hover:text-deep-plum transition-colors">feedback@vanelvina.com</a></p>
            <p><span class="font-semibold text-black">CIN:</span> U51100MH1985PLC120563</p>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer"
               class="w-7 h-7 rounded-full border border-gray-400 hover:border-black text-gray-600 hover:text-white hover:bg-black flex items-center justify-center text-xs font-semibold transition-all"
               :aria-label="`Follow Van Elvina on ${social.name}`">
              {{ social.icon }}
            </a>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-300/60 my-6"></div>

      <!-- Payment & Security -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex flex-col items-center md:items-start gap-2">
          <span class="text-xs font-bold text-black uppercase tracking-wider">Pay Using</span>
          <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <svg class="w-6 h-6 text-[#002C8F] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z"/></svg>
            <div class="flex flex-col leading-none">
              <span class="font-sans font-extrabold text-sm text-[#002C8F] tracking-tight">Razorpay</span>
              <span class="text-[9px] text-gray-400 font-ui font-semibold uppercase tracking-wider">Secure Payment</span>
            </div>
            <span class="text-gray-300 text-sm mx-1">|</span>
            <span class="text-[10px] text-gray-500 font-ui">Cards, UPI, Netbanking, Wallets</span>
          </div>
        </div>
        <div class="flex flex-col items-center md:items-end gap-2">
          <span class="text-xs font-bold text-black uppercase tracking-wider">100% Secured Payment</span>
          <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
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
                <p><span class="font-semibold text-black">Address:</span> Reliance Retail Limited, 3rd Floor, Court House, Lokmanya Tilak Marg, Dhobi Talao, Mumbai - 400 002</p>
                <p><span class="font-semibold text-black">Phone:</span> 080-40245577 / 080-68305577</p>
                <p><span class="font-semibold text-black">Email:</span> <a href="mailto:feedback@vanelvina.com" class="hover:text-deep-plum transition-colors">feedback@vanelvina.com</a></p>
                <p><span class="font-semibold text-black">CIN:</span> U51100MH1985PLC120563</p>
              </div>
              <div class="flex items-center gap-2 mt-3">
                <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer"
                   class="w-8 h-8 rounded-full border border-gray-400 hover:border-black text-gray-600 hover:text-white hover:bg-black flex items-center justify-center text-xs font-semibold transition-all"
                   :aria-label="`Follow Van Elvina on ${social.name}`">
                  {{ social.icon }}
                </a>
              </div>
            </template>
          </div>
        </Transition>
      </div>

      <!-- Mobile Pay Using & Security -->
      <div class="px-4 py-5 bg-white border-b border-[#e0e0e0]">
        <p class="font-ui font-bold text-xs uppercase tracking-wider text-charcoal mb-3">Pay Using</p>
        <div class="flex items-center gap-2 bg-[#f5f5f5] px-3 py-2 rounded-lg border border-gray-200 w-fit">
          <svg class="w-5 h-5 text-[#002C8F] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z"/></svg>
          <div class="flex flex-col leading-none">
            <span class="font-sans font-extrabold text-sm text-[#002C8F] tracking-tight">Razorpay</span>
            <span class="text-[9px] text-gray-400 font-ui font-semibold uppercase tracking-wider">Secure Payment</span>
          </div>
          <span class="text-gray-300 text-sm mx-1">|</span>
          <span class="text-[10px] text-gray-500 font-ui">Cards, UPI, Netbanking</span>
        </div>
        <p class="font-ui font-bold text-xs uppercase tracking-wider text-charcoal mt-4 text-right">100% Secured Payment</p>
      </div>
    </div>

    <!-- Copyright (full-width black bar) -->
    <div class="bg-black py-4 text-center">
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
  { name: 'Facebook', icon: 'f', url: 'https://facebook.com/vanelvina' },
  { name: 'Twitter', icon: 't', url: 'https://twitter.com/vanelvina' },
  { name: 'Pinterest', icon: 'p', url: 'https://pinterest.com/vanelvina' },
  { name: 'Instagram', icon: 'ig', url: 'https://instagram.com/vanelvina' },
  { name: 'LinkedIn', icon: 'in', url: 'https://linkedin.com/company/vanelvina' },
]

const categoriesLinks = [
  { label: 'New Arrivals', href: '/products?badge=new' },
  { label: 'Bras', href: '/products?category=bras' },
  { label: 'Lingerie', href: '/products?category=sleepwear' },
  { label: 'Activewear', href: '/products?category=activewear' },
  { label: 'Panties', href: '/products?category=panties' },
  { label: 'Shapewear', href: '/products?category=shapewear' },
  { label: 'Winterwear', href: '/products?category=thermals' },
  { label: 'Maternity Wear', href: '/products?category=maternity' },
  { label: 'Beauty', href: '#' },
  { label: 'Van Elvina Girls', href: '#' },
  { label: 'Lingerie Sale & Offer', href: '/products?badge=sale' },
  { label: 'Swimwear/Beachwear', href: '#' },
  { label: 'Top Lingerie Brand', href: '/' },
]

const helpLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Returns & Exchange Policy', href: '/returns' },
  { label: 'Track your Order', href: '/track-order' },
  { label: 'Discreet Packaging', href: '#' },
  { label: 'Payment Policy', href: '#' },
  { label: 'Customer Support', href: '/contact' },
  { label: 'Caution Notice', href: '#' },
]

const discoverLinks = [
  { label: 'About Van Elvina', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Find Your Fit', href: '/size-guide' },
  { label: 'Bra Size Calculator', href: '/size-guide' },
  { label: 'Bras By Size', href: '/size-guide' },
  { label: 'Shop by Sizes', href: '/products' },
  { label: 'Shop by Colours', href: '/products' },
  { label: 'Van Elvina Store Locator', href: '/stores' },
  { label: 'Van Elvina Press', href: '#' },
  { label: 'Sell on Van Elvina', href: '#' },
  { label: 'Own A Franchise', href: '#' },
  { label: 'Van Elvina Reviews', href: '#' },
  { label: 'Circle of Radiance', href: '#' },
  { label: 'Careers', href: '/careers' },
  { label: 'Sitemap', href: '/sitemap' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Find a Store', href: '/stores' },
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
