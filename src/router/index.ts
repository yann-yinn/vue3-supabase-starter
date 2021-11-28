import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import useStore from "@/stores/index";

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
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: () => import("@/views/ForgotPasswordView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const store = useStore();
  console.log("store.user", store.user);
  if (to.name === "login") {
    if (store.user) return "/home";
  }
});

export default router;
