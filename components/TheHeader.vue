import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

<template>
  <header>
    <div class="container mx-auto flex items-center justify-between rounded-b-xl bg-white p-5">
      <span class="text-xl font-bold">Todotion</span>
      <a href="https://github.com/Artemiy111/todotion" class="flex items-center">
        <FontAwesomeIcon :icon="['fab', 'github']" class="cursor-pointer text-2xl hover:opacity-50"
      /></a>
    </div>
  </header>
</template>
