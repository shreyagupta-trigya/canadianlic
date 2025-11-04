<template>
    <div class="px-4 mt-2">
        <div class="">
            <div class="row">
                <div class="heading-div">
                <h5 class="main-heading mb-0">Advisor Information</h5>
                </div>
                <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
                <label for="SelectedAdvisor" class="my-0">Contact Owner<span class="text-danger">*</span></label>
                <select class="form-select"
                    v-model="formData.advisorOwner" id="SelectedAdvisor">
                    <option value="" disabled selected class="text-muted">Select Owner</option>
                    <option
                    v-for="owner in ownersArr"
                    :key="owner.ROWID"
                    :value="owner.ROWID"
                  >
                    {{ owner.name }}
                  </option>
                </select>
                <span v-if="errors.advisorOwner" class="text-danger">{{
                  errors.advisorOwner
                }}</span>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6">
                <label for="first" class="form-label text-muted mb-1 mt-1">First Name
                </label>
                <input type="text" v-model="formData.firstName" class="form-control" id="first"
                    placeholder="First" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6">
                <label for="last" class="form-label text-muted mb-1 mt-1">Last Name <span
                    class="text-danger">*</span></label>
                <input type="text" v-model="formData.lastName" class="form-control" id="last" placeholder="Last"
                
                    />
                    <span v-if="errors.lastName" class="text-danger">{{
                      errors.lastName
                    }}</span>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6">
                <label for="Mobile" class="form-label text-muted mb-1 mt-1">Mobile <span
                    class="text-danger">*</span></label>
                <input type="text" v-model="formData.mobile" class="form-control" id="Mobile" placeholder="Mobile"/>
                    <span v-if="errors.mobile" class="text-danger">{{
                      errors.mobile
                    }}</span>
                </div>
                <!-- Email -->
                <div class="col-lg-4 col-md-4 col-sm-6">
                <label for="email" class="form-label text-muted mb-1 mt-1">Email <span
                    class="text-danger">*</span></label>
                <input type="email" v-model="formData.email" 
                
                    class="form-control" id="email" placeholder="Email" />
                    <span v-if="errors.email" class="text-danger">{{
                      errors.email
                    }}</span>
                </div>

                <div class="col-lg-4 mt-2 col-md-4 col-sm-6 mt-md-0">
                <label for="Landline" class="form-label text-muted mb-1 mt-1">Landline</label>
                <input type="text" v-model="formData.landline" class="form-control" id="Landline"
                    placeholder="Landline" />
                </div>
                <div class="col-lg-4 mt-2 col-md-4 col-sm-6">
                <label for="Location" class="form-label text-muted mb-1 mt-1">Location Name</label>
                <select class="form-select" v-model="formData.location" id="Location">
                    <option value="" disabled selected class="text-muted">
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
                </div>
                <div class="col-lg-4 mt-2 col-md-4 col-sm-6 mt-md-3">
                <label for="Lead-Source" class="my-0">Advisor Lead Source</label>
                <input type="text" v-model="formData.advisorLeadSource" class="form-control" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 mt-md-2">
                <label for="advisorsLicenceNumber" class="form-label text-muted mb-1 mt-1">Advisor's Licence
                    Number</label>
                <input type="number" v-model="formData.advisorsLicenceNumber" class="form-control"
                    id="advisorsLicenceNumber" placeholder="Number" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6">
                <label for="Whatsapp" class="form-label text-muted mb-1 mt-1">Whatsapp
                </label>
                <input type="text" v-model="formData.whatsapp" class="form-control" id="Whatsapp"
                    placeholder="Whatsapp" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 mb-0">
                <label for="appAdvisorId" class="form-label text-muted mb-1 mt-1">App Advisor ID
                </label>
                <input type="text" v-model="formData.appAdvisorId" class="form-control" id="appAdvisorId"
                    placeholder="appAdvisorId" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 mb-0">
                <label for="ciprNumber" class="form-label text-muted mb-1 mt-1">CIPR Number</label>
                <input type="text" v-model="formData.ciprNumber" class="form-control" id="ciprNumber"
                    placeholder="CIPR Number" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 mb-0">
                <label for="vendor" class="form-label text-muted mb-1 mt-1">Vendor</label>
                <select class="form-select" v-model="formData.vendor" id="vendor">
                  <option>test vendor</option>
                </select>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 mb-0">
                <label for="dateOfBirth" class="form-label text-muted mb-1 mt-1">
                    Advisor's Date of Birth
                </label>
                <input type="date" v-model="formData.advisorsDateofBirth"
                    class="form-control" id="advisorsDateofBirth"
                    placeholder="advisorsDateofBirth" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 mb-0">
                <label for="reviewedason" class="form-label text-muted mb-1 mt-1">Reviewed as on</label>
                <input type="text" v-model="formData.reviewedason" 
                    class="form-control" id="reviewedason" placeholder="Reviewed as on" />
                </div>
                <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
                <label for="Assigned-Advisor" class="my-0">Assigned Advisor</label>
                <select class="form-select" v-model="formData.assignedAdvisor" id="Assigned-Advisor">
                    <option value="" selected disabled class="text-muted">
                    Assigned Advisor
                    </option>
                    <!-- name is the rowID from contact and id is full name -->
                    <option
                    v-for="contact in contactsArr"
                    :key="contact.ROWID"
                    :value="contact.ROWID"
                  >
                    {{ contact.name }}
                  </option>
                </select>
                </div>

                <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
                <label for="Advisor-Cessation-Date" class="my-0">Advisor's Cessation Date
                </label>
                <input type="date" class="form-control" v-model="formData.cessationDate"
                    id="Advisor-Cessation-Date" />
                </div>
                <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
                <label for="dateOfHire" class="my-0">Advisor's Date of Hire
                </label>
                <input type="date" class="form-control" v-model="formData.dateOfHire" id="dateOfHire" />
                </div>
                <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
                <label for="appAdvisorID" class="my-0">App ID </label>
                <input type="text" v-model="formData.appID" class="form-control" id="appAdvisorID" />
                </div>

                <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
                <label for="My-Calendar" class="my-0">My Calendar </label>
                <input type="text" class="form-control" v-model="formData.myCalendar" id="My-Calendar" />
                </div>
                <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
                <label for="Advisor-Status" class="my-0">Advisor Status</label>
                <select class="form-select" v-model="formData.status" id="Advisor-Status">
                    <option value="Status" selected class="text-muted">
                    Status
                    </option>
                    <option v-for="(option, index) in advisorStatusOptions" :key="index" :value="option">
                {{ option }}
              </option>

                    <!-- Add more options as needed -->
                </select>
                </div>
                <div class="col-lg-4 mt-2 col-md-4 col-sm-4 mt-md-4">
                <label for="Advisor-Status" class="my-0">Currency</label>
                <select class="form-select" v-model="formData.currency" disabled id="currency">
                    <option value="CAD" selected class="text-muted">
                    CAD
                    </option>
                </select>
                </div>
                <!-- Desktop: 3 inputs in a row, Tablet: 2 inputs in a row, Mobile: 1 input in a row -->
                <div class="col-lg-4 mt-2 col-md-4 col-sm-4 mt-md-4">
                <label for="Exchange-Rate" class="my-0">Exchange Rate
                </label>
                <input type="number" v-model="formData.exchangeRate" class="form-control" id="Exchange-Rate"
                    disabled placeholder="Exchange Rate" />
                </div>
                <!-- Currency Ends-->
                <div class="col-lg-4 mt-2 col-md-4 col-sm-4 mt-md-0">
                <label for="eoPolicyNumber" class="my-0">Advisor's E&O Policy Number</label>
                <input type="text" v-model="formData.eoPolicyNumber" class="form-control" id="eoPolicyNumber" />
                </div>
                <div class="col-12 col-sm-4 mt-1 d-flex">
                <label class="form-check-label mt-1 me-2" for="checkbox-3">Additional Contact Information</label>
                <div class="form-check checkbox-lg">
                    <input v-model="formData.additionalContactInformation" class="form-check-input" type="checkbox"
                    value="" id="checkbox-3" />
                </div>
                </div>
                <div class="col-lg-4 mt-2 col-md-4 col-sm-4 d-flex">
                <label class="my-0 pe-2" for="Social-medea">
                    Social Media
                </label>
                <input class="form-check-input border" type="checkbox" v-model="formData.isSocial"
                    id="Social-medea" />
                </div>
                <div class="col-12 col-sm-4 mt-1 d-flex">
                <label class="form-check-label mt-1 me-2" for="checkbox-3">Inactive Advisor</label>
                <div class="form-check">
                    <input v-model="formData.inactiveAdvisor" class="form-check-input" type="checkbox" value=""
                    id="checkbox-3" />
                </div>
                </div>
                <div class="col-12 col-sm-4 mt-1 d-flex">
                <label class="form-check-label mt-1 me-2" for="checkbox-4">Email Opt Out</label>
                <div class="form-check">
                    <input v-model="formData.emailOptOut" class="form-check-input" type="checkbox" value=""
                    id="checkbox-4" />
                </div>
                </div>
                <div class="col-12 col-sm-4 mt-1 d-flex">
                <label class="form-check-label mt-1 me-2" for="checkbox-5">Remove From Campaign</label>
                <div class="form-check">
                    <input v-model="formData.removeFromCampaign" class="form-check-input" type="checkbox" value=""
                    id="checkbox-5" />
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
        
    </div>
