const unset = 0

export const useNavigationStore = defineStore('navigation', () => {
  // STATE
  const currentPageId = ref<number>(unset)
  const currentCategoryId = ref<number>(unset)
  const currentPostId = ref<number>(unset)

  // ACTIONS
  function setCategoryId(newId: number) {
    currentCategoryId.value = newId
  }

  // GETTERS

  return {
    // state
    currentPageId,
    currentCategoryId,
    currentPostId,
    // actions
    setCategoryId,
    // getters
  }
})
