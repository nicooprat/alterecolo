import { computed, reactive, watchEffect } from 'vue'
import axios from 'axios'
import Fuse from 'fuse.js'

import router from '@/router'
import { sync } from '@/composables/sync'

type Category = {
  name: string
  slug: string
  count: number
}

type Item = {
  title: string
  replaced: string
  desc: string
  id: string
  link: URL
  difficulty: number
  slug: string
  createdTime: string
  cover: URL
  categories: Category[]
}

type Sorts = 'recent' | 'old' | 'easy' | 'difficult'

const state = reactive({
  isLoading: true,
  categories: [],
  items: [],
  search: sync('search', '', ''),
  sort: sync('sort', 'recent' as Sorts, 'recent' as Sorts),
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

export const getAllItems = computed(() => state.items)

export const getItems = computed(() => {
  let items: Item[] = state.items

  // If not loaded yet, or empty

  if (!items.length) {
    return items
  }

  // Search

  if (state.search) {
    items = fuse.search(state.search as string).map((match) => match.item)
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

  // Sort


  const sorts: Record<Sorts, Function> = {
    recent: (a: Item, b: Item) =>
      Date.parse(a.createdTime) < Date.parse(b.createdTime) ? 1 : -1,
    old: (a: Item, b: Item) =>
      Date.parse(a.createdTime) < Date.parse(b.createdTime) ? -1 : 1,
    easy: (a: Item, b: Item) => (a.difficulty > b.difficulty ? 1 : -1),
    difficult: (a: Item, b: Item) => (a.difficulty > b.difficulty ? -1 : 1),
  }

  // @ts-ignore
  items = items.slice().sort(sorts[state.sort])

  return items
})

export const getItem = (id: string) => {
  return getItems.value.find((item) => item.id === id)
}

export const getPrevItem = (id: string) => {
  const currentIndex = getItems.value.findIndex((item) => item.id === id)
  return getItems.value[currentIndex - 1]
}

export const getNextItem = (id: string) => {
  const currentIndex = getItems.value.findIndex((item) => item.id === id)
  return getItems.value[currentIndex + 1]
}

export const isLoading = computed(() => state.isLoading)

// Search

const fuse = new Fuse([], {
  findAllMatches: true,
  keys: ['title', 'replaced'],
  threshold: 0.3,
})

// @ts-ignore
watchEffect(() => fuse.setCollection(state.items))

export const getSearch = computed({
  get: () => state.search,
  set: (search) => {
    state.search = search
  },
})

// Sort

export const getSort = computed({
  // @ts-ignore
  get() {
    return state.sort
  },
  set(newSort: Sorts) {
    state.sort = newSort
  },
})
