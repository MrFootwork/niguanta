<template>
  <div>
    <h5>Post Index</h5>
    <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
    <!-- <pre>currentPost: {{ currentPost }}</pre> -->
    <!-- <pre>slug: {{ slug }}</pre> -->
    <h1 v-html="currentPost?.title.rendered" />
    <article>
      <p v-html="currentPost?.content.rendered" />
    </article>
    <!-- eslint-enable -->
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts'

const route = useRoute()
const slug = route.path.split('/').at(-1)

const postsStore = usePostsStore()
const { currentPost } = storeToRefs(postsStore)

onBeforeMount(() => {
  const postsIncludeSlug = computed(() => postsStore.postsIncludeSlug(slug || ''))
  const slugPostId = postsStore.getPostIdBySlug(slug || '')?.id
  console.log('🚀 ~ onBeforeMount ~ slugPostId:', slugPostId)

  if (postsIncludeSlug.value) {
    postsStore.setCurrentPost(slugPostId || 0)
  }

  if (!postsIncludeSlug.value && slug) {
    postsStore.fetchPostBySlug(slug)
  }
})
</script>

<style scoped></style>
