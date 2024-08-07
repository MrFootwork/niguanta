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
        :to="{ path: category.slug, query: { categoryId: category.id } }"
      >
        {{ category.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WP_REST_API_Categories } from 'wp-types'

const { data } = await useAsyncData('categories', () =>
  $fetch('/api/categories'),
)
const categories = data.value as unknown as WP_REST_API_Categories

// const stringToPath = (text: string): string => text.replaceAll(/\s+/g, '-').toLocaleLowerCase()
</script>

<style scoped>
.category {
  margin: 1rem 0;
}
</style>
