<template>
  <Transition name="slide">
    <div v-if="visible" class="cart-sidebar">
      <!-- Header -->
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button class="cart-close" @click="closeCart" aria-label="Close cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Items -->
      <div class="cart-items">
        <div v-if="cartItems.length === 0" class="cart-empty">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path
              d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
            ></path>
          </svg>
          <p>Your cart is empty</p>
          <router-link to="/shop" class="cart-empty-link" @click="closeCart">
            Continue Shopping
          </router-link>
        </div>

        <div v-else class="cart-item-list">
          <div
            v-for="(item, index) in cartItems"
            :key="`${item.productId}-${item.size}-${item.color}`"
            class="cart-item"
          >
            <!-- Image -->
            <img :src="item.image" :alt="item.name" class="cart-item-image" />

            <!-- Info -->
            <div class="cart-item-info">
              <h4>{{ item.name }}</h4>
              <p class="cart-item-variant">
                {{ item.color }} • {{ item.size }}
              </p>
              <p class="cart-item-price">{{ formatCurrency(item.price) }}</p>
            </div>

            <!-- Quantity -->
            <div class="cart-item-quantity">
              <button
                @click="updateQuantity(item, item.quantity - 1)"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                :value="item.quantity"
                type="number"
                min="1"
                @change="
                  updateQuantity(item, parseInt($event.target.value) || 1)
                "
                class="quantity-input"
              />
              <button
                @click="updateQuantity(item, item.quantity + 1)"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <!-- Remove -->
            <button
              class="cart-item-remove"
              @click="removeItem(item)"
              aria-label="Remove item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="cartItems.length > 0" class="cart-summary">
        <div class="cart-summary-row">
          <span>Subtotal</span>
          <span>{{ formatCurrency(subtotal) }}</span>
        </div>
        <div class="cart-summary-row">
          <span>Shipping</span>
          <span>{{ formatCurrency(shippingCost) }}</span>
        </div>
        <div class="cart-summary-row">
          <span>Tax</span>
          <span>{{ formatCurrency(tax) }}</span>
        </div>
        <div class="cart-summary-row total">
          <span>Total</span>
          <span>{{ formatCurrency(total) }}</span>
        </div>

        <!-- Checkout Button -->
        <router-link
          to="/checkout"
          class="cart-checkout-btn"
          @click="closeCart"
        >
          Proceed to Checkout
        </router-link>

        <button class="cart-continue-btn" @click="closeCart">
          Continue Shopping
        </button>
      </div>
    </div>
  </Transition>

  <!-- Backdrop -->
  <Transition name="fade">
    <div v-if="visible" class="cart-backdrop" @click="closeCart"></div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useCurrency } from "@/composables/useCurrency";

const cartStore = useCartStore();
const notificationStore = useNotificationStore();
const { formatAmount } = useCurrency();

const formatCurrency = (amount: number) => formatAmount(amount);

const visible = computed(() => notificationStore.showCart);
const cartItems = computed(() => cartStore.items);
const subtotal = computed(() => cartStore.subtotal);
const shippingCost = computed(() => cartStore.shippingCost);
const tax = computed(() => cartStore.tax);
const total = computed(() => cartStore.total);

const closeCart = () => {
  notificationStore.closeCart();
};

const removeItem = (item: CartItem) => {
  cartStore.removeItem(item.productId, item.size, item.color);
  notificationStore.addNotification(`${item.name} removed from cart`, "info");
};

const updateQuantity = (item: CartItem, quantity: number) => {
  if (quantity > 0) {
    cartStore.updateQuantity(item.productId, item.size, item.color, quantity);
  }
};
</script>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 450px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 40;
}

.cart-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 35;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.cart-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--secondary);
}

.cart-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--secondary);
  transition: color 0.2s ease;
}

.cart-close:hover {
  color: var(--primary);
}

.cart-items {
  flex: 1;
  overflow-y: auto;
}

.cart-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}

.cart-empty svg {
  color: #d1d5db;
  margin-bottom: 1rem;
}

.cart-empty p {
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}

.cart-empty-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.cart-empty-link:hover {
  color: #2563eb;
}

.cart-item-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  gap: 1rem;
  align-items: start;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  background: #f3f4f6;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cart-item-info h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--secondary);
}

.cart-item-variant {
  font-size: 0.75rem;
  color: #6b7280;
}

.cart-item-price {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.875rem;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background: #f9fafb;
}

.cart-item-quantity button {
  padding: 0.25rem 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--secondary);
  font-weight: 600;
}

.quantity-input {
  width: 40px;
  text-align: center;
  border: none;
  background: none;
  font-weight: 600;
  font-size: 0.875rem;
}

.quantity-input:focus {
  outline: none;
}

.cart-item-remove {
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;
}

.cart-item-remove:hover {
  color: #ef4444;
}

.cart-summary {
  padding: 1.5rem;
  border-top: 2px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
}

.cart-summary-row.total {
  font-weight: 700;
  font-size: 1rem;
  color: var(--secondary);
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
}

.cart-checkout-btn,
.cart-continue-btn {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: block;
  text-align: center;
}

.cart-checkout-btn {
  background: var(--primary);
  color: white;
}

.cart-checkout-btn:hover {
  background: #2563eb;
}

.cart-continue-btn {
  background: #f3f4f6;
  color: var(--secondary);
}

.cart-continue-btn:hover {
  background: #e5e7eb;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .cart-sidebar {
    max-width: 100%;
  }
}
</style>
