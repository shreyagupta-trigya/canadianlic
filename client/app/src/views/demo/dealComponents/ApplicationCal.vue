<template>
  <h5 class="main-heading mb-0">Application Cancelled Calculation & Refund</h5>
  <div>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">How many months left?</label>
        <input
          v-model="formData.howManyMonthsLeft"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Total Policy Commision</label>
        <input
          v-model="formData.totalPolicyCommission"
          type="number"
          placeholder=""
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Total Advisor Commision</label>
        <input
          v-model="formData.advisorCommision"
          type="number"
          placeholder=""
          class="form-control form-control-default"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Net Corporate Commision</label>
        <input
          v-model="formData.netCommision"
          type="number"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Actual Policy Commision After Deductibles</label>
        <input
          v-model="formData.actualPolicyCommision"
          type="number"
          placeholder=""
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Return Amount</label>
        <input
          v-model="formData.returnAmount"
          type="number"
          placeholder=""
          class="form-control form-control-default"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Net Advisor Commision After Deductibles</label>
        <input
          v-model="formData.netAdvisorCommision"
          type="text"
          placeholder=""
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Net Corporate Commision After Deductibles</label>
        <input
          v-model="formData.netCorporateCommision"
          type="text"
          placeholder=""
          class="form-control form-control-default"
        />
      </div>
    </div>
    <h5 class="main-heading mb-0 mt-3">Description Information</h5>
    <div class="row">
      <div class="col-12">
        <label class="my-0">Description</label>
        <textarea
          v-model="formData.description"
          class="form-control form-control-default"
          rows="4"
        ></textarea>
      </div>
    </div>
    <div class="button-row d-flex justify-content-center mt-2 gap-4">
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
  </div>
</template>

<script>
export default {
  name: "InsuranceInquiryForm",
  props: {
    getApplicationCal: {
      type: Function,
      required: true,
    },
    ApplicationCal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: { ...this.ApplicationCal },
    };
  },
  watch: {
    ApplicationCal: {
      handler(formData) {
        this.formData = { ...this.ApplicationCal };
        console.log("this formData ApplicationCal", formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    sendData() {
      this.getApplicationCal(this.formData);
    },
    nextStep() {
      this.$emit("next", this.formData);
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
</style>
