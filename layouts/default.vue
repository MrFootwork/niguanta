<template>
  <div>
    <slot />
    <div>
      <div>Posts Count {{ postCount }}</div>
      <div>Full Path: {{ $route.fullPath }}</div>
      <div>Params: {{ $route.params }}</div>
      <div>Page Name: {{ $route.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

const postsStore = usePostsStore()
const postCount = computed(() => postsStore.postCount)
</script>

<style scoped></style>
