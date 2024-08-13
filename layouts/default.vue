<template>
  <div class="layout-container">
    <header class="header-container ingrid-darling">
      <NuxtLink
        :to="'/'"
        class="link header-link"
      >
        Niguanta
      </NuxtLink>
    </header>
    <nav class="navigation-container istok-web-regular">
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
    <slot class="content-container" />
    <div>
      <div>Posts Count {{ postCount }}</div>
      <div>Full Path: {{ $route.fullPath }}</div>
      <div>Params: {{ $route.params }}</div>
      <div>Page Name: {{ $route.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/posts'
import { useCategoryStore } from '@/stores/categories'
import { usePageStore } from '@/stores/pages'

const postsStore = usePostStore()
const postCount = computed(() => postsStore.postCount)

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)

const navbarItems = [665, 843] // Blog, Contact
const visiblePages = computed(() => navbarItems.map(targetPageId => pages.value.find(page => page.id === targetPageId)))

onBeforeMount(() => {
  if (categories.value.length === 0) {
    categoryStore.fetchCategories()
  }

  if (pages.value.length === 0) {
    pageStore.fetchPages()
  }
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

  .navigation-container>ul {
    display: flex;
    flex-flow: row;
    align-items: center;

    margin: 2rem 0;

    .nav-link {
      padding: 2rem 2vw;
    }
  }
}
</style>
