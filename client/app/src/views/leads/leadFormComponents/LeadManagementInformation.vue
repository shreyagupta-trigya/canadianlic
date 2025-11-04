<template>
    <div>
      <h5 class="main-heading mt-2 ps-2">Lead Management History</h5>
      <div style="width: 100%; overflow: scroll">
        <table class="table border table-responsive subform">
          <thead class="table subform-table-head text-white">
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Interaction Type</th>
              <th>Date/Time Of Interaction</th>
              <th>Contact Attempt</th>
              <th>Time Spent (Mins)</th>
              <th style="min-width:20rem" class="text-center">Comments</th>
              <th>Interaction Outcome</th>
              <th>Probability Of Closure</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="(parent, index) in subform" :key="index">
              <td class="m-auto">{{ index + 1 }}</td>
              <td>
                <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                  <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                </a>
              </td>
              <td>
                <div class="choices" >
                  <div class="select-box">
                    <select v-model="parent.interactionType" class="form-select" name="choices-state">
                      <option v-for="(option, index) in interactionType" :key="index" :value="option">
                        {{ option }}
                        </option>                    
                    </select>
                  </div>
                </div>
              </td>
              <td>
                <input v-model="parent.timeOfInteraction" type="datetime-local" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.contactAttempt" type="number" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.timeSpent" type="number" class="form-control form-control-default" autocomplete="off">
              </td>
              <td >
                <textarea  v-model="parent.comments" class="form-control form-control-default" rows="2" cols="12" ></textarea>
              </td>
              <td>
                <input v-model="parent.interactionOutcome" type="text" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.probabilityOfClosure" type="number" class="form-control form-control-default" autocomplete="off">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToLeadDataTable">
        Add Row
      </button>
    </div>
    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
      <button class="btn mb-2 bg-gradient-light btn-md null null js-btn-prev" @click="previousStep" type="button">Prev</button>
      <button class="btn mb-2 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">Next</button>
    </div>
  </template>
  
  <script>
  import { interactionType} from "../utils/picklist.js";

  export default {
    name: "LeadManagementHistory",
    props: {
    LeadManagementInformation:{
      type: Object,
      required: true
    }
  },
    data() {
      return {
        interactionType: {...interactionType},
        subform: []
      };
    },
    watch: {
      LeadManagementInformation:{
      handler(){
        this.subform = this.LeadManagementInformation.LeadData || [];
        console.log("FormData lead LeadManagementInformation: ", this.subform)
      },
      immediate: true,
      deep: true
    }
  },
    methods: {
      nextStep(){
        this.$emit("next", {LeadData:this.subform});
      },
      previousStep(){
        this.$emit("previous");
      },
      // deleteLeadsRow(index) {
      addRowToLeadDataTable() {
        this.subform.push({
          interactionType: "",
          timeOfInteraction: "",
          contactAttempt: "",
          timeSpent: "",
          comments: "",
          interactionOutcome: "",
          probabilityOfClosure: ""
        });
      },
      deleteLeadsRow(index) {
        this.subform.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .main-heading {
    font-weight: 500 !important;
  }
  
  .form-control-default {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    width: 100%;
  }
  textarea.form-control-default {
  height: 38px; /* Match the height of the input fields */
  padding: 0.5rem; /* Match padding with other form controls */
  width: 100%;
}

  
  .my-0 {
    margin-bottom: 0 !important;
  }
  @media screen and (max-width:500px) {
  .space{
    margin-bottom: 150px !important;
  }
}
  </style>
  