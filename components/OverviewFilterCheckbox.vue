<template>
  <div class="filter-item-container">
    <input
      v-if="radioName === 'storyType'"
      :id="filterItem.id.toString()"
      type="radio"
      name="story-type"
      :checked="navigationStore.selectedTags.includes(filterItem.id)"
      @click="navigationStore.toggleTagFilter(+filterItem.id)"
    >
    <input
      v-else
      :id="filterItem.id.toString()"
      type="checkbox"
      :checked="navigationStore.selectedTags.includes(filterItem.id)"
      :disabled="disabled"
      @click="navigationStore.toggleTagFilter(+filterItem.id)"
    >

    <label
      :for="filterItem.id.toString()"
      :title="''+filterItem.id"
    >
      {{ filterItem.name }}
    </label>
  </div>
</template>

<script setup lang="ts">
import type { FILTER_Item } from '@/types/filter.js'

const { filterItem, disabled, radioName } = defineProps<{
  filterItem: FILTER_Item
  disabled?: boolean
  radioName?: string
}>()

const navigationStore = useNavigationStore()
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

  input[type="radio"] {
    opacity: 0;
    width: 0;

    &:checked+label {
      color: red;
      background-color: aquamarine;
    }

    &:disabled+label {
      color: lightsteelblue;
      // cursor: not-allowed
    }
  }

}
</style>
