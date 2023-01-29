import type { CardCreate, CardUpdate } from '~/types'
import type { TodoCard } from '@prisma/client'

import { defineStore } from 'pinia'
import useRowsStore from '~/store/rows'

export default defineStore('cards', () => {
  const cards = ref([] as TodoCard[])
  const rowsStore = useRowsStore()

  async function getAll() {
    const data: TodoCard[] = await $fetch('/api/cards')
    cards.value = data
    return cards.value
  }

  async function createOne(body: CardCreate) {
    const data: TodoCard = await $fetch('/api/cards', {
      method: 'POST',
      body,
    })
    getAll()

    await rowsStore.createOne({ order: 1, todoCardId: data.id })

    return data
  }

  async function updateOne(id: string, body: CardUpdate) {
    const data: TodoCard = await $fetch(`/api/cards/${id}`, {
      method: 'PUT',
      body,
    })
    getAll()
    return data
  }

  async function deleteOne(id: string) {
    const data: TodoCard = await $fetch(`/api/cards/${id}`, {
      method: 'DELETE',
    })
    getAll()
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
