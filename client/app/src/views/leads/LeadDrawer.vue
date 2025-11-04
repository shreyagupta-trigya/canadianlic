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
        <p class="font-normal mb-2 mx-3">Filter Fields By</p>
        <input v-model="searchFieldTitle" class="form-control mb-2 mx-3" onclick="focusSearchField((e)=>searchFieldTitle = e.target.value)" placeholder="Search fields..." />
        <div> {{  }}</div>
        <!-- Drawer Body -->
        <div class="message-details d-flex flex-column" style="height: 100%;">
          <div style="overflow-y: auto; max-height: calc(100vh - 160px);" class="px-3 pt-0">

            <div v-for="field in filterdFields" :key="field.model" class="form-group mb-0">
              <div class="d-flex align-items-center gap-2 mb-0">

                <!-- <input class="form-check-input my-auto" type="checkbox" v-model="fieldChecks[field.model]" /> -->
                <input type="checkbox" class="form-check-input"  style="width: 1rem; height: 1rem;" v-model="fieldChecks[field.model]" @change="() => {
                  if (fieldChecks[field.model]) {
                    const operations = getOperationOptions(field);
                    operationForm[field.model] = operations[0]?.value || '';
                  } else {
                    operationForm[field.model] = '';
                  }
                }" />
                <label class="mt-2">{{ field.label }}</label>
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

        <slot></slot>
      </div>
    </div>
  </div>
</template>




<script>
import { directive } from "vue3-click-away";
import { stringComponent, dateComponent, numberComponent } from "../../contants/searchPickList";
import { insuranceLeadStatusOptions, leadStatusStageOption } from "./utils/picklist"
import data from "../referrals/utils/data";
export default
  {

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
          createdTime: '',
          layout: '',
          insurenceLeadNameAll: '',
          insuranceLeadStatus: '',
          leadStatusStage: '',
          mobile: '',
          insuranceLeadSource: '',
          assignedAdvisor: '',
          email: '',
          servicesRequested: '',
          gclid: '',
          firstPageVisited: '',
          adNetwork: '',
          lastActivityTime: '',
          totalInteractionTime: '',
          phone: '',
          createdBy: '',
          adCampaignName: '',
          facebookAd: '',
          firstName: '',
          lastNameAll: '',
          keyword: '',
          submitPageUrl: '',
          lpUrlData: '',
          gclidData: '',
        },

        fieldChecks: {
          createdTime: false,
          layout: false,
          insurenceLeadNameAll: false,
          insuranceLeadStatus: false,
          leadStatusStage: false,
          mobile: false,
          insuranceLeadSource: false,
          assignedAdvisor: false,
          email: false,
          servicesRequested: false,
          gclid: false,
          firstPageVisited: false,
          adNetwork: false,
          lastActivityTime: false,
          totalInteractionTime: false,
          phone: false,
          createdBy: false,
          adCampaignName: false,
          facebookAd: false,
          firstName: false,
          lastNameAll: false,
          keyword: false,
          submitPageUrl: false,
          lpUrlData: false,
          gclidData: false,
        },
        operationForm: {
          createdTime: '',
          layout: '',
          insurenceLeadNameAll: '',
          insuranceLeadStatus: '',
          leadStatusStage: '',
          mobile: '',
          insuranceLeadSource: '',
          assignedAdvisor: '',
          email: '',
          servicesRequested: '',
          gclid: '',
          firstPageVisited: '',
          adNetwork: '',
          lastActivityTime: '',
          totalInteractionTime: '',
          phone: '',
          createdBy: '',
          adCampaignName: '',
          facebookAd: '',
          firstName: '',
          lastNameAll: '',
          keyword: '',
          submitPageUrl: '',
          lpUrlData: '',
          gclidData: '',
        },

        allFields: [
          { label: 'Created Time', model: 'createdTime', placeholder: 'Created Time', type: 'date' },
          { label: 'Layout', model: 'layout', placeholder: 'Layout', type: 'text' },
          { label: 'Insurance Lead Name All', model: 'insurenceLeadNameAll', placeholder: 'Lead Name', type: 'text' },
          { label: 'Insurance Lead Status', model: 'insuranceLeadStatus', placeholder: 'Status', type: 'array', options: insuranceLeadStatusOptions },
          {
            label: 'Lead Status Stage',
            model: 'leadStatusStage',
            placeholder: 'Stage',
            type: 'array',
            options: leadStatusStageOption,
          },

          { label: 'Mobile', model: 'mobile', placeholder: 'Mobile', type: 'text' },
          { label: 'Insurance Lead Source', model: 'insuranceLeadSource', placeholder: 'Source', type: 'text' },
          { label: 'Assigned Advisor', model: 'assignedAdvisor', placeholder: 'Advisor', type: 'text' },
          { label: 'Email', model: 'email', placeholder: 'Email', type: 'email' },
          { label: 'Services Requested', model: 'servicesRequested', placeholder: 'Services', type: 'text' },
          { label: 'GCLID', model: 'gclid', placeholder: 'GCLID', type: 'text' },
          { label: 'First Page Visited', model: 'firstPageVisited', placeholder: 'Page URL', type: 'text' },
          { label: 'Ad Network', model: 'adNetwork', placeholder: 'Ad Network', type: 'text' },
          { label: 'Last Activity Time', model: 'lastActivityTime', placeholder: 'Last Activity', type: 'text' },
          { label: 'Total Interaction Time (mins)', model: 'totalInteractionTime', placeholder: 'Minutes', type: 'number' },
          { label: 'Phone', model: 'phone', placeholder: 'Phone', type: 'text' },
          { label: 'Created By', model: 'createdBy', placeholder: 'Creator', type: 'text' },
          { label: 'Ad Campaign Name', model: 'adCampaignName', placeholder: 'Campaign', type: 'text' },
          { label: 'Facebook Ad', model: 'facebookAd', placeholder: 'Facebook Ad', type: 'text' },
          { label: 'First Name', model: 'firstName', placeholder: 'First Name', type: 'text' },
          { label: 'Last Name All', model: 'lastNameAll', placeholder: 'Last Name', type: 'text' },
          { label: 'Keyword', model: 'keyword', placeholder: 'Keyword', type: 'text' },
          { label: 'Submit Page URL', model: 'submitPageUrl', placeholder: 'Submit URL', type: 'text' },
          { label: 'LP URL Data', model: 'lpUrlData', placeholder: 'LP URL', type: 'text' },
          { label: 'GCLID Data', model: 'gclidData', placeholder: 'GCLID Data', type: 'text' },
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

         

          this.$emit('search-results', searchFields);

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

    mounted() {
      this.isVisible = this.isOpen;
    },

    computed: {
      filterdFields() {
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