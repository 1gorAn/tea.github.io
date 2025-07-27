export default defineNuxtPlugin(() => {
  onMounted(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp
      
      // Открываем WebApp на полную страницу
      webApp.expand()
      
      // Отключаем возможность закрытия
      webApp.enableClosingConfirmation()
      
      // Устанавливаем основной цвет кнопки
      webApp.setHeaderColor('#2481cc')
      
      // Устанавливаем цвет фона
      webApp.setBackgroundColor('#ffffff')
      
      // Устанавливаем цвет кнопки назад
      webApp.setBackButtonColor('#2481cc')
      
      // Показываем кнопку назад на всех страницах кроме главной
      if (window.location.pathname !== '/tea.github.io/' && window.location.pathname !== '/') {
        webApp.BackButton.show()
        webApp.BackButton.onClick(() => {
          window.history.back()
        })
      } else {
        webApp.BackButton.hide()
      }
      
      console.log('Telegram WebApp настроен:', {
        platform: webApp.platform,
        version: webApp.version,
        colorScheme: webApp.colorScheme,
        themeParams: webApp.themeParams
      })
    }
  })
}) 