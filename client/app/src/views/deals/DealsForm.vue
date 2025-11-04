<template>
  <Loader :loading="isDataLoaded"></Loader>
  <div>
    <div v-if="!isDataLoaded" class="container-fluid ps-0 pe-2">
      <div class="row">
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
      <!-- Step 1: Deal Information -->
      <DealInformation
        v-if="currentStep === 0"
        :DealInformation="apiData.dealInformation"
        @next="handleNext('dealInformation', $event)"
        :owners="users"
        :contacts="contacts"
        :location="location"
        :leads="leads"
      />

      <!-- Step 2: Deal Ownership -->
      <DealOwnership
        v-if="currentStep === 1"
        :DealOwnership="apiData.dealOwnership"
        @next="handleNext('dealOwnership', $event)"
        @previous="handlePrevious"
      />

      <!-- Step 3: Policy Tracking -->
      <PolicyTracking
        v-if="currentStep === 2"
        :PolicyTracking="apiData.policyTracking"
        @next="handleNext('policyTracking', $event)"
        @previous="handlePrevious"
      />
      <PolicyReview
        v-if="currentStep === 3"
        :PolicyReview="apiData.policyTracking"
        @next="handleNext('policyTracking', $event)"
        @previous="handlePrevious"
      />
      <Claims
        v-if="currentStep === 4"
        :Claims="apiData.dealInfo"
        @next="handleNext('dealInfo', $event)"
        @previous="handlePrevious()"
      />
      <ApplicationCal
        v-if="currentStep === 5"
        :ApplicationCal="apiData.dealInfo"
        @next="handleNext('dealInfo', $event)"
        @previous="handlePrevious()"
      />
      <DealTrustee
        v-if="currentStep === 6"
        :DealTrustee="apiData.trustee"
        @next="handleNext('trustee', $event)"
        @previous="handlePrevious()"
      />
      <DealBene
        v-if="currentStep === 7"
        :beneficiaries="apiData.beneficiaries"
        @next="handleNext('beneficiaries', $event)"
        @previous="handlePrevious()"
        @submit="handleSubmit"
      />
      <div v-else>
        <Loader />
      </div>
    </div>
  </div>
</template>

<script>
 // <<<<<<< VUE HELPER PLUGINS >>>>>>>  
import axios from "axios";
import { putUrl } from "../../boot/axios.js";
import { useRoute } from "vue-router";
import router from "../../router/index";
import Swal from "sweetalert2";
import Loader from "../utils/Loader.vue";

// <<<<<<<<<<<< STANDARD DEAL  COMPONENT>>>>>>>>>
import DealInformation from "./dealComponents/DealInformation.vue";
import DealOwnership from "./dealComponents/DealOwnership.vue";
import PolicyTracking from "./dealComponents/PolicyTracking.vue";
import PolicyReview from "./dealComponents/PolicyReview.vue";
import Claims from "./dealComponents/Claims.vue";
import ApplicationCal from "./dealComponents/ApplicationCal.vue";
import DealTrustee from "./dealComponents/DealTrustee.vue";
import DealBene from "./dealComponents/DealBene.vue";

// UAT
// import {dealDetails,users,locations,leads,contacts} from "./utils/dealResponse.js";
// import {users,locations,leads,contacts} from "./utils/dealResponse.js";
export default {
  components: {
    DealInformation,
    DealOwnership,
    PolicyTracking,
    PolicyReview,
    Claims,
    ApplicationCal,
    DealTrustee,
    DealBene,
    Loader,
  },
  data() {
    const route = useRoute();
    return {
      route,
      isLoading: false,
      isDataLoaded: false,
      currentStep: 0,
      steps: [
        { title: "Information" },
        { title: "Ownership" },
        { title: "Policy Tracking" },
        { title: "Review & Renewal" },
        { title: "Claims" },
        { title: "App Calculation" },
        { title: "Trustee" },
        { title: "Beneficiaries" },
      ],
      users: [],
      contacts: [],
      location: [],
      leads: [],
      apiData: {
        dealInformation: {},
        dealOwnership: {},
        policyTracking: {},
        dealInfo:{},
        trustee: {},
        beneficiaries: {},
        layout : "Standard Layout",
      },
    };
  },
  methods: {
    async fetchInitialData(id) {
      console.log("<<<<<<<<======dealDetails======>>>>>>>>>>", id);
      try {
        this.isLoading = true; 
        const response = await axios.get(
            `${putUrl}deals/api/v1/get-related-data/${id}`
          );
          const dealData = response.data?.dealDetails
          console.log("<<<<<<<<<<<<<<<response >>>>>>>>>>>>", dealData);
        // const dealData = dealDetails;
        this.apiData.dealInformation = dealData?.deals;
        this.apiData.dealOwnership = {
          isClientTheInsured: dealData?.deals.isClientTheInsured,
          areThereMultipleInsuredForThisPolicy: dealData?.deals.areThereMultipleInsuredForThisPolicy,
          dealOwnership: [ ...dealData?.dealOwnership ],
        };
        this.apiData.policyTracking = dealData?.dealPolicyTracking;
        this.apiData.dealInfo = {
          advisorCommision: dealData?.dealPolicyTracking.advisorCommision,
          netCommision: dealData?.dealPolicyTracking.netCommision,
          actualPolicyCommision: dealData?.dealPolicyTracking.actualPolicyCommision,
          netAdvisorCommision: dealData?.dealPolicyTracking.netAdvisorCommision,
          netCorporateCommision: dealData?.dealPolicyTracking.netCorporateCommision,
          amountSettled: dealData?.dealPolicyTracking.amountSettled,
          ...dealData?.deals
        };

        console.log( "API dealinfo Data======", this.apiData.dealInfo);
        this.apiData.trustee = {
          ...dealData?.deals,
          trustees: [ ...dealData?.trustees ],
        };
        this.apiData.beneficiaries = {
          ...dealData?.deals,
          dealBeneficiaries: [ ...dealData?.dealBeneficiaries ],
        };
        // this.isDataLoaded = true;
        this.isDataLoaded= false;
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

      console.log("Submitting final data...", this.apiData);
      if(this.route.params.id){
        this.isLoading = true;
        await axios.post(`${putUrl}canadianlicapi/deal/api/v2/update-standrard-deal/${this.route.params.id}`, this.apiData)
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
          console.error("Error submitting data:", error);
          this.isLoading = false;
          Swal.fire({
            title: error.message,
            icon: "error",
            timer: 1000,
          });
        });
      }else{
        this.isLoading = true;
        await axios.put(`${putUrl}canadianlicapi/deal/api/v2/create-standrard-deal`, this.apiData)
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
    this.isDataLoaded = true;
    this.users =  await this.fetchUsers();
    this.contacts = await this.fetchContacts();
    this.location = await this.fetchLocations();
    this.leads = await this.fetchLeads();
    // this.users = users;
    // this.contacts = contacts;
    // this.location = locations;
    // this.leads = leads;
    if (this.route.params.id) {
      await this.fetchInitialData(this.route.params.id);
      console.log("this.apiData", this.apiData);
    }
    this.isDataLoaded = false;
  },
};
</script>

<style>
/* Add any required styles here */
</style>
