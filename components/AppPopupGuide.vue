<template>
  <div
    v-if="props.isOpen"
    ref="guideRef"
    class="absolute top-20 left-1/2 mx-auto w-[700px] rounded-lg bg-white p-5 shadow-2xl [transform:translateX(-50%)] dark:bg-slate-800 sm:max-w-[calc(100%-4rem)] lg:w-[600px]"
  >
    <button
      tabindex="1"
      title="close guide"
      type="button"
      class="absolute top-2 right-2 flex items-center justify-center rounded-full hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600"
      @click="emit('close')"
    >
      <FontAwesomeIcon :icon="['fas', 'xmark']" class="aspect-square cursor-pointer p-2 text-xl" />
    </button>
    <ul class="flex flex-col gap-7">
      <span class="text-lg font-medium">Инструкция</span>
      <li class="flex flex-row flex-wrap gap-x-7 gap-y-3">
        <span class="whitespace-nowrap"
          ><AppPopupGuideKey text="Ctrl" /> + <AppPopupGuideKey text="Enter" /></span
        ><span>Переключить отметку о выполнении</span>
      </li>
      <li class="flex flex-row flex-wrap gap-x-7 gap-y-3">
        <span class="whitespace-nowrap"
          ><AppPopupGuideKey text="ArrowUp" /> / <AppPopupGuideKey text="ArrowDown" /></span
        ><span>Перемещение по строкам</span>
      </li>
      <li class="flex flex-row flex-wrap gap-x-7 gap-y-3">
        <span class="whitespace-nowrap"
          ><AppPopupGuideKey text="Alt" /> + <AppPopupGuideKey text="ArrowUp" /> /
          <AppPopupGuideKey text="ArrowDown" /></span
        ><span>Перемещение строки вверх / вниз</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
