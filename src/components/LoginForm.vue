<script setup lang="ts">
import InputField from "@/uiKit/InputField.vue";
import AppButton from "@/uiKit/AppButton.vue";
import { useField } from "vee-validate";
import * as yup from "yup";
import { reactive } from "vue";
import useAuth from "@/composables/useAuth";

const { login } = useAuth();

const fieldEmail = useField<string>("email", yup.string().required(), {
  initialValue: "",
});
const fieldPassword = useField<string>("password", yup.string().required(), {
  initialValue: "",
});

const state = reactive({
  submitError: null as string | null,
  submitPending: false,
});

function handleFormSubmit() {
  state.submitError = null;
  state.submitPending = true;
  const values = {
    email: fieldEmail.value.value,
    password: fieldPassword.value.value,
  };
  login(values)
    .catch((error: any) => {
      state.submitError = error;
      throw new Error(error);
    })
    .finally(() => {
      state.submitPending = false;
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
      <AppButton type="submit">
        {{ state.submitPending ? "Pending..." : "Login" }}
      </AppButton>
    </div>
  </form>
</template>
