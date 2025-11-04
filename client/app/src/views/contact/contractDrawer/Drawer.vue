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
        <div class="d-flex justify-content-between">
        <p class="font-normal mb-2 mx-3">Filter Contacts By</p>
        <button class="btn btn-info btn-sm" >Save Filter</button>
      </div>
        <input v-model="searchFieldTitle" class="form-control mb-2 mx-3"
          onclick="focusSearchField((e)=>searchFieldTitle = e.target.value)" placeholder="Search fields..." />

        <!-- Contact Drawer -->
        <div class="message-details d-flex flex-column" style="height: 100%;">
          <div style="overflow-y: auto; max-height: calc(100vh - 130px);" class="px-3 pt-1">

            <div v-for="field in filterdFields" :key="field.model" class="form-group mb-0">
              <div class="d-flex align-items-center gap-2 mb-0">

                <!-- <input class="form-check-input my-auto" type="checkbox" v-model="fieldChecks[field.model]" /> -->
                <input type="checkbox" class="form-check-input mt-2" v-model="fieldChecks[field.model]" @change="() => {
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
          <div class="drawer-footer-buttons d-flex justify-content-center gap-3 bg-white border-top">
            <button class="btn btn-info px-4" @click="searchContacts">Search</button>
            <button class="btn btn-danger px-4" @click="resetFilters">Reset</button>
          </div>

        </div>
        <!-- Contact Drawer ends-->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from "vue3-click-away";
import { digitalStageTrackingOptions, insuranceleadSourceOptions, serviceAvailedOptions } from "../utils/picklist";
import { stringComponent, dateComponent, numberComponent } from "../../../contants/searchPickList";
import { putUrl } from "../../../boot/axios";
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
        leadConvertedOn: "",
        createdTime: "",
        leadCreatedOn: "",
        dealStageTracking: "",
        contactName: "",
        mobile: "",
        email: "",
        insuranceLeadsSource: "",
        assignedAdvisor: "",
        clvCorporateCommission: "",
        lastClvCorporate: "",
        lastClvAdvisor: "",
        contactOwner: "",
        mailingStreet: "",
        mailingCity: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelationship: "",
        emergencyContactEmail: "",
        dateOfBirth: "",
        serviceAvailedOptions: ""
      },
      searchFieldTitle: '',
      fieldChecks: {
        leadConvertedOn: false,
        createdTime: false,
        leadCreatedOn: false,
        dealStageTracking: false,
        contactName: false,
        mobile: false,
        email: false,
        insuranceLeadsSource: false,
        assignedAdvisor: false,
        clvCorporateCommission: false,
        lastClvCorporate: false,
        lastClvAdvisor: false,
        contactOwner: false,
        mailingStreet: false,
        mailingCity: false,
        emergencyContactName: false,
        emergencyContactPhone: false,
        emergencyContactRelationship: false,
        emergencyContactEmail: false,
        dateOfBirth: false,
        serviceAvailedOptions: false
      },

      operationForm: {
        leadConvertedOn: "is",
        createdTime: "is",
        leadCreatedOn: "is",
        dealStageTracking: "is",
        contactName: "is",
        mobile: "is",
        email: "is",
        insuranceLeadsSource: "is",
        assignedAdvisor: "is",
        clvCorporateCommission: "is",
        lastClvCorporate: "is",
        lastClvAdvisor: "is",
        contactOwner: "is",
        mailingStreet: "is",
        mailingCity: "is",
        emergencyContactName: "is",
        emergencyContactPhone: "is",
        emergencyContactRelationship: "is",
        emergencyContactEmail: "is",
        dateOfBirth: "is",
        serviceAvailedOptions: "is"
      },

      allFields: [
        { label: "Lead Converted On", model: "leadConvertedOn", placeholder: "Lead Converted On", type: "date" },
        { label: "Created Time", model: "createdTime", placeholder: "Created Time", type: "date" },
        { label: "Lead Created On", model: "leadCreatedOn", placeholder: "Lead Created On", type: "date" },
        { label: "Deal Stage Tracking", model: "dealStageTracking", placeholder: "Deal Stage Tracking", type: "text" },
        { label: "Contact Name", model: "contactName", placeholder: "Contact Name", type: "text" },
        { label: "Mobile", model: "mobile", placeholder: "Mobile", type: "number" },
        { label: "Email", model: "email", placeholder: "Email", type: "email" },
        { label: "Insurance Leads Source", model: "insuranceLeadsSource", placeholder: "Insurance Leads Source", type: "text" },
        { label: "Assign Advisor", model: "assignedAdvisor", placeholder: "Assign Advisor", type: "text" },
        { label: "CLV Corporate Commission", model: "clvCorporateCommission", placeholder: "CLV Corporate Commission", type: "text" },
        { label: "Last CLV Corporate", model: "lastClvCorporate", placeholder: "Last CLV Corporate", type: "text" },
        { label: "Last CLV Advisor", model: "lastClvAdvisor", placeholder: "Last CLV Advisor", type: "text" },
        { label: "Contact Owner", model: "contactOwner", placeholder: "Contact Owner", type: "text" },
        { label: "Mailing Street", model: "mailingStreet", placeholder: "Mailing Street", type: "text" },
        { label: "Mailing City", model: "mailingCity", placeholder: "Mailing City", type: "text" },
        { label: "Emergency Contact Name", model: "emergencyContactName", placeholder: "Emergency Contact Name", type: "text" },
        { label: "Emergency Contact Phone", model: "emergencyContactPhone", placeholder: "Emergency Contact Phone", type: "number" },
        { label: "Emergency Contact Relationship", model: "emergencyContactRelationship", placeholder: "Emergency Contact Relationship", type: "text" },
        { label: "Emergency Contact Email", model: "emergencyContactEmail", placeholder: "Emergency Contact Email", type: "email" },
        { label: "Date of Birth", model: "dateOfBirth", placeholder: "Date of Birth", type: "date" },
        { label: "Service Availed Options", model: "serviceAvailedOptions", placeholder: "Service Availed Options", type: "text" } //  Added
      ],
      inputVisibility: {},
      betweenFields: {},

      digitalStageTrackingOptions: { ...digitalStageTrackingOptions },
      insuranceleadSourceOptions: { ...insuranceleadSourceOptions },
      serviceAvailedOptions: { ...serviceAvailedOptions },

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

    async searchContacts() {
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
        this.$emit('search-results', searchFields || []);

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
  },
  computed: {
    filterdFields() {
      if (!this.searchFieldTitle) return this.allFields
      return this.allFields.filter(field => field.label.toLowerCase().includes(this.searchFieldTitle.toLowerCase()))
    }
  },
  mounted() {
    this.isVisible = this.isOpen;
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
      max-width: 30rem !important;
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