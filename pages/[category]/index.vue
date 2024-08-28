<template>
  <ul class="card-container">
    <li
      v-for="post in postStore.postsByCurrentCategory"
      :key="post.id"
    >
      <OverviewCardPost
        :post="post"
        class="card-component"
        @click="navigationStore.currentPostId = post.id"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'
import { usePostStore } from '@/stores/posts'

const navigationStore = useNavigationStore()
const postStore = usePostStore()
</script>

<style scoped lang="scss">
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-items: stretch;
  height: 100%;
  gap: 1rem;

  .card-component {
    margin: 1rem 0;
    width: 15rem;
    text-align: left;
    outline: 1px solid red;
    text-decoration: none;

  }

}
</style>
