import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import useAuth from "@/composables/useAuth";

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
      component: () => import("@/views/AuthLoginView.vue"),
    },
    {
      path: "/auth/logout",
      name: "authLogout",
      component: () => import("@/views/AuthLogoutView.vue"),
    },
    {
      path: "/auth/register",
      name: "authRegister",
      component: () => import("@/views/AuthRegisterView.vue"),
    },
    {
      path: "/auth/forgot-password",
      name: "authForgotPassword",
      component: () => import("@/views/AuthForgotPasswordView.vue"),
    },
    {
      path: "/auth/profile",
      name: "authProfile",
      component: () => import("@/views/AuthProfileView.vue"),
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
