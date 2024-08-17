import { defineStore } from 'pinia'
import type { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'

export const usePostStore = defineStore('posts', () => {
  const navigationStore = useNavigationStore()

  // STATE
  const posts = ref<WP_REST_API_Posts>([])
  const { currentPostId, currentCategoryId } = storeToRefs(navigationStore)

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

  async function fetchAllPosts() {
    // TODO handle errors
    posts.value = []
    // const additionalPosts = await $fetch(`/api/posts?all=true`)
    const { data } = await useFetch(`/api/posts?all=true`)
    const additionalPosts = data.value

    // FIXME only add posts, if they are not included already
    if (additionalPosts) {
      posts.value.push(...additionalPosts as unknown as WP_REST_API_Posts)
      console.log('🚀 ~ fetchAllPosts ~ posts.value:', posts.value.length)
    }
  }

  async function fetchPostBySlug(slug: string) {
    const data = await $fetch(`/api/posts?slug=${slug}`)

    // FIXME don't add, if store already includes this post
    if (data) {
      const additionalPost = data[0] as unknown as WP_REST_API_Post
      posts.value.push(additionalPost)
      setCurrentPost(additionalPost.id)
    }
  }

  // TODO cleanup, use navigation store instead
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

  const postsFilteredByTagSelection = computed(() => {
    if (navigationStore.selectedTags.length === 0) return posts.value

    return posts.value.filter(post =>
      navigationStore.selectedTags.every(selectedTag => post.tags?.includes(selectedTag)))
  })

  function postsIncludeSlug(searchSlug: string) {
    return posts.value.some(post => post.slug === searchSlug)
  }

  function getPostIdBySlug(searchSlug: string) {
    return posts.value.find(post => post.slug === searchSlug)
  }

  // TODO check if all store properties are necessary
  return {
    // state
    posts,
    // actions
    fetchPostsByCategory,
    fetchPostBySlug,
    fetchAllPosts,
    setCurrentPost,
    // getters
    postsIncludeSlug,
    postsByCategory,
    postsFilteredByTagSelection,
    getPostIdBySlug,
    currentPost,
  }
})
