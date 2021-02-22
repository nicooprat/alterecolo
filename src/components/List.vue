<template>
  <nav class="grid gap-8">
    <template v-if="isLoading">
      <span
        v-for="item in Array.from(Array(12))"
        :key="item"
        class="h-48 bg-neutral-200 rounded-xl"
      />
    </template>
    <template v-else-if="items.length">
      <Item
        v-for="item in items"
        :key="item.id"
        :item="item"
        class="-mx-4 xs:-mx-0"
      />
    </template>
  </nav>
</template>

<script>
import Item from "/src/components/Item.vue";

export default {
  components: {
    Item
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
nav {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media screen and (min-width: 640px) {
  nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (min-width: 768px) {
  nav {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media screen and (min-width: 1024px) {
  nav {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
