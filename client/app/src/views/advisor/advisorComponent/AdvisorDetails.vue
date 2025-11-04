<template>

  <div class="px-4 mt-2">
    <!-- Group 1: Current Career Details -->
    <div class="heading-div">
      <h5 class="main-heading mb-0">Current Career Details</h5>
    </div>
  
    <div class="row">
      <!-- Desktop: 3 inputs in a row, Tablet: 2 inputs in a row, Mobile: 1 input in a row -->
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="organizationLevel" class="my-0">Organization Level</label>
        <select v-model="formData.organizationLevel" class="form-select" id="organizationLevel">
          <option v-for="(option, index) in organizationLevelOptions" :key="index" :value="option">
            {{ option }}
            </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="teamName" class="my-0">Team Name </label>
        <select v-model="formData.teamName" class="form-select" id="teamName">
          <option v-for="(option, index) in teamNameOptions" :key="index" :value="option">
                {{ option }}
          </option>
        </select>
      </div>

      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="teamLeg" class="my-0">Team Leg </label>
        <input type="text" v-model="formData.teamLeg" class="form-control" id="teamLeg" />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="employmentType" class="my-0">Employment Type
        </label>
        <select v-model="formData.employmentType" class="form-select" id="employmentType">
          <option v-for="(option, index) in employmentTypeOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>

      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="reviewedDate" class="my-0">Reviewed as on</label>
        <input type="date" v-model="formData.reviewedDate" class="form-control" id="reviewedDate" />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="generationNumber" class="my-0">
          Team Generation Number
        </label>
        <input type="text" v-model="formData.generationNumber" class="form-control" id="generationNumber" />
      </div>
    </div>
  </div>
  <!-- Hire field -->
  <div class="px-4 mt-3">
    <!-- Group 1: Hire Details -->
    <div class="heading-div">
      <h5 class="main-heading mb-0">Hire Details</h5>
    </div>

    <div class="row my-2">
      <!-- Desktop: 3 inputs in a row, Tablet: 2 inputs in a row, Mobile: 1 input in a row -->
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="hireLevel" class="my-0">Hire Level</label>

        <select v-model="formData.hireLevel" class="form-select" id="hireLevel">
          <option v-for="(option, index) in hireLevelOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>

      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="hireType" class="my-0">Hire Type</label>
        <select v-model="formData.hireType" class="form-select" id="hireType">
          <option value="Select Hire Type" selected disabled>
            Select Hire Type
          </option>
          <option value="None">None</option>
          <option value="Single">Single</option>
          <option value="Team">Team</option>
        </select>
      </div>

      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="hireTeamName" class="my-0">Hire Team Name</label>
        <input type="text" v-model="formData.hireTeamName" class="form-control" id="hireTeamName" />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4 mt-md-4">
        <label for="hireTeamLeg" class="my-0 mt-md-2">Hire Team Leg </label>
        <input type="text" v-model="formData.hireTeamLeg" class="form-control" id="hireTeamLeg" />
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4 mt-lg-4">
        <label for="teamGenerationNumber" class="my-0 mt-lg-2">Hire Team Generation Number</label>
        <input type="text" v-model="formData.teamGenerationNumber" class="form-control"
          id="teamGenerationNumber" />
      </div>
    </div>
  </div>
  <div class="px-4 mt-3">
    <div class="row">
    </div>
    <div class="heading-div">
      <h5 class="main-heading mb-0 mt-2">Applicable Bonus Table</h5>
    </div>
    <div class="row">
      <!-- Desktop: 3 inputs in a row, Tablet: 2 inputs in a row, Mobile: 1 input in a row -->
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="bonusLevel" class="my-0">Bonus Level</label>
        <select v-model="formData.bonusLevel" class="form-select" id="bonusLevel">
          <option v-for="(option, index) in bonusLevelInfo" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="desiredTimeline" class="my-0">% of FYC</label>
        <select v-model="formData.fycPercentage" class="form-select" id="desiredTimeline">
          <option v-for="(option, index) in fycPercentageOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
    </div>
    <div class="heading-div">
      <h5 class="main-heading mb-0 mt-2">
        Supervisa Bonus Tracker
      </h5>
    </div>
    <div class="row">
      <!-- Desktop: 3 inputs in a row, Tablet: 2 inputs in a row, Mobile: 1 input in a row -->
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="supervisaPayout" class="my-0">Supervisa Payout Level</label>
        <select v-model="formData.supervisaPayout" class="form-select" id="bonusLevel">
          <option v-for="(option, index) in supervisaPayoutOptions" :key="index" :value="option">
                {{ option }}
              </option>
        </select>
      </div>
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="supervisaPayout" class="my-0">% of Premium</label>
        <select v-model="formData.premiumPercentage" class="form-select" id="bonusLevel">
          <option v-for="(option, index) in premiumPercentageOptions" :key="index" :value="option">
                {{ option }}
              </option>
          
        </select>
      </div>
    </div>
    <div class="heading-div">
      <h5 class="main-heading mb-0 mt-2">Description</h5>
    </div>
    <div class="row">
      <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
        <label for="description" class="my-0">Description</label>
        <textarea v-model="formData.description" class="form-control" id="description" rows="1"></textarea>
      </div>
    </div>
    <div class="heading-div">
      <h5 class="main-heading mb-0 mt-2">
        Contracted Insurance Partners
      </h5>
    </div>
    <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
      <label class="my-0">Insurance Partner Listing</label>
      <select class="form-select" id="insurancePartner" v-model="formData.insurancePartner">
        <option value=" select">Select</option>
        <option v-for="(userData, index) in insurancePartner" :key="index" :value="userData.ROWID">
          {{ userData.firstName }}
        </option>
      </select>
    </div>
    <div class="heading-div">
      <h5 class="main-heading mb-0 mt-2">Catalyst</h5>
    </div>
    <div class="col-lg-4 mt-2 col-md-4 col-sm-4">
      <label for="teamLeg" class="my-0">Catalyst ID</label>
      <input type="text" v-model="formData.catalystId" class="form-control" id="catalystId" />
    </div>
  </div>          
      
