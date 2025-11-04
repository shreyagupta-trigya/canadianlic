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
           <!-- Skype ID ID -->
           <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Skype ID</label>
          <input v-model="formData.skypeId" type="text" class="form-control form-control-default" />
        </div>
         <!-- Instagram  -->
         <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Instagram </label>
          <input v-model="formData.instagram" type="text" class="form-control form-control-default" />
        </div>
         <!-- Instagram  -->
         <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">LinkedIn</label>
          <input v-model="formData.linkedin" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">FaceBook Ad Information</label>
          <input v-model="formData.faceBookAddInfo" type="text" class="form-control form-control-default" />
        </div>
         <!-- Twitter ID -->
         <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Twitter</label>
          <input v-model="formData.twitter" type="text" class="form-control form-control-default" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0 mt-2">Facebook</label>
          <input v-model="formData.faceBook" type="text" class="form-control form-control-default" />
        </div>
      </div>
    </div>
    <div class="button-row d-flex justify-content-center mt-2 gap-4 space">
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
  