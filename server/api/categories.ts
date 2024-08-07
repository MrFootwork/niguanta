import type { WP_REST_API_Categories } from 'wp-types';

export default defineEventHandler(async () => {
    const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl
    const categories = await $fetch(`${baseUrl}/categories`)
    return categories as WP_REST_API_Categories
})
