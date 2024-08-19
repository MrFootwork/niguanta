<template>
  <!-- TODO SEO: add canonical tags in case post have more than one categories -->
  <NuxtLink
    :to="`/${categoryStore.getCategorySlugById(post.categories![0])}/${post.slug}`"
    class="card-container"
  >
    <div><span v-html="post.title.rendered" /></div>
    <div>{{ new Date(post.date).toLocaleDateString() }}</div>
    <article v-html="post.excerpt.rendered" />
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
  width: 15rem;
  text-align: center;
  outline: 1px solid red;
  text-decoration: none;

  div {
    margin: 1rem 0
  }
}
</style>
