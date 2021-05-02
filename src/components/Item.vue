<template>
  <div
    class="flex flex-col bg-white dark:bg-neutral-900 shadow-md relative xs:rounded-xl -mx-4 xs:-mx-0 ring-primary-400 hover:shadow-lg focus-visible:ring focus-visible:outline-none"
  >
    <span
      style="padding-bottom: 56.25%"
      class="relative xs:rounded-t-xl overflow-hidden"
    >
      <img
        v-if="item.cover"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        :src="item.cover.thumbnails.large.url"
        :alt="item.title"
        :width="item.cover.thumbnails.large.width"
        :height="item.cover.thumbnails.large.height"
      />
      <span
        v-else
        class="absolute inset-0 bg-neutral-200 dark:bg-neutral-700"
      />
    </span>

    <div class="p-4 flex-grow flex flex-col">
      <router-link class="mb-2" :to="getDetailsRoute">
        <div class="absolute inset-0" aria-hidden />
        <small class="block font-bold opacity-50">
          {{ item.replaced }}&nbsp;<span class="ml-1">⤵︎</span>
        </small>
        <strong class="block font-bold text-lg leading-tight">
          {{ item.title }}
        </strong>
      </router-link>

      <nav class="mb-2">
        <small class="flex flex-wrap -m-1">
          <router-link
            v-for="category in item.categories"
            :key="category.slug"
            class="p-1 rounded-sm leading-tight underline opacity-75 relative hover:text-primary-400 ring-primary-400 focus-visible:ring focus-visible:outline-none"
            :to="{ name: 'Category', params: { category: category.slug } }"
          >
            {{ category.name }}
          </router-link>
        </small>
      </nav>

      <div class="flex items-center gap-4 mt-auto">
        <Stars :difficulty="item.difficulty" :checked="checked" />
        <Check :checked="checked" class="relative" @click.prevent="check" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { toggleId, isChecked } from '@/composables/score'
import router from '@/router'
import Stars from './Stars.vue'
import Check from './Check.vue'

export default defineComponent({
  components: {
    Stars,
    Check,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
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
      check: () => toggleId(props.item.id),
    }
  },
})
</script>
