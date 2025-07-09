export const useScrollPosition = () => {
  const scrollPosition = useState('scrollPosition', () => 0)

  const saveScrollPosition = () => {
    if (import.meta.client) {
      scrollPosition.value = window.scrollY
    }
  }

  const restoreScrollPosition = () => {
    if (import.meta.client) {
      nextTick(() => {
        window.scrollTo(0, scrollPosition.value)
      })
    }
  }

  return {
    scrollPosition,
    saveScrollPosition,
    restoreScrollPosition
  }
} 