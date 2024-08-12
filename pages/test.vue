<template>
  <div>
    <h5>TEST</h5>
    <!-- <pre>{{ categories[6] }}</pre> -->
    <div>Valid Category Count {{ categories.length }}</div>
    <div
      v-for="cat in categories"
      :key="cat.id"
      class="card"
    >
      <div>{{ cat.id }}</div>
      <div>{{ cat.name }}</div>
      <div>count: {{ cat.count }}</div>
    </div>
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
.card {
    margin: 1rem 0;
}
</style>
