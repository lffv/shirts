<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :title="`Switch to ${
      currentTheme === 'default' ? 'Metal' : 'Default'
    } Theme`"
    :aria-label="`Switch to ${
      currentTheme === 'default' ? 'Metal' : 'Default'
    } Theme`"
  >
    <svg
      v-if="currentTheme === 'default'"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";

const { currentTheme, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  transition: color 0.3s ease, transform 0.2s ease;
  border-radius: 0.5rem;
}

.theme-toggle:hover {
  color: var(--primary);
  transform: scale(1.1);
  background: var(--border-color);
}

.theme-toggle svg {
  width: 20px;
  height: 20px;
}
</style>
