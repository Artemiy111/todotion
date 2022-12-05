import type { Row, RowCreate, RowUpdate } from '~/types'
import { defineStore } from 'pinia'
export const useRowsStore = defineStore('rows', () => {
  const rows = ref<Row[]>([])

  async function getAll() {
    try {
      const data: Row[] = await $fetch('/api/rows')
      rows.value = data
    } catch (e) {
      throw e
    }
  }

  async function createOne(body: RowCreate) {
    try {
      await $fetch('/api/rows', { method: 'POST', body })
    } catch (e) {
      throw e
    }
    getAll()
  }

  async function updateOne(id: string, body: RowUpdate) {
    try {
      await $fetch(`/api/rows/${id}`, { method: 'PUT', body })
    } catch (e) {
      throw e
    }
    getAll()
  }

  async function deleteOne(id: string) {
    try {
      await $fetch(`/api/rows/${id}`, { method: 'DELETE' })
    } catch (e) {
      throw e
    }
    getAll()
  }

  return {
    rows,
    getAll,
    createOne,
    updateOne,
    deleteOne,
  }
})
