<template>
  <div class="flex justify-between h-12 items-center bg-slate-50 rounded-xl">
    <div
      class="px-3 flex gap-2 items-center w-full h-full focus-within:bg-blue-100 rounded-l-xl"
    >
      <input
        type="text"
        class="w-full h-full bg-transparent focus:outline-none"
        :placeholder="props.placeholder"
        v-model="title"
      />
    </div>
    <button
      @click="createCard"
      class="rounded-r-xl aspect-square flex items-center justify-center h-full outline-none focus:bg-blue-100 active:bg-blue-200"
    >
      <FontAwesomeIcon
        icon="fa-solid fa-plus"
        class="text-xl [user-event:none]"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CardCreate } from '~/types'

const props = defineProps<{
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'create', title: string): void
}>()

const title = ref('')

const createCard = () => {
  emit('create', title.value)
  title.value = ''
}
</script>
