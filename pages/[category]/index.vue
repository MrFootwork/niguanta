<template>
  <div>
    Category Index
    <div
      v-for="post in posts"
      :key="post.id"
    >
      <!-- <pre>{{ post }}</pre> -->
      <!-- <NuxtLink class="link-to-post" v-html="post.title.rendered" /> -->
      <!-- <div>{{ post }}</div> -->
      <NuxtLink
        class="link-to-post"
        :to="{
          path: `${currentCategory}/${post.slug}`,
          query: { postId: post.id },
        }"
        v-html="post.title.rendered"
      />
      <div>{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WP_REST_API_Posts } from 'wp-types'

import { useCounterStore } from '@/stores/posts'

const route = useRoute()
const { categoryId } = route.query
const currentCategory = route.path

// FIXME create pinia store and store posts for reuse
const { data } = await useAsyncData('posts', () =>
  $fetch(`/api/posts?categoryId=${categoryId}`),
)
const posts = data.value as unknown as WP_REST_API_Posts

// access the `store` variable anywhere in the component ✨
const store = useCounterStore()
const value = store.name
</script>

<style scoped>
.link-to-post {
  color: tomato;
}
</style>
