<template>
  <button
    :class="[
      'btn-base',
      {
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
        'btn-outline': variant === 'outline',
        'btn-sm': size === 'sm',
        'btn-md': size === 'md',
        'btn-lg': size === 'lg',
        'opacity-50 cursor-not-allowed': disabled,
        'w-full': fullWidth,
      },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <span v-if="!loading" class="flex items-center justify-center gap-2">
      <slot></slot>
    </span>
    <span v-else class="flex items-center justify-center gap-2">
      <svg
        class="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ loadingText }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  loadingText: "Loading...",
  fullWidth: false,
});

defineEmits<{
  click: [];
}>();
</script>

<style scoped>
.btn-base {
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  @apply bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400;
}

.btn-outline {
  @apply border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-blue-100;
}

.btn-sm {
  @apply px-3 py-1.5 text-sm;
}

.btn-md {
  @apply px-4 py-2.5 text-base;
}

.btn-lg {
  @apply px-6 py-3 text-lg;
}
</style>
