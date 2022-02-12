<script setup lang="ts">
import useAuth from "./composables/useAuth";

const { logout, user } = useAuth();

async function handleLogoutClick() {
  logout();
}
</script>

<template>
  <div class="text-center">
    <router-link to="/"> Home </router-link>
    <router-link v-if="!user" to="/login"> Login </router-link>
    <router-link v-if="!user" to="/register"> Register </router-link>
    <a v-if="user" class="cursor-pointer" @click="handleLogoutClick">
      Logout
    </a>
  </div>
  <div>
    <router-view />
  </div>
</template>
