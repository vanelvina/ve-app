<template>
  <footer class="bg-charcoal text-white" role="contentinfo">
    <!-- Newsletter band -->
    <div class="bg-deep-plum">
      <div class="page-container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-center md:text-left">
          <h3 class="font-serif text-xl text-white font-semibold mb-1">Join the Van Elvina Circle</h3>
          <p class="text-rose-blush/80 text-sm font-ui">Get 10% off your first order + early access to sales & new collections.</p>
        </div>
        <form class="flex w-full max-w-md gap-2" @submit.prevent="handleSubscribe" novalidate aria-label="Newsletter signup">
          <label for="footer-email" class="sr-only">Email address</label>
          <input
            id="footer-email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 font-ui text-sm focus:outline-none focus:border-white/60 transition-colors"
            required
            aria-required="true"
          />
          <AppButton type="submit" variant="gold" size="md" :loading="subscribing">
            Subscribe
          </AppButton>
        </form>
      </div>
    </div>

    <!-- Main footer -->
    <div class="page-container py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <!-- Brand column -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex flex-col items-start gap-1 mb-4">
            <img src="/logo.png" alt="Van Elvina Logo" class="h-9 w-auto object-contain brightness-0 invert" />
            <!-- <span class="text-[8px] text-white/50 font-ui uppercase tracking-[0.2em] ml-3">Women Comfort First</span> -->
          </div>
          <p class="text-sm text-white/65 font-ui leading-relaxed mb-5">
            Premium innerwear crafted for the modern Indian woman — where elegance meets everyday comfort.
          </p>
          <!-- Social links -->
          <div class="flex items-center gap-3">
            <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer"
               class="w-9 h-9 rounded-full bg-white/10 hover:bg-dusty-rose flex items-center justify-center transition-colors duration-250"
               :aria-label="`Follow Van Elvina on ${social.name}`">
              <span class="text-sm" aria-hidden="true">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Shop column -->
        <div>
          <h4 class="font-ui font-semibold text-white text-sm uppercase tracking-wider mb-4">Shop</h4>
          <ul class="space-y-2.5">
            <li v-for="link in shopLinks" :key="link.label">
              <NuxtLink :to="link.href" class="text-sm text-white/65 hover:text-dusty-rose font-ui transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Help column -->
        <div>
          <h4 class="font-ui font-semibold text-white text-sm uppercase tracking-wider mb-4">Help</h4>
          <ul class="space-y-2.5">
            <li v-for="link in helpLinks" :key="link.label">
              <NuxtLink :to="link.href" class="text-sm text-white/65 hover:text-dusty-rose font-ui transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact column -->
        <div>
          <h4 class="font-ui font-semibold text-white text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-2 text-sm text-white/65 font-ui">
              <span class="shrink-0 mt-0.5" aria-hidden="true">📞</span>
              <span>1800-XXX-XXXX<br /><span class="text-xs text-white/40">Mon–Sat, 9am–7pm</span></span>
            </li>
            <li class="flex items-start gap-2 text-sm text-white/65 font-ui">
              <span class="shrink-0 mt-0.5" aria-hidden="true">✉️</span>
              <a href="mailto:support@vanelvina.com" class="hover:text-dusty-rose transition-colors">
                support@vanelvina.com
              </a>
            </li>
            <li class="flex items-start gap-2 text-sm text-white/65 font-ui">
              <span class="shrink-0 mt-0.5" aria-hidden="true">💬</span>
              <a href="#" class="hover:text-dusty-rose transition-colors">Live Chat</a>
            </li>
          </ul>
          <!-- Trust badges -->
          <div class="mt-5 flex flex-wrap gap-2">
            <div v-for="badge in trustBadges" :key="badge" class="px-2 py-1 bg-white/10 rounded text-[10px] text-white/60 font-ui">
              {{ badge }}
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 font-ui">
        <p>© {{ new Date().getFullYear() }} Van Elvina. All rights reserved.</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink v-for="policy in policies" :key="policy.label" :to="policy.href" class="hover:text-white/70 transition-colors">
            {{ policy.label }}
          </NuxtLink>
        </div>
        <div class="flex items-center gap-2 flex-wrap justify-center md:justify-end">
          <span>Made with ❤️ in India</span>
          <span class="text-white/20">•</span>
          <NuxtLink to="/admin/login" class="hover:text-white/70 transition-colors font-medium">Admin Portal</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const ui = useUIStore()
const email = ref('')
const subscribing = ref(false)

const handleSubscribe = async () => {
  if (!email.value) return
  subscribing.value = true
  await new Promise(r => setTimeout(r, 1000))
  subscribing.value = false
  ui.addToast('success', 'Welcome! 🎉 Check your email for your 10% off code.')
  email.value = ''
}

const socials = [
  { name: 'Instagram', icon: '📸', url: 'https://instagram.com/vanelvina' },
  { name: 'Facebook', icon: '👍', url: 'https://facebook.com/vanelvina' },
  { name: 'Pinterest', icon: '📌', url: 'https://pinterest.com/vanelvina' },
  { name: 'YouTube', icon: '▶️', url: 'https://youtube.com/vanelvina' },
]

const shopLinks = [
  { label: 'Bras', href: '/products?category=bras' },
  { label: 'Panties', href: '/products?category=panties' },
  { label: 'Shapewear', href: '/products?category=shapewear' },
  { label: 'Sleepwear', href: '/products?category=sleepwear' },
  { label: 'Activewear', href: '/products?category=activewear' },
  { label: 'New Arrivals', href: '/products?badge=new' },
  { label: 'Sale', href: '/products?badge=sale' },
]

const helpLinks = [
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'Returns & Exchanges', href: '/returns' },
  { label: 'Shipping Info', href: '/shipping' },
  { label: 'Contact Us', href: '/contact' },
]

const policies = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Return Policy', href: '/returns' },
  { label: 'Sitemap', href: '/sitemap' },
]

const trustBadges = ['100% Secure', 'OEKO-TEX®', 'ISO Certified', 'Easy Returns']
</script>
