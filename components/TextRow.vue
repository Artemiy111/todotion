<template>
  <div class="">
    <div class="p-3 bg-white rounded-xl flex gap-2">
      <input type="checkbox" name="" id="" />
      <input type="text" :value="value" class="w-full" />
      ><img src="~/assets/drag.png" alt="" class="h-6 cursor-grab" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
}>()

const emits = defineEmits<{
  (e: 'change'): void
}>()
</script>
