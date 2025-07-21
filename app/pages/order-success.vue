<template>
  <div class="container mx-auto px-2 md:px-4 py-8">
    <div class="max-w-md mx-auto text-center">
      <!-- Skeleton loader -->
      <div v-if="loading" class="space-y-6">
        <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
        <div class="space-y-4">
          <div class="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
        </div>
        <div class="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      <!-- Основной контент -->
      <div v-else class="space-y-8">
        <!-- Иконка успеха -->
        <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-16 h-16 text-green-600">
            <path fill="currentColor" fill-rule="evenodd" d="M4.778 12.675c-.122.196-.356.204-.496.02-.063-.084-.106-.183-.169-.267-.534-.722-.806-1.006-1.343-1.726-.17-.258-.205-.88.007-1.194s1.862-2.519 2.591-3.47c.73-.95 1.55-1.114 2.211-.72.662.394 1.381.41 1.635.451.254.04 1.614.034 1.551.193-.062.158-.372.258-.562.383-.052.034-.113.053-.167.085-.291.17-.664.167-1.024.165s-1.138-.073-1.727-.38c-.59-.308-.932.095-1.175.364-.243.27-2.344 3.14-2.382 3.194-.037.054-.214.5-.016.806s.595.584.977 1.255c.107.186.191.38.168.6a.6.6 0 0 1-.08.24m14.883-.019c.104.133.154.505.091.854a1.88 1.88 0 0 1-.965 1.36c-.079.043-.104.09-.114.179-.092.796-.514 1.351-1.26 1.638-.165.063-.244.138-.302.3-.196.548-.58.928-1.121 1.134-.42.159-.849.16-1.272 0-.062-.023-.094-.02-.135.04q-.474.686-1.305.796a1.7 1.7 0 0 1-1.216-.29c-.298-.202-.403-.28-.398-.347s.389-.69.453-.665c.063.024.107.083.404.293.54.38 1.282.08 1.476-.512l-.086-.06c-.699-.473-.887-.618-1.587-1.089-.115-.077-.185-.175-.175-.319a.33.33 0 0 1 .228-.305c.12-.047.231-.011.335.059.592.4.674.473 1.266.872.326.22.657.434.977.662a.7.7 0 0 0 .63.095c.413-.117.67-.397.773-.817.02-.085.002-.135-.074-.186-1.296-.87-2.08-1.417-3.374-2.29-.16-.109-.226-.245-.19-.398a.338.338 0 0 1 .502-.219q.047.028.091.06c1.314.886 2.119 1.442 3.427 2.335a.39.39 0 0 0 .42.038q.621-.288.664-.97c.004-.07-.021-.12-.085-.162-1.503-1.012-2.495-1.7-3.997-2.713-.247-.166-.236-.49.021-.614a.32.32 0 0 1 .337.03l.724.488c1.248.84 1.987 1.354 3.232 2.199.093.063.163.062.258.018.563-.264.764-1.115.578-1.435s.666-.192.77-.059m-8.857 3.102c.662.081 1.084.774.82 1.36-.07.153-.168.292-.257.435-.18.291-.347.594-.55.87-.704.866-2.707-.572-3.723-1.447-1.015-.874-1.8-1.46-2.192-2.508-.094-.25-.088-.495.061-.727q.27-.421.537-.845c.24-.385.795-.545 1.242-.354.242.104.402.254.565.537.22-.196.476-.274.758-.26.211.01.406.084.574.214.337.261.545.708.32 1.243.481-.168.91-.096 1.243.295.335.394.331.822.029 1.274.203-.086.384-.11.573-.087m10.762-5.588c.077.165.213.287-.03.665-.244.377-1.196 1.197-1.482 1.3s-.275.106-.619.064-1.23-.689-1.598-.91q-.73-.436-1.46-.875l-1.265-.76-1.47-.878c-.143-.085-.282-.175-.426-.254a.17.17 0 0 0-.133-.002c-.574.269-1.138.563-1.722.808-.665.28-1.353.345-2.042.061-.354-.146-.63-.39-.858-.693-.203-.27-.037-.62.191-.737.803-.409 1.566-.885 2.336-1.351.28-.17.555-.347.84-.508.283-.159.591-.252.913-.297.05-.007.105 0 .156.008 1.195.197 3.23.54 3.392.554s.346-.003.409-.016.668-.282.87-.383c.2-.1.723-.363 1.083-.096.359.266.52.497.883.957.924 1.17 1.954 3.177 2.032 3.342" clip-rule="evenodd"/>
          </svg>
        </div>

        <!-- Заголовок -->
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-4">
            Заказ оформлен!
          </h1>
          <p class="text-gray-600 text-lg">
            Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.
          </p>
        </div>

        <!-- Дополнительная информация -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-3">
            Что дальше?
          </h2>
          <div class="space-y-2 text-sm text-gray-600">
            <p>• Мы обработаем ваш заказ в течение 1-2 часов</p>
            <p>• Свяжемся с вами для подтверждения деталей</p>
            <p>• Доставим заказ в удобное для вас время</p>
          </div>
        </div>

        <!-- Кнопка действия -->
        <div class="space-y-4">
          <UButton
            color="yellow"
            variant="outline"
            size="lg"
            class="w-full rounded-lg bg-yellow-50 border-yellow-500 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-600 hover:text-yellow-800 transition-all duration-200 text-center success-button"
            icon="i-lucide-home"
            @click="$router.push('/')"
          >
            Вернуться к покупкам
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Состояние загрузки
const loading = ref(true)

