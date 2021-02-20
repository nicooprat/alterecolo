<template>
  <div
    class="flex items-center py-3 px-4 rounded-md bg-primary-400 text-white space-x-2 leading-none overflow-hidden"
  >
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
      />
    </svg>
    <span>
      <transition :name="transitionName">
        <strong :key="getScore">{{ getScore }}</strong>
      </transition>
    </span>
  </div>
</template>

<script>
import { getScore } from "/src/composables/score";
import { watch, ref } from "vue";

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
  setup() {
    let transitionName = ref("up");

    watch(
      () => getScore.value,
      (newScore, oldScore) => {
        transitionName.value = newScore > oldScore ? "up" : "down";
      }
    );

    return {
      getScore,
      transitionName
    };
  }
};
</script>

<style scoped>
span {
  display: grid;
  grid-template-areas: "content";
}

strong {
  grid-area: content;
}

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
  from {
    transform: translateY(0);
    opacity: 1;
  }
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
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes toTop {
  from {
    transform: translateY(0);
    opacity: 1;
  }
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
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
