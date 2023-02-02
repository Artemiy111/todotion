<script setup lang="ts">
const selectCardId = ref<string>()

const selectCard = (newSelectedCardId?: string) => {
  selectCardId.value = newSelectedCardId
}
</script>

<template>
  <div class="flex gap-5 md:flex-col">
    <TodoCardsShell
      class="h-fit min-w-[280px] max-w-[280px] md:max-w-full"
      @select-card="selectCard"
    />
    <div class="h-auto w-[2px] bg-slate-100 dark:bg-slate-800 md:h-[2px] md:w-full"></div>
    <TodoRowsShell class="h-fit w-full" :selected-card-id="selectCardId" />
  </div>
</template>
