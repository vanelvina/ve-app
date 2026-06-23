<template>
  <div class="min-h-screen bg-warm-ivory text-charcoal font-sans selection:bg-rose-blush selection:text-deep-plum">
    <!-- Header Hero Banner -->
    <div 
      class="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-cover bg-center overflow-hidden transition-all duration-700 ease-in-out shadow-premium"
      :style="{ backgroundImage: `url(${aboutData?.storyImage || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200'})` }"
    >
      <!-- Premium Overlay for visual depth -->
      <div class="absolute inset-0 bg-gradient-to-r from-deep-plum/90 via-deep-plum/60 to-transparent"></div>
      
      <!-- Subtle Dashed Frame Decorator -->
      <div class="absolute inset-6 border border-dashed border-rose-blush/20 pointer-events-none rounded-2xl"></div>

      <!-- Banner Content -->
      <div class="relative z-10 max-w-4xl px-8 w-full text-left space-y-4 md:space-y-6">
        <span class="text-xs uppercase tracking-[0.25em] text-rose-blush font-bold font-ui">About Van Elvina</span>
        <h1 class="text-4xl md:text-6xl font-serif font-bold text-white tracking-wide">
          {{ aboutData?.storyTitle || 'Our Story' }}
        </h1>
        
        <!-- Styled Multi-line Subtitle -->
        <p class="text-lg md:text-2xl font-serif italic text-rose-blush/90 leading-relaxed max-w-xl whitespace-pre-line font-medium drop-shadow-sm">
          {{ aboutData?.storySubtitle || 'It began with a dream.\nWith a vision to go beyond.' }}
        </p>
      </div>
    </div>

    <!-- Our Story Body Section -->
    <section class="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7 space-y-6">
        <div class="w-16 h-1 bg-deep-plum rounded-full"></div>
        <h2 class="text-2xl md:text-3.5xl font-serif font-bold text-deep-plum tracking-wide leading-tight">
          How We Sparked a Revolution in Elegance
        </h2>
        <div class="text-charcoal/80 text-sm md:text-base leading-relaxed whitespace-pre-line space-y-4">
          {{ aboutData?.storyContent }}
        </div>
        <div>
          <NuxtLink 
            to="/shop" 
            class="inline-flex items-center justify-center px-8 py-3.5 bg-deep-plum hover:bg-deep-plum/95 text-white font-bold tracking-wider text-xs uppercase rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-premium group cursor-pointer"
          >
            <span>Explore Collection</span>
            <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
      
      <!-- Visual Quote Box Decorator -->
      <div class="lg:col-span-5 bg-white border border-rose-blush/30 rounded-3xl p-8 shadow-soft relative overflow-hidden group hover:shadow-premium transition-all duration-300">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-rose-blush/10 rounded-full blur-xl"></div>
        <span class="text-6xl font-serif text-rose-blush/35 absolute top-4 left-4">“</span>
        <div class="relative z-10 pt-8 pl-4 space-y-4">
          <p class="font-serif italic text-base text-deep-plum leading-relaxed">
            "We believe that intimate wear is the foundation of confidence. It is the first layer of self-expression, designed not to restrict, but to release."
          </p>
          <p class="text-[10px] uppercase tracking-wider font-bold text-charcoal/50">— The Van Elvina Atelier</p>
        </div>
      </div>
    </section>

    <!-- Our Vision Section -->
    <section class="bg-white border-y border-rose-blush/20 py-20 relative overflow-hidden">
      <!-- Decorative background watermark patterns -->
      <div class="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#2A1B18_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div class="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
        <div class="space-y-4">
          <span class="text-xs uppercase tracking-[0.25em] text-deep-plum font-bold font-ui">Our Core Purpose</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-deep-plum tracking-wide">
            {{ aboutData?.visionTitle || 'Our Vision' }}
          </h2>
          <p class="text-lg md:text-xl font-serif italic text-deep-plum/85 max-w-2xl mx-auto leading-relaxed">
            {{ aboutData?.visionSubtitle }}
          </p>
        </div>

        <!-- Vision Principles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6">
          <div 
            v-for="(line, idx) in aboutData?.visionContent" 
            :key="idx"
            class="bg-warm-ivory/20 backdrop-blur-sm border border-rose-blush/35 rounded-3xl p-8 text-left transition-all duration-300 hover:shadow-premium hover:-translate-y-1 hover:border-deep-plum/20 hover:bg-white group relative overflow-hidden"
          >
            <!-- Background glow effect -->
            <div class="absolute -right-10 -top-10 w-24 h-24 bg-rose-blush/10 rounded-full blur-xl transition-all duration-500 group-hover:bg-rose-blush/20"></div>
            
            <div class="space-y-4 relative z-10">
              <!-- Animated Number Badge -->
              <div class="flex items-center justify-between">
                <span class="font-serif text-2xl font-black text-deep-plum/30 group-hover:text-deep-plum transition-colors duration-300">
                  0{{ idx + 1 }}
                </span>
                <span class="w-2 h-2 rounded-full bg-rose-blush group-hover:scale-125 transition-transform duration-300"></span>
              </div>
              
              <!-- Subtle gold line separator -->
              <div class="w-10 h-0.5 bg-rose-blush/50 group-hover:w-16 transition-all duration-300"></div>
              
              <!-- Text -->
              <p class="text-charcoal/80 font-serif italic text-sm md:text-base leading-relaxed group-hover:text-charcoal transition-colors duration-300 pt-1">
                {{ line }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Design Philosophy Section -->
    <section class="max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-6 order-2 lg:order-1">
        <div class="relative rounded-3xl overflow-hidden shadow-premium group border border-charcoal/10">
          <img 
            :src="aboutData?.philosophyImage || 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1200'" 
            alt="Design Philosophy"
            class="w-full h-[380px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>

      <div class="lg:col-span-6 space-y-6 order-1 lg:order-2">
        <span class="text-xs uppercase tracking-[0.25em] text-deep-plum font-bold font-ui">Artistry & Craft</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-deep-plum tracking-wide leading-tight">
          {{ aboutData?.philosophyTitle || 'Our Design Philosophy' }}
        </h2>
        <div class="w-16 h-1 bg-deep-plum rounded-full"></div>
        <p class="text-charcoal/85 text-sm md:text-base leading-relaxed whitespace-pre-line">
          {{ aboutData?.philosophyContent }}
        </p>
      </div>
    </section>

    <!-- Our Promises Section -->
    <section class="bg-warm-ivory border-t border-rose-blush/20 py-20 md:py-28 relative">
      <div class="max-w-7xl mx-auto px-6 space-y-16">
        <div class="text-center space-y-4">
          <span class="text-xs uppercase tracking-[0.25em] text-deep-plum font-bold font-ui">Atelier Code</span>
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-deep-plum tracking-wide">
            Our Promises
          </h2>
          <div class="w-12 h-0.5 bg-deep-plum mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div 
            v-for="(promise, idx) in aboutData?.promises" 
            :key="idx" 
            class="bg-white border border-rose-blush/30 rounded-3xl p-6 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-between min-h-[220px]"
          >
            <!-- Promise Icon Header -->
            <div class="w-12 h-12 rounded-full bg-rose-blush/25 text-deep-plum flex items-center justify-center mb-4 shadow-soft">
              <!-- Render Custom SVG Based on Promise Type -->
              <svg v-if="promise.icon === 'inclusive'" class="w-6 h-6 stroke-current fill-none" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.099 9.099 0 005.023-3.218 9.099 9.099 0 00-3.324-11.458 9.097 9.097 0 00-11.41 1.097M3.562 3.24a8.992 8.992 0 00-1.72 5.03c0 4.97 4.03 9 9 9 2.07 0 3.97-.7 5.48-1.875M12 9.75a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
              <svg v-else-if="promise.icon === 'good'" class="w-6 h-6 stroke-current fill-none" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.421.069.846.069 1.275 0 2.27-.56 4.412-1.554 6.302a2.316 2.316 0 01-1.905 1.285 22.062 22.062 0 01-9.986 0 2.316 2.316 0 01-1.905-1.285A22.063 22.063 0 013 13.5c0-.429.024-.854.069-1.275.109-1.021 1.028-1.715 2.054-1.715h1.51z" />
              </svg>
              <svg v-else-if="promise.icon === 'innovate'" class="w-6 h-6 stroke-current fill-none" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              <svg v-else-if="promise.icon === 'impact'" class="w-6 h-6 stroke-current fill-none" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <svg v-else class="w-6 h-6 stroke-current fill-none" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>

            <!-- Promise Content -->
            <div class="space-y-2 flex-grow flex flex-col justify-center">
              <h3 class="font-serif font-bold text-deep-plum text-xs md:text-sm leading-snug">
                {{ promise.title }}
              </h3>
              <p class="text-charcoal/60 text-[10px] md:text-xs leading-relaxed max-w-[160px] mx-auto">
                {{ promise.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

// SEO Settings
useHead({
  title: 'About Us — Van Elvina',
  meta: [
    { name: 'description', content: 'Discover the story behind Van Elvina. Elegance, luxury, and comfort crafted for every body.' }
  ]
})

// Fetch content from DB
const { data: aboutData } = await useFetch<any>(`${config.public.apiBase}/about`)
</script>

<style scoped>
.shadow-premium {
  box-shadow: 0 20px 40px -15px rgba(42, 27, 24, 0.15);
}
.shadow-soft {
  box-shadow: 0 4px 20px -4px rgba(42, 27, 24, 0.06);
}
</style>
