<template>
  <router-link
    :to="getDetailsRoute"
    :class="{
      '': checked,
      'shadow-md': !checked
    }"
    class="flex flex-col bg-white xs:rounded-xl -mx-4 xs:-mx-0 ring-primary-400 hover:shadow-lg focus:ring focus:outline-none"
  >
    <span
      style="padding-bottom: 56.25%"
      class="relative xs:rounded-t-xl overflow-hidden"
    >
      <img
        class="absolute inset-0 w-full h-full object-cover"
        v-if="item.cover"
        loading="lazy"
        :src="item.cover.thumbnails.large.url"
        :alt="item.title"
        :width="item.cover.thumbnails.large.width"
        :height="item.cover.thumbnails.large.height"
      />
      <span class="absolute inset-0 bg-neutral-200" v-else></span>
    </span>

    <div class="p-4 flex-grow flex flex-col">
      <span class="mb-2">
        <small class="block text-neutral-600 font-bold opacity-60">
          {{ item.replaced }}&nbsp;<span class="ml-1">⤵︎</span>
        </small>
        <strong class="block font-bold text-lg leading-tight">
          {{ item.title }}
        </strong>
      </span>

      <nav class="mb-2">
        <small class="flex flex-wrap -m-1">
          <object>
            <router-link
              class="p-1 rounded-sm leading-tight underline hover:text-primary-400 ring-primary-400 focus:ring focus:outline-none"
              v-for="category in item.categories"
              :key="category.slug"
              :to="{ name: 'Category', params: { category: category.slug } }"
            >
              {{ category.name }}
            </router-link>
          </object>
        </small>
      </nav>

      <div class="flex items-center mt-auto">
        <span v-if="item.difficulty" class="flex space-x-1 mr-4">
          <svg
            v-for="n in 3"
            :class="
              checked
                ? {
                    'text-neutral-300': item.difficulty < n,
                    'text-neutral-500': item.difficulty >= n
                  }
                : {
                    'text-neutral-300': item.difficulty < n,
                    'text-primary-400': item.difficulty >= n
                  }
            "
            :key="n"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
            />
          </svg>
        </span>

        <button
          class="flex items-center py-2 px-3 ml-auto rounded-md focus:outline-none"
          :class="{
            'bg-primary-400 text-white hover:bg-primary-500': !checked,
            'bg-none text-neutral-500 hover:bg-neutral-300': checked
          }"
          v-on:click.prevent="check"
          type="button"
        >
          <svg class="mr-2" width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
            />
          </svg>
          <strong>Fait !</strong>
        </button>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from "vue";
import { toggleId, isChecked } from "@/composables/score";
import router from "@/router";

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const getDetailsRoute = computed(() => {
      return {
        name: `${router.currentRoute.value.matched[0].name}Details`,
        params: {
          slug: props.item.slug,
          id: props.item.id,
        },
        query: router.currentRoute.value.query,
      }
    })

    return {
      getDetailsRoute,
      checked: computed(() => isChecked(props.item.id)),
      check: () => toggleId(props.item.id)
    };
  }
};
</script>
