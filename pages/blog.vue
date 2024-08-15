<template>
  <div>
    THIS IS BLOG

    <OverviewPostFilter />
    <div class="post-container">
      <!-- FIXME add most recent posts fast, even without media -->
      <OverviewPostCard
        v-for="post in postStore.posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const postStore = usePostStore()
</script>

<style scoped></style>
