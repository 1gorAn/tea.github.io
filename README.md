# Tea Shop - Интернет-магазин чая

Веб-приложение для заказа чая с интеграцией Telegram уведомлений.

## Особенности

- 🛒 Корзина покупок
- 📱 Адаптивный дизайн
- 🔔 Уведомления в Telegram
- 🌙 Поддержка темной темы
- 📦 Статический деплой на GitHub Pages

## Настройка переменных окружения

Для работы уведомлений в Telegram необходимо настроить переменные окружения. Подробные инструкции см. в файле [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md).

### Быстрая настройка:

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте секреты:
   - `TELEGRAM_BOT_TOKEN` - токен вашего бота
   - `TELEGRAM_CHAT_ID` - ID чата для уведомлений

## Требования

- Node.js >= 20.9.0
- npm >= 10.0.0 или yarn >= 1.22.0

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
