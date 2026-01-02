import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Product } from "@/data/products";
import { fetchProducts, sortProducts } from "@/services/mockApi";

export const useProductStore = defineStore("products", () => {
  const allProducts = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Filter state
  const selectedCategory = ref<string>("All");
  const selectedSizes = ref<string[]>([]);
  const selectedColors = ref<string[]>([]);
  const priceRange = ref<[number, number]>([0, 100]);
  const searchQuery = ref("");
  const sortBy = ref<"price-low" | "price-high" | "newest" | "popularity">(
    "newest"
  );

  // Computed filtered products
  const filteredProducts = computed(() => {
    let filtered = [...allProducts.value];

    // Apply category filter
    if (selectedCategory.value && selectedCategory.value !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory.value);
    }

    // Apply size filter
    if (selectedSizes.value.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSizes.value.some((size) => p.sizes.includes(size))
      );
    }

    // Apply color filter
    if (selectedColors.value.length > 0) {
      filtered = filtered.filter((p) =>
        selectedColors.value.some((color) =>
          p.colors.some((c) => c.name.toLowerCase() === color.toLowerCase())
        )
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
    );

    // Apply sort
    filtered = sortProducts(filtered, sortBy.value);

    return filtered;
  });

  // Actions
  async function loadProducts() {
    loading.value = true;
    error.value = null;

    try {
      const data = await fetchProducts();
      allProducts.value = data;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to load products";
    } finally {
      loading.value = false;
    }
  }

  function setCategory(category: string) {
    selectedCategory.value = category;
  }

  function toggleSize(size: string) {
    const index = selectedSizes.value.indexOf(size);
    if (index > -1) {
      selectedSizes.value.splice(index, 1);
    } else {
      selectedSizes.value.push(size);
    }
  }

  function toggleColor(color: string) {
    const index = selectedColors.value.indexOf(color);
    if (index > -1) {
      selectedColors.value.splice(index, 1);
    } else {
      selectedColors.value.push(color);
    }
  }

  function setPriceRange(min: number, max: number) {
    priceRange.value = [min, max];
  }

  function setSearch(query: string) {
    searchQuery.value = query;
  }

  function setSortBy(
    sort: "price-low" | "price-high" | "newest" | "popularity"
  ) {
    sortBy.value = sort;
  }

  function resetFilters() {
    selectedCategory.value = "All";
    selectedSizes.value = [];
    selectedColors.value = [];
    priceRange.value = [0, 100];
    searchQuery.value = "";
    sortBy.value = "newest";
  }

  return {
    allProducts,
    loading,
    error,
    selectedCategory,
    selectedSizes,
    selectedColors,
    priceRange,
    searchQuery,
    sortBy,
    filteredProducts,
    loadProducts,
    setCategory,
    toggleSize,
    toggleColor,
    setPriceRange,
    setSearch,
    setSortBy,
    resetFilters,
  };
});
