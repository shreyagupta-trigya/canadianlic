<template>
    <div>
      <h5 class="main-heading mt-2">Lead Management History</h5>
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
              <th> Interaction Outcome</th>
              <th> Probability of Closure</th>
              <th> Probability of Closure</th>
              <th> Number of Contact Attempts.</th>
              <th>Average Time Spent (Minutes)</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="(parent, index) in formData.LeadData" :key="index">
              <td class="m-auto">{{ index + 1 }}</td>
              <td>
                <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                  <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                </a>
              </td>
              <td>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
                  <div class="select-box">
                    <select v-model="parent.interactionType" class="multisteps-form__select form-control choices__input" name="choices-state">
                      <option value="Email">Email</option>
                      <option value="Call">Call</option>
                      <option value="Meeting">Meeting</option>
                      <!-- Add other options as needed -->
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
              <td>
                <textarea v-model="parent.comments" class="form-control form-control-default" rows="1"></textarea>
              </td>
              <td>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
                  <div class="select-box">
                    <select v-model="parent.interactionOutcome" class="multisteps-form__select form-control choices__input" name="choices-state">
                      <option value="..">xyz</option>
                      <option value="..">xyz</option>
                      <option value="..">xyz</option>
                      <!-- Add other options as needed -->
                    </select>
                  </div>
                </div>
              </td>
              <td>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
                  <div class="select-box">
                    <select v-model="parent.probabilityOfClosure" class="multisteps-form__select form-control choices__input" name="choices-state">
                      <option value="..">xyz</option>
                      <option value="..">xyz</option>
                      <option value="..">xyz</option>
                      <!-- Add other options as needed -->
                    </select>
                  </div>
                </div>
              </td>
              <td>
                <input v-model="parent.probabilityofClosure" type="text" class="form-control form-control-default" autocomplete="off" disabled>
              </td>
              <td>
                <input v-model="parent.numberOfContactAttempts" type="text" class="form-control form-control-default" autocomplete="off" disabled>
              </td>
              <td>
                <input v-model="parent.averageTimeSpent" type="text" class="form-control form-control-default" autocomplete="off" disabled>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToLeadDataTable">
        Add Row
      </button>
    </div>
    <div class="button-row d-flex justify-content-center mt-2 gap-4">
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button">Prev</button>
      <button v-if="!id" class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button"
        @click.prevent="sendData">
        Submit
      </button>       
       </div>
  </template>
  <script>
  export default {
    name: "LeadManagementHistory",
    props:{
      getLeadMgmt:{
        type: Function,
        required: true
      }
    },
    data() {
      return {
        formData: {
          LeadData: []
        }
      };
    },
    methods: {
      sendData(){
        this.getLeadMgmt(this.formData);
      },
      addRowToLeadDataTable() {
        this.formData.LeadData.push({
          interactionType: "",
          timeOfInteraction: "",
          contactAttempt: "",
          timeSpent: "",
          comments: "",
          interactionOutcome:"",
          probabilityOfClosure:"",
           probabilityofClosure:"",
          numberOfContactAttempts:"",
          averageTimeSpent :"",
        });
      },
      deleteLeadsRow(index) {
        this.formData.LeadData.splice(index, 1);
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
  </style>
  