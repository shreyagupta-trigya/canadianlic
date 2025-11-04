<template>
    <h5 class="main-heading mb-0 ps-2"> Application Cancelled Calculation & Refund</h5>
    <div class="ps-2">
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">How many months left?</label>
          <input v-model="formData.howManyMonthsLeft" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Total Policy Commission</label>
          <input v-model="formData.totalPolicyCommission" type="number"  placeholder="CA$" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Total Advisor Commission</label>
          <input v-model="formData.totalAdvisorCommission" type="number" placeholder="CA$" class="form-control form-control-default" />
        </div>
         </div>
      <div class="row mt-3">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Net Corporate Commission</label>
          <input v-model="formData.netCorporateCommission" type="number" placeholder="CA$" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Actual Policy Commission After Deductibles</label>
          <input v-model="formData.actualPolicyCommissionAfterDeductibles" placeholder="CA$" type="number" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Return Amount</label>
          <input v-model="formData.returnAmount" type="number" placeholder="CA$" class="form-control form-control-default" />
        </div>
      </div>
      <div class="row mt-3"> 
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Net Advisor Commission After Deductible</label>
          <input v-model="formData.netAdvisorCommissionAfterDeductible" placeholder="CA$" type="number" class="form-control form-control-default" />
        </div> 
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Net Corporate Commission After Deductibles</label>
          <input v-model="formData.netCorporateCommissionAfterDeductible" type="number" placeholder="CA$" class="form-control form-control-default" />
        </div>     
    </div>
    <h5 class="main-heading mb-0 mt-3">Description Information</h5>
    <div class="row">
    <div class="col-lg-4 col-md-4 col-sm-12">
    <label class="my-0">Description</label>
    <textarea v-model="formData.description" class="form-control form-control-default" rows="1"></textarea>
    </div>
    </div>
  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4 space" >
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
export default {
  name: "InsuranceInquiryForm",
  props:{
    getApplicationCal:{
      type: Function,
      required: true
    },
    ApplicationCal:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData:{...this.ApplicationCal},      
     
    };
  },
  watch: {
    LifeInsurance: {
        handler(formData) {
          formData = {...this.ApplicationCal};
          console.log("this formData deal getApplicationCal", formData);
        },
        immediate: true,
        deep: true
      }
    },
  methods:{
    nextStep() {
      this.$emit("next", { ...this.formData});  
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
    margin-bottom:100px;
  }
}
</style>
