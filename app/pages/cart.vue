<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
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
        <div class="text-gray-400 mb-4">
          <i class="i-lucide-shopping-cart text-6xl"></i>
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
const { getCartItems, addToCart, removeFromCart, getCartItemQuantity } = useCart()

// Состояние загрузки
const loading = ref(true)

// Имитируем загрузку данных
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})

// Данные товаров (в реальном проекте это должно быть в отдельном файле или API)
const products = ref([
  {
    id: 1,
    name: 'Зеленый чай "Дракон"',
    description: 'Нежный зеленый чай с легким цветочным ароматом. Идеален для утреннего чаепития.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    isNew: true
  },
  {
    id: 2,
    name: 'Черный чай "Эрл Грей"',
    description: 'Классический черный чай с бергамотом. Насыщенный вкус с цитрусовыми нотками.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
    isNew: false
  },
  {
    id: 3,
    name: 'Улун "Железная Богиня"',
    description: 'Полуферментированный чай с богатым вкусом и медовым послевкусием.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
    isNew: false
  },
  {
    id: 4,
    name: 'Ройбуш "Ваниль"',
    description: 'Южноафриканский травяной чай с натуральной ванилью. Без кофеина.',
    price: 290,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    isNew: true
  },
  {
    id: 5,
    name: 'Пуэр "Древний"',
    description: 'Выдержанный постферментированный чай с землистым вкусом и сложным ароматом.',
    price: 680,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
    isNew: false
  },
  {
    id: 6,
    name: 'Белый чай "Серебряные иглы"',
    description: 'Элитный белый чай из нежных почек. Легкий и освежающий вкус.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
    isNew: true
  }
])

// Получаем товары в корзине с информацией о продуктах
const cartItems = computed(() => {
  const items = getCartItems()
  return items.map(item => ({
    ...item,
    product: products.value.find(p => p.id === item.productId)
  })).filter(item => item.product)
})

// Общая стоимость
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
})

// Функции для изменения количества
const increaseQuantity = (productId) => {
  addToCart(productId, 1)
}

const decreaseQuantity = (productId) => {
  removeFromCart(productId, 1)
}

// Полное удаление товара из корзины
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
</style> 