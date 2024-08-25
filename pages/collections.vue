<template>
  <div class="category-list-container">
    <!-- FIXME style category cards -->
    <!-- FIXME add long/short filter -->
    <div
      v-for="category in categoryStore.categories.filter(cat => cat.count)"
      :key="category.id"
      class="category-wrapper"
    >
      <NuxtLink :to="{ path: category.slug }">

        <div>{{ category.id }}</div>
        <div>{{ category.name }}</div>

        <!-- <div>{{ chooseCategoryMedia(category.id) }}</div> -->

        <!-- <pre>{{ mediaStore.media.find(media => media.id ===chooseCategoryMedia(category.id))?.media_details.sizes.thumbnail.source_url }}</pre> -->
        <!-- <pre>{{ imageURL(chooseCategoryMedia(category.id)) }}</pre> -->
        <!-- <pre>{{ mediaOfCategory(chooseCategoryMedia(category.id))?.title.rendered }}</pre> -->
        <img
          :src="imageURL(chooseCategoryMedia(category.id))"
          :alt="mediaOfCategory(chooseCategoryMedia(category.id))?.alt_text"
        >
        <div>{{ postStore.postsByCategory(category.id).length }} Posts</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const categoryStore = useCategoryStore()
const postStore = usePostStore()
const mediaStore = useMediaStore()

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
    return mediaStore.media.find(media => media.id === mediaID)?.media_details.sizes.thumbnail.source_url
  }
})

// const chooseCategoryMedia = (categoryId: number) => {
//   return postStore.postsByCategory(categoryId)[0].featured_media
// }

// const chooseCategoryMedia = computed(() => {
//   return (categoryId: number) => {
//     return postStore.postsByCategory(categoryId)[0].featured_media
//   }
// })
// const chooseCategoryMedia = computed(() => {
//   // const chosenCategoryMedia = (categoryId: number) => {
//   //   return postStore.postsByCategory(categoryId)[0].featured_media
//   // }
//   return postStore.postsByCategory(categoryId)[0].featured_media
//   // return mediaStore.media.find(media => media.id === chooseCategoryMedia.value.id)
// })
</script>

<style scoped lang="scss">
.category-list-container {
    display: flex;
    flex-wrap: wrap;

    .category-wrapper {
        margin: 1rem 5rem;

    }
}
</style>
