import { ref, onMounted, watch } from 'vue'

interface TelegramThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
  header_bg_color?: string
  bottom_bar_bg_color?: string
  accent_text_color?: string
  section_bg_color?: string
  section_header_text_color?: string
  section_separator_color?: string
  subtitle_text_color?: string
  destructive_text_color?: string
}

export const useTelegramTheme = () => {
  const themeParams = ref<TelegramThemeParams>({})
  const colorScheme = ref<'light' | 'dark'>('light')
  const isTelegramApp = ref(false)

  const getTelegramWebApp = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      return window.Telegram.WebApp
    }
    return null
  }

  const initTheme = () => {
    const webApp = getTelegramWebApp()
    if (!webApp) {
      console.log('Telegram WebApp не найден')
      return
    }

    isTelegramApp.value = true
    themeParams.value = webApp.themeParams || {}
    colorScheme.value = webApp.colorScheme || 'light'

    console.log('Telegram theme initialized:', {
      colorScheme: colorScheme.value,
      themeParams: themeParams.value
    })

    // Применяем тему к CSS переменным
    applyThemeToCSS()
  }

  const applyThemeToCSS = () => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    
    // Применяем цвета из Telegram
    if (themeParams.value.bg_color) {
      root.style.setProperty('--tg-theme-bg-color', themeParams.value.bg_color)
    }
    if (themeParams.value.text_color) {
      root.style.setProperty('--tg-theme-text-color', themeParams.value.text_color)
    }
    if (themeParams.value.hint_color) {
      root.style.setProperty('--tg-theme-hint-color', themeParams.value.hint_color)
    }
    if (themeParams.value.link_color) {
      root.style.setProperty('--tg-theme-link-color', themeParams.value.link_color)
    }
    if (themeParams.value.button_color) {
      root.style.setProperty('--tg-theme-button-color', themeParams.value.button_color)
    }
    if (themeParams.value.button_text_color) {
      root.style.setProperty('--tg-theme-button-text-color', themeParams.value.button_text_color)
    }
    if (themeParams.value.secondary_bg_color) {
      root.style.setProperty('--tg-theme-secondary-bg-color', themeParams.value.secondary_bg_color)
    }
    if (themeParams.value.accent_text_color) {
      root.style.setProperty('--tg-theme-accent-text-color', themeParams.value.accent_text_color)
    }
    if (themeParams.value.section_bg_color) {
      root.style.setProperty('--tg-theme-section-bg-color', themeParams.value.section_bg_color)
    }
    if (themeParams.value.subtitle_text_color) {
      root.style.setProperty('--tg-theme-subtitle-text-color', themeParams.value.subtitle_text_color)
    }
    if (themeParams.value.destructive_text_color) {
      root.style.setProperty('--tg-theme-destructive-text-color', themeParams.value.destructive_text_color)
    }
  }

  const setupThemeListener = () => {
    const webApp = getTelegramWebApp()
    if (!webApp) return

    // Слушаем изменения темы
    webApp.onEvent('themeChanged', () => {
      console.log('Telegram theme changed')
      initTheme()
    })
  }

  const getThemeColor = (colorName: keyof TelegramThemeParams, fallback: string = '#000000') => {
    return themeParams.value[colorName] || fallback
  }

  const isDarkTheme = () => {
    return colorScheme.value === 'dark'
  }

  onMounted(() => {
    initTheme()
    setupThemeListener()
  })

  return {
    themeParams,
    colorScheme,
    isTelegramApp,
    getThemeColor,
    isDarkTheme,
    initTheme,
    applyThemeToCSS
  }
} 