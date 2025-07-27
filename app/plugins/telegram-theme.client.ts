import { useTelegramTheme } from '~/composables/useTelegramTheme'

export default defineNuxtPlugin(() => {
  const { initTheme, isTelegramApp } = useTelegramTheme()
  
  // Инициализируем тему при загрузке приложения
  onMounted(() => {
    console.log('Initializing Telegram theme...')
    initTheme()
    
    // Добавляем класс к body для применения Telegram стилей
    if (isTelegramApp.value) {
      document.body.classList.add('telegram-theme')
      console.log('Telegram theme applied')
    } else {
      console.log('Not in Telegram WebApp, using fallback theme')
    }
  })
}) 