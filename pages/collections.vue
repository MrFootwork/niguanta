<template>
  <div class="category-list-container">
    this is collections
    <div
      v-for="category in categoryStore.categories"
      :key="category.id"
      class="category-wrapper"
    >
      <NuxtLink :to="{ path: category.slug }">
        <div>{{ category.id }}</div>
        <div>{{ category.name }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const categoryStore = useCategoryStore()
</script>

<style scoped lang="scss">
.category-list-container {
    display: flex;
    flex-wrap: wrap;

    .category-wrapper {
        margin: 1rem 5rem;

    }
}
</style>
