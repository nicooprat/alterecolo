<template>
  <input
    type="text"
    :value="search"
    class="py-2 px-4 rounded-md"
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
