<template>
    <div class="single-select">
      <div class="selected-item " :style="{padding: selectedItem ? 0 : ''}" @click="toggleDropdown">
            <span v-if="selectedItem" class=""> {{ getItemName(selectedItem) }} </span>    
      </div>
      <div v-if="isDropdownOpen" class="dropdown">
        <input type="text"  v-model="searchQuery" style="outline: none" placeholder="Search..." class="search-input  " />
        <hr style="width:95%; border-bottom: 1px solid rgba(196,196,196,0.5); background-color: transparent;height: 2px;" class="my-0 mx-auto">
        <ul class="options-list custom-scroll">
          <li v-for="option in filteredOptions" :key="option.ROWID" @click="selectOption(option.ROWID)"
            :class="{ 'selected': selectedItem === option.ROWID }">
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
        type: Array,
        required: true
      },
      modelValue: {
        type: String, 
        default: null
      }
    },
    data() {
      return {
        isDropdownOpen: false,
        searchQuery: ''
      };
    },
    computed: {
      getItemName() {
        const optionsMap = new Map(this.options.map(option => [option.ROWID, option.name]));
        return rowId => optionsMap.get(rowId) || '';
      },
      selectedItem() {
        return this.modelValue;
      },
      filteredOptions() {
        const query = this.searchQuery.toLowerCase();
        return this.options.filter(option =>
          option.name.toLowerCase().includes(query) && option.ROWID !== this.selectedItem
        );
      }
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      selectOption(rowId) {
        this.$emit('update:modelValue', rowId);
        this.isDropdownOpen = false; // Close the dropdown after selection
      }
    },
    watch: {
      modelValue(newValue) {
        if (newValue !== this.selectedItem) {
          this.$emit('update:modelValue', newValue);
        }
      }
    },
    created() {
      console.log("options prop:", this.options);
    }
  };
  </script>
  
  <style scoped>
  .single-select {
    position: relative;
    background-color: white;
    box-sizing: border-box;
  }
  
  .selected-item {
    /* border: 1px solid rgba(196, 196, 196, 0.5); */
    padding: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: .5rem;
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
    border: none !important;
  }
  .search-input:focus{
    outline: none !important;
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
  