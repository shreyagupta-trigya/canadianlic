<template>
  <div class="drawer-main-div card">
    <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
      <div class="drawer__overlay" :style="{ transitionDuration: `${speed}ms` }"></div>
      <div class="drawer__content" v-click-away="closeDrawer" :style="{
        maxWidth: maxWidth,
        transitionDuration: `${speed}ms`,
        backgroundColor: backgroundColor,
      }">
        <div class="px-3 py-1">
          <i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer"></i>
        </div>
          
        <p class="font-normal mb-2 ms-3">Filter Fields By</p>
        <input v-model="searchFieldTitle" class="form-control mb-2" onclick="focusSearchField((e)=>searchFieldTitle = e.target.value)" placeholder="Search fields..." />
        <div> {{  }}</div>
        <!-- Deal Drawer Content -->
        <!-- Deal Drawer Body -->
        <div class="message-details d-flex flex-column" style="height: 100%; flex: 1 1 auto;">
          <div style="flex: 1 1 auto;  padding: 1rem;">
            <div v-for="field in filteredFields" :key="field.model" class="form-group mb-2">

              <!-- Checkbox with label -->
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

              <!-- If checkbox ticked -->
              <div v-if="fieldChecks[field.model]" class="mt-0">

                <!-- Operation dropdown -->
                <select v-model="operationForm[field.model]" class="form-select mb-1"
                  @change="handleOperationChange(field.model, $event.target.value)">
                  <option v-for="option in getOperationOptions(field)" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>

                <!-- If "between" is selected -->
                <div v-if="betweenFields[field.model]" class="d-flex flex-column gap-2">
                  <input type="datetime-local" class="form-control" v-model="form[`${field.model}From`]"
                    placeholder="From" />
                  <input type="datetime-local" class="form-control" v-model="form[`${field.model}To`]"
                    placeholder="To" />
                </div>

                <!-- Picklist or array options -->
                <select v-else-if="(field.type === 'array' || field.type === 'picklist')" v-model="form[field.model]"
                  class="form-select">
                  <option v-for="option in field.options || []" :key="option" :value="option">{{ option }}</option>
                </select>

                <!-- Normal text, number, email input -->
                <input v-else :type="field.type === 'date' ? 'datetime-local' : field.type" class="form-control"
                  v-model="form[field.model]" :placeholder="field.placeholder" />
              </div>

            </div>
          </div>

          <!-- Footer Sticky Buttons -->
          <div class="d-flex justify-content-center gap-2 border-top bg-white p-3"
            style="position: sticky; bottom: 0; background-color: white; z-index: 2;">
            <button class="btn btn-info" @click="searchDeals">Search</button>
            <button class="btn btn-danger" @click="resetFilters">Reset</button>
          </div>
        </div>


        <!-- Deal Drawer ends -->

        <slot></slot>
      </div>
    </div>
  </div>
</template>


<script>
import { directive } from "vue3-click-away";
import { putUrl } from "../../../boot/axios";
import { stringComponent, dateComponent, numberComponent } from "../../../contants/searchPickList";
import { filter } from "../utils/mandatory";
export default {
  name: "Drawer",

  directives: {
    ClickAway: directive,
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
      form: {
        dealCreatedOn: '',
        dealName: '',
        stage: '',
        layout: '',
        locationName: '',
        contactName: '',
        dealOwner: '',
        insurancedeal: ''
      },

      fieldChecks: {
        dealCreatedOn: false,
        dealName: false,
        stage: false,
        layout: false,
        locationName: false,
        contactName: false,
        dealOwner: false,
        insurancedeal: false
      },

      operationForm: {
        dealCreatedOn: '',
        dealName: '',
        stage: '',
        layout: '',
        locationName: '',
        contactName: '',
        dealOwner: '',
        insurancedeal: ''
      },

      allFields: [
        { label: 'Deal Created On', model: 'dealCreatedOn', placeholder: 'Created On', type: 'date' },
        { label: 'Deal Name', model: 'dealName', placeholder: 'Deal Name', type: 'text' },
        { label: 'Stage', model: 'stage', placeholder: 'Stage', type: 'text' },
        { label: 'Layout', model: 'layout', placeholder: 'Layout', type: 'text' },
        { label: 'Location Name', model: 'locationName', placeholder: 'Location Name', type: 'text' },
        { label: 'Contact Name', model: 'contactName', placeholder: 'Contact Name', type: 'text' },
        { label: 'Deal Owner', model: 'dealOwner', placeholder: 'Deal Owner', type: 'text' },
        { label: 'Insurance Deal', model: 'insurancedeal', placeholder: 'Insurance Deal', type: 'text' },
      ],

      inputVisibility: {},
      betweenFields: {},
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
      isVisible: false,
      isTransitioning: false,
      note: {
        noteTitle: '',
        noteText: ''
      }
    };
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
    async searchDeals() {
      try {
        const searchFields = [];

        for (const field of this.allFields) {
          if (this.fieldChecks[field.model]) { // checkbox ticked
            let value = '';

            if (this.operationForm[field.model] === 'between') {
              const from = this.form[`${field.model}From`];
              const to = this.form[`${field.model}To`];

              if (from && to) {
                const formattedFrom = from.replace('T', ' ') + ':00:000';
                const formattedTo = to.replace('T', ' ') + ':00:000';
                value = [formattedFrom ,formattedTo];
              }
            } else {
              value = this.form[field.model] || '';
            }

            searchFields.push({
              field: field.model,
              operation: this.operationForm[field.model] || 'is',
              value: value
            });
          }
        }

        // console.log('Sending payload:', searchFields);

        this.$emit('search-results', searchFields);

      } catch (error) {
        console.error('Error while searching deals:', error);
      }
    },
    resetFilters() {
      //  fields reset
      for (const key in this.form) {
        this.form[key] = '';
        this.form[key + 'From'] = '';
        this.form[key + 'To'] = '';
      }

      // checkboxes reset
      for (const key in this.fieldChecks) {
        this.fieldChecks[key] = false;
      }

      // operation select reset
      for (const key in this.operationForm) {
        this.operationForm[key] = '';
      }

      // input field visibility reset
      this.inputVisibility = {};
      this.betweenFields = {};
    },


    getOperationOptions(field) {
      if (['text', 'email', 'picklist', 'array'].includes(field.type)) {
        return stringComponent;
      } else if (field.type === 'date') {
        return dateComponent;
      } else if (field.type === 'number') {
        return numberComponent;
      } else {
        return stringComponent;
      }
    },

    handleOperationChange(fieldName, operation) {
      // Reset dono visibility flags
      this.betweenFields[fieldName] = false;
      this.inputVisibility[fieldName] = false;

      if (operation === "between") {
        this.betweenFields[fieldName] = true;
      } else if (operation) {
        this.inputVisibility[fieldName] = true;
      }
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
    closeDrawer() {
      console.log("closeDrawer");
      if (!this.isTransitioning) {
        this.$emit("close");
      }
    },
  },

  mounted() {
    this.isVisible = this.isOpen;
  },
      computed: {
        filteredFields() {
          if (!this.searchFieldTitle) return this.allFields
          return this.allFields.filter(field => field.label.toLowerCase().includes(this.searchFieldTitle.toLowerCase()))
        }
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

.drawer-main-div {
  background-color: #fff;
}
</style>