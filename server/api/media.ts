import { storeToRefs } from 'pinia'
import type { WP_REST_API_Attachments } from 'wp-types'
import { usePostStore } from '~/stores/posts'

export default defineEventHandler(async () => {
  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl
  const accessToken = useRuntimeConfig().wordpressAccessToken

  const postStore = usePostStore()
  const { mediaOfPosts } = await storeToRefs(postStore)
  console.log('🚀 ~ defineEventHandler ~ mediaOfPosts:', mediaOfPosts.value)

  const media = [] as WP_REST_API_Attachments

  try {
    let totalPostCount = 0
    let totalPageCount = 0
    // WordPress doesn't allow requesting more than 100 posts at once
    const perPageSize = 100

    const baseQuery = {
      per_page: perPageSize,
      include: mediaOfPosts.value,
    }
    const authorizationHeader = { Authorization: `Bearer ${accessToken}` }

    console.log('🚀 ~ api/media ~ mediaOfPosts.value:', mediaOfPosts.value)

    const firstPage = await $fetch(`${baseUrl}/media`, {
      method: 'GET',
      headers: authorizationHeader,
      query: { ...baseQuery },
      onResponse({ response }) {
        totalPostCount = +(response.headers.get('x-wp-total') || 0)
        totalPageCount = +(response.headers.get('x-wp-totalpages') || 0)
      },
    })

    media.push(...firstPage as unknown as WP_REST_API_Attachments)

    if (totalPostCount <= perPageSize) return media

    // Paginate if total post count exceeds maximum of 100
    for (let currentPage = 2; currentPage <= totalPageCount; currentPage++) {
      const nextPage = await $fetch(`${baseUrl}/media`, {
        method: 'GET',
        headers: authorizationHeader,
        query: { ...baseQuery, page: currentPage },
      })

      media.push(...nextPage as unknown as WP_REST_API_Attachments)
    }

    return media
  }
  catch (error: any) {
    console.error({ error: error.message })
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: 'Error fetching media from WordPress',
      data: error.response?.data || error.message,
    })
  }
})
