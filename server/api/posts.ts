import { getQuery } from 'h3'
import type { WP_REST_API_Posts } from 'wp-types'

export default defineEventHandler(async (event) => {
  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl
  const { categoryId, slug } = getQuery(event)

  let posts = [] as WP_REST_API_Posts

  if (categoryId) {
    posts = await $fetch(`${baseUrl}/posts?categories=${categoryId}&per_page=100`)
  }

  if (slug) {
    posts = await $fetch(`${baseUrl}/posts?slug=${slug}&per_page=2`)
  }

  return posts
})
