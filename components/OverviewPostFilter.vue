<template>
  <div>
    <pre>{{ tagStore.tags }}</pre>
    FILTER
    <OverviewPostFilterCheckbox
      v-for="tag in tagStore.tags"
      :key="tag.id"
    />
  </div>
</template>

<script setup lang="ts">
const tagStore = useTagStore()
</script>

<style scoped>

</style>
