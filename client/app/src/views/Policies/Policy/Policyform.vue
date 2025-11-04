
<template>
  <Loader :loading="isDataLoaded"></Loader>
  <div  v-if="!isDataLoaded" class="container-fluid ps-0 pe-2">
    <!-- <<<<<<<< ==== Stepper Code Start ==== >>>>>>>>> -->
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
     <!-- <<<<<<<< ==== Stepper Code Ends ==== >>>>>>>>> -->
    <!-- BASIC INFO Component -->
    <basic-info
      v-if="currentStep === 0"
      @next="handleNext('basicInfo', $event)"
      :basicInfo="this.apiData.basicInfo"
      @update-basicInfo="handleBasicUpdate"
      :owners="users"
      :locations="locations"
      :contacts="contacts"
      :advisors="advisors"
      :insPartners="insPartners"
      :insOfferingName="insOfferingName"
    />
    <!-- SERVICES Component -->
    <services
      v-if="currentStep === 1"
      @next="handleNext('services', $event)"
      @previous="handlePrevious()"
      :services="this.apiData.services"
      />
    <!-- POLICY DATES Component -->
    <policyDetails
      v-if="currentStep === 2"
      @next="handleNext('policyDetails', $event)"
      @previous="handlePrevious()"
      :policyDetails="this.apiData.policyDetails"
       @update-policyDetails="(data) => { this.apiData.policyDetails = { ...(this.apiData.policyDetails || {}), ...data }; }"
      />
    <!-- CLIAM Component -->
        <Claims
        v-if="currentStep === 3"
        @next="handleNext('claims', $event)"
        @previous="handlePrevious()"
        :claims="apiData.claims"
        />
    <!-- Commission Component -->
        <Commission
        v-if="currentStep === 4"
        @next="handleNext('commission', $event)"
        @previous="handlePrevious()"
        :commission="apiData.commission"
        />
    
    <!--HISTORY Component -->
        <History
          v-if="currentStep === 5 "
          @next="handleNext('history', $event)"
          @previous="handlePrevious()"
          :History="apiData.history"
          @submit="handleSubmit"
          />
  </div>
</template>
<style>
  select {
    height: 2.5rem !important;
    padding: 0px 0px 0px 10px !important;
  }

.multisteps-form__panel {
  position: relative !important;
  display: none !important;
  transition: padding 0.3s ease;
  /* Add transition for smoother padding change */
  padding-bottom: 0;
  /* Initially set padding bottom to 0 */
}

.multisteps-form__panel.js-active {
  display: block !important;
}

.select-box select {
  display: content !important;
  border: 1px solid #e0e3e7 !important;
  border-radius: 10px;
}

.error {
  color: red;
  position: absolute;
}

.input-error-font-size {
  font-size: 12px;
}

.highlight {
  border: 1px solid red !important;
}
</style>

<script>
// <<<<<<< VUE HELPER PLUGINS >>>>>
import axios from "axios";
import { putUrl } from "../../../boot/axios.js";
import Swal from "sweetalert2";
import router from "../../../router/index";
import Loader from "../../utils/Loader.vue";
import { useRoute } from "vue-router";

// <<<<<<< BASIC POLICY INFO COMPONENT >>>>>>>
import BasicInfo from "./Components/policyInfo.vue";
import services from "./Components/services.vue";
import policyDetails from "./Components/policyDetails.vue";
import Claims from "./Components/claims.vue";
import Commission from "./Components/commision.vue";
import History from "./Components/history.vue";

import {
  getAdvisors,
  getAllContacts,
  getLocation,
  getallusers,
  getInsurancePartners,
  getOfferingdata
} from "../utils/Api.js";

