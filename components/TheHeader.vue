<template>
  <header>
    <div class="flex items-center justify-between rounded-b-xl p-5">
      <span class="text-xl font-bold">Todotion</span>
      <div class="flex items-center gap-6">
        <FontAwesomeIcon
          :icon="['far', 'circle-question']"
          class="cursor-pointer text-2xl hover:opacity-70 active:opacity-50"
          @click="openGuide"
        />
        <FontAwesomeIcon
          :icon="['far', 'moon']"
          class="cursor-pointer text-2xl hover:opacity-70 active:opacity-50"
          @click="emit('toggle-dark')"
        />
        <a href="https://github.com/Artemiy111/todotion" class="flex items-center">
          <FontAwesomeIcon
            :icon="['fab', 'github']"
            class="cursor-pointer text-2xl hover:opacity-70 active:opacity-50"
        /></a>
      </div>
    </div>
    <div class="h-[2px] w-full bg-slate-100 dark:bg-slate-800"></div>
  </header>
  <Teleport to="body">
    <AppGuide ref="guideComponent" />
  </Teleport>
</template>

<script setup lang="ts">
import AppGuide from '~/components/AppGuide.vue'

const emit = defineEmits<{
  (e: 'toggle-dark'): void
}>()

const guideComponent = ref<InstanceType<typeof AppGuide> | null>(null)

const openGuide = () => {
  guideComponent.value?.open()
}
</script>
