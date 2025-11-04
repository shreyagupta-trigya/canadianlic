<template>
  <div class="drawer-main-div card">
    <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
      <div class="drawer__overlay" :style="{ transitionDuration: `${speed}ms` }"></div>
      <div class="drawer__content" v-click-away="closeDrawer" :style="{
        maxWidth: maxWidth,
        transitionDuration: `${speed}ms`,
        backgroundColor: backgroundColor,
      }">
        <div class=" d-flex justify-content-start align-items-start px-3 py-1 gap-4 border-bottom">
          <i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer"></i>

          <p class="fw-semibold mb-0">Filter Advisors Field By</p>
          <div> {{ }}</div>

        </div>

        <input v-model="searchFieldTitle" class="form-control mb-2" placeholder="Search fields..." />



        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mx-3 mt-2 mb-0">

          <button class="btn btn-info btn-sm" @click="openModal">Save Filter</button>
          <!-- Saved Filters Dropdown -->
          <div v-if="savedFilters.length" class="dropdown d-flex justify-content-end px-3 mb-2">
            <button class="btn btn-danger btn-sm dropdown-toggle" data-bs-toggle="dropdown">
              Saved Filters
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li v-for="(filter, index) in savedFilters" :key="index">
                <a class="dropdown-item d-flex justify-content-between align-items-center"
                  @click.prevent="applyFilter(filter)">
                  {{ filter.name }}
                  <i class="fa fa-trash text-danger ms-2" @click.stop="deleteFilter(index)"></i>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item text-danger" @click.prevent="clearAllSavedFilters">
                  Clear All Saved Filters
                </a>
              </li>
            </ul>
          </div>

        </div>



        <div class="message-details d-flex flex-column" style="height: 100%;">
          <div style="overflow-y: auto; max-height: calc(100vh - 200px);" class="px-3 pt-1 pb-4">
            <div v-for="field in filteredFields" :key="field.model" class="form-group mb-2">
              <div class="d-flex align-items-center gap-2 mb-0">
                <input type="checkbox" class="form-check-input" v-model="fieldChecks[field.model]" @change="() => {
                  if (fieldChecks[field.model]) {
                    const operations = getOperationOptions(field);
                    operationForm[field.model] = operations[0]?.value || '';
                  } else {
                    operationForm[field.model] = '';
                  }
                }" />
                <label>{{ field.label }}</label>
              </div>

              <div v-if="fieldChecks[field.model]" class="mt-0">
                <select v-model="operationForm[field.model]" class="form-select mb-1"
                  @change="handleOperationChange(field.model, $event.target.value)">
                  <option v-for="option in getOperationOptions(field)" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>

                <input v-if="fieldChecks[field.model] || inputVisibility[field.model]" :type="field.type"
                  class="form-control" v-model="form[field.model]" :placeholder="field.placeholder" />
              </div>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="drawer-footer-buttons d-flex justify-content-center gap-3 bg-white border-top">
            <button class="btn btn-info px-4" @click="searchAdvisors">Search</button>
            <button class="btn btn-danger px-4" @click="resetFilters">Reset</button>
          </div>

        </div>
        <FilterSaveModal :isOpen="isOpenModal" :fields="form" :operation="operationForm" :show="isOpenModal"
          moduleKey="filters:advisors" @close="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from "vue3-click-away";
