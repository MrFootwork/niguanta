import type { WP_REST_API_Posts } from 'wp-types';

export default defineEventHandler(async () => {
    const baseUrl = useRuntimeConfig().public.wpRestApiBaseUrl
    const posts = await $fetch(`${baseUrl}/posts`)
    return posts as WP_REST_API_Posts
})
