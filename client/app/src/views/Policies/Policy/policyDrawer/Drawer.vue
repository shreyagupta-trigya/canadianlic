<template>
  <div class="drawer-main-div card">
    <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
      <div class="drawer__overlay" :style="{ transitionDuration: `${speed}ms` }"></div>
      <div class="drawer__content" v-click-away="closeDrawer" :style="{
        maxWidth: maxWidth,
        transitionDuration: `${speed}ms`,
        backgroundColor: backgroundColor,
      }">
        <div class="px-3 py-1"><i @click="closeDrawer" class="fa fa-arrow-right cursor-pointer"></i></div>
        <!-- Policy Drawer -->
         <div class="d-flex justify-content-between">
        <p class="fw-semibold mb-1 mx-3">Filter Policy</p>
        <button class="btn btn-info btn-sm open-btn" @click="openModal" >Save Filter</button></div>
        <div v-if="savedFilters.length > 0" class="dropdown d-flex justify-content-end">
            <button
                class="btn btn-secondary btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
            >
                Saved Filters
            </button>
            <ul class="dropdown-menu  dropdown-menu-end">
                <li
                v-for="(filter, index) in savedFilters"
                :key="index"
                >
                <a class="dropdown-item" href="#" @click.prevent="applyFilter(filter)">
                    {{ filter.name }}
                </a>
                </li>
            </ul>
        </div>
    
        <div class="message-details d-flex flex-column" style="height: 100%;">
          <div style="overflow-y: auto; max-height: calc(100vh - 130px);" class="px-3 pt-1">

            <div v-for="field in allFields" :key="field.model" class="form-group mb-2">
              <div class="d-flex align-items-center gap-2 mb-0">

                <!-- <input class="form-check-input my-auto" type="checkbox" v-model="fieldChecks[field.model]" /> -->
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


                <!-- First Priority: BETWEEN Selected => 2 fields -->
                <div v-if="betweenFields[field.model]" class="d-flex flex-column gap-2">
                  <input type="datetime-local" class="form-control" v-model="form[`${field.model}From`]"
                    placeholder="From" />
                  <input type="datetime-local" class="form-control" v-model="form[`${field.model}To`]"
                    placeholder="To" />
                </div>

                <!-- PICKLIST or ARRAY input -->
                <select
                  v-else-if="(field.type === 'array' || field.type === 'picklist') && (fieldChecks[field.model] || inputVisibility[field.model])"
                  v-model="form[field.model]" class="form-select">
                  <option v-for="option in field.options || []" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>

                <!-- Otherwise: Single input if Checkbox ticked OR Operation selected -->
                <input v-else-if="fieldChecks[field.model] || inputVisibility[field.model]"
                  :type="field.type === 'date' ? 'datetime-local' : field.type" class="form-control"
                  v-model="form[field.model]" :placeholder="field.placeholder" />

              </div>
            </div>

          </div>

          <!-- Footer Buttons -->
          <div class="d-flex justify-content-center gap-2 border-top bg-white"
            style="position: sticky; bottom: 0; padding: 1rem; z-index: 2;">
            <button class="btn btn-info " @click="searchLeads">Search</button>
            <button class="btn btn-danger" @click="resetFilters">Reset</button>
          </div>

        </div>
        <!-- Policy Drawer ends-->
        <slot></slot>
      </div>
    </div>
    <Modal :isOpen="isOpenModal" :fields="form" :operation="operationForm" :show="isOpenModal" @close="closeModal" />
  </div>
  
</template>

<script>
import { directive } from "vue3-click-away";
import { policyStatusOptions } from "../../utils/picklist";
import { policyTypeOption } from "../../utils/picklist";
import { premiumFrequencyOptions } from "../../utils/picklist";
import { stringComponent, dateComponent, numberComponent } from "../../../../contants/searchPickList";
import { ref } from "vue";
import Modal from "../Components/Modal.vue";
// import Modal from "./Modal.vue";

