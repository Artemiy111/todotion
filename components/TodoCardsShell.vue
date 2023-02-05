<template>
  <div class="flex flex-col gap-6 rounded-xl">
    <Teleport to="body"
      ><AppPopup ref="popupColorPicker" v-slot="{ isOpen, popupKey }"
        ><AppPopupColorPicker
          :is-open="isOpen"
          :popup-key="popupKey"
          :default-color="defaultColor"
          :colors="colors"
          class="absolute"
          :style="{ top: pickerPosition.top + 'px', left: pickerPosition.left + 'px' }"
          @close="popupColorPicker?.close()"
          @pick-color="pickColor" /></AppPopup
    ></Teleport>

    <div class="mb-4 flex flex-wrap items-center gap-2">
      <span class="px-3">Сортировать по</span>
      <select
        v-model="orderBy"
        title="order by"
        class="w-full cursor-pointer appearance-none rounded-xl bg-slate-50 py-2 px-3 outline-none hover:bg-slate-100 focus:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700 md:w-auto"
      >
        <option value="order">порядку</option>

        <option value="time create new">созданию | от новых</option>
        <option value="time create old">созданию | от старых</option>

        <option value="time update new">обновлению | от новых</option>
        <option value="time update old">обновлению | от старых</option>
      </select>
    </div>

    <TodoCardCreate placeholder="Новая карточка" @create="createCard($event)" />

    <Draggable
      v-if="store.cards.length"
      class="flex flex-col gap-3"
      :list="sortedCards"
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
              width="24"
              height="24"
              src="~/assets/drag.png"
              alt=""
              class="h-6 cursor-grab [user-select:none] dark:invert"
              :class="orderBy === 'order' ? 'drag-handler' : 'hidden'"
            />
          </template>
        </TodoCard>
      </template>
    </Draggable>
  </div>
</template>

<script setup lang="ts">
// ? Слишком быстрый рендер draggable

import Draggable from 'vuedraggable'
import AppPopup from '~/components/AppPopup.vue'

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

type OrderBy =
  | 'order'
  | 'time create new'
  | 'time create old'
  | 'time update new'
  | 'time update old'

const orderBy = ref<OrderBy>('order')

const sortedCards = computed(() => {
  switch (orderBy.value) {
    case 'order':
      return store.cards.sort((c1, c2) => c1.order - c2.order)
    case 'time create new':
      return store.cards.sort(
        (c1, c2) => new Date(c2.createdAt).getTime() - new Date(c1.createdAt).getTime()
      )
    case 'time create old':
      return store.cards.sort(
        (c1, c2) => new Date(c1.createdAt).getTime() - new Date(c2.createdAt).getTime()
      )
    case 'time update new':
      return store.cards.sort(
        (c1, c2) => new Date(c2.updatedAt).getTime() - new Date(c1.updatedAt).getTime()
      )
    case 'time update old':
      return store.cards.sort(
        (c1, c2) => new Date(c1.updatedAt).getTime() - new Date(c2.updatedAt).getTime()
      )
  }
})

//

const popupColorPicker = ref<InstanceType<typeof AppPopup> | null>(null)

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
  popupColorPicker.value?.open(key)
}

const pickColor = async (color: string, cardId?: string) => {
  if (cardId === undefined) return
  await store.updateOne(cardId, { color })
}

//

type DraggableChangeEvent<T> = {
  moved: { element: T; oldIndex: number; newIndex: number }
}
const changeCardOrder = async (event: DraggableChangeEvent<TodoCard>) => {
  const card = event.moved.element
  const newOrder = event.moved.newIndex + 1
  await store.updateOne(card.id, { order: newOrder })
}

//

const selectedCardId = ref<string>()

const isSelected = (cardId: string) => computed(() => cardId === selectedCardId.value)

const selectCard = (cardId: string) => {
  selectedCardId.value = cardId
  emit('select-card', cardId)
}

//

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
