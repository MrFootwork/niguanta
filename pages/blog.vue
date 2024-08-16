<template>
  <div class="page-container">
    THIS IS BLOG

    <OverviewPostFilter />
    <!-- FIXME Make flexbox or grid -->
    <div class="post-container">
      <OverviewPostCard
        v-for="post in postStore.posts"
        :key="post.id"
        :post="post"
        class="overviewPostCard"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const postStore = usePostStore()
// FIXME filter posts on filter selection
</script>

<style scoped lang="scss">
.page-container {

  .post-container {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;

  .overviewPostCard {
    padding: .5rem;
  }
}
}
</style>
