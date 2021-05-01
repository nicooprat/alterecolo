<template>
  <div
    class="flex-shrink-0 flex items-center py-3 px-4 rounded-md bg-primary-400 text-white dark:text-primary-900 space-x-2 leading-none overflow-hidden"
  >
    <svg class="flex-shrink-0" width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
      />
    </svg>
    <span style="margin-bottom: -0.1em">
      <transition :name="transitionName">
        <strong :key="getScore">{{ getScore }}</strong>
      </transition>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'

import { getScore } from '@/composables/score'

export default defineComponent({
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
      transitionName,
    }
  },
})
</script>

<style scoped lang="postcss">
span {
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
