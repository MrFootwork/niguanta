import type { WP_REST_API_Pages } from 'wp-types'

export default defineEventHandler(async () => {
  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl

  const pages = await $fetch(`${baseUrl}/pages`, {
    method: 'GET',
  })
  return pages as WP_REST_API_Pages
})
