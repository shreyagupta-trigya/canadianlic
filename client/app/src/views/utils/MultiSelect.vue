<template>
  <div class="multi-select">
    <div class="selected-items" :style="{padding:selectedItems.length >0 ? '0px' :''}" @click="toggleDropdown" >
      <div class="row col-12">
        <div class="col-11">
          <span v-if="selectedItems.length === 0"></span>
          <span v-else>
            <template v-for="(item, index) in selectedItems" :key="index" class="selected-item">
              {{ item.name }}
              <button class="remove-item" @click.stop="removeItem(item.ROWID)">×</button>
            </template>
          </span>
        </div>
      </div>   
    </div>
    <div v-if="isDropdownOpen" class="dropdown">
      <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input" />
      <ul class="options-list custom-scroll">
        <li v-for="option in filteredOptions" :key="option.ROWID" @click="toggleOption(option.ROWID)"
          :class="{ 'selected': selectedItems.some(item => item.ROWID === option.ROWID) }">
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      searchQuery: ''
    };
  },
  computed: {
    // Convert the options object into an array
    optionsArray() {
      return Object.values(this.options);
    },
    selectedItems() {
      return this.modelValue.map(id => this.optionsArray.find(option => option.ROWID === id)).filter(item => item);
    },
    filteredOptions() {
      const query = this.searchQuery.toLowerCase();
      return this.optionsArray.filter(option =>
        option.name.toLowerCase().includes(query) &&
        !this.selectedItems.some(item => item.ROWID === option.ROWID)
      );
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleOption(rowId) {
      const newSelectedItems = [...this.modelValue];
      const index = newSelectedItems.indexOf(rowId);
      if (index > -1) {
        newSelectedItems.splice(index, 1);
      } else {
        newSelectedItems.push(rowId);
      }
      this.$emit('update:modelValue', newSelectedItems);
    },
    removeItem(rowId) {
      const newSelectedItems = this.modelValue.filter(id => id !== rowId);
      this.$emit('update:modelValue', newSelectedItems);
    }
  },
  watch: {
    modelValue(newValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(this.modelValue)) {
        this.$emit('update:modelValue', newValue);
      }
    }
  },
  created() {
    // Log the options prop when the component is created
    console.log("options prop:", this.options);
  }
};
</script>

<style scoped>
/* Your CSS styles remain unchanged */
</style>


<style scoped>
.multi-select {
  position: relative;
  background-color: white;
  box-sizing: border-box;
}

.selected-items {
  padding: 12px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: .5rem;
}

.selected-item {
  display: flex;
  align-items: center;
  margin-right: 5px;
  background: #e0e0e0;
  border-radius: 6px;
}

.remove-item {
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  font-size: 12px;
  color: #344767;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid rgba(196, 196, 196, 0.5);
  background: white;
  z-index: 1000;
  border-radius: 6px;
  max-height: 40vh;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: none;
  box-sizing: border-box;
  color: #344767;
  border-radius: 6px;
  border:1px solid rgba(196,196,196,0.5)
}

.options-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #344767;
}

.options-list li {
  padding: 8px;
  cursor: pointer;
}

.options-list li.selected {
  background: #e0e0e0;
}

.dropdown-icon {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  color: #344767;
}

.dropdown-icon::before {
  content: '\f107';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  font-size: 16px;
  transition: transform 0.3s;
  font: normal normal normal 16px / 1 FontAwesome;

}

.dropdown-icon.open::before {
  content: '\f077';
  transform: rotate(-180deg);

}
</style>