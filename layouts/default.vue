<template>
  <div class="layout-container">
    <header
      ref="target"
      class="header-container ingrid-darling"
    >
      <NuxtLink
        :to="'/'"
        class="link header-link"
      >
        Niguanta
      </NuxtLink>
    </header>

    <nav
      class="navigation-container istok-web-regular"
      :class="{ sticking }"
    >
      <ul>
        <li
          v-for="page in pages"
          :key="page.id"
        >
          <NuxtLink
            :to="`/${page.slug}`"
            class="link nav-link"
          >
            {{ page.title.rendered }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div style="position: fixed; bottom: 0; right: 0; background-color: rgba(160, 230, 230, 0.5)">
      <div>Navigation Page: {{ currentPageId }}</div>
      <div>Navigation Category: {{ currentCategoryId }}</div>
      <div>Navigation Post: {{ currentPostId }}</div>
      <br>
      <div>Posts Count {{ posts.length }}</div>
      <div>Full Path: {{ $route.fullPath }}</div>
      <div>Params: {{ $route.params }}</div>
      <div>Page Name: {{ $route.name }}</div>
    </div>

    <slot class="content-container" />
  </div>
</template>

<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'
import { usePageStore } from '@/stores/pages'
import { useCategoryStore } from '@/stores/categories'
import { usePostStore } from '@/stores/posts'

const route = useRoute()
const categorySlug = route.params.category
// const postSlug = route.params.post
// console.log('🚀 ~ categorySlug, postSlug:', categorySlug, postSlug)

const tagStore = useTagStore()
const { tags } = storeToRefs(tagStore)

const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

const postStore = usePostStore()
const { posts } = storeToRefs(postStore)

const mediaStore = useMediaStore()
const { media } = storeToRefs(mediaStore)

const navigationStore = useNavigationStore()
const { currentPageId, currentCategoryId, currentPostId } = storeToRefs(navigationStore)

// Set Navigation
onBeforeMount(async () => {
  if (pages.value.length === 0) {
    pageStore.fetchPages()
  }

  if (categories.value.length === 0) {
    categoryStore.fetchCategories()
    const categoryId = categoryStore.getCategoryIdBySlug(categorySlug as string)
    navigationStore.currentCategoryId = categoryId
  }

  if (tags.value.length === 0) {
    tagStore.fetchTags()
    navigationStore.initializeFilterSelection(tagStore.tags)
  }

  if (posts.value.length <= 1) {
    // fetch fails on first page load without timeout
    await setTimeout(() => 0, 0)
    await postStore.fetchAllPosts()
  }

  if (media.value.length === 0) {
    const mediaList = postStore.mediaOfPosts
    mediaStore.fetchMedia(mediaList)
  }
})

// Navbar sticky behavior
const target = ref<Element>()
const sticking = ref<boolean>(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { sticking.value = !entry.isIntersecting },
    { threshold: 0 },
  )
  observer.observe(target.value as Element)
})
</script>

<style scoped lang="scss">
.link {
  text-decoration: none;

  transition: all .2s ease-in-out;
  color: grey;

  &:hover {
    color: black
  }
}

.layout-container {
  width: 100%;

  display: flex;
  flex-flow: column;
  align-items: center;

  .header-container {
    font-size: 4rem;
    font-weight: 900;
    font-style: normal;

    margin: 2rem 0;

    .header-link {
      color: black
    }
  }

  .navigation-container {
    width: 100%;
    --nav-height: 1rem;
    position: sticky;
    top: 0;
    z-index: 1000;

    &.sticking {
      background-color: rgb(250, 240, 230, .8);
    }

    &>ul {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;

      margin: var(--nav-height) 0;

      li {

        .nav-link {
          padding: var(--nav-height) 2vw;
        }
      }
    }
  }
}
</style>
