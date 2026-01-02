<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero-pentagram">⛤</div>
      <div class="hero-chain hero-chain-left">⛓️</div>
      <div class="hero-chain hero-chain-right">⛓️</div>
      <div class="hero-content">
        <div class="hero-badge">▲ UNHOLY COLLECTION ▲</div>
        <h1>
          <span class="hero-title-main">DESCEND</span>
          <span class="hero-title-divider">INTO</span>
          <span class="hero-title-sub">OBLIVION</span>
        </h1>
        <p class="hero-description">
          Where shadows reign eternal and chaos breeds creation.
          <br />
          Raw. Unfiltered. Unstoppable.
        </p>
        <router-link to="/shop" class="hero-cta">
          <span class="hero-cta-icon">🔥</span>
          <span>UNLEASH HELL</span>
          <span class="hero-cta-icon">🔥</span>
        </router-link>
      </div>
      <div class="hero-image">
        <div class="hero-static"></div>
        <img
          src="https://picsum.photos/600/400?random=hero"
          alt="Metal apparel"
        />
        <div class="hero-barcode"></div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured">
      <div class="container">
        <h2>Featured Products</h2>
        <div
          class="loading-spinner"
          v-if="loadingFeatured"
          role="status"
          aria-live="polite"
        >
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
  background: radial-gradient(
      circle at 20% 30%,
      color-mix(in srgb, var(--hero-accent) 20%, transparent) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      color-mix(in srgb, var(--hero-accent) 20%, transparent) 0%,
      transparent 50%
    ),
    linear-gradient(
      180deg,
      var(--hero-bg-top) 0%,
      var(--hero-bg-mid) 50%,
      var(--hero-bg-bottom) 100%
    );
  color: var(--text-primary);
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--hero-accent);
  border-bottom: 1px solid var(--hero-accent);
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      color-mix(in srgb, var(--hero-accent) 8%, transparent) 2px,
      color-mix(in srgb, var(--hero-accent) 8%, transparent) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      color-mix(in srgb, var(--hero-accent) 8%, transparent) 2px,
      color-mix(in srgb, var(--hero-accent) 8%, transparent) 4px
    );
  pointer-events: none;
  opacity: 0.5;
}

.hero-pentagram {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25rem;
  color: var(--hero-accent);
  opacity: 0.04;
  z-index: 0;
  animation: pentagramSpin 60s linear infinite;
}

@keyframes pentagramSpin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.hero-chain {
  position: absolute;
  font-size: 2rem;
  opacity: 0.2;
  z-index: 1;
  animation: chainSwing 4s ease-in-out infinite;
}

.hero-chain-left {
  top: 0;
  left: 10%;
  transform-origin: top center;
}

.hero-chain-right {
  top: 0;
  right: 10%;
  transform-origin: top center;
  animation-delay: 2s;
}

@keyframes chainSwing {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(15deg);
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-block;
  width: fit-content;
  background: var(--bg-secondary);
  color: var(--hero-accent-strong);
  padding: 0.4rem 1rem;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border: 1px solid var(--hero-accent);
  box-shadow: 0 0 15px var(--hero-glow),
    inset 0 0 10px color-mix(in srgb, var(--hero-accent) 25%, transparent);
}

.hero-content h1 {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
}

.hero-title-main {
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--text-primary);
  text-shadow: 3px 3px 0 var(--hero-accent), 6px 6px 10px rgba(0, 0, 0, 0.8);
  font-style: italic;
}

.hero-title-divider {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--hero-accent);
  margin: 0.5rem 0;
}

.hero-title-sub {
  font-size: 4rem;
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--hero-accent-strong);
  text-shadow: 0 0 20px var(--hero-glow), 2px 2px 8px rgba(0, 0, 0, 1);
  border-bottom: 2px solid var(--hero-accent);
  padding-bottom: 0.5rem;
}

.hero-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  font-weight: 400;
  letter-spacing: 0.03em;
  font-family: "Courier New", monospace;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 1.25rem 2rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
  width: fit-content;
  border: 2px solid var(--hero-accent);
  box-shadow: 0 0 20px var(--hero-glow),
    inset 0 0 20px color-mix(in srgb, var(--hero-accent) 25%, transparent);
  position: relative;
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
}

.hero-cta-icon {
  animation: flicker 2s infinite alternate;
}

@keyframes flicker {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.hero-cta::before {
  content: "";
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    45deg,
    transparent 30%,
    var(--hero-accent-strong) 50%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-cta:hover {
  transform: translateX(4px) translateY(-2px);
  box-shadow: -4px 4px 0 var(--hero-accent), 0 0 30px var(--hero-glow),
    inset 0 0 25px color-mix(in srgb, var(--hero-accent) 25%, transparent);
}

.hero-cta:hover::before {
  opacity: 0.2;
}

.hero-image {
  position: relative;
  z-index: 2;
}

.hero-image img {
  width: 100%;
  border: 2px solid var(--hero-accent);
  box-shadow: 0 0 40px var(--hero-glow), 0 20px 60px rgba(0, 0, 0, 0.9);
  filter: grayscale(60%) contrast(1.3) brightness(0.9);
  clip-path: polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%);
}

.hero-static {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    transparent 0px,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 2;
  animation: staticMove 0.2s steps(10) infinite;
}

@keyframes staticMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

.hero-barcode {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 120px;
  height: 60px;
  background: repeating-linear-gradient(
    90deg,
    var(--hero-accent) 0px,
    var(--hero-accent) 3px,
    transparent 3px,
    transparent 5px,
    var(--hero-accent) 5px,
    var(--hero-accent) 7px,
    transparent 7px,
    transparent 12px,
    var(--hero-accent) 12px,
    var(--hero-accent) 14px,
    transparent 14px,
    transparent 16px
  );
  opacity: 0.3;
  z-index: 3;
}

.featured,
.categories,
.features,
.newsletter {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;

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

  .hero-badge {
    margin: 0 auto;
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
  .hero {
    padding: 2rem 1rem;
  }

  .hero-title-main {
    font-size: 2.5rem;
  }

  .hero-title-sub {
    font-size: 1.8rem;
  }

  .hero-title-divider {
    font-size: 1.2rem;
  }

  .hero-pentagram {
    font-size: 15rem;
  }

  .hero-description {
    font-size: 0.95rem;
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
