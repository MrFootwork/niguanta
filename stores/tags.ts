import { defineStore } from 'pinia'
import type { WP_REST_API_Tags } from 'wp-types'

export const useTagStore = defineStore('tags', () => {
  // STATE
  const postStore = usePostStore()
  const categoryStore = useCategoryStore()
  const tags = ref<WP_REST_API_Tags>([])

  // ACTIONS
  async function fetchTags() {
    tags.value = []
    const tagsFetched = await $fetch('/api/tags')
    tags.value.push(...tagsFetched as unknown as WP_REST_API_Tags)
  }

  // GETTERS
  const tagsOfSelectedPosts = computed(() => {
    const tags: number[] = []

    postStore.postsFilteredByTagSelection.forEach((post) => {
      post.tags?.forEach((tag) => {
        if (!tags.includes(tag)) tags.push(tag)
      })
    })

    return tags
  })

  return {
    // state
    tags,
    // actions
    fetchTags,
    // getters
    tagsOfSelectedPosts,
  }
})
