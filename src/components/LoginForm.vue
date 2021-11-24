<script setup lang="ts">
import InputField from "@/uiKit/InputField.vue";
import InputSubmit from "@/uiKit/InputSubmit.vue";
import { useField } from "vee-validate";
import * as yup from "yup";

const fieldEmail = useField<string>("email", yup.string().required());
const fieldPassword = useField<string>("password", yup.string().required());

function handleFormSubmit() {
  alert("form submitted");
}
</script>

<template>
  <form @submit.prevent="handleFormSubmit">
    <div class="mt-4">
      <InputField
        type="email"
        v-model="fieldEmail.value.value"
        required
        :error="fieldEmail.errorMessage.value"
      />
    </div>
    <div class="mt-4">
      <InputField
        type="password"
        v-model="fieldPassword.value.value"
        :error="fieldPassword.errorMessage.value"
        required
      />
    </div>
    <div class="mt-4">
      <InputSubmit />
    </div>
  </form>
</template>
