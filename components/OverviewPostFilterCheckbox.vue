<template>
  <div class="filter-item-container">
    <input
      :id="filterItem.id.toString()"
      type="checkbox"
      :checked="navigationStore.selectedTags.includes(filterItem.id)"
      :disabled="disabled"
      @click="navigationStore.toggleTagFilter(+filterItem.id)"
    >
    <label :for="filterItem.id.toString()">
      {{ filterItem.name }}
    </label>
  </div>
</template>

<script setup lang="ts">
import type { FILTER_Item } from '@/types/filter.js'

const { filterItem, disabled } = defineProps<{
  filterItem: FILTER_Item
  disabled?: boolean
}>()

const navigationStore = useNavigationStore()

// FIXME enable long story and short story filters
</script>

<style scoped lang="scss">
.filter-item-container {

  label {
    padding: .5rem;
    cursor: pointer;
  }

  input[type="checkbox"] {
    opacity: 0;
    width: 0;

    &:checked+label {
      color: red;
      background-color: aquamarine;
    }

    &:disabled+label {
      color: lightsteelblue;
      cursor: not-allowed
    }
  }

}
</style>