import { stringComponent, dateComponent, numberComponent } from "../../../contants/searchPickList";
import FilterSaveModal from "../../components/FilterSaveModal.vue";
import { putUrl } from "../../../boot/axios";
export default {
  name: "Drawer",

  directives: {
    ClickAway: directive,
  },
  components: {
    FilterSaveModal,
  },

  props: {
    updateData: {
      type: Function,
    },
    updateNotes: {
      type: Function,
    },
    addNotes: {
      type: Function,
    },
    selectedButton: {
      type: String
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxWidth: {
      type: String,
      required: false,
      default: "400px",
    },
    // Transition Speed in Milliseconds
    speed: {
      type: Number,
      required: false,
      default: 300,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "#fafafa",
    },
  },

  data() {
    return {
      isOpenModal: false,
      savedFilters: [],
      searchFieldTitle: '',
      labelStyle: {
        border: '2px dashed lightgrey',
        borderRadius: '10px',
        width: '100%',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      contentStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      iconStyle: {
        fontSize: '24px',
        marginBottom: '5px'
      },
      form: {
        name: "",
        email: "",
        mobile: "",
        module: "",
        idNumber: "",
        advStatus: "",
        advDob: "",
        advDoh: "",
        advCessD: "",
        advEOPolNum: "",
        advLicNum: "",
      },

      fieldChecks: {
        name: false,
        email: false,
        mobile: false,
        module: false,
        idNumber: false,
        advStatus: false,
        advDob: false,
        advDoh: false,
        advCessD: false,
        advEOPolNum: false,
        advLicNum: false,
      },

      operationForm: {
        name: "is",
        email: "is",
        mobile: "is",
        module: "is",
        idNumber: "is",
        advStatus: "is",
        advDob: "is",
        advDoh: "is",
        advCessD: "is",
        advEOPolNum: "is",
        advLicNum: "is",
      },

      allFields: [
        { label: "Advisor Name", model: "name", placeholder: "Advisor Name", type: "text" },
        { label: "Email", model: "email", placeholder: "Email", type: "email" },
        { label: "Mobile", model: "mobile", placeholder: "Mobile", type: "number" },
        { label: "Module", model: "module", placeholder: "Module", type: "text" },
        { label: "ID Number", model: "idNumber", placeholder: "ID Number", type: "text" },
        { label: "Advisor Status", model: "advStatus", placeholder: "Advisor Status", type: "text" },
        { label: "Advisor's Date of Birth", model: "advDob", placeholder: "YYYY-MM-DD", type: "date" },
        { label: "Advisor's Date of Hire", model: "advDoh", placeholder: "YYYY-MM-DD", type: "date" },
        { label: "Advisor's Cessation Date", model: "advCessD", placeholder: "YYYY-MM-DD", type: "date" },
        { label: "Advisor's E&O Policy Number", model: "advEOPolNum", placeholder: "E&O Policy Number", type: "text" },
        { label: "Advisor's Licence Number", model: "advLicNum", placeholder: "Licence Number", type: "text" },
      ],
      inputVisibility: {},
      betweenFields: {},
      isVisible: false,
      isTransitioning: false,
      note: {
        noteTitle: '',
        noteText: ''
      }
    };
  },
  computed: {
    filteredFields() {
      if (!this.searchFieldTitle) return this.allFields
      return this.allFields.filter(field => field.label.toLowerCase().includes(this.searchFieldTitle.toLowerCase()))
    }
  },
  watch: {
    isOpen(val) {
      this.isTransitioning = true;
      if (val) {
        this.toggleBackgroundScrolling(true);
        this.isVisible = true;
      } else {
        this.toggleBackgroundScrolling(false);
        setTimeout(() => (this.isVisible = false), this.speed);
      }
      setTimeout(() => (this.isTransitioning = false), this.speed);
    },
    updateData(value) {
      if (value !== null) {
        this.note.noteText = value.description;
        this.note.noteTitle = value.title;
        this.note.id = value.id
      }
    }
  },

  methods: {
    resetNote() {
      this.note.noteText = "",
        this.note.noteTitle = ""
    },
    async handleSave() {
      try {
        const res = await this.addNotes(this.note);
        if (res.data.success) {
          this.note.noteTitle = '';
          this.note.noteText = '';
        }
      } catch (error) {
        console.error('Error saving note:', error);
      }
    },
    async handleUpdateNote() {
      try {
        const res = await this.updateNotes(this.note);
        console.log({ res })
        if (res.data.success) {
          this.note.noteTitle = '';
          this.note.noteText = '';
          this.closeDrawer();
        }
      } catch (error) {
        console.error('Error updating note:', error);
      }
    },
    isDescriptionValid() {
      return this.note.noteText.length <= 300;
    },
    isTitleValid() {
      return this.note.noteTitle.length <= 50;
    },
    toggleBackgroundScrolling(enable) {
      const body = document.querySelector("body");
      body.style.overflow = enable ? "hidden" : null;
      if (this.selectedButton !== "Update") {
        this.note.noteTitle = '';
        this.note.noteText = '';
      }

    },
    getOperationOptions(field) {
      if (['text', 'email'].includes(field.type)) {
        return stringComponent;
      } else if (field.type === 'date') {
        return dateComponent;
      } else if (field.type === 'number') {
        return numberComponent;
      } else {
        return stringComponent;
      }
    },

    async searchAdvisors() {
      try {
        const search = [];

        for (const field of this.allFields) {
          if (this.fieldChecks[field.model]) {
            search.push({
              field: field.model,
              operation: this.operationForm[field.model] || "is",
              value: this.form[field.model],
            });
          }
        }

        this.$emit("search-results", search);

      } catch (error) {
        console.error("Error searching advisors:", error);
      }
    },


    resetFilters() {
      // Reset all form fields
      for (const key in this.form) {
        this.form[key] = key === "module" ? "Advisor" : "";
      }

      // Reset all checkboxes
      for (const key in this.fieldChecks) {
        this.fieldChecks[key] = false;
      }

      // Reset all operation forms
      for (const key in this.operationForm) {
        this.operationForm[key] = "is";
      }
      this.searchFieldTitle = '';
    },

    handleOperationChange(model, operation) {
      this.betweenFields[model] = false;
      this.inputVisibility[model] = false;

      if (operation === "between") {
        this.betweenFields[model] = true;
      } else if (operation) {
        this.inputVisibility[model] = true;
      }
    },
    closeDrawer() {
      console.log("closeDrawer");
      if (!this.isTransitioning) {
        this.$emit("close");
      }
    },
    openModal() {
      this.isOpenModal = true;
    },
    closeModal() {
      this.isOpenModal = false;
      this.loadSavedFilters();  // reload filters after saving
    },
    loadSavedFilters() {
      try {
        const filters = JSON.parse(localStorage.getItem("filters:advisors")) || [];
        this.savedFilters = filters;
      } catch (error) {
        console.error("Error loading saved filters:", error);
        this.savedFilters = [];
      }
    },
    applyFilter(filter) {
      if (filter && filter.fields) {
        this.form = { ...this.form, ...filter.fields };
        this.operationForm = { ...this.operationForm, ...filter.operation };

        for (const key in this.fieldChecks) {
          this.fieldChecks[key] = !!filter.fields[key];
        }
      }
    },
    deleteFilter(index) {
      this.savedFilters.splice(index, 1);
      localStorage.setItem("filters:advisors", JSON.stringify(this.savedFilters));
    },

    clearAllSavedFilters() {
      localStorage.removeItem("filters:advisors");
      this.savedFilters = [];
    }



  },

  mounted() {
    this.isVisible = this.isOpen;
    this.loadSavedFilters();
  }

};
</script>

<style lang="scss" scoped>
.drawer {
  visibility: hidden;

  &.is-visible {
    visibility: visible;
  }

  &.is-open {
    .drawer__overlay {
      opacity: 0.5;
    }

    .drawer__content {
      max-width: 24rem !important;
      transform: translateX(0);
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    opacity: 0;
    transition-property: opacity;
    background-color: #000000;
    user-select: none;
  }

  &__content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
    overflow: auto;
    transition-property: transform;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    box-shadow: 0 2px 6px #777;
  }
}

.drawer-footer-buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border-top: 1px solid #dee2e6;
}


.drawer-main-div {
  background-color: #fff;
}
</style>