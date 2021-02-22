import { computed, reactive, watchEffect } from 'vue'
import axios from 'axios'
import Fuse from 'fuse.js'

import router from '/src/router'
import { sync } from '/src/composables/sync'

type Category = {
  name: string
  slug: string
  count: number
}

type Item = {
  title: string
  replaced: string
  desc: string
  id: number
  link: URL
  difficulty: number
  slug: string
  createdTime: string
  cover: URL
  categories: Category[]
}

const state = reactive({
  isLoading: true,
  categories: [],
  items: [],
  search: sync('search'),
  sort: sync('sort', 'createdTime', 'createdTime'),
  order: sync('order', 'desc', 'desc'),
})

// Data

export const fetch = async (): Promise<void> => {
  const { data } = await axios.get('/.netlify/functions/airtable')
  state.categories = data.categories
  state.items = data.items
  state.isLoading = false
}

export const getCategories = computed(() => state.categories)

export const getTotal = computed(() => state.items.length)

export const getItems = computed(() => {
  let items: Item[] = state.items

  // If not loaded yet, or empty

  if (!items.length) {
    return items
  }

  // Category

  const currentRoute = router.currentRoute.value

  if (currentRoute?.params.category) {
    items = items.filter((item) => {
      return item.categories.some(
        (c) => c.slug === currentRoute.params.category,
      )
    })
  }

  // Search

  if (state.search) {
    items = fuse.search(state.search).map((match) => match.item)
  }

  // Sort

  if (state.sort === 'createdTime') {
    items = items.sort((a: Item, b: Item) =>
      Date.parse(a.createdTime) < Date.parse(b.createdTime) ? 1 : -1,
    )
  }

  if (state.sort === 'difficulty') {
    items = items.sort((a: Item, b: Item) =>
      a.difficulty > b.difficulty ? 1 : -1,
    )
  }

  if (state.order === 'asc') {
    items = items.reverse()
  }

  return items
})

export const isLoading = computed(() => state.isLoading)

// Search

const fuse = new Fuse([], {
  findAllMatches: true,
  keys: ['title', 'replaced'],
  threshold: 0.3,
})

watchEffect(() => fuse.setCollection(state.items))

export const getSearch = computed({
  get: () => state.search,
  set: (search) => (state.search = search),
})

// Sort

export const getSort = computed({
  get() {
    return state.sort
  },
  set(newSort) {
    if (state.sort === newSort) {
      if (state.order === 'desc') {
        state.order = 'asc'
      } else {
        state.order = 'desc'
      }
    } else {
      state.order = 'desc'
      state.sort = newSort
    }
  },
})

export const getOrder = computed(() => state.order)
