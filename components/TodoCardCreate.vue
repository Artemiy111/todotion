<template>
  <div class="flex h-12 items-center justify-between rounded-xl bg-slate-50">
    <div class="flex h-full w-full items-center gap-2 rounded-l-xl px-3 focus-within:bg-blue-100">
      <input
        v-model="title"
        type="text"
        class="h-full w-full bg-transparent focus:outline-none"
        :placeholder="props.placeholder"
      />
    </div>
    <button
      class="flex aspect-square h-full items-center justify-center rounded-r-xl outline-none focus:bg-blue-100 active:bg-blue-200"
      @click="createCard"
    >
      <FontAwesomeIcon icon="fa-solid fa-plus" class="text-xl [user-select:none]" />
    </button>
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
