import type { TodoCard, CardCreate, CardUpdate } from '~/types'

export default class TodoCardsService {
  static async getAll(): Promise<TodoCard[]> {
    const data: TodoCard[] = await $fetch('/api/cards')
    return data
  }

  static async createOne(body: CardCreate): Promise<TodoCard> {
    const data: TodoCard = await $fetch('/api/cards', {
      method: 'POST',
      body,
    })
    return data
  }

  static async updateOne(id: string, body: CardUpdate): Promise<TodoCard> {
    const data: TodoCard = await $fetch(`/api/cards/${id}`, {
      method: 'PUT',
      body,
    })
    return data
  }

  static async deleteOne(id: string): Promise<TodoCard> {
    const data: TodoCard = await $fetch(`/api/cards/${id}`, {
      method: 'DELETE',
    })
    return data
  }
}
