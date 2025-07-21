<template>
  <UApp>
    <div :class="themeClasses">
      <NuxtPage />
    </div>
  </UApp>
</template>

<script setup>
import "@/assets/css/main.css"
import "@/assets/css/theme.css"
import { useTelegramTheme } from "@/composables/useTelegramTheme"
import { onMounted, watch } from 'vue'
import { useHead } from '@vueuse/head'

const { currentTheme } = useTelegramTheme()

onMounted(() => {
  document.documentElement.classList.toggle('dark', currentTheme.value === 'dark')
})

watch(currentTheme, (val) => {
  document.documentElement.classList.toggle('dark', val === 'dark')
})

// Классы для темной/светлой темы
const themeClasses = computed(() => {
  const baseClasses = 'min-h-screen transition-colors duration-200'
  
  if (currentTheme.value === 'dark') {
    return `${baseClasses} bg-gray-900 text-white`
  }
  
  return `${baseClasses} bg-gray-50 text-gray-900`
})

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    },
    {
      name: 'color-scheme',
      content: currentTheme.value === 'dark' ? 'dark' : 'light'
    },
    {
      name: 'theme-color',
      content: currentTheme.value === 'dark' ? '#1a1a1a' : '#f9fafb',
    },
  ]
})
</script>