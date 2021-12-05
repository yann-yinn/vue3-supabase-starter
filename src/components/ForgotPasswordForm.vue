<script setup lang="ts">
import InputField from "@/uiKit/InputField.vue";
import AppButton from "@/uiKit/AppButton.vue";
import { useField } from "vee-validate";
import * as yup from "yup";
import { reactive } from "vue";
import useSupabase from "@/composables/useSupabase";
import useStore from "@/stores";

interface State {
  submitError: string | null;
  submitPending: boolean;
}

const { supabase } = useSupabase();
const store = useStore();

const state = reactive<State>({
  submitError: null as string | null,
  submitPending: false,
});

const fieldEmail = useField<string>("email", yup.string().required(), {
  initialValue: store.forgotPasswordEmail ? store.forgotPasswordEmail : "",
});

async function handleFormSubmit() {
  state.submitPending = true;
  supabase.auth.api
    .resetPasswordForEmail(fieldEmail.value.value)
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
