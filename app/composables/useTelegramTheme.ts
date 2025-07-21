import { ref, onMounted } from 'vue'

const currentTheme = ref<'light' | 'dark'>('light')

function detectTelegramTheme() {
  if (typeof window !== 'undefined' && (window as any).Telegram && (window as any).Telegram.WebApp) {
    const tg = (window as any).Telegram.WebApp
    if (tg.colorScheme === 'dark') {
      currentTheme.value = 'dark'
    } else {
      currentTheme.value = 'light'
    }
    tg.onEvent('themeChanged', () => {
      currentTheme.value = tg.colorScheme === 'dark' ? 'dark' : 'light'
    })
  } else {
    // fallback: определяем по prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme.value = 'dark'
    } else {
      currentTheme.value = 'light'
    }
  }
}

export function useTelegramTheme() {
  onMounted(() => {
    detectTelegramTheme()
  })
  return { currentTheme }
} 