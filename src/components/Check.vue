<template>
  <button
    class="flex items-center gap-2 py-2 px-3 ml-auto rounded-md focus-visible:outline-none"
    :class="{
      'bg-primary-400 text-white dark:text-primary-900 hover:bg-primary-500 ring-primary-400 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 focus-visible:ring': !checked,
      'bg-none text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-white ring-primary-400 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 focus-visible:ring': checked,
    }"
    type="button"
  >
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
      />
    </svg>
    <strong>Fait !</strong>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
