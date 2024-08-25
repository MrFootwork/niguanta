<template>
  <div>
    <h5>Category Index</h5>

    <div>Category Count {{ categories.length }}</div>

    <div
      v-for="post in postsByCurrentCategory"
      :key="post.id"
    >
      <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
      <NuxtLink
        class="link-to-post"
        :to="{
          path: `${currentCategory?.slug}/${post.slug}`,
        }"
        @click="navigationStore.currentPostId = post.id"
        v-html="post?.title?.rendered"
      />
      <!-- eslint-enable -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'
import { useCategoryStore } from '@/stores/categories'
import { usePostStore } from '@/stores/posts'

const route = useRoute()
const categorySlug = route.path.slice(1)

const navigationStore = useNavigationStore()
const categoryStore = useCategoryStore()
const postStore = usePostStore()

const { categories, currentCategory } = storeToRefs(categoryStore)
const { postsByCurrentCategory } = storeToRefs(postStore)

onMounted(async () => {
  navigationStore.currentCategoryId = categoryStore.getCategoryIdBySlug(categorySlug)
  const postByCategoryCountMatch = postsByCurrentCategory.value.length === currentCategory.value?.count
  if (!postByCategoryCountMatch) await postStore.fetchPostsByCategory()
})
</script>

<style scoped>
.link-to-post {
  color: tomato;
}
</style>
