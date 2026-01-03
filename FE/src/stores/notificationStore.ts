import { defineStore } from "pinia";
import { ref } from "vue";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[]>([]);
  const showCart = ref(false);

  function addNotification(
    message: string,
    type: NotificationType = "info",
    duration: number = 3000
  ) {
    const id = `notification-${Date.now()}`;

    notifications.value.push({
      id,
      message,
      type,
      duration,
    });

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }

  function removeNotification(id: string) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }

  function clearNotifications() {
    notifications.value = [];
  }

  function toggleCart() {
    showCart.value = !showCart.value;
  }

  function openCart() {
    showCart.value = true;
  }

  function closeCart() {
    showCart.value = false;
  }

  return {
    notifications,
    showCart,
    addNotification,
    removeNotification,
    clearNotifications,
    toggleCart,
    openCart,
    closeCart,
  };
});
