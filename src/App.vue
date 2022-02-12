<script setup lang="ts">
import useAuth from "./composables/useAuth";
const { user } = useAuth();
</script>

<template>
  <div class="text-center">
    <router-link to="/"> Home </router-link>
    <router-link v-if="!user" to="/login"> Login </router-link>
    <router-link v-if="!user" to="/register"> Register </router-link>
    <router-link v-if="user" to="/profile"> Profile </router-link>
    <router-link v-if="user" to="/logout"> Logout </router-link>
    <span v-if="user">👤 Hello {{ user.email }}</span>
  </div>
  <div>
    <router-view />
  </div>
</template>

<style scoped>
a {
  margin-right: 10px;
}
</style>
