<template>
  <div
    class="xs:flex flex-col bg-white dark:bg-neutral-900 shadow-md relative xs:rounded-xl -mx-4 xs:-mx-0 hover:shadow-lg"
  >
    <span
      class="relative rounded-md xs:rounded-t-xl xs:rounded-b-none overflow-hidden float-right xs:float-none w-14 h-14 m-4 xs:m-0 xs:w-full xs:h-auto xs:pb-[56.25%]"
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

    <div class="p-4 flex-grow flex flex-col gap-2">
      <router-link
        class="ring-primary-400 ring-offset-2 rounded focus-visible:ring focus-visible:outline-none"
        :to="getDetailsRoute"
      >
        <div class="absolute inset-0" />
        <small class="flex items-center font-bold opacity-50">
          <span>{{ item.replaced }}</span
          >&nbsp;<svg viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="currentColor"
              d="M14.59 16.004L5.982 7.397l1.414-1.414 8.607 8.606V7.004h2v11h-11v-2z"
            />
          </svg>
        </small>
        <strong class="block font-bold text-lg leading-tight">
          {{ item.title }}
        </strong>
      </router-link>

      <nav>
        <small class="flex flex-wrap gap-2">
          <router-link
            v-for="category in item.categories"
            :key="category.slug"
            class="rounded-sm leading-tight underline opacity-75 relative hover:text-primary-400 ring-primary-400 ring-offset-2 focus-visible:ring focus-visible:outline-none"
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
