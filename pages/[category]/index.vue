<template>
  <div>
    Category Index
    <!-- <pre>{{ posts }}</pre> -->
    <div
      v-for="post in posts"
      :key="post.id"
    >
      <!-- <pre>{{ post }}</pre> -->
      <!-- <NuxtLink class="link-to-post" v-html="post.title.rendered" /> -->
      <!-- <div>{{ post }}</div> -->
      <NuxtLink
        class="link-to-post"
        :to="{
          path: `${currentCategory}/${post.slug}`,
        }"
        @click="selectPost(post.id)"
        v-html="post.title.rendered"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

const route = useRoute()
const { categoryId } = route.query
const currentCategory = route.path

const postsStore = usePostsStore()
postsStore.setCurrentCategory(+(categoryId || 0))
const posts = computed(() => postsStore.postsByCategory)

const selectPost = (postId: number) => postsStore.setCurrentPost(postId)
</script>

<style scoped>
.link-to-post {
  color: tomato;
}
</style>
