<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8 transition-colors" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-800'">
      Наши чаи
    </h1>
    
    <div class="grid grid-cols-2 gap-4 md:gap-6">
      <!-- Skeleton loader -->
      <template v-if="loading">
        <UCard
          v-for="n in 6"
          :key="`skeleton-${n}`"
          class="animate-pulse"
        >
          <template #header>
            <div class="relative">
              <div class="w-full h-32 bg-gray-200 rounded-t-lg"></div>
              <div class="absolute top-2 right-2">
                <div class="w-12 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </template>

          <div class="p-1">
            <div class="h-4 bg-gray-200 rounded mb-1"></div>
            <div class="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </UCard>
      </template>

      <!-- Реальные карточки товаров -->
      <template v-else>
        <UCard
          v-for="product in products"
          :key="product.id"
          class="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          @click="navigateTo(`/product/${product.id}`)"
        >
          <template #header>
            <div class="relative">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-32 object-cover rounded-t-lg"
              />
              <div class="absolute top-2 right-2">
                <UBadge
                  v-if="product.isNew"
                  color="green"
                  variant="solid"
                  size="sm"
                >
                  Новинка
                </UBadge>
              </div>
            </div>
          </template>

          <div class="p-1">
            <h3 class="text-sm font-semibold transition-colors" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-800'">
              {{ product.name }}
            </h3>
          </div>
        </UCard>
      </template>
    </div>

    <!-- Фиксированная кнопка корзины -->
    <div v-if="cartTotal > 0" class="fixed bottom-6 right-6 z-50">
      <UButton
        icon="i-lucide-shopping-cart"
        color="green"
        variant="solid"
        size="lg"
        class="relative shadow-lg"
        @click="$router.push('/cart')"
      >
        Корзина ({{ cartTotal }})
      </UButton>
    </div>
  </div>
</template>

<script setup>
const { restoreScrollPosition } = useScrollPosition()
const { getTotalItems } = useCart()
const { currentTheme } = useTelegramTheme()

// Состояние загрузки
const loading = ref(true)

// Общее количество товаров в корзине
const cartTotal = computed(() => getTotalItems())

// Восстанавливаем позицию скролла при загрузке страницы
onMounted(() => {
  restoreScrollPosition()
  
  // Имитируем загрузку данных
  setTimeout(() => {
    loading.value = false
  }, 300)
})

// Данные товаров
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
</script>

<style scoped>
:deep(.container) {
  background: var(--color-background);
  color: var(--color-text);
  border-radius: 1.25rem;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.12);
}

:deep(.dark .container) {
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

:deep(.dark .rounded-lg),
:deep(.dark .u-card) {
  background: var(--color-card) !important;
}

:deep(.dark .shadow-lg),
:deep(.dark .shadow-sm) {
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.20) !important;
}
</style>


