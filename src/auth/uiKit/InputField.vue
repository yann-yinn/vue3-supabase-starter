<script setup lang="ts">
import { reactive } from "vue";

interface Props {
  modelValue: string;
  type: "email" | "text" | "number" | "password";
  required: boolean;
  error: string | undefined;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  showPassword: false,
  type: props.type,
});

function handleInput(event: any) {
  emit("update:modelValue", event.target.value);
}

function handleShowPassword(value: boolean) {
  state.showPassword = value;
  state.type = value ? "text" : "password";
}
</script>

<template>
  <div>
    <div
      class="text-right text-indigo-600 cursor-pointer"
      v-if="type === 'password'"
    >
      <div v-show="!state.showPassword" @click="() => handleShowPassword(true)">
        Show password
      </div>
      <div v-show="state.showPassword" @click="() => handleShowPassword(false)">
        Hide password
      </div>
    </div>
    <div>
      <input
        :value="modelValue"
        @input="handleInput"
        :type="state.type"
        :required="required"
        class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
      />
    </div>
    <div v-if="error" class="text-red-600 mt-2">{{ error }}</div>
  </div>
</template>
