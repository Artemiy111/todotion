<template>
  <div class="">
    <div class="px-3 h-12 bg-slate-50 rounded-xl flex items-center gap-2 focus-within:bg-blue-100">
      <input
        type="checkbox"
        class="cursor-pointer"
        @change="handleCheckbox"
        :checked="props.row.isCompleted"
      />
      <input
        ref="inputRef"
        type="text"
        :value="props.row.text"
        class="w-full h-full outline-none bg-inherit"
        @input="handleInput"
        @keydown.enter="handleEnter"
        @keydown.backspace="handleBackspace"
        @keydown.delete="handleDelete"
        @keydown.arrow-up.arrow-down="handleArrowsVertical"
        @keydown.arrow-left.arrow-right="handleArrowsHorizontal"
      />
      <slot name="drag-handler"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoRow } from '.prisma/client'
import type { RowCreate, RowUpdate } from '~/types'

import { useKeyModifier } from '@vueuse/core'

const ctrl = useKeyModifier('Control')
const alt = useKeyModifier('Alt')

const props = defineProps<{
  row: TodoRow
  prevRow: TodoRow | null
  nextRow: TodoRow | null
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

const getInputParams = (event: Event) => {
  const target = event.target as HTMLInputElement
  const text = target.value
  const isEmpty = text.length === 0

  return { target, text, isEmpty }
}

const getSelectionParams = (event: Event) => {
  const { target, text, isEmpty } = getInputParams(event)
  const start = target.selectionStart as number
  const end = target.selectionEnd as number

  const leftText = text.slice(0, start)
  const selectedText = text.slice(start, end)
  const rightText = text.slice(end, text.length)

  const isPoint = start === end
  const isStart = start === 0
  const isEnd = end === text.length

  return {
    target,
    text,
    start,
    end,
    leftText,
    selectedText,
    rightText,
    isPoint,
    isEmpty,
    isStart,
    isEnd,
  }
}

const handleInput = (event: Event) => {
  const { text } = getInputParams(event)
  emit('update', props.row.id, { text })
}

const handleEnter = (event: KeyboardEvent) => {
  const { leftText, rightText, isPoint, isEnd } = getSelectionParams(event)

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
  const { text, isPoint, isEmpty, isStart } = getSelectionParams(event)

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

  const { text, isPoint, isEnd } = getSelectionParams(event)

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
  const { start } = getSelectionParams(event)

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
  const { isPoint, isStart, isEnd } = getSelectionParams(event)

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
