<template>
  <div>
    <div class="card custom-card mb-4">
      <div class="multisteps-form__content">
        <div class="card-body mb-5">
          <div class="card-surface">
            <div class="row g-3">
              <h5 class="main-heading mb-0 ps-2">
                Pending Potential Business (Still not Sold)
              </h5>

              <div class="row mt-2 ps-2">
                <div class="col-12 col-sm-4">
                  <label class="mb-0 mt-2">Number of Products Remaining (Dependents) </label>

                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input v-model="formData.numberOfProductRemaining" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-4">
                  <label class="mb-0 mt-2">Number of Products Remaining (Individual) </label>

                  <div class="form-group multisteps-form__input">
                    <div class="">
                      <input v-model="formData.numberOfProductRemainingIndividuals" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </div>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.potentialDependentCompleted" class="form-check-input" type="checkbox"
                        value="" id="checkbox-70" />

                      <label class="form-check-label mt-1" for="checkbox-70">Potential Dependents Completed? </label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.pendingPotentialBusinesslifeInsurance" class="form-check-input"
                        type="checkbox" value="" id="checkbox-69" />

                      <label class="form-check-label mt-1" for="checkbox-69">Life Insurance</label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.dependentLifeIns" class="form-check-input" type="checkbox" value=""
                        id="checkbox-68" />

                      <label class="form-check-label mt-1" for="checkbox-68">Dependent Life Ins</label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.pendingPotentialBusinessCriticalIllness
                        " class="form-check-input" type="checkbox" value="" id="checkbox-67" />

                      <label class="form-check-label mt-1" for="checkbox-67">Critical Illness..</label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.dependentCriticalIns" class="form-check-input" type="checkbox" value=""
                        id="checkbox-66" />

                      <label class="form-check-label mt-1" for="checkbox-66">Dependent Critical Ins</label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.pendingPotentialBusinessHealthAndDentalInsurances
                        " class="form-check-input" type="checkbox" value="" id="checkbox-65" />

                      <label class="form-check-label mt-1" for="checkbox-65">Health & Dental Insurance..</label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.pendingPotentialBusinessTravelInsurance
                        " class="form-check-input" type="checkbox" value="" id="checkbox-64" />

                      <label class="form-check-label mt-1" for="checkbox-64">Travel Insurance.
                      </label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.pendingPotentialBusinessResp" class="form-check-input" type="checkbox"
                        value="" id="checkbox-63" />

                      <label class="form-check-label mt-1" for="checkbox-63">RESP..</label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.rrspTfsaMutualFundsSegFunds" class="form-check-input" type="checkbox"
                        value="" id="checkbox-62" />

                      <label class="form-check-label mt-1" for="checkbox-62">RRSP / TFSA / Mutual Funds / Seg
                        Funds</label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.ppbOtherInvestments" class="form-check-input" type="checkbox" value=""
                        id="checkbox-60" />

                      <label class="form-check-label mt-1" for="checkbox-60">Other Investments..</label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.ppbLoanProtection" class="form-check-input" type="checkbox" value=""
                        id="checkbox-59" />

                      <label class="form-check-label mt-1" for="checkbox-59">Loan Protection</label>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="form-check checkbox-lg">
                      <input v-model="formData.ppbOtherLivingBenefits" class="form-check-input" type="checkbox" value=""
                        id="checkbox-58" />

                      <label class="form-check-label mt-1" for="checkbox-58">Other Living Benefits..</label>
                    </div>
                  </div>
                </div>

                <h5 class="main-heading mb-0 mt-2">
                  Business Insurance Potential Revenue Map
                </h5>

                <div class="row mt-1">
                  <div class="col-12 col-sm-4">
                    <label class="mb-0 mt-2">Service Offering</label>

                    <div class="form-group multisteps-form__input">
                      <div class="">
                        <input v-model="formData.serviceOffering" type="text" class="form-control form-control-default"
                          isrequired="false" autocomplete="off" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body mb-5">
          <div class="card-surface">
            <div class="row g-3">
              <h5 class="main-heading mb-0 mt-2">Potential Business (Max Capability)</h5>

              <!-- ── 4 columns per row -->
              <div class="row g-3">

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <label class="mb-0 mt-2">Max Number of Potential Products</label>
                  <div class="form-group multisteps-form__input">
                    <input v-model="formData.maxNumberOfPotentialProduct" type="text" disabled
                      class="form-control form-control-default" isrequired="false" autocomplete="off" />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <label class="mb-0 mt-2">Number of Potential Products Applicable</label>
                  <div class="form-group multisteps-form__input">
                    <input v-model="formData.maxNumberOfPotentialProductApplicable
                      " type="text" class="form-control form-control-default" isrequired="false"
                      autocomplete="off" />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
                  <label class="mb-0 mt-0">Client Rating</label>
                  <div class="form-group multisteps-form__input">
                    <input v-model="formData.clientRating" type="text" disabled
                      class="form-control form-control-default" isrequired="false" autocomplete="off" />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
                  <label class="my-0">Potential Business (Policy Values)</label>
                  <div class="form-group multisteps-form__input">
                    <input v-model="formData.potentialBusinessPolicyValues" type="text" placeholder="CA$"
                      class="form-control form-control-default" isrequired="false" autocomplete="off" />
                  </div>
                </div>

              </div>

              <!-- ── Checkboxes: 4 per row on lg -->
              <div class="row mt-2 g-3 d-flex justify-content-center align-items-center">

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.potentialBusinessTravelInsurance" class="form-check-input" type="checkbox"
                      id="checkbox-90" />
                    <label class="form-check-label mt-1" for="checkbox-90">Travel Insurance</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.resp" class="form-check-input" type="checkbox" id="checkbox-89" />
                    <label class="form-check-label mt-1" for="checkbox-89">RESP</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.rrspTfsa" class="form-check-input" type="checkbox" id="checkbox-88" />
                    <label class="form-check-label mt-1" for="checkbox-88">RRSP / TFSA / Mutual Funds / Seg
                      Funds</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.potentialBusinessHealthAndDentalInsurance
                      " class="form-check-input" type="checkbox" id="checkbox-86" />
                    <label class="form-check-label mt-1" for="checkbox-86">Health & Dental Insurance.</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.otherInvestments" class="form-check-input" type="checkbox"
                      id="checkbox-85" />
                    <label class="form-check-label mt-1" for="checkbox-85">Other Investments</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.potentialBusinessLoanProtection" class="form-check-input" type="checkbox"
                      id="checkbox-87" />
                    <label class="form-check-label mt-1" for="checkbox-87">Loan Protection</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.otherLivingBenefits" class="form-check-input" type="checkbox"
                      id="checkbox-80" />
                    <label class="form-check-label mt-1" for="checkbox-80">Other Living Benefits</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.potentialBusinessCriticalIllness" class="form-check-input" type="checkbox"
                      id="checkbox-79" />
                    <label class="form-check-label mt-1" for="checkbox-79">Critical Illness</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.potentialBusinessLifeInsurance" class="form-check-input" type="checkbox"
                      id="checkbox-78" />
                    <label class="form-check-label mt-1" for="checkbox-78">Life Insurance</label>
                  </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-12">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.potentialDependent" class="form-check-input" type="checkbox"
                      id="checkbox-77" />
                    <label class="form-check-label mt-1" for="checkbox-77">Potential Dependents ?</label>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
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
export default {
  name: "Potential",
  props: {
    Potential: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      formData: { ...this.Potential },
    };
  },
  watch: {
    Potential: {
      handler() {
        console.log("<<<<<<<<<<<INSERT THE WATCH FOR DEALOWNERSHIP>>>>>>>>>>>>>>>>>>>>>>>>>")
        this.formData = { ...this.Potential };
        console.log("<<<<<<<<< == this formData Potential ==>>>>>>>>>", this.formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    nextStep() {
      this.$emit("next", { ...this.formData });
    },
    previousStep() {
      this.$emit("previous");
    },
  }
};
</script>
<style>
@media screen and (max-width:500px) {
  .space {
    margin-bottom: 150px;
  }
}
</style>