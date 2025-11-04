<template>
  <div class="custom-select">
    <!-- Selected item -->
    <div class="selected-box" @click="toggleDropdown">
      <span class="dot" :style="{ backgroundColor: getSelectedColor(selectedItem) }"></span>
      <span class="selected-text">{{ getItemName(selectedItem) || 'Select Status' }}</span>
      <!-- New arrow icon -->
      <svg class="arrow" :class="{ open: isDropdownOpen }" xmlns="http://www.w3.org/2000/svg" width="15" height="15"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown -->
    <div v-if="isDropdownOpen" class="dropdown-box">
      <input v-model="searchQuery" placeholder="Search..." class="search-bar" />

      <ul class="option-list">
        <li v-for="option in filteredOptions" :key="option.ROWID" @click="selectOption(option.ROWID)"
          :class="{ selected: selectedItem === option.ROWID }">
          <span class="dot mr-4" :style="{ backgroundColor: option.color || '#ccc' }"></span>
          <span  class="ms-2">{{ option.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, required: true },
    modelValue: { type: String, default: null }
  },
  data() {
    return {
      isDropdownOpen: false,
      searchQuery: ''
    };
  },
  computed: {
    selectedItem() {
      return this.modelValue;
    },
    getItemName() {
      const map = new Map(this.options.map(o => [o.ROWID, o.name]));
      return id => map.get(id);
    },
    getSelectedColor() {
      return id =>
        (this.options.find(opt => opt.ROWID === id) || {}).color || '#ccc';
    },
    filteredOptions() {
      return this.options.filter(opt =>
        opt.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(id) {
      this.$emit('update:modelValue', id);
      this.isDropdownOpen = false;
    }
  }
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  font-family: sans-serif;
}

.selected-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #cfd4da;
  border-radius: 6px;
  padding: 8px 12px;
  background-color: white;
  cursor: pointer;
}

.selected-text {
  flex-grow: 1;
  margin-left: 8px;
  color: #344767;
  font-size: 14px;
}

.arrow {
  transition: transform 0.2s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dropdown-box {
  position: absolute;
  width: 100%;
  top: calc(100% + 2px);
  left: 0;
  background-color: white;
  border: 1px solid #cfd4da;
  border-radius: 6px;
  z-index: 1000;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
}

.search-bar {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 6px;
  font-size: 14px;
}

.option-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 180px;
  overflow-y: auto;
}

.option-list li {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.option-list li:hover {
  background-color: #f2f2f2;
}

.option-list li.selected {
  background-color: #e3f2fd;
  font-weight: 600;
}

.arrow {
  margin-left: 8px;
  transition: transform 0.3s ease;
  color: #344767;
}

.arrow.open {
  transform: rotate(180deg);
}
</style>
