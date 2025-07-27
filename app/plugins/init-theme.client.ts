export default defineNuxtPlugin(() => {
  if (process.client) {
    // Проверяем Telegram WebApp
    const webApp = typeof window !== 'undefined' && window.Telegram?.WebApp
    const isDark = webApp && webApp.colorScheme === 'dark'
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}) 