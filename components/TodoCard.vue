<template>
  <div
    class="flex h-12 items-center justify-between rounded-xl bg-slate-50"
    :class="isSelected ? 'bg-blue-50' : 'cursor-pointer'"
  >
    <div
      class="flex h-full w-full items-center gap-2 rounded-l-xl px-3 focus-within:bg-blue-100"
      @click="selectCard"
    >
      <slot name="drag-handler"></slot>
      <input
        type="text"
        :value="title"
        :class="!isSelected ? 'cursor-pointer' : ''"
        class="h-full w-full bg-transparent outline-none"
        :placeholder="props.placeholder"
        :disabled="!isSelected"
        @change="updateCardTitle"
      />
    </div>
    <button
      class="flex aspect-square h-full items-center justify-center rounded-r-xl focus:bg-blue-100 focus:outline-none active:bg-blue-200"
      @click="deleteCard"
    >
      <FontAwesomeIcon icon="fa-solid fa-xmark" class="text-xl [user-select:none]" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CardUpdate } from '~/types'

const props = defineProps<{
  title: string
  isSelected: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'select'): void
  (e: 'update', data: CardUpdate): void
  (e: 'delete'): void
}>()

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
