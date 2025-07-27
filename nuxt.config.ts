// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint'
  ],

  css: ['~/assets/css/main.css', '~/assets/css/telegram-theme.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27',

  // Конфигурация для GitHub Pages
  ssr: false, // Отключаем SSR для статического деплоя
  
  app: {
    baseURL: '/tea.github.io/', // Правильный путь для репозитория tea.github.io
    buildAssetsDir: '/tea.github.io/_nuxt/',
    head: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  // Дополнительные настройки для GitHub Pages
  experimental: {
    payloadExtraction: false
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  },

  // Настройки темы
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  // Переменные окружения
  runtimeConfig: {
    public: {
      telegramBotToken: process.env.NUXT_APP_TELEGRAM_BOT_TOKEN,
      telegramChatId: process.env.NUXT_APP_TELEGRAM_CHAT_ID || '435415398'
    }
  }
})