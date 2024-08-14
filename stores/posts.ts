import { defineStore } from 'pinia'
import type { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'

import { useNavigationStore } from '@/stores/navigation'

export const usePostStore = defineStore('posts', () => {
  // Navigation Store
  const navigationStore = useNavigationStore()
  const { currentPostId, currentCategoryId } = storeToRefs(navigationStore)

  // STATE
  const posts = ref<WP_REST_API_Posts>([])
  // const currentCategoryId = ref<number>(unset)
  // const currentPostId = ref<number>(unset)

  // ACTIONS
  async function fetchPostsByCategory() {
    // Delete existing posts in Category before fetching
    // to avoid duplication
    for (let index = posts.value.length - 1; index >= 0; index--) {
      if (posts.value[index].categories?.includes(currentCategoryId.value)) {
        posts.value.splice(index, 1)
      }
    }

    // TODO handle errors
    const additionalPosts = await $fetch(`/api/posts?categoryId=${currentCategoryId.value}`) as unknown as WP_REST_API_Posts

    if (additionalPosts) {
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

  // function setCurrentCategory(categoryId: number) {
  //   currentCategoryId.value = categoryId
  // }

  function setCurrentPost(postId: number) {
    currentPostId.value = postId
  }

  // GETTERS
  const postsByCategory = computed(() => {
    return posts.value.filter((post) => {
      return (post.categories![0]) === currentCategoryId.value
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
    posts,
    // currentCategoryId,
    fetchPostsByCategory,
    fetchPostBySlug,
    // setCurrentCategory,
    setCurrentPost,
    postsIncludeSlug,
    postsByCategory,
    getPostIdBySlug,
    currentPost,
    postCount,
  }
})
