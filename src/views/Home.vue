<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero-content">
        <h1>Premium T-Shirts for Every Style</h1>
        <p>Discover our exclusive collection of high-quality t-shirts</p>
        <router-link to="/shop" class="hero-cta">Shop Now</router-link>
      </div>
      <div class="hero-image">
        <img
          src="https://picsum.photos/600/400?random=hero"
          alt="Featured tees"
        />
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured">
      <div class="container">
        <h2>Featured Products</h2>
        <div class="loading-spinner" v-if="loadingFeatured">
          <div class="spinner"></div>
        </div>
        <div v-else-if="featuredProducts.length" class="product-grid">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories">
      <div class="container">
        <h2>Shop by Category</h2>
        <div class="category-grid">
          <router-link
            v-for="category in categories"
            :key="category"
            :to="`/shop?category=${category}`"
            class="category-card"
          >
            <img
              :src="`https://picsum.photos/400/300?random=${Math.random()}`"
              :alt="category"
            />
            <h3>{{ category }}</h3>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="features">
      <div class="container">
        <h2>Why Choose TeeShop?</h2>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>On orders over $100</p>
          </div>
          <div class="feature">
            <div class="feature-icon">🛡️</div>
            <h3>Secure Payment</h3>
            <p>Your payment is protected</p>
          </div>
          <div class="feature">
            <div class="feature-icon">↩️</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div class="feature">
            <div class="feature-icon">⭐</div>
            <h3>Quality Assured</h3>
            <p>Premium materials guaranteed</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
      <div class="container">
        <div class="newsletter-content">
          <h2>Get Exclusive Offers</h2>
          <p>
            Subscribe to our newsletter for special discounts and new arrivals
          </p>
          <div class="newsletter-form">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Enter your email"
              class="newsletter-input"
            />
            <button @click="subscribeNewsletter" class="newsletter-btn">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchFeaturedProducts } from "@/services/mockApi";
import { categories } from "@/data/products";
import { useNotificationStore } from "@/stores/notificationStore";
import ProductCard from "@/components/features/ProductCard.vue";
import type { Product } from "@/data/products";

const notificationStore = useNotificationStore();

const featuredProducts = ref<Product[]>([]);
const loadingFeatured = ref(true);
const newsletterEmail = ref("");

onMounted(async () => {
  loadingFeatured.value = true;
  try {
    featuredProducts.value = await fetchFeaturedProducts(8);
  } finally {
    loadingFeatured.value = false;
  }
});

const subscribeNewsletter = () => {
  if (newsletterEmail.value && newsletterEmail.value.includes("@")) {
    notificationStore.addNotification("Thanks for subscribing!", "success");
    newsletterEmail.value = "";
  } else {
    notificationStore.addNotification("Please enter a valid email", "error");
  }
};
</script>

<style scoped>
.home {
  width: 100%;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.25rem;
  opacity: 0.9;
}

.hero-cta {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  width: fit-content;
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.hero-image img {
  width: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.featured,
.categories,
.features {
  padding: 4rem 0;
}

.container {
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
}

.featured > .container,
.categories > .container,
.features > .container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

h2 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--secondary);
  text-align: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.category-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  text-decoration: none;
  color: white;
  height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: transform 0.3s ease;
}

.category-card img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.category-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.category-card h3 {
  position: relative;
  z-index: 2;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.category-card:hover {
  transform: scale(1.05);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  border-radius: 0.75rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature h3 {
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--secondary);
}

.feature p {
  color: #6b7280;
  font-size: 0.875rem;
}

.newsletter {
  background: var(--primary);
  color: white;
  padding: 4rem 0;
}

.newsletter-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.newsletter-content h2 {
  color: white;
}

.newsletter-content p {
  font-size: 1.125rem;
  opacity: 0.9;
  max-width: 500px;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
  max-width: 500px;
  width: 100%;
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.newsletter-btn {
  padding: 0.75rem 2rem;
  background: white;
  color: var(--primary);
  border: none;
  border-radius: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.newsletter-btn:hover {
  transform: scale(1.05);
}

.loading-spinner {
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

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
    margin-bottom: 2rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .featured,
  .categories,
  .features {
    padding: 2rem 0;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .newsletter-form {
    flex-direction: column;
  }
}

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    align-items: center;
  }

  .hero-image {
    order: -1;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (max-width: 640px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }

  .hero-content p {
    font-size: 0.95rem;
  }

  .hero {
    padding: 1.5rem 1rem;
  }

  .category-card {
    height: 220px;
  }

  .newsletter {
    padding: 2.5rem 0;
  }

  .newsletter-form {
    gap: 0.75rem;
  }
}
</style>
