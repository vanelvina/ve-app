<template>
  <!-- Mobile Bottom Tab Bar – only on small screens -->
  <nav
    class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
    aria-label="Mobile bottom navigation"
  >
    <div class="flex items-stretch h-16">
      <!-- Home -->
      <NuxtLink
        to="/"
        class="flex-1 flex flex-col items-center justify-center gap-0.5 group"
        active-class=""
        aria-label="Home"
        @click="activeTab = 'home'"
      >
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
          :class="activeTab === 'home' ? 'bg-[#FDF0E8]' : 'group-hover:bg-gray-50'"
        >
          <svg
            class="w-5 h-5 transition-colors duration-200"
            :class="activeTab === 'home' ? 'text-deep-plum' : 'text-gray-400'"
            fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        <span
          class="text-[10px] font-ui font-semibold transition-colors duration-200"
          :class="activeTab === 'home' ? 'text-deep-plum' : 'text-gray-400'"
        >Home</span>
      </NuxtLink>

      <!-- Category -->
      <button
        class="flex-1 flex flex-col items-center justify-center gap-0.5 group"
        aria-label="Browse categories"
        @click="activeTab = 'category'; ui.toggleMobileMenu()"
      >
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
          :class="activeTab === 'category' ? 'bg-[#FDF0E8]' : 'group-hover:bg-gray-50'"
        >
          <svg
            class="w-5 h-5 transition-colors duration-200"
            :class="activeTab === 'category' ? 'text-deep-plum' : 'text-gray-400'"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
        <span
          class="text-[10px] font-ui font-semibold transition-colors duration-200"
          :class="activeTab === 'category' ? 'text-deep-plum' : 'text-gray-400'"
        >Category</span>
      </button>

      <!-- Explore / Search -->
      <button
        class="flex-1 flex flex-col items-center justify-center gap-0.5 group"
        aria-label="Explore and search"
        @click="activeTab = 'explore'; ui.openSearch()"
      >
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
          :class="activeTab === 'explore' ? 'bg-[#FDF0E8]' : 'group-hover:bg-gray-50'"
        >
          <svg
            class="w-5 h-5 transition-colors duration-200"
            :class="activeTab === 'explore' ? 'text-deep-plum' : 'text-gray-400'"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <span
          class="text-[10px] font-ui font-semibold transition-colors duration-200"
          :class="activeTab === 'explore' ? 'text-deep-plum' : 'text-gray-400'"
        >Explore</span>
      </button>

      <!-- Profile -->
      <button
        class="flex-1 flex flex-col items-center justify-center gap-0.5 group"
        aria-label="My account"
        @click="activeTab = 'profile'; ui.openProfileDrawer()"
      >
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
          :class="activeTab === 'profile' ? 'bg-[#FDF0E8]' : 'group-hover:bg-gray-50'"
        >
          <svg
            class="w-5 h-5 transition-colors duration-200"
            :class="activeTab === 'profile' ? 'text-deep-plum' : 'text-gray-400'"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <span
          class="text-[10px] font-ui font-semibold transition-colors duration-200"
          :class="activeTab === 'profile' ? 'text-deep-plum' : 'text-gray-400'"
        >Profile</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const ui = useUIStore()
const route = useRoute()

// Sync active tab with current route
const activeTab = computed(() => {
  const path = route.path
  if (path === '/') return 'home'
  if (path.startsWith('/products')) return 'explore'
  return 'home'
})
</script>
