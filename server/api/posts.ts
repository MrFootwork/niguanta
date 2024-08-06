export default defineEventHandler(async (event) => {
    const posts = await $fetch(`${useRuntimeConfig().public.wpRestApiBaseUrl}/posts`)
    return posts
})
