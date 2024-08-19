import { defineStore } from 'pinia'
import type { WP_REST_API_Pages } from 'wp-types'

const unset = 0

export const usePageStore = defineStore('pages', () => {
  // STATE
  const pages = ref<WP_REST_API_Pages>([])
  const currentPageId = ref<number>(unset)

  // ACTIONS
  async function fetchPages() {
    pages.value = []
    const fetchedPages = await $fetch('/api/pages')
    pages.value.push(...fetchedPages as unknown as WP_REST_API_Pages)
  }

  function setPageId(newId: number) {
    currentPageId.value = newId
  }

  // GETTERS
  const currentPage = computed(() => {
    return pages.value.find(category => category.id === currentPageId.value)
  })

  return {
    // state
    pages,
    currentPageId,
    // actions
    fetchPages,
    setPageId,
    // getters
    currentPage,
  }
})
