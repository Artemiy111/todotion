import type { CardCreate, CardUpdate } from '~/types'
import type { TodoCard } from '@prisma/client'

import { defineStore } from 'pinia'
import useRowsStore from '~/store/rows'

export default defineStore('cards', () => {
  const cards = ref([] as TodoCard[])
  const rowsStore = useRowsStore()

  async function getAll() {
    try {
      const data: TodoCard[] = await $fetch('/api/cards')
      cards.value = data
      return cards.value
    } catch (e) {
      throw e
    }
  }

  async function createOne(body: CardCreate) {
    try {
      const data: TodoCard = await $fetch('/api/cards', {
        method: 'POST',
        body,
      })
      getAll()

      await rowsStore.createOne({ order: 1, todoCardId: data.id })

      return data
    } catch (e) {
      throw e
    }
  }

  async function updateOne(id: string, body: CardUpdate) {
    try {
      const data: TodoCard = await $fetch(`/api/cards/${id}`, {
        method: 'PUT',
        body,
      })
      getAll()
      return data
    } catch (e) {
      throw e
    }
  }

  async function deleteOne(id: string) {
    try {
      const data: TodoCard = await $fetch(`/api/cards/${id}`, {
        method: 'DELETE',
      })
      getAll()
      return data
    } catch (e) {
      throw e
    }
  }

  return {
    cards,
    getAll,
    createOne,
    updateOne,
    deleteOne,
  }
})