</template>
<style>
</style>
<script>
import validateMandatoryFields from "../utils/validate.js";
import mandatory from "../utils/mandatory.js";
import {advisorStatusOptions} from "../utils/picklist";
export default {
  name: "Basic Info",
  props: {
    basicInfo: {
      type: Object,
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
    // advisors: {
    //   type: Array,
    //   required: true,
    // },
    location: {
      type: Array,
      required: true,
    },
    // leads: {
    //   type: Array,
    //   required: true,
    // },
  },
  data() {
    return {
      formData: { ...this.basicInfo },
      ownersArr: [...this.owners],
      contactsArr: [...this.contacts],
      locationArr: [...this.location],
      // advisorsArr: [...this.advisors],
      errors:{},
      advisorStatusOptions: [...advisorStatusOptions],
    //   dealOwnerOptions: [...dealOwnerOptions],
    //   stage: [...stage],
    //   forecastCategory: [...forecastCategory],
    //   type: [...type],
    //   currency: [...currency],
    };
  },
  watch: {
    basicInfo: {
      handler(formData) {
        formData = { ...this.basicInfo };       
        console.log("this formData", formData);
      },
      immediate: true,
      deep: true,
    },
    owners: {
      handler(ownersArr) {
        ownersArr = this.owners;
        console.log("<<<<<<<<<<==========this ownersArr =========>>>>>>>>>", ownersArr);
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
    // leads: {
    //   handler(leadsArr) {
    //     leadsArr = this.leads;
    //     console.log("this leadsArr", leadsArr);
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  methods: {    
    nextStep() { 
      this.errors = validateMandatoryFields(this.formData, mandatory);
      const validateFields = Object.keys(this.errors).length === 0;
      console.log("validateFields", this.errors);
      if (validateFields) {       
        this.$emit("next", this.formData);  
      }  
    },
  }
};
</script>
<style>
@media screen and (max-width:500px) {
  .space{
    margin-bottom:150px;
  }
}
</style>