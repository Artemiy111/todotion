<template>
  <div
    class="flex justify-between h-[50px] items-center bg-slate-50 rounded-xl"
  >
    <div
      class="px-3 flex gap-2 items-center w-full h-full focus-within:bg-blue-100 rounded-l-xl"
    >
      <slot></slot>
      <input
        type="text"
        class="w-full h-full bg-transparent focus:outline-none"
        :placeholder="placeholder"
      />
    </div>
    <button
      class="rounded-r-xl aspect-square h-full focus:outline-none focus:bg-blue-100 active:bg-blue-200"
    >
      <FontAwesomeIcon icon="fa-solid fa-plus" class="text-xl" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  placeholder?: string
}>()
</script>
