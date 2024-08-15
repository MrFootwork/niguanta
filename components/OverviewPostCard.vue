<template>
  <div class="card-container">
    THIS IS CARD
    <div v-html="post.title.rendered" />
  </div>
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
}
</style>
