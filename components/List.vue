<template>
  <SlickList
    v-model:list="rowsOfSelectedCard"
    class="flex flex-col gap-3 p-5 bg-white rounded-xl"
    lockAxis="y"
  >
    <SlickItem
      v-for="(row, index) in rowsOfSelectedCard"
      :key="row.id"
      :index="index"
      class=""
    >
      <ListRow :value="row.text" />
    </SlickItem>
  </SlickList>
</template>

<script setup lang="ts">
import { SlickList, SlickItem } from 'vue-slicksort'

import useRowsStore from '~/store/rows'

const props = defineProps<{
  selectedCardId: string | null
}>()

const store = useRowsStore()

onMounted(() => {
  store.getAll()
})

const rowsOfSelectedCard = computed(() =>
  store.rows.filter(row => row.todoCardId === props.selectedCardId)
)
</script>
