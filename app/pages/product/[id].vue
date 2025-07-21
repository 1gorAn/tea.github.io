<template>
  <div class="container mx-auto px-2 md:px-4 py-8">
    <div v-if="loading" class="max-w-2xl mx-auto p-4">
      <!-- Skeleton loader для детальной страницы -->
      <div class="mb-6">
        <div class="w-20 h-8 bg-gray-200 rounded mb-6"></div>
      </div>

      <div class="mb-6">
        <div class="w-full h-64 bg-gray-200 rounded-lg"></div>
      </div>

      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <div class="h-8 bg-gray-200 rounded w-3/4"></div>
          <div class="w-16 h-6 bg-gray-200 rounded"></div>
        </div>

        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        <div class="h-6 bg-gray-200 rounded w-24"></div>
      </div>

      <div class="mt-8">
        <div class="w-full h-12 bg-gray-200 rounded-lg"></div>
      </div>

      <div class="flex gap-4 mt-6">
        <div class="flex-1 h-10 bg-gray-200 rounded-lg"></div>
        <div class="flex-1 h-10 bg-gray-200 rounded-lg"></div>
      </div>
    </div>

    <div v-else-if="product" class="max-w-2xl mx-auto p-4">
      <!-- Заголовок с кнопками -->
      <div class="flex items-center justify-between mb-6">
        <UButton
          icon="i-lucide-arrow-left"
          variant="ghost"
          @click="goBack"
        >
          Назад
        </UButton>

        <!-- Кнопка корзины с количеством -->
        <div class="relative">
          <UButton
            icon="i-lucide-shopping-cart"
            variant="ghost"
            class="relative"
            @click="$router.push('/cart')"
          >
            Корзина ({{ cartTotal }})
          </UButton>
        </div>
      </div>

      <!-- Изображение товара -->
      <Transition name="fade" mode="out-in">
        <div :key="product?.id" class="mb-6">
          <img
            :src="product?.image"
            :alt="product?.name"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </Transition>

      <!-- Информация о товаре -->
      <Transition name="slide" mode="out-in">
        <div :key="product?.id" class="space-y-4">
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold text-gray-800">
              {{ product?.name }}
            </h1>
            <UBadge
              v-if="product?.isNew"
              color="green"
              variant="solid"
              size="sm"
            >
              Новинка
            </UBadge>
          </div>

          <p class="text-gray-600">
            {{ product?.description }}
          </p>

          <div class="text-xl font-bold text-green-600">
            {{ product?.price }} ₽
          </div>
        </div>
      </Transition>

      <!-- Кнопка добавления в корзину -->
      <div class="mt-8">
        <UButton
          v-if="!showCounter"
          color="green"
          variant="outline"
          size="lg"
          icon="i-lucide-shopping-cart"
          class="w-full rounded-lg bg-green-50 border-green-500 text-green-700 hover:bg-green-100 hover:border-green-600 hover:text-green-800 transition-all duration-200 text-center cart-button"
          @click="addToCartDirect"
        >
          Добавить в корзину
        </UButton>

        <!-- Счетчик количества -->
        <Transition name="scale" mode="out-in">
          <div v-if="showCounter" :key="`counter-${product?.id}`" class="space-y-4 w-full">
            <div class="flex items-center justify-center gap-4">
              <UButton
                color="gray"
                variant="outline"
                size="lg"
                icon="i-lucide-minus"
                class="rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 flex items-center justify-center"
                @click="decreaseQuantity"
              />
              <span class="text-xl font-bold min-w-[3rem] text-center">
                {{ quantity }}
              </span>
              <UButton
                color="gray"
                variant="outline"
                size="lg"
                icon="i-lucide-plus"
                class="rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 flex items-center justify-center"
                @click="increaseQuantity"
              />
            </div>
            

          </div>
        </Transition>
      </div>

      <!-- Кнопки навигации по товарам -->
      <div class="flex gap-4 mt-6">
        <UButton
          color="blue"
          variant="outline"
          :class="[
            'flex-1 rounded-lg transition-all duration-200 text-center nav-button',
            hasPrevious 
              ? 'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-100 hover:border-blue-600 hover:text-blue-800' 
              : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
          ]"
          icon="i-lucide-chevron-left"
          @click="navigateToPrevious"
          :disabled="!hasPrevious"
        >
          Назад
        </UButton>
        <UButton
          color="blue"
          variant="outline"
          :class="[
            'flex-1 rounded-lg transition-all duration-200 text-center nav-button',
            hasNext 
              ? 'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-100 hover:border-blue-600 hover:text-blue-800' 
              : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
          ]"
          icon="i-lucide-chevron-right"
          icon-right
          @click="navigateToNext"
          :disabled="!hasNext"
        >
          Вперед
        </UButton>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">Товар не найден</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScrollPosition } from '@/composables/useScrollPosition'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const router = useRouter()
