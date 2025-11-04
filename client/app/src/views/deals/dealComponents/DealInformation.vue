<template>
  <div>
    <!-- Insurance Inquiry Form -->
    <h5 class="main-heading mb-0 ps-2">Deal Info</h5>
    <div style="">
      <!-- Potential Business (Policy Values) -->
      <div class=" row mt-3 ps-2 ">
        <!-- Deal Name -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0"
            >Deal Name <span class="text-danger">*</span></label
          >
            <input
              v-model="formData.dealName"
              type="text"
              class="form-control form-control-default"
            />
            <span v-if="errors.dealName" class="text-danger">{{
              errors.dealName
            }}</span>
        </div>
        <!-- Deal Owner -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Deal Owner <span class="text-danger">*</span></label>
          <select
            class="form-select"
            id="dealOwnerOptions"
            v-model="formData.dealOwner"
          >
            <option value="" selected class="text-muted">Select Owner</option>
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
        <div class="col-lg-4 col-md-4 col-sm-12">
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
      </div>

      <!-- Currency -->
      <div class="row ps-2">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Currency</label>
          <select v-model="formData.currency" class="form-select">
            <option
              v-for="(option, index) in currency"
              :key="index"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <!-- Insurance Lead Lookup -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Insurance Lead Lookup</label>
          <select
            class="form-select"
            id="leadOwner"
            v-model="formData.insuranceLeadLookup"
          >
            <option value="" selected class="text-muted">
              Select Lead Lookup
            </option>
            <option
              v-for="lead in leadsArr"
              :key="lead.ROWID"
              :value="lead.ROWID"
            >
              {{ lead.name }}
            </option>
          </select>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Type</label>
          <select v-model="formData.type" class="form-select">
            <option
              v-for="(option, index) in type"
              :key="index"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <!-- Stage -->
      <div class=" row mt-3 ps-2">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Stage</label>
          <select v-model="formData.stage" class="form-select">
            <option
              v-for="(option, index) in stage"
              :key="index"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Contact Name -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Contact Name <span class="text-danger">*</span></label>
          <select
            class="form-select"
            id="contactOwner"
            v-model="formData.contactName"
          >
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
          <span v-if="errors.contactName" class="text-danger">{{
            errors.contactName
          }}</span>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Forecast Category</label>
          <select v-model="formData.forecastCategory" class="form-select">
            <option
              v-for="(option, index) in forecastCategory"
              :key="index"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div class="row ps-2">
        <!--Location Name -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Location Name <span class="text-danger">*</span> </label>
          <select
            class="form-select"
            id="locationNameOwner"
            v-model="formData.locationName"
          >
            <option value="" selected class="text-muted">
              Select Location
            </option>
            <option
              v-for="location in locationArr"
              :key="location.ROWID"
              :value="location.ROWID"
            >
              {{ location.name }}
            </option>
          </select>
          <span v-if="errors.locationName" class="text-danger">{{
            errors.locationName
          }}</span>
        </div>
        <!--insurance Lead -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Insurance Lead <span class="text-danger">*</span></label>
          <select
            class="form-select"
            id="leadOwner"
            v-model="formData.insuranceLead"
          >
            <option value="" selected class="text-muted">Select Lead</option>
            <option
              v-for="lead in leadsArr"
              :key="lead.ROWID"
              :value="lead.ROWID"
            >
              {{ lead.name }}
            </option>
          </select>
          <span v-if="errors.insuranceLead" class="text-danger">{{
            errors.insuranceLead
          }}</span>
          <!-- <input v-model="formData.insuranceLead" type="text" class="form-control form-control-default" /> -->
        </div>
        <!--Exchange Rate -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Exchange Rate</label>
          <input
            v-model="formData.exchangeRate"
            type="number"
            class="form-control form-control-default"
          />
        </div>
      </div>
      <!--Re-run round robin -->
      <div class=" row mt-3 ps-2">
        <!--PhoneBurner Follow Up Date -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">PhoneBurner Follow Up Date</label>
          <input
            v-model="formData.phoneBurnerFollowUpDate"
            type="date"
            class="form-control"
          />
        </div>
        <!--Round Robin Assignment Time -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <div>
            <label class="my-0 mx-2" for="roundRobinAssignmentTime"
              >Round Robin Assignment Time
            </label>
            <input
              type="datetime-local"
              class="form-control border"
              id="roundRobinAssignmentTime"
              v-model="formData.roundRobinAssignmentTime"
            />
          </div>
        </div>
        <!--PhoneBurner Last Call Time  -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <div>
            <label class="my-0 mx-2" for="phoneBurnerLastCallTime"
              >PhoneBurner Last Call Time
            </label>
            <input
              type="datetime-local"
              class="form-control border"
              id="phoneBurnerLastCallTime"
              v-model="formData.phoneBurnerLastCallTime"
            />
          </div>
        </div>
      </div>
      <div class=" row mt-3 ps-2">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <div>
            <label class="my-0 mx-2" for="phoneBurnerLastCallTime"
              >PhoneBurner Last Call Outcome</label
            >
            <input
              type="text"
              class="form-control border"
              id="phoneBurnerLastCallOutcome"
              v-model="formData.phoneBurnerLastCallOutcome"
            />
          </div>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="reRunRoundRobin"
              >Re-run round robin</label
            >
            <input
              type="checkbox"
              class="form-check-input border"
              id="reRunRoundRobin"
              v-model="formData.reRunRoundRobin"
              style="width: 16px; height: 16px;" 
            />
          </div>
        </div>
      </div>
      <div class=" row mt-3 ps-2">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="emailRoundRobinOwner"
              >Email Round Robin Owner</label
            >
            <input
              type="checkbox"
              class="form-check-input border"
              id="emailRoundRobinOwner"
              v-model="formData.emailRoundRobinOwner"
              style="width: 16px; height: 16px;" 
            />
          </div>
        </div>
        <!-- Round Robin Processed-->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="roundRobinProcessed"
              >Round Robin Processed</label
            >
            <input
              type="checkbox"
              class="form-check-input border"
              id="roundRobinProcessed"
              v-model="formData.roundRobinProcessed"
              style="width: 16px; height: 16px;" 
            />
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="eligibleOwner"
              >Eligible Round Robin Owner Found</label
            >
            <input
              type="checkbox"
              class="form-check-input border"
              id="eligibleOwner"
              v-model="formData.eligibleRoundRobinOwnerFound"
              style="width: 16px; height: 16px;" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4 space" >
    <!-- <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button"  @click.prevent="previousStep">Prev</button> -->
    <button
      class="btn mb-2 bg-gradient-dark btn-md null null js-btn-next"
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
  dealOwnerOptions,
  stage,
  forecastCategory,
  type,
  currency,
} from "../utils/picklist.js";
import mandatory from "../utils/mandatory.js";
import validateMandatoryFields from "../../utils/util-js/validate.js";

export default {
  name: "InsuranceInquiryForm",
  props: {
    DealInformation: {
      type: Object,
    },
    getDealInfo: {
      type: Function,
      required: true,
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
      formData: { ...this.DealInformation },
      ownersArr: [...this.owners],
      contactsArr: [...this.contacts],
      locationArr: [...this.location],
      leadsArr: [...this.leads],
      errors:{},
      insuranceLead: [...insuranceLead],
      dealOwnerOptions: [...dealOwnerOptions],
      stage: [...stage],
      forecastCategory: [...forecastCategory],
      type: [...type],
      currency: [...currency],
    };
  },
  watch: {
    DealInformation: {
      handler(formData) {
        formData = { ...this.DealInformation };
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
      if(validateFields){
      this.$emit("next", this.formData);
    }
  },
    previousStep() {
      this.$emit("previous");
    },
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
    margin-bottom:100px;
  }
}
</style>
