<template>
  <div>
    <h5 class="main-heading mb-0 ps-2">Service Availed</h5>
    <div class="card custom-card mb-4">
      <div class="card-body mb-5">
        <div class="card-surface">
          <div class="row g-3">
            <div class="multisteps-form__content">
              <div class="row ps-2 g-3">
                <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
                  <label class="mb-0 mt-2">Service Availed Options</label>

                  <div class="choices">
                    <div class="select-box">
                      <select v-model="formData.serviceAvailedOptions" class="form-select">
                        <option v-for="(option, index) in serviceAvailedOptions" :key="index" :value="option">
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0"></div>
                <!-- Row 1 -->
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Life Insurance</label>
                  <div class="choices">
                    <div class="select-box">
                      <select v-model="formData.lifeInsurance" class="form-select">
                        <option v-for="(o, i) in lifeInsuranceOptions" :key="i" :value="o">{{ o }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Living Benefits</label>
                  <div class="choices">
                    <div class="select-box">
                      <select v-model="formData.lifeBenefits" class="form-select">
                        <option v-for="(o, i) in lifeBenefitsOptions" :key="i" :value="o">{{ o }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Investments</label>
                  <div class="choices">
                    <div class="select-box">
                      <select v-model="formData.investment" class="form-select">
                        <option v-for="(o, i) in investmentOptions" :key="i" :value="o">{{ o }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Group Insurance</label>
                  <div class="choices">
                    <div class="select-box">
                      <select v-model="formData.groupInsurance" class="form-select">
                        <option v-for="(o, i) in groupInsuranceOption" :key="i" :value="o">{{ o }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Row 2 -->
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Travel Insurance</label>
                  <div class="choices">
                    <div class="select-box">
                      <!-- use your existing serviceAvailedTravelInsurance (keeps logic) -->
                      <select v-model="formData.serviceAvailedTravelInsurance" class="form-select">
                        <option v-for="(o, i) in travelInsuranceOptions" :key="i" :value="o">{{ o }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Immigration Services</label>
                  <input class="form-control" :value="formData.immigrationServices" />
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12 d-flex align-items-end">
                  <div class="form-check checkbox-lg w-100">
                    <input v-model="formData.serviceAvailedhealthAndDentalInsurance" class="form-check-input"
                      type="checkbox" id="svc-hd" />
                    <label class="form-check-label mt-1" for="svc-hd">Health &amp; Dental Insurance</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Business Liability Insurance</label>
                  <!-- placeholder as per SS -->
                  <input class="form-control" :value="formData.businessLiabilityInsurance || ''" disabled />
                </div>
                <!-- NEW -->
                <!-- Row 3 -->
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Home Insurance</label>
                  <!-- placeholder as per SS -->
                  <input class="form-control" :value="formData.homeInsurance || ''" disabled />
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Auto Insurance</label>
                  <!-- placeholder as per SS -->
                  <input class="form-control" :value="formData.autoInsurance || ''" disabled />
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2">Loan Protection</label>
                  <div class="choices">
                    <div class="select-box">
                      <select v-model="formData.serviceAvailedLoanProtection" class="form-select">
                        <option v-for="(o, i) in loanProtectionOptions" :key="i" :value="o">{{ o }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12 d-flex align-items-end">
                  <div class="form-check checkbox-lg w-100">
                    <input v-model="formData.combinationOrHybridInsurance" class="form-check-input" type="checkbox"
                      id="svc-combo" />
                    <label class="form-check-label mt-1" for="svc-combo">Combination or Hybrid Insurance</label>
                  </div>
                </div>

                <!-- New -->


              </div>


            </div>
          </div>
        </div>
      </div>


      <div class="card-body mb-5">
        <div class="card-surface">
          <div class="row g-3">
            <h5 class="main-heading mb-0 ps-2">Repeat Business Information</h5>

            <div class="row ps-2">
              <div class="col-lg-4 col-sm-4 mt-2 mt-sm-0">
                <label class="mb-0 mt-2">Services Availed Updated?</label>

                <div class="choices">
                  <div class="select-box">
                    <select v-model="formData.serviceAvailedUpdated" class="form-select">
                      <option v-for="(option, index) in serviceAvailedOptions" :key="index" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-sm-4 mt-2 mt-sm-0">
                <label class="mb-0 mt-2">New Service Requested</label>

                <div class="choices">
                  <div class="select-box">
                    <select class="form-select">
                      <option v-for="(option, index) in serviceAvailedOptions" :key="index" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>


              <div class="col-lg-4 col-sm-4 mt-2 mt-sm-0">
                <label class="mb-0 mt-2">Other Service Requested</label>
                <div class="choices">
                  <div class="select-box">
                    <select v-model="formData.otherServiceRequested" class="form-select">
                      <option v-for="(option, index) in loanProtectionOptions" :key="index" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-3 col-lg-4 col-sm-4 col-sm-4">
                <label class="mb-0 mt-2">Date New Service Requested</label>

                <div class="form-group multisteps-form__input">
                  <div class="">
                    <input v-model="formData.dateNewServiceRequested" type="date"
                      class="form-control form-control-default" isrequired="false" autocomplete="off"
                      placeholder="MM DD YYYY" />
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-sm-4 mt-2 mt-sm-0">
                <label class="mb-0 mt-2">Process Stage</label>

                <div class="choices">
                  <div class="select-box">
                    <select v-model="formData.processStage" class="form-select">
                      <option v-for="(option, index) in processStageOptions" :key="index" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="col-12 col-sm-4 col-md-4">
                <label class="mb-0 mt-2">Next Follow Up Date & Time</label>

                <div class="form-group multisteps-form__input">
                  <div class="">
                    <input v-model="formData.nextFollowUpDateAndTime" type="datetime-local"
                      class="form-control form-control-default" isrequired="false" autocomplete="off"
                      placeholder="MM DD YYYY" />
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      <div>

      </div>
    </div>


  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
    <button class="btn mb-1 bg-gradient-light btn-md null null js-btn-prev" type="button" @click="previousStep">
      Prev
    </button>
    <button class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">
      Next
    </button>
  </div>
</template>
<style></style>
<script>
import {
  serviceAvailedOptions,
  lifeInsuranceOptions,
  loanProtectionOptions,
  lifeBenefitsOptions,
  groupInsuranceOption,
  travelInsuranceOptions,
  investmentOptions,
  processStageOptions,
} from "../utils/picklist";
export default {
  name: "Services",
  props: {
    Service: {
      type: Object,
      reqquired: true,
    },
  },
  data() {
    return {

      formData: { ...this.Service },
      serviceAvailedOptions: { ...serviceAvailedOptions },
      lifeInsuranceOptions: { ...lifeInsuranceOptions },
      lifeBenefitsOptions: { ...lifeBenefitsOptions },
      loanProtectionOptions: { ...loanProtectionOptions },
      travelInsuranceOptions: { ...travelInsuranceOptions },
      investmentOptions: { ...investmentOptions },
      processStageOptions: { ...processStageOptions },
      groupInsuranceOption: { ...groupInsuranceOption },
    }
  },
  watch: {
    Service: {
      handler(formData) {
        formData = { ...this.Service };
        console.log("this formData", formData);
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    nextStep() {
      this.$emit("next", { ...this.formData });
    },
    previousStep() {
      this.$emit("previous");
    },
  },
};
</script>
<style>
@media screen and (max-width:500px) {
  .space {
    margin-bottom: 150px;
  }
}
</style>