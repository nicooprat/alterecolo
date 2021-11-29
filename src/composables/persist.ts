import { ref, watchEffect } from 'vue'

/**
 * @description Returns a reactive variable that will be sync in localStorage if available
 * @param {object} options
 * @param {string} options.key - Key used to store object
 * @param {string} options.value - Default value, stored if first time, overriden afterwards by persisted value
 * @param {function} options.getter - Transform value after retrieving from storage
 * @param {function} options.setter - Transform value before setting in storage
 */
export const persist = <T>({
  key,
  value,
  getter = (a) => a,
  setter = (a) => a,
}: {
  key: string
  value: T
  getter: (a: T) => T
  setter: (a: T) => T
}) => {
  const persisted = ref(value)

  try {
    const previous = JSON.parse(localStorage.getItem(key) || '{}')
    if (previous) {
      persisted.value = getter(previous)
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }

  watchEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(setter(persisted.value)))
    } catch (e) {
      console.error(e)
    }
  })

  return persisted
}
