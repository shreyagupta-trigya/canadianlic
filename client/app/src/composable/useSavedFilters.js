// composables/useSavedFilters.js
import { ref } from 'vue';

export function useSavedFilters(key = 'filters:default') {
  const savedFilters = ref([]);

  const load = () => {
    try {
      const data = localStorage.getItem(key);
      savedFilters.value = data ? JSON.parse(data) : [];
    } catch {
      savedFilters.value = [];
    }
  };

  const save = (name, fields, operation) => {
    if (!name.trim()) throw new Error("Filter name required");

    const existing = JSON.parse(localStorage.getItem(key)) || [];

    if (existing.some(f => f.name === name)) {
      throw new Error("Filter already exists");
    }

    existing.push({ name, fields: { ...fields }, operation: { ...operation } });
    localStorage.setItem(key, JSON.stringify(existing));
    savedFilters.value = existing;
  };

  return {
    savedFilters,
    load,
    save
  };
}
