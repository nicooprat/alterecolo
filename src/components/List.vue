<template>
  <nav class="grid gap-8" style="grid-template-columns: repeat(auto-fit, minmax(16em, 1fr))">
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
