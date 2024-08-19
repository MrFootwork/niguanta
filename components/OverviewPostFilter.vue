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
      :disabled="!isIncludedInFilteredPosts(IDs.longStory)"
    />
    <OverviewPostFilterCheckbox
      key="short"
      :filter-item="filterItemShort"
      class="filter-item"
      :disabled="!isIncludedInFilteredPosts(IDs.shortStory)"
    />
    <OverviewPostFilterCheckbox
      v-for="filterItem in filterItemsTags"
      :key="filterItem.id"
      class="filter-item"
      :filter-item="filterItem"
      :disabled="!isIncludedInFilteredPosts(filterItem.id)"
    />
  </div>
</template>

<script setup lang="ts">
import IDs from '@/data/IDs.json'
import type { FILTER_Item } from '@/types/filter.js'

const navigationStore = useNavigationStore()
const tagStore = useTagStore()
const categoryStore = useCategoryStore()

const filterItemLong = computed(() => {
  return {
    id: IDs.longStory,
    name: categoryStore.getCategoryNameById(IDs.longStory),
  } as FILTER_Item
})
const filterItemShort = computed(() => {
  return {
    id: IDs.shortStory,
    name: categoryStore.getCategoryNameById(IDs.shortStory),
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

const isIncludedInFilteredPosts = computed(() => {
  return (searchId: number) => {
    if (navigationStore.storyTypes.includes(searchId)) {
      return categoryStore.categoryParentOfSelectedPosts.includes(searchId)
    }

    return tagStore.tagsOfSelectedPosts.includes(searchId)
  }
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
