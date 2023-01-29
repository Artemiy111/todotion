import type { TodoRow } from '@prisma/client'

import { defineStore } from 'pinia'
import type { RowCreate, RowUpdate } from '~/types'

export default defineStore('rows', () => {
  const rows = ref([] as TodoRow[])

  async function getAll() {
    const data: TodoRow[] = await $fetch('/api/rows')
    rows.value = data
    return rows.value
  }

  function getOne(rowId: string) {
    const row: TodoRow | undefined = rows.value.find(row => row.id === rowId)
    return row
  }

  async function createOne(body: RowCreate) {
    const data: TodoRow = await $fetch('/api/rows', {
      method: 'POST',
      body,
    })
    await getAll()
    return data
  }

  async function updateOne(id: string, body: RowUpdate) {
    const data: TodoRow = await $fetch(`/api/rows/${id}`, {
      method: 'PUT',
      body,
    })
    await getAll()
    return data
  }

  async function deleteOne(id: string) {
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
