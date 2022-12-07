<template>
  <SlickList
    v-model:list="rows"
    class="flex flex-col gap-5 p-5 bg-white rounded-xl"
    lockAxis="y"
  >
    <SlickItem
      v-for="(row, index) in rows"
      :key="row.id"
      :index="index"
      class=""
    >
      <Row :value="row.text" />
    </SlickItem>
  </SlickList>
</template>

<script setup lang="ts">
import { SlickList, SlickItem } from 'vue-slicksort'

interface Row {
  id: string
  text: string
}

const rows = ref<Row[]>([
  { id: 'erer', text: 'dfdf' },
  { id: 'hbdfg', text: 'hello' },
  { id: 'oefeo', text: 'qwqw' },
])
</script>
