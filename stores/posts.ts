import { defineStore } from 'pinia'
import type { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'

const unset = 0

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<WP_REST_API_Posts>([])
  const currentCategoryId = ref<number>(unset)
  const currentPostId = ref<number>(unset)

  // ACTIONS
  async function fetchPostsByCategory() {
    // TODO handle errors
    const { data } = await useAsyncData('posts', () =>
      $fetch(`/api/posts?categoryId=${currentCategoryId.value}`),
    )

    if (data) {
      const additionalPosts = data.value as unknown as WP_REST_API_Posts
      posts.value.push(...additionalPosts)
    }
  }

  async function fetchPostBySlug(slug: string) {
    const data = await $fetch(`/api/posts?slug=${slug}`)

    if (data) {
      const additionalPost = data[0] as unknown as WP_REST_API_Post
      posts.value.push(additionalPost)
      setCurrentPost(additionalPost.id)
    }
  }

  async function setCurrentCategory(categoryId: number) {
    currentCategoryId.value = categoryId
    const postsIncludeCategory = posts.value.find((post) => {
      return post.categories?.includes(categoryId)
    })

    if (!postsIncludeCategory) await fetchPostsByCategory()
  }

  function setCurrentPost(postId: number) {
    currentPostId.value = postId
  }

  // GETTERS
  const postsByCategory = computed(() => {
    return posts.value.filter((post) => {
      return (post.categories![0] || 0) === currentCategoryId.value
    })
  })

  const currentPost = computed(() => {
    return posts.value.find(post => post?.id === currentPostId.value)
  })

  function postsIncludeSlug(searchSlug: string) {
    return posts.value.some(post => post.slug === searchSlug)
  }

  function getPostIdBySlug(searchSlug: string) {
    return posts.value.find(post => post.slug === searchSlug)
  }

  const postCount = computed(() => posts.value.length)

  return {
    fetchPostsByCategory,
    fetchPostBySlug,
    setCurrentCategory,
    setCurrentPost,
    postsIncludeSlug,
    postsByCategory,
    getPostIdBySlug,
    currentPost,
    postCount,
  }
})
