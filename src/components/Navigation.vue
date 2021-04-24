<template>
  <Menu v-slot="{ open }" as="nav" class="relative">
    <MenuButton
      class="flex items-center space-x-2 font-bold rounded px-4 py-2 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none"
      :class="{ 'bg-neutral-200': open }"
    >
      <span>{{ currentCategory ? currentCategory.name : 'Toutes' }}</span>
      <svg width="12" height="12" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
        />
      </svg>
    </MenuButton>

    <MenuItems
      class="flex flex-col absolute z-10 left-0 min-w-full p-1 mt-2 bg-white space-y-1 rounded-md shadow-lg focus:outline-none"
    >
      <MenuItem v-for="link in allLinks" :key="link.slug" v-slot="{ active }">
        <router-link
          :key="link.slug"
          v-slot="{ href, isActive, navigate }"
          :to="link.link"
        >
          <a
            :href="href"
            class="flex rounded px-2 py-1 whitespace-nowrap hover:bg-neutral-200 focus:bg-neutral-200"
            :class="{
              'bg-primary-500 text-white': active && isActive,
              'bg-primary-400 text-white': !active && isActive,
              'bg-neutral-200': active,
            }"
            @click="navigate"
          >
            <span>{{ link.name }}</span>
            <sup class="flex items-center ml-1 text-xs font-bold opacity-50">
              {{ link.count }}
            </sup>
          </a>
        </router-link>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script>
import { computed, defineComponent } from 'vue'
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
    const allLinks = computed(() => {
      const all = [
        {
          name: 'Toutes',
          slug: 'all',
          count: props.total,
          link: {
            name: 'Home',
          },
        },
      ]
      const ones = props.categories.map((category) => {
        return {
          ...category,
          link: {
            name: 'Category',
            params: { category: category.slug },
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
