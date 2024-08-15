import { getQuery } from 'h3'
import type { WP_REST_API_Posts } from 'wp-types'

export default defineEventHandler(async (event) => {
  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl
  const { categoryId, slug, all } = getQuery(event)
  console.log('🚀 ~ /api/posts ~ categoryId, slug, all:', categoryId, slug, all)

  let posts = [] as WP_REST_API_Posts

  if (categoryId && categoryId !== 0) {
    posts = await $fetch(`${baseUrl}/posts?categories=${categoryId}&per_page=100`)
  }

  if (slug) {
    posts = await $fetch(`${baseUrl}/posts?slug=${slug}&per_page=2`)
  }

  if (all) {
    let totalPostCount = 0
    let totalPageCount = 0
    const currentPage = 1

    const firstPage = await $fetch(`${baseUrl}/posts`, {
      method: 'GET',
      query: {
        orderby: 'date',
        order: 'desc',
        per_page: '20',
      },
      onResponse({ response }) {
        totalPostCount = +(response.headers.get('x-wp-total') || 0)
        totalPageCount = +(response.headers.get('x-wp-totalpages') || 0)
      },

    })
    posts.push(...firstPage as unknown as WP_REST_API_Posts)
    console.log('🚀 ~ defineEventHandler ~ totalPostCount, totalPageCount, currentPage:', totalPostCount, totalPageCount, currentPage)
    // FIXME paginate through all other pages
  }

  return posts
})
