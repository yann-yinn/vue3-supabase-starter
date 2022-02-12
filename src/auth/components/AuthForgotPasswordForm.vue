<script setup lang="ts">
import InputField from "@/auth/uiKit/InputField.vue";
import AppButton from "@/auth/uiKit/AppButton.vue";
import useAuth from "@/auth/composables/useAuth";
import { useField } from "vee-validate";
import { reactive } from "vue";
import * as yup from "yup";

interface State {
  submitError: string | null;
  submitPending: boolean;
}

const { resetPassword, forgotPasswordEmail } = useAuth();

const state = reactive<State>({
  submitError: null as string | null,
  submitPending: false,
});

const fieldEmail = useField<string>("email", yup.string().required(), {
  initialValue: forgotPasswordEmail ? forgotPasswordEmail : "",
});

async function handleFormSubmit() {
  state.submitPending = true;
  resetPassword(fieldEmail.value.value)
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
    <div class="mt-4">
      <InputField
        type="email"
        v-model="fieldEmail.value.value"
        required
        :error="fieldEmail.errorMessage.value"
      />
    </div>

    <div class="mt-4">
      <AppButton type="submit" :disabled="state.submitPending">
        {{ state.submitPending ? "Pending..." : "Reset password" }}
      </AppButton>
    </div>
  </form>
</template>
