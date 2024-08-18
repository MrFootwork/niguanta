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
const postSlug = route.path.split('/').at(-1)
const categorySlug = route.path.split('/').at(-2)

const categoryStore = useCategoryStore()
const postStore = usePostStore()
const navigationStore = useNavigationStore()

const { currentPost } = storeToRefs(postStore)

onBeforeMount(async () => {
  const postsIncludeSlug = computed(() => postStore.postsIncludeSlug(postSlug || ''))
  const slugPostId = postStore.getPostIdBySlug(postSlug || '')?.id

  if (postsIncludeSlug.value) {
    navigationStore.currentPostId = slugPostId || 0
    navigationStore.currentCategoryId = categoryStore.getCategoryIdBySlug(categorySlug || '')
  }

  // faster fetch, when visiting post page on first load
  if (!postsIncludeSlug.value && postSlug) {
    await postStore.fetchPostBySlug(postSlug)
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
