import { useTelegramTheme } from '@/composables/useTelegramTheme'

export default defineNuxtPlugin(() => {
  const { currentTheme } = useTelegramTheme()
  if (process.client) {
    if (currentTheme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}) 