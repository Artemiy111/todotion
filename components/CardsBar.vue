<template>
  <div
    class="flex flex-col gap-6 w-80 bg-white rounded-xl p-5 min-h-fit max-h-screen overflow-auto"
  >
    <CardCreate placeholder="New card" @create="createCard($event)" />
    <template v-if="store.cards.length">
      <Draggable
        class="flex flex-col gap-3"
        :list="cardsSortedByOrder"
        tag="div"
        item-key="id"
        :animation="100"
        @change="changeCardOrder"
        handle=".drag-handler"
      >
        <template #item="{ element: card, index }">
          <Card
            :id="card.id"
            :key="card.id"
            :title="card.title"
            :is-selected="isSelected(card.id).value"
            @select="selectCard(card.id)"
            @update="updateCard(card.id, $event)"
            @delete="deleteCard(card.id)"
          >
            <template #drag-handler>
              <img
                src="~/assets/drag.png"
                alt=""
                class="drag-handler h-6 cursor-grab [user-select:none]"
              />
            </template>
          </Card>
        </template>
      </Draggable>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { CardUpdate } from '~/types'

import useCardsStore from '~/store/cards'

import Draggable from 'vuedraggable'
import { TodoCard } from '.prisma/client'

//? Слишком быстрый рендер

const store = useCardsStore()

const emit = defineEmits<{
  (e: 'select-card', cardId: string | null): void
}>()

onMounted(() => {
  store.getAll()
})

type DraggableChangeEvent<T> = {
  moved: { element: T; oldIndex: number; newIndex: number }
}

const changeCardOrder = async (event: DraggableChangeEvent<TodoCard>) => {
  const card = event.moved.element
  const newOrder = event.moved.newIndex + 1
  await store.updateOne(card.id, { order: newOrder })
}

const cardsSortedByOrder = computed(() =>
  store.cards.sort((card1, card2) => card1.order - card2.order)
)

const selectedCardId = ref<string | null>(null)

const isSelected = (cardId: string) => computed(() => cardId === selectedCardId.value)

const selectCard = (cardId: string) => {
  selectedCardId.value = cardId
  emit('select-card', cardId)
}

const createCard = (title: string, order?: number) => {
  if (order === undefined) order = store.cards.length + 1

  store.createOne({ title, order })
}

const updateCard = (cardId: string, data: CardUpdate) => {
  store.updateOne(cardId, data)
}

const deleteCard = (cardId: string) => {
  if (selectedCardId.value === cardId) {
    selectedCardId.value = null
    emit('select-card', null)
  }

  store.deleteOne(cardId)
}
</script>
