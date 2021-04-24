<template>
  <div ref="target" class="relative" @keyup.esc="isVisible = false">
    <button
      type="button"
      class="flex items-center space-x-2 font-bold rounded px-4 py-2 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none"
      @click="isVisible = !isVisible"
    >
      <span>{{ SORTS[sort] }}</span>
      <svg width="12" height="12" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"
        />
      </svg>
    </button>

    <nav
      v-if="isVisible"
      class="flex flex-col absolute top-full mt-2 left-0 rounded bg-white z-1 p-2"
    >
      <button
        v-for="(label, key) in SORTS"
        :key="key"
        :class="{ 'text-primary-400': key === sort }"
        class="text-left font-bold rounded px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none"
        type="button"
        @click="$emit('update:sort', key), (isVisible = false)"
      >
        {{ label }}
      </button>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const SORTS = {
  recent: 'Récentes',
  old: 'Anciennes',
  easy: 'Faciles',
  difficult: 'Difficiles',
}

export default defineComponent({
  props: {
    sort: {
      type: String,
      required: true,
    },
  },
  emits: ['update:sort'],
  setup() {
    return {
      SORTS,
    }
  },
})
</script>
