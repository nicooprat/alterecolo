<template>
  <router-view :categories="getCategories" :items="getItems" />
</template>

<script>
import { onMounted } from "vue";
import { fetch, getCategories, getItems } from "/src/composables/data";

export default {
  setup() {
    onMounted(fetch);

    return {
      getCategories,
      getItems
    };
  }
};
</script>

<style>
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
