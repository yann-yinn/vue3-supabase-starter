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
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/LogoutView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: () => import("@/views/ForgotPasswordView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
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
