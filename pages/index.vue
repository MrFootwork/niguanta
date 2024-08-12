<template>
  <div>
    <h5>Home</h5>
    <div
      v-for="category in categories"
      :key="category.id"
      class="category"
    >
      <div>{{ category.name }}</div>
      <div>{{ category.link }}</div>
      <div>{{ category.id }}</div>
      <NuxtLink
        :to="{ path: category.slug }"
      >
        {{ category.name }}
      </NuxtLink>
    </div>

    <pre>{{ categories.slice(1, 4) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

onBeforeMount(() => {
  if (categories.value.length === 0) {
    categoryStore.fetchCategories()
  }
})
</script>

<style scoped>
.category {
  margin: 1rem 0;
}
</style>
