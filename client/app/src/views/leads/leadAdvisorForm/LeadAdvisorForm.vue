<template>
  <Loader :loading="isDataLoaded"></Loader>
  <div v-if="!isDataLoaded"  class="container-fluid ps-0 pe-2">
    <!-- stepper starts here -->
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
    <div class="row">
      <div class="col-12 col-lg-12 m-auto">
        <!-- Forms -->
        <LeadInformation
          v-if="currentStep === 0"
          @next="handleNext('LeadInformation', $event)"
          :LeadInformation="apiData.LeadInformation"
          :owners="users"
          :adviosers="advisors"
          :location="location"
        />
        <FamilyTree
          v-if="currentStep === 1"
          @next="handleNext('FamilyTree', $event)"
          @previous="handlePrevious"
          :FamilyTree="apiData.FamilyTree"
        />
        <AddressInformation
          v-if="currentStep === 2"
          @next="handleNext('AddressInformation', $event)"
          @previous="handlePrevious"
          :AddressInformation="apiData.AddressInformation"
          
        />
        <ReferralInformation
          v-if="currentStep === 3"
          @next="handleNext('ReferralInformation', $event)"
          @previous="handlePrevious"
          :ReferralInformation="apiData.ReferralInformation"
          :contacts="contacts"
          :referral="referral"
          :leadSource="apiData.LeadInformation?.insuranceLeadSource"
        />
        <Facebook
          v-if="currentStep === 4"
          @next="handleNext('Facebook', $event)"
          @previous="handlePrevious"
          :Facebook="apiData.Facebook"
        />
        <FestivalForm
          v-if="currentStep === 5"
          @next="handleNext('FestivalForm', $event)"
          @previous="handlePrevious"
          :FestivalForm="apiData.FestivalForm"
        />
        <LeadManagementInformation
          v-if="currentStep === 6"
          @next="handleNext('LeadManagementInformation', $event)"
          @previous="handlePrevious"
          :LeadManagementInformation="apiData.LeadManagementInformation"
        />
        <ServiceRequestDetails
          v-if="currentStep === 7"
          @next="handleNext('ServiceRequestDetails', $event)"
          @previous="handlePrevious"
          :ServiceRequestDetails="apiData.ServiceRequestDetails"
        />
      </div>
    </div>
  </div>
