<script setup lang="ts">
interface Props {
  modelValue: string;
  type: "email" | "text" | "number" | "password";
  required: boolean;
  error: string | undefined;
}
const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

function handleInput(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <div>
    <input
      :value="modelValue"
      @input="handleInput"
      :type="$props.type"
      :required="$props.required"
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
  <div class="text-red-600 mt-2">{{ $props.error }}</div>
</template>
