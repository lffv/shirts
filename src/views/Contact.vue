<template>
  <div class="page">
    <div class="container">
      <h1>Contact Us</h1>

      <div class="contact-layout">
        <!-- Contact Form -->
        <div class="contact-form">
          <h2>Get in Touch</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label>Name *</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>Email *</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>Subject *</label>
              <input
                v-model="form.subject"
                type="text"
                required
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>Message *</label>
              <textarea
                v-model="form.message"
                required
                rows="6"
                class="form-input"
              ></textarea>
            </div>

            <button type="submit" class="btn-submit">Send Message</button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="contact-info">
          <h2>Contact Information</h2>

          <div class="info-block">
            <h3>📍 Address</h3>
            <p>
              123 Fashion Street<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>

          <div class="info-block">
            <h3>📧 Email</h3>
            <p>
              <a href="mailto:support@teeshop.com">support@teeshop.com</a><br />
              <a href="mailto:sales@teeshop.com">sales@teeshop.com</a>
            </p>
          </div>

          <div class="info-block">
            <h3>📞 Phone</h3>
            <p>
              <a href="tel:+1-555-123-4567">+1 (555) 123-4567</a><br />
              Monday - Friday: 9AM - 6PM EST
            </p>
          </div>

          <div class="info-block">
            <h3>🕐 Business Hours</h3>
            <p>
              Monday - Friday: 9:00 AM - 6:00 PM EST<br />
              Saturday: 10:00 AM - 4:00 PM EST<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useNotificationStore } from "@/stores/notificationStore";

const notificationStore = useNotificationStore();

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const submitForm = () => {
  notificationStore.addNotification(
    "Thank you for your message! We will get back to you soon.",
    "success"
  );

  form.name = "";
  form.email = "";
  form.subject = "";
  form.message = "";
};
</script>

<style scoped>
.page {
  padding: 3rem 0;
  min-height: calc(100vh - 300px);
}

.container {
  max-width: 7xl;
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

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
}

.contact-form,
.contact-info {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--secondary);
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-submit:hover {
  background: #2563eb;
}

.info-block {
  margin-bottom: 2rem;
}

.info-block:last-child {
  margin-bottom: 0;
}

.info-block h3 {
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.info-block p {
  color: #6b7280;
  line-height: 1.8;
}

.info-block a {
  color: var(--primary);
  text-decoration: none;
}

.info-block a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }

  .contact-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .contact-form,
  .contact-info {
    padding: 1.5rem;
  }
}
</style>
