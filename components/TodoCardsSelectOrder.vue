<template>
  <div class="mb-4 flex flex-wrap items-center gap-2">
    <span class="px-3">{{ props.title }}</span>

    <select
      v-model="orderBy"
      name="order by"
      class="w-full cursor-pointer appearance-none rounded-xl bg-slate-50 py-2 px-3 outline-none hover:bg-slate-200 focus:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-600 dark:focus:bg-slate-600 md:w-auto"
    >
      <option value="order">порядку</option>

      <option value="time create new">созданию | от новых</option>
      <option value="time create old">созданию | от старых</option>

      <option value="time update new">обновлению | от новых</option>
      <option value="time update old">обновлению | от старых</option>
    </select>
  </div>
</template>

<script setup lang="ts">
export type OrderBy =
  | 'order'
  | 'time create new'
  | 'time create old'
  | 'time update new'
  | 'time update old'

const props = defineProps<{
  modelValue: OrderBy
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: OrderBy): void
}>()

const orderBy = computed({
  get() {
    return props.modelValue
  },
  set(value: OrderBy) {
    emit('update:modelValue', value)
  },
})
</script>
