<template>
  <div class="theme-popover" ref="container">
    <button
      class="theme-trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-label="`Theme: ${activeOption.label}`"
      @click="toggleOpen"
      @keydown.enter.prevent="toggleOpen"
      @keydown.space.prevent="toggleOpen"
    >
      <span class="theme-trigger-icon" aria-hidden="true">
        {{ activeOption.icon }}
      </span>
      <span class="theme-trigger-label">{{ activeOption.shortLabel }}</span>
      <span class="chevron" aria-hidden="true">▾</span>
    </button>

    <transition name="fade-scale">
      <ul
        v-if="open"
        class="theme-menu"
        role="listbox"
        :aria-activedescendant="`theme-${activeOption.value}`"
      >
        <li
          v-for="option in themeOptions"
          :id="`theme-${option.value}`"
          :key="option.value"
          role="option"
          :aria-selected="currentTheme === option.value"
          :class="['theme-item', { active: currentTheme === option.value }]"
          @click="select(option.value)"
        >
          <span class="theme-item-icon" aria-hidden="true">
            {{ option.icon }}
          </span>
          <span class="theme-item-label">{{ option.label }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useTheme, type Theme } from "@/composables/useTheme";

const { currentTheme, setTheme } = useTheme();

const themeOptions: Array<{
  value: Theme;
  label: string;
  shortLabel: string;
  icon: string;
}> = [
  { value: "blackMetal", label: "Black Metal", shortLabel: "Black", icon: "⛧" },
  { value: "deathMetal", label: "Death Metal", shortLabel: "Death", icon: "☠" },
  { value: "goreMetal", label: "Gore Metal", shortLabel: "Gore", icon: "🩸" },
  {
    value: "heavyMetal",
    label: "Heavy Metal",
    shortLabel: "Heavy",
    icon: "⚡",
  },
];

const open = ref(false);
const container = ref<HTMLElement | null>(null);

const activeOption = computed(
  () =>
    themeOptions.find((o) => o.value === currentTheme.value) || themeOptions[0]
);

const toggleOpen = () => {
  open.value = !open.value;
};

const select = (value: Theme) => {
  setTheme(value);
  open.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (!container.value) return;
  if (!container.value.contains(event.target as Node)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.theme-popover {
  position: relative;
  display: inline-block;
}

.theme-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.theme-trigger:hover {
  background: var(--border-color);
}

.theme-trigger-icon {
  font-size: 1rem;
}

.theme-trigger-label {
  font-size: 0.9rem;
}

.chevron {
  font-size: 0.8rem;
  opacity: 0.7;
}

.theme-menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  min-width: 12rem;
  padding: 0.35rem;
  margin: 0;
  list-style: none;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  z-index: 10;
}

.theme-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.6rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.theme-item:hover {
  background: var(--border-color);
  color: var(--text-primary);
}

.theme-item.active {
  background: var(--hero-accent);
  color: #fff;
}

.theme-item-icon {
  font-size: 1rem;
}

.theme-item-label {
  font-size: 0.9rem;
  line-height: 1.2;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 120ms ease, transform 120ms ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

@media (max-width: 640px) {
  .theme-trigger-label {
    display: none;
  }

  .theme-menu {
    right: auto;
    left: 0;
  }
}
</style>
