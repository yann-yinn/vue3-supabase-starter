<script setup lang="ts">
import InputField from "@/uiKit/InputField.vue";
import AppButton from "@/uiKit/AppButton.vue";
import { useField } from "vee-validate";
import * as yup from "yup";
import { reactive } from "vue";
import useSupabase from "@/composables/useSupabase";
import { useStore } from "@/stores";

const store = useStore();
const supabase = useSupabase();

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
  state.submitPending = true;
  const values = {
    email: fieldEmail.value.value,
    password: fieldPassword.value.value,
  };
  supabase.auth
    .signIn(values)
    .then((response) => {
      if (response.user) {
        store.user = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
        };
      }
    })
    .catch((error: any) => {
      console.log("error", error);
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
      <InputField
        type="password"
        v-model="fieldPassword.value.value"
        :error="fieldPassword.errorMessage.value"
        required
      />
    </div>

    <div class="mt-4">
      <AppButton type="submit">Login</AppButton>
    </div>
  </form>
</template>
