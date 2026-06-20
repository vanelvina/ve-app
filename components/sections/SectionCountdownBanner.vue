<template>
  <section class="w-full bg-white" :aria-label="widget?.name || 'Countdown Promotion'">
    <!-- Banner link wrapper -->
    <NuxtLink :to="widget?.items?.link || '/products'" class="block w-full">
      <picture>
        <source media="(max-width: 768px)" :srcset="widget?.imageMobile || widget?.image" />
        <img
          :src="widget?.image"
          :alt="widget?.name || 'Countdown Sale Banner'"
          class="w-full h-auto block"
          loading="lazy"
        />
      </picture>
    </NuxtLink>

      <!-- Centered Countdown Timer underneath the banner -->
      <div v-if="!isExpired" class="mt-4 flex items-center justify-center gap-2 text-sm font-semibold select-none">
        <div class="flex items-center gap-1">
          <span class="px-2.5 py-1 bg-[#A8293B] text-white rounded text-xs font-mono font-bold">{{ timeRemaining.days }}d</span>
          <span class="text-deep-plum font-bold">:</span>
          <span class="px-2.5 py-1 bg-[#A8293B] text-white rounded text-xs font-mono font-bold">{{ timeRemaining.hours }}h</span>
          <span class="text-deep-plum font-bold">:</span>
          <span class="px-2.5 py-1 bg-[#A8293B] text-white rounded text-xs font-mono font-bold">{{ timeRemaining.minutes }}m</span>
          <span class="text-deep-plum font-bold">:</span>
          <span class="px-2.5 py-1 bg-[#A8293B] text-white rounded text-xs font-mono font-bold">{{ timeRemaining.seconds }}s</span>
        </div>
      </div>
      <div v-else class="mt-4 text-center">
        <span class="inline-block px-4 py-1.5 bg-mid-gray/20 text-charcoal/50 rounded-full text-xs font-ui font-bold uppercase tracking-wider">
          Offer Ended
        </span>
      </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  widget?: any
}>()

const timeRemaining = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
})

const isExpired = ref(false)
let timerInterval: ReturnType<typeof setInterval> | null = null

const calculateTime = () => {
  const targetDateStr = props.widget?.items?.endDate || props.widget?.description
  if (!targetDateStr) {
    isExpired.value = true
    return
  }

  const targetTime = new Date(targetDateStr).getTime()
  const currentTime = new Date().getTime()
  const difference = targetTime - currentTime

  if (difference <= 0) {
    isExpired.value = true
    timeRemaining.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    if (timerInterval) clearInterval(timerInterval)
    return
  }

  isExpired.value = false
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  timeRemaining.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
}

onMounted(() => {
  calculateTime()
  timerInterval = setInterval(calculateTime, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

// Recalculate if target date changes dynamically
watch(() => props.widget?.items?.endDate, () => {
  calculateTime()
})
watch(() => props.widget?.description, () => {
  calculateTime()
})
</script>

<style scoped>
/* Custom scoped transitions if needed */
</style>
