<template>
  <NuxtPage />
</template>

<script setup>
// Основная логика приложения
</script>

<style>
/* Запрещаем увеличение страницы */
html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
  touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Запрещаем масштабирование */
body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
}

/* Отключаем двойное нажатие для увеличения */
* {
  touch-action: manipulation;
}

/* Скрываем адресную строку на мобильных устройствах */
@media screen and (max-width: 768px) {
  html, body {
    height: 100vh;
    overflow: hidden;
  }
  
  #__nuxt {
    height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>