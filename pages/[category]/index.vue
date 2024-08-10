<template>
  <div>
    <h5>Category Index</h5>
    <div
      v-for="post in posts"
      :key="post.id"
    >
      <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
      <NuxtLink
        class="link-to-post"
        :to="{
          path: `${currentCategory}/${post.slug}`,
        }"
        @click="selectPost(post.id)"
        v-html="post?.title?.rendered"
      />
      <!-- eslint-enable -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/posts'

// FIXME use stores and don't rely on url queries
// 1. check if category slug exists
// 2. fetch all category posts

const route = useRoute()
const { categoryId } = route.query
const currentCategory = route.path

const postsStore = usePostStore()

if (categoryId) {
  postsStore.setCurrentCategory(+(categoryId || 0))
}

const posts = computed(() => postsStore.postsByCategory)

const selectPost = (postId: number) => postsStore.setCurrentPost(postId)
</script>

<style scoped>
.link-to-post {
  color: tomato;
}
</style>