const { saveScrollPosition } = useScrollPosition()
const { addToCart, removeFromCart, getTotalItems, getCartItemQuantity } = useCart()

const loading = ref(true)
const products = ref([])

onMounted(async () => {
  const res = await fetch('/tea.github.io/products.json')
  products.value = await res.json()
  loading.value = false
})

const product = computed(() => {
  const id = parseInt(route.params.id)
  return products.value.find(p => p.id === id)
})

// Завершаем загрузку когда товар найден
watch(product, (newProduct) => {
  if (newProduct) {
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}, { immediate: true })

// Состояние счетчика
const quantity = computed(() => {
  if (!product.value) return 1
  const cartQuantity = getCartItemQuantity(product.value.id)
  return cartQuantity > 0 ? cartQuantity : 1
})

// Общее количество товаров в корзине
const cartTotal = computed(() => getTotalItems())

// Показывать счетчик если товар есть в корзине
const showCounter = computed(() => {
  if (!product.value) return false
  return getCartItemQuantity(product.value.id) > 0
})

// Функции для счетчика
const increaseQuantity = () => {
  quantity.value++
  if (product.value) {
    addToCart(product.value.id, 1)
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
    if (product.value) {
      removeFromCart(product.value.id, 1)
    }
  }
}

// Добавление товара в корзину при нажатии на кнопку
const addToCartDirect = () => {
  if (product.value) {
    addToCart(product.value.id, 1)
  }
}

// Навигация по товарам
const currentIndex = computed(() => {
  if (!product.value) return -1
  return products.value.findIndex(p => p.id === product.value.id)
})

const hasPrevious = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < products.value.length - 1)

const navigateToPrevious = () => {
  if (hasPrevious.value) {
    const prevProduct = products.value[currentIndex.value - 1]
    navigateTo(`/product/${prevProduct.id}`)
  }
}

const navigateToNext = () => {
  if (hasNext.value) {
    const nextProduct = products.value[currentIndex.value + 1]
    navigateTo(`/product/${nextProduct.id}`)
  }
}

// Функция для возврата на главную с сохранением скролла
const goBack = () => {
  saveScrollPosition()
  navigateTo('/')
}
  </script>

<style scoped>
:deep(.u-button) {
  text-align: center;
  justify-content: center;
  display: flex !important;
}

:deep(.u-button .u-button__content) {
  justify-content: center !important;
  text-align: center;
  width: 100%;
  gap: 0.5rem !important;
}

:deep(.u-button .u-button__label) {
  text-align: center;
  width: 100%;
  flex: 1;
}

:deep(.u-button .iconify) {
  flex-shrink: 0;
}

/* Специфичные стили для кнопок навигации */
:deep(.nav-button) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.nav-button .u-button__content) {
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
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
}

/* Fade анимация для изображения */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Slide анимация для контента */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Scale анимация для счетчика */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.2);
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
:deep(.text-gray-500) {
  color: var(--color-text) !important;
}

:deep(.dark .bg-gray-200),
:deep(.dark .bg-gray-100) {
  background: #23272f !important;
}

:deep(.dark .border-gray-300) {
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
:deep(.dark .text-green-700) {
  color: #34d399 !important;
}

:deep(.dark .bg-white) {
  background: var(--color-card) !important;
}

:deep(.dark .rounded-lg) {
  background: var(--color-card);
}
</style> 