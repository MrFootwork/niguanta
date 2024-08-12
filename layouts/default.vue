<template>
  <div class="layout-container">
    <header class="header-container ingrid-darling">
      Niguanta
    </header>
    <nav class="navigation-container">
      <ul>
        <li
          v-for="page in pages"
          :key="page.id"
        >
          <NuxtLink :to="page.slug">
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
.layout-container {
  width: min(100vdw, 900px);
  display: grid;
  // align-items: center;
  // justify-content: center;
  .header-container {
    font-size: 3rem;
    font-weight: 400;
    font-style: normal;
  }
}
</style>
