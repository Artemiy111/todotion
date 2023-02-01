import type { CardCreate, CardUpdate } from '~/types'
import type { TodoCard } from '@prisma/client'

import { defineStore } from 'pinia'
import useRowsStore from '~/store/rows'

export default defineStore('cards', () => {
  const cards = ref([] as TodoCard[])
  const rowsStore = useRowsStore()

  async function getAll(): Promise<TodoCard[]> {
    const data: TodoCard[] = await $fetch('/api/cards')
    cards.value = data
    return cards.value
  }

  async function createOne(body: CardCreate): Promise<TodoCard> {
    const data: TodoCard = await $fetch('/api/cards', {
      method: 'POST',
      body,
    })

    await rowsStore.createOne({ order: 1, todoCardId: data.id })

    await getAll()

    return data
  }

  async function updateOne(id: string, body: CardUpdate): Promise<TodoCard> {
    const data: TodoCard = await $fetch(`/api/cards/${id}`, {
      method: 'PUT',
      body,
    })
    await getAll()
    return data
  }

  async function deleteOne(id: string): Promise<TodoCard> {
    const data: TodoCard = await $fetch(`/api/cards/${id}`, {
      method: 'DELETE',
    })
    await getAll()
    return data
  }

  return {
    cards,
    getAll,
    createOne,
    updateOne,
    deleteOne,
  }
})