</template>
<script>
/// <<<<<<<<<<<< LEAD ADVISOR COMPONENT >>>>>>>>>>>>
import AddressInformation from "./leadAdvisorFormComponents/AddressInformation.vue";
import FamilyTree from "./leadAdvisorFormComponents/FamilyTree.vue";
import FestivalForm from "./leadAdvisorFormComponents/FestivalForm.vue";
import LeadManagementInformation from "./leadAdvisorFormComponents/LeadManagementInformation.vue";
import LeadInformation from "./leadAdvisorFormComponents/LeadInformation.vue";
import ServiceRequestDetails from "./leadAdvisorFormComponents/ServiceRequestDetails.vue";
import ReferralInformation from "./leadAdvisorFormComponents/ReferralInformation.vue";
import Facebook from "./leadAdvisorFormComponents/Facebook.vue";
/// <<<<<<<<<<<< VUE HELPER PLUGINS >>>>>>>>>>>>  
import { reactive } from "vue";
import axios from "axios";
import { putUrl } from "../../../boot/axios.js";
import Swal from "sweetalert2";
import router from "../../../router/index.js";
import { useRoute } from "vue-router";
import Loader from "../../utils/Loader.vue"
// import { users, locations, advisors } from "../utils/leadResponse.js";
export default {
  components: {
    AddressInformation,
    FamilyTree,
    FestivalForm,
    LeadManagementInformation,
    LeadInformation,
    ReferralInformation,
    ServiceRequestDetails,
    Facebook,
    Loader
  },
  data() {
    const route = useRoute();
     return {
      steps: [
        { title: "Lead Info" },
        { title: "Family Tree" },
        { title: "Address Details" },
        { title: "Referral Info" },
        { title: "Facebook" },
        { title: "Festival" },
        { title: "Lead Management" },
        { title: "Service Request Details" },
      ],
      isDataLoaded: false,
      currentStep: 0,
      route,
      apiData: reactive({
        LeadInformation: {},
        FamilyTree: {},
        ReferralInformation: {},
        ServiceRequestDetails: {},
        FestivalForm: {},
        AddressInformation: {},
        Facebook: {},
        LeadManagementInformation: {},
      }),
    };
  },
  methods: {
    async fetchInitialData(id) {
      try {
        console.log("<<<<<<<<======dealResponse======>>>>>>>>>>", id);
        const response = await axios.get(
          `${putUrl}lead/api/v1/get-related-data/${id}`
        );
        const leadDetails = response.data?.leadDetails;
        //   console.log("<<<<<<<<<<< ======== LEAD DEATILS =========>>>>>>>>>>>>>>>>", leadDetails);
        // const leadDetails = leadAdvisor;

        this.apiData.LeadInformation = leadDetails?.leads;
        this.apiData.FamilyTree = {
          ...leadDetails?.familyTree,
          dependentChildrenData: leadDetails.dependentChildrenData,
          dependentParentsData: leadDetails.dependentParentsData,
          siblingData: leadDetails.siblingData,
          emergencyContactData: leadDetails.emergencyContactData,
        };
        this.apiData.FestivalForm = {
          religion: leadDetails?.leads.religion,
          celebratedFestivals: leadDetails?.leads.celebratedFestivals,
          festivalsData: leadDetails?.festivalsData,
        };
        this.apiData.LeadManagementInformation = {
          LeadData: leadDetails?.LeadData,
        };
        this.apiData.ServiceRequestDetails = leadDetails?.leadService;
        this.apiData.AddressInformation = {
          street: leadDetails?.leadInformations.street,
          city: leadDetails?.leadInformations.city,
          state: leadDetails?.leadInformations.state,
          zipCode: leadDetails?.leadInformations.zipCode,
          country: leadDetails?.leadInformations.country,
        };
        this.apiData.Facebook = leadDetails?.leadInformations;
        this.apiData.ReferralInformation ={
          year: leadDetails?.leadInformations?.year,
          productCategoryReferred: leadDetails?.leadInformations?.productCategoryReferred,
          referralClient: leadDetails?.leadInformations?.referralClient,
          referralOtherThanClient: leadDetails?.leadInformations?.referralOtherThanClient,
          referralSource: leadDetails?.leadInformations?.referralSource,
        };
        this.isDataLoaded = true;
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get(`${putUrl}lead/api/v1/get-users`);
        console.log("User res", response);
        return response.data?.users;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get(`${putUrl}lead/api/v1/get-locations`);
        return response.data?.locations;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    },
    async fetchAdvisors() {
      try {
        const response = await axios.get(`${putUrl}lead/api/v1/get-advisors`);
        return response.data?.advisors;
      } catch (error) {
        console.error("Error fetching advisors:", error);
      }
    },
    async fetchContacts() {
      try {
        const response = await axios.get(`${putUrl}lead/api/v1/get-contacts`);
        return response.data?.contacts;
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },
    async fetchReferral() {
      try {
        const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-referral`);
        return response.data?.referral;
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },
    goToStep(stepIndex) {
      this.currentStep = stepIndex;
      console.log(
        "<<<<<<<<<<<<======= DATA currentStep=========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
        this.currentStep
      );
    },
    handleNext(componentName, data) {
      this.apiData[componentName] = data;
      console.log(
        "<<<<<<<<<<<<======= DATA =========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
        this.currentStep
      );

      if (this.currentStep < this.steps.length - 1) {
        this.goToStep(this.currentStep + 1);
      } else {
        this.handleSubmit();
      }
      console.log(
        "<<<<<<<<<<<<======= DATA =========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
        this.currentStep
      );
    },
    handlePrevious() {
      if (this.currentStep > 0) {
        this.goToStep(this.currentStep - 1);
      }
    },
    async handleSubmit() {
      console.log("Submitting final data...", this.apiData);
      // Make final API call here

      try {
        if(this.route.params.id){
          await axios
          .post(`${putUrl}lead/api/v1/updateNewLead/${this.route.params.id}`, {
            ...this.apiData,
            module: "advisor",
          })
          .then((data) => {
            this.isDataLoaded = false;
            console.log(data);
          })
          .then(() => {
            Swal.fire({
              timer: 2000,
              title: "<strong>Lead Advisor Updated Successfully</strong>",
              icon: "success",
            });
            setTimeout(() => {
              router.push("/leads-list");
            }, 3000);
          })
          .catch((error) => {
            Swal.fire({
              title: error.message,
              icon: "error",
            });
          });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        }else {
        this.isDataLoaded = true;
        await axios
          .put(`${putUrl}lead/api/v1/createNewLead`, {
            ...this.apiData,
            module: "advisor",
          })
          .then((data) => {
            this.isDataLoaded = false;
            console.log(data);
          })
          .then(() => {
            Swal.fire({
              timer: 2000,
              title: "<strong>Lead Advisor Created Successfully</strong>",
              icon: "success",
            });
            setTimeout(() => {
              router.push("/leads-list");
            }, 3000);
          })
          .catch((error) => {
            Swal.fire({
              title: error.message,
              icon: "error",
            });
          });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // alert("Data submitted successfully!");
        }
      } catch (error) {
        Swal.fire({
          title: "Please fill all the required fields",
          icon: "error",
        });
        console.error("Error submitting data:", error);
      }
    },
  },
  async created() {
    this.isDataLoaded = true;
    // this.users = users;
    // // console.log("this.route.params.id", this.users);
    // this.advisors = advisors;
    // this.location = locations;
    this.users = await this.fetchUsers();
    this.advisors = await this.fetchAdvisors();
    this.location = await this.fetchLocations();
    this.contacts = await this.fetchContacts();
    this.referral = await this.fetchReferral();
    if (this.route.params.id) {
      await this.fetchInitialData(this.route.params.id);
      console.log("this.apiData", this.apiData);
    }
    this.isDataLoaded = false;
    // console.log("++++++++END ++++++=");
    
  },
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
