<template>
  <Menu v-slot="{ open }" as="div" class="relative">
    <MenuButton
      class="w-full flex items-center justify-between gap-2 bg-neutral-200 dark:bg-neutral-900 bg-opacity-75 font-bold rounded px-4 py-2 ring-primary-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:text-neutral-300 focus-visible:ring focus-visible:outline-none"
      :class="{ 'bg-neutral-200 dark:bg-neutral-700': open }"
    >
      <span class="truncate flex-shrink">
        {{ currentCategory ? currentCategory.name : 'Toutes' }}
      </span>
      <svg width="12" height="12" viewBox="0 0 24 24" class="flex-shrink-0">
        <path
          fill="currentColor"
          d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
        />
      </svg>
    </MenuButton>

    <MenuItems
      class="flex flex-col absolute z-10 left-0 min-w-[20ch] w-full p-2 mt-2 bg-white dark:bg-neutral-900 dark:text-neutral-300 space-y-1 rounded-md shadow-lg focus-visible:outline-none"
    >
      <MenuItem v-for="link in allLinks" :key="link.slug" v-slot="{ active }">
        <router-link
          :key="link.slug"
          :to="link.link"
          class="flex rounded px-2 py-1 whitespace-nowrap"
          :class="{
            'bg-primary-500 text-primary-900': active && category === link.slug,
            'bg-primary-400 text-primary-900':
              !active && category === link.slug,
            'bg-neutral-200 dark:bg-neutral-700':
              active && category !== link.slug,
          }"
        >
          <span>{{ link.name }}</span>
          <sup class="flex items-center ml-1 text-xs font-bold opacity-50">
            {{ link.count }}
          </sup>
        </router-link>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default defineComponent({
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute()
    const allLinks = computed(() => {
      const all = [
        {
          name: 'Toutes',
          slug: 'all',
          count: props.total,
          link: {
            name: 'Home',
            query: route.query,
          },
        },
      ]
      const ones = props.categories.map((category) => {
        return {
          ...category,
          link: {
            name: 'Category',
            params: { category: category.slug },
            query: route.query,
          },
        }
      })
      return all.concat(ones)
    })

    return {
      currentCategory: computed(() => {
        return allLinks.value.find((cat) => cat.slug === props.category)
      }),
      allLinks,
    }
  },
})
</script>
