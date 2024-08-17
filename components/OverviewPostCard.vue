<template>
  <!-- TODO SEO: add canonical tags in case post have more than one categories -->
  <NuxtLink
    :to="`/${categoryStore.getCategorySlugById(post.categories![0])}/${post.slug}`"
    class="card-container"
  >
    THIS IS CARD
    <div>Title: <span v-html="post.title.rendered" /></div>
    <div>Date: {{ new Date(post.date).toLocaleDateString() }}</div>
    <div v-html="post.excerpt.rendered" />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { WP_REST_API_Post } from 'wp-types'
import { useCategoryStore } from '@/stores/categories'

const { post } = defineProps<{
  post: WP_REST_API_Post
}>()

const categoryStore = useCategoryStore()
</script>

<style scoped lang="scss">
.card-container {
  margin: 1rem 0;
  width: 10rem;
  text-align: center;
  outline: 1px solid red;
}
</style>
