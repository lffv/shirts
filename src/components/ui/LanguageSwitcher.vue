<template>
  <div class="language-switcher">
    <button
      @click="isOpen = !isOpen"
      class="language-button"
      :title="`Current language: ${currentLanguageName}`"
    >
      <span class="language-flag">{{ currentLanguageFlag }}</span>
      <span class="language-code">{{ currentLanguage.toUpperCase() }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div v-if="isOpen" class="language-dropdown">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="selectLanguage(lang.code as Language)"
        class="language-option"
        :class="{ active: currentLanguage === lang.code }"
      >
        <span class="option-flag">{{ lang.flag }}</span>
        <span class="option-name">{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useLanguage, type Language } from "@/composables/useLanguage";

const { currentLanguage, setLanguage, languages } = useLanguage();
const isOpen = ref(false);
const dropdown = ref(null);

const currentLanguageName = computed(() => {
  const lang = languages.value.find((l) => l.code === currentLanguage.value);
  return lang?.name || "Portuguese";
});

const currentLanguageFlag = computed(() => {
  const lang = languages.value.find((l) => l.code === currentLanguage.value);
  return lang?.flag || "🇵🇹";
});

const selectLanguage = (lang: Language) => {
  setLanguage(lang);
  isOpen.value = false;
};

onClickOutside(dropdown, () => {
  isOpen.value = false;
});
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  cursor: pointer;
  color: var(--text-primary);
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.language-button:hover {
  background: var(--border-color);
  color: var(--primary);
}

.language-flag {
  font-size: 1rem;
}

.language-code {
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.language-button svg {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
  overflow: hidden;
  min-width: 180px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  text-align: left;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 0.875rem;
}

.language-option:hover {
  background-color: var(--border-color);
  color: var(--primary);
}

.language-option.active {
  background-color: var(--primary);
  color: white;
  font-weight: 600;
}

.option-flag {
  font-size: 1.25rem;
}

.option-name {
  flex: 1;
}

@media (max-width: 768px) {
  .language-code {
    display: none;
  }

  .language-dropdown {
    right: auto;
    left: 0;
  }
}
</style>
