<template>
  <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
  <div>
    <h5>Post Index</h5>
    <div class="hero-container">
      <img
        :src="src"
        :alt="currentMedia?.alt_text"
        class="hero-image"
      >
      <h1
        class="hero-title"
        v-html="currentPost?.title.rendered"
      />
    </div>

    <article>
      <span v-html="currentPost?.content.rendered" />
    </article>
  </div>
  <!-- eslint-enable -->
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/posts'

const route = useRoute()
const postSlug = route.path.split('/').at(-1)
const categorySlug = route.path.split('/').at(-2)

const navigationStore = useNavigationStore()
const categoryStore = useCategoryStore()
const postStore = usePostStore()
const mediaStore = useMediaStore()

const { currentPost } = storeToRefs(postStore)

const currentMedia = computed(() => {
  return mediaStore.media.find(media => media.id === currentPost.value?.featured_media)
})

const src = computed(() => {
  // @ts-expect-error: media_details object is not defined in wp-types
  // (property) media_details: {
  //     [k: string]: unknown;
  // }
  return currentMedia.value?.media_details.sizes?.large?.source_url
})

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
.hero-container {
  width: 100%;
  height: 25rem;
  overflow: hidden;
  position: relative;

  margin-bottom: 1rem;

  img.hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 30%;
  }

  .hero-title {
    position: absolute;
    bottom: 0;
    margin: 1rem;

    color: white;
    font-size: 5rem;
    text-shadow: 1px 1px 2px black, -1px -1px 4px steelblue;
  }
}

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
