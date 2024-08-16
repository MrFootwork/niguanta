import { defineStore } from 'pinia'
import type { WP_REST_API_Tags } from 'wp-types'

export const useTagStore = defineStore('tags', () => {
  // STATE
  const tags = ref<WP_REST_API_Tags>([])

  // ACTIONS
  async function fetchTags() {
    tags.value = []
    const tagsFetched = await $fetch('/api/tags')
    const tagsFiltered = tagsFetched.filter(tag => tag.count !== 0)
    tags.value.push(...tagsFiltered as unknown as WP_REST_API_Tags)
  }

  // GETTERS

  return {
    // state
    tags,
    // actions
    fetchTags,
    // getters
  }
})
