<template>
  <div id="app">
    <Header />

    <!-- Notifications Container -->
    <div class="notifications-container">
      <TransitionGroup name="fade">
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          :message="notification.message"
          :type="notification.type"
          :duration="0"
        />
      </TransitionGroup>
    </div>

    <!-- Cart Sidebar -->
    <CartSidebar />

    <!-- Main Content -->
    <main class="main-content" role="main">
      <RouterView />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { useTheme, type Theme } from "@/composables/useTheme";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import CartSidebar from "@/components/features/CartSidebar.vue";
import Notification from "@/components/ui/Notification.vue";

const notificationStore = useNotificationStore();
const { setTheme } = useTheme();

const notifications = computed(() => notificationStore.notifications);

// Initialize theme from localStorage on app load
onMounted(() => {
  const savedTheme = (localStorage.getItem("theme") || "blackMetal") as Theme;
  setTheme(savedTheme);
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.notifications-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .notifications-container {
    left: 1rem;
    right: 1rem;
  }
}
</style>
