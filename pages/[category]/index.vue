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
import { useNavigationStore } from '@/stores/navigation'
import { useCategoryStore } from '@/stores/categories'
import { usePostStore } from '@/stores/posts'

const route = useRoute()
const categorySlug = route.path.slice(1)

const navigationStore = useNavigationStore()

const categoryStore = useCategoryStore()
const { categories, currentCategory } = storeToRefs(categoryStore)

const postStore = usePostStore()
const { postsByCategory } = storeToRefs(postStore)

const categoryId = computed(() => categoryStore.getCategoryIdBySlug(categorySlug))

onMounted(async () => {
  navigationStore.setCategoryId(categoryId.value)
  const postByCategoryCountMatch = postsByCategory.value.length === currentCategory.value?.count
  if (!postByCategoryCountMatch) await postStore.fetchPostsByCategory()
})
</script>

<style scoped>
.link-to-post {
  color: tomato;
}
</style>
