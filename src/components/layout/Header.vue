<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo -->
      <router-link to="/" class="header-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M16 2H8L6 8v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8l-2-6zm-2 14h-4v-4h4v4z"
          />
        </svg>
        <span>TeeShop</span>
      </router-link>

      <!-- Navigation -->
      <nav class="header-nav">
        <router-link to="/">{{ t("nav.home") }}</router-link>
        <router-link to="/shop">{{ t("nav.shop") }}</router-link>
        <router-link to="/about">{{ t("nav.about") }}</router-link>
        <router-link to="/contact">{{ t("nav.contact") }}</router-link>
      </nav>

      <!-- Actions -->
      <div class="header-actions">
        <!-- Account -->
        <router-link
          v-if="auth.isAuthenticated"
          to="/account"
          class="header-link"
          >{{ auth.user?.name || auth.user?.email || "Account" }}</router-link
        >
        <router-link v-else to="/login" class="header-link"
          >Sign in</router-link
        >

        <!-- Search -->
        <div class="header-search">
          <input
            type="text"
            :placeholder="t('search.placeholder')"
            class="header-search-input"
            @focus="showSearchResults = true"
            @blur="() => setTimeout(() => (showSearchResults = false), 200)"
            @input="handleSearch"
            v-model="searchQuery"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <!-- Search results dropdown -->
          <div
            v-if="showSearchResults && searchResults.length"
            class="header-search-results"
          >
            <button
              v-for="result in searchResults"
              :key="result"
              class="header-search-result-item"
              @click="
                searchQuery = result;
                showSearchResults = false;
              "
            >
              {{ result }}
            </button>
          </div>
        </div>

        <!-- Language Switcher -->
        <LanguageSwitcher />

        <!-- Currency Switcher -->
        <CurrencySwitcher />

        <!-- Theme Toggle -->
        <ThemeToggle />

        <!-- Wishlist -->
        <button class="header-icon-button" title="Wishlist">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
        </button>

        <!-- Cart -->
        <button class="header-cart-button" @click="toggleCart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path
              d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
            ></path>
          </svg>
          <span v-if="cartItemCount > 0" class="header-cart-badge">{{
            cartItemCount
          }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useLanguage } from "@/composables/useLanguage";
import { searchProductsAutocomplete } from "@/services/mockApi";
import { debounce } from "@/utils/helpers";
import ThemeToggle from "@/components/ui/ThemeToggle.vue";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher.vue";
import CurrencySwitcher from "@/components/ui/CurrencySwitcher.vue";
import { useAuthStore } from "@/stores/authStore";

const cartStore = useCartStore();
const notificationStore = useNotificationStore();
const { t } = useLanguage();
const auth = useAuthStore();

const cartItemCount = computed(() => cartStore.itemCount);

const searchQuery = ref("");
const searchResults = ref<string[]>([]);
const showSearchResults = ref(false);

const handleSearch = debounce(async (event: Event) => {
  const query = (event.target as HTMLInputElement).value;
  if (query.trim()) {
    searchResults.value = await searchProductsAutocomplete(query);
  } else {
    searchResults.value = [];
  }
}, 300);

const toggleCart = () => {
  notificationStore.toggleCart();
};
</script>

<style scoped>
.header {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  sticky: top;
  z-index: 40;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.header-container {
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.header-logo:hover {
  color: var(--primary);
}

.header-nav {
  display: flex;
  gap: 2rem;
  flex: 1;
}

.header-nav a {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
}

.header-nav a:hover,
.header-nav a.router-link-active {
  color: var(--primary);
}

.header-nav a.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.header-link:hover {
  color: var(--primary);
}

.header-search {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--border-color);
  border-radius: 0.5rem;
  padding: 0 1rem;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
}

.header-search-input {
  border: none;
  background: transparent;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  width: 200px;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.header-search-input:focus {
  outline: none;
}

.header-search-input::placeholder {
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.header-search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.header-search-result-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.header-search-result-item:hover {
  background-color: var(--border-color);
}

.header-icon-button,
.header-cart-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  position: relative;
}

.header-icon-button:hover,
.header-cart-button:hover {
  color: var(--primary);
}

.header-cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .header-nav {
    display: none;
  }

  .header-search {
    display: none;
  }

  .header-container {
    gap: 1rem;
  }

  .header-search-input {
    width: 150px;
  }
}
</style>
