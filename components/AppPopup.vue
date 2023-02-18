<template v-if="isOpen">
  <div ref="popup" class="relative z-50">
    <slot :is-open="isOpen" :popup-key="popupKey"></slot>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, useEventListener } from '@vueuse/core'

const popup = ref<HTMLElement | null>(null)

const isOpen = ref(false)

const popupKey = ref<string>()

onClickOutside(popup, () => close())

useEventListener('keydown', event => {
  if (event.code === 'Escape' && isOpen.value) close()
})

const open = (newPopupKey?: string) => {
  isOpen.value = true
  popupKey.value = newPopupKey
}

const close = () => {
  isOpen.value = false
  popupKey.value = undefined
}

defineExpose({
  open,
  close,
})
</script>
