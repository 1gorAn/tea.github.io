<template>
  <div class="container mx-auto px-2 md:px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <!-- Skeleton loader -->
      <div v-if="loading" class="space-y-6">
        <!-- Skeleton заголовка -->
        <div class="flex items-center justify-between mb-8">
          <div class="h-8 bg-gray-200 rounded w-32"></div>
          <div class="h-8 bg-gray-200 rounded w-20"></div>
        </div>

        <!-- Skeleton формы -->
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="h-12 bg-gray-200 rounded-lg"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
          <div class="h-12 bg-gray-200 rounded-lg"></div>
        </div>

        <!-- Skeleton товаров -->
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div
            v-for="n in 2"
            :key="`skeleton-item-${n}`"
            class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border animate-pulse"
          >
            <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div class="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>

        <!-- Skeleton итого -->
        <div class="p-4 bg-gray-50 rounded-lg">
          <div class="flex justify-between items-center">
            <div class="h-6 bg-gray-200 rounded w-20"></div>
            <div class="h-6 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        <!-- Skeleton кнопки -->
        <div class="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      <!-- Основной контент -->
      <div v-else>
        <!-- Заголовок -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold text-gray-800">
            Оформление заказа
          </h1>
          <UButton
            icon="i-lucide-arrow-left"
            variant="ghost"
            @click="$router.back()"
          >
            Назад
          </UButton>
        </div>

        <!-- Форма заказа -->
        <div class="space-y-6">
          <!-- Контактная информация -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Контактная информация
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона
                </label>
                <input
                  v-model="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  :class="{ 'border-red-500': phoneError }"
                  @input="formatPhone"
                  maxlength="18"
                />
                <p v-if="phoneError" class="text-red-500 text-sm mt-1">
                  {{ phoneError }}
                </p>
              </div>
            </div>
          </div>

          <!-- Товары в заказе -->
          <div class="bg-white rounded-lg shadow-sm border p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">
              Товары в заказе
            </h2>
            <div class="space-y-4">
              <div
                v-for="item in cartItems"
                :key="item.productId"
                class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-800">
                    {{ item.product.name }}
                  </h3>
                  <p class="text-green-600 font-bold">
                    {{ item.product.price }} ₽
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-gray-600">Количество: {{ item.quantity }}</p>
                  <p class="font-bold text-green-600">
                    {{ item.product.price * item.quantity }} ₽
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Итого -->
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold">Итого к оплате:</span>
              <span class="text-2xl font-bold text-green-600">
                {{ totalPrice }} ₽
              </span>
            </div>
          </div>

          <!-- Кнопка подтверждения -->
          <UButton
            color="yellow"
            variant="outline"
            size="lg"
            class="w-full rounded-lg bg-yellow-50 border-yellow-500 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-600 hover:text-yellow-800 transition-all duration-200 text-center checkout-button"
            icon="i-lucide-check-circle"
            :loading="isSubmitting"
            :disabled="!isFormValid"
            @click="submitOrder"
          >
            Подтвердить заказ
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getCartItems, clearCart } = useCart()

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

// Получаем товары в корзине
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

// Форма
const phone = ref('')
const phoneError = ref('')
const isSubmitting = ref(false)

// Валидация формы
const isFormValid = computed(() => {
  return phone.value.trim().length >= 10 && cartItems.value.length > 0
})

// Форматирование телефона
const formatPhone = () => {
  let value = phone.value.replace(/\D/g, '')
  
  if (value.length === 0) {
    phone.value = ''
    return
  }
  
  if (value.length === 1 && value[0] === '8') {
    value = '7' + value.slice(1)
  }
  
  if (value.length === 1 && value[0] === '7') {
    value = '7' + value.slice(1)
  }
  
  if (value.length === 1 && value[0] === '9') {
    value = '79' + value
  }
  
  let formatted = ''
  if (value.length >= 1) {
    formatted = '+7'
  }
  if (value.length >= 2) {
    formatted += ' (' + value.slice(1, 4)
  }
  if (value.length >= 4) {
    formatted += ') ' + value.slice(4, 7)
  }
  if (value.length >= 7) {
    formatted += '-' + value.slice(7, 9)
  }
  if (value.length >= 9) {
    formatted += '-' + value.slice(9, 11)
  }
  
  phone.value = formatted
}

// Валидация телефона
const validatePhone = () => {
  const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/
  if (!phone.value.trim()) {
    phoneError.value = 'Введите номер телефона'
    return false
  }
  if (!phoneRegex.test(phone.value.trim())) {
    phoneError.value = 'Введите корректный номер телефона'
    return false
  }
  phoneError.value = ''
  return true
}

// Оформление заказа
const submitOrder = async () => {
  if (!validatePhone()) return
  
  isSubmitting.value = true
  
  // Имитируем отправку заказа
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Очищаем корзину
  clearCart()
  
  // Переходим на страницу успеха
  navigateTo('/order-success')
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

/* Специфичные стили для кнопки checkout */
:deep(.checkout-button) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.checkout-button .u-button__content) {
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
:deep(.text-gray-400),
:deep(.text-gray-700) {
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
</style> 