<template>
  <div class="filter-container">
    <OverviewFilterCheckbox
      key="long"
      :filter-item="filterItemLong"
      class="filter-item"
      :disabled="!isIncludedInFilteredPosts(IDs.longStory)"
    />
    <OverviewFilterCheckbox
      key="short"
      :filter-item="filterItemShort"
      class="filter-item"
      :disabled="!isIncludedInFilteredPosts(IDs.shortStory)"
    />
  </div>
</template>

<script setup lang="ts">
import IDs from '@/data/storyTypeID.json'
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
  justify-content: center;

  .filter-item {

  }
}
</style>
