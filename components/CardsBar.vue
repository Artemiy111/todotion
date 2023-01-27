<template>
  <div
    class="flex flex-col gap-6 w-80 bg-white rounded-xl p-5 min-h-fit max-h-screen overflow-auto"
  >
    <CardCreate placeholder="New card" @create="createCard($event)" />
    <SlickList
      v-if="cardsSortedByOrder.length"
      v-model:list="cardsSortedByOrder"
      class="flex flex-col gap-3"
    >
      <SlickItem v-for="(card, index) in cardsSortedByOrder" :key="card.id" :index="index">
        <Card
          :title="card.title"
          :is-selected="isSelected(card.id).value"
          @select="selectCard(card.id)"
          @update="updateCard(card.id, $event)"
          @delete="deleteCard(card.id)"
        />
      </SlickItem>
    </SlickList>
  </div>
</template>

<script setup lang="ts">
import type { CardUpdate } from '~/types'

import { SlickList, SlickItem } from 'vue-slicksort'
import useCardsStore from '~/store/cards'

const store = useCardsStore()

const emit = defineEmits<{
  (e: 'select-card', cardId: string | null): void
}>()

onMounted(() => {
  store.getAll()
})

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
