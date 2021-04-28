<template>
  <span v-if="difficulty" class="flex gap-1">
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
              'text-primary-400': difficulty >= n,
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
import { defineComponent } from 'vue'

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
})
</script>
