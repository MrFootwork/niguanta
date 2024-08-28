<template>
  <div class="page-container">
    <OverviewFilterPost />
    <div class="post-container">
      <OverviewCardPost
        v-for="post in postStore.posts"
        :key="post.id"
        :post="post"
        class="overviewPostCard"
        :class="{ filtered: isSelectedByTagFilter(post.id) }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const postStore = usePostStore()

function isSelectedByTagFilter(postId: number): boolean {
  return Boolean(postStore.postsFilteredByTagSelection.find(post => post.id === postId))
}
</script>

<style scoped lang="scss">
.page-container {

  .post-container {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;

    .overviewPostCard {
      display: none;

      &.filtered {
        display: block;
      }
    }
  }
}
</style>
