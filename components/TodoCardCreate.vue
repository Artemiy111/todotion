<template>
  <div class="flex h-12 items-center justify-between rounded-xl bg-slate-50">
    <div class="flex h-full w-full items-center gap-2 rounded-l-xl px-3 focus-within:bg-slate-200">
      <input
        v-model="title"
        type="text"
        class="h-full w-full bg-transparent focus:outline-none"
        :placeholder="props.placeholder"
      />
    </div>
    <TodoCardButton class="rounded-r-xl" @click="createCard"
      ><FontAwesomeIcon :icon="['fas', 'plus']" class="text-xl [user-select:none]"
    /></TodoCardButton>
  </div>
</template>

<script setup lang="ts">
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
