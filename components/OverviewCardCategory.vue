<template>
  <NuxtLink
    :to="{ path: category.slug }"
    class="card-wrapper"
    @click="navigationStore.currentCategoryId = category.id"
  >
    <div class="image-wrapper">
      <img
        :src="imageURL(chooseCategoryMedia(category.id))"
        :alt="mediaOfCategory(chooseCategoryMedia(category.id))?.alt_text"
      >
      <h4 class="category-title">
        {{ category.name }}
      </h4>
    </div>
    <div>{{ postStore.postsByCategory(category.id).length }} Posts</div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { WP_REST_API_Category } from 'wp-types'

const { category } = defineProps<{
  category: WP_REST_API_Category
}>()

const postStore = usePostStore()
const mediaStore = useMediaStore()
const navigationStore = useNavigationStore()

const chooseCategoryMedia = computed(() => {
  return (categoryId: number) => {
    const categoryPosts = postStore.postsByCategory(categoryId)
    return categoryPosts[0]?.featured_media || 0
  }
})

const mediaOfCategory = computed(() => {
  return (mediaID: number) => {
    return mediaStore.media.find(media => media.id === mediaID)
  }
})

const imageURL = computed(() => {
  return (mediaID: number) => {
    // @ts-expect-error: media_details object is not defined in wp-types
    // (property) media_details: {
    //     [k: string]: unknown;
    // }
    return mediaStore.media.find(media => media.id === mediaID)
      ?.media_details.sizes.thumbnail.source_url
  }
})
</script>

<style scoped lang="scss">
.card-wrapper {
  text-decoration: none;
  width: clamp(200px, 20vw, 400px);

  .image-wrapper {
    position: relative;
    width: 12rem;
    height: 8rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .category-title {
      position: absolute;
      bottom: 1vw;
      left: 1vw;

      font-size: large;
      color: white;
      text-shadow: 1px 1px 2px black, -1px -1px 4px steelblue;
    }
  }

}
</style>
