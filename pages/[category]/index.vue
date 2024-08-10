<template>
  <div>
    <h5>Category Index</h5>

    <div>{{ validCategories.length }}</div>

    <div
      v-for="post in postsByCategory"
      :key="post.id"
    >
      <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
      <NuxtLink
        class="link-to-post"
        :to="{
          path: `${currentCategory}/${post.slug}`,
        }"
        @click="postStore.setCurrentPost(post.id)"
        v-html="post?.title?.rendered"
      />
      <!-- eslint-enable -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/posts'
import { useCategoryStore } from '@/stores/categories'

const route = useRoute()
const categorySlug = route.path.slice(1)

const categoryStore = useCategoryStore()
const { validCategories, currentCategory } = storeToRefs(categoryStore)

const postStore = usePostStore()
const { postsByCategory } = storeToRefs(postStore)

// FIXME create navigation store

onMounted(async () => {
  const categoryId = computed(() => categoryStore.getCategoryIdBySlug(categorySlug))

  if (!categoryId.value) {
    await categoryStore.fetchCategories()
    categoryStore.setCategoryId(categoryId.value)
  }

  postStore.setCurrentCategory(+(categoryId.value || 0))
  // FIXME only fetch posts, if post count doesn't match postcount in category
  // if it doesn't match, delete store for these category first
  // then fetch
  // BUG visiting category twice, fetches twice
  postStore.fetchPostsByCategory()
})
</script>

<style scoped>
.link-to-post {
  color: tomato;
}
</style>
