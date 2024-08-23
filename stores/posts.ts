import { defineStore } from 'pinia'
import type { WP_REST_API_Posts } from 'wp-types'

export const usePostStore = defineStore('posts', () => {
  // STATE
  const navigationStore = useNavigationStore()
  const categoryStore = useCategoryStore()

  const { currentPostId, currentCategoryId } = storeToRefs(navigationStore)

  const posts = ref<WP_REST_API_Posts>([])

  // ACTIONS
  // TODO handle errors when fetching
  async function fetchAllPosts() {
    const additionalPosts = await $fetch(`/api/posts?all=true`) as unknown as WP_REST_API_Posts
    _addPostsToStore(additionalPosts)
  }

  async function fetchPostsByCategory() {
    const additionalPosts = await $fetch(`/api/posts?categoryId=${currentCategoryId.value}`) as unknown as WP_REST_API_Posts
    _addPostsToStore(additionalPosts)
    navigationStore.currentPostId = currentCategoryId.value
  }

  async function fetchPostBySlug(slug: string) {
    const data = await $fetch(`/api/posts?slug=${slug}`) as unknown as WP_REST_API_Posts

    _addPostsToStore(data)
    navigationStore.currentPostId = data[0].id
  }

  function _addPostsToStore(additionalPosts: WP_REST_API_Posts) {
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

  const mediaOfPosts = computed(() => {
    return posts.value.map(post => post.featured_media || 0)
  })

  function postsIncludeSlug(searchSlug: string) {
    return posts.value.some(post => post.slug === searchSlug)
  }

  function getPostIdBySlug(searchSlug: string) {
    return posts.value.find(post => post.slug === searchSlug)
  }

  return {
    // state
    posts,
    // actions
    fetchPostsByCategory,
    fetchPostBySlug,
    fetchAllPosts,
    // getters
    postsIncludeSlug,
    postsByCategory,
    postsFilteredByTagSelection,
    getPostIdBySlug,
    currentPost,
    mediaOfPosts,
  }
})
