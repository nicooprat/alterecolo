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

  <router-view v-slot="{ Component }">
    <transition :duration="500" name="dialog" appear>
      <component :is="Component" />
    </transition>
  </router-view>
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

<style scoped>
.dialog-enter-active /deep/ .overlay,
.dialog-leave-active /deep/ .overlay {
  transition: opacity 500ms;
}

.dialog-leave-active /deep/ .overlay {
  transition-delay: 250ms;
}

.dialog-enter-from /deep/ .overlay,
.dialog-leave-to /deep/ .overlay {
  opacity: 0;
}

.dialog-enter-active /deep/ .content,
.dialog-leave-active /deep/ .content {
  transition: transform 350ms, opacity 350ms;
}

/* ease-in on enter */
.dialog-enter-active /deep/ .content {
  transition-delay: 100ms;
  transition-timing-function: cubic-bezier(.05,.78,.14,.97);
}

/* ease-out on leave */
.dialog-leave-active /deep/ .content {
  transition-timing-function: cubic-bezier(.89,.01,1,.36);
}

.dialog-enter-from /deep/ .content,
.dialog-leave-to /deep/ .content {
  transform: translateY(100%);
  opacity: 0;
}
</style>
