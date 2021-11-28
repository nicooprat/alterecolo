import { computed } from 'vue'

import { persist } from '@/composables/persist'
import { getAllItems } from '@/composables/data'

type CheckedIdsSet = Set<string>

const checkedIds = persist({
  key: 'checkedIds',
  value: new Set([]) as CheckedIdsSet,
  getter: (a: string[]) => new Set(a),
  setter: (a: CheckedIdsSet) => [...a],
})

export const getCheckedIds = computed(() => checkedIds)

export const getScore = computed(() => {
  return getAllItems.value.reduce((score, item) => {
    return score + (checkedIds.value.has(item.id) ? item.difficulty : 0)
  }, 0)
})

export const getCheckedItems = computed(() => {
  return getAllItems.value.filter((item) => checkedIds.value.has(item.id))
})

export const toggleId = (id: string) => {
  checkedIds.value.has(id)
    ? checkedIds.value.delete(id)
    : checkedIds.value.add(id)
}

export const isChecked = (id: string) => checkedIds.value.has(id)
