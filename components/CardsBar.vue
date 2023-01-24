<template>
  <div
    class="flex flex-col gap-3 w-[350px] bg-white rounded-xl p-5 min-h-fit max-h-screen overflow-auto"
  >
    <CardCreate placeholder="New card" />
    <SlickList v-model:list="cards" class="flex flex-col gap-3">
      <SlickItem
        v-for="(card, index) in cards"
        :key="card.id"
        :index="index"
        tag="no"
      >
        <Card>
          <img src="~/assets/drag.png" alt="" class="h-6 cursor-grab" />
        </Card>
      </SlickItem>
    </SlickList>
  </div>
</template>

<script setup>
import { SlickList, SlickItem } from 'vue-slicksort'
const cards = ref([{ id: 1 }, { id: 2 }, { id: 3 }])
</script>
