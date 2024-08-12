<template>
  <div>
    <header class="ingrid-darling">
      Niguanta
    </header>
    <nav>
      <ul>
        <li
          v-for="category in categories"
          :key="category.id"
        >
          <span>{{ category.name }} {{ category.id }}</span>
        </li>
      </ul>
    </nav>
    <slot />
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

const navbarItems = [
  665,
  843,
]

const postsStore = usePostStore()
const postCount = computed(() => postsStore.postCount)

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

onBeforeMount(() => {
  if (categories.value.length === 0) {
    categoryStore.fetchCategories()
  }
})
</script>

<style scoped lang="scss">

</style>
