<template>
  <input
    type="text"
    :value="search"
    class="min-w-[16ch] w-[30ch] py-2 px-4 bg-white dark:bg-neutral-700 rounded-md ring-primary-400 placeholder-neutral-400 focus-visible:ring focus-visible:outline-none"
    placeholder="Rechercher..."
    @focus="$event.target.select()"
    @keydown.esc="$emit('update:search', '')"
    @input="$emit('update:search', $event.target.value.trim())"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    search: {
      type: String,
      default: '',
    },
  },
  emits: ['update:search'],
})
</script>
