<template>
  <section class="w-full bg-warm-ivory py-10 md:py-16 font-sans" aria-label="Van Elvina Blogs">
    <div class="page-container">
      
      <!-- DESKTOP VIEW LAYOUT (md:block, hidden on mobile) -->
      <div class="hidden md:block">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-[26px] font-serif text-deep-plum font-semibold tracking-wide">
            Van Elvina Blogs
          </h2>
          <NuxtLink to="/blogs" class="text-charcoal/80 hover:text-deep-plum font-ui text-sm font-bold flex items-center gap-1.5 group transition-colors">
            View All Blogs
            <span class="text-xs transition-transform group-hover:translate-x-1">→</span>
          </NuxtLink>
        </div>
        
        <!-- Desktop Header Bar: Thin line with progress indicator accent -->
        <div class="w-full h-[1px] bg-charcoal/10 relative mb-8">
          <div class="absolute left-0 top-0 h-[3px] -translate-y-[1px] w-24 bg-charcoal rounded-full" />
        </div>

        <div class="grid grid-cols-3 gap-6">
          <article v-for="blog in latestBlogs" :key="blog._id" class="flex flex-col group">
            <NuxtLink :to="`/blogs/${blog.slug}`" class="block overflow-hidden rounded-3xl mb-4 bg-white shadow-soft hover:shadow-card transition-all duration-300">
              <img
                :src="blog.image"
                :alt="blog.title"
                class="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
              />
            </NuxtLink>
            
            <!-- Tag pills -->
            <div class="flex flex-wrap gap-1.5 mb-2.5">
              <span class="px-2 py-0.5 bg-charcoal/5 text-charcoal/65 rounded-md text-[9px] font-bold uppercase tracking-wider font-ui">
                {{ blog.tags.join(', ') }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-[15px] font-bold text-charcoal leading-snug group-hover:text-deep-plum transition-colors line-clamp-2">
              <NuxtLink :to="`/blogs/${blog.slug}`">
                {{ blog.title }}
              </NuxtLink>
            </h3>

            <!-- Metadata -->
            <p class="text-[11px] text-charcoal/50 font-medium mt-2 font-ui">
              {{ formatDate(blog.publishedAt) }} . By {{ blog.author }}
            </p>
          </article>
        </div>
      </div>

      <!-- MOBILE VIEW LAYOUT (block, hidden on desktop) -->
      <div class="block md:hidden">
        <!-- Single Card Wrapper -->
        <div class="border border-rose-blush/80 rounded-[28px] p-5 bg-white shadow-soft">
          <!-- Centered Header -->
          <h2 class="text-lg font-serif text-deep-plum font-bold text-center mb-5 tracking-wide">
            Van Elvina Blogs
          </h2>

          <div class="divide-y divide-charcoal/[0.06]">
            <article 
              v-for="blog in latestBlogs" 
              :key="blog._id" 
              class="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <!-- Left Square Cover -->
              <NuxtLink :to="`/blogs/${blog.slug}`" class="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-rose-blush/20">
                <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover" loading="lazy" />
              </NuxtLink>

              <!-- Right Info Details -->
              <div class="flex flex-col justify-center flex-1 min-w-0">
                <!-- Tag pill -->
                <div class="mb-1.5">
                  <span class="px-2 py-0.5 bg-charcoal/5 text-charcoal/60 rounded-md text-[8px] font-bold uppercase tracking-wider font-ui">
                    {{ blog.tags.join(', ') }}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-xs font-bold text-charcoal leading-snug line-clamp-2 mb-1.5 hover:text-deep-plum transition-colors">
                  <NuxtLink :to="`/blogs/${blog.slug}`">
                    {{ blog.title }}
                  </NuxtLink>
                </h3>

                <!-- Metadata -->
                <p class="text-[9px] text-charcoal/45 font-medium font-ui">
                  {{ formatDate(blog.publishedAt) }}, By {{ blog.author }}
                </p>
              </div>
            </article>
          </div>

          <!-- Bottom View All Button -->
          <div class="mt-5 pt-4 border-t border-charcoal/[0.06] text-center">
            <NuxtLink to="/blogs" class="text-deep-plum/90 hover:text-deep-plum font-ui text-xs font-bold inline-flex items-center gap-1">
              View All Blogs <span class="text-[10px]">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const blogsList = ref<any[]>([])
const latestBlogs = ref<any[]>([])

const fetchBlogs = async () => {
  const config = useRuntimeConfig()
  try {
    const data = await $fetch<any[]>(`${config.public.apiBase}/blogs`)
    blogsList.value = data
    latestBlogs.value = data.slice(0, 3)
  } catch (error) {
    console.error('Failed to load active blogs:', error)
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

onMounted(() => {
  fetchBlogs()
})
</script>

<style scoped>
.shadow-soft {
  box-shadow: 0 4px 20px -2px rgba(138, 79, 90, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02);
}
.shadow-card {
  box-shadow: 0 10px 30px -5px rgba(138, 79, 90, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03);
}
</style>
