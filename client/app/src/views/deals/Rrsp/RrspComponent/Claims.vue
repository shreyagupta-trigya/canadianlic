<template>
  <h5 class="main-heading mb-0 ps-2">Claims</h5>
  <div class="ps-2">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12 mt-lg-4">
        <label class="my-0">Any Current Claims on this Policy?</label>
        <select v-model="formData.currentClaims" class="form-select">
          <option v-for="(option , index) in claims" :key="index" :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 mt-md-4">
        <label class="my-0">Any Past Claims on this Policy?</label>
        <select v-model="formData.pastClaims" class="form-select">
          <option v-for="(option , index) in claims" :key="index" :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 mt-md-4">
      <label class="my-0">Reason of Claim</label>
      <textarea v-model="formData.reasonOfClaim" class="form-control form-control-default" rows="1"></textarea>
       </div>
       </div>
    <div class="row mt-3">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Claim Outcome</label>
        <select v-model="formData.claimOutcome" class="form-select">
          <option v-for="(option , index) in claims" :key="index" :value="option">{{ option }}</option>
        </select>
      </div>
    <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Claim Submitted?</label>
        <select v-model="formData.claimSubmitted" class="form-select">
       <option v-for="(option , index) in objectType" :key="index" :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Claim Amount</label>
        <input v-model="formData.claimAmount" type="number" placeholder="" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-3"> 
      <div class="col-lg-4 col-md-4 col-sm-12">
      <label class="my-0">Date of Claim</label>
      <input v-model="formData.dateOfClaim" type="date" class="form-control">
    </div> 
      <div class="col-lg-4 col-md-4 col-sm-12">
      <label class="my-0">Claim Closed On-</label>
      <input v-model="formData.claimClosedOn" type="date" class="form-control">
    </div>     
    <div class="col-lg-4 col-md-4 col-sm-12">
    <label class="my-0">Amount Settled</label>
    <input v-model="formData.amountSettled" type="number" placeholder="" class="form-control form-control-default" />
      </div>
  </div>
  <div class="row mt-3">
    <div class="col-lg-4 col-md-4 col-sm-12">
      <label class="my-0">Settlement or Rejection Observations</label>
      <textarea v-model="formData.settlementOrRejectionObservations" class="form-control form-control-default" rows="1"></textarea>
       </div>

  </div>
</div>
<div class="button-row d-flex justify-content-center mt-4 gap-4 space">
  <button
    class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
    type="button"
    @click="previousStep"
  >
    Prev
  </button>
  <button
    class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
    @click.prevent="nextStep"
    type="button"
  >
    Next
  </button>
</div>
</template>

<script>
import {claims, objectType} from "../../utils/picklist"
export default {
name: "InsuranceInquiryForm",
props:{   
    Claims: {
      type: Object,
      required: true  
}
},
data() {
  return {
    formData : {...this.Claims},     
    claims : {...claims},     
    objectType : {...objectType},     
  }
},
  watch: {
    Claims: {
      handler(formData) {
        this.formData = {...this.Claims};
        console.log("this formData Claims", formData);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    nextStep() {
    this.$emit("next", { ...this.formData, dealOwnership: this.subForm });  
  },
  previousStep() {
    this.$emit("previous");
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
    margin-bottom:150px;
  }
}
</style>
