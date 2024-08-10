<template>
  <div>
    <h5>Home</h5>
    <div
      v-for="category in validCategories"
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
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories'

const categoryStore = useCategoryStore()
const { validCategories } = storeToRefs(categoryStore)

onBeforeMount(() => {
  if (validCategories.value.length === 0) {
    categoryStore.fetchCategories()
  }
})
</script>

<style scoped>
.category {
  margin: 1rem 0;
}
</style>
