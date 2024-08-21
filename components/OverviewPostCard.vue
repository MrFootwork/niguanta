<template>
  <!-- TODO SEO: add canonical tags in case post have more than one categories -->
  <NuxtLink
    :to="`/${categoryStore.getCategorySlugById(post.categories![0])}/${post.slug}`"
    class="card-container"
  >
    <!-- <div><span v-html="post.title.rendered" /></div> -->

    <div class="image-container">
      <img
        :src="mediaStore.media.find(media => media.id === post.featured_media)?.media_details.sizes?.medium?.source_url"
        alt="test"
      >
      <div
        class="post-title"
        v-html="post.title.rendered"
      />
      <div class="post-date">
        {{ new Date(post.date).toLocaleDateString() }}
      </div>
    </div>

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
  text-align: left;
  outline: 1px solid red;
  text-decoration: none;

  div {
    margin: 1rem 0
  }

  .image-container {
    width: 100%;
    height: 8rem;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 30%;
    }

    .post-title, .post-date {
      position: absolute;
      margin: .5rem;

      font-size: large;
      color: white;
      text-shadow: 1px 1px 2px black, -1px -1px 4px steelblue;
    }

    .post-title {
      top: 0;
      width: 80%;
      text-align: left;
    }

    .post-date {
      bottom: 0;
      right: 0;
    }
  }

  article {
    padding: 0 .5rem;
  }

}
</style>
