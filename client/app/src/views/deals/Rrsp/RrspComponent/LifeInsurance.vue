<template>
    <!-- Insurance Inquiry Form -->
    <h5 class="main-heading mb-0 ps-2">Deal Information</h5>
    <div class="ps-2">
      <!-- Potential Business (Policy Values) -->
      <div class="row">
        <!-- Deal Name -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Deal Name <span class="text-danger">*</span></label>
          <input v-model="formData.dealName" type="text" class="form-control form-control-default" />
          <span v-if="errors.dealName" class="text-danger">{{
            errors.dealName
          }}</span>
        </div>
        <!-- Deal Owner -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Deal Owner <span class="text-danger">*</span></label>
          <select class="form-select" id="dealOwnerOptions" v-model="formData.dealOwner">
            <option value="" disabled selected class="text-muted">Select Owner</option>
            <option
              v-for="owner in ownersArr"
              :key="owner.ROWID"
              :value="owner.ROWID"
            >
              {{ owner.name }}
            </option>
          </select>
          <span v-if="errors.dealOwner" class="text-danger">{{
            errors.dealOwner
          }}</span>
        </div>
        <!-- Insurance Lead Source -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Insurance Lead Source </label>
          <select v-model="formData.insuranceLeadSource" class="form-select">
            <option
            v-for="(option, index) in insuranceLead"
            :key="index"
            :value="option"
          >
            {{ option }}   
          </option>       
          </select>
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Currency</label>
          <select v-model="formData.currency" class="form-select">
            <option v-for="(option, index) in currency" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>
        <!-- Insurance Lead Lookup -->
     
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Next Follow Up Date</label>
          <input v-model="formData.nextFollowUpDate" type="date" class="form-control">
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Stage <span class="text-danger">*</span></label>
          <select v-model="formData.stage" class="form-select">
            <option v-for="(option , index) in stage" :key="index" :value="option">{{ option }}</option>
          </select>
          <span v-if="errors.stage" class="text-danger">{{
            errors.stage
          }}</span>
        </div>
        <!-- Contact Name -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Contact Name</label>
          <select class="form-select" id="contactOwner" v-model="formData.contactName">
            <option value="" disabled selected class="text-muted">
              Select Contact
            </option>
            <option
              v-for="contact in contactsArr"
              :key="contact.ROWID"
              :value="contact.ROWID"
            >
              {{ contact.name }}
            </option>
          </select>
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Forecast Category</label>
          <select v-model="formData.forecastCategory" class="form-select">
            <option v-for="(option , index) in forecastCategory" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>

        <!--Location Name -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Location Name</label>
          <select class="form-select" id="locationNameOwner" v-model="formData.locationName">
            <option value="" disabled selected class="text-muted">Select Location</option>
            <option
              v-for="location in locationArr"
              :key="location.ROWID"
              :value="location.ROWID"
            >
              {{ location.name }}
            </option>
          </select>
        </div>
        <!--insurance Lead -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Insurance Lead Lookup</label>
          <select class="form-select" id="insuranceLeadLookup" v-model="formData.insuranceLeadLookup">
            <option value="" disabled selected class="text-muted">Select Lead</option>
            <option
              v-for="lead in leadsArr"
              :key="lead.ROWID"
              :value="lead.ROWID"
            >
              {{ lead.name }}
            </option>
          </select>
          <!-- <input v-model="formData.insuranceLead" type="text" class="form-control form-control-default" /> -->
        </div>
        <!--Exchange Rate -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Exchange Rate</label>
          <input :disabled='true' placeholder="1" v-model="formData.exchangeRate" type="text" class="form-control form-control-default" />
        </div>

        <!--Round Robin Assignment Time -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div>
            <label class="my-0" for="roundRobinAssignmentTime">Round Robin Assignment Time </label>
            <input type="datetime-local" class="form-control border" id="roundRobinAssignmentTime"
              v-model="formData.roundRobinAssignmentTime" />
          </div>
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Understanding of insurance</label>
          <input v-model="formData.understandingOfInsurance" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Lead Status Stage</label>
          <input v-model="formData.leadStatusStage" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Type</label>
          <select v-model="formData.type" class="form-select">
            <option v-for="(option, index) in type" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Coverage you are looking for?</label>
          <input v-model="formData.coverage" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Existing Insurance Policy ?</label>
          <input v-model="formData.existingInsurancePolicy" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="genderPrediction">Gender Predicition</label>
          <input v-model="formData.genderPrediction" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Do you have life insurance?</label>
          <input v-model="formData.lifeInsurance" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Referred by</label>
          <input v-model="formData.referredBy" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Do you own a home in Canada?</label>
          <input v-model="formData.doYouOwnAHomeInCanada" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Additional Contact Information?</label>
          <input v-model="formData.additionalContactInfo" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Citizenship Status</label>
          <input v-model="formData.citizenStatus" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Date of birth</label>
          <input v-model="formData.dob" type="date" class="form-control">
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Best Time To Call</label>
          <input v-model="formData.bestTimeToCall" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">SocialMediaInformation</label>
          <input v-model="formData.socialMediaInfo" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Preferred Contact Method</label>
          <input v-model="formData.preferredContactMethod" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="genderPredictionScore">GenderPredictionScore</label>
          <input v-model="formData.genderPredictionScore" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Old Database Lead?</label>
          <input v-model="formData.oldDatabaseLead" type="text" class="form-control form-control-default" />
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="emailIsValid">Email is Valid</label>
          <input type="text" id="emailIsValid" v-model="formData.emailIsValid" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="isThisaReassignment">Is this a Reassignment?</label>
          <input type="text" id="isThisaReassignment" v-model="formData.reassignment" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="emailIsValid">If referred by Advisor or External Referral - Name</label>
          <input type="text" id="ref" v-model="formData.ifreferredbyAdvisor" class="form-control" />
        </div>

        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="assignedAdvisor">Assigned Advisor</label>
          <input type="text" id="assignedAdvisor" v-model="formData.assignedAdvisor" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="leadCreatedOn">LeadCreatedOn</label>
          <input type="date" id="leadCreatedOn" v-model="formData.leadCreatedOn" class="form-control" />
        </div>
         <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="leadCreatedOn">Insurance Lead Status</label>
          <input type="text" id="insuranceLeadStatus" v-model="formData.insuranceLeadStatus" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="netWorth">Net Worth</label>
          <select class="form-select" id="netWorth" v-model="formData.netWorth">
            <option value="" disabled selected class="text-muted">Net Worth</option>
            <option value="-None-">-None-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="submitPageURL">Submit Page URL</label>
          <input type="text" id="submitPageURL" v-model="formData.submitPageURL" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
        <label class="my-0" for="assignedCampaigns">Assigned Campaigns</label>
        <textarea id="assignedCampaigns" v-model="formData.assignedCampaigns" rows="1" class="form-control"></textarea>
      </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="Email">Email</label>
          <input type="text" id="Email" v-model="formData.email" class="form-control" />
        </div>
        
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Gender</label>
          <input type="text" v-model="formData.gender" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Next Follow Up Date & Time</label>
          <input type="datetime-local" v-model="formData.nextFollowUpDateTime" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Existing Policy Renewal Due By</label>
          <input type="date" v-model="formData.existingPolicyRenewalDueBy" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Preferred Contact Time</label>
          <input type="text" v-model="formData.preferredContactTime" class="form-control" />
        </div>
             <div class="row mt-1">
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="reRunRoundRobin">Re-run round robin</label>
            <input type="checkbox" class="form-check-input border" id="reRunRoundRobin"
              v-model="formData.reRunRoundRobin" style="width: 16px; height: 16px;" />
          </div>
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="emailRoundRobinOwner">Email Round Robin Owner</label>
            <input type="checkbox" class="form-check-input border" id="emailRoundRobinOwner"
              v-model="formData.emailRoundRobinOwner" style="width: 16px; height: 16px;" />
          </div>
        </div>
        <!-- Round Robin Processed-->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="roundRobinProcessed">Round Robin Processed</label>
            <input type="checkbox" class="form-check-input border" id="roundRobinProcessed"
              v-model="formData.roundRobinProcessed" style="width: 16px; height: 16px;"  />
          </div>
        </div>

        <!-- Eligible Round Robin Owner Found-->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="eligibleOwner">Eligible Round Robin Owner Found</label>
            <input type="checkbox" class="form-check-input border" id="eligibleOwner"
              v-model="formData.eligibleRoundRobinOwnerFound" style="width: 16px; height: 16px;" />
          </div>
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="campaignRemove">Remove from Campaign 1</label>
            <input type="checkbox" class="form-check-input border" id="campaignRemove"
              v-model="formData.campaignRemove" style="width: 16px; height: 16px;" />
          </div>
        </div>
       
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="emailOutput">EmailOutput</label>
            <input type="checkbox" class="form-check-input border" id="emailOutput"
              v-model="formData.emailOutput" style="width: 16px; height: 16px;"  />
          </div>
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="rcSmsOptOut">Rc SMSOutput</label>
            <input type="checkbox" class="form-check-input border" id="rcSmsOptOut"
              v-model="formData.rcSmsOptOut" style="width: 16px; height: 16px;" />
          </div>
        </div>
        <!-- Combination or Hybrid Insurance -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="combinationHybridInsurance">Combination or Hybrid Insurance</label>
            <input type="checkbox" class="form-check-input border" id="combinationHybridInsurance"
              v-model="formData.combinationHybridInsurance" style="width: 16px; height: 16px;"  />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4 space"> 
    <button
      class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next"
      @click.prevent="nextStep"
      type="button"
    >
      Next
    </button>
  </div>
