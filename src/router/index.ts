import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import useAuth from "@/auth/composables/useAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth/login",
      name: "authLogin",
      component: () => import("@/auth/views/AuthLoginView.vue"),
    },
    {
      path: "/auth/logout",
      name: "authLogout",
      component: () => import("@/auth/views/AuthLogoutView.vue"),
    },
    {
      path: "/auth/register",
      name: "authRegister",
      component: () => import("@/auth/views/AuthRegisterView.vue"),
    },
    {
      path: "/auth/forgot-password",
      name: "authForgotPassword",
      component: () => import("@/auth/views/AuthForgotPasswordView.vue"),
    },
    {
      path: "/auth/profile",
      name: "authProfile",
      component: () => import("@/auth/views/AuthProfileView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const { user } = useAuth();
  if (to.name === "login") {
    if (user.value) return "/";
  }
});

export default router;
