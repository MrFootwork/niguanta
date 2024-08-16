import type { WP_REST_API_Tags } from 'wp-types'

export default defineEventHandler(async () => {
  const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl

  const tags = [] as WP_REST_API_Tags
  const perPageSize = 100

  let totalPostCount = 0
  let totalPageCount = 0

  const firstPage = await $fetch(`${baseUrl}/tags`, {
    method: 'GET',
    // FIXME only fetch tags with count != 0
    query: { per_page: perPageSize },
    onResponse({ response }) {
      totalPostCount = +(response.headers.get('x-wp-total') || 0)
      totalPageCount = +(response.headers.get('x-wp-totalpages') || 0)
    },
  })
  console.log('🚀 ~ defineEventHandler ~ totalPostCount, totalPageCount:', totalPostCount, totalPageCount)

  tags.push(...firstPage as unknown as WP_REST_API_Tags)

  if (totalPostCount <= +perPageSize) return tags

  // Paginate if total tag count exceeds maximum of 100
  for (let currentPage = 2; currentPage <= totalPageCount; currentPage++) {
    const nextPage = await $fetch(`${baseUrl}/tags`, {
      method: 'GET',
      query: {
        per_page: perPageSize,
        page: currentPage,
      },
    })

    tags.push(...nextPage as unknown as WP_REST_API_Tags)
  }

  return tags as WP_REST_API_Tags
})
