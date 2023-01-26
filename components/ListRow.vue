<template>
  <div class="">
    <div
      class="px-3 h-12 bg-slate-50 rounded-xl flex items-center gap-2 focus-within:bg-blue-100"
    >
      <input type="checkbox" class="cursor-pointer" />
      <input
        type="text"
        :value="props.value"
        class="w-full h-full outline-none bg-inherit"
      />
      <img
        src="~/assets/drag.png"
        alt=""
        class="h-6 cursor-grab [user-event:none]"
      />
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
