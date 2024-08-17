<template>
  <div class="filter-container">
    <!-- <div>{{ tags.filter(tag => tag.count !== 1).length }}</div>
    <div>{{ tags.filter(tag => tag.count === 1).length }}</div>
    <div>{{ tags.length }}</div>
    <br> -->
    <!-- <pre>{{ tags }}</pre> -->
    <OverviewPostFilterCheckbox
      key="long"
      :filter-item="filterItemLong"
      class="filter-item"
    />
    <OverviewPostFilterCheckbox
      key="short"
      :filter-item="filterItemShort"
      class="filter-item"
    />
    <OverviewPostFilterCheckbox
      v-for="filterItem in filterItemsTags"
      :key="filterItem.id"
      class="filter-item"
      :filter-item="filterItem"
      :disabled="!isIncludedInPosts(filterItem.id)"
    />
  </div>
</template>

<script setup lang="ts">
import type { FILTER_Item } from '@/types/filter.js'

const tagStore = useTagStore()

const categoryStore = useCategoryStore()

const idOfLongStories = 804348
const idOfShortStories = 546

const filterItemLong = computed(() => {
  return {
    id: idOfLongStories,
    name: categoryStore.getCategoryNameById(idOfLongStories),
  } as FILTER_Item
})
const filterItemShort = computed(() => {
  return {
    id: idOfShortStories,
    name: categoryStore.getCategoryNameById(idOfShortStories),
  } as FILTER_Item
})

const filterItemsTags = computed(() => {
  return tagStore.tags.map((tag): FILTER_Item => {
    return {
      id: tag.id,
      name: tag.name,
    }
  })
})

const isIncludedInPosts = computed(() => {
  return (searchId: number) => tagStore.tagsOfSelectedPosts.includes(searchId)
})
</script>

<style scoped lang="scss">
.filter-container {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  gap: .5rem;

  .filter-item {

  }
}
</style>
