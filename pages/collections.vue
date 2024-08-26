<template>
  <div>
    <OverviewFilterCategory />
    <ul class="category-list-container">
      <!-- FIXME style category cards -->
      <li
        v-for="category in categoriesFiltered"
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
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const navigationStore = useNavigationStore()
const categoryStore = useCategoryStore()
const postStore = usePostStore()
const mediaStore = useMediaStore()

onMounted(() => {
  navigationStore.resetFilterSelection()
})

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

const categoriesFiltered = computed(() => {
  return categoryStore.categories.filter((category) => {
    const hasPosts = Boolean(category.count)
    if (!hasPosts) return false

    const nothingIsSelected = navigationStore.selectedTags.length === 0
    if (nothingIsSelected) return true

    const isSelected = navigationStore.currentFilterSelection[category.parent || 0]
    return isSelected
  })
})
</script>

<style scoped lang="scss">
.category-list-container {
    display: flex;
    flex-wrap: wrap;

    .category-wrapper {
        margin: 1rem auto;
        padding: 0 3rem;

    }
}
</style>
