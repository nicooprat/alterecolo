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
html {
  height: -webkit-fill-available;
}

body {
  @apply bg-neutral-100 font-sans text-neutral-600 flex flex-col;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (prefers-color-scheme: dark) {
  body {
    @apply bg-neutral-800;
  }
}

@supports selector(*:focus-visible) {
  [class*='focus-visible:'] {
    @apply focus:outline-none;
  }
}

#app {
  @apply w-full max-w-7xl mx-auto flex flex-grow flex-col;
}
</style>
