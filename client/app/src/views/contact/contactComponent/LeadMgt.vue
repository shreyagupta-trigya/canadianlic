<template>
  <div>
    <div class="card custom-card mb-4">
      <div class="card-body mb-5">
        <div class="card-surface">
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
                    <th> Interaction Outcome</th>
                    <th> Probability of Closure</th>

                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(parent, index) in LeadMgtData" :key="index">
                    <td class="m-auto">{{ index + 1 }}</td>
                    <td>
                      <a @click.prevent="deleteaddRowToLeadMgt(index)" href="javascript:;" data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product">
                        <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                      </a>
                    </td>
                    <td>
                      <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                        aria-expanded="false">
                        <div class="select-box">
                          <select v-model="parent.interactionType"
                            class="multisteps-form__select form-control choices__input" name="choices-state">
                            <option value="Email">Email</option>
                            <option value="Call">Call</option>
                            <option value="Text">Text</option>
                            <option value="Visit">Visit</option>
                            <option value="Video Call">Video Call</option>
                            <option value="Zoho Chat">Zoho Chat</option>
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
                          <select v-model="parent.interactionOutcome"
                            class="multisteps-form__select form-control choices__input" name="choices-state">
                            <option value="-None-">-None-</option>
                            <option value="Deferred">Deferred</option>
                            <option value="Purpose Achieved">Purpose Achieved</option>
                            <option value="Purpose Not Achieved">Purpose Not Achieved</option>
                            <!-- Add other options as needed -->
                          </select>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                        aria-expanded="false">
                        <div class="select-box">
                          <select v-model="parent.probabilityOfClosure"
                            class="multisteps-form__select form-control choices__input" name="choices-state">
                            <option value="-None-">-None-</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                            <!-- Add other options as needed -->
                          </select>
                        </div>
                      </div>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

            <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToLeadMgt">
              Add Row
            </button>

          </div>
          <div class="w-100 d-flex justify-content-end mb-4">
            <div class="w-50 border rounded py-3 px-2">
              <div class="row">
                <!-- Total Interaction Time (mins) -->
                <div class="col-lg-6 mt-2 col-md-6 col-sm-12">
                  <label class="my-0 mx-2" for="totalInteractionTime">Total Interaction Time (mins)</label>
                </div>
                <div class="col-lg-6 mt-2 col-md-6 col-sm-12">
                  <input type="text" class="form-control" id="totalInteractionTime"
                    v-model="formData.totalInteractionTime" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="card custom-card mb-4">
    <div class="card-body mb-5">
      <div class="card-surface">
        <div class="row g-3">
          <Notes :id="leadId" />
        </div>
      </div>
    </div>
  </div>

  <div class="button-row d-flex justify-content-center mt-4 gap-4">
    <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button" @click="previousStep">
      Prev
    </button>
    <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">
      Submit
    </button>
  </div>
</template>
<script>


import Notes from '../../utils/Notes.vue';
export default {
  name: "LeadMgtInformation",
  props: {
    leadMgt: {
      type: Object,
      required: true
    }
  },
  components: {
    Notes
  },
  data() {
    return {
      formData: { ...this.leadMgt },
      LeadMgtData: [],
      isNotesDrawerOpen: false,
    };
  },
  watch: {
    leadMgt: {
      handler(formData) {
        formData = { ...this.leadMgt };
        this.LeadMgtData = this.leadMgt.LeadMgtData || [];
        console.log("this formData  LeadMgt", formData);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addRowToLeadMgt() {
      this.LeadMgtData.push({
        interactionType: "",
        timeOfInteraction: "",
        contactAttempt: "",
        timeSpent: "",
        comments: "",
        interactionOutcome: "",
        probabilityOfClosure: "",
        referraltilldateLife: "",
      });
    },
    deleteaddRowToLeadMgt(index) {
      this.LeadMgtData.splice(index, 1);
    },
    nextStep() {
      this.$emit("next", { ...this.formData, LeadMgtData: this.LeadMgtData });
    },
    previousStep() {
      this.$emit("previous");
    },
  }
};
</script>

<style>
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