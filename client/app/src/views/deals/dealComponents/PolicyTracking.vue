<template>
  <div>
    <!-- Insurance Inquiry Form -->
    <h5 class="main-heading mb-0 ps-2">Policy Tracking</h5>
    <div>
      <!-- Potential Business (Policy Values) -->
      <div class="row ps-2">
        <!--Application Initiated On-->
        <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Application Initiated On</label>
        <input v-model="formData.initiatedDate" type="date" class="form-control">
      </div>
        <!--Next Follow Up Date-->
        <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Next Follow Up Date</label>
        <input v-model="formData.nextFollowUpDate" type="date" class="form-control">
      </div>
      <!--Amendment Requested Date-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Amendment Requested Date</label>
        <input v-model="formData.amendmentRequestedDate" type="date" class="form-control">
      </div>
      </div>
      <!-- Amendment Requested for? -->
      <div class="row mt-3 ps-2">
          <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Amendment Requested for?</label>
          <textarea v-model="formData.amendmentRequestedFor" class="form-control form-control-default" rows="1"></textarea>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Application Medical requirement?</label>
          <select v-model="formData.applicationMedicalRequirement" class="form-select">
            <option v-for="(option , index) in medicalNeeds" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>
        <!-- Application Medical Confirmation Number -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Application Medical Confirmation Number</label>
        <input v-model="formData.applicationConfirmationNumber" type="text" class="form-control form-control-default" />
      </div>
      </div>
      <!-- Application Medical requirement? -->
      <div class="row mt-3 ps-2">   
      <!--Amendment Completed Date-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Amendment Completed Date</label>
        <input v-model="formData.amendmentCompletedDate" type="date" class="form-control">
      </div>     
        <!--Application Medical Appointment Date & Time -->
        <div class="col-lg-4 col-md-4 col-sm-12">
       <div>
      <label class="my-0 mx-2" for="applicationMedicalAppointment">Application Medical Appointment Date & Time </label>
      <input type="datetime-local" class="form-control border" id="applicationMedicalAppointment" v-model="formData.applicationMedicalAppointmentDateTime" />
      </div>
    </div>
      <!--Application Cancelled-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Application Cancelled</label>
        <input v-model="formData.applicationCancelled" type="date" class="form-control">
      </div>
      </div>
      <div class="row mt-3 ps-2">
      <!--Application Postponed To-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Application Postponed </label>
        <input v-model="formData.applicationPostponed" type="date" class="form-control">
      </div>  
      <!--Policy Declined Date-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Declined Date</label>
        <input v-model="formData.policyDeclinedDate" type="date" class="form-control">
      </div>  
      <!--Policy Approved Date-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Approved Date</label>
        <input v-model="formData.policyApprovedDate" type="date" class="form-control">
      </div>
      </div>
      <div class="row mt-3 ps-2">
       <!--Reasons for Policy being Declined-->
       <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Reasons for Policy being Declined</label>
          <textarea v-model="formData.policyDeclinedReason" class="form-control form-control-default" rows="1"></textarea>
          </div>
        <!--Approval Rating  -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Approval Rating </label>
          <select v-model="formData.approvalRating" class="form-select">
            <option v-for="(option , index) in rating" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>
        <!--Premiums Paid during Pick Up Period -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Premiums Paid during Pick Up Period</label>
          <select v-model="formData.pickupPeriod" class="form-select">
            <option v-for="(option , index) in objectType" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
      <div class="row mt-3 ps-2">
      <!--Policy Start Date-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Start Date</label>
        <input v-model="formData.startDate" type="date" class="form-control">
      </div>
      <!--Policy Picked Up On-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Picked Up On</label>
        <input v-model="formData.policyPickedUp" type="date" class="form-control">
      </div>
      <!--Policy Issued Date-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Issued Date</label>
        <input v-model="formData.issuedDate" type="date" class="form-control">
      </div>
      </div>
    </div>
    <div class="button-row d-flex justify-content-center mt-4 gap-4 space" >
      <button class="btn mb-1 bg-gradient-light btn-md null null js-btn-prev" type="button" @click="previousStep">Prev</button>
      <button class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">Next</button>
    </div>
  </div>
</template>

<script>
import {medicalNeeds,rating,objectType} from "../utils/picklist.js";
export default {
  name: "InsuranceInquiryForm",
  props: {
    PolicyTracking: {
    type: Object,
    required: true
    },
    getDealPolicyTracking: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      formData : {...this.PolicyTracking},
      medicalNeeds: {...medicalNeeds},
      rating: {...rating},
      objectType: {...objectType}
    };
  },
  watch: {
    PolicyTracking: {
      handler(formData) {
        this.formData = {...this.PolicyTracking};
        console.log("this formData PolicyTracking", formData);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    sendData(){
      this.getDealPolicyTracking(this.formData);
    },
    nextStep() {
    this.$emit('next', this.formData);
  },
    previousStep() {
    this.$emit('previous');
  },
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
    margin-bottom:80px;
  }
}
</style>
