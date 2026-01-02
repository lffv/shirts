<template>
  <div class="shop">
    <div class="container">
      <div class="shop-header">
        <h1>Shop All Products</h1>
        <p>Discover our complete collection of premium t-shirts</p>
      </div>

      <div class="shop-layout">
        <!-- Sidebar Filters -->
        <aside class="shop-filters">
          <div class="filter-section">
            <h3>Category</h3>
            <div class="filter-group">
              <label
                v-for="cat in ['All', ...categories]"
                :key="cat"
                class="filter-label"
              >
                <input
                  type="radio"
                  :value="cat"
                  :checked="selectedCategory === cat"
                  @change="setCategory(cat)"
                />
                {{ cat }}
              </label>
            </div>
          </div>

          <div class="filter-section">
            <h3>Price Range</h3>
            <input
              type="range"
              min="0"
              max="150"
              :value="priceRange[1]"
              @input="
                setPriceRange(priceRange[0], parseInt($event.target.value))
              "
              class="range-slider"
            />
            <div class="price-display">
              ${{ priceRange[0] }} - ${{ priceRange[1] }}
            </div>
          </div>

          <div class="filter-section">
            <h3>Size</h3>
            <div class="filter-group">
              <label
                v-for="size in ['XS', 'S', 'M', 'L', 'XL', 'XXL']"
                :key="size"
                class="filter-label"
              >
                <input
                  type="checkbox"
                  :value="size"
                  :checked="selectedSizes.includes(size)"
                  @change="toggleSize(size)"
                />
                {{ size }}
              </label>
            </div>
          </div>

          <div class="filter-section">
            <h3>Color</h3>
            <div class="color-grid">
              <button
                v-for="color in availableColors"
                :key="color.name"
                :class="[
                  'color-button',
                  { active: selectedColors.includes(color.name) },
                ]"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
                @click="toggleColor(color.name)"
              >
                <svg
                  v-if="selectedColors.includes(color.name)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="white"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <button @click="resetFilters" class="reset-filters">
            Reset Filters
          </button>
        </aside>

        <!-- Main Content -->
        <main class="shop-content">
          <!-- Top Bar -->
          <div class="shop-top-bar">
            <div class="results-count">
              Showing {{ filteredProducts.length }} products
            </div>
            <div class="sort-controls">
              <select
                v-model="sortBy"
                @change="setSortBy(sortBy)"
                class="sort-select"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Loading products...</p>
          </div>

          <!-- Products Grid -->
          <div v-else-if="filteredProducts.length" class="product-grid">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- No Results -->
          <div v-else class="no-results">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3>No products found</h3>
            <p>Try adjusting your filters</p>
            <button @click="resetFilters" class="reset-btn">
              Reset Filters
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { categories } from "@/data/products";
import ProductCard from "@/components/features/ProductCard.vue";
import type { Product } from "@/data/products";

const route = useRoute();
const productStore = useProductStore();

onMounted(async () => {
  await productStore.loadProducts();

  // Set category from route query
  const categoryQuery = route.query.category as string;
  if (categoryQuery) {
    productStore.setCategory(categoryQuery);
  }
});

const selectedCategory = computed({
  get: () => productStore.selectedCategory,
  set: (val) => productStore.setCategory(val),
});

const selectedSizes = computed(() => productStore.selectedSizes);
const selectedColors = computed(() => productStore.selectedColors);
const priceRange = computed(() => productStore.priceRange);
const sortBy = computed(() => productStore.sortBy);
const filteredProducts = computed(() => productStore.filteredProducts);
const loading = computed(() => productStore.loading);

const availableColors = computed(() => {
  const colors = new Map<string, string>();
  productStore.allProducts.forEach((product) => {
    product.colors.forEach((color) => {
      colors.set(color.name, color.hex);
    });
  });
  return Array.from(colors, ([name, hex]) => ({ name, hex }));
});

const setCategory = (category: string) => {
  productStore.setCategory(category);
};

const toggleSize = (size: string) => {
  productStore.toggleSize(size);
};

const toggleColor = (color: string) => {
  productStore.toggleColor(color);
};

const setPriceRange = (min: number, max: number) => {
  productStore.setPriceRange(min, max);
};

const setSortBy = (
  sort: "price-low" | "price-high" | "newest" | "popularity"
) => {
  productStore.setSortBy(sort);
};

const resetFilters = () => {
  productStore.resetFilters();
};
</script>

<style scoped>
.shop {
  padding: 2rem 0;
  min-height: calc(100vh - 300px);
}

.container {
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
}

.shop-header {
  text-align: center;
  margin-bottom: 3rem;
}

.shop-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 0.5rem;
}

.shop-header p {
  color: #6b7280;
  font-size: 1.125rem;
}

.shop-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.shop-filters {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.filter-section {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.filter-section h3 {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: var(--secondary);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #6b7280;
}

.filter-label input {
  cursor: pointer;
}

.range-slider {
  width: 100%;
  cursor: pointer;
}

.price-display {
  margin-top: 0.75rem;
  font-weight: 600;
  color: var(--primary);
  text-align: center;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.color-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-button:hover {
  transform: scale(1.1);
}

.color-button.active {
  border-color: var(--secondary);
  box-shadow: 0 0 0 2px white, 0 0 0 4px var(--secondary);
}

.reset-filters {
  padding: 0.75rem;
  background: #f3f4f6;
  border: none;
  border-radius: 0.5rem;
  color: var(--secondary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-filters:hover {
  background: #e5e7eb;
}

.shop-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.shop-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.results-count {
  color: #6b7280;
  font-size: 0.875rem;
}

.sort-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  background: white;
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner + p {
  margin-top: 1rem;
  color: #6b7280;
}

.no-results {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.no-results svg {
  color: #d1d5db;
  margin-bottom: 1rem;
}

.no-results h3 {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.reset-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
}

.reset-btn:hover {
  background: #2563eb;
}

@media (max-width: 768px) {
  .shop-layout {
    grid-template-columns: 1fr;
  }

  .shop-filters {
    display: none;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .shop-header h1 {
    font-size: 1.75rem;
  }
}
</style>
