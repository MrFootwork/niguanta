import { defineStore } from 'pinia'
import type { WP_REST_API_Tags } from 'wp-types'

const unset = 0

export const useTagStore = defineStore('tags', () => {
  // STATE
  const tags = ref<WP_REST_API_Tags>([])
  const currentTagId = ref<number>(unset)

  // ACTIONS
  async function fetchTags() {
    tags.value = []
    const fetchedTags = await $fetch('/api/tags')
    tags.value.push(...fetchedTags as unknown as WP_REST_API_Tags)
  }

  function setTagId(newId: number) {
    currentTagId.value = newId
  }

  // GETTERS
  const currentTag = computed(() => {
    return tags.value.find(category => category.id === currentTagId.value)
  })

  return {
    // state
    tags,
    currentTagId,
    // actions
    fetchTags,
    setTagId,
    // getters
    currentTag,
  }
})
