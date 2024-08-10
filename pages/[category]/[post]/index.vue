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
import { usePostStore } from '@/stores/posts'

const route = useRoute()
const slug = route.path.split('/').at(-1)

const postStore = usePostStore()
const { currentPost } = storeToRefs(postStore)

onBeforeMount(() => {
  const postsIncludeSlug = computed(() => postStore.postsIncludeSlug(slug || ''))
  const slugPostId = postStore.getPostIdBySlug(slug || '')?.id
  console.log('🚀 ~ onBeforeMount ~ slugPostId:', slugPostId)

  if (postsIncludeSlug.value) {
    postStore.setCurrentPost(slugPostId || 0)
  }

  if (!postsIncludeSlug.value && slug) {
    postStore.fetchPostBySlug(slug)
  }
})
</script>

<style scoped></style>
