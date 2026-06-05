<template>
  <div class="bg-white rounded-xl p-5 shadow-soft border border-border-gray">
    <!-- Header -->
    <div class="flex items-start justify-between gap-3 mb-3">
      <div class="flex items-center gap-3">
        <img
          :src="review.avatar"
          :alt="review.author"
          class="w-10 h-10 rounded-full object-cover"
          width="40"
          height="40"
          loading="lazy"
        />
        <div>
          <p class="font-ui font-semibold text-sm text-charcoal">{{ review.author }}</p>
          <p class="text-xs text-mid-gray font-ui">{{ formatDate(review.date) }}</p>
        </div>
      </div>
      <div class="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full shrink-0">
        <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span class="text-[10px] text-green-700 font-ui font-medium">Verified</span>
      </div>
    </div>

    <!-- Stars -->
    <AppRating :rating="review.rating" show-value class="mb-2" />

    <!-- Title -->
    <h4 class="font-sans font-semibold text-charcoal text-sm mb-1.5">{{ review.title }}</h4>

    <!-- Body -->
    <p class="text-sm text-mid-gray font-ui leading-relaxed line-clamp-3">{{ review.body }}</p>

    <!-- Product reference -->
    <p class="mt-2 text-xs text-dusty-rose font-ui">
      For: {{ review.productName }}
    </p>

    <!-- Helpful -->
    <div class="mt-3 flex items-center gap-1.5 text-xs text-mid-gray font-ui">
      <button class="hover:text-deep-plum transition-colors" aria-label="Mark as helpful">
        👍 Helpful ({{ review.helpful }})
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/types'
import { formatDate } from '~/utils/formatters'

defineProps<{ review: Review }>()
</script>
