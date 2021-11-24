<script setup lang="ts">
interface Props {
  value: string;
}
withDefaults(defineProps<Props>(), {
  value: "Submit",
});
</script>

<template>
  <div>
    <input
      type="submit"
      :value="$props.value"
      class="
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
    />
  </div>
</template>
