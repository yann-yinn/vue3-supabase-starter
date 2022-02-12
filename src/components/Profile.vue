<script lang="ts" setup>
import useAuth from "@/composables/useAuth";
const { user } = useAuth();
</script>

<template>
  <pre>
  {{ user }}
  </pre>
</template>
