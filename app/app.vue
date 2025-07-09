<template>
  <UApp>
    <div :class="themeClasses">
      <NuxtPage />
    </div>
  </UApp>
</template>

<script setup>
const { currentTheme } = useTelegramTheme()

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
    }
  ]
})
</script>