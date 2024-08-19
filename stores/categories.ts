import { defineStore } from 'pinia'
import type { WP_REST_API_Categories } from 'wp-types'

import { useNavigationStore } from '@/stores/navigation'

export const useCategoryStore = defineStore('categories', () => {
  // Navigation Store
  const navigationStore = useNavigationStore()
  const postStore = usePostStore()
  const categoryStore = useCategoryStore()

  const { currentCategoryId } = storeToRefs(navigationStore)

  // STATE
  const categories = ref<WP_REST_API_Categories>([])

  // ACTIONS
  async function fetchCategories() {
    categories.value = []
    const fetchedCategories = await $fetch('/api/categories')
    categories.value.push(...fetchedCategories as unknown as WP_REST_API_Categories)
  }

  // GETTERS
  function getCategoryIdBySlug(searchSlug: string) {
    return categories.value.find(category => category.slug === searchSlug)?.id || 0
  }

  function getCategorySlugById(searchId: number) {
    return categories.value.find(category => category.id === searchId)?.slug || ''
  }

  function getCategoryNameById(searchId: number) {
    return categories.value.find(category => category.id === searchId)?.name || ''
  }

  function getCategoryById(searchId: number) {
    return categories.value.find(category => category.id === searchId)
  }

  const currentCategory = computed(() => {
    return categories.value.find(category => category.id === currentCategoryId.value)
  })

  const categoryParentOfSelectedPosts = computed(() => {
    const parents: number[] = []

    postStore.postsFilteredByTagSelection.forEach((post) => {
      post.categories?.forEach((categoryId) => {
        const categoryParent = categoryStore.getCategoryById(categoryId)?.parent || 0
        if (!parents.includes(categoryParent)) parents.push(categoryParent)
      })
    })

    return parents
  })

  return {
    // state
    categories,
    // actions
    fetchCategories,
    // getters
    getCategoryIdBySlug,
    getCategorySlugById,
    getCategoryNameById,
    getCategoryById,
    currentCategory,
    categoryParentOfSelectedPosts,
  }
})
