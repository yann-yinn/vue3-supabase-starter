// ces routes sont importées dans le routeur:
// import authRoutes from "@/auth/routes";
//
// routes: [
// ...authRoutes,
// ]
export default [
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
  {
    path: "/auth/email-confirmation",
    name: "authEmailConfirmation",
    component: () => import("@/auth/views/AuthEmailConfirmationView.vue"),
  },
];
