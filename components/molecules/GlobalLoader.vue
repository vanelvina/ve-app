<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-warm-ivory/95 backdrop-blur-xs"
      role="alert"
      aria-busy="true"
      aria-label="Loading page content"
    >
      <div class="flex flex-col items-center">
        <!-- Logo -->
        <img
          src="/logo.png"
          alt="Van Elvina Logo"
          class="h-20 w-auto object-contain mb-8 animate-float"
        />

        <!-- Loading Dots -->
        <div class="flex gap-3 items-center justify-center">
          <div class="dot w-3.5 h-3.5 rounded-full bg-dusty-rose dot-bounce dot-delay-1" />
          <div class="dot w-3.5 h-3.5 rounded-full bg-mid-gray dot-bounce dot-delay-2" />
          <div class="dot w-3.5 h-3.5 rounded-full bg-dusty-rose dot-bounce dot-delay-3" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface Props {
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
})

const visible = ref(props.show)

watch(
  () => props.show,
  (newVal) => {
    visible.value = newVal
  }
)
</script>

<style scoped>
.dot-bounce {
  animation: dotBounce 1.4s infinite ease-in-out;
}
.dot-delay-1 {
  animation-delay: -0.32s;
}
.dot-delay-2 {
  animation-delay: -0.16s;
}
.dot-delay-3 {
  animation-delay: 0s;
}

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1.15);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
