<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="base-modal-backdrop" @click="closeOnBackdrop">
        <div class="base-modal" @click.stop>
          <div class="base-modal-header">
            <h2 class="text-xl font-bold">{{ title }}</h2>
            <button
              class="base-modal-close"
              aria-label="Close modal"
              @click="$emit('close')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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

          <div class="base-modal-content">
            <slot></slot>
          </div>

          <div v-if="$slots.footer" class="base-modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface Props {
  isOpen: boolean;
  title: string;
  closeOnBackdrop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  closeOnBackdrop: true,
});

const emit = defineEmits<{
  close: [];
}>();

const closeOnBackdrop = () => {
  if (props.closeOnBackdrop) {
    emit("close");
  }
};

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "unset";
});
</script>

<style scoped>
.base-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.base-modal {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.base-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.base-modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;
}

.base-modal-close:hover {
  color: var(--secondary);
}

.base-modal-content {
  padding: 1.5rem;
}

.base-modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
