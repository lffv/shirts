import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Shop from "@/views/Shop.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Checkout from "@/views/Checkout.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import Shipping from "@/views/Shipping.vue";
import Privacy from "@/views/Privacy.vue";
import Terms from "@/views/Terms.vue";
import Faq from "@/views/Faq.vue";
import Returns from "@/views/Returns.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Account from "@/views/Account.vue";
import { useAuthStore } from "@/stores/authStore";
import pinia from "@/stores/pinia";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "TeeShop - Premium T-Shirts" },
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
    meta: { title: "Shop - TeeShop" },
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: ProductDetail,
    meta: { title: "Product - TeeShop" },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: { title: "Checkout - TeeShop" },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { title: "About Us - TeeShop" },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: { title: "Contact - TeeShop" },
  },
  {
    path: "/shipping",
    name: "Shipping",
    component: Shipping,
    meta: { title: "Shipping - TeeShop" },
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy,
    meta: { title: "Privacy Policy - TeeShop" },
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms,
    meta: { title: "Terms & Conditions - TeeShop" },
  },
  {
    path: "/faq",
    name: "Faq",
    component: Faq,
    meta: { title: "FAQ - TeeShop" },
  },
  {
    path: "/returns",
    name: "Returns",
    component: Returns,
    meta: { title: "Returns & Refunds - TeeShop" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "Login - TeeShop" },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "Register - TeeShop" },
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: { title: "Account - TeeShop", requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  document.title = (to.meta.title as string) || "TeeShop";

  if (to.meta.requiresAuth) {
    const auth = useAuthStore(pinia);
    if (!auth.isAuthenticated) {
      return {
        path: "/login",
        query: { redirect: to.fullPath },
      };
    }
  }
});

export default router;
