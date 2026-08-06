// composables/useScrollRestore.ts
// Saves and restores the scroll Y position per route path using sessionStorage.
// Use in PLP and PDP pages for seamless back-navigation UX.

export function useScrollRestore() {
  const route = useRoute()

  const storageKey = computed(() => `ve_scroll_${route.fullPath}`)

  const saveScroll = () => {
    if (import.meta.client) {
      const y = window.scrollY
      if (y > 0) {
        sessionStorage.setItem(storageKey.value, String(y))
      }
    }
  }

  const restoreScroll = () => {
    if (import.meta.client) {
      const saved = sessionStorage.getItem(storageKey.value)
      if (saved) {
        const y = parseInt(saved, 10)
        if (!isNaN(y) && y > 0) {
          // Use requestAnimationFrame to ensure DOM is painted before scroll
          requestAnimationFrame(() => {
            window.scrollTo({ top: y, behavior: 'instant' })
          })
        }
      } else {
        // Ensure new route starts cleanly at top 0 before enter animation
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
  }


  const clearScroll = () => {
    if (import.meta.client) {
      sessionStorage.removeItem(storageKey.value)
    }
  }

  onMounted(() => {
    restoreScroll()
  })

  onBeforeUnmount(() => {
    saveScroll()
  })

  return { saveScroll, restoreScroll, clearScroll }
}
