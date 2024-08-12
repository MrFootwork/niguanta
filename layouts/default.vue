<template>
  <div>
    <header class="test">
      This is Header
    </header>
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
import { usePostStore } from '@/stores/posts'

const postsStore = usePostStore()
const postCount = computed(() => postsStore.postCount)
</script>

<style scoped lang="scss">
.test {
  color: red
}
</style>
