<script setup lang="ts">
import useAuth from "@/composables/useAuth";
import useStore from "@/stores";
const store = useStore();

async function logout() {
  const auth = useAuth();
  auth.logout();
}
</script>

<template>
  <div class="text-center">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link> |
    <a class="cursor-pointer" @click="logout">Logout</a>
    <span v-if="store.user">| 🔒 {{ store.user.email }}</span>
  </div>
  <div>
    <router-view />
  </div>
</template>
