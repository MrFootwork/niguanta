<template>
  <div>
    <h5>Post Index</h5>
    <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
    <h1 v-html="currentPost.title.rendered" />
    <article v-html="currentPost.content.rendered" />
    <!-- eslint-enable -->
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

const postsStore = usePostsStore()
const currentPost = computed(() => postsStore.currentPost)
</script>

<style scoped></style>
