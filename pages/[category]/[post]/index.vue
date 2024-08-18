<template>
  <div>
    <h5>Post Index</h5>
    <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
    <!-- <pre>currentPost: {{ currentPost }}</pre> -->
    <article>
      <h1 v-html="currentPost?.title.rendered" />
      <span v-html="currentPost?.content.rendered" />
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

onBeforeMount(async () => {
  const postsIncludeSlug = computed(() => postStore.postsIncludeSlug(slug || ''))
  const slugPostId = postStore.getPostIdBySlug(slug || '')?.id

  if (postsIncludeSlug.value) {
    postStore.setCurrentPost(slugPostId || 0)
  }

  // faster fetch, when visiting post page on first load
  if (!postsIncludeSlug.value && slug) {
    await postStore.fetchPostBySlug(slug)
  }
})
</script>

<style scoped lang="scss">
article {
  max-width: var(--content-width);

  & :deep(p) {
    margin: .5rem 0;
    max-width: 95dvw;
  }

  & :deep(p):has(img) {
    // outline: 1px solid red;
  }
}
</style>
