<template>
  <div>
    <!-- Insurance Form -->
    <h5 class="main-heading mt-2 mb-0">Insurance Inquiry</h5>
    <!-- Personal Information -->
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Type of Insurance Looking For</label>
        <input v-model="formData.typeOfInsuranceLooking" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Age of 1st Traveler</label>
        <input v-model="formData.ageOf1stTraveler" type="number" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Traveler Start Date</label>
        <input v-model="formData.travelerStartDate" type="date" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Coverage You Are Looking For</label>
        <input v-model="formData.coverageLookingFor" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">How Much Coverage is Required?</label>
        <input v-model="formData.amountOfCoverageRequired" type="number" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Tobacco Used?</label>
        <input v-model="formData.tobaccoUsed" type="text" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">What Type of Term Plan Are You Looking For?</label>
        <input v-model="formData.typeOfTermPlan" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">How Do You Consider Your Health?</label>
        <input v-model="formData.healthConsideration" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">How Many Critical Illness Coverages Do You Need?</label>
        <input v-model="formData.numberOfCriticalIllness" type="number" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Select The Duration of the Coverage</label>
        <input v-model="formData.durationOfCoverage" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Enter the Amount of Mortgage Coverage Required</label>
        <input prefix="$" v-model="formData.amountOfMortgageCoverage" type="number" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Do You Have Any Medical Issue?</label>
        <input v-model="formData.hasMedicalIssue" type="text" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Total Interaction Time (mins)        </label>
        <input disabled  v-model="formData.totalInteractionTime" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Number of Contact Attempts.</label>
        <input disabled  v-model="formData.numberOfContactAttempts" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Services Requested</label>
        <select class="form-select" v-model="formData.servicesRequested">
          <option v-for="(option, index) in servicesRequestedOptions" :key="index" :value="option">
            {{ option }}
          </option>
        </select>
        </div>
    </div>
    <!-- Secure Your Child's Future and RESP -->
    <div class="row mt-3">
      <div class="col-12">
        <h5 class="main-heading mb-0">Secure Your Child's Future</h5>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">RESP Accounts for Your Child/Children’s</label>
        <input v-model="formData.respAccountsForChild" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">20% Growth on Your Investment in RESP Account</label>
        <input v-model="formData.growthOnInvestmentInRESP" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Qualify for 15% Bonus of Your RESP Account</label>
        <input v-model="formData.qualifyForBonusRESP" type="text" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Eligible to Get Extra $2000 in Government Grants</label>
        <input v-model="formData.eligibleForGovernmentGrants" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Deposit Every Month Towards Your Child's Education</label>
        <input v-model="formData.depositEveryMonthForEducation" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Would You Like to Know How RESP Works?</label>
        <input v-model="formData.knowHowRESPWorks" type="text" class="form-control form-control-default" />
      </div>
    </div>
    <!-- Retirement Planning with RRSP -->
    <div class="row mt-3">
      <div class="col-12">
        <h5 class="main-heading mb-0">Retirement Planning with RRSP</h5>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">$1+ Million in an RRSP Account at Retirement</label>
        <input v-model="formData.millionInRRSPAtRetirement" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Do You Want to Deposit Monthly or Yearly Premium?</label>
        <input v-model="formData.depositFrequencyForRRSP" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">What Age Do You Want to Start the Withdrawal From?</label>
        <input v-model="formData.ageToStartRRSPWithdrawal" type="number" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Would You Like to Know How RRSP Works?</label>
        <input v-model="formData.knowHowRRSPWorks" type="text" class="form-control form-control-default" />
      </div>
    </div>
    <!-- Super Visa Insurance Inquiry -->
    <div class="row mt-3">
      <div class="col-12">
        <h5 class="main-heading mb-0">Super Visa Insurance Inquiry</h5>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Are You an Owner or Employee of the Business?</label>
        <input v-model="formData.businessOwnerOrEmployee" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Are You Looking for Drug & Dental or Just Drug Plan?</label>
        <input v-model="formData.drugAndDentalOrJustDrug" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Have You Had a Previous Policy with Us?</label>
        <input v-model="formData.previousPolicyWithUs" type="text" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Coverage for Drug Plan & Dental Plan Cost?</label>
        <input v-model="formData.coverageForDrugAndDentalCost" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Does Your Policy Has Prescription Medication Coverage?</label>
        <input v-model="formData.prescriptionMedicationCoverage" type="text"
          class="form-control form-control-default" />
      </div>
    </div>
    <!-- Insurance Inquiry and Life Insurance -->
    <div class="row mt-3">
      <div class="col-12">
        <h5 class="main-heading mb-0">Insurance Inquiry and Life Insurance</h5>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Are You Looking for Super Visa Insurance?</label>
        <input v-model="formData.superVisaInsurance" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Do You Have Any Existing Health Conditions?</label>
        <input v-model="formData.existingHealthConditions" type="text" class="form-control form-control-default" />
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Is This a Single Plan or a Family Plan?</label>
        <input v-model="formData.singleOrFamilyPlan" type="text" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Do You Know The Monthly Premium?</label>
        <input v-model="formData.monthlyPremiumKnowledge" type="text" class="form-control form-control-default" />
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Gclid Field</label>
        <select class="form-select" id="netWorth" v-model="formData.gClidField">
          <option v-for="(option, index) in LookingForAdvisor" :key="index" :value="option">
            {{ option }}
          </option>
         
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">Are You Licensed as an Insurance Advisor?</label>
        <select class="form-select" id="netWorth" v-model="formData.areYouLicensedAsAnInsuranceAdvisor">
          <option v-for="(option, index) in objectType" :key="index" :value="option">
            {{ option }}
          </option>
         
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <label class="my-0">What time frame you like to move to be a advisor?</label>
        <select class="form-select" id="netWorth" v-model="formData.timeFrameToMoveAsAdvisor">
          <option v-for="(option, index) in timeframeOption" :key="index" :value="option">
            {{ option }}
          </option>
         
        </select>
      </div>
    </div>
    <h5 class="main-heading mt-2 mb-0">Referral Information</h5>
    <div class="row mt-2">
      <div class="row">
    <div class="col-lg-4 col-md-4 col-sm-12">
      <label class="mb-0 mt-2" for="existingPolicyRenewalDueBy">Existing Policy Renewal Due By</label>
      <input type="date" id="existingPolicyRenewalDueBy" v-model="formData.existingPolicyRenewalDueBy" class="form-control" />
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12">
      <label class="mb-0 mt-2" for="fax">Fax</label>
      <input type="number" id="fax" v-model="formData.fax" class="form-control" />
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12">
      <label class="mb-0 mt-2" for="fax">Product Category Referred</label>
      <select class="form-select" v-model="formData.productCategoryReferred">
        <option v-for="(option, index) in productCategoryOption" :key="index" :value="option">
          {{ option }}
        </option>
        
      </select>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12">
      <label class="mb-0 mt-2" for="fax">Referral Client</label>
      <select class="form-select" v-model="formData.referralClient">
        <option>-None-</option>
      </select>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12">
      <label class="mb-0 mt-2" for="year">Year</label>
      <select class="form-select" v-model="formData.year">
        <option v-for="(option, index) in yearOption" :key="index" :value="option">
          {{ option }}
        </option>
     
      </select>
      </div>
  </div>
  </div>

  </div>
  <div class="button-row d-flex justify-content-center mt-2 gap-4">
    <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousStep" type="button">Prev</button>
    <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">Next</button>
  </div>
