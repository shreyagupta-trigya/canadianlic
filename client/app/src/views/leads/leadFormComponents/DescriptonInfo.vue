<template>
  <div>
    <div class="card custom-card mb-4">
      <h5 class="main-heading mt-1 mb-0 ps-2 mb-2">Description Information</h5>
      <div class="card-body mb-4">
        <div class="card-surface">

          <div class="row mt-1 p-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Type of Insurance Looking</label>
              <input v-model="formData.typeOfInsuranceLooking" type="text" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Age of 1st Traveler</label>
              <input v-model="formData.ageOf1stTraveler" type="number" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Traveler Start Date</label>
              <input v-model="formData.travelerStartDate" type="text" class="form-control form-control-default" />
            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Coverage you are Looking for?</label>
              <input v-model="formData.coverageYouAreLookingFor" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0"> How Much Coverage is Required?</label>
              <input v-model="formData.howMuchCoverageIsRequired" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Tobacco used</label>
              <input v-model="formData.tobaccoused" type="text" class="form-control form-control-default" />
            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Select The Duration of the Coverage</label>
              <input v-model="formData.selectTheDurationOfTheCoverage" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Enter the amount of Mortgage Coverage Required</label>
              <input v-model="formData.enterTheAmountOfMortgageCoverageRequired" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Do you have any Medical Issue?</label>
              <input v-model="formData.doYouHaveAnyMedicalIssue" type="text"
                class="form-control form-control-default" />
            </div>
          </div>
        </div>
      </div>


      <div class="card-body mb-4">
        <div class="card-surface">
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">What type of Term Plan are you Looking for</label>
              <input v-model="formData.whatTypeOfTermPlanAreYouLookingFor" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">How do you Consider your Health</label>
              <input v-model="formData.howDoYouConsiderYourHealth" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">How many Critical Illness Coverage you need?</label>
              <input v-model="formData.howManyCriticalIllnessCoverageYouNeed" type="text"
                class="form-control form-control-default" />
            </div>
          </div>
           <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Secure your Child's Future with Higher Education?</label>
              <input v-model="formData.secureYourChildsFutureWithHigherEducation" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Eligible to get extra $2000 in Government Grants</label>
              <input v-model="formData.eligibleToGetExtra2000InGovernmentGrants" type="number"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Deposit every Month towards your Child Education?</label>
              <input v-model="formData.depositEveryMonthTowardsYourChildEducation" type="text"
                class="form-control form-control-default" />
            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Would you like to know How RESP Works</label>
              <input v-model="formData.wouldYouLikeToKnowHowRespWorks" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">$1+ Million in an RRSP Account at Retirement</label>
              <input v-model="formData.oneMillionInanRespAccountAtRetirement" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Do you want to Deposit Monthly or Yearly Premium?</label>
              <input v-model="formData.doYouWanToDepositMonthlyOrYearlyPremium" type="text"
                class="form-control form-control-default" />
            </div>
          </div>
        </div>
      </div>
  
      <div class="card-body mb-4">
        <div class="card-surface">
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">What age do you want to start the withdrawal from</label>
              <input v-model="formData.whatageDoYouWanttostartTheWithdrawalFrom" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Are you an Owner or Employee of the Business</label>
              <input v-model="formData.areYouAnOwnerOrEmployeeOfTheBusiness" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Are you looking for Drug & Dental or Just Drug Pla</label>
              <input v-model="formData.areYouLookingForDrugAndDentalOrJustDrugPla" type="text"
                class="form-control form-control-default" />
            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Total Dependents</label>
              <input v-model="formData.totalDependents" type="text" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Dependent Age 1</label>
              <input v-model="formData.dependentAge1" type="number" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Dependent Age 2</label>
              <input v-model="formData.dependentAge2" type="text" class="form-control form-control-default" />
            </div>
          </div>
        </div>
      </div>
   
      <div class="card-body mb-4">
        <div class="card-surface">
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Dependent Age 3</label>
              <input v-model="formData.dependentAge3" type="text" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">What Policy Do You Want?</label>
              <input v-model="formData.whatPolicyDoYouWant" type="text" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Enterage of 2nd Traveler</label>
              <input v-model="formData.enterageOf2ndTraveler" type="text" class="form-control form-control-default" />
            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Traveler End Date</label>
              <input v-model="formData.travelerEndDate" type="text" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Pre existing medical conditions</label>
              <input v-model="formData.preExistingmedicaLconditions" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Can you please let me know Premium Payment mode</label>
              <input v-model="formData.canYouPleaseLetMeKnowPremiumPaymentMode" type="text"
                class="form-control form-control-default" />
            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Do you want Critical Illness Insurance With Money</label>
              <input v-model="formData.doYouWantCriticalIllnessInsuranceWithMoney" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">What's your Profession?</label>
              <input v-model="formData.whatsYourProfession" type="text" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">How Much monthly Benefit do you Need?</label>
              <input v-model="formData.howMuchMonthlyBenefitDoYouNeed" type="text"
                class="form-control form-control-default" />
            </div>
          </div>
        </div>
      </div>
      <div class="card-body mb-4">
        <div class="card-surface">
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">you are Seeking coverage for?</label>
              <input v-model="formData.youAreSeekingCoverageFor" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">whats your Age</label>
              <input v-model="formData.whatsYourAge" type="number" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">How much do you want to Save monthly</label>
              <input v-model="formData.howMuchDoYouWantToSaveMonthly" type="text"
                class="form-control form-control-default" />
            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Would like to increase Monthly Deposits</label>
              <input v-model="formData.wouldLikeToIncreaseMonthlyDeposits" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">How many child/Children's do you have</label>
              <input v-model="formData.howManyChildrensDoYouHave" type="number"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">What time frame you like to move to be a advisor?</label>
              <select class="form-select" v-model="formData.whatTimeFrameYouLikeToMoveToBeaAdvisor">
                <option v-for="(option, index) in frame" :key="index" :value="option" :checked="option === '-None-'">{{
                  option
                }}</option>
              </select>
            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">What is your residency status in Canada?</label>
              <input v-model="formData.whatIsYourResidencyStatusInCanada" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">How long do you need Coverage for?</label>
              <input v-model="formData.howLongDoYouNeedCoverageFor" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Money require to Complete your Child's Education</label>
              <input v-model="formData.moneyRequireToCompleteYourChildEducation" type="text"
                class="form-control form-control-default" />
            </div>
          </div>
        </div>
      </div>
      <div class="card-body mb-4">
        <div class="card-surface">
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Select your Age Bracket.</label>
              <input v-model="formData.selectYourAgeBracket" type="text" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">How much do you want to Save Yearly</label>
              <input v-model="formData.howMuchdoYouWantToSaveYearly" type="text"
                class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">what Kind of business is it</label>
              <input v-model="formData.whatKindOfBusinesssIsIt" type="text" class="form-control form-control-default" />
            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Looking For Advisor.</label>
              <select class="form-select" v-model="formData.LookingForAdvisor">
                <option v-for="(option, index) in adviosersType" :key="index" :value="option"
                  :checked="option === '-None-'">
                  {{ option }}</option>
              </select>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Are You Licensed as an Insurance Advisor?</label>
              <select class="form-select" v-model="formData.areYouLicensedAsAnInsuranceAdvisor">
                <option v-for="(option, index) in objectives" :key="index" :value="option"
                  :checked="option === '-None-'">{{
                    option }}</option>
              </select>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Dependent Age 4</label>
              <input v-model="formData.dependentAge4" type="number" class="form-control form-control-default" />

            </div>
          </div>
          <div class="row mt-3 ps-2 mb-2 ">

            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Dependent Age 5</label>
              <input v-model="formData.dependentAge5" type="text" class="form-control form-control-default" />

            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
              <label class="my-0">Dependent Age 6</label>
              <input v-model="formData.dependentAge6" type="text" class="form-control form-control-default" />

            </div>
          </div>
        </div>
      </div>


    </div>

    <!-- Insurance Form -->

    <!-- Personal Information -->










    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
      <button class="btn mb-2 bg-gradient-light btn-md null null js-btn-prev" type="button"
        @click="previousStep">Prev</button>
      <button class="btn mb-2 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep"
        type="button">Next</button>
    </div>
  </div>
</template>

<script>
import { objectType, LookingForAdvisor, frame } from "../utils/picklist.js";
export default {
  name: "InsuranceForm",
  props: {
    DescriptonInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: { ...this.DescriptonInfo },
      objectives: { ...objectType },
      adviosersType: { ...LookingForAdvisor },
      frame: { ...frame },
    };
  },
  watch: {
    DescriptonInfo: {
      handler(formData) {
        formData = { ...this.DescriptonInfo }
        console.log("FormData lead descriotions: ", formData)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    nextStep() {
      this.$emit('next', this.formData);
    },
    previousStep() {
      this.$emit('previous');
    }
  },
};
</script>

<style scoped>
.main-heading {
  font-weight: 500 !important;
}

.multisteps-form__content {
  background-color: #f7f7f7;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.my-0 {
  margin-bottom: 0 !important;
}

@media screen and (max-width:500px) {
  .space {
    margin-bottom: 150px !important;
  }
}
</style>