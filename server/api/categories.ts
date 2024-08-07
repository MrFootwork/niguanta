import type { WP_REST_API_Categories } from 'wp-types';

export default defineEventHandler(async () => {
    const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl
    const categories = await $fetch(`${baseUrl}/categories?per_page=100`)
    return categories as WP_REST_API_Categories
})
