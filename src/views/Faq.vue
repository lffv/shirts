<template>
  <div class="page">
    <div class="container">
      <h1>Frequently Asked Questions</h1>

      <div class="content">
        <div class="faq-grid">
          <div class="faq-item">
            <button @click="toggleFaq(0)" class="faq-question">
              <span>How long does shipping take?</span>
              <svg
                :class="['icon', { open: expandedFaq[0] }]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="expandedFaq[0]" class="faq-answer">
              <p>We offer three shipping options:</p>
              <ul>
                <li>
                  <strong>Standard Shipping (5-7 business days):</strong> $9.99
                </li>
                <li>
                  <strong>Express Shipping (2-3 business days):</strong> $24.99
                </li>
                <li>
                  <strong>Overnight Shipping (1 business day):</strong> $49.99
                </li>
              </ul>
              <p>Free standard shipping on orders over $100!</p>
            </div>
          </div>

          <div class="faq-item">
            <button @click="toggleFaq(1)" class="faq-question">
              <span>What is your return policy?</span>
              <svg
                :class="['icon', { open: expandedFaq[1] }]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="expandedFaq[1]" class="faq-answer">
              <p>
                We offer a 30-day return policy on all items. Products must be
                unworn, unwashed, and in original condition with all tags
                attached. Return shipping is free for defective items;
                otherwise, customers cover return shipping costs.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button @click="toggleFaq(2)" class="faq-question">
              <span>Do you offer international shipping?</span>
              <svg
                :class="['icon', { open: expandedFaq[2] }]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="expandedFaq[2]" class="faq-answer">
              <p>
                Yes! We ship to most countries worldwide. International shipping
                typically takes 10-21 business days. Rates vary by location and
                are calculated at checkout. Please note that customers are
                responsible for any applicable customs duties and taxes.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button @click="toggleFaq(3)" class="faq-question">
              <span>What payment methods do you accept?</span>
              <svg
                :class="['icon', { open: expandedFaq[3] }]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="expandedFaq[3]" class="faq-answer">
              <p>We accept the following payment methods:</p>
              <ul>
                <li>
                  Credit Cards (Visa, Mastercard, American Express, Discover)
                </li>
                <li>PayPal</li>
                <li>Apple Pay</li>
                <li>Google Pay</li>
              </ul>
            </div>
          </div>

          <div class="faq-item">
            <button @click="toggleFaq(4)" class="faq-question">
              <span>How do I track my order?</span>
              <svg
                :class="['icon', { open: expandedFaq[4] }]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="expandedFaq[4]" class="faq-answer">
              <p>
                Once your order ships, you'll receive an email with a tracking
                number and a link to track your package in real-time. You can
                also log into your account to view your order status at any
                time.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button @click="toggleFaq(5)" class="faq-question">
              <span>What if my item arrives damaged?</span>
              <svg
                :class="['icon', { open: expandedFaq[5] }]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="expandedFaq[5]" class="faq-answer">
              <p>
                If you receive a damaged item, please contact us within 48 hours
                with photos of the damage. We'll immediately send you a
                replacement at no cost, including free return shipping for the
                damaged item. Our goal is to ensure you're completely satisfied
                with your purchase.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button @click="toggleFaq(6)" class="faq-question">
              <span>Do you have a size chart?</span>
              <svg
                :class="['icon', { open: expandedFaq[6] }]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="expandedFaq[6]" class="faq-answer">
              <p>
                Yes! Each product page includes a detailed size chart with
                measurements in both US and metric units. We recommend comparing
                the measurements to a shirt you already own for the best fit. If
                you're still unsure, feel free to contact us for personalized
                sizing advice.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button @click="toggleFaq(7)" class="faq-question">
              <span>Are your products made sustainably?</span>
              <svg
                :class="['icon', { open: expandedFaq[7] }]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="expandedFaq[7]" class="faq-answer">
              <p>
                Many of our products, especially our "Sustainable Eco Tee" line,
                are made from organic cotton and recycled materials. We're
                committed to reducing our environmental impact and work with
                ethical manufacturers who follow fair labor practices.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <button @click="toggleFaq(8)" class="faq-question">
              <span>Can I customize my order?</span>
              <svg
                :class="['icon', { open: expandedFaq[8] }]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="expandedFaq[8]" class="faq-answer">
              <p>
                We currently offer color and size selection for all products.
                For bulk custom orders, corporate gifting, or special requests,
                please contact our customer service team at
                customorders@teeshop.com for a personalized quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const expandedFaq = ref<boolean[]>(Array(9).fill(false));

const toggleFaq = (index: number) => {
  expandedFaq.value[index] = !expandedFaq.value[index];
};
</script>

<style scoped>
.page {
  padding: 3rem 0;
  min-height: calc(100vh - 300px);
}

.container {
  max-width: 4xl;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 2rem;
  text-align: center;
}

.content {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
}

.faq-grid {
  display: grid;
  gap: 1rem;
}

.faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  padding: 1.25rem;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--secondary);
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #f9fafb;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--primary);
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.icon.open {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 1rem 1.25rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  line-height: 1.6;
}

.faq-answer p {
  margin-bottom: 1rem;
}

.faq-answer ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.faq-answer li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }

  .content {
    padding: 1.5rem;
  }

  .faq-question {
    padding: 1rem;
    font-size: 0.95rem;
  }

  .faq-answer {
    padding: 0.75rem 1rem;
  }
}
</style>