<div class="button-row d-flex justify-content-center mt-4 gap-4 space">
    <button
    class="btn mb-1 bg-gradient-light btn-md null null js-btn-prev"
    type="button"
    @click="previousStep"
  >
    Prev
  </button>
  <button
    class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next"
    @click.prevent="nextStep"
    type="button"
  >
    Next
  </button> 
</div>
</template>
<style>
</style>
<script>
import {organizationLevelOptions,premiumPercentageOptions,supervisaPayoutOptions,fycPercentageOptions,bonusLevelInfo,teamNameOptions,employmentTypeOptions,hireLevelOptions,hireTypeOptions} from "../utils/picklist";
export default {
  name: "Advisor Details",
  props: {
    advisorDetails: {
      type: Object,
      required: true,
    },
  
  },
  data() {
    return {
      formData: { ...this.advisorDetails }  ,
      organizationLevelOptions:{ ...organizationLevelOptions} ,
      teamNameOptions:{...teamNameOptions},
      employmentTypeOptions:{...employmentTypeOptions},
      hireLevelOptions:{...hireLevelOptions},
      hireTypeOptions:{...hireTypeOptions},
      bonusLevelInfo:{...bonusLevelInfo},
      fycPercentageOptions:{...fycPercentageOptions},
      supervisaPayoutOptions:{...supervisaPayoutOptions},
      premiumPercentageOptions:{...premiumPercentageOptions},
    };
  },
  watch: {
    advisorDetails: {
      handler(formData) {
        formData = { ...this.advisorDetails };
        console.log("this formData", formData);
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
<style>
@media screen and (max-width:500px) {
  .space{
    margin-bottom:150px;
  }
}
</style>