<template>
  <div class="min-h-screen bg-warm-ivory py-10 md:py-16 font-sans">
    <div class="page-container max-w-3xl">
      
      <!-- Back to list -->
      <NuxtLink to="/blogs" class="text-charcoal/60 hover:text-deep-plum font-ui text-xs font-bold inline-flex items-center gap-1.5 mb-6 md:mb-8 group">
        <span class="transition-transform group-hover:-translate-x-1">←</span> Back to All Blogs
      </NuxtLink>

      <div v-if="loading" class="py-16 text-center">
        <div class="w-10 h-10 border-4 border-deep-plum border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="text-charcoal/60 text-xs mt-3">Loading article details...</p>
      </div>

      <div v-else-if="!blog" class="py-16 text-center bg-white rounded-3xl border border-dashed border-rose-blush/60 p-8 shadow-soft">
        <p class="text-charcoal/45 italic text-sm">This blog post could not be found or has been moved.</p>
        <NuxtLink to="/blogs" class="mt-4 px-4 py-2 bg-deep-plum text-white rounded-full text-xs font-bold shadow-soft inline-block">
          Return to Directory
        </NuxtLink>
      </div>

      <article v-else class="bg-white border border-rose-blush/40 p-5 md:p-10 rounded-[32px] shadow-soft space-y-6 md:space-y-8">
        
        <!-- Header Info -->
        <div class="space-y-3 md:space-y-4">
          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            <span 
              v-for="tag in blog.tags" 
              :key="tag" 
              class="px-3 py-0.5 bg-rose-blush text-deep-plum rounded-md text-[10px] font-bold uppercase tracking-wider font-ui"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-2xl md:text-[34px] font-serif text-deep-plum font-bold leading-tight tracking-wide">
            {{ blog.title }}
          </h1>

          <!-- Author and Date -->
          <p class="text-[11px] md:text-xs text-charcoal/50 font-medium font-ui">
            Published on {{ formatDate(blog.publishedAt) }} . Written by {{ blog.author }}
          </p>
        </div>

        <!-- Cover Image -->
        <div class="rounded-2xl overflow-hidden bg-rose-blush/20 shadow-sm aspect-[16/9] md:aspect-[21/9]">
          <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover" />
        </div>

        <!-- Rich Body Content -->
        <div class="prose-container text-charcoal/80 text-sm md:text-base leading-relaxed space-y-5" v-html="blog.content">
        </div>

        <!-- Share Banner -->
        <div class="mt-12 pt-6 border-t border-charcoal/[0.05] flex items-center justify-between">
          <p class="text-xs text-charcoal/55 font-ui font-semibold">Share this comfort story:</p>
          <div class="flex gap-2">
            <button @click="copyShareLink" class="w-8 h-8 rounded-full bg-rose-blush text-deep-plum flex items-center justify-center hover:bg-deep-plum hover:text-white transition-colors" title="Copy link">
              🔗
            </button>
            <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(shareUrl)}`" target="_blank" class="w-8 h-8 rounded-full bg-rose-blush text-deep-plum flex items-center justify-center hover:bg-deep-plum hover:text-white transition-colors" title="Share on Twitter">
              𝕏
            </a>
          </div>
        </div>

      </article>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const route = useRoute()
const blog = ref<any>(null)
const loading = ref(true)

const fetchBlogDetails = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any>(`${config.public.apiBase}/blogs/${route.params.slug}`)
    blog.value = data
    
    // Set dynamic SEO meta once data is loaded
    useSeoMeta({
      title: `${data.title} – Van Elvina Blogs`,
      description: data.summary,
      ogTitle: data.title,
      ogDescription: data.summary,
      ogImage: data.image,
      ogUrl: `https://vanelvina.com/blogs/${data.slug}`,
      twitterCard: 'summary_large_image',
    })
    
    useHead({
      link: [{ rel: 'canonical', href: `https://vanelvina.com/blogs/${data.slug}` }]
    })
  } catch (error) {
    console.error('Failed to load blog details:', error)
  } finally {
    loading.value = false
  }
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

const shareUrl = computed(() => {
  if (import.meta.client) {
    return window.location.href
  }
  return `https://vanelvina.com/blogs/${route.params.slug}`
})

const copyShareLink = () => {
  if (import.meta.client) {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}

onMounted(() => {
  fetchBlogDetails()
})
</script>

<style scoped>
.shadow-soft {
  box-shadow: 0 4px 20px -2px rgba(138, 79, 90, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02);
}

/* Custom typographic styling for blog HTML content */
.prose-container :deep(h2) {
  font-family: Georgia, serif;
  font-size: 1.35rem;
  font-weight: bold;
  color: #8A4F5A;
  margin-top: 1.85rem;
  margin-bottom: 0.75rem;
}

.prose-container :deep(h3) {
  font-family: Georgia, serif;
  font-size: 1.15rem;
  font-weight: bold;
  color: #C5A58E;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.prose-container :deep(p) {
  margin-bottom: 1.15rem;
  color: #2C2C2C;
  opacity: 0.85;
}

.prose-container :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  space-y: 0.5rem;
}

.prose-container :deep(li) {
  margin-bottom: 0.35rem;
  color: #2C2C2C;
  opacity: 0.85;
}
</style>
