<template>
  <header>
    <div class="mb-5 flex items-center justify-between rounded-b-xl">
      <span class="text-xl font-bold">Todotion</span>
      <div class="flex items-center gap-6">
        <button role="button" class="flex items-center" aria-label="guide" @click="openGuide">
          <FontAwesomeIcon
            :icon="['far', 'circle-question']"
            class="aspect-square cursor-pointer text-2xl hover:opacity-70 active:opacity-50"
          />
        </button>
        <button
          role="button"
          class="flex items-center"
          aria-label="color mode"
          @click="emit('toggle-dark')"
        >
          <FontAwesomeIcon
            :icon="['far', 'moon']"
            class="aspect-square cursor-pointer text-2xl hover:opacity-70 active:opacity-50"
          />
        </button>
        <a
          aria-label="github"
          href="https://github.com/Artemiy111/todotion"
          class="flex items-center"
        >
          <FontAwesomeIcon
            :icon="['fab', 'github']"
            class="cursor-pointer text-2xl outline-none hover:opacity-70 active:opacity-50"
        /></a>
      </div>
    </div>
    <div class="h-[2px] w-full bg-slate-100 dark:bg-slate-800"></div>
  </header>

  <Teleport to="body">
    <AppPopup ref="popup" v-slot="{ isOpen }"
      ><AppPopupGuide :is-open="isOpen" @close="closeGuide" />
    </AppPopup>
  </Teleport>
</template>

<script setup lang="ts">
import AppPopup from '~/components/AppPopup.vue'

const emit = defineEmits<{
  (e: 'toggle-dark'): void
}>()

const popup = ref<InstanceType<typeof AppPopup> | null>(null)

const openGuide = () => {
  popup.value?.open()
}

const closeGuide = () => {
  popup.value?.close()
}
</script>
