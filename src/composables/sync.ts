import { ref, watch } from 'vue'

import router from '@/router'

export const sync = (key: string, value: string, defaultValue: string) => {
  const val = ref(value)

  // Sync route -> value
  router.afterEach((to) => {
    val.value = to.query[key]?.toString() || defaultValue
  })

  // Sync value -> route
  watch(
    () => val.value,
    (value) => {
      const currentRoute = router.currentRoute.value
      // Avoid infinite loop
      if (currentRoute.query[key] === value) {
        return
      }
      // undefined removes key from URL
      const newValue = value === defaultValue ? undefined : value
      router.replace({
        ...currentRoute,
        query: {
          ...currentRoute.query,
          [key]: newValue,
        },
      })
    },
  )

  return val
}
