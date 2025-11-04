<template>
    <div >
      <h5 class="main-heading mt-2 mb-0 ps-2">FaceBook Ad Information</h5>
      <!-- Ad Account  -->
      <div class="row p-2">
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
          <input v-model="formData.facebookPage" type="text" class="form-control form-control-default" />
        </div>
        <!-- Facebook Page ID -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Facebook Page ID</label>
          <input v-model="formData.facebookPageId" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Cost Per Lead (CPL)</label>
          <input v-model="formData.costPerLead" type="number" placeholder="CA$" class="form-control form-control-default" />
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
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Facebook Ad Information ?</label>
          <select class="form-select" id="netWorth" v-model="formData.facebookAdInformation">
            <option v-for="(option, index) in additionalContactInformationOption" :key="index" :value="option">
              {{ option }}
            </option>
            
          </select>  
        </div>
      </div>
    </div>
    <div class="button-row d-flex justify-content-center mt-0 gap-4 space" >
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousStep" type="button">Prev</button>
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep"  type="button">Next</button>
    </div>
  </template>
  
  <script>
import {additionalContactInformationOption} from "../utils/picklist.js";
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
        formData: {...this.Facebook},
        additionalContactInformationOption: {...additionalContactInformationOption},       
      };
    },
    watch: {
      Facebook:{
      handler(formData){
        formData = {...this.Facebook}
        console.log("FormData lead Facebook: ", formData)
      },
      immediate: true,
      deep: true
    }
  },
    methods: {
     nextStep(){
      this.$emit('next',this.formData);
     },
     previousStep(){
      this.$emit('previous');
     }
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
    margin-bottom: 150px !important;
  }
}
  </style>
  