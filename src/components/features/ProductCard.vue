<template>
  <div class="product-card">
    <!-- Image -->
    <router-link :to="`/products/${product.id}`" class="product-card-image">
      <img :src="product.images[0]" :alt="product.name" />
      <div v-if="product.originalPrice" class="product-card-badge">
        -{{ discount }}%
      </div>
      <button class="product-card-wishlist" @click.prevent="toggleFavorite">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          :fill="isFavorite ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
      </button>
    </router-link>

    <!-- Content -->
    <div class="product-card-content">
      <router-link :to="`/products/${product.id}`" class="product-card-title">
        {{ product.name }}
      </router-link>

      <!-- Rating -->
      <div class="product-card-rating">
        <div class="stars">
          <span
            v-for="i in 5"
            :key="i"
            :class="{ filled: i <= Math.round(product.rating) }"
            >★</span
          >
        </div>
        <span class="review-count">({{ product.reviews }})</span>
      </div>

      <!-- Price -->
      <div class="product-card-price">
        <span class="current-price">{{ formatCurrency(product.price) }}</span>
        <span v-if="product.originalPrice" class="original-price">
          {{ formatCurrency(product.originalPrice) }}
        </span>
      </div>

      <!-- Quick Add -->
      <button class="product-card-add" @click="addToCart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Product } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useWishlist } from "@/composables/useComposables";
import { formatCurrency, calculateDiscount } from "@/utils/helpers";

interface Props {
  product: Product;
}

const props = defineProps<Props>();

const cartStore = useCartStore();
const notificationStore = useNotificationStore();
const { isFavorite, toggleFavorite } = useWishlist();

const discount = computed(() => {
  if (!props.product.originalPrice) return 0;
  return calculateDiscount(props.product.originalPrice, props.product.price);
});

const addToCart = () => {
  if (props.product.sizes.length === 0) {
    notificationStore.addNotification(
      "Product has no available sizes",
      "error"
    );
    return;
  }

  const defaultColor = props.product.colors[0];
  const defaultSize = props.product.sizes[0];

  cartStore.addItem({
    productId: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.images[0],
    quantity: 1,
    size: defaultSize,
    color: defaultColor.name,
    colorHex: defaultColor.hex,
  });

  notificationStore.addNotification(
    `${props.product.name} added to cart!`,
    "success"
  );
};
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.product-card-image {
  position: relative;
  overflow: hidden;
  background: #f3f4f6;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-card-image img {
  transform: scale(1.05);
}

.product-card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.75rem;
}

.product-card-wishlist {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ef4444;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-card-wishlist:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}

.product-card-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.product-card-title {
  font-weight: 600;
  color: var(--secondary);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.product-card-title:hover {
  color: var(--primary);
}

.product-card-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
  color: #fbbf24;
}

.stars span {
  font-size: 0.875rem;
}

.stars span:not(.filled) {
  color: #d1d5db;
}

.review-count {
  color: #6b7280;
}

.product-card-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-price {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--primary);
}

.original-price {
  font-size: 0.875rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.product-card-add {
  width: 100%;
  padding: 0.75rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-top: auto;
}

.product-card-add:hover {
  background: #2563eb;
}

.product-card-add:active {
  transform: scale(0.98);
}
</style>
