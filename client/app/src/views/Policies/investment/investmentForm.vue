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
      <Loader :loading="isLoading"></Loader>
       <!-- <<<<<<<< ==== Stepper Code Ends ==== >>>>>>>>> -->
    <div class="row">
      <div class="col-12 col-lg-12 m-auto">
        <!-- Basic Info Component -->
          <BasicInfo
            v-if="currentStep === 0"
            @next="handleNext('basicInfo', $event)"
            :basicInfo="this.apiData.basicInfo"
            :owners="users"
            :locations="locations"
            :contacts="contacts"
            :advisors="advisors"
          />

          <!-- Annuitant Info  form -->

          <AnnuitantInfo 
          v-if="currentStep === 1"
          @next="handleNext('annuitantInfo', $event)"
          @previous="handlePrevious()"
          :annuitantInfo="this.apiData.annuitantInfo"
          />
         
          <!-- Tracker form -->
          <Trackers 
          v-if="currentStep === 2"          
          @next="handleNext('trackers', $event)"
           @previous="handlePrevious()"
          :trackers="this.apiData.trackers"
          />
           <!-- Beneficiary form -->
           <Beneficiary 
          v-if="currentStep === 3"
          @next="handleNext('services', $event)"
          @previous="handlePrevious()"
          :services="this.apiData.services"
           @submit="handleSubmit"

          />
      </div>
    </div>
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

<!-- JavaScript code for stepper functionality -->
<script>

// <<<<<<<<<<<<< VUE HELPER PLUGINS >>>>>>>>>>>>>
import axios from "axios";
import { putUrl } from "../../../boot/axios.js";
import Swal from "sweetalert2";
import Loader from "../../utils/Loader.vue";
import router from "../../../router/index.js";
import { useRoute } from "vue-router";
import {
  getAdvisors,
  getAllContacts,
  getLocation,
  getallusers,
  getInsurancePartners,
  getDeals
} from "../utils/Api.js";
// <<<<<<<<<<<<<< INVESTMENT COMPONENT >>>>>>>>>>>>>>
import Beneficiary from "./component/Beneficiary.vue";
import BasicInfo from "./component/BasicInfo.vue";
import AnnuitantInfo from "./component/AnnuitantInfo.vue";
import Trackers from "./component/Trackers.vue";
export default {
  components: {    
    BasicInfo,
    AnnuitantInfo,
    Beneficiary,
    Trackers,
    Loader,
  },
  async created(){
    this.isDataLoaded = true;
    this.users =  await getallusers();
    this.contacts = await getAllContacts();
    this.locations = await getLocation();  
    this.advisors = await getAdvisors();
    // console.log("advisors<=>", this.advisors);
    this.deals = await getDeals();
    this.insPartners = await getInsurancePartners();
    if (this.route.params.id) {    
      await this.fetchInitialData(this.route.params.id);
      console.log("this.apiData", this.apiData);
    }
    this.isDataLoaded = false;
  },
  data() {
    const route = useRoute();
    return {
      currentStep: 0,
      isDataLoaded: false,
      isLoading: false,
      route,
      steps:[
        { title: "Basic Info" },
        { title: "Annuitant Info" },
        { title: "Trackers" },
        { title: "Beneficiary" }
      ],    
      apiData: {
        basicInfo:{},
        annuitantInfo:{},
        trackers:{},
        services:{},
        layout : "Investment",
      },
      users: [],
      errors : {},
      owners: [],
      contacts: [],
      insPartners: [],
      locations: [],
      deals: [],
      advisors: [],
    }
  },
  methods: { 
    async fetchInitialData(id) {
      console.log("<<<<<<<<====== INVESTMENT DETAILS ======>>>>>>>>>>", id);
      try {
        // this.isDataLoaded = true;
        const response = await axios.get(
            `${putUrl}canadianlicapi/policy/api/v2/get-policy-related-data/${id}`
          );
          const policyData = response.data?.policyDetails
          console.log("<<<<<<<<<<<<<<< FETCH response >>>>>>>>>>>>", policyData);

        this.apiData.basicInfo = {
          ...policyData?.policies, 
          locationCommission:policyData?.supervisaPolicySubDetails?.locationCommission,
          corporateCommission:policyData?.supervisaPolicySubDetails?.corporateCommission,
          advisorCommission:policyData?.supervisaPolicySubDetails?.advisorCommission,
        };
        this.apiData.trackers = {...policyData?.annuitantAndTracking};
        this.apiData.annuitantInfo = {
          InvestmentBasketData:[...policyData?.inBasket],
          ...policyData?.annuitantAndTracking
        };
        this.apiData.services = {
          Beneficiary:[...policyData?.beneficiary]
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
      if(this.route.params.id){
        this.isDataLoaded = true;
        await axios.post(`${putUrl}canadianlicapi/policy/inv/api/v2/update-policy/${this.route.params.id}`, this.apiData)
        .then((response) => {
          this.isDataLoaded = false;
          Swal.fire({
            title: "<strong>Investment Updated Successfully</strong>",
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
        await axios.put(`${putUrl}canadianlicapi/policy/inv/api/v2/create-policy-investment`, this.apiData)
        .then((response) => {
          this.isDataLoaded = false;
          Swal.fire({
            timer: 2000,
            title: "<strong>Investment Created Successfully</strong>",
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
