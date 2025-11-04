<template>
  <div>
    <h5 class="main-heading mt-2 ps-2">Renewal History</h5>
    <div class="col-lg-4 col-sm-12 mt-2 mb-3 ps-2">
      <label class="my-0">Total Renewal Commissions (CA$</label>
      <div class="">
        <input v-model="formData.totalRenewalCommissions" type="number" disabled
          class="form-control form-control-default" isrequired="false" autocomplete="off" />
      </div>
    </div>
    <div style="width: 100%; overflow: scroll">
      <table class="table border table-responsive subform">
        <thead class="table subform-table-head text-white">
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Premium Frequency</th>
            <th>Premium Amount (CA$)</th>
            <th>Policy Amount (CA$)</th>
            <th>Policy Issued Date</th>
            <th>Policy Renewed Date</th>
            <th>Was Medical Required?</th>
            <th>Renewal Commission (CA$)</th>
            <th>Policy Advisor</th>

          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(parent, index) in renewalsHistoryData" :key="index">
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
                  <select v-model="parent.premiumFrequency" class="multisteps-form__select form-control choices__input"
                    name="choices-state">
                    <option v-for="(option, index) in premiumFrequencyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>

                  </select>
                </div>
              </div>
            </td>
            <td>
              <input v-model="parent.premiumAmount" type="number" class="form-control form-control-default"
                autocomplete="off">
            </td>
            <td>
              <input v-model="parent.policyAmount" type="number" class="form-control form-control-default"
                autocomplete="off">
            </td>
            <td>
              
                <div class="input-group bg-white">
            <flat-pickr v-model="parent.policyIssuedDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
              class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
              ref="fpDateOfBirth" />
            <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
              <i class="fa fa-calendar"></i>
            </span>
          </div>
            </td>
            <td>
             
                <div class="input-group bg-white">
            <flat-pickr v-model="parent.policyRenewalDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
              class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
              ref="fpDateOfBirth" />
            <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
              <i class="fa fa-calendar"></i>
            </span>
          </div>
            </td>
            <td>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="parent.medicalRequired" class="multisteps-form__select form-control choices__input"
                    name="choices-state">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>


                  </select>
                </div>
              </div>
            </td>
            <td>
              <input v-model="parent.renewalCommission" type="text" class="form-control form-control-default"
                autocomplete="off">
            </td>

            <td>
              <textarea v-model="parent.PolicyAdvisor" class="form-control form-control-default" rows="1"></textarea>
            </td>


          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToRenewalHistoryTable">
      Add Row
    </button>
  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4">
    <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button" @click="prevStep">
      Prev
    </button>

    <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button" @click.prevent="nextStep">
      Submit
    </button>
  </div>
</template>
<script>
import { premiumFrequencyOptions, clientFirstPolicyOptions } from "../../utils/picklist.js";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
  components: { flatPickr },
  props: {
    History: {
      type: Object,
      required: true
    }
  },
  watch: {
    History: {
      handler() {
        this.formData = { ...this.History };
        this.renewalsHistoryData = this.History?.renewalsHistoryData || [];
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      datePickerConfig: {
        dateFormat: "d/m/Y", // DD/MM/YYYY
        allowInput: true
      },
      dateTimePickerConfig: {
        dateFormat: "d/m/Y H:i", // DD/MM/YYYY HH:mm
        allowInput: true,
        enableTime: true,
        time_24hr: true
      },
      formData: { ...this.History },
      renewalsHistoryData: [],
      clientFirstPolicyOptions: { ...clientFirstPolicyOptions },
      premiumFrequencyOptions: { ...premiumFrequencyOptions },
    };
  },
  methods: {
    openDatePicker() {
      if (this.$refs.fpDateOfBirth && this.$refs.fpDateOfBirth.fp) {
        this.$refs.fpDateOfBirth.fp.open()
      }
      },
      addRowToRenewalHistoryTable() {
        this.renewalsHistoryData.push({
          premiumFrequency: "",
          premiumAmount: "",
          policyAmount: "",
          policyIssuedDate: "",
          policyRenewalDate: "",
          medicalRequired: "",
          renewalCommission: "",
          PolicyAdvisor: ""
        });
      },
      deleteLeadsRow(index) {
        this.renewalsHistoryData.splice(index, 1);
      },
      nextStep() {
        this.$emit('next', { ...this.formData, renewalsHistoryData: this.renewalsHistoryData });
      },
      prevStep() {
        this.$emit('previous');
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