<template>
  <div>
    <h5>Category Index</h5>

    <div>Category Count {{ categories.length }}</div>

    <div
      v-for="post in postsByCategory"
      :key="post.id"
    >
      <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
      <NuxtLink
        class="link-to-post"
        :to="{
          path: `${currentCategory?.slug}/${post.slug}`,
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
const { categories, currentCategory } = storeToRefs(categoryStore)
const categoryId = computed(() => categoryStore.getCategoryIdBySlug(categorySlug))

const postStore = usePostStore()
const { postsByCategory } = storeToRefs(postStore)

// FIXME create navigation store

onMounted(async () => {
  if (!categoryId.value) {
    await categoryStore.fetchCategories()
  }

  categoryStore.setCategoryId(categoryId.value)
  postStore.setCurrentCategory(+(categoryId.value))
  const postByCategoryCountMatch = postsByCategory.value.length === currentCategory.value?.count
  if (!postByCategoryCountMatch) await postStore.fetchPostsByCategory()
})
</script>

<style scoped>
.link-to-post {
  color: tomato;
}
</style>
