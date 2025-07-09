// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint'
  ],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27',

  // Конфигурация для GitHub Pages
  ssr: false, // Отключаем SSR для статического деплоя
  
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/tea.github.io/' : '/',
    buildAssetsDir: '/_nuxt/'
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
  }
})