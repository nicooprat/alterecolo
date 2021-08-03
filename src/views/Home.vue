<template>
  <header
    class="w-full px-4 pt-4 pb-8 xs:py-8 lg:py-12 mx-auto flex items-center gap-4 sticky top-0 z-10 bg-neutral-100 dark:bg-neutral-800 bg-opacity-90 dark:bg-opacity-90"
  >
    <span
      class="backdrop-filter backdrop-blur absolute inset-0 -z-1"
      aria-hidden
    />
    <Logo class="logo" />
    <nav class="nav flex items-center flex-wrap gap-4">
      <Navigation
        :isLoading="isLoading"
        :categories="categories"
        :category="category"
        :total="getTotal"
        class="flex-1"
      />
      <Sort v-model:sort="getSort" class="flex-1" />
      <Search v-model:search="getSearch" class="flex-1" />
    </nav>
    <Score class="ml-auto score" />
  </header>

  <main class="w-full flex-grow flex flex-col px-4 mb-8 mx-auto space-y-8">
    <List :isLoading="isLoading" :items="items" />
  </main>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { isLoading, getSearch, getSort, getTotal } from '@/composables/data'
import Logo from '@/components/Logo.vue'
import Navigation from '@/components/Navigation.vue'
import List from '@/components/List.vue'
import Search from '@/components/Search.vue'
import Score from '@/components/Score.vue'
import Sort from '@/components/Sort.vue'

export default defineComponent({
  components: {
    Logo,
    Navigation,
    List,
    Search,
    Score,
    Sort,
  },
  props: {
    category: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      isLoading,
      getSearch,
      getSort,
      getTotal,
    }
  },
})
</script>

<style lang="postcss" scoped>
@media screen and (max-width: theme('screens.md')) {
  header {
    display: grid;
    grid-template-areas:
      'logo score'
      'nav nav';
  }

  .logo {
    grid-area: logo;
  }

  .nav {
    grid-area: nav;
  }

  .score {
    grid-area: score;
  }
}
</style>
