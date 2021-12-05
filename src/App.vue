<script setup lang="ts">
import useSupabase from "@/composables/useSupabase";
import useStore from "@/stores";

const store = useStore();
const { logout } = useSupabase();

async function handleLogoutClick() {
  logout();
}
</script>

<template>
  <div class="text-center">
    <router-link to="/"> Home </router-link>
    <router-link v-if="!store.user" to="/login"> Login </router-link>
    <router-link v-if="!store.user" to="/register"> Register </router-link>
    <a v-if="store.user" class="cursor-pointer" @click="handleLogoutClick">
      Logout
    </a>
    <span v-if="store.user">( {{ store.user.email }} )</span>
  </div>
  <div>
    <router-view />
  </div>
</template>
