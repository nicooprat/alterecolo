<template>
  <TransitionRoot appear :show="isOpen">
    <Dialog v-if="item" :open="isOpen" static as="template" @close="close">
      <div class="fixed z-20 inset-0 pt-12 sm:py-12 px-4 overflow-y-auto">
        <TransitionChild
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-300 delay-100 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @afterLeave="isClosed = true"
          @afterEnter="showComments = true"
        >
          <DialogOverlay
            class="bg-neutral-800 opacity-90 fixed inset-0 z-0 cursor-pointer"
          />
        </TransitionChild>

        <TransitionChild
          enter="duration-500 delay-100 ease-in-dialog"
          enterFrom="opacity-0 transform translate-y-1/2"
          enterTo="opacity-100 transform translate-y-0"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 transform translate-y-0"
          leaveTo="opacity-0 transform translate-y-1/2"
          as="template"
        >
          <DialogDescription as="template">
            <main
              ref="root"
              class="relative overflow-hidden w-full shadow-dialog max-w-[80ch] mx-auto min-h-full bg-white rounded-t-xl sm:rounded-xl flex flex-col flex-shrink-0"
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
                      <!-- eslint-disable-next-line prettier/prettier -->
                      {{ item.replaced }}&nbsp;<span class="ml-1" aria-hidden>⤵︎</span>
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

              <nav
                class="flex flex-col sm:flex-row gap-4 mb-[5vh] px-8 w-full max-w-[65ch] mx-auto"
              >
                <template v-for="(sibling, i) in [prevItem, nextItem]" :key="i">
                  <router-link
                    v-if="sibling"
                    :to="i === 0 ? prevItemRoute : nextItemRoute"
                    class="flex-1 border border-neutral-200 flex items-center gap-4 rounded p-2 hover:bg-neutral-200 focus-visible:bg-neutral-200"
                  >
                    <img
                      v-if="sibling.cover"
                      class="w-10 h-10 flex-shrink-0 rounded object-cover"
                      :src="sibling.cover.thumbnails.large.url"
                      :alt="sibling.title"
                      :width="sibling.cover.thumbnails.large.width"
                      :height="sibling.cover.thumbnails.large.height"
                    />
                    <span
                      v-else
                      class="w-10 h-10 flex-shrink-0 bg-neutral-200 rounded overflow-hidden"
                    />
                    <span class="flex-grow leading-tight">
                      <small class="block font-bold opacity-60">
                        <!-- eslint-disable-next-line prettier/prettier -->
                      {{ sibling.replaced }}&nbsp;<span class="ml-1" aria-hidden>⤵︎</span>
                      </small>
                      <strong class="block mt-1">
                        {{ sibling.title }}
                      </strong>
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      class="flex-shrink-0 self-center text-neutral-300 mx-2"
                      :class="{ 'sm:order-first': i === 0 }"
                    >
                      <path
                        fill="currentColor"
                        d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
                        :transform="
                          i === 0
                            ? 'rotate(90) translate(0,-24)'
                            : 'rotate(-90) translate(-24,0)'
                        "
                      />
                    </svg>
                  </router-link>
                  <span
                    v-else
                    class="flex-1 border border-neutral-200 rounded"
                  />
                </template>
              </nav>

              <footer class="bg-neutral-100 py-8 mt-auto">
                <div
                  id="cusdis_thread"
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
import {
  computed,
  defineComponent,
  nextTick,
  watch,
  watchEffect,
  ref,
} from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import { onKeyStroke } from '@vueuse/core'

import { getItem, getPrevItem, getNextItem } from '@/composables/data'
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
    const item = computed(() => getItem(props.id))

    // Reset scroll on siblings route

    const root = ref(null)
    watch(
      () => props.id,
      () => {
        // Can't apply ref="root" on correct element, bug? Fixed by referencing a child instead
        root.value.parentElement.scrollTo(0, 0)
      },
      {
        flust: 'post', // Wait for DOM update
      },
    )

    // Siblings links

    const prevItem = computed(() => getPrevItem(props.id))
    const prevItemRoute = computed(() =>
      prevItem.value
        ? {
            ...router.currentRoute.value,
            params: {
              ...router.currentRoute.value.params,
              slug: prevItem.value.slug,
              id: prevItem.value.id,
            },
          }
        : {},
    )
    const goToPrevItem = () => router.push(prevItemRoute.value)
    onKeyStroke('ArrowLeft', (e) => {
      e.preventDefault()
      goToPrevItem()
    })

    const nextItem = computed(() => getNextItem(props.id))
    const nextItemRoute = computed(() =>
      nextItem.value
        ? {
            ...router.currentRoute.value,
            params: {
              ...router.currentRoute.value.params,
              slug: nextItem.value.slug,
              id: nextItem.value.id,
            },
          }
        : {},
    )
    const goToNextItem = () => router.push(nextItemRoute.value)
    onKeyStroke('ArrowRight', (e) => {
      e.preventDefault()
      goToNextItem()
    })

    // Comments

    const route = useRoute()
    const showComments = ref(false)
    watchEffect(() => {
      // If not loaded yet, or not current page
      if (!item.value || !showComments.value) {
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
    const prom = new Promise((resolve) => {
      watchEffect(() => {
        if (isClosed.value) {
          resolve()
        }
      })
    })
    onBeforeRouteLeave(() => {
      // Trigger closing
      isOpen.value = false
      return prom
    })

    return {
      item,
      prevItem,
      prevItemRoute,
      nextItem,
      nextItemRoute,
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
      showComments,
      root,
    }
  },
})
</script>
