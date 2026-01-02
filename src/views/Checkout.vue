<template>
  <div class="checkout-page">
    <div class="container">
      <!-- Header -->
      <div class="checkout-header">
        <h1>Checkout</h1>
      </div>

      <div class="checkout-layout">
        <!-- Main Content -->
        <div class="checkout-main">
          <div v-if="!orderSubmitted">
            <CheckoutWizard @orderSubmitted="handleOrderSubmitted" />
          </div>

          <!-- Order Confirmation -->
          <div v-else class="order-confirmation">
            <div class="confirmation-icon">✓</div>
            <h2>Order Confirmed!</h2>
            <p class="confirmation-message">Thank you for your purchase</p>

            <div class="order-details">
              <div class="detail-row">
                <span>Order Number</span>
                <strong>{{ orderNumber }}</strong>
              </div>
              <div class="detail-row">
                <span>Email</span>
                <strong>confirmation@teeshop.com</strong>
              </div>
              <div class="detail-row">
                <span>Estimated Delivery</span>
                <strong>5-7 business days</strong>
              </div>
            </div>

            <p class="confirmation-info">
              A confirmation email has been sent to you. Track your order using
              the order number above.
            </p>

            <div class="confirmation-actions">
              <router-link to="/" class="btn-home">Return to Home</router-link>
              <router-link to="/shop" class="btn-shop"
                >Continue Shopping</router-link
              >
            </div>
          </div>
        </div>

        <!-- Summary Sidebar -->
        <aside v-if="!orderSubmitted" class="checkout-summary">
          <h3>Order Summary</h3>

          <!-- Items -->
          <div class="summary-items">
            <div
              v-for="item in cartItems"
              :key="`${item.productId}-${item.size}-${item.color}`"
              class="summary-item"
            >
              <img :src="item.image" :alt="item.name" />
              <div class="item-info">
                <p class="item-name">{{ item.name }}</p>
                <p class="item-meta">{{ item.size }} • {{ item.color }}</p>
              </div>
              <div class="item-details">
                <p class="item-qty">x{{ item.quantity }}</p>
                <p class="item-price">
                  {{ formatCurrency(item.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Totals -->
          <div class="summary-totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="total-row">
              <span>Shipping</span>
              <span>{{ formatCurrency(shippingCost) }}</span>
            </div>
            <div class="total-row">
              <span>Tax</span>
              <span>{{ formatCurrency(tax) }}</span>
            </div>
            <div class="total-row grand-total">
              <span>Grand Total</span>
              <span>{{ formatCurrency(total) }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";
import { useCurrency } from "@/composables/useCurrency";
import CheckoutWizard from "@/components/features/CheckoutWizard.vue";

const router = useRouter();
const cartStore = useCartStore();
const { formatAmount } = useCurrency();

const formatCurrency = (amount: number) => formatAmount(amount);

const orderSubmitted = ref(false);
const orderNumber = ref("");

const cartItems = computed(() => cartStore.items);
const subtotal = computed(() => cartStore.subtotal);
const shippingCost = computed(() => cartStore.shippingCost);
const tax = computed(() => cartStore.tax);
const total = computed(() => cartStore.total);

const handleOrderSubmitted = (ordNum: string) => {
  orderNumber.value = ordNum;
  orderSubmitted.value = true;

  // Redirect to home after 5 seconds if not clicked
  setTimeout(() => {
    if (orderSubmitted.value) {
      router.push("/");
    }
  }, 5000);
};
</script>

<style scoped>
.checkout-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f9fafb;
}

.container {
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
}

.checkout-header {
  text-align: center;
  margin-bottom: 2rem;
}

.checkout-header h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--secondary);
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

.checkout-main {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.checkout-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  height: fit-content;
  sticky: top;
  top: 100px;
}

.checkout-summary h3 {
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--secondary);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  max-height: 400px;
  overflow-y: auto;
}

.summary-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 0.75rem;
  align-items: start;
}

.summary-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
  background: #f3f4f6;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--secondary);
}

.item-meta {
  font-size: 0.75rem;
  color: #6b7280;
}

.item-details {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-qty {
  font-size: 0.875rem;
  color: #6b7280;
}

.item-price {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.875rem;
}

.summary-totals {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
}

.total-row.grand-total {
  font-weight: 700;
  font-size: 1rem;
  color: var(--secondary);
  border-top: 1px solid #e5e7eb;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

.order-confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.confirmation-icon {
  width: 80px;
  height: 80px;
  background: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #10b981;
  margin-bottom: 1.5rem;
}

.order-confirmation h2 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 0.5rem;
}

.confirmation-message {
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.order-details {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 500px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row span {
  color: #6b7280;
}

.detail-row strong {
  color: var(--secondary);
  font-family: monospace;
}

.confirmation-info {
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 500px;
}

.confirmation-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-home,
.btn-shop {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-home {
  background: var(--primary);
  color: white;
}

.btn-home:hover {
  background: #2563eb;
}

.btn-shop {
  background: #e5e7eb;
  color: var(--secondary);
}

.btn-shop:hover {
  background: #d1d5db;
}

@media (max-width: 768px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .checkout-summary {
    position: relative;
    sticky: initial;
    top: initial;
  }

  .checkout-header h1 {
    font-size: 1.5rem;
  }

  .order-confirmation {
    padding: 2rem 1rem;
  }
}
</style>
