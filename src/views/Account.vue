<template>
  <div class="account-page" v-if="auth.user">
    <header class="account-hero">
      <div>
        <p class="eyebrow">Welcome back</p>
        <h1>{{ auth.user.name || auth.user.email }}</h1>
        <p class="muted">
          Manage your profile, orders, payment methods, and preferences.
        </p>
      </div>
      <button class="btn-secondary" @click="onLogout">Sign out</button>
    </header>

    <section class="account-grid">
      <div class="card">
        <div class="card-header">
          <h2>Profile</h2>
          <span class="muted">Update your contact details</span>
        </div>
        <form class="form" @submit.prevent="saveProfile">
          <label>
            <span>Name</span>
            <input v-model="profileForm.name" type="text" />
          </label>
          <label>
            <span>Email</span>
            <input v-model="profileForm.email" type="email" />
          </label>
          <label>
            <span>Phone</span>
            <input v-model="profileForm.phone" type="tel" />
          </label>
          <button class="btn-primary" type="submit" :disabled="auth.loading">
            {{ auth.loading ? "Saving..." : "Save Profile" }}
          </button>
        </form>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Orders</h2>
          <span class="muted">Recent activity</span>
        </div>
        <div v-if="!auth.orders.length" class="muted">No orders yet.</div>
        <div v-else class="orders">
          <div class="order" v-for="order in auth.orders" :key="order.id">
            <div class="order-main">
              <div>
                <p class="order-number">#{{ order.number }}</p>
                <p class="muted">Placed {{ formatDate(order.placedAt) }}</p>
              </div>
              <div class="order-status">{{ order.status }}</div>
            </div>
            <div class="order-items">
              <span v-for="item in order.items" :key="item.name">
                {{ item.quantity }} × {{ item.name }}
              </span>
            </div>
            <div class="order-total">Total: {{ currency(order.total) }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Payment methods</h2>
          <span class="muted">Stored with processor</span>
        </div>
        <div v-if="!auth.paymentMethods.length" class="muted">
          No payment methods yet.
        </div>
        <ul class="payments" v-else>
          <li v-for="pm in auth.paymentMethods" :key="pm.id" class="payment">
            <div>
              <p class="payment-brand">{{ pm.brand }} •••• {{ pm.last4 }}</p>
              <p class="muted">Expires {{ pm.expMonth }}/{{ pm.expYear }}</p>
            </div>
            <span v-if="pm.isDefault" class="pill">Default</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Settings</h2>
          <span class="muted">Personalize your experience</span>
        </div>
        <form class="form" @submit.prevent="saveSettings">
          <label>
            <span>Language</span>
            <select v-model="settingsForm.language">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="pt">Português</option>
            </select>
          </label>
          <label>
            <span>Currency</span>
            <select v-model="settingsForm.currency">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="BRL">BRL</option>
            </select>
          </label>
          <label>
            <span>Theme</span>
            <select v-model="settingsForm.theme">
              <option value="default">Default</option>
              <option value="metal">Metal</option>
            </select>
          </label>
          <label class="checkbox">
            <input type="checkbox" v-model="settingsForm.marketing" />
            <span>Send me updates and offers</span>
          </label>
          <button class="btn-primary" type="submit" :disabled="auth.loading">
            {{ auth.loading ? "Saving..." : "Save Settings" }}
          </button>
        </form>
      </div>
    </section>
  </div>
  <div v-else class="auth-page">
    <p class="muted">Sign in to view your account.</p>
    <router-link class="btn-primary" to="/login">Go to login</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { formatDate } from "@/utils/helpers";

const auth = useAuthStore();

const profileForm = reactive({
  name: "",
  email: "",
  phone: "",
});

const settingsForm = reactive({
  language: "en",
  currency: "USD",
  theme: "default" as "default" | "metal",
  marketing: true,
});

const currency = computed(() => (value: number) => {
  return new Intl.NumberFormat(settingsForm.language || "en", {
    style: "currency",
    currency: settingsForm.currency || "USD",
  }).format(value);
});

onMounted(async () => {
  await auth.loadAccountData();
  if (auth.profile) {
    profileForm.name = auth.profile.name;
    profileForm.email = auth.profile.email;
    profileForm.phone = auth.profile.phone || "";
  }
  if (auth.settings) {
    settingsForm.language = auth.settings.language;
    settingsForm.currency = auth.settings.currency;
    settingsForm.theme = auth.settings.theme;
    settingsForm.marketing = auth.settings.marketing;
  }
});

const saveProfile = async () => {
  await auth.saveProfile({ ...profileForm });
};

const saveSettings = async () => {
  await auth.saveSettings({ ...settingsForm });
};

const onLogout = async () => {
  await auth.logout();
};
</script>

<style scoped>
.account-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem 4rem;
}

.account-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.muted {
  color: var(--text-secondary);
}

.account-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.card-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: var(--text-primary);
  font-weight: 600;
}

input,
select {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.65rem 0.75rem;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.orders {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order {
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1rem;
  background: var(--bg-primary);
}

.order-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-number {
  font-weight: 700;
}

.order-status {
  text-transform: capitalize;
  font-weight: 700;
  color: var(--primary);
}

.order-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: var(--text-secondary);
}

.order-total {
  margin-top: 0.75rem;
  font-weight: 700;
}

.payments {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.payment {
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-primary);
}

.payment-brand {
  font-weight: 700;
}

.pill {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--primary);
  color: white;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.auth-page {
  display: grid;
  place-items: center;
  padding: 4rem 1rem;
  gap: 1rem;
}

:global(html.metal-theme) .account-hero,
:global(html.metal-theme) .card,
:global(html.metal-theme) .order,
:global(html.metal-theme) .payment {
  background: linear-gradient(
    145deg,
    rgba(22, 22, 26, 0.92),
    rgba(9, 9, 11, 0.94)
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

:global(html.metal-theme) input,
:global(html.metal-theme) select {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #f4f4f5;
}
</style>
