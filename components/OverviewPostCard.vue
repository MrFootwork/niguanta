<template>
  <NuxtLink
    :to="`/${post.slug}`"
    class="card-container"
  >
    THIS IS CARD
    <div>Title: <span v-html="post.title.rendered" /></div>
    <div>Date: {{ new Date(post.date).toLocaleDateString() }}</div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { WP_REST_API_Post } from 'wp-types'

const { post } = defineProps<{
  post: WP_REST_API_Post
}>()
</script>

<style scoped lang="scss">
.card-container {
  margin: 1rem 0;
  width: 10rem;
  text-align: center;
  outline: 1px solid red;
}
</style>
