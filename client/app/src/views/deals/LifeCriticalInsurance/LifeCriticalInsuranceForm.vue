<template>
  <Loader :loading="isDataLoaded"></Loader>
  <div v-if="!isDataLoaded" class="container-fluid ps-0 pe-2">
    <!-- Stepper starts here -->
    <div  class="row">
      <div class="col-12">
        <div class="multisteps-form">
          <div class="row">
            <div class="col-12 mx-auto mb-2">
              <div class="card">
                <div class="card-body">
                  <div class="multisteps-form__progress">
                    <button
                      v-for="(step, index) in steps"
                      :key="index"
                      :class="[
                        'multisteps-form__progress-btn',
                        { 'js-active': index <= currentStep },
                      ]"
                      @click="goToStep(index)"
                      type="button"
                    >
                      {{ step.title }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- stepper ends here -->
      
      <!--  <===== Component Steps 1 Life insurance =======>  -->
     
      <LifeInsurance
       v-if="currentStep === 0"
       :LifeInsurance="apiData.lifeInsurance"
       @next="handleNext('lifeInsurance', $event)"  
       :owners="users"
       :contacts="contacts"
        :location="location"
        :leads="leads"    
       />
       <!-- Steps 1 DealOwnership  -->   
      <DealOwnership 
      v-if="currentStep === 1"
      @next="handleNext('dealOwnership', $event)"
      @previous="handlePrevious"
      :DealOwnership="apiData.dealOwnership"
      />
       <!-- Steps 2 Policy Tracking  -->   
      <PolicyTracking 
      v-if="currentStep === 2"
      :PolicyTracking="apiData.policyTracking"
      @next="handleNext('policyTracking', $event)"
      @previous="handlePrevious"
      />
       <!-- Steps 3 Policy Review  -->   

      <PolicyReview 
      v-if="currentStep === 3"
      :PolicyReview="apiData.policyReview"
      @next="handleNext('policyReview', $event)"
      @previous="handlePrevious"
      />
       <!-- Steps 4 Claims  -->
      <Claims 
      v-if="currentStep === 4"
      :Claims="apiData.claims"
      @next="handleNext('claims', $event)"
      @previous="handlePrevious"
      />
       <!-- Steps 5 Application Cal  -->
      <ApplicationCal 
      v-if="currentStep === 5"
      :ApplicationCal="apiData.applicationCal"
      @next="handleNext('applicationCal', $event)"
      @previous="handlePrevious"      
      />

       <!-- Steps 6 FamilyTree  -->
       <FamilyTree 
      v-if="currentStep === 6"
      :FamilyTree="apiData.familyTree"
      @next="handleNext('familyTree', $event)"
      @previous="handlePrevious"
      />  
       <!-- Steps 7 Address  -->
      <Address 
      v-if="currentStep === 7"
      :Address="apiData.address"
      @next="handleNext('address', $event)"
      @previous="handlePrevious"
      />
     <!-- Steps 8 Facebook  -->
      <Facebook 
      v-if="currentStep === 8"
      :Facebook="apiData.facebook"
      @next="handleNext('facebook', $event)"
      @previous="handlePrevious"
      />
        <!-- Steps 9 Festival Form  -->
      <FestivalForm  
        v-if="currentStep === 9"
        :FestivalForm="apiData.festivalForm"
        @next="handleNext('festivalForm', $event)"
        @previous="handlePrevious"
        />
        <!-- Steps 10 LeadMgmt Cal  -->
      <LeadMgmt 
        v-if="currentStep === 10"
        :LeadMgmt="apiData.leadMgmt"
        @next="handleNext('leadMgmt', $event)"
        @previous="handlePrevious" 
        @submit="handleSubmit"     
        />     
    </div>
  </template>
<style>
</style>
  <script>
  // <<<<<<<<<<<|Vue plugins|>>>>>>>>>>
  import Swal from "sweetalert2";
  import { putUrl } from "../../../boot/axios.js";
  import axios from "axios";
  import router from "../../../router/index.js";
  import { useRoute } from "vue-router";
  import Loader from "../../../views/utils/Loader.vue"

  //<<<<<<<<<<<|Lifecritical component|>>>>>>>>>>>>>>>
  import LifeInsurance from './LifeCriticalInsuranceComponents/LifeInsurance.vue';
  import DealOwnership from './LifeCriticalInsuranceComponents/DealOwnership.vue';
  import PolicyTracking from './LifeCriticalInsuranceComponents/PolicyTracking.vue';
  import PolicyReview from './LifeCriticalInsuranceComponents/PolicyReview.vue';
  import Claims from '../dealComponents/Claims.vue';
  import ApplicationCal from './LifeCriticalInsuranceComponents/ApplicationCal.vue';
  import FamilyTree from './LifeCriticalInsuranceComponents/FamilyTree.vue';
  import Address from './LifeCriticalInsuranceComponents/AddressInformation.vue';
  import Facebook from './LifeCriticalInsuranceComponents/Facebook.vue';
  import FestivalForm from './LifeCriticalInsuranceComponents/FestivalForm.vue';
  import LeadMgmt from './LifeCriticalInsuranceComponents/LeadMgmt.vue';
//<<<<<<<<<<<|ENDLifecritical component|>>>>>>>>>>>>>>>
export default {
  components: {
    Address,
    Facebook,
    FestivalForm,
    LifeInsurance,
    DealOwnership,
    PolicyTracking,
    PolicyReview,
    Claims,
    ApplicationCal,
    FamilyTree,
    LeadMgmt,
    Loader,
  },
  data() {
    const route = useRoute();
    return{
      route,
        isLoading: false,
        isDataLoaded: false,
        currentStep: 0,
        steps: [
        { title: "Deal Info" },
        { title: "Deal Own., Ben. & Trustee" },
        { title: "Policy Tracking" },
        { title: "Review & Renewal" },
        { title: "Claims" },
        { title: "App Calculation" },
        { title: "Insurance Lead Info" },
        { title: "Address" },
        { title: "Facebook" },
        { title: "Festivals" },
        { title: "LeadMgmt" },
      ],
      users: [],
      contacts: [],
      location: [],
      leads: [],
      apiData: {
        address:{},
        facebook:{},
        festivalForm:{},
        lifeInsurance:{},
        dealOwnership:{},
        policyTracking:{},
        policyReview:{},
        claims:{},
        applicationCal:{},
        familyTree:[],
        leadMgmt:{},
        layout: "Critical Insurance",
      },
      }
    },
    methods: {
      async fetchInitialData(id) {
        console.log("<<<<<<<<====== LIFE INSURENCE DETAILS ======>>>>>>>>>>", id);
        // this.isLoading = true;
        try {
        this.isLoading = true; 
        const response = await axios.get(
            `${putUrl}deals/api/v1/get-related-data/${id}`
          );
          const dealData = response.data?.dealDetails
          console.log("<<<<<<<<<<<<<<<response >>>>>>>>>>>>", response);
        // const dealData = dealDetails;
        this.apiData.lifeInsurance = {...dealData?.deals, ...dealData?.dealInformation};
        this.apiData.dealOwnership = {
          ...dealData?.deals,
          ...dealData?.dealInformation,
          dealOwnership: [ ...dealData?.dealOwnership ],
          beneficiariesData: [ ...dealData?.dealBeneficiaries],
          trusteeData: [ ...dealData?.trustees ],
        };
        this.apiData.policyTracking = dealData?.dealPolicyTracking;

        this.apiData.policyReview = {
            renewalMedicalRequirement:dealData?.dealPolicyTracking?.dealPolicyTracking,
            policyReviewComments:dealData?.dealPolicyTracking?.policyReviewComments,
            policyReviewCommentsUpdatedOn:dealData?.dealPolicyTracking?.policyReviewCommentsUpdatedOn,
            policyRenewalDate:dealData?.dealPolicyTracking?.policyRenewalDate,
            renewalMedicalConfirmationNumber:dealData?.dealPolicyTracking?.renewalMedicalConfirmationNumber,
            renewalMedicalApplicationDateTime:dealData?.dealPolicyTracking?.renewalMedicalApplicationDateTime,
            reviewdDateandTime:dealData?.dealPolicyTracking?.reviewdDateandTime,
            policyExpiredDate:dealData?.dealPolicyTracking?.policyExpiredDate,
            policyRenewalCompleted:dealData?.dealPolicyTracking?.policyRenewalCompleted,
        };
        this.apiData.claims = {...dealData?.deals ,...dealData?.dealPolicyTracking};
        this.apiData.applicationCal = {
          ...dealData?.deals,
          ...dealData?.dealInformation?.netCorporateCommission
        };
        this.apiData.familyTree = {
          ...dealData?.deals, 
          ...dealData?.familyTree, 
          ...dealData?.dealInformation,
          siblingData:[...dealData?.contactsSiblings],
          dependentChildrenData:[...dealData?.dependentChildren],
          dependentParentsData:[...dealData?.dependentParents]
        };
        this.apiData.address = {...dealData?.dealInformation};
        this.apiData.facebook = {...dealData?.dealInformation};
        this.apiData.festivalForm = {
          religion: dealData?.dealInformation.religion,
          celebratedFestivals: dealData?.dealInformation.celebratedFestivals,
          festivalsData:[...dealData?.festivals]
        };

        this.apiData.dealInfo = {...dealData?.deals,...dealData?.dealPolicyTracking};
        this.apiData.trustee = {
          ...dealData?.deals,
          trustees: [ ...dealData?.trustees ],
        };
        this.apiData.beneficiaries = {
          ...dealData?.deals,
          dealBeneficiaries: [ ...dealData?.dealBeneficiaries ],
        };
        this.apiData.leadMgmt = {
          totalInteractionTime: dealData?.deals?.totalInteractionTime,
          numberOfContactAttempts: dealData?.deals?.numberOfContactAttempts,
          LeadData:[...dealData?.leadConversionHistory]
        },
        this.isDataLoaded = false; 
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    },
      async fetchUsers() {
      try {
        const response = await axios.get(`${putUrl}deals/api/v1/get-users`);
        return response.data?.users;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    async fetchLeads() {
      try {
        const response = await axios.get(`${putUrl}deals/api/v1/get-lead-data`);
        return response.data?.leads;
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    },
    async fetchContacts() {
      try {
        const response = await axios.get(`${putUrl}deals/api/v1/get-contacts`);
        return response.data?.contacts;
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get(`${putUrl}deals/api/v1/get-locations`);
        return response.data?.locations;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    },
      goToStep(stepIndex) {
      this.currentStep = stepIndex;
    },
    handleNext(componentName, data) {
      this.apiData[componentName] = data;
      if (this.currentStep < this.steps.length - 1) {
        this.goToStep(this.currentStep + 1);
      } else {
        this.handleSubmit();
      }
    },
    handlePrevious() {
      if (this.currentStep > 0) {
        this.goToStep(this.currentStep - 1);
      }
    },
    async handleSubmit() {

// console.log("Submitting final data...", this.apiData);
if(this.route.params.id){
  this.isLoading = true;
  await axios.post(`${putUrl}canadianlicapi/deal/api/v2/update-life-insurence/${this.route.params.id}`, this.apiData)
  .then((response) => {
    this.isLoading = false;
    Swal.fire({
      title: "<strong>Deal Updated Successfully</strong>",
      icon: "success",
      timer: 1000,
    });
    setTimeout(() => {
      router.push("/deals-list");
    }, 2000);
    console.log(response.data);
  })
  .catch((error) => {
    this.isLoading = false;
    console.error("Error submitting data:", error);
    Swal.fire({
      title: error.message,
      icon: "success",
      timer: 1000,
    });
  });
}else{
  this.isLoading = true;
  await axios.put(`${putUrl}canadianlicapi/deal/api/v2/create-life-insurence`, this.apiData)
  .then((response) => {
    this.isLoading = false;
    Swal.fire({
      timer: 2000,
      title: "<strong>Deal Created Successfully</strong>",
      icon: "success",
    });
    setTimeout(() => {
      router.push("/deals-list");
    }, 3000);
    console.log(response.data);
  })
  .catch((error) => {
    this.isLoading = false;
    console.error("Error submitting data:", error);
    Swal.fire({
      title: error.message,
      icon: "error",
    });
  });
  // await this.createNewDeal();
}
try {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // alert("Data submitted successfully!");
} catch (error) {
  console.error("Error submitting data:", error);
}
},
async formateData(apiData) {
apiData
}
  },
  async created() {
    this.isDataLoaded = true,
    this.users =  await this.fetchUsers();
    this.contacts = await this.fetchContacts();
    this.location = await this.fetchLocations();
    this.leads = await this.fetchLeads();
    if (this.route.params.id) {
      await this.fetchInitialData(this.route.params.id);
      console.log("this.apiData", this.apiData);
    }
    this.isDataLoaded = false
  },
};
</script>

<style scoped>
/* Your scoped styles here */

</style>