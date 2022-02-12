<script setup lang="ts">
import InputField from "@/auth/uiKit/InputField.vue";
import AppButton from "@/auth/uiKit/AppButton.vue";
import { useField } from "vee-validate";
import * as yup from "yup";
import { reactive } from "vue";
import useAuth from "@/auth/composables/useAuth";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { register } = useAuth();

const state = reactive({
  submitError: null as string | null,
  submitPending: false,
});

const fieldEmail = useField<string>("email", yup.string().required(), {
  initialValue: "",
});
const fieldPassword = useField<string>("password", yup.string().required(), {
  initialValue: "",
});

async function handleFormSubmit() {
  state.submitError = null;
  state.submitPending = true;
  const values = {
    email: fieldEmail.value.value,
    password: fieldPassword.value.value,
  };
  register(values)
    .then(() => {
      state.submitPending = false;
      router.push({
        name: "home",
        query: {
          ...route.query,
        },
      });
    })
    .catch((error: any) => {
      state.submitPending = false;
      state.submitError = error;
      throw new Error(error);
    });
}
</script>

<template>
  <form @submit.prevent="handleFormSubmit">
    <div class="bg-red-300 p-3 rounded my-3" v-if="state.submitError">
      {{ state.submitError }}
    </div>
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
      <AppButton type="submit" :disabled="state.submitPending">
        {{ state.submitPending ? "Pending..." : "Register" }}
      </AppButton>
    </div>
  </form>
</template>