export default {
  props: ["id"],
  components: {
    BasicInfo,
    services,
    policyDetails,
    Claims,
    Commission,
    History,
    Loader
  },
  data() {
    const route = useRoute();
    return {
      route,
      isDataLoaded: false,
      isLoading: false,
      currentStep: 0,
     steps: [
        { title: "Basic Info" },
        { title: "Policy OwnerShip & Beneficiary Details" },
        { title: "Policy Tracking" },
        { title: "Claims" },
        { title: "Commissions" },
        { title: "Histories" },
      ],
      apiData:{
        basicInfo:{},
        services:{},
        policyDetails:{},
        claims:{},
        commission:{},
        renewalHistory:{},
        layout : "New Policy",
      },
      users: [],
      errors : {},
      owners: [],
      contacts: [],
      insPartners: [],
      locations: [],
      insOfferingName: [],
      deals: [],
      advisors: [],
    }
  },
  async created() {
    this.isDataLoaded = true;
    this.users =  await getallusers();
    this.contacts = await getAllContacts();
    this.locations = await getLocation();  
    this.advisors = await getAdvisors();
    // console.log("advisors<=>", this.advisors);
    // this.deals = await getPolicys();
    this.insPartners = await getInsurancePartners();
    this.insOfferingName = await getOfferingdata();
    // console.log("offering", this.insOfferingName );   
    if (this.route.params.id) {    
      await this.fetchInitialData(this.route.params.id);
      console.log("this.apiData", this.apiData);
    }
    this.isDataLoaded = false;
  },
  methods: {
    handleBasicUpdate(data) {
      this.apiData.basicInfo = { ...(this.apiData.basicInfo || {}), ...data };
      if (data.layout !== undefined) {
        this.apiData.policyDetails = { ...(this.apiData.policyDetails || {}), layout: data.layout };
      }
    },
    async fetchInitialData(id) {
      console.log("<<<<<<<<====== POLICY DETAILS ======>>>>>>>>>>", id);
      try {
        // this.isDataLoaded = true;
        const response = await axios.get(
            `${putUrl}Policy/api/v2/get-policy-related-data/${id}`
          );
          const policyData = response.data?.policyDetails
          console.log("<<<<<<<<<<<<<<< FETCH response >>>>>>>>>>>>", policyData);

        this.apiData.basicInfo = {...policyData?.policies, ...policyData?.supervisaPolicySubDetails};
        this.apiData.services = {
          ...policyData?.policies, 
          ...policyData?.supervisaPolicySubDetails,
          OwnerShip: [...policyData?.policyOwnership],
          Beneficiary: [...policyData?.beneficiary],
          Trustee: [...policyData?.trustees],
          ContingentBeneficiary:[...policyData?.contingentBeneficiary]
        };
        console.log("<<<<< Tet Subformd data >>>>>>>>", this.apiData.services);
        this.apiData.policyDetails = {...policyData?.policySubDetails};
        this.apiData.claims = {
          ...policyData?.policySubDetails, 
          ...policyData?.supervisaPolicySubDetails,
          pastClaims:[...policyData?.pastClaims]
        };
        this.apiData.commission = {
          ...policyData?.supervisaPolicySubDetails,
          policyCommission:[...policyData?.policyCommission]
        };
        this.apiData.history = {
          renewalsHistoryData:[...policyData?.renewalsHistory]
        };
        console.log("this.apiData.basicInfo", this.apiData.basicInfo);
       
        // this.isDataLoaded = true;
        // this.isLoading = false; 
      } catch (error) {
        console.error("Error fetching initial data:", error);
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
      this.isDataLoaded = true;
      await axios.post(`${putUrl}canadianlicapi/policy/api/v2/update-policy/${this.route.params.id}`, this.apiData)
      .then((response) => {
        this.isDataLoaded = false;
        Swal.fire({
          title: "<strong>Policy Updated Successfully</strong>",
          icon: "success",
          timer: 1000,
        });
        setTimeout(() => {
          router.push("/policylistins");
        }, 2000);
        console.log(response.data);
      })
      .catch((error) => {
        this.isDataLoaded = false;
        console.error("Error submitting data:", error);
        Swal.fire({
          title: error.message,
          icon: "success",
          timer: 1000,
        });
      });
    }else{
      this.isDataLoaded = true;
      await axios.put(`${putUrl}canadianlicapi/policy/api/v2/create-policy`, this.apiData)
      .then((response) => {
        this.isDataLoaded = false;
        Swal.fire({
          timer: 2000,
          title: "<strong>Policy Created Successfully</strong>",
          icon: "success",
        });
        setTimeout(() => {
          router.push("/policylistins");
        }, 3000);
        console.log(response.data);
      })
      .catch((error) => {
        this.isDataLoaded = false;
        console.error("Error submitting data:", error);
        Swal.fire({
          title: error.message,
          icon: "error",
        });
      });
      // await this.createNewPolicy();
    }
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    }
  },

};
</script>
