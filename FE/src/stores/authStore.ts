import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  register as mockRegister,
  login as mockLogin,
  logout as mockLogout,
  getProfile,
  getOrders,
  getPaymentMethods,
  getSettings,
  updateProfile,
  updateSettings,
  type AuthUser,
  type Profile,
  type Order,
  type PaymentMethod,
  type Settings,
} from "@/services/mockAuth";
import { useNotificationStore } from "@/stores/notificationStore";

const SESSION_KEY = "auth-session";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthUser | null>(null);
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const profile = ref<Profile | null>(null);
  const orders = ref<Order[]>([]);
  const paymentMethods = ref<PaymentMethod[]>([]);
  const settings = ref<Settings | null>(null);
  const loading = ref(false);

  const notificationStore = useNotificationStore();

  const isAuthenticated = computed(() => !!user.value && !!accessToken.value);

  const persistSession = () => {
    const snapshot = {
      user: user.value,
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(snapshot));
  };

  const restoreSession = () => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        user: AuthUser | null;
        accessToken: string | null;
        refreshToken: string | null;
      };
      user.value = parsed.user;
      accessToken.value = parsed.accessToken;
      refreshToken.value = parsed.refreshToken;
    } catch {
      // ignore
    }
  };

  const clearSession = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    profile.value = null;
    orders.value = [];
    paymentMethods.value = [];
    settings.value = null;
    localStorage.removeItem(SESSION_KEY);
  };

  const loadAccountData = async () => {
    if (!user.value) return;
    loading.value = true;
    try {
      const [profileData, orderData, paymentsData, settingsData] =
        await Promise.all([
          getProfile(user.value.id),
          getOrders(user.value.id),
          getPaymentMethods(user.value.id),
          getSettings(user.value.id),
        ]);
      profile.value = profileData;
      orders.value = orderData;
      paymentMethods.value = paymentsData;
      settings.value = settingsData;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    loading.value = true;
    try {
      const result = await mockLogin(email, password);
      user.value = result.user;
      accessToken.value = result.accessToken;
      refreshToken.value = result.refreshToken;
      persistSession();
      await loadAccountData();
      notificationStore.addNotification("Welcome back!", "success");
    } catch (err: any) {
      notificationStore.addNotification(
        err?.message || "Login failed",
        "error"
      );
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    loading.value = true;
    try {
      const result = await mockRegister(email, password, name);
      user.value = result.user;
      accessToken.value = result.accessToken;
      refreshToken.value = result.refreshToken;
      persistSession();
      await loadAccountData();
      notificationStore.addNotification("Account created!", "success");
    } catch (err: any) {
      notificationStore.addNotification(
        err?.message || "Registration failed",
        "error"
      );
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    await mockLogout();
    clearSession();
    notificationStore.addNotification("Signed out", "info");
  };

  const saveProfile = async (input: Partial<Profile>) => {
    if (!user.value) return;
    loading.value = true;
    try {
      const updated = await updateProfile({ ...input, id: user.value.id });
      profile.value = updated;
      user.value = { id: updated.id, email: updated.email, name: updated.name };
      persistSession();
      notificationStore.addNotification("Profile updated", "success");
    } catch (err: any) {
      notificationStore.addNotification(
        err?.message || "Update failed",
        "error"
      );
    } finally {
      loading.value = false;
    }
  };

  const saveSettings = async (input: Settings) => {
    if (!user.value) return;
    loading.value = true;
    try {
      const updated = await updateSettings(input);
      settings.value = updated;
      notificationStore.addNotification("Settings saved", "success");
    } catch (err: any) {
      notificationStore.addNotification(
        err?.message || "Could not save settings",
        "error"
      );
    } finally {
      loading.value = false;
    }
  };

  // Initialize immediately
  restoreSession();

  return {
    user,
    accessToken,
    refreshToken,
    profile,
    orders,
    paymentMethods,
    settings,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    loadAccountData,
    saveProfile,
    saveSettings,
    clearSession,
  };
});
