import type { WP_REST_API_Attachments } from 'wp-types'

export const useMediaStore = defineStore('media', () => {
  // STATE
  const media = ref<WP_REST_API_Attachments>([])

  // ACTIONS
  async function fetchMedia() {
    media.value = []
    const mediaFetched = await $fetch('/api/media')
    media.value.push(...mediaFetched as unknown as WP_REST_API_Attachments)
  }

  // GETTERS

  return {
    // state
    media,
    // actions
    fetchMedia,
    // getters
  }
})
