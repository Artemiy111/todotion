<script setup lang="ts">
const selectCardId = ref<string | null>(null)

const selectCard = (newSelectedCardId: string | null) => {
  selectCardId.value = newSelectedCardId
}
</script>

<template>
  <div class="container m-auto flex gap-10">
    <CardsBar class="h-fit" @select-card="selectCard" />
    <List class="h-fit min-w-[300px]" :selectedCardId="selectCardId" />
  </div>
</template>
