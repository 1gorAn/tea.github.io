<template>
  <button
    :class="[
      'telegram-button',
      variant === 'primary' ? 'telegram-button-primary' : 'telegram-button-secondary',
      size === 'lg' ? 'telegram-button-lg' : 'telegram-button-sm',
      'transition-all duration-200'
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'lg'
  disabled?: boolean
}

defineProps<Props>()
defineEmits<{
  click: []
}>()
</script>

<style scoped>
.telegram-button {
  @apply rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.telegram-button-primary {
  background-color: var(--tg-theme-button-color, var(--fallback-button-color));
  color: var(--tg-theme-button-text-color, var(--fallback-button-text-color));
}

.telegram-button-secondary {
  background-color: transparent;
  color: var(--tg-theme-button-color, var(--fallback-button-color));
  border: 1px solid var(--tg-theme-button-color, var(--fallback-button-color));
}

.telegram-button-sm {
  @apply px-4 py-2 text-sm;
}

.telegram-button-lg {
  @apply px-6 py-3 text-base;
}

.telegram-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.telegram-button:not(:disabled):hover {
  opacity: 0.9;
}

.telegram-button:not(:disabled):active {
  transform: scale(0.98);
}
</style> 