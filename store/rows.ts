import type { Row, RowCreate, RowUpdate } from '~/types'
import { defineStore } from 'pinia'
export const useRowsStore = defineStore('rows', () => {
  const rows = ref<Row[]>([])

  async function getAll() {
    try {
      const data: Row[] = await $fetch('/api/rows')
      rows.value = data
      return data
    } catch (e) {
      throw e
    }
  }

  async function createOne(body: RowCreate) {
    try {
      const data = await $fetch('/api/rows', { method: 'POST', body })
      getAll()
      return data
    } catch (e) {
      throw e
    }
  }

  async function updateOne(id: string, body: RowUpdate) {
    try {
      const data = await $fetch(`/api/rows/${id}`, { method: 'PUT', body })
      getAll()
      return data
    } catch (e) {
      throw e
    }
  }

  async function deleteOne(id: string) {
    try {
      const data = await $fetch(`/api/rows/${id}`, { method: 'DELETE' })
      getAll()
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
