<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Sign In</h1>
      <p class="auth-sub">
        Access your account to track orders and manage settings.
      </p>

      <form @submit.prevent="onSubmit" class="auth-form">
        <label>
          <span>Email</span>
          <input v-model="email" type="email" required />
        </label>
        <label>
          <span>Password</span>
          <input v-model="password" type="password" required />
        </label>
        <button type="submit" class="btn-primary" :disabled="auth.loading">
          {{ auth.loading ? "Signing in..." : "Sign In" }}
        </button>
      </form>

      <p class="auth-link">
        No account yet?
        <router-link to="/register">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const email = ref("");
const password = ref("");

const onSubmit = async () => {
  try {
    await auth.login(email.value, password.value);
    const redirect = (route.query.redirect as string) || "/account";
    router.push(redirect);
  } catch {
    // errors surfaced via notifications
  }
};
</script>

<style scoped>
.auth-page {
  display: grid;
  place-items: center;
  padding: 4rem 1rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 0.5rem;
}

.auth-sub {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.auth-form {
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

input {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-primary);
  color: var(--text-primary);
}

button {
  width: 100%;
}

.auth-link {
  margin-top: 1rem;
  color: var(--text-secondary);
  text-align: center;
}

.auth-link a {
  color: var(--primary);
  font-weight: 600;
}

:global(html.metal-theme) .auth-card {
  background: linear-gradient(
    145deg,
    rgba(22, 22, 26, 0.92),
    rgba(9, 9, 11, 0.94)
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
}

:global(html.metal-theme) input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
