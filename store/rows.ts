import type { RowCreate, RowUpdate } from '~/types'
import type { TodoRow } from '@prisma/client'

import { defineStore } from 'pinia'

export default defineStore('rows', () => {
  const rows = ref([] as TodoRow[])

  async function getAll() {
    try {
      const data: TodoRow[] = await $fetch('/api/rows')
      rows.value = data
      return rows.value
    } catch (e) {
      throw e
    }
  }

  async function createOne(body: RowCreate) {
    try {
      const data: TodoRow = await $fetch('/api/rows', {
        method: 'POST',
        body,
      })
      await getAll()
      return data
    } catch (e) {
      throw e
    }
  }

  async function updateOne(id: string, body: RowUpdate) {
    try {
      const data: TodoRow = await $fetch(`/api/rows/${id}`, {
        method: 'PUT',
        body,
      })
      await getAll()
      return data
    } catch (e) {
      throw e
    }
  }

  async function deleteOne(id: string) {
    try {
      const data: TodoRow = await $fetch(`/api/rows/${id}`, {
        method: 'DELETE',
      })
      await getAll()
      return data
    } catch (e) {
      throw e
    }
  }

  return {
    rows,
    getAll,
    createOne,
    updateOne,
    deleteOne,
  }
})
