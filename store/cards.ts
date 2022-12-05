import type { Card, CardCreate, CardUpdate } from '~/types'
import { defineStore } from 'pinia'
export const useCardsStore = defineStore('cards', () => {
  const cards = ref<Card[]>([])

  async function getAll() {
    try {
      const data: Card[] = await $fetch('/api/cards')
      cards.value = data
      return data
    } catch (e) {
      throw e
    }
  }

  async function createOne(body: CardCreate) {
    try {
      const data = await $fetch('/api/cards', { method: 'POST', body })
      getAll()
      return data
    } catch (e) {
      throw e
    }
  }

  async function updateOne(id: string, body: CardUpdate) {
    try {
      const data = await $fetch(`/api/cards/${id}`, { method: 'PUT', body })
      getAll()
      return data
    } catch (e) {
      throw e
    }
  }

  async function deleteOne(id: string) {
    try {
      const data = await $fetch(`/api/cards/${id}`, { method: 'DELETE' })
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
