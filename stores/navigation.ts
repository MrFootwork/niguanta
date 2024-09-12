import type { WP_REST_API_Tag } from 'wp-types'
import IDs from '../data/storyTypeID.json'

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
  function initializeFilterSelection() {
    currentFilterSelection.value = {}
    currentFilterSelection.value[IDs.longStory] = false
    currentFilterSelection.value[IDs.shortStory] = false
  }

  function toggleTagFilter(tagId: WP_REST_API_Tag['id']) {
    const tagIDIsStoryType = Object.values(IDs).some(arrayID => arrayID === tagId)

    // set current selection on true
    currentFilterSelection.value[tagId] = !currentFilterSelection.value[tagId]

    if (tagIDIsStoryType) {
      // deactivate non selected story tag
      const allStoryTypeIDs = Object.values(IDs)
      const tagsToUnselect = allStoryTypeIDs.toSpliced(Object.values(IDs).indexOf(tagId), 1)

      tagsToUnselect.forEach((tagIDToUnselect) => {
        currentFilterSelection.value[tagIDToUnselect] = false
        if (selectedTags.value.includes(tagIDToUnselect)) {
          selectedTags.value.splice(selectedTags.value.indexOf(tagIDToUnselect), 1)
        }
      })
    }

    // adjust selectedTags array
    if (currentFilterSelection.value[tagId]) {
      selectedTags.value.push(tagId)
    }
    else if (selectedTags.value.includes(tagId)) {
      selectedTags.value.splice(selectedTags.value.indexOf(tagId), 1)
    }
  }

  function resetFilterSelection() {
    initializeFilterSelection()
    selectedTags.value = []
  }

  // GETTERS

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
    resetFilterSelection,
    // getters
  }
})
