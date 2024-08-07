<template>
  <div>
    <h1>Post Index</h1>
    <article v-html="currentPost.content.rendered" />
    <!-- <pre>{{ currentPost }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

const postsStore = usePostsStore()
const currentPost = computed(() => postsStore.currentPost)
</script>

<style scoped></style>
