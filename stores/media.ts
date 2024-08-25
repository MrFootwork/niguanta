import type { WP_REST_API_Attachments } from 'wp-types'

export const useMediaStore = defineStore('media', () => {
  // STATE
  const media = ref<WP_REST_API_Attachments>([])

  const categoryStore = useCategoryStore()

  // ACTIONS
  async function fetchMedia(listOfMediaIDs: number[]) {
    media.value = []

    const { data, error, status } = await useFetch('/api/media', {
      method: 'PUT',
      body: listOfMediaIDs,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (status.value === 'success') {
      media.value.push(...data.value as unknown as WP_REST_API_Attachments)
    }
    else {
      console.error('fetch was not successful ', error.value)
    }
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
