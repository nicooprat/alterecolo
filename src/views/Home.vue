<template>
  <header class="w-full px-4 py-8 mx-auto flex items-center gap-4">
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

import Logo from '@/components/Logo.vue'
import Navigation from '@/components/Navigation.vue'
import List from '@/components/List.vue'
import Search from '@/components/Search.vue'
import Score from '@/components/Score.vue'
import Sort from '@/components/Sort.vue'
import { isLoading, getSearch, getSort, getTotal } from '@/composables/data'

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
