<template>
  <div>
    <OverviewFilterCategory class="filter" />
    <ul class="category-list-container">
      <!-- FIXME style category cards -->
      <li
        v-for="category in categoriesFiltered"
        :key="category.id"
        class="category-wrapper"
      >
        <OverviewCardCategory :category="category" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const navigationStore = useNavigationStore()
const categoryStore = useCategoryStore()

onMounted(() => {
  navigationStore.resetFilterSelection()
})

const categoriesFiltered = computed(() => {
  return categoryStore.categories.filter((category) => {
    const hasPosts = Boolean(category.count)
    if (!hasPosts) return false

    const nothingIsSelected = navigationStore.selectedTags.length === 0
    if (nothingIsSelected) return true

    const isSelected = navigationStore.currentFilterSelection[category.parent || 0]
    return isSelected
  })
})
</script>

<style scoped lang="scss">
.filter {
  margin: 1rem auto;
}

.category-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin: 0 5vw;
    padding: 1rem 0;

    .category-wrapper {
        // margin: 1rem auto;
        // padding: 0 3rem;

    }
}
</style>
