/**
 * Sitemap URL source endpoint — called by @nuxtjs/sitemap at build/request time.
 * Fetches all product slugs + blog slugs from the Supabase API and returns
 * them as URL objects so the sitemap module can include them in /sitemap.xml
 */
export default defineEventHandler(async () => {
  const apiBase = 'https://klixyrdhwlloswsspmqk.supabase.co/functions/v1/api'
  const urls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: number }> = []

  // ── Products ────────────────────────────────────────────────────────────────
  try {
    const products = await $fetch<Array<{ slug: string; updatedAt?: string; updated_at?: string }>>(`${apiBase}/products`)

    if (Array.isArray(products)) {
      for (const product of products) {
        if (product.slug) {
          urls.push({
            loc: `/products/${product.slug}`,
            lastmod: product.updatedAt || product.updated_at || new Date().toISOString().split('T')[0],
            changefreq: 'weekly',
            priority: 0.8,
          })
        }
      }
    }
  } catch (err) {
    console.error('[sitemap] Failed to fetch products:', err)
  }

  // ── Blogs ───────────────────────────────────────────────────────────────────
  try {
    const blogs = await $fetch<Array<{ slug: string; updatedAt?: string; updated_at?: string }>>(`${apiBase}/blogs`)

    if (Array.isArray(blogs)) {
      for (const blog of blogs) {
        if (blog.slug) {
          urls.push({
            loc: `/blogs/${blog.slug}`,
            lastmod: blog.updatedAt || blog.updated_at || new Date().toISOString().split('T')[0],
            changefreq: 'monthly',
            priority: 0.6,
          })
        }
      }
    }
  } catch (err) {
    console.error('[sitemap] Failed to fetch blogs:', err)
  }

  return urls
})
