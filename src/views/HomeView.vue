<script lang="ts" setup>
import useAuth from "@/composables/useAuth";
import AppButton from "@/uiKit/AppButton.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { user } = useAuth();
</script>

<template>
  <main>
    <div class="mx-auto max-w-md mt-4 text-center">
      <h1 class="text-3xl mt-5">Vue 3 + Supabase POC</h1>
      <div v-if="!user">
        <AppButton @click="router.push('/login')" class="mt-5">
          Se connecter
        </AppButton>
      </div>
      <div v-else>
        <p class="mt-5">
          Vous êtes connecté <em>{{ user.email }}</em> !
        </p>
      </div>
    </div>
  </main>
</template>
