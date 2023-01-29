<template>
  <div
    v-if="rowsOfSelectedCardByOrder.length"
    :list="rowsOfSelectedCardByOrder"
    class="flex flex-col gap-3 p-5 bg-white rounded-xl"
    item-key="id"
    tag="div"
  >
    <!-- <template #item="{ element: row, index }"> -->
    <ListRow
      v-for="(row, index) in rowsOfSelectedCardByOrder"
      ref="listRowComponents"
      :row="row"
      :prevRow="getSurroundingRow(index).value.prev"
      :nextRow="getSurroundingRow(index).value.next"
      @create="createRow"
      @update="updateRow"
      @delete="deleteRow"
      @update-and-create="updateAndCreateRows"
      @update-and-delete="updateAndDeleteRows"
      @focus="focusRow"
    >
      <template #drag-handler>
        <img src="~/assets/drag.png" alt="" class="h-6 cursor-grab [user-select:none]" />
      </template>
    </ListRow>
    <!-- </template> -->
  </div>
</template>

<script setup lang="ts">
import type { RowCreate, RowUpdate } from '~/types'
import type { TodoRow } from '.prisma/client'

import ListRow from '~/components/ListRow.vue'
// import Draggable from 'vuedraggable'

import useRowsStore from '~/store/rows'

const store = useRowsStore()

const props = defineProps<{
  selectedCardId: string | null
}>()

onMounted(() => {
  store.getAll()
})

// type DraggableChangeEvent<T> = {
//   moved: { element: T; oldIndex: number; newIndex: number }
// }

// const changeRowOrder = async (event: DraggableChangeEvent<TodoRow>) => {
//   const row = event.moved.element
//   const newOrder = event.moved.newIndex + 1
//   return await updateRow(row.id, { order: newOrder })
// }

const listRowComponents = ref<Array<InstanceType<typeof ListRow>> | null>(null)

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

const getRow = (rowId: string): TodoRow | undefined => store.getOne(rowId)

const createRow = async (data: RowCreate, needFocus: boolean = true, cursorPlace?: number) => {
  const row = await store.createOne(data)
  if (needFocus) await focusRow(row.id, cursorPlace)
  return row
}

const updateRow = async (
  rowId: string,
  data: RowUpdate,
  needFocus: boolean = true,
  cursorPlace?: number
) => {
  const row = await store.updateOne(rowId, data)
  if (data.order !== undefined && needFocus) await focusRow(row.id, cursorPlace)

  return row
}

const deleteRow = async (rowId: string, needFocus: boolean = true, cursorPlace?: number) => {
  const row = await store.deleteOne(rowId)
  const prevRow = rowsOfSelectedCardByOrder.value[row.order - 1 - 1]
  if (needFocus) await focusRow(prevRow.id, cursorPlace)
  return row
}

const updateAndCreateRows = async (
  rowIdUpdate: string,
  dataUpdate: RowUpdate,
  dataCreate: RowCreate
) => {
  await updateRow(rowIdUpdate, dataUpdate, false)
  await createRow(dataCreate, true, 0)
}

const updateAndDeleteRows = async (
  rowIdUpdate: string,
  dataUpdate: RowUpdate,
  rowIdDelete: string
) => {
  const rowBeforeUpdate = getRow(rowIdUpdate) as TodoRow
  await updateRow(rowIdUpdate, dataUpdate, false)
  await focusRow(rowBeforeUpdate.id, rowBeforeUpdate.text.length)
  await deleteRow(rowIdDelete, false)
}

const focusRow = async (rowId: string, cursorPlace?: number) => {
  console.log('focus ' + rowId, cursorPlace)
  listRowComponents.value?.forEach(listRowComponent => {
    if (listRowComponent.props.row.id === rowId) {
      listRowComponent.props.row.id
      listRowComponent.focus(cursorPlace)
    }
  })
}
</script>
