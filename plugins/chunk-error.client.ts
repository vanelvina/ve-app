import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:chunkError', ({ error }) => {
    console.warn('Chunk loading failed, reloading page to fetch latest assets...', error)
    
    // Perform a hard reload of the page from the server to get fresh assets
    window.location.reload()
  })
})
