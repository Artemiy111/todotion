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
      return await $fetch('/api/cards', { method: 'POST', body })
    } catch (e) {
      throw e
    }
    getAll()
  }

  async function updateOne(id: string, body: CardUpdate) {
    try {
      return await $fetch(`/api/cards/${id}`, { method: 'PUT', body })
    } catch (e) {
      throw e
    }
    getAll()
  }

  async function deleteOne(id: string) {
    try {
      return await $fetch(`/api/cards/${id}`, { method: 'DELETE' })
    } catch (e) {
      throw e
    }
    getAll()
  }

  return {
    cards,
    getAll,
    createOne,
    updateOne,
    deleteOne,
  }
})
