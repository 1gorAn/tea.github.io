<template>
  <div class="container mx-auto px-2 md:px-4 py-8">
    <div class="max-w-2xl mx-auto p-4">
      <!-- Заголовок -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold text-gray-800">
          Корзина
        </h1>
        <UButton
          icon="i-lucide-arrow-left"
          variant="ghost"
          @click="$router.back()"
        >
          Назад
        </UButton>
      </div>

      <!-- Skeleton loader -->
      <div v-if="loading" class="space-y-4">
        <div
          v-for="n in 3"
          :key="`skeleton-${n}`"
          class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border animate-pulse"
        >
          <!-- Skeleton изображения -->
          <div class="w-20 h-20 bg-gray-200 rounded-lg"></div>

          <!-- Skeleton информации -->
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>

          <!-- Skeleton счетчика -->
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gray-200 rounded"></div>
            <div class="w-8 h-4 bg-gray-200 rounded"></div>
            <div class="w-8 h-8 bg-gray-200 rounded"></div>
          </div>

          <!-- Skeleton кнопки удаления -->
          <div class="w-8 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>

      <!-- Список товаров -->
      <div v-else-if="cartItems.length > 0" class="space-y-4">
        <div
          v-for="item in cartItems"
          :key="item.productId"
          class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border"
        >
          <!-- Изображение товара -->
          <img
            :src="item.product.image"
            :alt="item.product.name"
            class="w-20 h-20 object-cover rounded-lg"
          />

          <!-- Информация о товаре -->
          <div class="flex-1">
            <h3 class="font-semibold text-gray-800 mb-1">
              {{ item.product.name }}
            </h3>
            <p class="text-green-600 font-bold">
              {{ item.product.price }} ₽
            </p>
          </div>

          <!-- Управление количеством -->
          <div class="flex items-center gap-2">
            <UButton
              color="gray"
              variant="outline"
              size="sm"
              icon="i-lucide-minus"
              class="rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
              @click="decreaseQuantity(item.productId)"
            />
            <span class="text-lg font-bold min-w-[2rem] text-center">
              {{ item.quantity }}
            </span>
            <UButton
              color="gray"
              variant="outline"
              size="sm"
              icon="i-lucide-plus"
              class="rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
              @click="increaseQuantity(item.productId)"
            />
          </div>

          <!-- Кнопка удаления -->
          <UButton
            color="red"
            variant="ghost"
            size="sm"
            icon="i-lucide-trash-2"
            class="text-red-500 hover:text-red-700"
            @click="removeItemCompletely(item.productId)"
          />
        </div>

        <!-- Итого -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold">Итого:</span>
            <span class="text-xl font-bold text-green-600">
              {{ totalPrice }} ₽
            </span>
          </div>
        </div>

        <!-- Кнопка оформления заказа -->
        <UButton
          color="yellow"
          variant="outline"
          size="lg"
          class="w-full rounded-lg bg-yellow-50 border-yellow-500 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-600 hover:text-yellow-800 transition-all duration-200 text-center cart-button"
          icon="i-lucide-credit-card"
          @click="$router.push('/checkout')"
        >
          Оформить заказ
        </UButton>
      </div>

      <!-- Пустая корзина -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-24 h-24 text-gray-400 mx-auto">
            <path fill="currentColor" fill-rule="evenodd" d="M12.115 4.958c-1.316 0-1.841.961-1.841 1.405v.057h3.682v-.057c0-.444-.525-1.405-1.84-1.405M8.723 9.416V8.143h-.455c-.676 0-1.237.52-1.289 1.193l-.575 7.476a1.29 1.29 0 0 0 1.289 1.391h3.98l.52 1.723h-4.5a3.015 3.015 0 0 1-3.007-3.246l.575-7.476A3.015 3.015 0 0 1 8.268 6.42h.455v-.057c0-1.3 1.22-2.956 3.392-2.956 2.173 0 3.392 1.656 3.392 2.956v.057h.427a3.015 3.015 0 0 1 3.007 2.784l.375 4.876-1.781-.687-.312-4.057a1.29 1.29 0 0 0-1.289-1.193h-.427V9.4a1.42 1.42 0 0 1-.796 2.6 1.421 1.421 0 0 1-.755-2.627V8.143h-3.682V9.36a1.42 1.42 0 1 1-1.551.056m5.866 11.102-1.895-6.286a.47.47 0 0 1 .004-.284.417.417 0 0 1 .548-.267l6.106 2.355a.45.45 0 0 1 .242.226.455.455 0 0 1-.188.603l-1.13.582a.4.4 0 0 0-.117.088.467.467 0 0 0 .015.638l1.542 1.572.008.008a.467.467 0 0 1-.002.638l-.817.836-.008.008a.42.42 0 0 1-.609-.031l-1.435-1.625-.04-.039a.415.415 0 0 0-.606.048l-.876 1.096a.4.4 0 0 1-.202.139.436.436 0 0 1-.54-.305" clip-rule="evenodd"/>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-600 mb-2">
          Корзина пуста
        </h2>
        <p class="text-gray-500 mb-6">
          Добавьте товары в корзину для оформления заказа
        </p>
        <UButton
          color="green"
          variant="outline"
          @click="$router.push('/')"
        >
          Перейти к товарам
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCart } from '@/composables/useCart'

