import { Product, products } from "@/data/products";

const DELAY = { min: 100, max: 300 };

/**
 * Simulates API delay
 */
const simulateDelay = (): Promise<void> => {
  const delay = Math.random() * (DELAY.max - DELAY.min) + DELAY.min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Fetch all products with optional filtering
 */
export const fetchProducts = async (filters?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
}): Promise<Product[]> => {
  await simulateDelay();

  let filtered = [...products];

  if (filters?.category && filters.category !== "All") {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters?.size) {
    filtered = filtered.filter((p) => p.sizes.includes(filters.size!));
  }

  if (filters?.color) {
    filtered = filtered.filter((p) =>
      p.colors.some(
        (c) => c.name.toLowerCase() === filters.color!.toLowerCase()
      )
    );
  }

  return filtered;
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id: string): Promise<Product | null> => {
  await simulateDelay();
  return products.find((p) => p.id === id) || null;
};

/**
 * Fetch related products
 */
export const fetchRelatedProducts = async (
  productId: string,
  limit: number = 4
): Promise<Product[]> => {
  await simulateDelay();

  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

/**
 * Fetch featured products
 */
export const fetchFeaturedProducts = async (
  limit: number = 8
): Promise<Product[]> => {
  await simulateDelay();
  return products.filter((p) => p.featured).slice(0, limit);
};

/**
 * Search products with autocomplete
 */
export const searchProductsAutocomplete = async (
  query: string
): Promise<string[]> => {
  await simulateDelay();

  const searchLower = query.toLowerCase();
  const results = new Set<string>();

  products.forEach((product) => {
    if (product.name.toLowerCase().includes(searchLower)) {
      results.add(product.name);
    }
    product.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(searchLower)) {
        results.add(tag);
      }
    });
  });

  return Array.from(results).slice(0, 10);
};

/**
 * Sort products
 */
export const sortProducts = (
  items: Product[],
  sortBy: "price-low" | "price-high" | "newest" | "popularity"
): Product[] => {
  const sorted = [...items];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "popularity":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case "newest":
    default:
      return sorted;
  }
};
