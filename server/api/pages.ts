import type { WP_REST_API_Pages } from 'wp-types'

export default defineEventHandler(async () => {
  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl

  const params = {
    orderby: 'menu_order',
    order: 'asc',
  }

  const pages = await $fetch(`${baseUrl}/pages`, {
    method: 'GET',
    query: params,
  })

  return pages as WP_REST_API_Pages
})
