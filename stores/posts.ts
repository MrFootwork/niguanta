import { defineStore } from 'pinia'
import type { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'

export const usePostStore = defineStore('posts', () => {
  // STATE
  const navigationStore = useNavigationStore()
  const categoryStore = useCategoryStore()

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
    const additionalPosts = await $fetch(`/api/posts?all=true`) as unknown as WP_REST_API_Posts

    if (additionalPosts) {
      const postsToAdd = [...additionalPosts]

      // push all fetched posts, if store is empty
      if (posts.value.length === 0) return posts.value.push(...additionalPosts)

      // only add posts, which are not in the store already
      posts.value.forEach((post) => {
        const indexForDeletion = additionalPosts
          .findIndex(additionalPost => additionalPost.id === post.id)
        postsToAdd.splice(indexForDeletion, 1)
      })

      posts.value.push(...postsToAdd)
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

    return posts.value.filter((post) => {
      return navigationStore.selectedTags.every((selectedTag) => {
        if (navigationStore.storyTypes.includes(selectedTag)) {
          return post.categories?.some((categoryId) => {
            return categoryStore.getCategoryById(categoryId)?.parent === selectedTag
          })
        }

        return post.tags?.includes(selectedTag)
      })
    })
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
