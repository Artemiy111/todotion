<template>
  <div
    v-if="isOpen"
    ref="colorPickerRef"
    tabindex="1"
    class="grid w-fit grid-cols-4 gap-4 rounded-lg bg-white p-5 shadow-2xl dark:bg-slate-800"
  >
    <div v-for="color in props.colors" :key="color">
      <label class="block h-full w-full">
        <input
          name="color"
          type="radio"
          :value="color"
          :checked="isColorPicked(color)"
          class="peer hidden"
          @change="pickColor"
        />
        <div
          :tabindex="isColorPicked(color) ? -1 : 1"
          class="h-8 w-8 cursor-pointer rounded-lg outline-offset-4 peer-checked:border-2 peer-checked:border-black dark:peer-checked:border-white"
          :class="`bg-${color}-100 hover:bg-${color}-200 active:bg-${color}-300 dark:bg-${color}-700 dark:hover:bg-${color}-600 dark:active:bg-${color}-500`"
          @keydown.space.enter="changeChecked"
        ></div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, useEventListener } from '@vueuse/core'

const props = defineProps<{
  defaultColor: string
  colors: string[]
}>()

const emit = defineEmits<{
  (e: 'pick-color', color: string, key?: string): void
}>()

const colorPickerRef = ref<HTMLDivElement | null>(null)

const keyPick = ref<string>()

const isOpen = ref(false)

const isColorPicked = (color: string) => color === props.defaultColor

onClickOutside(colorPickerRef, () => close())

useEventListener('keydown', event => {
  if (event.code === 'Escape' && isOpen.value) close()
})

const open = (key?: string) => {
  isOpen.value = true
  keyPick.value = key
  nextTick(() => colorPickerRef.value?.focus())
}

const close = () => {
  isOpen.value = false
  keyPick.value = undefined
}

const pickColor = (event: Event) => {
  const color = (event.target as HTMLInputElement).value
  emit('pick-color', color, keyPick.value)
}

const changeChecked = (event: KeyboardEvent) => {
  const div = event.target as HTMLDivElement
  const input = div.previousSibling as HTMLInputElement
  if (!input.checked) input.click()
}

defineExpose({
  open,
  close,
})
</script>
