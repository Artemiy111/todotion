<template>
  <div
    ref="todoCardRef"
    class="flex h-12 items-center justify-between rounded-xl"
    :class="[`bg-${props.color}-50`, isSelected ? `bg-${props.color}-100` : 'cursor-pointer']"
  >
    <div
      class="flex h-full w-full items-center gap-2 rounded-l-xl px-3"
      :class="`focus-within:bg-${color}-200`"
      @click="selectCard"
    >
      <slot name="drag-handler"></slot>
      <input
        type="text"
        :class="!isSelected ? 'cursor-pointer' : ''"
        class="h-full w-full bg-transparent outline-none"
        :placeholder="props.placeholder"
        :disabled="!isSelected"
        :value="title"
        @change="updateCardTitle"
      />
    </div>
    <TodoCardButton :color="props.color" @click="pickColor"
      ><FontAwesomeIcon :icon="['fas', 'brush']" class="text-lg [user-select:none]"
    /></TodoCardButton>

    <TodoCardButton :color="props.color" class="rounded-r-xl" @click="deleteCard">
      <FontAwesomeIcon :icon="['fas', 'xmark']" class="text-xl [user-select:none]"
    /></TodoCardButton>
  </div>
</template>

<script setup lang="ts">
import type { CardUpdate } from '~/types'

const props = defineProps<{
  id: string
  title: string
  color: string
  isSelected: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'select'): void
  (e: 'update', data: CardUpdate): void
  (e: 'delete'): void
  (
    e: 'open-color-picker',
    prevColor: string,
    key: string,
    pickerPosition: { top: number; left: number }
  ): void
}>()

const todoCardRef = ref<HTMLDivElement | null>(null)

const pickColor = () => {
  if (!todoCardRef.value) return
  const { top, left, height, width } = todoCardRef.value.getBoundingClientRect()
  const pickerPosition = {
    top: top + height + 20,
    left: left + width / 2,
  }
  emit('open-color-picker', props.color, props.id, pickerPosition)
}

const selectCard = () => {
  if (!props.isSelected) emit('select')
}

const deleteCard = () => {
  emit('delete')
}

const updateCardTitle = (event: Event) => {
  const newTitle = (event.target as HTMLInputElement).value
  emit('update', { title: newTitle })
}
</script>
