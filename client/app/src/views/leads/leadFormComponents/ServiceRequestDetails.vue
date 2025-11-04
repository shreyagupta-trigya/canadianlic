<template>
  <div>
    <!-- Insurance Inquiry Form -->
    <h5 class="main-heading mb-0 p-2">Insurance Inquiry</h5>
    <div>
      <div class="card custom-card mb-4">
        <div class="card-body mb-5">
          <div class="card-surface">
            <div class="row g-3">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <label class="my-0">Services Requested</label>
                <select
                  v-model="formData.servicesRequested"
                  class="form-select"
                >
                  <option
                    v-for="(option, index) in servicesRequested"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12">
                <label class="my-0">Potential Business (Policy Values)</label>
                <input
                  v-model="formData.potentialBusiness"
                  placeholder="CA$"
                  type="number"
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-body mb-5">
          <div class="card-surface">
            <div class="row g-3">
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Life Insurance</label>
                <select v-model="formData.lifeInsurance" class="form-select">
                  <option
                    v-for="(option, index) in lifeInsuranceOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Living Benefits</label>
                <select v-model="formData.livingBenefits" class="form-select">
                  <option
                    v-for="(option, index) in livingBenefitsOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Investments</label>
                <select v-model="formData.investments" class="form-select">
                  <option
                    v-for="(option, index) in investmentsOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Group Insurance</label>
                <select v-model="formData.groupInsurance" class="form-select">
                  <option
                    v-for="(option, index) in groupInsuranceOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Travel Insurance</label>
                <select v-model="formData.travelInsurance" class="form-select">
                  <option
                    v-for="(option, index) in travelInsuranceOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Immigration Services</label>
                <select
                  v-model="formData.immigrationServices"
                  class="form-select"
                >
                  <option
                    v-for="(option, index) in immigrationServicesOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <div class="d-flex justify-content-start align-items-center">
                  <label class="mt-4 mx-2">Health & Dental Insurance</label>
                  <input
                    v-model="formData.healthAndDentalInsurance"
                    type="checkbox"
                    class="form-check-input border mt-4"
                  />
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Business Liability Insurance</label>
                <select
                  v-model="formData.businessLiabilityInsurance"
                  class="form-select"
                >
                  <option
                    v-for="(option, index) in businessLiabilityInsuranceOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Home Insurance</label>
                <select v-model="formData.homeInsurance" class="form-select">
                  <option
                    v-for="(option, index) in homeInsuranceOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Auto Insurance</label>
                <select v-model="formData.autoInsurance" class="form-select">
                  <option
                    v-for="(option, index) in autoInsuranceOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Loan Protection</label>
                <select
                  id="insuranceType"
                  class="form-select"
                  v-model="formData.loanProtection"
                >
                  <option
                    v-for="(option, index) in loanProtectionOption"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <div class="d-flex justify-content-start align-items-center">
                  <label class="mt-4 mx-2"
                    >Combination or Hybrid Insurance</label
                  >
                  <input
                    v-model="formData.combinationOrHybridInsurance"
                    type="checkbox"
                    class="form-check-input border mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="button-row d-flex justify-content-center mt-2 gap-4">
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="sendData" type="button">Next</button>
    </div> -->
    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
      <button
        class="btn mb-2 bg-gradient-light btn-md null null js-btn-prev"
        @click="previousStep"
        type="button"
      >
        Prev
      </button>
      <button
        class="btn mb-2 bg-gradient-dark btn-md null null js-btn-next"
        type="button"
        @click.prevent="nextStep"
      >
        Submit
      </button>

      <!-- <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button"
        @click.prevent="sendData">
        update
      </button> -->
    </div>
  </div>
</template>

<script>
import {
  lifeInsuranceOption,
  livingBenefitsOption,
  servicesRequested,
  businessLiabilityInsuranceOption,
  investmentsOption,
  immigrationServicesOption,
  groupInsuranceOption,
  loanProtectionOption,
  homeInsuranceOption,
  autoInsuranceOption,
  travelInsuranceOption,
} from "../utils/picklist.js";

export default {
  name: "InsuranceInquiryForm",
  props: {
    ServiceRequestDetails: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      formData: { ...this.ServiceRequestDetails },
      lifeInsuranceOption: { ...lifeInsuranceOption },
      livingBenefitsOption: { ...livingBenefitsOption },
      businessLiabilityInsuranceOption: { ...businessLiabilityInsuranceOption },
      servicesRequested: { ...servicesRequested },
      immigrationServicesOption: { ...immigrationServicesOption },
      groupInsuranceOption: { ...groupInsuranceOption },
      investmentsOption: { ...investmentsOption },
      loanProtectionOption: { ...loanProtectionOption },
      homeInsuranceOption: { ...homeInsuranceOption },
      autoInsuranceOption: { ...autoInsuranceOption },
      travelInsuranceOption: { ...travelInsuranceOption },
    };
  },
  watch: {
    ServiceRequestDetails: {
      handler() {
        // this.formData = {...this.ServiceRequestDetails}
        console.log("FormData lead LeadManagementInformation: ", this.formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
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

@media screen and (max-width: 500px) {
  .space {
    margin-bottom: 150px !important;
  }
}
</style>
