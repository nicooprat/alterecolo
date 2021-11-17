<template>
  <Menu v-slot="{ open }" as="div" class="relative">
    <MenuButton
      class="w-full flex items-center justify-between gap-2 bg-neutral-200 dark:bg-neutral-900 bg-opacity-75 font-bold rounded px-4 py-2 ring-primary-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:text-neutral-300 focus-visible:ring focus-visible:outline-none"
      :class="{ 'bg-neutral-200 dark:bg-neutral-700': open }"
    >
      <span>{{ SORTS[sort] }}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" class="flex-shrink-0">
        <path
          fill="currentColor"
          d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
        />
      </svg>
    </MenuButton>

    <MenuItems
      class="flex flex-col absolute z-10 xs:left-0 right-0 xs:right-auto min-w-[20ch] w-full p-2 mt-2 bg-white dark:bg-neutral-900 dark:text-neutral-300 space-y-1 rounded-md shadow-lg focus-visible:outline-none"
    >
      <MenuItem v-for="(label, key) in SORTS" :key="key" v-slot="{ active }">
        <router-link
          class="cursor-pointer text-left rounded px-2 py-1 whitespace-nowrap font-semibold"
          :class="{
            'bg-primary-500 text-primary-900': active && sort === key,
            'bg-primary-400 text-primary-900': !active && sort === key,
            'bg-neutral-200 dark:bg-neutral-700': active && sort !== key,
          }"
          :to="{ ...currentRoute, query: { ...currentRoute.query, sort: key } }"
        >
          {{ label }}
        </router-link>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useRoute } from 'vue-router'

const SORTS = {
  recent: 'Récentes',
  old: 'Anciennes',
  easy: 'Faciles',
  difficult: 'Difficiles',
}

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  props: {
    sort: {
      type: String,
      required: true,
    },
  },
  emits: ['update:sort'],
  setup() {
    return {
      SORTS,
      currentRoute: useRoute(),
    }
  },
}
</script>
