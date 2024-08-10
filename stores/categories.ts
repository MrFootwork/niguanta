import { defineStore } from 'pinia'
import type { WP_REST_API_Categories } from 'wp-types'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<WP_REST_API_Categories>([])
  const validCategories = ref<WP_REST_API_Categories>([])

  // ACTIONS
  async function fetchCategories() {
    const fetchedCategories = await $fetch('/api/categories') as unknown as WP_REST_API_Categories
    categories.value.push(...fetchedCategories)
    validCategories.value.push(...fetchedCategories.filter(category => category.count !== 0))
  }

  // GETTERS

  return {
    validCategories,
    fetchCategories,
  }
})
