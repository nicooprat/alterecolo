<template>
  <nav
    v-if="isLoading || items.length"
    class="grid gap-4 xs:gap-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <template v-if="isLoading">
      <span
        v-for="item in 12"
        :key="item"
        class="h-32 xs:h-48 bg-neutral-200 dark:bg-neutral-900 xs:rounded-xl -mx-4 xs:-mx-0"
      />
    </template>
    <template v-else-if="items.length">
      <Item
        v-for="item in items"
        :key="item.id"
        :item="item"
        class="-mx-4 xs:-mx-0"
      />
      <a
        href="https://bit.ly/AlterEcolo-proposer"
        class="flex p-8 bg-neutral-200 dark:bg-neutral-900 xs:rounded-xl -mx-4 xs:-mx-0 hover:bg-primary-400 hover:text-white"
        title="Proposer une alternative"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          class="opacity-50 m-auto"
        >
          <path fill="currentColor" d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z" />
        </svg>
      </a>
    </template>
  </nav>

  <div
    v-else
    class="flex flex-col flex-grow items-center justify-center text-neutral-800 dark:text-white"
  >
    <svg
      class="opacity-20 dark:opacity-10"
      width="96"
      height="96"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 17h-8v-2h8v2zm-.499-6.296l-1.298 1.296-1.203-1.204 1.298-1.296-1.298-1.296 1.203-1.204 1.298 1.296 1.296-1.296 1.203 1.204-1.297 1.296 1.297 1.296-1.202 1.204-1.297-1.296zm-7 0l-1.298 1.296-1.203-1.204 1.298-1.296-1.298-1.296 1.203-1.204 1.298 1.296 1.296-1.296 1.203 1.204-1.297 1.296 1.297 1.296-1.202 1.204-1.297-1.296z"
      />
    </svg>
    <h2 class="text-xl font-bold mt-4">Aucun résultat</h2>
    <router-link
      class="flex items-center py-2 px-3 mt-4 rounded-md bg-primary-400 text-white dark:text-primary-900 font-bold hover:bg-primary-500 focus-visible:bg-primary-500 focus-visible:outline-none"
      :to="{ name: 'Home' }"
    >
      Supprimer les filtres
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Item from '@/components/Item.vue'

export default defineComponent({
  components: {
    Item,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
