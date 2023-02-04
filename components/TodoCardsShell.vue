<template>
  <div class="flex flex-col gap-6 rounded-xl">
    <Teleport to="body"
      ><ColorPicker
        ref="colorPickerComponent"
        :default-color="defaultColor"
        :colors="colors"
        class="absolute"
        :style="{ top: pickerPosition.top + 'px', left: pickerPosition.left + 'px' }"
        @pick-color="pickColor"
    /></Teleport>

    <TodoCardCreate placeholder="Новая карточка" @create="createCard($event)" />
    <template v-if="store.cards.length">
      <Draggable
        class="flex flex-col gap-3"
        :list="cardsSortedByOrder"
        tag="div"
        item-key="id"
        :animation="100"
        handle=".drag-handler"
        @change="changeCardOrder"
      >
        <template #item="{ element: card }">
          <TodoCard
            :id="card.id"
            :key="card.id"
            :title="card.title"
            :color="card.color"
            :is-selected="isSelected(card.id).value"
            @select="selectCard(card.id)"
            @update="updateCard(card.id, $event)"
            @delete="deleteCard(card.id)"
            @open-color-picker="openColorPicker"
          >
            <template #drag-handler>
              <img
                src="~/assets/drag.png"
                alt=""
                class="drag-handler h-6 cursor-grab [user-select:none] dark:invert"
              />
            </template>
          </TodoCard>
        </template>
      </Draggable>
    </template>
  </div>
</template>

<script setup lang="ts">
// ? Слишком быстрый рендер draggable

import Draggable from 'vuedraggable'
import ColorPicker from '~/components/ColorPicker.vue'

import type { TodoCard, CardUpdate } from '~/types'
import { FetchError } from 'ofetch'

import useCardsStore from '~/store/cards'
import { useToast } from 'vue-toastification'

const toast = useToast()
const store = useCardsStore()

const emit = defineEmits<{
  (e: 'select-card', cardId?: string): void
}>()

onMounted(() => {
  store.getAll()
})

const colorPickerComponent = ref<InstanceType<typeof ColorPicker> | null>(null)

const defaultColor = ref('slate')

const colors = [
  'slate',
  'neutral',
  'rose',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'pink',
]

const pickerPosition = ref({ top: 0, left: 0 })

const openColorPicker = (
  prevColor: string,
  key: string,
  position: { top: number; left: number }
) => {
  defaultColor.value = prevColor
  pickerPosition.value = position
  colorPickerComponent.value?.open(key)
}

const pickColor = async (color: string, cardId?: string) => {
  if (cardId === undefined) return
  await store.updateOne(cardId, { color })
}

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

const selectedCardId = ref<string>()

const isSelected = (cardId: string) => computed(() => cardId === selectedCardId.value)

const selectCard = (cardId: string) => {
  selectedCardId.value = cardId
  emit('select-card', cardId)
}

const createCard = async (title: string, order?: number) => {
  if (title.trim() === '') return
  if (order === undefined) order = store.cards.length + 1

  try {
    await store.createOne({ title, order })
  } catch (e) {
    if (e instanceof FetchError) toast.error(e.data.message)
  }
}

const updateCard = async (cardId: string, data: CardUpdate) => {
  try {
    await store.updateOne(cardId, data)
  } catch (e) {
    if (e instanceof FetchError) toast.error(e.data.message)
  }
}

const deleteCard = async (cardId: string) => {
  if (selectedCardId.value === cardId) {
    selectedCardId.value = undefined
    emit('select-card', undefined)
  }

  try {
    await store.deleteOne(cardId)
  } catch (e) {
    if (e instanceof FetchError) toast.error(e.data.message)
  }
}
</script>
