import { defineStore } from 'pinia'
import type { WP_REST_API_Categories } from 'wp-types'

import { useNavigationStore } from '@/stores/navigation'

export const useCategoryStore = defineStore('categories', () => {
  // Navigation Store
  const navigationStore = useNavigationStore()
  const { currentCategoryId } = storeToRefs(navigationStore)

  // STATE
  const categories = ref<WP_REST_API_Categories>([])

  // ACTIONS
  async function fetchCategories() {
    categories.value = []
    const fetchedCategories = await $fetch('/api/categories')
    categories.value.push(...fetchedCategories as unknown as WP_REST_API_Categories)
  }

  // function setCategoryId(newId: number) {
  //   currentCategoryId.value = newId
  // }

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
    // currentCategoryId,
    // actions
    fetchCategories,
    // setCategoryId,
    // getters
    getCategoryIdBySlug,
    currentCategory,
  }
})
