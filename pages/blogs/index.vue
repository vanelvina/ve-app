<template>
  <div class="min-h-screen bg-warm-ivory py-10 md:py-16 font-sans">
    <div class="page-container max-w-4xl">
      
      <!-- Back to Home -->
      <NuxtLink to="/" class="text-charcoal/60 hover:text-deep-plum font-ui text-xs font-bold inline-flex items-center gap-1.5 mb-6 md:mb-8 group">
        <span class="transition-transform group-hover:-translate-x-1">←</span> Back to Home
      </NuxtLink>

      <!-- Page Heading -->
      <div class="text-center mb-10 md:mb-16">
        <h1 class="text-3xl md:text-[40px] font-serif text-deep-plum font-medium tracking-wide mb-3">
          Van Elvina Blogs
        </h1>
        <p class="text-charcoal/60 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
          Stories of mindful wellness, body confidence, and premium innerwear styling tips for the modern Indian woman.
        </p>
      </div>

      <!-- Search & Filters -->
      <div class="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-rose-blush shadow-soft">
        <div class="relative w-full md:max-w-xs">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-charcoal/40">🔍</span>
          <input 
            v-model="searchQuery" 
            placeholder="Search wellness & fashion guides..." 
            class="w-full pl-9 pr-4 py-2 border border-charcoal/10 rounded-full text-xs focus:outline-none focus:border-dusty-rose focus:ring-1 focus:ring-dusty-rose/25 bg-warm-ivory/30" 
          />
        </div>
        <div class="flex flex-wrap gap-2 justify-center">
          <button 
            @click="selectedTag = ''" 
            class="px-4 py-1.5 rounded-full text-xs font-ui font-semibold transition-all"
            :class="!selectedTag ? 'bg-deep-plum text-white shadow-soft':'bg-warm-ivory border border-charcoal/10 text-charcoal/70 hover:text-deep-plum'"
          >
            All Guides
          </button>
          <button 
            v-for="tag in allTags" 
            :key="tag"
            @click="selectedTag = tag" 
            class="px-4 py-1.5 rounded-full text-xs font-ui font-semibold transition-all"
            :class="selectedTag === tag ? 'bg-deep-plum text-white shadow-soft':'bg-warm-ivory border border-charcoal/10 text-charcoal/70 hover:text-deep-plum'"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Blogs List -->
      <div v-if="filteredBlogs.length === 0" class="py-16 text-center bg-white rounded-3xl border border-dashed border-rose-blush/60 p-8 shadow-soft">
        <p class="text-charcoal/45 italic text-sm">No blogs matched your search criteria.</p>
        <button @click="resetFilters" class="mt-4 px-4 py-2 bg-deep-plum text-white rounded-full text-xs font-bold shadow-soft">
          Clear Filters
        </button>
      </div>

      <div v-else class="space-y-8 md:space-y-12">
        <article 
          v-for="blog in filteredBlogs" 
          :key="blog._id" 
          class="flex flex-col md:flex-row gap-6 md:gap-8 bg-white border border-rose-blush/40 p-5 md:p-6 rounded-[32px] shadow-soft hover:shadow-card transition-all duration-350 group"
        >
          <!-- Left Cover Image -->
          <NuxtLink :to="`/blogs/${blog.slug}`" class="w-full md:w-80 aspect-[16/10] md:aspect-[4/3] shrink-0 rounded-2xl overflow-hidden bg-rose-blush/10 shadow-sm">
            <img 
              :src="blog.image" 
              :alt="blog.title" 
              class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" 
              loading="lazy" 
            />
          </NuxtLink>

          <!-- Right Details -->
          <div class="flex flex-col justify-center flex-1">
            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-2.5">
              <span 
                v-for="tag in blog.tags" 
                :key="tag" 
                class="px-2.5 py-0.5 bg-charcoal/5 text-charcoal/65 rounded-md text-[9px] font-bold uppercase tracking-wider font-ui"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="text-lg md:text-xl font-serif text-deep-plum font-bold leading-snug group-hover:text-dusty-rose transition-colors mb-2.5">
              <NuxtLink :to="`/blogs/${blog.slug}`">
                {{ blog.title }}
              </NuxtLink>
            </h2>

            <!-- Summary -->
            <p class="text-charcoal/70 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
              {{ blog.summary }}
            </p>

            <!-- Metadata -->
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-charcoal/[0.05]">
              <span class="text-[10px] text-charcoal/50 font-medium font-ui">
                {{ formatDate(blog.publishedAt) }} . By {{ blog.author }}
              </span>
              <NuxtLink :to="`/blogs/${blog.slug}`" class="text-deep-plum text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <span class="text-[10px]">→</span>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const blogs = ref<any[]>([])
const searchQuery = ref('')
const selectedTag = ref('')

const fetchBlogs = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/blogs`)
    blogs.value = data
  } catch (error) {
    console.error('Failed to load blogs list:', error)
  }
}

const allTags = computed(() => {
  const tagsSet = new Set<string>()
  blogs.value.forEach(b => {
    if (b.tags) b.tags.forEach((t: string) => tagsSet.add(t))
  })
  return Array.from(tagsSet)
})

const filteredBlogs = computed(() => {
  let list = blogs.value
  const q = searchQuery.value.toLowerCase().trim()
  if (q) {
    list = list.filter(b => 
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      (b.content && b.content.toLowerCase().includes(q))
    )
  }
  if (selectedTag.value) {
    list = list.filter(b => b.tags && b.tags.includes(selectedTag.value))
  }
  return list
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedTag.value = ''
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchBlogs()
})

// SEO Optimizations
useSeoMeta({
  title: 'Van Elvina Blogs – Women Comfort First | Fashion & Wellness Guides',
  description: "Read the official Van Elvina blogs for modern styling guides, activewear fit tips, organic sleepwear reviews, and daily body confidence inspiration.",
  ogTitle: 'Van Elvina Blogs – Premium Innerwear & Mindful Wellness',
  ogDescription: "Dive into styling and wellness guides. Perfect sizing, seamless comfort, and skin-safe cotton essentials, written for the modern woman.",
  ogImage: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&h=630&q=80',
  ogUrl: 'https://vanelvina.com/blogs',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://vanelvina.com/blogs' }]
})
</script>

<style scoped>
.shadow-soft {
  box-shadow: 0 4px 20px -2px rgba(138, 79, 90, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02);
}
.shadow-card {
  box-shadow: 0 16px 36px -8px rgba(138, 79, 90, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03);
}
</style>
