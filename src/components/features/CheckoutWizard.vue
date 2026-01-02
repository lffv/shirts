<template>
  <div class="checkout-wizard">
    <!-- Steps -->
    <div class="checkout-steps">
      <button
        v-for="(step, index) in steps"
        :key="index"
        :class="[
          'checkout-step',
          { active: currentStep === index, completed: currentStep > index },
        ]"
        @click="goToStep(index)"
        :disabled="currentStep < index"
      >
        <span class="step-number">{{ index + 1 }}</span>
        <span class="step-label">{{ step }}</span>
      </button>
    </div>

    <!-- Content -->
    <div class="checkout-content">
      <!-- Step 1: Contact -->
      <div v-if="currentStep === 0" class="checkout-form">
        <h3>Contact Information</h3>
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="you@example.com"
            class="form-input"
            @blur="validateField('email')"
          />
          <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input
            v-model="formData.phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            class="form-input"
            @blur="validateField('phone')"
          />
          <span v-if="errors.phone" class="form-error">{{ errors.phone }}</span>
        </div>
      </div>

      <!-- Step 2: Shipping Address -->
      <div v-if="currentStep === 1" class="checkout-form">
        <h3>Shipping Address</h3>
        <div class="form-group">
          <label>Full Name</label>
          <input
            v-model="formData.fullName"
            type="text"
            placeholder="John Doe"
            class="form-input"
            @blur="validateField('fullName')"
          />
          <span v-if="errors.fullName" class="form-error">{{
            errors.fullName
          }}</span>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Street Address</label>
            <input
              v-model="formData.street"
              type="text"
              placeholder="123 Main St"
              class="form-input"
              @blur="validateField('street')"
            />
            <span v-if="errors.street" class="form-error">{{
              errors.street
            }}</span>
          </div>
          <div class="form-group">
            <label>Apt, Suite, etc.</label>
            <input
              v-model="formData.apt"
              type="text"
              placeholder="Apt 4B (Optional)"
              class="form-input"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>City</label>
            <input
              v-model="formData.city"
              type="text"
              placeholder="New York"
              class="form-input"
              @blur="validateField('city')"
            />
            <span v-if="errors.city" class="form-error">{{ errors.city }}</span>
          </div>
          <div class="form-group">
            <label>State</label>
            <input
              v-model="formData.state"
              type="text"
              placeholder="NY"
              class="form-input"
              @blur="validateField('state')"
            />
            <span v-if="errors.state" class="form-error">{{
              errors.state
            }}</span>
          </div>
          <div class="form-group">
            <label>ZIP Code</label>
            <input
              v-model="formData.zip"
              type="text"
              placeholder="10001"
              class="form-input"
              @blur="validateField('zip')"
            />
            <span v-if="errors.zip" class="form-error">{{ errors.zip }}</span>
          </div>
        </div>
        <label class="form-checkbox">
          <input v-model="formData.saveAddress" type="checkbox" />
          Save this address for future orders
        </label>
      </div>

      <!-- Step 3: Shipping Method -->
      <div v-if="currentStep === 2" class="checkout-form">
        <h3>Shipping Method</h3>
        <div class="shipping-methods">
          <label
            v-for="method in shippingMethods"
            :key="method.id"
            class="shipping-method"
          >
            <input
              v-model="formData.shippingMethod"
              type="radio"
              :value="method.id"
            />
            <div class="method-info">
              <div class="method-name">{{ method.name }}</div>
              <div class="method-details">{{ method.details }}</div>
            </div>
            <div class="method-price">{{ formatCurrency(method.price) }}</div>
          </label>
        </div>
      </div>

      <!-- Step 4: Payment -->
      <div v-if="currentStep === 3" class="checkout-form">
        <h3>Payment Method</h3>
        <div class="payment-methods">
          <label
            v-for="method in paymentMethods"
            :key="method.id"
            class="payment-method"
          >
            <input
              v-model="formData.paymentMethod"
              type="radio"
              :value="method.id"
            />
            <div class="method-icon">
              <span>{{ method.icon }}</span>
            </div>
            <div class="method-name">{{ method.name }}</div>
          </label>
        </div>

        <!-- Credit Card Form (if credit card selected) -->
        <div v-if="formData.paymentMethod === 'card'" class="form-group">
          <label>Card Number</label>
          <input
            v-model="formData.cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            class="form-input"
            maxlength="19"
          />
        </div>
      </div>

      <!-- Step 5: Review -->
      <div v-if="currentStep === 4" class="checkout-review">
        <h3>Order Review</h3>

        <!-- Items -->
        <div class="review-section">
          <h4>Items</h4>
          <div
            v-for="item in cartItems"
            :key="`${item.productId}-${item.size}-${item.color}`"
            class="review-item"
          >
            <img :src="item.image" :alt="item.name" />
            <div class="review-item-info">
              <p class="review-item-name">{{ item.name }}</p>
              <p class="review-item-variant">
                {{ item.color }} • {{ item.size }} • Qty: {{ item.quantity }}
              </p>
            </div>
            <p class="review-item-price">
              {{ formatCurrency(item.price * item.quantity) }}
            </p>
          </div>
        </div>

        <!-- Contact -->
        <div class="review-section">
          <h4>Contact</h4>
          <p>{{ formData.email }}</p>
          <p>{{ formData.phone }}</p>
        </div>

        <!-- Address -->
        <div class="review-section">
          <h4>Shipping Address</h4>
          <p>{{ formData.fullName }}</p>
          <p>{{ formData.street }} {{ formData.apt }}</p>
          <p>{{ formData.city }}, {{ formData.state }} {{ formData.zip }}</p>
        </div>

        <!-- Totals -->
        <div class="review-totals">
          <div class="review-total-row">
            <span>Subtotal</span>
            <span>{{ formatCurrency(subtotal) }}</span>
          </div>
          <div class="review-total-row">
            <span>Shipping</span>
            <span>{{ formatCurrency(shippingCost) }}</span>
          </div>
          <div class="review-total-row">
            <span>Tax</span>
            <span>{{ formatCurrency(tax) }}</span>
          </div>
          <div class="review-total-row grand-total">
            <span>Grand Total</span>
            <span>{{ formatCurrency(total) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="checkout-actions">
      <button
        v-if="currentStep > 0"
        @click="previousStep"
        class="btn btn-secondary"
      >
        Back
      </button>
      <button
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        class="btn btn-primary"
        :disabled="!isStepValid"
      >
        Continue
      </button>
      <button
        v-if="currentStep === steps.length - 1"
        @click="submitOrder"
        class="btn btn-primary"
        :disabled="!isStepValid || isSubmitting"
        :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
      >
        {{ isSubmitting ? "Processing..." : "Place Order" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useCurrency } from "@/composables/useCurrency";
import { validateEmail, validatePhone } from "@/utils/helpers";

const cartStore = useCartStore();
const notificationStore = useNotificationStore();
const { formatAmount } = useCurrency();

const formatCurrency = (amount: number) => formatAmount(amount);

const emit = defineEmits<{
  orderSubmitted: [orderNumber: string];
}>();

const currentStep = ref(0);
const isSubmitting = ref(false);

const steps = ["Contact", "Shipping", "Method", "Payment", "Review"];

const formData = reactive({
  email: "",
  phone: "",
  fullName: "",
  street: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  saveAddress: false,
  shippingMethod: "standard",
  paymentMethod: "card",
  cardNumber: "",
});

const errors = reactive<Record<string, string>>({});

const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    details: "Arrives in 5-7 business days",
    price: 9.99,
  },
  {
    id: "express",
    name: "Express Shipping",
    details: "Arrives in 2-3 business days",
    price: 24.99,
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    details: "Arrives next business day",
    price: 49.99,
  },
];

const paymentMethods = [
  { id: "card", name: "Credit Card", icon: "💳" },
  { id: "paypal", name: "PayPal", icon: "🅿️" },
  { id: "apple", name: "Apple Pay", icon: "🍎" },
];

const cartItems = computed(() => cartStore.items);
const subtotal = computed(() => cartStore.subtotal);
const shippingCost = computed(() => {
  const method = shippingMethods.find((m) => m.id === formData.shippingMethod);
  return method ? method.price : 0;
});
const tax = computed(() => Math.round(subtotal.value * 0.08 * 100) / 100);
const total = computed(() => subtotal.value + shippingCost.value + tax.value);

const validateField = (field: string) => {
  delete errors[field];

  switch (field) {
    case "email":
      if (!formData.email) errors.email = "Email is required";
      else if (!validateEmail(formData.email)) errors.email = "Invalid email";
      break;
    case "phone":
      if (!formData.phone) errors.phone = "Phone is required";
      else if (!validatePhone(formData.phone))
        errors.phone = "Invalid phone number";
      break;
    case "fullName":
      if (!formData.fullName.trim()) errors.fullName = "Full name is required";
      break;
    case "street":
      if (!formData.street.trim()) errors.street = "Street address is required";
      break;
    case "city":
      if (!formData.city.trim()) errors.city = "City is required";
      break;
    case "state":
      if (!formData.state.trim()) errors.state = "State is required";
      break;
    case "zip":
      if (!formData.zip.trim()) errors.zip = "ZIP code is required";
      break;
  }
};

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 0:
      return (
        formData.email &&
        validateEmail(formData.email) &&
        formData.phone &&
        validatePhone(formData.phone)
      );
    case 1:
      return (
        formData.fullName &&
        formData.street &&
        formData.city &&
        formData.state &&
        formData.zip
      );
    case 2:
      return formData.shippingMethod;
    case 3:
      return formData.paymentMethod;
    case 4:
      return true;
  }
  return false;
});