// Имитируем загрузку данных
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})


</script>

<style scoped>
/* Принудительное переопределение стилей Nuxt UI */
:deep(.u-button) {
  text-align: center !important;
  justify-content: center !important;
  display: flex !important;
  align-items: center !important;
}

:deep(.u-button .u-button__content) {
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  width: 100% !important;
  gap: 0.5rem !important;
  display: flex !important;
}

:deep(.u-button .u-button__label) {
  text-align: center !important;
  width: 100% !important;
  flex: 1 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

:deep(.u-button .iconify) {
  flex-shrink: 0 !important;
}

/* Специфичные стили для кнопки success */
:deep(.success-button) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.success-button .u-button__content) {
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  gap: 0.5rem !important;
  display: flex !important;
}

/* Дополнительные стили для принудительного центрирования */
:deep(.u-button) {
  text-align: center !important;
  justify-content: center !important;
  align-items: center !important;
}

/* Специфичные стили для всех кнопок на странице */
:deep(.u-button[class*="w-full"]) {
  justify-content: center !important;
  text-align: center !important;
}

:deep(.u-button[class*="w-full"] .u-button__content) {
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  width: 100% !important;
  display: flex !important;
}

:deep(.u-button[class*="w-full"] .u-button__label) {
  text-align: center !important;
  justify-content: center !important;
  align-items: center !important;
  display: flex !important;
  width: 100% !important;
}

/* --- DARK THEME SUPPORT --- */
:deep(.container) {
  background: var(--color-background);
  color: var(--color-text);
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.12);
}

:deep(.max-w-md) {
  background: var(--color-card);
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.10);
}

:deep(.dark .container),
:deep(.dark .max-w-md) {
  background: var(--color-background);
  color: var(--color-text);
}

:deep(.text-gray-800),
:deep(.text-gray-600),
:deep(.text-gray-500) {
  color: var(--color-text) !important;
}

:deep(.dark .bg-gray-200),
:deep(.dark .bg-gray-100),
:deep(.dark .bg-gray-50),
:deep(.dark .bg-white) {
  background: #23272f !important;
}

:deep(.dark .border-gray-300),
:deep(.dark .border) {
  border-color: var(--color-border) !important;
}

:deep(.dark .bg-blue-50) {
  background: #1e293b !important;
}

:deep(.dark .text-blue-700) {
  color: #60a5fa !important;
}

:deep(.dark .bg-green-50),
:deep(.dark .bg-green-100) {
  background: #052e16 !important;
}
:deep(.dark .text-green-700),
:deep(.dark .text-green-600) {
  color: #34d399 !important;
}

:deep(.dark .bg-yellow-50) {
  background: #3b2f13 !important;
}
:deep(.dark .text-yellow-700) {
  color: #fde68a !important;
}

:deep(.dark .rounded-lg) {
  background: var(--color-card);
}

:deep(.dark .shadow-sm) {
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.20) !important;
}
</style> 