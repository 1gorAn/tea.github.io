# Обновление Node.js

## Проблема

Проект использует Nuxt 3.17.6, который требует Node.js версии 20.9.0 или выше. Если у вас установлена более старая версия, вы можете столкнуться с ошибками сборки.

## Решение

### 1. Проверьте текущую версию Node.js

```bash
node --version
```

### 2. Если версия ниже 20.9.0, обновите Node.js

#### Через nvm (рекомендуется):

```bash
# Установите nvm, если его нет
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Перезапустите терминал или выполните
source ~/.bashrc

# Установите Node.js 20
nvm install 20.11.0
nvm use 20.11.0
nvm alias default 20.11.0
```

#### Через официальный установщик:

1. Перейдите на [nodejs.org](https://nodejs.org/)
2. Скачайте и установите LTS версию (20.x)

#### Через Homebrew (macOS):

```bash
brew install node@20
brew link node@20
```

### 3. Проверьте установку

```bash
node --version
npm --version
```

### 4. Очистите кэш и переустановите зависимости

```bash
# Удалите node_modules и lock файлы
rm -rf node_modules
rm yarn.lock

# Переустановите зависимости
yarn install
```

## GitHub Actions

В GitHub Actions уже настроена версия Node.js 20, поэтому проблемы с версией не возникнут при автоматическом деплое.

## Проверка совместимости

После обновления Node.js запустите:

```bash
yarn build
```

Если сборка проходит успешно, значит версия Node.js корректна. 