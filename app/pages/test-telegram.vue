<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto">
      <h1 class="text-2xl font-bold mb-4">Тест Telegram API</h1>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Токен бота:</label>
          <input 
            v-model="botToken" 
            type="text" 
            class="w-full px-3 py-2 border rounded"
            placeholder="Введите токен бота"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">ID чата:</label>
          <input 
            v-model="chatId" 
            type="text" 
            class="w-full px-3 py-2 border rounded"
            placeholder="Введите ID чата"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Текст сообщения:</label>
          <textarea 
            v-model="messageText" 
            class="w-full px-3 py-2 border rounded"
            rows="3"
            placeholder="Введите текст сообщения"
          ></textarea>
        </div>
        
        <button 
          @click="testTelegram" 
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Отправить тестовое сообщение
        </button>
        
        <div v-if="result" class="mt-4 p-4 bg-gray-100 rounded">
          <h3 class="font-semibold mb-2">Результат:</h3>
          <pre class="text-sm">{{ result }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const botToken = ref('7588197727:AAHZYWOLZYFGDsSCIZB2HHAo-6INNxN9acI')
const chatId = ref('435415398')
const messageText = ref('Тестовое сообщение с сайта')
const result = ref('')

const testTelegram = async () => {
  console.log('=== TEST TELEGRAM API ===')
  console.log('Bot Token:', botToken.value)
  console.log('Chat ID:', chatId.value)
  console.log('Message:', messageText.value)
  
  const url = `https://api.telegram.org/bot${botToken.value}/sendMessage?chat_id=${chatId.value}&text=${encodeURIComponent(messageText.value)}`
  console.log('URL:', url)
  
  try {
    console.log('Отправляем запрос...')
    const response = await fetch(url)
    console.log('Response status:', response.status)
    
    const responseText = await response.text()
    console.log('Response body:', responseText)
    
    result.value = `Status: ${response.status}\nBody: ${responseText}`
    
    if (response.ok) {
      console.log('✅ Тестовое сообщение отправлено успешно')
    } else {
      console.log('❌ Ошибка при отправке')
    }
  } catch (error) {
    console.error('❌ Ошибка:', error)
    result.value = `Error: ${error.message}`
  }
  
  console.log('=== END TEST ===')
}
</script> 