import type { WP_REST_API_Tag, WP_REST_API_Tags } from 'wp-types'

const unset = 0

export const useNavigationStore = defineStore('navigation', () => {
  // STATE
  const currentPageId = ref<number>(unset)
  const currentCategoryId = ref<number>(unset)
  const currentPostId = ref<number>(unset)

  const currentFilterSelection = ref<Record<WP_REST_API_Tag['id'], boolean>>({})
  const selectedTags = ref<WP_REST_API_Tag['id'][]>([])

  const storyTypes = [804348, 546]

  // ACTIONS
  // TODO make long/short more dynamic
  function initializeFilterSelection(tags: WP_REST_API_Tags) {
    const extraFilterItemId = {
      long: 804348,
      short: 546,
    }

    currentFilterSelection.value[extraFilterItemId.long] = false
    currentFilterSelection.value[extraFilterItemId.short] = false

    tags.forEach((tag) => {
      currentFilterSelection.value[tag.id] = false
    })

    console.log('🚀 ~ useNavigationStore ~ currentFilterSelection count:', Object.keys(currentFilterSelection.value).length)
  }

  function toggleTagFilter(tagId: WP_REST_API_Tag['id']) {
    // update all tags collection
    currentFilterSelection.value[tagId] = !currentFilterSelection.value[tagId]

    // adjust selectedTags collection
    if (currentFilterSelection.value[tagId]) {
      selectedTags.value.push(tagId)
    }
    else {
      selectedTags.value.splice(selectedTags.value.indexOf(tagId), 1)
    }
  }

  // GETTERS
  const tagsAvailableBySelectedPosts = computed(() => {

  })

  return {
    // state
    currentPageId,
    currentCategoryId,
    currentPostId,
    currentFilterSelection,
    selectedTags,
    storyTypes,
    // actions
    initializeFilterSelection,
    toggleTagFilter,
    // getters
    tagsAvailableBySelectedPosts,
  }
})
