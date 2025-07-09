export const useTelegramTheme = () => {
  const colorMode = useColorMode()
  
  // Определяем Telegram WebApp
  const isTelegramWebApp = computed(() => {
    return typeof window !== 'undefined' && window.Telegram?.WebApp
  })
  
  // Получаем тему из Telegram
  const getTelegramTheme = () => {
    if (isTelegramWebApp.value) {
      return window.Telegram.WebApp.colorScheme
    }
    return 'light'
  }
  
  // Синхронизируем тему с Telegram
  const syncWithTelegramTheme = () => {
    if (isTelegramWebApp.value) {
      const telegramTheme = getTelegramTheme()
      colorMode.preference = telegramTheme
      
      // Слушаем изменения темы в Telegram
      window.Telegram.WebApp.onEvent('themeChanged', () => {
        const newTheme = getTelegramTheme()
        colorMode.preference = newTheme
      })
    }
  }
  
  // Инициализация при загрузке
  onMounted(() => {
    syncWithTelegramTheme()
  })
  
  // Возвращаем реактивную тему
  const currentTheme = computed(() => {
    if (isTelegramWebApp.value) {
      return getTelegramTheme()
    }
    return colorMode.value
  })
  
  return {
    isTelegramWebApp,
    currentTheme,
    syncWithTelegramTheme,
    getTelegramTheme
  }
} 