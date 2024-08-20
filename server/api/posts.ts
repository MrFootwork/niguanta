import { getQuery } from 'h3'
import type { WP_REST_API_Posts } from 'wp-types'

export default defineEventHandler(async (event) => {
  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl
  const { categoryId, slug, all } = getQuery(event)

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
    // WordPress doesn't allow requesting more than 100 posts at once
    const perPageSize = 100

    const baseQuery = {
      orderby: 'date',
      order: 'desc',
      per_page: perPageSize,
    }

    const firstPage = await $fetch(`${baseUrl}/posts`, {
      method: 'GET',
      query: baseQuery,
      onResponse({ response }) {
        totalPostCount = +(response.headers.get('x-wp-total') || 0)
        totalPageCount = +(response.headers.get('x-wp-totalpages') || 0)
      },
    })

    posts.push(...firstPage as unknown as WP_REST_API_Posts)

    if (totalPostCount <= perPageSize) return posts

    // Paginate if total post count exceeds maximum of 100
    for (let currentPage = 2; currentPage <= totalPageCount; currentPage++) {
      const nextPage = await $fetch(`${baseUrl}/posts`, {
        method: 'GET',
        query: { ...baseQuery, page: currentPage },
      })

      posts.push(...nextPage as unknown as WP_REST_API_Posts)
    }
  }

  // store list of featured medias

  return posts
})
