import { defineStore } from 'pinia'
import type { WP_REST_API_Posts } from 'wp-types'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<WP_REST_API_Posts>([])
  const currentCategoryId = ref<number>(0)
  const currentPostId = ref<number>(0)

  async function addPostsByCategory() {
    // TODO handle errors
    const { data } = await useAsyncData('posts', () =>
      $fetch(`/api/posts?categoryId=${currentCategoryId.value}`),
    )

    if (data) {
      const additionalPosts = data.value as unknown as WP_REST_API_Posts
      posts.value.push(...additionalPosts)
    }
  }

  async function setCurrentCategory(categoryId: number) {
    currentCategoryId.value = categoryId
    const postsIncludeCategory = posts.value.find((post) => {
      return post.categories?.includes(categoryId)
    })

    if (!postsIncludeCategory) await addPostsByCategory()
  }

  function setCurrentPost(postId: number) {
    currentPostId.value = postId
  }

  const postsByCategory = computed(() => {
    return posts.value.filter((post) => {
      return (post.categories![0] || 0) === currentCategoryId.value
    })
  })

  const currentPost = computed(() => {
    return posts.value.filter(post => post.id === currentPostId.value)[0]
  })

  const postCount = computed(() => posts.value.length)

  return { addPostsByCategory, setCurrentCategory, setCurrentPost, postsByCategory, currentPost, postCount }
})
