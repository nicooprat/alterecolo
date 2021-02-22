<template>
  <div class="space-y-8">
    <header class="flex items-center">
      <nav class="flex items-center space-x-8">
        <Search v-model:search="getSearch" />
        <Sort v-model:sort="getSort" v-model:order="getOrder" />
      </nav>
      <Score class="ml-auto" />
    </header>
    <Navigation :isLoading="isLoading" :categories="categories" :total="getTotal" />
    <List :isLoading="isLoading" :items="items" />
  </div>
</template>

<script>
import List from "/src/components/List.vue";
import Navigation from "/src/components/Navigation.vue";
import Search from "/src/components/Search.vue";
import Score from "/src/components/Score.vue";
import Sort from "/src/components/Sort.vue";
import { isLoading, getSearch, getSort, getOrder, getTotal } from "/src/composables/data";

export default {
  components: {
    List,
    Navigation,
    Search,
    Score,
    Sort
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {
      isLoading,
      getSearch,
      getSort,
      getOrder,
      getTotal
    };
  }
};
</script>
