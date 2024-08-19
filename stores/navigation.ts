import type { WP_REST_API_Tag, WP_REST_API_Tags } from 'wp-types'
import IDs from '../data/IDs.json'

const unset = 0

export const useNavigationStore = defineStore('navigation', () => {
  // STATE
  const currentPageId = ref<number>(unset)
  const currentCategoryId = ref<number>(unset)
  const currentPostId = ref<number>(unset)

  const currentFilterSelection = ref<Record<WP_REST_API_Tag['id'], boolean>>({})
  const selectedTags = ref<WP_REST_API_Tag['id'][]>([])

  const storyTypes = [IDs.longStory, IDs.shortStory]

  // ACTIONS
  function initializeFilterSelection(tags: WP_REST_API_Tags) {
    currentFilterSelection.value[IDs.longStory] = false
    currentFilterSelection.value[IDs.shortStory] = false

    tags.forEach((tag) => {
      currentFilterSelection.value[tag.id] = false
    })
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
