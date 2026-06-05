<template>
  <article class="card animate-pulse" aria-busy="true" aria-label="Loading product">
    <!-- Image skeleton -->
    <SkeletonBox height="280px" rounded="0" />
    <!-- Content -->
    <div class="p-3 md:p-4 space-y-2">
      <SkeletonBox height="10px" width="60%" />
      <SkeletonBox height="14px" width="90%" />
      <SkeletonBox height="14px" width="70%" />
      <SkeletonBox height="12px" width="40%" />
      <SkeletonBox height="18px" width="50%" />
    </div>
  </article>
</template>
