import type { WP_REST_API_Attachments } from 'wp-types'

export default defineEventHandler(async () => {
  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl
  const accessToken = useRuntimeConfig().wordpressAccessToken

  try {
    const media = await $fetch(`${baseUrl}/media?per_page=5`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return media as unknown as WP_REST_API_Attachments
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
