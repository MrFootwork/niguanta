import type { WP_REST_API_Tags } from 'wp-types'

export default defineEventHandler(async () => {
  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl

  // const params = {
  //   orderby: 'menu_order',
  //   order: 'asc',
  // }

  const tags = await $fetch(`${baseUrl}/tags`)
  // const pages = await $fetch(`${baseUrl}/pages`, {
  //   method: 'GET',
  //   query: params,
  // })

  return tags as WP_REST_API_Tags
})
