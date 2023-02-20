<template>
  <Draggable
    v-if="rowsOfSelectedCardByOrder.length"
    v-bind="$attrs"
    :list="rowsOfSelectedCardByOrder"
    :animation="100"
    class="flex flex-col gap-3 rounded-xl"
    item-key="id"
    tag="div"
    handle=".drag-handler"
    @change="changeRowOrder"
  >
    <template #item="{ element: row, index }">
      <TodoRow
        :key="row.id"
        :ref="el => (listRowComponents[index] = el as any)"
        :row="row"
        :prev-row="getSurroundingRow(index).value.prev"
        :next-row="getSurroundingRow(index).value.next"
        :placeholder="row.order === 1 ? 'Начните писать' : ''"
        @create="createRow"
        @update="updateRow"
        @delete="deleteRow"
        @update-and-create="updateAndCreateRows"
        @update-and-delete="updateAndDeleteRows"
        @focus="focusRow"
      >
        <template #drag-handler> <DragHandler handler-class="drag-handler" /></template>
      </TodoRow>
    </template>
  </Draggable>
  <div
    v-else-if="typeof selectedCardId === 'string' && rowsOfSelectedCardByOrder.length !== 0"
    v-bind="$attrs"
    class="flex flex-col gap-3"
  >
    <TodoRowSkeleton class="w-full" />
  </div>
</template>

<script setup lang="ts">
import TodoRowComponent from '~/components/TodoRow.vue'
import Draggable from 'vuedraggable'

import type { TodoRow, RowCreate, RowUpdate, DraggableChangeEvent } from '~/types'

import { useRowsStore } from '~/store/rows'
import { emitToastForError } from '~/helpers/emitToastForError'
const props = defineProps<{
  selectedCardId?: string
}>()

const store = useRowsStore()

onMounted(async () => {
  try {
    await store.getAll()
  } catch (e) {
    emitToastForError(e)
  }
})

const listRowComponents = ref<Array<InstanceType<typeof TodoRowComponent>>>([])

const changeRowOrder = async (event: DraggableChangeEvent<TodoRow>) => {
  const row = event.moved.element
  const newOrder = event.moved.newIndex + 1
  try {
    await store.updateOne(row.id, { order: newOrder })
  } catch (e) {
    emitToastForError(e)
  }
}

const getSurroundingRow = (index: number) =>
  computed(() => {
    const prev = (rowsOfSelectedCardByOrder.value[index - 1] || null) as TodoRow | null
    const next = (rowsOfSelectedCardByOrder.value[index + 1] || null) as TodoRow | null
    return { prev, next }
  })

const rowsOfSelectedCard = computed(() =>
  store.rows.filter(row => row.todoCardId === props.selectedCardId)
)

const rowsOfSelectedCardByOrder = computed(() =>
  rowsOfSelectedCard.value.sort((row1, row2) => row1.order - row2.order)
)

const createRow = async (
  data: RowCreate,
  needFocus = true,
  cursorPlace?: number
): Promise<TodoRow> => {
  try {
    const row = await store.createOne(data)
    if (needFocus) await focusRow(row.id, cursorPlace)

    return row
  } catch (e) {
    emitToastForError(e)
    throw e
  }
}

const updateRow = async (
  rowId: string,
  data: RowUpdate,
  needFocus = true,
  cursorPlace?: number
): Promise<TodoRow> => {
  try {
    const row = await store.updateOne(rowId, data)
    if (typeof data.order === 'number' && needFocus) await focusRow(row.id, cursorPlace)

    return row
  } catch (e) {
    emitToastForError(e)
    throw e
  }
}

const deleteRow = async (
  rowId: string,
  needFocus = true,
  cursorPlace?: number
): Promise<TodoRow> => {
  try {
    const row = await store.deleteOne(rowId)
    const prevRow = rowsOfSelectedCardByOrder.value[row.order - 1 - 1]
    if (needFocus) await focusRow(prevRow.id, cursorPlace)

    return row
  } catch (e) {
    emitToastForError(e)
    throw e
  }
}

const updateAndCreateRows = async (
  rowIdUpdate: string,
  dataUpdate: RowUpdate,
  dataCreate: RowCreate
) => {
  try {
    await updateRow(rowIdUpdate, dataUpdate, false)
    await createRow(dataCreate, true, 0)
  } catch (e) {
    emitToastForError(e)
  }
}

const updateAndDeleteRows = async (
  rowIdUpdate: string,
  dataUpdate: RowUpdate,
  rowIdDelete: string
) => {
  try {
    const rowBeforeUpdate = store.getOne(rowIdUpdate)
    await updateRow(rowIdUpdate, dataUpdate, false)
    await focusRow(rowBeforeUpdate.id, rowBeforeUpdate.text.length)
    await deleteRow(rowIdDelete, false)
  } catch (e) {
    emitToastForError(e)
  }
}

const focusRow = async (rowId: string, cursorPlace?: number) => {
  console.log('focus ' + rowId, cursorPlace)
  listRowComponents.value?.forEach(listRowComponent => {
    if (listRowComponent?.props?.row.id === rowId) {
      listRowComponent.focus(cursorPlace)
    }
  })
}
</script>
