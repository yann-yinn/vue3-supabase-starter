<script setup lang="ts">
interface Props {
  modelValue: string;
  type: "email" | "text" | "number" | "password";
  required: boolean;
  error: string | undefined;
}
defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

function handleInput(event: any) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <div>
    <input
      :value="modelValue"
      @input="handleInput"
      :type="type"
      :required="required"
      class="
        mt-1
        block
        w-full
        rounded-md
        bg-gray-100
        border-transparent
        focus:border-gray-500 focus:bg-white focus:ring-0
      "
    />
  </div>
  <div v-if="error" class="text-red-600 mt-2">{{ error }}</div>
</template>
