<template>
  <Loader :loading="isDataLoaded" />
  <div v-if="!isDataLoaded"  class="container-fluid ps-0 pe-2">
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
      
            <!-- // form 1 -->
           <BasicInfo 
           v-if="currentStep === 0"
           @next="handleNext('basicInfo', $event)"
           :basicInfo="this.apiData.basicInfo"
            :owners="users"
            :location="location"
            :contacts="contacts"
           />
          <!-- form 1 ends -->
          <!-- 2nd form -->
          <AdvisorDetails 
          v-if="currentStep === 1"
          @next="handleNext('advisorDetails', $event)"
          @previous="handlePrevious"
          :advisorDetails="this.apiData.advisorDetails"
          />
          <!-- 2nd form ends -->
          <!-- step3 starts LeadInfo -->
            <LeadInfo 
            v-if="currentStep === 2"
            @next="handleNext('leadInfo', $event)"
            @previous="handlePrevious"
            :leadInfo="this.apiData.leadInfo"
             :location="location"
            />

          <!-- step3 ends LeadInfo -->
          <!-- step4 starts  -->
            <Address
            v-if="currentStep === 3"
            @next="handleNext('address', $event)"
            @previous="handlePrevious"
            :address="this.apiData.address"
            />
          <!-- step4 ends  -->
          <!-- step5 starts  -->
            <FamilyTree 
            v-if="currentStep === 4"
            @next="handleNext('familyTree', $event)"
            @previous="handlePrevious"
            :familyTree="apiData.familyTree"
            />
     
          <!-- step5 ends  -->
          <!-- step6 starts  -->
            <AdvisorFYC
            v-if="currentStep === 5"
            @next="handleNext('advisorFYC', $event)"
            @previous="handlePrevious"
            :advisorFYC="this.apiData.advisorFYC"
            />
          <!-- step6 ends  -->
            <Festivals 
            v-if="currentStep === 6"
            @next="handleNext('festival', $event)"
            @previous="handlePrevious"
            :festival="this.apiData.festival"
            />
       
  </div>
</template>

<script>
// <<<<<<<<<<<<<<  VUE HELPER PLUGIN >>>>>>>>>>>
import Swal from "sweetalert2";
import axios from "axios";
import { putUrl } from "../../boot/axios";
import { useRoute } from "vue-router";
import router from "../../router/index";

import Loader from "../../views/utils/Loader.vue"

