<template>
  <div class="container mx-auto flex flex-col gap-5 py-5 px-5">
    <TheHeader @toggle-dark="toggleDark" />
    <TheMain />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const cssColorScheme = computed(() => (isDark.value ? 'dark' : 'light'))

onMounted(() => {
  document.documentElement.style.colorScheme = cssColorScheme.value
})

watch(isDark, () => {
  document.documentElement.style.colorScheme = cssColorScheme.value
})
</script>
