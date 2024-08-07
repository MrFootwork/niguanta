<template>
  <div>
    <h5>TEST</h5>
    <!-- <span v-html="posts"></span> -->
    <!-- <pre>{{ categories }}</pre> -->
    <div>Category Count {{ categories.length }}</div>
    <div
      v-for="cat in categories"
      :key="cat.id"
      class="card"
    >
      <div>{{ cat.id }}</div>
      <div>{{ cat.name }}</div>
    </div>
    <!-- <pre>{{ posts }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import type { WP_REST_API_Categories } from 'wp-types'

const categoriesData = await useAsyncData('posts', () => $fetch('/api/categories'))
const categories = categoriesData.data.value as unknown as WP_REST_API_Categories
</script>

<style scoped>
.card {
    margin: 1rem 0;
}
</style>
