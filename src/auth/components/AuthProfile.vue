<script lang="ts" setup>
import useAuth from "@/auth/composables/useAuth";
const { user } = useAuth();
</script>

<template>
  <pre>
  {{ user }}
  </pre>
</template>
