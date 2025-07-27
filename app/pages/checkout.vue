<template>
  <div class="container mx-auto px-2 md:px-4 py-8">
    <div class="max-w-2xl mx-auto p-4">
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
                  Имя получателя
                </label>
                <input
                  v-model="recipientName"
                  type="text"
                  placeholder="Введите ваше имя"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  :class="{ 'border-red-500': nameError }"
                  @input="validateName"
                />
                <p v-if="nameError" class="text-red-500 text-sm mt-1">
                  {{ nameError }}
                </p>
              </div>
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
import { ref, computed, onMounted } from 'vue'
import { useCart } from '@/composables/useCart'
import { useOrder } from '@/composables/useOrder'

const { getCartItems, clearCart } = useCart()
const { setOrderDetails } = useOrder()

const loading = ref(true)
const products = ref([])

onMounted(async () => {
  const res = await fetch('https://1goran.github.io/tea.github.io/products.json')
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

// Общая стоимость
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
})

// Форма
const phone = ref('')
const phoneError = ref('')
const recipientName = ref('')
const nameError = ref('')
const isSubmitting = ref(false)

// Валидация формы
const isFormValid = computed(() => {
  const phoneValid = phone.value.trim().length >= 10
  const nameValid = recipientName.value.trim().length >= 2
  const cartValid = cartItems.value.length > 0
  
  console.log('=== FORM VALIDATION ===')
  console.log('Phone valid:', phoneValid, 'Length:', phone.value.trim().length)
  console.log('Name valid:', nameValid, 'Length:', recipientName.value.trim().length)
  console.log('Cart valid:', cartValid, 'Items:', cartItems.value.length)
  console.log('Form valid:', phoneValid && nameValid && cartValid)
  
  return phoneValid && nameValid && cartValid
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

// Валидация имени
const validateName = () => {
  console.log('=== VALIDATE NAME ===')
  console.log('Recipient name:', recipientName.value)
  console.log('Trimmed length:', recipientName.value.trim().length)
  
  if (!recipientName.value.trim()) {
    console.log('❌ Name is empty')
    nameError.value = 'Введите имя получателя'
    return false
  }
  if (recipientName.value.trim().length < 2) {
    console.log('❌ Name too short')
    nameError.value = 'Имя должно содержать минимум 2 символа'
    return false
  }
  console.log('✅ Name validation passed')
  nameError.value = ''
  return true
}

// Валидация телефона
const validatePhone = () => {
  console.log('=== VALIDATE PHONE ===')
  console.log('Phone:', phone.value)
  
  const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/
  if (!phone.value.trim()) {
    console.log('❌ Phone is empty')
    phoneError.value = 'Введите номер телефона'
    return false
  }
  if (!phoneRegex.test(phone.value.trim())) {
    console.log('❌ Phone format invalid')
    phoneError.value = 'Введите корректный номер телефона'
    return false
  }
  console.log('✅ Phone validation passed')
  phoneError.value = ''
  return true
}

const getTelegramUserName = () => {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    return [user.first_name, user.last_name].filter(Boolean).join(' ');
  }
  return '';
}

const sendOrderToTelegram = async (recipientName, phone, cartItems, totalPrice) => {
  if (!cartItems.length) return; // Не отправлять пустой заказ
  
  const config = useRuntimeConfig()
  const chatId = config.public.telegramChatId;
  const botToken = config.public.telegramBotToken;
  
  // Отладочная информация
  console.log('=== TELEGRAM DEBUG ===')
  console.log('Config:', config)
  console.log('Bot Token:', botToken)
  console.log('Chat ID:', chatId)
  console.log('Recipient Name:', recipientName)
  console.log('Phone:', phone)
  console.log('Cart Items:', cartItems)
  console.log('Total Price:', totalPrice)
  
  const userName = getTelegramUserName();
  let text = `🛒 Новый заказ\n`;
  text += `Получатель: ${recipientName}\n`;
  if (userName) text += `Пользователь Telegram: ${userName}\n`;
  text += `Телефон: ${phone}\n`;
  text += '\nТовары:';
  cartItems.forEach(item => {
    text += `\n- ${item.product.name} (${item.quantity} x ${item.product.price}₽)`;
  });
  text += `\n\nИтого: ${totalPrice}₽`;
  
  console.log('Message text:', text)
  
  // Проверяем наличие токена
  console.log('Checking bot token...')
  console.log('Bot token exists:', !!botToken)
  
  if (!botToken) {
    console.warn('⚠️ Telegram Bot Token не настроен. Уведомление не будет отправлено.')
    console.warn('Настройте переменную окружения NUXT_APP_TELEGRAM_BOT_TOKEN в GitHub Secrets.')
    return
  }
  
  console.log('Message text:', text)
  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
  console.log('Telegram URL:', url)
  
  try {
    console.log('Отправляем запрос к Telegram API...')
    const response = await fetch(url);
    console.log('Telegram response status:', response.status)
    console.log('Telegram response statusText:', response.statusText)
    
    const responseText = await response.text()
    console.log('Telegram response body:', responseText)
    
    if (!response.ok) {
      console.error('❌ Telegram API error:', responseText)
    } else {
      console.log('✅ Сообщение успешно отправлено в Telegram')
    }
  } catch (e) {
    console.error('❌ Ошибка отправки в Telegram:', e);
  }
  
  console.log('=== END TELEGRAM DEBUG ===')
}

// Оформление заказа
const submitOrder = async () => {
  console.log('=== SUBMIT ORDER DEBUG ===')
  console.log('Validating form...')
  
  if (!validateName() || !validatePhone()) {
    console.log('❌ Form validation failed')
    return
  }
  
  console.log('✅ Form validation passed')
  isSubmitting.value = true
  
  console.log('Saving order details...')
  // Сохраняем детали заказа
  setOrderDetails({
    recipientName: recipientName.value,
    phone: phone.value,
    totalPrice: totalPrice.value,
    items: cartItems.value
  })
  
  console.log('Sending order to Telegram...')
  // Имитируем отправку заказа
  await sendOrderToTelegram(recipientName.value, phone.value, cartItems.value, totalPrice.value);
  
  console.log('Clearing cart...')
  // Очищаем корзину
  clearCart()
  
  console.log('Navigating to success page...')
  // Переходим на страницу успеха
  navigateTo('/order-success')
  
  console.log('=== END SUBMIT ORDER DEBUG ===')
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