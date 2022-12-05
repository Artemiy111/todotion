<template>
  <div class="flex flex-col gap-5 p-5 m-5 bg-slate-200 rounded-xl">
    <transition-group name="list">
      <TextRow
        v-for="(row, index) in rows"
        :key="row.id"
        :value="row.text"
        @dragstart="dragStart($event, row.id)"
        @drop="drop($event, row.id, index)"
        @dragenter.prevent
        @dragover.prevent
        @dragging="dragging"
        dropzone="move"
      ></TextRow>
    </transition-group>
  </div>
  <SlickList
    v-model:list="rows"
    class="flex flex-col gap-5 p-5 m-5 bg-slate-200 rounded-xl"
    lockAxis="y"
    :useDragHandle="true"
  >
    <SlickItem
      v-for="(row, index) in rows"
      :key="row.id"
      :index="index"
      class=""
    >
      <TextRow :value="row.text" />
    </SlickItem>
  </SlickList>
</template>

<script setup lang="ts">
import { SlickList, SlickItem } from 'vue-slicksort'

interface Row {
  id: string
  text: string
}

const rows = ref<Row[]>([
  { id: 'erer', text: 'dfdf' },
  { id: 'hbdfg', text: 'hello' },
  { id: 'oefeo', text: 'qwqw' },
])

const dragging = () => {
  console.log(111)
}

const dragStart = (event: DragEvent, rowId: string) => {
  if (!event.dataTransfer) return
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('rowId', rowId)
  document.body.style.cursor = 'grabbing'
}

const drop = async (
  event: DragEvent,
  currentRowId: string,
  currentRowIndex: number
) => {
  if (!event.dataTransfer) return
  const draggableRowId = event.dataTransfer?.getData('rowId')
  if (draggableRowId === currentRowId) return
  const target = event.target as HTMLElement
  const rowEl = target.parentNode as HTMLDivElement

  const { height, top } = rowEl.getBoundingClientRect()
  const y = event.clientY - top
  const middle = height / 2
  const isTopOfRow = y <= middle ? true : false
  // console.log(isTopOfRow)

  const row = rows.value.find(row => row.id === draggableRowId) as Row
  rows.value = rows.value.filter(row => row.id !== draggableRowId)
  if (isTopOfRow || true) {
    rows.value.splice(currentRowIndex, 0, row)
    return
  }
  //   rows.value.splice(currentRowIndex + 1, 0, row)
}
</script>

<style scoped>
.list-row {
  transition: all 0.8s ease;
  display: inline-block;
}
.list-move {
  transition: all 0.8s ease;
}
</style>
