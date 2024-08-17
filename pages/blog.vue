<template>
  <div class="page-container">
    <OverviewPostFilter />
    <!-- FIXME Make flexbox or grid -->
    <div class="post-container">
      <OverviewPostCard
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
    // FIXME try grid for more consistent post layout with different counts
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;

    .overviewPostCard {
      display: none;
      padding: .5rem;

      &.filtered {
        display: block;
      }
    }
  }
}
</style>
