<template>
  <div
    ref="todoCardRef"
    tabindex="0"
    class="flex h-12 min-h-[3rem] items-center justify-between rounded-xl outline-none"
    :class="[
      ``,
      isSelected
        ? `bg-${props.color}-100 dark:bg-${props.color}-700`
        : `focus:bg-${props.color}-200 dark:focus:bg-${props.color}-600 bg-${props.color}-50 dark:bg-${props.color}-800 hover:bg-${props.color}-100 dark:hover:bg-${props.color}-700 cursor-pointer`,
    ]"
    @keydown.self.space.enter="selectCard"
  >
    <div
      class="flex h-full w-full items-center gap-2 rounded-l-xl px-3"
      :class="`focus-within:bg-${color}-200 dark:focus-within:bg-${color}-600`"
      @click="selectCard"
    >
      <slot name="drag-handler"></slot>

      <input
        title="card title"
        area-label="card title"
        type="text"
        :class="!isSelected ? 'cursor-pointer' : ''"
        class="h-full w-full bg-transparent outline-none"
        :placeholder="props.placeholder"
        :disabled="!isSelected"
        :value="title"
        @change="updateCardTitle"
      />
    </div>

    <TodoCardButton title="download card" :color="props.color" @click="downloadMarkdown"
      ><FontAwesomeIcon :icon="['fas', 'download']" class="text-lg [user-select:none]"
    /></TodoCardButton>

    <TodoCardButton title="pick color" :color="props.color" @click="pickColor"
      ><FontAwesomeIcon :icon="['fas', 'brush']" class="text-lg [user-select:none]"
    /></TodoCardButton>

    <TodoCardButton
      title="delete card"
      :color="props.color"
      class="rounded-r-xl"
      @click="deleteCard"
    >
      <FontAwesomeIcon :icon="['fas', 'xmark']" class="text-xl [user-select:none]"
    /></TodoCardButton>
  </div>
</template>

<script setup lang="ts">
import type { CardUpdate } from '~/types'
import { FetchError } from 'ofetch'

import { useToast } from 'vue-toastification'

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

const toast = useToast()

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

const downloadMarkdown = async () => {
  try {
    const { filename, md } = await $fetch(`/api/download/${props.id}`)

    const blob = new Blob([md])
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    a.remove()
  } catch (e) {
    if (e instanceof FetchError) toast.error(e.data.message)
  }
}
</script>
