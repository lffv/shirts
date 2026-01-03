import { ref, watch } from "vue";
import { debounce } from "@/utils/helpers";

/**
 * Composable for search with debounce
 */
export const useSearch = (
  onSearch: (query: string) => void,
  delayMs: number = 300
) => {
  const searchQuery = ref("");

  const debouncedSearch = debounce((query: string) => {
    onSearch(query);
  }, delayMs);

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery);
  });

  const clearSearch = () => {
    searchQuery.value = "";
  };

  return {
    searchQuery,
    clearSearch,
  };
};

/**
 * Composable for pagination
 */
export const usePagination = <T>(items: T[], itemsPerPage: number = 10) => {
  const currentPage = ref(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = () => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const goToPage = (page: number) => {
    currentPage.value = Math.max(1, Math.min(page, totalPages));
  };

  const nextPage = () => goToPage(currentPage.value + 1);
  const prevPage = () => goToPage(currentPage.value - 1);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
  };
};

/**
 * Composable for favorite/wishlist functionality
 */
export const useWishlist = () => {
  const wishlist = ref<Set<string>>(loadWishlistFromStorage());

  const isFavorite = (id: string) => wishlist.value.has(id);

  const toggleFavorite = (id: string) => {
    if (wishlist.value.has(id)) {
      wishlist.value.delete(id);
    } else {
      wishlist.value.add(id);
    }
    saveWishlistToStorage();
  };

  const addToWishlist = (id: string) => {
    wishlist.value.add(id);
    saveWishlistToStorage();
  };

  const removeFromWishlist = (id: string) => {
    wishlist.value.delete(id);
    saveWishlistToStorage();
  };

  function saveWishlistToStorage() {
    localStorage.setItem(
      "tshirt-wishlist",
      JSON.stringify(Array.from(wishlist.value))
    );
  }

  function loadWishlistFromStorage(): Set<string> {
    try {
      const stored = localStorage.getItem("tshirt-wishlist");
      return new Set(stored ? JSON.parse(stored) : []);
    } catch {
      return new Set();
    }
  }

  return {
    wishlist,
    isFavorite,
    toggleFavorite,
    addToWishlist,
    removeFromWishlist,
  };
};

/**
 * Composable for form validation
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean | string;
}

export const useFormValidation = (fields: Record<string, ValidationRule>) => {
  const formData = ref<Record<string, string>>({});
  const errors = ref<Record<string, string>>({});

  const validate = (fieldName: string, value: string): boolean => {
    const rules = fields[fieldName];
    if (!rules) return true;

    if (rules.required && !value.trim()) {
      errors.value[fieldName] = "This field is required";
      return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.value[fieldName] = `Minimum length is ${rules.minLength}`;
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.value[fieldName] = `Maximum length is ${rules.maxLength}`;
      return false;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors.value[fieldName] = "Invalid format";
      return false;
    }

    if (rules.custom) {
      const result = rules.custom(value);
      if (result !== true) {
        errors.value[fieldName] =
          typeof result === "string" ? result : "Invalid value";
        return false;
      }
    }

    delete errors.value[fieldName];
    return true;
  };

  const validateAll = (): boolean => {
    let isValid = true;
    Object.keys(fields).forEach((fieldName) => {
      if (!validate(fieldName, formData.value[fieldName] || "")) {
        isValid = false;
      }
    });
    return isValid;
  };

  const setFieldValue = (fieldName: string, value: string) => {
    formData.value[fieldName] = value;
    validate(fieldName, value);
  };

  const resetForm = () => {
    formData.value = {};
    errors.value = {};
  };

  return {
    formData,
    errors,
    validate,
    validateAll,
    setFieldValue,
    resetForm,
  };
};

/**
 * Composable for loading state
 */
export const useLoading = () => {
  const isLoading = ref(false);

  const startLoading = () => {
    isLoading.value = true;
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  const withLoading = async <T>(callback: () => Promise<T>): Promise<T> => {
    startLoading();
    try {
      return await callback();
    } finally {
      stopLoading();
    }
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
};
