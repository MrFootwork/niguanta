import { getQuery } from 'h3'
import type { WP_REST_API_Posts } from 'wp-types'

export default defineEventHandler(async (event) => {
  const { categoryId } = getQuery(event)

  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl
  const posts = await $fetch(`${baseUrl}/posts?categories=${categoryId}&per_page=100`)
  return posts as WP_REST_API_Posts
})
