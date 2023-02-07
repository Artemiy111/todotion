<template>
  <img
    width="24"
    height="24"
    src="~/assets/drag.png"
    alt=""
    class="h-6 cursor-grab [user-select:none] dark:invert"
    :class="props.isHidden ? 'hidden' : handlerClass"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  handlerClass: string
  isHidden?: boolean
}>()
</script>
