<template>
  <router-view :categories="getCategories" :items="getItems" />
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import { fetch, getCategories, getItems } from '@/composables/data'

export default defineComponent({
  setup() {
    onMounted(fetch)

    return {
      getCategories,
      getItems,
    }
  },
})
</script>

<style lang="postcss">
body {
  @apply bg-neutral-100 font-sans text-neutral-600;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body.scroll-lock {
  @apply overflow-hidden;
}
</style>