// <<<<<<<<<<<< ADVISOR COMPONENT >>>>>>>>>>>
import BasicInfo from "./advisorComponent/BasicInfo.vue";  
import AdvisorDetails from "./advisorComponent/AdvisorDetails.vue"
import LeadInfo from "./advisorComponent/LeadInfo.vue";
import Address from "./advisorComponent/Address.vue";
import FamilyTree from "./advisorComponent/FamilyTree.vue";
import AdvisorFYC from "./advisorComponent/AdvisorFYC.vue";
import Festivals from "./advisorComponent/Festivals.vue";
// import router from '../../router';
export default {
  props: ["id"],
  components: {
    Loader,
    LeadInfo,
    Address,
    FamilyTree,
    AdvisorFYC,
    Festivals,
    BasicInfo,
    AdvisorDetails
  },
  data(){
    const route = useRoute();
    return {
      route,
      isLoading: false,
      isDataLoaded: false,
      currentStep: 0,
    steps: [
      { title: " Basic Info" }, 
      { title: "Details" }, 
      { title: "Lead Info" }, 
      { title: "Address Info" }, 
      { title: "Family Tree" }, 
      { title: "FYC" }, 
      { title: "Festivals" }, 
    ],
    users: [],
    contacts: [],
    location: [],
    advisor: [],
    leads: [],
    apiData: {
      leadInfo:{},
      address:{},
      familyTree:{},
      advisorFYC:{},
      festival:{},
      basicInfo:{},
      advisorDetails:{},
      layout:"Advisor"
     },
    };
  },
  async created() {
    this.isDataLoaded = true;
    this.users =  await this.fetchUsers();
    this.contacts = await this.fetchContact();
    this.location = await this.fetchLocations();  
    this.advisor = await this.fetchAdvisors();
    // // console.log("advisors<=>", this.advisors);
    // // this.deals = await getPolicys();
    // this.insPartners = await getInsurancePartners();
    // this.insOfferingName = await getOfferingdata();
    // // this.users = users;
    // this.contacts = contacts;
    // this.location = locations;
    // this.leads = leads;
    if (this.route.params.id) {
    
      await this.fetchInitialData(this.route.params.id);
      console.log("this.apiData", this.apiData);
    }
    this.isDataLoaded = false;
  },
  methods: {
    async fetchInitialData(id) {
      console.log("<<<<<<<<====== POLICY DETAILS ======>>>>>>>>>>", id);
      try {
        this.isDataLoaded = true;
        const response = await axios.get(
            `${putUrl}canadianlicapi/contact/api/v2/get-advisor-related-data/${id}`
          );
          const advisorData = response.data?.advisorDetails
          console.log("<<<<<<<<<<<<<<< FETCH response >>>>>>>>>>>>", advisorData);
          this.apiData.basicInfo = {...advisorData?.advisors};
          this.apiData.advisorDetails = {...advisorData?.advisors,...advisorData?.advisorSubDetails};
          this.apiData.leadInfo = {
            ...advisorData?.advisorSubDetails,
            location2: advisorData?.advisors?.location2
          };
          this.apiData.address = {
            city: advisorData?.advisors?.city,
            country: advisorData?.advisors?.country,
            postalCode: advisorData?.advisors?.postalCode,
            ...advisorData?.advisorSubDetails
          };
          this.apiData.familyTree = {
            ...advisorData?.familyTree,
            siblingData:[...advisorData?.contactsSiblings],
            dependentChildrenData:[...advisorData?.dependentChildren],
            dependentParentsData:[...advisorData?.dependentParents],
            emergencyContactData:[...advisorData?.contactEmergencyDetails],
          };
          this.apiData.advisorFYC = {          
            advisorFycData:[...advisorData?.advisorFyc],
            advisorBonusData:[...advisorData?.advisorBonus],
          };
          console.log("<<<<<this.apiData.advisorFYC>>>>>>",  this.apiData.advisorFYC);
          this.apiData.festival = {   
            religion: advisorData?.advisors?.religion,       
            celebratedFestivals: advisorData?.advisors?.celebratedFestivals,       
            festivalsData:[...advisorData?.festivals]
          };
    
        console.log("this.apiData.basicInfo", this.apiData.basicInfo);
       
        this.isDataLoaded = true;
        // this.isLoading = false; 
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }     
    },
    async fetchUsers() {
      try {
        const response = await axios.get(`${putUrl}advisorfunction/api/v2/get-users`);
        return response.data?.users;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get(`${putUrl}advisorfunction/api/v2/get-locations`);
        return response.data?.locations;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    },
    async fetchAdvisors() {
      try {
        const response = await axios.get(`${putUrl}advisorfunction/api/v2/get-advisors`);
        return response.data?.advisors;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    },
    async fetchContact() {
      try {
        const response = await axios.get(`${putUrl}advisorfunction/api/v2/get-contacts`);
        return response.data?.contacts;
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
      await axios.post(`${putUrl}canadianlicapi/contact/api/v2/update-advisor/${this.route.params.id}`, this.apiData)
      .then((response) => {
        this.isLoading = false;
        Swal.fire({
          title: "<strong>Advisor Updated Successfully</strong>",
          icon: "success",
          timer: 1000,
        });
        setTimeout(() => {
          router.push("/advisorslist");
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
      await axios.put(`${putUrl}canadianlicapi/contact/api/v2/create-advisor`, this.apiData)
      .then((response) => {
        this.isLoading = false;
        Swal.fire({
          timer: 2000,
          title: "<strong>Advisor Created Successfully</strong>",
          icon: "success",
        });
        setTimeout(() => {
          router.push("/advisorslist");
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
      // await this.createNewPolicy();
    }
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    },
  }
};
</script>
<style>
input {
  height: 2rem;
  border-radius: none;
}

select {
  height: 2.2rem;
}

.heading {
  font-size: 17px;
}

.heading-div {
  height: 1.8rem;
}

.main-heading {
  font-weight: 500 !important;
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

.form-control-default {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
}
</style>
