import { computed } from "vue";

import { persist } from "/src/composables/persist";
import { getItems } from "/src/composables/data";

const checkedIds = persist({
  key: "checkedIds",
  value: new Set([]),
  getter: a => new Set(a),
  setter: a => [...a]
});

export const getCheckedIds = computed(() => checkedIds);

export const getScore = computed(() => {
  return getItems.value.reduce((score, item) => {
    return score + (checkedIds.value.has(item.id) ? item.difficulty : 0);
  }, 0);
});

export const toggleId = id => {
  checkedIds.value.has(id)
    ? checkedIds.value.delete(id)
    : checkedIds.value.add(id);
};

export const isChecked = id => checkedIds.value.has(id);
