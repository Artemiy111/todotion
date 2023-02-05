<template>
  <div
    v-if="props.isOpen"
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
const props = defineProps<{
  isOpen: boolean
  popupKey?: string
  defaultColor: string
  colors: string[]
}>()

const emit = defineEmits<{
  (e: 'pick-color', color: string, key?: string): void
}>()

//

const colorPickerRef = ref<HTMLDivElement | null>(null)

watch(
  () => props.isOpen,
  () => {
    if (props.isOpen) nextTick(() => colorPickerRef.value?.focus())
  }
)

//

const isColorPicked = (color: string) => color === props.defaultColor

const pickColor = (event: Event) => {
  const color = (event.target as HTMLInputElement).value
  emit('pick-color', color, props.popupKey)
}

const changeChecked = (event: KeyboardEvent) => {
  const div = event.target as HTMLDivElement
  const input = div.previousSibling as HTMLInputElement
  if (!input.checked) input.click()
}
</script>
