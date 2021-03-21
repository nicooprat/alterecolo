<template>
  <nav class="flex items-center flex-wrap -mx-3 leading-tight">
    <template v-if="isLoading">
      <span
        v-for="item in 6"
        :key="item"
        class="rounded-full bg-neutral-200 w-28 h-4 m-3"
      />
    </template>
    <router-link
      v-else-if="getLinks"
      v-for="category in getLinks"
      :key="category.slug"
      :to="category.link"
      v-slot="{ href, isActive, navigate }"
      custom
    >
      <a
        :href="href"
        class="py-2 px-3 flex rounded-md"
        :class="{
          'text-white bg-primary-400': isActive,
          'text-primary-400 hover:(text-white bg-primary-400) focus:(text-white bg-primary-400 outline-none)': !isActive
        }"
        @click="navigate">
        <strong>{{ category.name }}</strong>
        <sup class="flex items-center ml-1 text-xs font-bold opacity-80">
          {{ category.count }}
        </sup>
      </a>
    </router-link>
  </nav>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return {
      getLinks: computed(() => {
        const all = [{
          name: 'Toutes',
          slug: 'all',
          count: props.total,
          link: {
            name: 'Home',
          }
        }]
        const ones = props.categories.map((category) => {
          return {
            ...category,
            link: {
              name: 'Category',
              params: { category: category.slug }
            }
          }
        })
        return all.concat(ones)
      })
    }
  }
};
</script>
