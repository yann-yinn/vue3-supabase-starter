<script setup lang="ts"></script>

<template>
  <div>
    <input
      type="submit"
      v-bind="$attrs"
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
