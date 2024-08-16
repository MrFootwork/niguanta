<template>
  <div class="filter-container">
    <div>{{ tags.filter(tag => tag.count !== 1).length }}</div>
    <div>{{ tags.filter(tag => tag.count === 1).length }}</div>
    <div>{{ tags.length }}</div>
    <br>
    <!-- <pre>{{ tags }}</pre> -->
    <OverviewPostFilterCheckbox
      key="long"
      :filter-item="filterItemLong"
    />
    <OverviewPostFilterCheckbox
      key="short"
      :filter-item="filterItemShort"
    />
    <OverviewPostFilterCheckbox
      v-for="filterItem in filterItemsTags"
      :key="filterItem.id"
      :filter-item="filterItem"
    />
  </div>
</template>

<script setup lang="ts">
import type { FILTER_Item } from '@/types/filter.js'

const tagStore = useTagStore()
const { tags } = storeToRefs(tagStore)

const filterItemLong: FILTER_Item = {
  id: 'long',
  name: 'Long Stories',
}

const filterItemShort: FILTER_Item = {
  id: 'short',
  name: 'Short Stories',
}

const filterItemsTags = computed(() => {
  return tags.value.filter(({ id }) => id > 1).slice(0, 20).map((tag): FILTER_Item => {
  // return tags.value.map((tag): FILTER_Item => {
    return {
      id: tag.id.toString(),
      name: tag.name,
    }
  })
})
</script>

<style scoped lang="scss">
.filter-container {
  outline: 1px solid red
}
</style>
