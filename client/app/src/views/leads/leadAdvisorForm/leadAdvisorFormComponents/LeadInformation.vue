<template>
  <div class="card">
    <!-- Personal Details -->
    <div class="card custom-card">
      <div class="card-header pb-0">
        <h5 class="main-heading  mb-2 ps-1">Personal Details</h5>
        <div class="card-body">
          <div class="card-surface mb-2">
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="assignedAdvisor">Insurance Lead Owner <span
                    class="text-danger">*</span></label>
                <SingleSlelect class="form-select " id="insuranceLeadOwner" v-model="formData.insuranceLeadOwner"
                  :options="owners" />
                <span v-if="errors.insuranceLeadOwner" class="text-danger">{{
                  errors.insuranceLeadOwner
                  }}</span>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="insuranceLeadSource">Insurance Lead Source</label>
                <select class="form-select" id="insuranceLeadSource" v-model="formData.insuranceLeadSource">
                  <option v-for="(option, index) in insuranceLeadSourceOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="firstName">First Name</label>
                <input type="text" id="firstName" v-model="formData.firstName" class="form-control" />
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="lastName">Last Name</label>
                <input type="text" id="lastName" v-model="formData.lastName" class="form-control" />
                <span v-if="errors.lastName" class="text-danger">{{
                  errors.lastName
                  }}</span>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="mobile">Mobile</label>
                <input type="text" id="mobile" v-model="formData.mobile" class="form-control" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="areYouLLQPLicensed">Are You LLQP Licensed</label>
                <input type="text" id="areYouLLQPLicensed" v-model="formData.areYouLLQPLicensed" class="form-control" />
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="email">Email</label>
                <input type="email" id="email" v-model="formData.email" class="form-control" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="leadStatusStage">Lead Status Stage</label>
                <!-- <select class="form-select" id="leadStatusStage" v-model="formData.leadStatusStage">
      
          <option v-for="(option, index) in leadStatusOption" :key="index" :value="option">
            {{ option }}
          </option>
        </select> -->
                <SelectColorCode v-model="formData.leadStatusStage" :options="leadStatusOption" />

              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="dateOfBirth">Date of Birth</label>
                <input type="date" id="dateOfBirth" v-model="formData.dateOfBirth" class="form-control" />
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="assignedAdvisor">Assigned Advisor</label>
                <select class="form-select" id="assignedAdvisorOwner" v-model="formData.assignedAdvisor">
                  <option value="" disabled selected class="text-muted">
                    Select Owner
                  </option>
                  <option v-for="(userData, index) in adviosers" :key="index" :value="userData.ROWID">
                    {{ userData.name }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="gender">Gender</label>
                <select id="gender" v-model="formData.gender" class="form-select">
                  <option v-for="(option, index) in genderOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="isThisaReassignment">Is This a Reassignment</label>
                <select class="form-select" id="assignedAdvisorOwner" v-model="formData.isThisaReassignment">
                  <option value="" disabled selected class="text-muted">
                    Select Owner
                  </option>
                  <option v-for="(userData, index) in adviosers" :key="index" :value="userData.ROWID">
                    {{ userData.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="locationName">Location Name</label>
                <select class="form-select" id="locationNameOwner" v-model="formData.locationName">
                  <option value="" disabled selected class="text-muted">
                    Select Owner
                  </option>
                  <option v-for="(userData, index) in location" :key="index" :value="userData.ROWID">
                    {{ userData.name }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="genderPrediction">If referred by Advisor or External Referral -
                  Name</label>
                <select class="form-select" id="genderPrediction"
                  v-model="formData.ifReferredByAdvisorOrExternalReferral">
                  <option v-for="(option, index) in objectType" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="netWorth">Net Worth</label>
                <select class="form-select" id="netWorth" v-model="formData.netWorth">
                  <option v-for="(option, index) in understandingOfInsuranceOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="exchangeRate">Exchange Rate</label>
                <input type="text" id="exchangeRate" v-model="formData.exchangeRate" class="form-control" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="preferredContactMethod">Preferred Contact Method</label>
                <select id="gender" v-model="formData.preferredContactMethod" class="form-select">
                  <option v-for="(option, index) in preferredContactMethodOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="currency">Currency</label>
                <select v-model="formData.currency" class="form-select">
                  <option v-for="(option, index) in currency" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>


          </div>
        </div>
        <div class="card-body">
          <div class="card-surface mb-2">
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="preferredContactTime">Preferred Contact Time</label>
                <select id="gender" v-model="formData.preferredContactTime" class="form-select">
                  <option v-for="(option, index) in preferredContactTimeOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="socialMediaInformation">Social Media Information?</label>
                <select id="socialMediaInformation" v-model="formData.socialMediaInformation" class="form-select">
                  <option v-for="(option, index) in additionalContactInformationOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="roundRobinAssignmentTime">Round Robin Assignment Time</label>
                <input type="datetime-local" id="roundRobinAssignmentTime" v-model="formData.roundRobinAssignmentTime"
                  class="form-control" />
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="citizenshipStatus">Citizenship Status</label>
                <select class="form-select" id="citizenshipStatus" v-model="formData.citizenshipStatus">
                  <option v-for="(option, index) in citizenshipStatusOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="understandingOfInsurance">Understanding of Insurance</label>
                <select class="form-select" id="understandingOfInsurance" v-model="formData.understandingOfInsurance">
                  <option v-for="(option, index) in understandingOfInsuranceOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2">Existing Insurance Policy?</label>
                <select class="form-select" v-model="formData.existingInsurancePolicy">
                  <option v-for="(option, index) in objectType" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="leadCreatedOn">Lead Created On</label>
                <input type="date" id="leadCreatedOn" v-model="formData.leadCreatedOn" class="form-control" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="existingInsurancePolicy">Existing Policy Renewal Due By</label>
                <input type="date" id="existingInsurancePolicy" v-model="formData.existingPolicyRenewalDueBy"
                  class="form-control" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2">Old Database Lead?</label>
                <select class="form-select" v-model="formData.oldDatabaseLead">
                  <option v-for="(option, index) in objectType" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2">Do you own a home in Canada? </label>
                <select class="form-select" v-model="formData.doYouOwnaHomeInCanada">
                  <option v-for="(option, index) in objectType" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="genderPredictionScore">Gender Prediction Score</label>
                <input type="text" class="form-control" id="genderPredictionScore"
                  v-model="formData.genderPredictionScore" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2">Do you have life insurance? </label>
                <select class="form-select" v-model="formData.doYouhaveLifeInsurance">
                  <option v-for="(option, index) in objectType" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="coverageYouAreLookingFor">Coverage you are Looking for?</label>
                <input type="text" id="coverageYouAreLookingFor" v-model="formData.coverageYouAreLookingFor"
                  class="form-control" />
              </div>
              <!-- <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="mb-0 mt-2" for="areYouReadyToPurchaseThisLifeInsurancePoli">Are you ready to purchase this Life
          Insurance Policy</label>
        <input type="text" id="areYouReadyToPurchaseThisLifeInsurancePoli"
          v-model="formData.areYouReadyToPurchaseThisLifeInsurancePoli" class="form-control" />
      </div> -->
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="nextFollowUpDateTime">Next Follow Up Date & Time</label>
                <input type="datetime-local" id="nextFollowUpDateTime" v-model="formData.nextFollowUpDateTime"
                  class="form-control" />
              </div>
              <!-- <div class="col-lg-4 col-md-4 col-sm-12 mt-3">
        <div class="d-flex justify-content-start align-items-center">
          <label class="my-0 mx-2">Are you ready to purchase this Life Insurance Policy</label>
          <input v-model="formData.areYouReadyToPurchaseThisLifeInsurancePol" type="checkbox"
            class="form-check-input border" />
        </div>
      </div> -->
              <div class="col-lg-4 col-md-4 col-sm-12 mt-3">
                <div class="d-flex justify-content-start align-items-center">
                  <label class="mt-4 mx-2">Ready to purchase this life insurance policy?</label>
                  <input v-model="formData.readyForPurchase" type="checkbox" class="form-check-input border mt-4"
                    style="width: 16px; height: 16px;" />
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2">Additional Contact Information? </label>
                <select class="form-select" v-model="formData.additionalContactInformation">
                  <option v-for="(option, index) in additionalContactInformationOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="submitPageURL">Submit Page URL</label>
                <input type="text" id="submitPageURL" v-model="formData.submitPageURL" class="form-control" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="assignedCampaigns">Assigned Campaigns</label>
                <input type="text" id="assignedCampaigns" v-model="formData.assignedCampaigns" class="form-control" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="genderPrediction">Gender Prediction</label>
                <select class="form-select" id="genderPrediction" v-model="formData.genderPrediction">
                  <option v-for="(option, index) in genderOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="inboxURL">Inbox URL</label>
                <input type="text" id="inboxURL" v-model="formData.inboxURL" class="form-control" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="phoneNumber">Phone</label>
                <input type="number" id="phoneNumber" v-model="formData.phoneNumber" class="form-control" />
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="secondaryEmail">Secondary Email</label>
                <input type="text" id="secondaryEmail" v-model="formData.secondaryEmail" class="form-control" />
              </div>

              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="secondaryEmail">Fax</label>
                <input type="number" id="secondaryEmail" v-model="formData.fax" class="form-control" />
              </div>

              <div class="col-lg-4 col-md-4 col-sm-12">
                <label class="mb-0 mt-2" for="Referred-by">Referred by</label>
                <select class="form-select" id="Referred-by" v-model="formData.referredBy">
                  <option v-for="(option, index) in referredByOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row m-2 py-2 ps-2">
              <div class="col-lg-4 col-md-4 col-sm-12 mt-3">
                <div class="d-flex justify-content-start align-items-center">
                  <label class="my-0 mx-2">Round Robin Processed</label>
                  <input v-model="formData.roundRobinProcessed" type="checkbox" class="form-check-input border"
                    style="width: 16px; height: 16px;" />
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 mt-3">
                <div class="d-flex justify-content-start align-items-center">
                  <label class="my-0 mx-2">Email Round Robin Owner</label>
                  <input v-model="formData.emailRoundRobinOwner" type="checkbox" class="form-check-input border"
                    style="width: 16px; height: 16px;" />
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 mt-3">
                <div class="d-flex justify-content-start align-items-center">
                  <label class="my-0 mx-2">Eligible Round Robin Owner Found</label>
                  <input v-model="formData.eligibleRoundRobinOwnerFound" type="checkbox" class="form-check-input border"
                    style="width: 16px; height: 16px;" />
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-sm-12 mt-3">
                <div class="d-flex justify-content-start align-items-center">
                  <label class="my-0 mx-2">Re-Run Round Robin</label>
                  <input v-model="formData.reRunRoundRobin" type="checkbox" class="form-check-input border"
                    style="width: 16px; height: 16px;" />
                </div>
              </div>

              <div class="col-lg-4 col-md-4 col-sm-12 mt-3">
                <div class="d-flex justify-content-start align-items-center">
                  <label class="my-0 mx-2">RC SMS Opt Out</label>
                  <input v-model="formData.rcSmsOptOut" type="checkbox" class="form-check-input border"
                    style="width: 16px; height: 16px;" />
                </div>
              </div>
            </div>
            <div class="row ps-2">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <label class="mb-0 mt-2" for="additionalNotes">Description</label>
                <textarea id="additionalNotes" rows="4" v-model="formData.description" class="form-control"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4" style="margin-bottom:200px;">
    <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">
      Next
    </button>
  </div>
</template>

<script>
import mandatory from "../../utils/mandatroy.js";
import validateMandatoryFields from "../../../utils/util-js/validate.js";
import { getStatusColor } from "../../../utils/util-js/statusColorMap.js"; // ✅ Make sure this file exists

import {
  insuranceLeadSourceOptions,
  leadStatusOption,
  genderOption,
  objectType,
  additionalContactInformationOption,
  understandingOfInsuranceOption,
  citizenshipStatusOption,
  preferredContactTimeOption,
  preferredContactMethodOption,
  referredByOptions,
  currency
} from "../../utils/picklist";
import axios from "axios";
import { putUrl } from "../../../../boot/axios";
import { ref } from "vue";

import SingleSlelect from "../../../utils/SingleSlelect.vue";
import SelectColorCode from "../../../utils/SelectColorCode.vue";

export default {
  name: "ApplicationForm",
  props: {
    LeadInformation: {
      type: Object,
      required: true,
    },
    owners: {
      type: Array,
      required: true,
    },
    adviosers: {
      type: Array,
      required: true,
    },
    location: {
      type: Array,
      required: true,
    },
  },
  components: {
    SingleSlelect,
    SelectColorCode
  },
  data() {
    return {
      formData: { ...this.LeadInformation },
      insuranceLeadSourceOptions: { ...insuranceLeadSourceOptions },
      leadStatusOption: [],
      genderOption: { ...genderOption },
      objectType: { ...objectType },
      additionalContactInformationOption: {
        ...additionalContactInformationOption,
      },
      understandingOfInsuranceOption: { ...understandingOfInsuranceOption },
      citizenshipStatusOption: { ...citizenshipStatusOption },
      preferredContactTimeOption: { ...preferredContactTimeOption },
      referredByOptions: { ...referredByOptions },
      preferredContactMethodOption: { ...preferredContactMethodOption },
      errors: {},
      assignedOwner: ref([]),
      locationNameOwner: ref([]),
      assignedAdvisorOwner: ref([]),
      currency: [...currency]
    };
  },


  created() {
    this.leadStatusOption = leadStatusOption.map(name => ({
      ROWID: name,
      name,
      color: getStatusColor(name) || "#bdbdbd" // fallback if undefined
    }));
  },


  watch: {
    LeadInformation: {
      handler(formData) {
        formData = { ...this.LeadInformation };
        console.log("FormData lead LeadInformation: ", formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async getallusers() {
      try {
        const response = await axios.get(
          `${putUrl}uatServerFunction/api/v1/getAllUsers`
        );
        this.assignedOwner = response.data.map((item) => item.userData);

        console.log("this.assignedOwner <====>", this.assignedOwner);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async getAdvisors() {
      try {
        const response = await axios.get(
          `${putUrl}uatServerFunction/api/v1/getAllAdvisor`
        );
        this.assignedAdvisorOwner = response.data.map((item) => item.advisors);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async getLocations() {
      try {
        const response = await axios.get(
          `${putUrl}uatServerFunction/api/v1/getAllLocations`
        );
        this.locationNameOwner = response.data.map((item) => item.locations);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    nextStep() {
      this.errors = validateMandatoryFields(this.formData, mandatory);
      const validateFields = Object.keys(this.errors).length === 0;
      if (validateFields) {
        this.$emit("next", this.formData);
      }
    },
    // nextStep() {
    //   this.$emit('next', this.formData);
    // },
  },
};
</script>

<style scoped>
.main-heading {
  font-weight: 500 !important;
}

.multisteps-form__content label {
  font-size: var(--crm-font-regular) !important;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500 !important;
  /* font-style: ; */
  /* font-family: */
}

.multisteps-form .main-heading {
  font-weight: 500 !important;
}

select {
  height: 2.5rem !important;
  padding: 0px 0px 0px 10px !important;
}

.multisteps-form__panel {
  position: relative !important;
  display: none !important;
  transition: padding 0.3s ease;
  /* Add transition for smoother padding change */
  padding-bottom: 0;
  /* Initially set padding bottom to 0 */
}

.multisteps-form__panel.js-active {
  display: block !important;
}

.select-box select {
  display: content !important;
  border: 1px solid #e0e3e7 !important;
  border-radius: 10px;
}

.error {
  color: red;
  position: absolute;
}

.input-error-font-size {
  font-size: 12px;
}

.highlight {
  border: 1px solid red !important;
}
</style>
