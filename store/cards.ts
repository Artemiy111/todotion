import type { Card } from '~/types'
import { defineStore } from 'pinia'
export const useCardsStore = defineStore('cards', () => {
  const cards = ref<Card[]>([])

  async function getAll() {
    try {
      const data: Card[] = await $fetch('/api/cards')
      cards.value = data
    } catch (e) {
      throw e
    }
  }

  async function create() {}
})
