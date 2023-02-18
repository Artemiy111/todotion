import type { TodoCard, CardCreate, CardUpdate } from '~/types'

import { defineStore } from 'pinia'
import { useRowsStore } from '~/store/rows'

import TodoCardsService from '~~/api/TodoCardsService'

export const useCardsStore = defineStore('cards', () => {
  const rowsStore = useRowsStore()

  const cards = ref<TodoCard[]>([])

  async function getAll(): Promise<TodoCard[]> {
    const allCards: TodoCard[] = await TodoCardsService.getAll()
    cards.value = allCards

    return allCards
  }

  function getOne(id: string): TodoCard {
    const card = cards.value.find(card => card.id === id)
    if (typeof card === 'undefined')
      throw createError({ message: `No card with id ${id}`, statusCode: 400 })
    return card
  }

  async function createOne(body: CardCreate): Promise<TodoCard> {
    const createdCard: TodoCard = await TodoCardsService.createOne(body)

    Promise.all([getAll(), rowsStore.getAll()])
    return createdCard
  }

  async function updateOne(id: string, body: CardUpdate): Promise<TodoCard> {
    const cardsSnapshot = [...cards.value]

    const tryOptimisticUpdate = () => {
      const card = getOne(id)

      if (typeof body.order === 'number') {
        if (body.order > card.order) {
          cards.value = cards.value.map(c => {
            return c.order > card.order && c.order <= (body.order as number)
              ? { ...c, order: c.order - 1 }
              : c
          })
        } else if (body.order < card.order) {
          cards.value = cards.value.map(c => {
            return c.order >= (body.order as number) && c.order < card.order
              ? { ...c, order: c.order + 1 }
              : c
          })
        }
      }

      cards.value = cards.value.map(card => {
        if (card.id === id) return { ...card, ...body }
        return card
      })
    }
    tryOptimisticUpdate()

    try {
      const updatedCard: TodoCard = await TodoCardsService.updateOne(id, body)
      return updatedCard
    } catch (e) {
      cards.value = cardsSnapshot
      throw e
    }
  }

  async function deleteOne(id: string): Promise<TodoCard> {
    const cardsSnapshot = [...cards.value]

    const tryOptimisticDelete = () => {
      const card = getOne(id)
      cards.value = cards.value.map(c => (c.order > card.order ? { ...c, order: c.order - 1 } : c))
      cards.value = cards.value.filter(c => c.id !== id)
    }
    tryOptimisticDelete()

    try {
      const deletedCard: TodoCard = await TodoCardsService.deleteOne(id)
      return deletedCard
    } catch (e) {
      cards.value = cardsSnapshot
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
