import { defineStore } from 'pinia'
import type { WP_REST_API_Categories } from 'wp-types'

const unset = 0

export const useCategoryStore = defineStore('categories', () => {
  // STATE
  const categories = ref<WP_REST_API_Categories>([])
  const currentCategoryId = ref<number>(unset)

  // ACTIONS
  async function fetchCategories() {
    // TODO avoid duplicate categories from unintentional fetch
    const fetchedCategories = await $fetch('/api/categories') as unknown as WP_REST_API_Categories
    categories.value.push(...fetchedCategories)
  }

  function setCategoryId(newId: number) {
    currentCategoryId.value = newId
  }

  // GETTERS
  function getCategoryIdBySlug(searchSlug: string) {
    return categories.value.find(category => category.slug === searchSlug)?.id || 0
  }

  const currentCategory = computed(() => {
    return categories.value.find(category => category.id === currentCategoryId.value)
  })

  return {
    // state
    categories,
    currentCategoryId,
    // actions
    fetchCategories,
    setCategoryId,
    // getters
    getCategoryIdBySlug,
    currentCategory,
  }
})
