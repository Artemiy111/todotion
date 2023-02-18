import type { TodoRow, RowCreate, RowUpdate } from '~/types'

export default class TodoRowsService {
  static async getAll(): Promise<TodoRow[]> {
    const data: TodoRow[] = await $fetch('/api/rows')
    return data
  }

  static async createOne(body: RowCreate): Promise<TodoRow> {
    const data: TodoRow = await $fetch('/api/rows', {
      method: 'POST',
      body,
    })
    return data
  }

  static async updateOne(id: string, body: RowUpdate): Promise<TodoRow> {
    const data: TodoRow = await $fetch(`/api/rows/${id}`, {
      method: 'PUT',
      body,
    })
    return data
  }

  static async deleteOne(id: string): Promise<TodoRow> {
    const data: TodoRow = await $fetch(`/api/rows/${id}`, {
      method: 'DELETE',
    })
    return data
  }
}
