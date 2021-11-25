<script setup lang="ts">
import InputField from "@/uiKit/InputField.vue";
import InputSubmit from "@/uiKit/InputSubmit.vue";
import { useField } from "vee-validate";
import * as yup from "yup";
import useSupabase from "@/composables/useSupabase";
import { ref } from "vue";

const signUpError = ref<string | null>(null);

const supabase = useSupabase();
const fieldEmail = useField<string>("email", yup.string().required(), {
  initialValue: "",
});
const fieldPassword = useField<string>("password", yup.string().required(), {
  initialValue: "",
});

async function handleFormSubmit() {
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
      signUpError.value = error;
      throw new Error(error);
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
      <InputSubmit value="Register" />
    </div>
  </form>
</template>