</template>

<script>
import {servicesRequestedOptions, LookingForAdvisor, objectType, timeframeOption, productCategoryOption, yearOption} from "../../utils/picklist.js";
export default {
  name: "InsuranceForm",
  props: {
    Description:{
      type: Function,
      required: true
    }
  },
  watch:{
    handler(Description){
      formData  = {...this.Description}
      console.log(Description)
    },
    immediate: true,
    deep: true
  },
  data() {
    return {
      formData: {...this.Description},
      servicesRequestedOptions: {...servicesRequestedOptions},
      LookingForAdvisor: {...LookingForAdvisor},
      productCategoryOption: {...productCategoryOption},
      objectType: {...objectType},
      yearOption: {...yearOption},

      // formData: {
      //   // Initialize your form data structure here
      //   timeFrameToMoveAsAdvisor:'',
      //   servicesRequested:'',
      //   totalInteractionTime:'',
      //   numberOfContactAttempts:'',
      //   areYouLicensedAsAnInsuranceAdvisor: '',
      //   gClidField: '',
      //   typeOfInsuranceLooking: "",
      //   ageOf1stTraveler: null,
      //   travelerStartDate: null,
      //   coverageLookingFor: "",
      //   amountOfCoverageRequired: null,
      //   tobaccoUsed: "",
      //   typeOfTermPlan: "",
      //   healthConsideration: "",
      //   numberOfCriticalIllness: null,
      //   durationOfCoverage: "",
      //   amountOfMortgageCoverage: null,
      //   hasMedicalIssue: "",
      //   respAccountsForChild: "",
      //   growthOnInvestmentInRESP: "",
      //   qualifyForBonusRESP: "",
      //   eligibleForGovernmentGrants: "",
      //   depositEveryMonthForEducation: "",
      //   knowHowRESPWorks: "",
      //   millionInRRSPAtRetirement: "",
      //   depositFrequencyForRRSP: "",
      //   ageToStartRRSPWithdrawal: null,
      //   knowHowRRSPWorks: "",
      //   businessOwnerOrEmployee: "",
      //   drugAndDentalOrJustDrug: "",
      //   previousPolicyWithUs: "",
      //   coverageForDrugAndDentalCost: "",
      //   prescriptionMedicationCoverage: "",
      //   superVisaInsurance: "",
      //   existingHealthConditions: "",
      //   singleOrFamilyPlan: "",
      //   monthlyPremiumKnowledge: ""
      // },
    };
  },
  methods:{  
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

.multisteps-form__content {
  background-color: #f7f7f7;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.my-0 {
  margin-bottom: 0 !important;
}
</style>