const { getCartItems, addToCart, removeFromCart, getCartItemQuantity } = useCart()

const loading = ref(true)
const products = ref([])

onMounted(async () => {
  const res = await fetch('/products.json')
  products.value = await res.json()
  loading.value = false
})

const cartItems = computed(() => {
  const items = getCartItems()
  return items.map(item => ({
    ...item,
    product: products.value.find(p => p.id === item.productId)
  })).filter(item => item.product)
})

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
})

const increaseQuantity = (productId) => {
  addToCart(productId, 1)
}

const decreaseQuantity = (productId) => {
  removeFromCart(productId, 1)
}

const removeItemCompletely = (productId) => {
  const currentQuantity = getCartItemQuantity(productId)
  removeFromCart(productId, currentQuantity)
}
</script>

<style scoped>
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

/* Специфичные стили для кнопки корзины */
:deep(.cart-button) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.cart-button .u-button__content) {
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  gap: 0.5rem !important;
  display: flex !important;
}

/* Общие стили для всех кнопок */
:deep(.u-button) {
  text-align: center !important;
  justify-content: center !important;
  align-items: center !important;
}

/* --- DARK THEME SUPPORT --- */
:deep(.container) {
  background: var(--color-background);
  color: var(--color-text);
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.12);
}

:deep(.max-w-2xl) {
  background: var(--color-card);
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.10);
}

:deep(.dark .container),
:deep(.dark .max-w-2xl) {
  background: var(--color-background);
  color: var(--color-text);
}

:deep(.text-gray-800),
:deep(.text-gray-600),
:deep(.text-gray-500),
:deep(.text-gray-400) {
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

:deep(.dark .bg-green-50) {
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

:deep(.bg-gray-50) {
  color: #111827 !important;
}
:deep(.dark .bg-gray-50) {
  color: var(--color-text) !important;
}
:deep(.dark .bg-gray-50 span),
:deep(.dark .bg-gray-50 .text-lg),
:deep(.dark .bg-gray-50 .font-semibold) {
  color: var(--color-text) !important;
}
:deep(.bg-white) {
  color: #111827 !important;
}
:deep(.dark .bg-white) {
  color: var(--color-text) !important;
  background: var(--color-card) !important;
}
:deep(.dark .bg-white h3),
:deep(.dark .bg-white span),
:deep(.dark .bg-white .font-semibold),
:deep(.dark .bg-white .text-lg) {
  color: var(--color-text) !important;
}
</style> 