// const isOpenModal = ref(false);
export default {
  name: "Drawer",
  components: {
    Modal, // 👈 register component
  },

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
        createdTime: '',
        applicationSubmittedOn: '',
        policyName: '',
        client: '',
        clientMobile: '',
        policyType: '',
        policyStatus: '',
        premiumFrequency: '',
        insuranceCompanyAccount: '',
        advisorCommissionAmount: '',
        policyPremiumI: '',
        policyOwner: '',
        mobile: '',
        policyAdvisor: ''
      },

      operationForm: {
        createdTime: '',
        applicationSubmittedOn: '',
        policyName: '',
        client: '',
        clientMobile: '',
        policyType: '',
        policyStatus: '',
        premiumFrequency: '',
        insuranceCompanyAccount: '',
        advisorCommissionAmount: '',
        policyPremiumI: '',
        policyOwner: '',
        mobile: '',
        policyAdvisor: ''
      },

      fieldChecks: {
        createdTime: false,
        applicationSubmittedOn: false,
        policyName: false,
        client: false,
        clientMobile: false,
        policyType: false,
        policyStatus: false,
        premiumFrequency: false,
        insuranceCompanyAccount: false,
        advisorCommissionAmount: false,
        policyPremiumI: false,
        policyOwner: false,
        mobile: false,
        policyAdvisor: false
      },
      allFields: [
        { label: 'Created Time', model: 'createdTime', placeholder: 'Created Time', type: 'date' },
        { label: 'Application Submitted On', model: 'applicationSubmittedOn', placeholder: 'Application Date', type: 'date' },
        { label: 'Policy Name', model: 'policyName', placeholder: 'Policy Name', type: 'text' },
        { label: 'Client', model: 'client', placeholder: 'Client Name', type: 'text' },
        { label: 'Client Mobile', model: 'clientMobile', placeholder: 'Client Mobile', type: 'text' },
        {
          label: 'Policy Type',
          model: 'policyType',
          placeholder: 'Policy Type',
          type: 'array',
          options: policyTypeOption
        },
        {
          label: 'Policy Status',
          model: 'policyStatus',
          placeholder: 'Policy Status',
          type: 'array',
          options: policyStatusOptions
        },
        {
          label: 'Premium Frequency',
          model: 'premiumFrequency',
          placeholder: 'Premium Frequency',
          type: 'array',
          options: premiumFrequencyOptions
        },
        { label: 'Insurance Company Account', model: 'insuranceCompanyAccount', placeholder: 'Insurance Company Account', type: 'text' },
        { label: 'Advisor Commission Amount', model: 'advisorCommissionAmount', placeholder: 'Advisor Commission Amount', type: 'text' },
        { label: 'Policy Premium I', model: 'policyPremiumI', placeholder: 'Policy Premium', type: 'text' },
        { label: 'Policy Owner', model: 'policyOwner', placeholder: 'Policy Owner', type: 'text' },
        { label: 'Mobile', model: 'mobile', placeholder: 'Mobile Number', type: 'text' },
        { label: 'Policy Advisor', model: 'policyAdvisor', placeholder: 'Policy Advisor', type: 'text' }
      ],

      inputVisibility: {},
        betweenFields: {},

      policyStatusOptions: { ...policyStatusOptions },
      policyTypeOption: { ...policyTypeOption },
      premiumFrequencyOptions: { ...premiumFrequencyOptions },

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
      },
      isOpenModal: false,
      savedFilters: []
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
    openModal() {
      
      this.isOpenModal = true;
    },
    closeModal() {
      
      this.isOpenModal = false;
      this.loadSavedFilters();
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

      async searchLeads() {
        try {
          const searchFields = [];

          for (const field of this.allFields) {
            if (this.fieldChecks[field.model]) {  // checkbox checked

              let value = '';

              if (this.operationForm[field.model] === 'between') {
                const from = this.form[`${field.model}From`];
                const to = this.form[`${field.model}To`];

                console.log('Between From:', from);
                console.log('Between To:', to);

                if (from && to) {
                  const formattedFrom = from.replace('T', ' ') + ':00:000';
                  const formattedTo = to.replace('T', ' ') + ':00:000';

                  value = [formattedFrom, formattedTo];
                } else {
                  console.warn('Between selected but from/to is missing!');
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

          // console.log(' Final Payload:', searchFields);

          const payload = {
            page: '1',
            limit: '10',
            search: searchFields
          };


          this.$emit('search-results',payload || {});

        } catch (error) {
          console.error('Error while searching leads:', error);
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
    closeDrawer() {
      console.log("closeDrawer");
      if (!this.isTransitioning) {
        this.$emit("close");
      }
    },
    loadSavedFilters() {
      try {
        const filters = JSON.parse(localStorage.getItem("savedFilters")) || [];
        console.log(filters,'filteres')
        this.savedFilters = filters;
      } catch (error) {
        console.error("Error loading saved filters:", error);
        this.savedFilters = [];
      }
    },
    applyFilter(filter) {
      if (filter && filter.fields) {
        // Fill form values
        this.form = { ...this.form, ...filter.fields };
        this.operationForm = { ...this.operationForm, ...filter.operation };

        // Auto-check fields that have values
        for (const key in this.fieldChecks) {
          this.fieldChecks[key] = !!filter.fields[key];
        }
      }
    },
  },

  mounted() {
    this.isVisible = this.isOpen;
    this.loadSavedFilters()
  },
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