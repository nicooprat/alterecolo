<template>
  <TransitionRoot appear :show="isOpen">
    <Dialog v-if="item" :open="isOpen" static as="template" @close="close">
      <div class="fixed inset-0 pt-12 px-4 overflow-y-auto">
        <TransitionChild
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-300 delay-100 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @afterLeave="isClosed = true"
        >
          <DialogOverlay
            class="overlay bg-neutral-800 opacity-90 fixed inset-0 z-0 cursor-pointer"
          />
        </TransitionChild>

        <TransitionChild
          enter="duration-300 delay-100 ease-out-dialog"
          enterFrom="opacity-0 transform translate-y-1/2"
          enterTo="opacity-100 transform translate-y-0"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 transform translate-y-0"
          leaveTo="opacity-0 transform translate-y-1/2"
          as="template"
        >
          <DialogDescription as="template">
            <main
              class="relative overflow-hidden w-full shadow-dialog max-w-[80ch] mx-auto min-h-full bg-white rounded-t-xl flex flex-col flex-shrink-0"
            >
              <button
                class="absolute top-0 right-0 z-10 m-6 bg-white rounded-full border-2 border-white hover:text-primary-500 focus-visible:text-primary-500 focus-visible:outline-none"
                @click="close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
                  />
                </svg>
              </button>

              <header
                v-if="item.cover"
                class="pb-[56.25%] relative bg-neutral-50"
              >
                <img
                  class="absolute inset-0 w-full h-full object-cover"
                  :src="item.cover.thumbnails.large.url"
                  :alt="item.title"
                  :width="item.cover.thumbnails.large.width"
                  :height="item.cover.thumbnails.large.height"
                />
              </header>

              <article class="prose w-full mx-auto my-[5vh] px-8">
                <DialogTitle as="template">
                  <h2>
                    <small class="block text-neutral-600 font-bold opacity-60">
                      {{ item.replaced }}
                      <span class="ml-1" aria-hidden>⤵︎</span>
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
                    class="rounded-sm mr-2 leading-tight underline hover:text-primary-400 ring-primary-400 focus-visible:ring focus-visible:outline-none"
                    :to="{
                      name: 'Category',
                      params: { category: category.slug },
                    }"
                  >
                    {{ category.name }}
                  </router-link>
                </nav>

                <p v-if="item.desc" class="whitespace-pre-line">
                  {{ item.desc }}
                </p>

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

              <aside
                class="flex items-center mb-[5vh] px-8 w-full max-w-[65ch] mx-auto"
              >
                <Stars :difficulty="item.difficulty" :checked="checked" />
                <Check :checked="checked" @click="check" />
              </aside>

              <footer class="bg-neutral-100 py-8 mt-auto">
                <div
                  id="cusdis_thread"
                  ref="comments"
                  class="max-w-[65ch] mx-auto px-8"
                  data-host="https://cusdis.com"
                  :data-app-id="CUSDIS_APP_ID"
                  :data-page-id="id"
                  :data-page-url="route.fullPath"
                  :data-page-title="item?.title"
                />
              </footer>
            </main>
          </DialogDescription>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, watchEffect, ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'

import { getItems } from '@/composables/data'
import { toggleId, isChecked } from '@/composables/score'
import router from '@/router'
import Stars from '@/components/Stars.vue'
import Check from '@/components/Check.vue'

export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    Stars,
    Check,
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
        if (!window.renderCusdis) {
          // https://cusdis.com/doc#/advanced/sdk
          const script = document.createElement('script')
          script.src = '//cusdis.com/js/cusdis.es.js'
          document.head.appendChild(script)
        } else {
          window.renderCusdis(document.querySelector('#cusdis_thread'))
        }
      })
    })

    // Handle transition between pages by waiting for transition end in guard
    const isOpen = ref(true)
    const isClosed = ref(false)

    onBeforeRouteLeave(() => {
      // Trigger closing
      isOpen.value = false
      // Wait for transition end
      return new Promise((resolve) => {
        watchEffect(() => {
          if (isClosed.value) {
            resolve()
          }
        })
      })
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
      isOpen,
      isClosed,
    }
  },
})
</script>
