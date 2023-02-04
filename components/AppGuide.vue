<template>
  <div
    v-if="isOpen"
    ref="guideRef"
    class="absolute top-20 left-1/2 z-50 mx-auto w-[700px] rounded-lg bg-white p-5 shadow-2xl [transform:translateX(-50%)] dark:bg-slate-800 sm:max-w-[calc(100%-4rem)] lg:w-[600px]"
  >
    <button
      title="close guide"
      type="button"
      class="absolute top-2 right-2 flex items-center justify-center rounded-full hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600"
      @click="close()"
    >
      <FontAwesomeIcon :icon="['fas', 'xmark']" class="aspect-square cursor-pointer p-2 text-xl" />
    </button>
    <ul class="flex flex-col gap-7">
      <span class="text-lg font-medium">Инструкция</span>
      <li class="flex flex-row flex-wrap gap-x-7 gap-y-3">
        <span class="whitespace-nowrap"
          ><AppGuideKey>Shift</AppGuideKey> + <AppGuideKey>Enter</AppGuideKey></span
        ><span>Переключить отметку о выполнении</span>
      </li>
      <li class="flex flex-row flex-wrap gap-x-7 gap-y-3">
        <span class="whitespace-nowrap"
          ><AppGuideKey>ArrowUp</AppGuideKey> / <AppGuideKey>ArrowDown</AppGuideKey></span
        ><span>Перемещение по строкам</span>
      </li>
      <li class="flex flex-row flex-wrap gap-x-7 gap-y-3">
        <span class="whitespace-nowrap"
          ><AppGuideKey>Alt</AppGuideKey> + <AppGuideKey>ArrowUp</AppGuideKey> /
          <AppGuideKey>ArrowDown</AppGuideKey></span
        ><span>Перемещение строки вверх / вниз</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const guideRef = ref<HTMLDivElement | null>(null)
const isOpen = ref(false)

onClickOutside(guideRef, () => close())

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

defineExpose({
  open,
  close,
})
</script>
