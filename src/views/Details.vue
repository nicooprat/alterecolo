<template>
  <Dialog v-if="item" :open="isOpen" @close="close">
    <div class="fixed inset-0 py-12 overflow-y-auto">
      <DialogOverlay
        class="overlay bg-neutral-900 opacity-75 fixed inset-0 z-0 cursor-pointer"
      />
      <DialogDescription as="template">
        <main
          class="content w-full max-w-[65ch] mx-auto min-h-full bg-white rounded-xl flex flex-col overflow-hidden flex-shrink-0 relative pointer-events-auto"
        >
          <button
            class="absolute top-0 right-0 m-6 bg-white rounded-full border-2 border-white hover:text-primary-500 focus:text-primary-500 focus:outline-none"
            @click="close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
              />
            </svg>
          </button>

          <img
            v-if="item.cover"
            class="w-full h-64 object-cover bg-neutral-50"
            :src="item.cover.thumbnails.large.url"
            :alt="item.title"
            :width="item.cover.thumbnails.large.width"
            :height="item.cover.thumbnails.large.height"
          />

          <article class="prose p-8">
            <DialogTitle as="template">
              <h2>
                <small class="block text-neutral-600 font-bold opacity-60">
                  {{ item.replaced }} <span class="ml-1" aria-hidden>⤵︎</span>
                </small>
                <strong>
                  {{ item.title }}
                </strong>
              </h2>
            </DialogTitle>

            <nav>
              <router-link
                v-for="category in item.categories"
                :key="category.slug"
                class="rounded-sm mr-2 leading-tight underline hover:text-primary-400 ring-primary-400 focus:ring focus:outline-none"
                :to="{ name: 'Category', params: { category: category.slug } }"
              >
                {{ category.name }}
              </router-link>
            </nav>

            <p class="whitespace-pre-line">{{ item.desc }}</p>

            <p
              v-if="item.link"
              class="rounded border border-neutral-200 px-2 text-neutral-500 truncate"
            >
              <small
                >Source :
                <a :href="item.link" class="text-current">{{
                  item.link
                }}</a></small
              >
            </p>
          </article>

          <aside class="flex items-center p-8 pt-0">
            <span v-if="item.difficulty" class="flex space-x-1 mr-4">
              <svg
                v-for="n in 3"
                :key="n"
                :class="
                  checked
                    ? {
                        'text-neutral-300': item.difficulty < n,
                        'text-neutral-500': item.difficulty >= n,
                      }
                    : {
                        'text-neutral-300': item.difficulty < n,
                        'text-primary-400': item.difficulty >= n,
                      }
                "
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
                'bg-none text-neutral-500 hover:bg-neutral-300': checked,
              }"
              type="button"
              @click.prevent="check"
            >
              <svg class="mr-2" width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                />
              </svg>
              <strong>Fait !</strong>
            </button>
          </aside>

          <footer class="bg-neutral-50 p-8 mt-auto">
            <div
              id="cusdis_thread"
              ref="comments"
              data-host="https://cusdis.com"
              :data-app-id="CUSDIS_APP_ID"
              :data-page-id="id"
              :data-page-url="route.fullPath"
              :data-page-title="item?.title"
            />
          </footer>
        </main>
      </DialogDescription>
    </div>
  </Dialog>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onUnmounted,
  watchEffect,
} from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
import { useRoute } from 'vue-router'

import { getItems } from '@/composables/data'
import { toggleId, isChecked } from '@/composables/score'
import router from '@/router'

export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const item = computed(() =>
      getItems.value.find((item) => item.id === props.id),
    )

    const route = useRoute()

    watchEffect(() => {
      // If not loaded yet, or not current page
      if (!item.value || !route.params.id) {
        return
      }
      nextTick(() => {
        document.body.classList.add('scroll-lock')
        if (!window.renderCusdis) {
          // https://cusdis.com/doc#/advanced/sdk
          const script = document.createElement('script')
          script.src = '//cusdis.com/js/cusdis.es.js'
          document.head.appendChild(script)
          document.body.classList.add('scroll-lock')
        } else {
          window.renderCusdis(document.querySelector('#cusdis_thread'))
        }
      })
    })

    onUnmounted(() => {
      document.body.classList.remove('scroll-lock')
    })

    return {
      item,
      route,
      CUSDIS_APP_ID: import.meta.env.VITE_CUSDIS_APP_ID,
      close: () =>
        router.push({
          ...router.currentRoute.value.matched[0],
          query: router.currentRoute.value.query,
        }),
      checked: computed(() => isChecked(props.id)),
      check: () => toggleId(props.id),
      isOpen: true,
    }
  },
})
</script>

<style scoped lang="postcss">
/* https://shadows.brumm.af/ */
.content {
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
}
</style>
