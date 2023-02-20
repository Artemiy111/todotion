<template>
  <div class="">
    <div
      class="flex h-12 items-center gap-2 rounded-xl bg-slate-50 px-3 focus-within:bg-slate-100 dark:bg-slate-800 dark:focus-within:bg-slate-700"
    >
      <input
        aria-label="row completed status"
        type="checkbox"
        class="cursor-pointer"
        :checked="props.row.isCompleted"
        @change="handleCheckbox"
      />
      <input
        ref="inputRef"
        aria-label="row text"
        type="text"
        class="h-full w-full bg-inherit outline-none"
        :placeholder="props.placeholder"
        :value="props.row.text"
        @input="updateText"
        @keydown.enter="handleEnter"
        @keydown.backspace="handleBackspace"
        @keydown.delete="handleDelete"
        @keydown.arrow-up.arrow-down="handleArrowsVertical"
        @keydown.arrow-left.arrow-right="handleArrowsHorizontal"
      />

      <slot name="drag-handler" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoRow, RowCreate, RowUpdate } from '~/types'

import { useKeyModifier } from '@vueuse/core'
import { getInputParams, getInputSelectionParams } from '~/helpers/getInputSelectionParams'

const ctrl = useKeyModifier('Control')
const alt = useKeyModifier('Alt')

const props = defineProps<{
  row: TodoRow
  prevRow: TodoRow | null
  nextRow: TodoRow | null
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'create', data: RowCreate): void
  (e: 'update', rowId: string, data: RowUpdate): void
  (e: 'delete', rowId: string): void

  (e: 'update-and-create', rowIdUpdate: string, dataUpdate: RowUpdate, dataCreate: RowCreate): void
  (e: 'update-and-delete', rowIdUpdate: string, dataUpdate: RowUpdate, rowIdDelete: string): void

  (e: 'focus', rowId: string, cursorPlace?: number): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const focus = (cursorPlace?: number) => {
  if (inputRef.value === null) return

  inputRef.value.focus()

  if (cursorPlace !== undefined) {
    inputRef.value.selectionStart = cursorPlace
    inputRef.value.selectionEnd = cursorPlace
  }
}

defineExpose({
  props,
  focus,
})

const handleCheckbox = (event: Event) => {
  const newIsCompleted = (event.target as HTMLInputElement).checked
  emit('update', props.row.id, { isCompleted: newIsCompleted })
}

const updateText = (event: Event) => {
  const { text } = getInputParams(event)
  emit('update', props.row.id, { text })
}

const handleEnter = (event: KeyboardEvent) => {
  const { leftText, rightText, isPoint, isEnd } = getInputSelectionParams(event)

  if (ctrl.value) {
    emit('update', props.row.id, { isCompleted: !props.row.isCompleted })
    return
  }

  if (isPoint) {
    const dataCreate = {
      text: rightText,
      order: props.row.order + 1,
      todoCardId: props.row.todoCardId,
    }

    if (isEnd) {
      emit('create', dataCreate)
      return
    }

    emit('update-and-create', props.row.id, { text: leftText }, dataCreate)
    return
  }

  emit(
    'update-and-create',
    props.row.id,
    { text: leftText },
    {
      text: rightText,
      order: props.row.order + 1,
      todoCardId: props.row.todoCardId,
    }
  )
}

const handleBackspace = (event: KeyboardEvent) => {
  const { text, isPoint, isEmpty, isStart } = getInputSelectionParams(event)

  if (!props.prevRow) return

  if (isEmpty) {
    emit('delete', props.row.id)
    return
  }

  if (isPoint && isStart) {
    emit('update-and-delete', props.prevRow.id, { text: props.prevRow.text + text }, props.row.id)
  }
}

const handleDelete = (event: KeyboardEvent) => {
  if (event.code !== 'Delete') return

  const { text, isPoint, isEnd } = getInputSelectionParams(event)

  if (isPoint && isEnd && props.nextRow) {
    emit('update-and-delete', props.row.id, { text: text + props.nextRow.text }, props.nextRow.id)
  }
}

const Arrows = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
}

const checkArrow = (event: KeyboardEvent) => {
  const arrow = event.code
  return {
    isArrowUp: arrow === Arrows.UP,
    isArrowDown: arrow === Arrows.DOWN,
    isArrowLeft: arrow === Arrows.LEFT,
    isArrowRight: arrow === Arrows.RIGHT,
  }
}

const handleArrowsVertical = (event: KeyboardEvent) => {
  event.preventDefault()
  const { isArrowUp, isArrowDown } = checkArrow(event)
  const { start } = getInputSelectionParams(event)

  if (alt.value) {
    if (isArrowUp && props.prevRow) emit('update', props.row.id, { order: props.row.order - 1 })

    if (isArrowDown && props.nextRow) emit('update', props.row.id, { order: props.row.order + 1 })
    return
  }

  if (isArrowUp && props.prevRow) {
    emit('focus', props.prevRow.id, start)
  }

  if (isArrowDown && props.nextRow) {
    emit('focus', props.nextRow.id, start)
  }
}

const handleArrowsHorizontal = (event: KeyboardEvent) => {
  const { isArrowLeft, isArrowRight } = checkArrow(event)
  const { isPoint, isStart, isEnd } = getInputSelectionParams(event)

  if (isPoint) {
    if (isStart && isArrowLeft && props.prevRow) {
      event.preventDefault()
      emit('focus', props.prevRow.id, props.prevRow.text.length)
    }

    if (isEnd && isArrowRight && props.nextRow) {
      event.preventDefault()
      emit('focus', props.nextRow.id, 0)
    }
  }
}
</script>
