<template>
  <button
    class="flex aspect-square h-full items-center justify-center focus:outline-none"
    :class="`hover:bg-${props.color}-200 focus:bg-${props.color}-200 active:bg-${props.color}-300 dark:hover:bg-${props.color}-600 dark:focus:bg-${props.color}-600 dark:active:bg-${props.color}-500`"
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
