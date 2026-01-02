<template>
  <div class="theme-toggle" role="group" aria-label="Theme switcher">
    <button
      v-for="option in themeOptions"
      :key="option.value"
      :aria-pressed="currentTheme === option.value"
      :class="[
        'theme-toggle-button',
        { active: currentTheme === option.value },
      ]"
      :title="option.label"
      @click="setTheme(option.value)"
    >
      <span class="theme-icon" aria-hidden="true">{{ option.icon }}</span>
      <span class="theme-label">{{ option.shortLabel }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTheme, type Theme } from "@/composables/useTheme";

const { currentTheme, setTheme } = useTheme();

const themeOptions: Array<{
  value: Theme;
  label: string;
  shortLabel: string;
  icon: string;
}> = [
  {
    value: "blackMetal",
    label: "Black Metal Theme",
    shortLabel: "Black",
    icon: "⛧",
  },
  {
    value: "deathMetal",
    label: "Death Metal Theme",
    shortLabel: "Death",
    icon: "☠",
  },
];
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
}

.theme-toggle-button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.7rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.theme-toggle-button.active {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 0 0 1px var(--border-color), 0 6px 16px rgba(0, 0, 0, 0.25);
}

.theme-toggle-button:not(.active):hover {
  color: var(--text-primary);
  background: var(--border-color);
}

.theme-icon {
  font-size: 1rem;
}

.theme-label {
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .theme-label {
    display: none;
  }

  .theme-toggle-button {
    padding: 0.45rem;
  }
}
</style>
