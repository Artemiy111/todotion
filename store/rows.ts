import type { TodoRow, RowCreate, RowUpdate } from '~/types'

import { defineStore } from 'pinia'

import TodoRowsService from '~/services/TodoRowsService'

export const useRowsStore = defineStore('rows', () => {
  const rows = ref<TodoRow[]>([])

  async function getAll(): Promise<TodoRow[]> {
    const allRows: TodoRow[] = await TodoRowsService.getAll()
    rows.value = allRows

    return allRows
  }

  function getOne(rowId: string): TodoRow {
    const row = rows.value.find(row => row.id === rowId)
    if (row === undefined)
      throw createError({ message: `No row with id: ${rowId}`, statusCode: 400 })

    return row
  }

  async function createOne(body: RowCreate): Promise<TodoRow> {
    const createdRow: TodoRow = await TodoRowsService.createOne(body)
    await getAll()

    return createdRow
  }

  async function updateOne(id: string, body: RowUpdate): Promise<TodoRow> {
    const rowsSnapshot = [...rows.value]

    const tryOptimisticUpdate = () => {
      const row = getOne(id)

      if (typeof body.order === 'number') {
        if (body.order > row.order) {
          rows.value = rows.value.map(c => {
            if (c.order > row.order && c.order <= (body.order as number))
              return {
                ...c,
                order: c.order - 1,
                updatedAt: new Date().toISOString() as unknown as Date,
              }
            return c
          })
        } else if (body.order < row.order) {
          rows.value = rows.value.map(c => {
            if (c.order >= (body.order as number) && c.order < row.order)
              return {
                ...c,
                order: c.order + 1,
                updatedAt: new Date().toISOString() as unknown as Date,
              }
            return c
          })
        }
      }

      rows.value = rows.value.map(card => {
        if (card.id === id)
          return { ...card, ...body, updatedAt: new Date().toISOString() as unknown as Date }
        return card
      })
    }
    tryOptimisticUpdate()

    try {
      const updatedRow = await TodoRowsService.updateOne(id, body)
      return updatedRow
    } catch (e) {
      rows.value = rowsSnapshot
      throw e
    }
  }

  async function deleteOne(id: string): Promise<TodoRow> {
    const rowsSnapshot = [...rows.value]

    const tryOptimisticDelete = () => {
      const row = getOne(id)
      rows.value = rows.value.map(r =>
        r.order > row.order
          ? { ...r, order: r.order - 1, updatedAt: new Date().toISOString() as unknown as Date }
          : r
      )
      rows.value = rows.value.filter(c => c.id !== id)
    }
    tryOptimisticDelete()

    try {
      const deletedRow = await TodoRowsService.deleteOne(id)
      return deletedRow
    } catch (e) {
      rows.value = rowsSnapshot
      throw e
    }
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
