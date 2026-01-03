<template>
  <div class="currency-switcher">
    <button 
      @click="isOpen = !isOpen"
      class="currency-button"
      :title="`Current currency: ${currentCurrencyInfo.name}`"
      ref="dropdownBtn"
    >
      <span class="currency-symbol">{{ currentCurrencyInfo.symbol }}</span>
      <span class="currency-code">{{ currentCurrency }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div v-if="isOpen" class="currency-dropdown" ref="dropdown">
      <button
        v-for="currency in currencies"
        :key="currency.code"
        @click="selectCurrency(currency.code)"
        class="currency-option"
        :class="{ active: currentCurrency === currency.code }"
      >
        <span class="option-symbol">{{ currency.symbol }}</span>
        <span class="option-info">
          <span class="option-code">{{ currency.code }}</span>
          <span class="option-name">{{ currency.name }}</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useCurrency, type Currency } from '@/composables/useCurrency'

const { currentCurrency, currencies, setCurrency, getCurrentCurrencyInfo } = useCurrency()
const isOpen = ref(false)
const dropdown = ref(null)

const currentCurrencyInfo = computed(() => getCurrentCurrencyInfo())

const selectCurrency = (currency: Currency) => {
  setCurrency(currency)
  isOpen.value = false
}

onClickOutside(dropdown, () => {
  isOpen.value = false
})
</script>

<style scoped>
.currency-switcher {
  position: relative;
  display: inline-block;
}

.currency-button {
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
  min-width: 100px;
}

.currency-button:hover {
  background: var(--border-color);
  border-color: var(--primary);
}

.currency-symbol {
  font-size: 1rem;
  font-weight: 600;
}

.currency-code {
  font-size: 0.875rem;
  font-weight: 600;
}

.currency-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 50;
  min-width: 200px;
  overflow: hidden;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.currency-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  transition: background-color 0.2s ease;
  text-align: left;
}

.currency-option:hover {
  background: var(--border-color);
}

.currency-option.active {
  background: var(--primary);
  color: white;
}

.currency-option.active .option-name {
  color: rgba(255, 255, 255, 0.8);
}

.option-symbol {
  font-size: 1.25rem;
  font-weight: 600;
  width: 30px;
  text-align: center;
}

.option-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.option-code {
  font-weight: 600;
  font-size: 0.875rem;
}

.option-name {
  font-size: 0.75rem;
  color: var(--text-secondary);
}
</style>
