<template>
  <div v-if="visible" class="notification-container">
    <div
      :class="[
        'notification',
        {
          'notification-success': type === 'success',
          'notification-error': type === 'error',
          'notification-warning': type === 'warning',
          'notification-info': type === 'info',
        },
      ]"
    >
      <div class="notification-icon">
        <svg
          v-if="type === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <svg
          v-else-if="type === 'error'"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <svg
          v-else-if="type === 'warning'"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"
          ></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <div class="notification-message">{{ message }}</div>
      <button class="notification-close" @click="visible = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

interface Props {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  duration: 3000,
});

const visible = ref(true);

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      visible.value = false;
    }, props.duration);
  }
});
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 40;
  animation: slideIn 0.3s ease-out;
}

.notification {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}

.notification-success {
  background-color: #d1fae5;
  color: #065f46;
  border-left: 4px solid #10b981;
}

.notification-error {
  background-color: #fee2e2;
  color: #7f1d1d;
  border-left: 4px solid #ef4444;
}

.notification-warning {
  background-color: #fef3c7;
  color: #78350f;
  border-left: 4px solid #f59e0b;
}

.notification-info {
  background-color: #dbeafe;
  color: #0c2340;
  border-left: 4px solid #3b82f6;
}

.notification-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.notification-message {
  flex: 1;
  font-weight: 500;
}

.notification-close {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.notification-close:hover {
  opacity: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .notification-container {
    left: 1rem;
    right: 1rem;
  }

  .notification {
    min-width: unset;
  }
}
</style>
