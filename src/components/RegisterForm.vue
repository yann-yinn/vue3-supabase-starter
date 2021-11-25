<script setup lang="ts">
import InputField from "@/uiKit/InputField.vue";
import AppButton from "@/uiKit/AppButton.vue";
import { useField } from "vee-validate";
import * as yup from "yup";
import useSupabase from "@/composables/useSupabase";
import { reactive } from "vue";

interface State {
  signUpError: string | null;
  signUpPending: boolean;
}

const state = reactive<State>({
  signUpError: null,
  signUpPending: false,
});

const supabase = useSupabase();

const fieldEmail = useField<string>("email", yup.string().required(), {
  initialValue: "",
});
const fieldPassword = useField<string>("password", yup.string().required(), {
  initialValue: "",
});

async function handleFormSubmit() {
  state.signUpPending = true;
  const values = {
    email: fieldEmail.value.value,
    password: fieldPassword.value.value,
  };
  supabase.auth
    .signUp(values)
    .then((result) => {
      console.log("result", result);
    })
    .catch((error: any) => {
      state.signUpError = error;
      throw new Error(error);
    })
    .finally(() => {
      state.signUpPending = false;
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
      <InputField
        type="password"
        v-model="fieldPassword.value.value"
        :error="fieldPassword.errorMessage.value"
        required
      />
    </div>

    <div class="mt-4">
      <AppButton type="submit" :disabled="state.signUpPending">
        {{ state.signUpPending ? "Pending..." : "Register" }}
      </AppButton>
    </div>
  </form>
</template>
