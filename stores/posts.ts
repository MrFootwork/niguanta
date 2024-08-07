import { defineStore } from 'pinia'
import type { WP_REST_API_Posts } from 'wp-types'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<WP_REST_API_Posts>([])
  const currentCategory = ref<number>(0)

  async function addPostsByCategory() {
    // TODO handle errors
    const { data } = await useAsyncData('posts', () =>
      $fetch(`/api/posts?categoryId=${currentCategory.value}`),
    )

    if (data) {
      const additionalPosts = data.value as unknown as WP_REST_API_Posts
      posts.value.push(...additionalPosts)
    }
  }

  async function setCurrentCategory(categoryId: number) {
    currentCategory.value = categoryId
    // TODO only add new posts
    const postsIncludeCategory = posts.value.find((post) => {
      console.log('CHECK POST ', post.categories, categoryId, post.categories?.includes(categoryId))
      return post.categories?.includes(categoryId)
    })

    if (!postsIncludeCategory) await addPostsByCategory()
  }

  const postsByCategory = computed(() => {
    console.log('...searching for posts')
    return posts.value.filter((post) => {
      return (post.categories![0] || 0) === currentCategory.value
    })
  })

  return { addPostsByCategory, setCurrentCategory, postsByCategory }
})
