export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Проверяем конфигурацию Telegram при загрузке
  console.log('Telegram Config Check:')
  console.log('- Bot Token:', config.public.telegramBotToken ? 'Set' : 'Not set')
  console.log('- Chat ID:', config.public.telegramChatId)
  
  // Если токен не установлен, показываем предупреждение
  if (!config.public.telegramBotToken) {
    console.warn('⚠️ Telegram Bot Token не настроен. Уведомления не будут отправляться.')
    console.warn('Настройте переменную окружения NUXT_APP_TELEGRAM_BOT_TOKEN в GitHub Secrets.')
  }
}) 