<template>
  <div v-if="ui.profileDrawerOpen" class="fixed inset-0 z-[100] overflow-hidden" role="dialog" aria-modal="true">
    <!-- Backdrop Overlay -->
    <Transition name="fade" appear>
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        @click="ui.closeProfileDrawer"
      />
    </Transition>

    <!-- Sliding Panel Drawer -->
    <Transition name="slide-right" appear>
      <div class="absolute inset-y-0 right-0 w-[380px] max-w-full bg-white shadow-2xl flex flex-col h-full overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-rose-blush/20 shrink-0">
          <h2 class="font-ui font-extrabold text-charcoal text-lg">Profile</h2>
          <button
            @click="ui.closeProfileDrawer"
            class="text-charcoal/60 hover:text-deep-plum hover:scale-105 transition-all p-1"
            aria-label="Close profile menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto px-5 py-6 space-y-5 scrollbar-hide">
          <!-- User Profile Summary Section -->
          <div class="flex items-center gap-4 py-2">
            <!-- Avatar Outer Circle -->
            <div class="w-14 h-14 rounded-full border border-charcoal/10 flex items-center justify-center bg-warm-ivory shrink-0 shadow-sm overflow-hidden">
              <img v-if="auth.user?.avatar" :src="auth.user.avatar" :alt="auth.user.name" class="w-full h-full object-cover" />
              <span v-else-if="auth.isLoggedIn" class="text-lg font-bold text-deep-plum font-ui">{{ userInitials }}</span>
              <svg v-else class="w-7 h-7 text-charcoal/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <!-- Name & Subtext -->
            <div class="min-w-0 flex-1">
              <template v-if="auth.isLoggedIn">
                <h3 class="font-serif text-lg font-bold text-deep-plum leading-tight truncate">{{ auth.user?.name || 'My Account' }}</h3>
                <p class="text-xs text-mid-gray/80 mt-0.5 font-ui truncate">{{ auth.user?.email }}</p>
                <p class="text-xs text-mid-gray/80 mt-1 font-ui">
                  <span class="underline decoration-charcoal/30 font-semibold text-charcoal/70 hover:text-deep-plum cursor-pointer">Total Balance 0</span>
                  <span class="mx-1.5 text-charcoal/20">|</span>
                  <span>Base Circle</span>
                </p>
              </template>
              <template v-else>
                <h3 class="font-serif text-lg font-bold text-deep-plum leading-tight">Van Elvina</h3>
                <button
                  @click="openLogin"
                  class="mt-1 text-xs font-ui font-bold text-deep-plum underline decoration-dotted hover:text-[#CBA39E] transition-colors block text-left"
                >Sign In / Create Account</button>
                <p class="text-xs text-mid-gray/80 mt-1 font-ui">
                  <span class="underline decoration-charcoal/30 font-semibold text-charcoal/70 hover:text-deep-plum cursor-pointer">Total Balance 0</span>
                  <span class="mx-1.5 text-charcoal/20">|</span>
                  <span>Base Circle</span>
                </p>
              </template>
            </div>
          </div>

          <!-- Group Card 1 (Main Profile Options) -->
          <div class="border border-rose-blush/30 rounded-2xl bg-white shadow-sm overflow-hidden">
            <div class="divide-y divide-rose-blush/20">
              <!-- Order History -->
              <NuxtLink to="/account" @click="ui.closeProfileDrawer" class="flex items-center justify-between p-3.5 hover:bg-rose-blush/10 transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-warm-ivory/50 flex items-center justify-center text-charcoal/70 group-hover:text-deep-plum transition-colors">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <span class="text-sm font-ui font-bold text-charcoal/80 group-hover:text-deep-plum transition-colors">Order History</span>
                </div>
                <svg class="w-4 h-4 text-charcoal/40 group-hover:text-deep-plum transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>

              <!-- Wishlist -->
              <NuxtLink to="/wishlist" class="flex items-center justify-between p-3.5 hover:bg-rose-blush/10 transition-colors group" @click="ui.closeProfileDrawer">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-warm-ivory/50 flex items-center justify-center text-charcoal/70 group-hover:text-deep-plum transition-colors">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span class="text-sm font-ui font-bold text-charcoal/80 group-hover:text-deep-plum transition-colors">Wishlist</span>
                </div>
                <svg class="w-4 h-4 text-charcoal/40 group-hover:text-deep-plum transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>

              <!-- Saved cards -->
              <NuxtLink to="/account/cards" class="flex items-center justify-between p-3.5 hover:bg-rose-blush/10 transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-warm-ivory/50 flex items-center justify-center text-charcoal/70 group-hover:text-deep-plum transition-colors">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span class="text-sm font-ui font-bold text-charcoal/80 group-hover:text-deep-plum transition-colors">Saved cards</span>
                </div>
                <svg class="w-4 h-4 text-charcoal/40 group-hover:text-deep-plum transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>

              <!-- Fitcode -->
              <NuxtLink to="/account/fitcode" class="flex items-center justify-between p-3.5 hover:bg-rose-blush/10 transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-warm-ivory/50 flex items-center justify-center text-charcoal/70 group-hover:text-deep-plum transition-colors">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span class="text-sm font-ui font-bold text-charcoal/80 group-hover:text-deep-plum transition-colors">Fitcode</span>
                </div>
                <svg class="w-4 h-4 text-charcoal/40 group-hover:text-deep-plum transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Group Card 2 (Rewards & Sharing) -->
          <div class="border border-rose-blush/30 rounded-2xl bg-white shadow-sm overflow-hidden">
            <div class="divide-y divide-rose-blush/20">
              <!-- Loyalty -->
              <NuxtLink to="/account/loyalty" class="flex items-center justify-between p-3.5 hover:bg-rose-blush/10 transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-warm-ivory/50 flex items-center justify-center text-charcoal/70 group-hover:text-deep-plum transition-colors">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a2 2 0 10-4 0v1a2 2 0 004 0v-1zm-12 0a2 2 0 10-4 0v1a2 2 0 004 0v-1z" />
                    </svg>
                  </div>
                  <span class="text-sm font-ui font-bold text-charcoal/80 group-hover:text-deep-plum transition-colors">Loyalty</span>
                </div>
                <svg class="w-4 h-4 text-charcoal/40 group-hover:text-deep-plum transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>

              <!-- My reviews -->
              <NuxtLink to="/account/reviews" class="flex items-center justify-between p-3.5 hover:bg-rose-blush/10 transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-warm-ivory/50 flex items-center justify-center text-charcoal/70 group-hover:text-deep-plum transition-colors">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <span class="text-sm font-ui font-bold text-charcoal/80 group-hover:text-deep-plum transition-colors">My reviews</span>
                </div>
                <svg class="w-4 h-4 text-charcoal/40 group-hover:text-deep-plum transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>

              <!-- Referrals -->
              <NuxtLink to="/account/referrals" class="flex items-center justify-between p-3.5 hover:bg-rose-blush/10 transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-warm-ivory/50 flex items-center justify-center text-charcoal/70 group-hover:text-deep-plum transition-colors">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span class="text-sm font-ui font-bold text-charcoal/80 group-hover:text-deep-plum transition-colors">Referrals</span>
                </div>
                <svg class="w-4 h-4 text-charcoal/40 group-hover:text-deep-plum transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Group Card 3 (Policy & Support text links) -->
          <div class="border border-rose-blush/30 rounded-2xl bg-white shadow-sm p-4 space-y-3.5 font-ui">
            <div>
              <NuxtLink to="/faqs" class="block text-xs font-bold text-charcoal/80 hover:text-deep-plum transition-colors tracking-wider uppercase" @click="ui.closeProfileDrawer">FAQS</NuxtLink>
            </div>
            <div>
              <NuxtLink to="/contact" class="block text-xs font-bold text-charcoal/80 hover:text-deep-plum transition-colors tracking-wider uppercase" @click="ui.closeProfileDrawer">CONTACT US</NuxtLink>
            </div>
            <div>
              <NuxtLink to="/studios" class="block text-xs font-bold text-charcoal/80 hover:text-deep-plum transition-colors tracking-wider uppercase" @click="ui.closeProfileDrawer">LOCATE VAN ELVINA STUDIOS</NuxtLink>
            </div>
            <div>
              <NuxtLink to="/about" class="block text-xs font-bold text-charcoal/80 hover:text-deep-plum transition-colors tracking-wider uppercase" @click="ui.closeProfileDrawer">ABOUT US</NuxtLink>
            </div>
            <div>
              <NuxtLink to="/returns" class="block text-xs font-bold text-charcoal/80 hover:text-deep-plum transition-colors tracking-wider uppercase" @click="ui.closeProfileDrawer">RETURN POLICY</NuxtLink>
            </div>
            <div>
              <NuxtLink to="/privacy" class="block text-xs font-bold text-charcoal/80 hover:text-deep-plum transition-colors tracking-wider uppercase" @click="ui.closeProfileDrawer">PRIVACY POLICY</NuxtLink>
            </div>
            <div>
              <NuxtLink to="/terms" class="block text-xs font-bold text-charcoal/80 hover:text-deep-plum transition-colors tracking-wider uppercase" @click="ui.closeProfileDrawer">TERMS OF USE</NuxtLink>
            </div>
            <div>
              <NuxtLink to="/notifications" class="block text-xs font-bold text-charcoal/80 hover:text-deep-plum transition-colors tracking-wider uppercase" @click="ui.closeProfileDrawer">NOTIFICATION</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Footer (Logout action) -->
        <div v-if="auth.isLoggedIn" class="px-5 py-4.5 border-t border-rose-blush/20 bg-warm-ivory/15 flex items-center justify-between shrink-0">
          <button
            @click="handleLogout"
            class="w-full py-2.5 border border-red-500/10 hover:border-red-500/30 hover:bg-red-50/40 text-red-500 rounded-xl font-ui font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const ui = useUIStore()
const auth = useAuthStore()

const handleLogout = () => {
  auth.logout()
  ui.addToast('info', 'Successfully logged out.')
  ui.closeProfileDrawer()
}

const openLogin = () => {
  ui.closeProfileDrawer()
  ui.openAuthModal()
}

const userInitials = computed(() => {
  const name = auth.user?.name || ''
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-right-enter-from, .slide-right-leave-to {
  transform: translateX(100%);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
