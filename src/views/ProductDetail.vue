<template>
  <div class="product-detail">
    <div class="container">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/">Home</router-link>
        <span>/</span>
        <router-link to="/shop">Shop</router-link>
        <span>/</span>
        <span>{{ product?.name }}</span>
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="product" class="product-layout">
        <!-- Gallery -->
        <div class="product-gallery">
          <ProductGallery :images="product.images" />
        </div>

        <!-- Info -->
        <div class="product-info">
          <h1>{{ product.name }}</h1>

          <!-- Rating -->
          <div class="product-rating">
            <div class="stars">
              <span
                v-for="i in 5"
                :key="i"
                :class="{ filled: i <= Math.round(product.rating) }"
                >★</span
              >
            </div>
            <span class="review-count">({{ product.reviews }} reviews)</span>
          </div>

          <!-- Price -->
          <div class="product-price">
            <span class="current-price">{{
              formatCurrency(product.price)
            }}</span>
            <span v-if="product.originalPrice" class="original-price">
              {{ formatCurrency(product.originalPrice) }}
            </span>
            <span v-if="discount" class="discount">Save {{ discount }}%</span>
          </div>

          <!-- Description -->
          <p class="product-description">{{ product.description }}</p>

          <!-- Stock Status -->
          <div
            class="stock-status"
            :class="{
              'in-stock': product.stock > 0,
              'low-stock': product.stock < 10,
            }"
          >
            {{
              product.stock > 0 ? `${product.stock} in stock` : "Out of stock"
            }}
          </div>

          <!-- Options -->
          <div class="product-options">
            <!-- Color -->
            <div class="option-group">
              <label>Color</label>
              <div class="color-options">
                <button
                  v-for="color in product.colors"
                  :key="color.name"
                  :class="[
                    'color-option',
                    { active: selectedColor === color.name },
                  ]"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                  @click="selectedColor = color.name"
                  :aria-label="`Select ${color.name}`"
                >
                  <svg
                    v-if="selectedColor === color.name"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="white"
                    stroke-width="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </div>
              <p class="selected-value">{{ selectedColor }}</p>
            </div>

            <!-- Size -->
            <div class="option-group">
              <label>Size</label>
              <div class="size-options">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  :class="['size-option', { active: selectedSize === size }]"
                  @click="selectedSize = size"
                  :aria-label="`Select size ${size}`"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Quantity -->
            <div class="option-group">
              <label>Quantity</label>
              <div class="quantity-selector">
                <button @click="quantity = Math.max(1, quantity - 1)">−</button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  :max="product.stock"
                />
                <button
                  @click="quantity = Math.min(product.stock, quantity + 1)"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="product-actions">
            <button
              class="btn btn-primary btn-add-to-cart"
              @click="addToCart"
              :disabled="product.stock === 0"
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
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                ></path>
              </svg>
              Add to Cart
            </button>
            <button
              class="btn btn-secondary btn-wishlist"
              @click="toggleFavorite(product.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                :fill="isFavorite(product.id) ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                ></path>
              </svg>
              Wishlist
            </button>
          </div>

          <!-- Info Tabs -->
          <div class="info-tabs">
            <button
              v-for="tab in tabs"
              :key="tab"
              :class="['tab-button', { active: activeTab === tab }]"
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </div>

          <div class="tab-content">
            <div v-if="activeTab === 'Description'" class="tab-panel">
              <p>{{ product.description }}</p>
              <ul>
                <li>Premium quality fabric</li>
                <li>Comfortable fit</li>
                <li>Available in multiple colors and sizes</li>
                <li>Machine washable</li>
              </ul>
            </div>
            <div v-if="activeTab === 'Shipping'" class="tab-panel">
              <p>
                <strong>Standard Shipping:</strong> 5-7 business days ($9.99)
              </p>
              <p>
                <strong>Express Shipping:</strong> 2-3 business days ($24.99)
              </p>
              <p>
                <strong>Overnight Shipping:</strong> Next business day ($49.99)
              </p>
              <p style="margin-top: 1rem">Free shipping on orders over $100</p>
            </div>
            <div v-if="activeTab === 'Returns'" class="tab-panel">
              <p>
                We offer a 30-day return policy. If you're not satisfied, return
                your purchase for a full refund.
              </p>
              <p style="margin-top: 1rem">
                Please ensure items are unworn and in original packaging.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <section v-if="relatedProducts.length" class="related-products">
        <h2>Related Products</h2>
        <div class="product-grid">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchProductById, fetchRelatedProducts } from "@/services/mockApi";
import { useCartStore } from "@/stores/cartStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useWishlist } from "@/composables/useComposables";
import { formatCurrency, calculateDiscount } from "@/utils/helpers";
import ProductGallery from "@/components/features/ProductGallery.vue";
import ProductCard from "@/components/features/ProductCard.vue";
import type { Product } from "@/data/products";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const notificationStore = useNotificationStore();
const { isFavorite, toggleFavorite } = useWishlist();