</template>

<script>
import {
  insuranceLead,
  // dealOwnerOptions,
  stage,
  forecastCategory,
  type,
  currency,
} from "../../utils/picklist.js";
import mandatory from "../../utils/lifeCriticalInsurance/mandatory.js";
import validateMandatoryFields from "../../../utils/util-js/validate.js";

export default {
  name: "InsuranceInquiryForm",
  props: {
    LifeInsurance: {
      type: Object,
    },
    owners: {
      type: Array,
      required: true,
    },
    contacts: {
      type: Array,
      required: true,
    },
    location: {
      type: Array,
      required: true,
    },
    leads: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formData: { ...this.LifeInsurance },
      ownersArr: [...this.owners],
      contactsArr: [...this.contacts],
      locationArr: [...this.location],
      leadsArr: [...this.leads],
      errors:{},
      insuranceLead: [...insuranceLead],
      // dealOwnerOptions: [...dealOwnerOptions],
      stage: [...stage],
      forecastCategory: [...forecastCategory],
      type: [...type],
      currency: [...currency],
    }
  },
  watch: {
    LifeInsurance: {
      handler(formData) {
        formData = { ...this.LifeInsurance };
        console.log("this formData", formData);
      },
      immediate: true,
      deep: true,
    },
    owners: {
      handler(ownersArr) {
        ownersArr = this.owners;
        console.log("this ownersArr =========>>>>>>>>>", ownersArr);
      },
      immediate: true,
      deep: true,
    },
    contacts: {
      handler(contactsArr) {
        contactsArr = this.contacts;
        console.log("this contactsArr", contactsArr);
      },
      immediate: true,
      deep: true,
    },
    location: {
      handler(locationArr) {
        locationArr = this.location;
        console.log("this locationArr", locationArr);
      },
      immediate: true,
      deep: true,
    },
    leads: {
      handler(leadsArr) {
        leadsArr = this.leads;
        console.log("this leadsArr", leadsArr);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    nextStep() {
      this.errors = validateMandatoryFields(this.formData, mandatory);
      const validateFields = Object.keys(this.errors).length === 0;
      console.log("validateFields", validateFields);
      console.log("errors", this.errors);
      
      if(validateFields){
      this.$emit("next", { ...this.formData});  
      }
    }   
  },
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
    margin-bottom:150px;
  }
}
</style>