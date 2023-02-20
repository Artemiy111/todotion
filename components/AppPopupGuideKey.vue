<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <span class="bg-slate-100 py-1 px-2 font-medium dark:bg-slate-700">{{ props.text }}</span>
</template>
