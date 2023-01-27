<template>
  <SlickList
    v-if="rowsOfSelectedCardByOrder.length"
    v-model:list="rowsOfSelectedCardByOrder"
    class="flex flex-col gap-3 p-5 bg-white rounded-xl"
    lockAxis="y"
  >
    <SlickItem
      v-for="(row, index) in rowsOfSelectedCardByOrder"
      :key="row.id"
      :index="index"
      class=""
    >
      <ListRow
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
      />
    </SlickItem>
  </SlickList>
</template>

<script setup lang="ts">
import type { RowCreate, RowUpdate } from '~/types'
import type { TodoRow } from '.prisma/client'
import ListRow from './ListRow.vue'

import { SlickList, SlickItem } from 'vue-slicksort'

import useRowsStore from '~/store/rows'

const store = useRowsStore()

const props = defineProps<{
  selectedCardId: string | null
}>()

onMounted(() => {
  store.getAll()
})

const listRowComponents = ref<Array<InstanceType<typeof ListRow>> | null>(null)

const getSurroundingRow = (index: number) =>
  computed(() => {
    const prev: TodoRow | null = rowsOfSelectedCardByOrder.value[index - 1] || null
    const next: TodoRow | null = rowsOfSelectedCardByOrder.value[index + 1] || null
    return { prev, next }
  })

const rowsOfSelectedCard = computed(() =>
  store.rows.filter(row => row.todoCardId === props.selectedCardId)
)

const rowsOfSelectedCardByOrder = computed(() =>
  rowsOfSelectedCard.value.sort((row1, row2) => row1.order - row2.order)
)

const createRow = async (data: RowCreate) => {
  const row = await store.createOne(data)
  focusRow(row.id)
  return row
}

const updateRow = async (rowId: string, data: RowUpdate) => {
  const row = await store.updateOne(rowId, data)
  focusRow(row.id)
  return row
}

const deleteRow = async (rowId: string) => {
  const row = await store.deleteOne(rowId)
  focusRow(rowsOfSelectedCardByOrder.value.find(r => r.order === row.order - 1)?.id as string)
}

const updateAndCreateRows = async (
  rowIdUpdate: string,
  dataUpdate: RowUpdate,
  dataCreate: RowCreate
) => {
  await updateRow(rowIdUpdate, dataUpdate)
  await createRow(dataCreate)
}

const updateAndDeleteRows = async (
  rowIdUpdate: string,
  dataUpdate: RowUpdate,
  rowIdDelete: string
) => {
  await updateRow(rowIdUpdate, dataUpdate)
  await deleteRow(rowIdDelete)
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
