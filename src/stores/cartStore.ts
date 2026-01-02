import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
  colorHex: string;
}

const STORAGE_KEY = "tshirt-cart";

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>(loadCartFromStorage());

  // Computed properties
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const shippingCost = computed(() => {
    if (subtotal.value === 0) return 0;
    if (subtotal.value > 100) return 0; // Free shipping over $100
    return 9.99;
  });

  const tax = computed(() => Math.round(subtotal.value * 0.08 * 100) / 100); // 8% tax

  const total = computed(() => subtotal.value + shippingCost.value + tax.value);

  // Actions
  function addItem(item: CartItem) {
    const existing = items.value.find(
      (i) =>
        i.productId === item.productId &&
        i.size === item.size &&
        i.color === item.color
    );

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.value.push(item);
    }

    saveCartToStorage();
  }

  function removeItem(productId: string, size: string, color: string) {
    items.value = items.value.filter(
      (i) =>
        !(i.productId === productId && i.size === size && i.color === color)
    );
    saveCartToStorage();
  }

  function updateQuantity(
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) {
    const item = items.value.find(
      (i) => i.productId === productId && i.size === size && i.color === color
    );
    if (item) {
      if (quantity <= 0) {
        removeItem(productId, size, color);
      } else {
        item.quantity = quantity;
        saveCartToStorage();
      }
    }
  }

  function clearCart() {
    items.value = [];
    saveCartToStorage();
  }

  // Local storage helpers
  function saveCartToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value));
  }

  function loadCartFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  return {
    items,
    itemCount,
    subtotal,
    shippingCost,
    tax,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
});
