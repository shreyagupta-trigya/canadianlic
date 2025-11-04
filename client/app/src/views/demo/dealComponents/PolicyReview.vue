<template>
  <h5 class="main-heading mb-0">Policy Review & Renewal</h5>
  <div>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Renewal Medical Requirement?</label>
        <select v-model="formData.medicalRequirement" class="form-select">
          <option
            v-for="(option, index) in renewal"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Review Comments</label>
        <textarea
          v-model="formData.reviewComments"
          class="form-control form-control-default"
          rows="1"
        ></textarea>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Review Comments Updated On-</label>
        <input
          v-model="formData.commentsUpdatedOn"
          type="date"
          class="form-control form-control-default"
        />
      </div>
    </div>
    <div class="row mt-3">
      <!--Policy Renewal Date-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Renewal Date</label>
        <input
          v-model="formData.policyRenewalDate"
          type="date"
          class="form-control"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Renewal Medical Confirmation Number</label>
        <input
          v-model="formData.confirmationNumber"
          type="text"
          class="form-control form-control-default"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <div>
          <label class="my-0 mx-2" for="applicationDate"
            >Renewal Medical Application Date & Time
          </label>
          <input
            type="datetime-local"
            class="form-control border"
            id="applicationDate"
            v-model="formData.applicationDate"
          />
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <!--Reviewd Date and Time-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <div>
          <label class="my-0 mx-2" for="reviewedDate"
            >Reviewd Date and Time</label
          >
          <input
            type="datetime-local"
            class="form-control border"
            id="reviewedDate"
            v-model="formData.reviewedDate"
          />
        </div>
      </div>
      <!--Policy Expired Date-->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Expired On</label>
        <input
          v-model="formData.policyExpiredDate"
          type="date"
          class="form-control"
        />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Policy Renewal Completed</label>
        <select v-model="formData.renewalCompleted" class="form-select">
          <option
            v-for="(option, index) in objectType"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
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
</template>

<script>
import {renewal,objectType} from "../utils/picklist.js";
export default {
  name: "InsuranceInquiryForm",
  props: {
    getPolicyReview: {
      type: Function,
      required: true,
    },
    PolicyReview: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: { ...this.PolicyReview },
      objectType : { ...objectType },
      renewal : { ...renewal }
    };
  },
  watch: {
    PolicyReview: {
      handler(formData) {
        this.formData = { ...this.PolicyReview };
        console.log("this formData PolicyReview", formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    sendData() {
      this.getPolicyReview(this.formData);
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
