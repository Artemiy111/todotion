import type { TodoRow, RowCreate, RowUpdate } from '~/types'

import { defineStore } from 'pinia'

export default defineStore('rows', () => {
  const rows = ref<TodoRow[]>([])

  async function getAll(): Promise<TodoRow[]> {
    const data: TodoRow[] = await $fetch('/api/rows')
    rows.value = data

    return data
  }

  function getOne(rowId: string): TodoRow {
    const row = rows.value.find(row => row.id === rowId)
    if (row === undefined)
      throw createError({ message: `No row with id: ${rowId}`, statusCode: 400 })

    return row
  }

  async function createOne(body: RowCreate): Promise<TodoRow> {
    const data: TodoRow = await $fetch('/api/rows', {
      method: 'POST',
      body,
    })
    await getAll()

    return data
  }

  async function updateOne(id: string, body: RowUpdate): Promise<TodoRow> {
    const data: TodoRow = await $fetch(`/api/rows/${id}`, {
      method: 'PUT',
      body,
    })
    await getAll()

    return data
  }

  async function deleteOne(id: string): Promise<TodoRow> {
    const data: TodoRow = await $fetch(`/api/rows/${id}`, {
      method: 'DELETE',
    })
    await getAll()

    return data
  }

  return {
    rows,

    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
  }
})
