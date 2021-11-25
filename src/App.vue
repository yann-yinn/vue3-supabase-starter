<script setup lang="ts"></script>

<template>
  <div class="text-center">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <div>
    <router-view />
  </div>
</template>
