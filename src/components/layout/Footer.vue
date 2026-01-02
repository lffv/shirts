<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Company Info -->
      <div class="footer-section">
        <h3>{{ t("footer.about") }}</h3>
        <p>{{ t("footer.description") }}</p>
        <div class="footer-socials">
          <a href="#" title="Facebook" aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          </a>
          <a href="#" title="Twitter" aria-label="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>
          <a href="#" title="Instagram" aria-label="Instagram">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-section">
        <h3>{{ t("footer.quickLinks") }}</h3>
        <ul>
          <li>
            <router-link to="/shop">{{ t("nav.shop") }}</router-link>
          </li>
          <li>
            <router-link to="/about">{{ t("nav.about") }}</router-link>
          </li>
          <li>
            <router-link to="/faq">{{ t("pages.faq") }}</router-link>
          </li>
          <li>
            <router-link to="/contact">{{ t("nav.contact") }}</router-link>
          </li>
        </ul>
      </div>

      <!-- Customer Service -->
      <div class="footer-section">
        <h3>{{ t("footer.customerService") }}</h3>
        <ul>
          <li>
            <router-link to="/shipping">{{ t("pages.shipping") }}</router-link>
          </li>
          <li>
            <router-link to="/returns">{{ t("pages.returns") }}</router-link>
          </li>
          <li>
            <router-link to="/privacy">{{ t("pages.privacy") }}</router-link>
          </li>
          <li>
            <router-link to="/terms">{{ t("pages.terms") }}</router-link>
          </li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="footer-section">
        <h3>{{ t("footer.newsletter") }}</h3>
        <p class="footer-hint">{{ t("footer.subscribeDesc") }}</p>
        <div class="footer-newsletter">
          <input
            v-model="newsletterEmail"
            type="email"
            :placeholder="t('footer.email')"
            class="footer-newsletter-input"
          />
          <button class="footer-newsletter-btn" @click="subscribeNewsletter">
            {{ t("footer.subscribe") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer-bottom">
      <p>&copy; 2024 TeeShop. {{ t("footer.copyright") }}</p>
      <div class="footer-payments">
        <span>{{ t("footer.acceptedPayments") }}:</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="20"
          viewBox="0 0 48 32"
          fill="currentColor"
        >
          <rect
            x="2"
            y="2"
            width="14"
            height="12"
            rx="2"
            fill="currentColor"
            opacity="0.5"
          />
          <rect
            x="18"
            y="2"
            width="14"
            height="12"
            rx="2"
            fill="currentColor"
            opacity="0.6"
          />
          <rect
            x="34"
            y="2"
            width="12"
            height="12"
            rx="2"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { useLanguage } from "@/composables/useLanguage";

const notificationStore = useNotificationStore();
const { t } = useLanguage();
const newsletterEmail = ref("");

const subscribeNewsletter = () => {
  if (newsletterEmail.value && newsletterEmail.value.includes("@")) {
    notificationStore.addNotification(
      "Thanks for subscribing! Check your email for exclusive offers.",
      "success"
    );
    newsletterEmail.value = "";
  } else {
    notificationStore.addNotification(
      "Please enter a valid email address",
      "error"
    );
  }
};
</script>

<style scoped>
.footer {
  background: var(--secondary);
  color: white;
  margin-top: 4rem;
}

.footer-container {
  max-width: 7xl;
  margin: 0 auto;
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-section p {
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-section a:hover {
  color: white;
}

.footer-socials {
  display: flex;
  gap: 1rem;
}

.footer-socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.footer-socials a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.footer-hint {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.footer-newsletter {
  display: flex;
  gap: 0.5rem;
}

.footer-newsletter-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.footer-newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.footer-newsletter-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
}

.footer-newsletter-btn {
  padding: 0.5rem 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
}

.footer-newsletter-btn:hover {
  background: #2563eb;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  align-items: center;
}

.footer-payments {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
