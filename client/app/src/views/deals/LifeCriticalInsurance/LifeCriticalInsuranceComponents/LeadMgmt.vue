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
            <th>Comments</th>
            <th>Interaction Outcome</th>
            <th>Probability of Closure</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(parent, index) in LeadData" :key="index">
            <td class="m-auto">{{ index + 1 }}</td>
            <td>
              <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip"
                data-bs-original-title="Delete product">
                <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
              </a>
            </td>
            <td>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="parent.interactionType" class="multisteps-form__select form-control choices__input"
                    name="choices-state">
                    <option value="Email">Email</option>
                    <option value="Call">Call</option>
                    <option value="Meeting">Meeting</option>
                    <!-- Add other options as needed -->
                  </select>
                </div>
              </div>
            </td>
            <td>
              <input v-model="parent.timeOfInteraction" type="datetime-local"
                class="form-control form-control-default" autocomplete="off">
            </td>
            <td>
              <input v-model="parent.contactAttempt" type="number" class="form-control form-control-default"
                autocomplete="off">
            </td>
            <td>
              <input v-model="parent.timeSpent" type="number" class="form-control form-control-default"
                autocomplete="off">
            </td>
            <td>
              <textarea v-model="parent.comments" class="form-control form-control-default" rows="1"></textarea>
            </td>
            <td>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="parent.probabilityOfClosure"
                    class="multisteps-form__select form-control choices__input" name="choices-state">
                    <option value="None">-None-</option>
                    <option value="Deferred">Low</option>
                    <option value="Purpose Achieved">Moderate</option>
                    <option value="Purpose Not Achieved">High</option>
                    <!-- Add other options as needed -->
                  </select>
                </div>
              </div>
            </td>
            <td>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="parent.interactionOutcome"
                    class="multisteps-form__select form-control choices__input" name="choices-state">
                    <option value="None">-None-</option>
                    <option value="Deferred">Deferred</option>
                    <option value="Purpose Achieved">Purpose Achieved</option>
                    <option value="Purpose Not Achieved">Purpose Not Achieved</option>
                    <!-- Add other options as needed -->
                  </select>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToLeadDataTable">
      Add Row
    </button>
  </div>
  <div class="w-100 d-flex justify-content-end mb-4">
    <div class="w-50 border rounded py-3 px-2">
      <div class="row">
        <!-- Number of Contact Attempts -->
        <div class="col-lg-6 mt-2 col-md-6 col-sm-12">  <label class="my-0 mx-2" for="totalInteractionTime">Total Interaction Time (mins)</label></div>
         <!-- Total Interaction Time (mins) -->

         <div class="col-lg-6 mt-2 col-md-6 col-sm-12">
          <label class="my-0 mx-2" for="totalInteractionTime">Total Interaction Time (mins)</label>
          <input type="text" class="form-control" id="totalInteractionTime" v-model="formData.totalInteractionTime"/>
        </div>  
      </div>
      <div class="row">
        <!-- Number of Contact Attempts -->
        <div class="col-lg-6 mt-2 col-md-6 col-sm-12"> 
          <label class="my-0 mx-2" for="numberOfContactAttempts">Number of Contact Attempts</label></div>
        <div class="col-lg-6 mt-2 col-md-6 col-sm-12">
          <input type="text" class="form-control" id="numberOfContactAttempts"
            v-model="formData.numberOfContactAttempts" />
        </div>
      </div>

    </div>
  </div>
  <div class="button-row d-flex justify-content-center mt-2 gap-4 space" >
    <button
    class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
    type="button"
    @click="previousStep"
  >
    Prev
  </button>
  <button
  v-if="!id"
  class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
  type="button"
  @click.prevent="nextStep"
>
  Submit
</button> 
  </div>
</template>
<script>
export default {
  name: "LeadManagementHistory",
  props: {
    LeadMgmt: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
     formData: {...this.LeadMgmt},
     LeadData:{},
    }
  },
  watch: {
    LeadMgmt: {
      handler() {
        console.log("<<<<<<<<<<<INSERT THE WATCH FOR DEALOWNERSHIP>>>>>>>>>>>>>>>>>>>>>>>>>")
        this.formData = { ...this.LeadMgmt };
        this.LeadData = this.LeadMgmt.LeadData || [];       
        console.log("<<<<<<<<< == this formData LeadMgmt ==>>>>>>>>>", this.formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: { 
    nextStep() {
      this.$emit("next", { ...this.formData, LeadData: this.LeadData });
    },
    previousStep() {
      this.$emit("previous");
    },
    addRowToLeadDataTable() {
      this.LeadData.push({
        interactionType: "",
        timeOfInteraction: "",
        contactAttempt: "",
        timeSpent: "",
        comments: "",
        interactionOutcome: ""
      });
    },
    deleteLeadsRow(index) {
      this.LeadData.splice(index, 1);
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

.my-0 {
  margin-bottom: 0 !important;
}
@media screen and (max-width:500px) {
  .space{
    margin-bottom: 150px !important;
  }
}
</style>