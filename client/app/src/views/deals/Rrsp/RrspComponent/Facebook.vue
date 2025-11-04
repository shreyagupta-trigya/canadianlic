<template>
    <div class="ps-2">
      <h5 class="main-heading mt-2 mb-0">FaceBook Ad Information</h5>
      <!-- Ad Account -->
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad Account</label>
          <input v-model="formData.adAccount" type="text" class="form-control form-control-default" />
        </div>
        <!-- Ad Account ID -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad Account ID</label>
          <input v-model="formData.adAccountId" type="text" class="form-control form-control-default" />
        </div>
    
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad Campaign</label>
          <input v-model="formData.adCampaign" type="text" class="form-control form-control-default" />
        </div>
        <!-- Ad Campaign ID -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad Campaign ID</label>
          <input v-model="formData.adCampaignId" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Facebook Page</label>
          <input v-model="formData.faceBookPage" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Facebook</label>
          <input v-model="formData.faceBook" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Facebook Ad Information?</label>
          <input v-model="formData.faceBookAddInfo" type="text" class="form-control form-control-default" />
        </div>
        <!-- Facebook Page ID -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Facebook Page ID</label>
          <input v-model="formData.faceBookPageId" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Cost Per Lead (CPL)</label>
          <input v-model="formData.costPerLead" type="text" class="form-control form-control-default" />
        </div>
       
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad Set</label>
          <input v-model="formData.adSet" type="text" class="form-control form-control-default" />
        </div>
        <!-- Ad Set ID -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad Set ID</label>
          <input v-model="formData.adSetId" type="text" class="form-control form-control-default" />
        </div>
      
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Facebook Ad</label>
          <input v-model="formData.facebookAd" type="text" class="form-control form-control-default" />
        </div>
        <!-- Ad ID -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Ad ID</label>
          <input v-model="formData.adId" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Lead Form</label>
          <input v-model="formData.leadForm" type="text" class="form-control form-control-default" />
        </div>
        <!-- Lead Form ID -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Lead Form ID</label>
          <input v-model="formData.leadFormId" type="text" class="form-control form-control-default" />
        </div>
         <!-- Instagram ID -->
         <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Instagram</label>
          <input v-model="formData.instagram" type="text" class="form-control form-control-default" />
        </div>
         <!-- Instagram ID -->
         <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Linked In</label>
          <input v-model="formData.linkedin" type="text" class="form-control form-control-default" />
        </div>
         <!-- Twitter ID -->
         <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Twitter</label>
          <input v-model="formData.twitter" type="text" class="form-control form-control-default" />
        </div>
            <!-- Product Category Referred -->
            <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="productCategoryReferred">Product Category Referred</label>
          <input type="text" class="form-control" id="productCategoryReferred"
            v-model="formData.productCategoryReferred" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">phoneA</label>
          <input type="text" v-model="formData.phoneA" class="form-control" />
        </div>
        <!-- Fax -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="fax">Fax</label>
          <input type="text" class="form-control" id="fax" v-model="formData.fax" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">First/Visit</label>
          <input type="date" v-model="formData.firstVisit" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Most Recent Visit</label>
          <input type="date" v-model="formData.mostRecentVisit" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">Visitor Score</label>
          <input type="text" v-model="formData.visitorScore" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0">First Page Visited</label>
          <input type="text" v-model="formData.firstPageVisited" class="form-control" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="servicesRequested">Services Requested</label>
          <input type="text" class="form-control" id="servicesRequested" v-model="formData.servicesRequested" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0 " for="livingBenefits">Living Benefits</label>
          <input type="text" class="form-control" id="livingBenefits" v-model="formData.livingBenefits" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0 " for="loanProtection">Loan Protection</label>
          <input type="text" class="form-control" id="loanProtection" v-model="formData.loanProtection" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0 " for="groupInsurance">Group Insurance</label>
          <input type="text" class="form-control" id="groupInsurance" v-model="formData.groupInsurance" />
        </div>
        <!-- Insurance Lead Scoring Positive Score -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="insuranceLeadScoringPositiveScore">Insurance Lead Scoring Positive Score</label>
          <input type="text" class="form-control" id="insuranceLeadScoringPositiveScore"
            v-model="formData.insuranceLeadScoringPositiveScore" />
        </div>

        <!-- Insurance Lead Scoring Touch Point Score -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="insuranceLeadScoringTouchPointScore">Insurance Lead Scoring Touch Point Score</label>
          <input type="text" class="form-control" id="insuranceLeadScoringTouchPointScore"
            v-model="formData.insuranceLeadScoringTouchPointScore" />
        </div>

        <!-- Insurance Lead Scoring Negative Touch Point Score -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="insuranceLeadScoringNegativeTouchPointScore">Insurance Lead Scoring Negative Touch
            Point Score</label>
          <input type="text" class="form-control" id="insuranceLeadScoringNegativeTouchPointScore"
            v-model="formData.insuranceLeadScoringNegativeTouchPointScore" />
        </div>
        <!-- Secondary Email -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="secondaryEmail">Secondary Email</label>
          <input type="text" class="form-control" id="secondaryEmail" v-model="formData.secondaryEmail" />
        </div>
         <!-- Referral Source -->
         <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="referralSource">Referral Source</label>
          <input type="text" class="form-control" id="referralSource" v-model="formData.referralSource" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="referrer">Referrer</label>
          <input type="text" class="form-control" id="referrer" v-model="formData.referrer" />
        </div>
        <!-- Number Of Charts -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="numberOfCharts">Number Of Charts</label>
          <input type="text" class="form-control" id="numberOfCharts" v-model="formData.numberOfCharts" />
        </div>
        <!-- Average Time Spent (Minutes) -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="averageTimeSpent">Average Time Spent (Minutes)</label>
          <input type="text" class="form-control" id="averageTimeSpent" v-model="formData.averageTimeSpent" />
        </div>
        <!-- Days Visited -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="daysVisited">Days Visited</label>
          <input type="date" class="form-control" id="daysVisited" v-model="formData.daysVisited" />
        </div>
        <!-- Life Insurance -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="lifeInsurance">Life Insurance</label>
          <input type="text" class="form-control" id="lifeInsurance" v-model="formData.lifeInsurance" />
        </div>
        <!-- Travel Insurance -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="travelInsurance">Travel Insurance</label>
          <input type="text" class="form-control" id="travelInsurance" v-model="formData.travelInsurance" />
        </div>
        <!-- Investments -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="investments">Investments</label>
          <input type="text" class="form-control" id="investments" v-model="formData.investments" />
        </div>
        <!-- Insurance Lead Scoring Score -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="insuranceLeadScoringScore">Insurance Lead Scoring Score</label>
          <input type="text" class="form-control" id="insuranceLeadScoringScore"
            v-model="formData.insuranceLeadScoringScore" />
        </div>
        <!-- Insurance Lead Scoring Negative Score -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="insuranceLeadScoringNegativeScore">Insurance Lead Scoring Negative Score</label>
          <input type="text" class="form-control" id="insuranceLeadScoringNegativeScore"
            v-model="formData.insuranceLeadScoringNegativeScore" />
        </div>
        <!-- Insurance Lead Scoring Positive Touch Point Score -->
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <label class="my-0" for="insuranceLeadScoringPositiveTouchPointScore">Insurance Lead Scoring Positive Touch
            Point Score</label>
          <input type="text" class="form-control" id="insuranceLeadScoringPositiveTouchPointScore"
            v-model="formData.insuranceLeadScoringPositiveTouchPointScore" />
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0 mx-2" for="combinationHybridInsurance">Combination or Hybrid Insurance</label>
            <input type="checkbox" class="form-check-input border" id="combinationHybridInsurance"
              v-model="formData.combinationHybridInsurance" />
          </div>
        </div>
        <div class="col-lg-4 mt-2 col-md-4 col-sm-12">
          <div class="d-flex justify-content-start align-items-center mt-2">
            <label class="my-0" for="healthDentalInsurance">Health & Dental Insurance</label>
            <input type="checkbox" class="form-check-input border" id="healthDentalInsurance"
              v-model="formData.healthDentalInsurance" />
          </div>
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
  export default {
    name: "FacebookAdInformation",
    props: {
    Facebook:{
      type: Object,
      required: true
    }
  },
    data() {
      return {
        formData: {...this.Facebook}        
      };
    },
    watch: {
      Facebook: {
        handler(formData) {
          formData = {...this.Facebook};
          console.log("this formData deal facebook", formData);
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
  