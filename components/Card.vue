<template>
  <div
    class="flex justify-between h-12 items-center bg-slate-50 rounded-xl"
    :class="isSelected ? 'bg-blue-50' : 'cursor-pointer'"
  >
    <div
      class="px-3 flex gap-2 items-center w-full h-full focus-within:bg-blue-100 rounded-l-xl"
      @click="selectCard"
    >
      <img src="~/assets/drag.png" alt="" class="h-6 cursor-grab [user-select:none]" />

      <input
        type="text"
        :value="title"
        :class="!isSelected ? 'cursor-pointer' : ''"
        class="w-full h-full bg-transparent outline-none"
        :placeholder="props.placeholder"
        :disabled="!isSelected"
        @change="updateCardTitle"
      />
    </div>
    <button
      @click="deleteCard"
      class="rounded-r-xl aspect-square h-full flex items-center justify-center focus:outline-none focus:bg-blue-100 active:bg-blue-200"
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
