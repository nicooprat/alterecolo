<template>
  <router-link
    :to="getDetailsRoute"
    class="flex flex-col bg-white shadow-md xs:rounded-lg -mx-4 xs:-mx-0 ring-primary-400 hover:shadow-lg focus-visible:ring focus-visible:outline-none"
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
      <span v-else class="absolute inset-0 bg-neutral-200"></span>
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
              v-for="category in item.categories"
              :key="category.slug"
              class="p-1 rounded-sm leading-tight underline hover:text-primary-400 ring-primary-400 focus-visible:ring focus-visible:outline-none"
              :to="{ name: 'Category', params: { category: category.slug } }"
            >
              {{ category.name }}
            </router-link>
          </object>
        </small>
      </nav>

      <div class="flex items-center gap-4 mt-auto">
        <Stars :difficulty="item.difficulty" :checked="checked" />
        <Check :checked="checked" @click.prevent="check" />
      </div>
    </div>
  </router-link>
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
