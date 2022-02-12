<script lang="ts" setup>
import useAuth from "@/composables/useAuth";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const { logout } = useAuth();

logout().then(() => {
  router.push({
    name: "home",
    query: {
      ...route.query,
    },
  });
});
</script>

<template>
  <div class="mx-auto max-w-md mt-4 text-center">Logging out...</div>
</template>
