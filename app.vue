<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <PwaInstallPrompt />
    <GlobalLoader :show="ui.apiLoading" />
  </div>
</template>

<script setup lang="ts">
import { useUIStore } from '~/stores/ui'
const ui = useUIStore()
</script>

