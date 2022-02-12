import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import useAuth from "@/auth/composables/useAuth";
import authRoutes from "@/auth/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    ...authRoutes,
  ],
});

router.beforeEach(async (to, from) => {
  const { user } = useAuth();
  if (to.name === "login") {
    if (user.value) return "/";
  }
});

export default router;