const product = ref<Product | null>(null);
const relatedProducts = ref<Product[]>([]);
const loading = ref(true);
const activeTab = ref("Description");
const tabs = ["Description", "Shipping", "Returns"];

const selectedColor = ref("");
const selectedSize = ref("");
const quantity = ref(1);

const discount = computed(() => {
  if (!product.value?.originalPrice) return 0;
  return calculateDiscount(product.value.originalPrice, product.value.price);
});

onMounted(async () => {
  loading.value = true;
  try {
    const id = route.params.id as string;
    product.value = await fetchProductById(id);

    if (!product.value) {
      router.push("/shop");
      return;
    }

    // Set defaults
    selectedColor.value = product.value.colors[0].name;
    selectedSize.value = product.value.sizes[0];

    // Load related products
    relatedProducts.value = await fetchRelatedProducts(id, 4);
  } finally {
    loading.value = false;
  }
});

const addToCart = () => {
  if (!product.value) return;

  const selectedColorObj = product.value.colors.find(
    (c) => c.name === selectedColor.value
  );
  if (!selectedColorObj) return;

  cartStore.addItem({
    productId: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images[0],
    quantity: quantity.value,
    size: selectedSize.value,
    color: selectedColor.value,
    colorHex: selectedColorObj.hex,
  });

  notificationStore.addNotification(
    `${product.value.name} added to cart!`,
    "success"
  );

  quantity.value = 1;
};
</script>

<style scoped>
.product-detail {
  padding: 2rem 0;
  min-height: calc(100vh - 300px);
}

.container {
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
}

.breadcrumb {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.breadcrumb a {
  color: var(--primary);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 4rem;
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

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.product-gallery {
  display: flex;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-info h1 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--secondary);
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
  color: #fbbf24;
}

.stars span {
  font-size: 1.25rem;
}

.stars span:not(.filled) {
  color: #d1d5db;
}

.review-count {
  color: #6b7280;
  font-size: 0.875rem;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.current-price {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
}

.original-price {
  font-size: 1.125rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.discount {
  background: #fecaca;
  color: #991b1b;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.product-description {
  color: #6b7280;
  line-height: 1.6;
  font-size: 1.125rem;
}

.stock-status {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-align: center;
}

.stock-status.in-stock {
  background: #dcfce7;
  color: #166534;
}

.stock-status.low-stock {
  background: #fef3c7;
  color: #b45309;
}

.product-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option-group label {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--secondary);
}

.color-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.color-option {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: var(--secondary);
  box-shadow: 0 0 0 2px white, 0 0 0 4px var(--secondary);
}

.selected-value {
  font-size: 0.875rem;
  color: #6b7280;
}

.size-options {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.size-option {
  padding: 0.75rem 1.25rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  color: var(--secondary);
}

.size-option:hover {
  border-color: var(--primary);
}

.size-option.active {
  border-color: var(--primary);
  background: var(--primary);
  color: white;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  width: fit-content;
}

.quantity-selector button {
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--secondary);
  font-weight: 600;
  font-size: 1.25rem;
  transition: background-color 0.2s ease;
}

.quantity-selector button:hover {
  background-color: #f3f4f6;
}

.quantity-selector input {
  width: 60px;
  text-align: center;
  border: none;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  font-weight: 600;
}

.quantity-selector input:focus {
  outline: none;
}

.product-actions {
  display: grid;
  grid-template-columns: 1fr 150px;
  gap: 1rem;
  padding-top: 1.5rem;
}

.btn-add-to-cart,
.btn-wishlist {
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1rem;
}

.btn-add-to-cart {
  background: var(--primary);
  color: white;
}

.btn-add-to-cart:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-2px);
}

.btn-add-to-cart:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.btn-wishlist {
  background: white;
  color: #ef4444;
  border: 2px solid #ef4444;
}

.btn-wishlist:hover {
  background: #fecaca;
}

.info-tabs {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #e5e7eb;
  padding-top: 1.5rem;
}

.tab-button {
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: #6b7280;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.tab-button.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.tab-content {
  padding: 1.5rem 0;
}

.tab-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #6b7280;
  line-height: 1.6;
}

.tab-panel ul {
  list-style: disc;
  padding-left: 1.5rem;
}

.tab-panel li {
  margin-bottom: 0.5rem;
}

.related-products {
  margin-top: 4rem;
}

.related-products h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-info h1 {
    font-size: 1.5rem;
  }

  .current-price {
    font-size: 1.5rem;
  }

  .product-actions {
    grid-template-columns: 1fr;
  }

  .btn-wishlist {
    justify-content: center;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
