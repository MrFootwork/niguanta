<template>
  <!-- TODO SEO: add canonical tags in case post have more than one categories -->
  <NuxtLink
    :to="`/${categoryStore.getCategorySlugById(post.categories![0])}/${post.slug}`"
    class="card-container"
  >
    <div><span v-html="post.title.rendered" /></div>
    <!-- <div v-html="post.id" /> -->
    <!-- <div v-html="post.featured_media" /> -->
    <div>{{ new Date(post.date).toLocaleDateString() }}</div>
    <!-- FIXME crop the images to same size, overlay title within -->
    <img
      :src="mediaStore.media.find(media => media.id === post.featured_media)?.media_details.sizes?.large?.source_url"
      alt="test"
    >
    <article v-html="post.excerpt.rendered" />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { WP_REST_API_Post } from 'wp-types'

const { post } = defineProps<{
  post: WP_REST_API_Post
}>()

const categoryStore = useCategoryStore()
const mediaStore = useMediaStore()
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