const goToStep = (step: number) => {
  if (step < currentStep.value) {
    currentStep.value = step;
  }
};

const nextStep = () => {
  // Validate current step
  if (currentStep.value === 0) {
    validateField("email");
    validateField("phone");
  } else if (currentStep.value === 1) {
    validateField("fullName");
    validateField("street");
    validateField("city");
    validateField("state");
    validateField("zip");
  }

  if (isStepValid.value && currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const submitOrder = async () => {
  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate order number
    const orderNumber = `ORDER-${Date.now().toString(36).toUpperCase()}`;

    // Clear cart
    cartStore.clearCart();

    // Emit event
    emit("orderSubmitted", orderNumber);

    notificationStore.addNotification("Order placed successfully!", "success");
  } catch (error) {
    notificationStore.addNotification(
      "Failed to place order. Please try again.",
      "error"
    );
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.checkout-wizard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.checkout-steps {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.checkout-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.checkout-step:hover:not(:disabled) {
  border-color: var(--primary);
}

.checkout-step.active {
  border-color: var(--primary);
  background: #eff6ff;
}

.checkout-step.completed {
  border-color: #10b981;
  background: #f0fdf4;
}

.checkout-step:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e7eb;
  border-radius: 50%;
  font-weight: 700;
  color: var(--secondary);
}

.checkout-step.active .step-number {
  background: var(--primary);
  color: white;
}

.checkout-step.completed .step-number {
  background: #10b981;
  color: white;
}

.checkout-content {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  min-height: 400px;
}

.checkout-form h3,
.checkout-review h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--secondary);
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--secondary);
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-error {
  font-size: 0.875rem;
  color: #ef4444;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--secondary);
}

.form-checkbox input {
  cursor: pointer;
}

.shipping-methods,
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.shipping-method,
.payment-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.shipping-method:has(input:checked),
.payment-method:has(input:checked) {
  border-color: var(--primary);
  background: #eff6ff;
}

.shipping-method input,
.payment-method input {
  cursor: pointer;
}

.method-info {
  flex: 1;
}

.method-name {
  font-weight: 600;
  color: var(--secondary);
}

.method-details {
  font-size: 0.875rem;
  color: #6b7280;
}

.method-price {
  font-weight: 600;
  color: var(--primary);
}

.method-icon {
  font-size: 1.5rem;
}

.checkout-review {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-section {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.review-section h4 {
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--secondary);
}

.review-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
}

.review-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.review-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.review-item-name {
  font-weight: 600;
  color: var(--secondary);
}

.review-item-variant {
  font-size: 0.875rem;
  color: #6b7280;
}

.review-item-price {
  font-weight: 600;
  color: var(--primary);
}

.review-totals {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
}

.review-total-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.875rem;
}

.review-total-row.grand-total {
  font-weight: 700;
  font-size: 1rem;
  color: var(--secondary);
  border-top: 2px solid white;
  padding-top: 0.75rem;
  margin-top: 0.75rem;
}

.checkout-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #e5e7eb;
  color: var(--secondary);
}

.btn-secondary:hover {
  background: #d1d5db;
}

@media (max-width: 768px) {
  .checkout-steps {
    gap: 0.5rem;
  }

  .checkout-step {
    padding: 0.75rem;
    font-size: 0.75rem;
  }

  .step-label {
    display: none;
  }

  .step-number {
    width: 28px;
    height: 28px;
    font-size: 0.875rem;
  }

  .checkout-content {
    padding: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .checkout-actions {
    flex-direction: column-reverse;
  }

  .btn-primary,
  .btn-secondary {
    flex: initial;
    width: 100%;
  }
}
</style>
