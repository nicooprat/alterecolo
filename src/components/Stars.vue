<template>
  <span v-if="difficulty" ref="wrapper" class="flex gap-1">
    <svg
      v-for="n in 3"
      :key="n"
      :class="
        checked
          ? {
              'text-neutral-300': difficulty < n,
              'text-neutral-500': difficulty >= n,
            }
          : {
              'text-primary-100': difficulty < n,
              'text-primary-400 star': difficulty >= n,
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
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { animate } from 'motion'

export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const wrapper = ref<HTMLElement>()

    watch(
      () => props.checked,
      (checked) => {
        if (checked) {
          const stars = wrapper.value?.querySelectorAll('.star')
          const scoreCoords = document
            .querySelector('#score')
            ?.getBoundingClientRect()

          stars?.forEach(async (star, i) => {
            const newStar = star.cloneNode(true) as HTMLElement
            const coords = star.getBoundingClientRect()

            newStar.classList.add('fixed')
            newStar.style.left = `${coords.left}px`
            newStar.style.top = `${coords.top}px`
            newStar.style.zIndex = '999'
            wrapper.value?.appendChild(newStar)

            await animate(
              newStar,
              {
                top: `${scoreCoords?.top}px`,
                left: `${scoreCoords?.left}px`,
                transform: ['scale(1)', 'scale(5)', 'scale(1.5)'],
                opacity: [1, 1, 0],
              },
              {
                duration: 0.5,
                delay: 0.1 * i,
                transform: { offset: [0, 0.2, 1] },
                opacity: { offset: [0, 0.98, 1] },
                easing: [0.57, 0.01, 0.64, 0.63],
              },
            ).finished
            newStar.remove()
          })
        }
      },
    )

    return {
      wrapper,
    }
  },
})
</script>
