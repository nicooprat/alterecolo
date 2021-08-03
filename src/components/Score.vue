<template>
  <Popover class="relative">
    <PopoverButton
      class="flex-shrink-0 flex items-center py-3 px-4 rounded-md bg-primary-400 text-white dark:text-primary-900 dark:ring-offset-primary-900 space-x-2 leading-none overflow-hidden ring-primary-400 ring-offset-neutral-100 ring-offset-2 focus-visible:ring focus-visible:outline-none hover:bg-primary-500"
    >
      <svg class="flex-shrink-0" width="16" height="16" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
        />
      </svg>
      <span class="grid" style="margin-bottom: -0.1em">
        <transition :name="transitionName">
          <strong :key="getScore">{{ getScore }}</strong>
        </transition>
      </span>
    </PopoverButton>

    <PopoverPanel
      class="absolute right-0 mt-2 z-10 bg-white dark:bg-neutral-900 rounded-lg shadow-lg w-[24rem]"
    >
      <ul v-if="getCheckedItems.length" class="max-h-[32rem] overflow-auto">
        <li
          v-for="item in getCheckedItems"
          :key="item.id"
          class="flex items-center m-2"
        >
          <span
            class="flex-shrink-0 relative rounded-md overflow-hidden float-left w-12 h-12 mr-2"
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
          <span class="flex-grow">
            <small class="inline-block font-bold opacity-50 leading-tight">
              <!-- eslint-disable-next-line prettier/prettier -->
              {{ item.replaced }}&nbsp;<svg class="inline-block" viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M14.59 16.004L5.982 7.397l1.414-1.414 8.607 8.606V7.004h2v11h-11v-2z"
                />
              </svg>
            </small>
            <strong class="block font-bold text-md leading-tight">
              {{ item.title }}
            </strong>
          </span>
          <button
            class="rounded-full p-3 dark:text-neutral-100 hover:text-primary-500 focus-visible:text-primary-500 focus-visible:outline-none"
            @click="toggleId(item.id)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
              />
            </svg>
          </button>
        </li>
      </ul>
      <p v-else class="p-4 text-md text-center">
        Vos actions réalisées apparaîtront ici !
      </p>
    </PopoverPanel>
  </Popover>
</template>

<script lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { defineComponent, watch, ref } from 'vue'

import { getScore, getCheckedItems, toggleId } from '@/composables/score'

export default defineComponent({
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
  },
  setup() {
    let transitionName = ref('up')

    watch(
      () => getScore.value,
      (newScore, oldScore) => {
        transitionName.value = newScore > oldScore ? 'up' : 'down'
      },
    )

    return {
      getScore,
      getCheckedItems,
      transitionName,
      toggleId,
    }
  },
})
</script>

<style scoped lang="postcss">
.grid {
  display: grid;
  grid-template-areas: 'content';
}

strong {
  grid-area: content;
}
</style>

<style>
/* Must not be scoped due to WindiCSS bug appending vue component ID within keyframes */
.up-enter-to {
  animation: fromBottom 300ms 1 both;
}

.up-leave-to {
  animation: toTop 300ms 1 both;
}

.down-enter-to {
  animation: fromTop 300ms 1 both;
}

.down-leave-to {
  animation: toBottom 300ms 1 both;
}

@keyframes toBottom {
  to {
    transform: translateY(150%);
    opacity: 0;
  }
}

@keyframes fromBottom {
  from {
    transform: translateY(150%);
    opacity: 0;
  }
}

@keyframes toTop {
  to {
    transform: translateY(-150%);
    opacity: 0;
  }
}

@keyframes fromTop {
  from {
    transform: translateY(-150%);
    opacity: 0;
  }
}
</style>
