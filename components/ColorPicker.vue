<template>
  <div
    v-if="isOpen"
    ref="colorPickerRef"
    class="grid w-fit grid-cols-4 gap-4 rounded-lg bg-white p-5 shadow-2xl"
  >
    <div v-for="color in props.colors" :key="color">
      <label class="block h-full w-full">
        <input
          type="radio"
          name="color"
          :value="color"
          :checked="color === defaultColor"
          class="peer hidden"
          @change="pickColor"
        />
        <div
          class="h-8 w-8 cursor-pointer rounded-lg peer-checked:border-2 peer-checked:border-black"
          :class="`bg-${color}-100 hover:bg-${color}-200 active:bg-${color}-300`"
        ></div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  defaultColor: string
  colors: string[]
}>()

const emit = defineEmits<{
  (e: 'pick-color', color: string, key?: string): void
}>()

const colorPickerRef = ref<HTMLDivElement | null>(null)

const keyPick = ref<string>()

onClickOutside(colorPickerRef, () => {
  close()
})

const isOpen = ref(false)

const open = (key?: string) => {
  isOpen.value = true
  keyPick.value = key
}

const close = () => {
  isOpen.value = false
  keyPick.value = undefined
}

defineExpose({
  open,
  close,
})

const pickColor = (event: Event) => {
  const color = (event.target as HTMLInputElement).value
  emit('pick-color', color, keyPick.value)
}
</script>
