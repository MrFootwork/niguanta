<template>
  <div>
    <!-- FIXME register selection -->
    <div>{{ filterItem.name }}</div>
    <!-- <pre>{{ filterItem.id }}</pre> -->
  </div>
</template>

<script setup lang="ts">
import type { FILTER_Item } from '@/types/filter.js'

const { filterItem } = defineProps<{
  filterItem: FILTER_Item
}>()
</script>

<style scoped>

</style>
