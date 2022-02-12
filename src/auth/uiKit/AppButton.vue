<script setup lang="ts">
interface Props {
  type?: "submit" | "button" | "reset";
  value?: string;
  disabled?: boolean;
}
withDefaults(defineProps<Props>(), {
  type: "button",
  disabled: false,
});
</script>

<template>
  <button
    type="submit"
    :disabled="disabled"
    class="
      disabled:opacity-50
      bg-blue-500
      hover:bg-blue-700
      text-white
      font-bold
      py-2
      px-4
      border border-blue-700
      rounded
      hover:cursor-pointer
    "
  >
    <slot>Submit</slot>
  </button>
</template>
