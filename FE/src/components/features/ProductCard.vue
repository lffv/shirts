<template>
  <div class="product-card">
    <!-- Media -->
    <div class="product-card-media">
      <router-link
        :to="`/products/${product.id}`"
        class="product-card-image"
        :aria-label="`View ${product.name}`"
      >
        <img :src="product.images[0]" :alt="product.name" />
      </router-link>

      <div
        v-if="product.originalPrice"
        class="product-card-badge"
        aria-label="Discount"
      >
        -{{ discount }}%
      </div>

      <button
        class="product-card-wishlist"
        @click.prevent="toggleFavorite"
        :aria-pressed="isFavorite"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
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
    </div>

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
      <button
        class="product-card-add"
        @click="addToCart"
        :aria-label="`Add ${product.name} to cart`"
      >
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
import { useCurrency } from "@/composables/useCurrency";
import { calculateDiscount } from "@/utils/helpers";

interface Props {
  product: Product;
}

const props = defineProps<Props>();

const cartStore = useCartStore();
const notificationStore = useNotificationStore();
const { isFavorite, toggleFavorite } = useWishlist();
const { formatAmount } = useCurrency();

const formatCurrency = (amount: number) => formatAmount(amount);

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
  position: relative;
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--bg-secondary) 85%, #000 15%),
    var(--bg-primary)
  );
  border-radius: 0.85rem;
  overflow: hidden;
  border: 1px solid
    color-mix(in srgb, var(--border-color) 60%, var(--hero-accent) 40%);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;
  display: flex;
  flex-direction: column;
}

.product-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(
    circle at 1px 1px,
    color-mix(in srgb, var(--hero-accent) 12%, transparent) 0,
    transparent 60%
  );
  background-size: 14px 14px;
  opacity: 0.18;
  z-index: 1;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--hero-accent);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.55), 0 0 24px var(--hero-glow);
}

.product-card-media {
  position: relative;
  isolation: isolate;
}

.product-card-image {
  position: relative;
  overflow: hidden;
  background: color-mix(in srgb, var(--bg-secondary) 80%, #000 20%);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid
    color-mix(in srgb, var(--border-color) 50%, var(--hero-accent) 50%);
  z-index: 2;
}

.product-card-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(255, 255, 255, 0.06),
      transparent 40%
    ),
    radial-gradient(circle at 80% 0%, rgba(0, 0, 0, 0.3), transparent 40%);
  mix-blend-mode: screen;
  opacity: 0.35;
  pointer-events: none;
}

.product-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease, filter 0.35s ease;
  border: 1px solid var(--hero-accent);
  border-radius: 0.65rem;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 2;
}

.product-card:hover .product-card-image img {
  transform: scale(1.05);
  filter: contrast(1.05) saturate(1.05);
}

.product-card-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: color-mix(in srgb, var(--hero-accent) 35%, transparent);
  color: var(--text-primary);
  padding: 0.25rem 0.85rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.75rem;
  border: 1px solid var(--hero-accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  z-index: 3;
}

.product-card-wishlist {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: color-mix(in srgb, var(--bg-secondary) 80%, #000 20%);
  border: 1px solid
    color-mix(in srgb, var(--border-color) 60%, var(--hero-accent) 40%);
  border-radius: 9999px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--hero-accent-strong);
  transition: all 0.2s ease;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4);
  z-index: 3;
}

.product-card-wishlist:hover {
  background: var(--hero-accent);
  color: #fff;
  transform: scale(1.07);
}

.product-card-content {
  padding: 1rem 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  flex: 1;
}

.product-card-title {
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s ease;
  letter-spacing: 0.01em;
}

.product-card-title:hover {
  color: var(--hero-accent-strong);
}

.product-card-rating {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.stars {
  display: flex;
  gap: 0.2rem;
  color: color-mix(in srgb, var(--hero-accent-strong) 70%, #fbbf24 30%);
}

.stars span {
  font-size: 0.9rem;
}

.stars span:not(.filled) {
  color: color-mix(in srgb, var(--text-secondary) 60%, transparent);
}

.review-count {
  color: var(--text-secondary);
}

.product-card-price {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  border-top: 1px solid
    color-mix(in srgb, var(--border-color) 60%, var(--hero-accent) 40%);
  padding-top: 0.6rem;
}

.current-price {
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--hero-accent-strong);
  letter-spacing: 0.01em;
}

.original-price {
  font-size: 0.9rem;
  color: color-mix(in srgb, var(--text-secondary) 70%, transparent);
  text-decoration: line-through;
}

.product-card-add {
  width: 100%;
  padding: 0.8rem;
  background: color-mix(in srgb, var(--bg-secondary) 70%, #000 30%);
  color: var(--text-primary);
  border: 1px solid var(--hero-accent);
  border-radius: 0.6rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-top: auto;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);
}

.product-card-add:hover {
  background: var(--hero-accent);
  color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45), 0 0 20px var(--hero-glow);
}

.product-card-add:active {
  transform: scale(0.98);
}

@media (max-width: 640px) {
  .product-card {
    border-radius: 0.75rem;
  }

  .product-card-content {
    padding: 0.9rem 0.9rem 1.1rem;
  }

  .product-card-title {
    white-space: normal;
  }
}
</style>
