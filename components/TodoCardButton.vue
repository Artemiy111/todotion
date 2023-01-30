<template>
  <button
    class="flex aspect-square h-full items-center justify-center focus:outline-none"
    :class="`focus:bg-${props.color}-200 active:bg-${props.color}-300`"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: string
  }>(),
  {
    color: 'slate',
  }
)
</script>
