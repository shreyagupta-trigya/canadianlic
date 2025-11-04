<template>
  <Loader :loading="isDataLoaded"></Loader>
  <div v-if="!isDataLoaded" class="container-fluid ps-0 pe-2">
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
    <!-- stepper ends here -->
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
        <DescriptonInfo
          v-if="currentStep === 1"
          @next="handleNext('DescriptonInfo', $event)"
          @previous="handlePrevious"
          :DescriptonInfo="apiData.DescriptonInfo"
        />
        <!-- family tree form -->
        <FamilyTree
          v-if="currentStep === 2"
          @next="handleNext('FamilyTree', $event)"
          @previous="handlePrevious"
          :FamilyTree="apiData.FamilyTree"
        />
        <AddressInformation
          v-if="currentStep === 3"
          @next="handleNext('AddressInformation', $event)"
          @previous="handlePrevious"
          :AddressInformation="apiData.AddressInformation"
        />
        <div v-if="currentStep === 4">
          <UMTDetails
            v-if="currentStep === 4"
            :UMTDetails="apiData.UMTDetails"
            :Facebook="apiData.Facebook"
            @next="handleUMTFacebookNext"
            @previous="handlePrevious"
          />

          <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-secondary" @click="handlePrevious">
              Previous
            </button>
            <button class="btn btn-primary" @click="handleUMTFacebookNext">
              Next
            </button>
          </div>
        </div>

        <!-- <Facebook
          v-if="currentStep === 5"
          @next="handleNext('Facebook', $event)"
          @previous="handlePrevious"
          :Facebook="apiData.Facebook"
        /> -->
        <FestivalForm
          v-if="currentStep === 5"
          @next="handleNext('FestivalForm', $event)"
          @previous="handlePrevious"
          :FestivalForm="apiData.FestivalForm"
        />
        <!-- <LeadManagementInformation
          v-if="currentStep === 6"
          @next="handleNext('LeadManagementInformation', $event)"
          @previous="handlePrevious"
          :LeadManagementInformation="apiData.LeadManagementInformation"
        /> -->
        <ServiceRequestDetails
          v-if="currentStep === 6"
          @next="handleNext('ServiceRequestDetails', $event)"
          @previous="handlePrevious"
          :ServiceRequestDetails="apiData.ServiceRequestDetails"
          :id="this.id"
        />
      </div>
    </div>
  </div>
</template>
<script>
// <<<<<<<<< VUE HELPER PLUGINS >>>>>>>>
import { reactive } from "vue";
import axios from "axios";
import { putUrl } from "../../boot/axios.js";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";
import router from "../../router/index";
import Loader from "../../views/utils/Loader.vue";
// <<<<<<<<<< LEAD COMPONENT >>>>>>>>>>
import LeadInformation from "./leadFormComponents/LeadInformation.vue";
import FamilyTree from "./leadFormComponents/FamilyTree.vue";
import DescriptonInfo from "./leadFormComponents/DescriptonInfo.vue";
import ServiceRequestDetails from "./leadFormComponents/ServiceRequestDetails.vue";
import UMTDetails from "./leadFormComponents/UMTDetails.vue";
import FestivalForm from "./leadFormComponents/FestivalForm.vue";
import AddressInformation from "./leadFormComponents/AddressInformation.vue";
import Facebook from "./leadFormComponents/Facebook.vue";
import LeadManagementInformation from "./leadFormComponents/LeadManagementInformation.vue";
// UAT
// leadsDetails,
// import {
//   users,
//   locations,
//   advisors,
// } from "./utils/leadResponse.js";

export default {
  props: ["id"],
  components: {
    LeadInformation,
    FamilyTree,
    DescriptonInfo,
    ServiceRequestDetails,
    UMTDetails,
    FestivalForm,
    AddressInformation,
    // Facebook,
    LeadManagementInformation,
    Loader,
  },

  data() {
    const route = useRoute();
    return {
      steps: [
        { title: "Information" },
        { title: "Description Info" },
        { title: "Family Tree" },
        { title: "Address Information" },
        { title: "UMTFacebook" },
        // { title: "Facebook" },
        { title: "Festivals" },
        { title: "Service Request Details" },
        // { title: "Lead Management" },
      ],
      isDataLoaded: false,
      currentStep: 0,
      route,
      apiData: reactive({
        LeadInformation: {},
        FamilyTree: {},
        DescriptonInfo: {},
        ServiceRequestDetails: {},
        UMTDetails: {},
        FestivalForm: {},
        AddressInformation: {},
        Facebook: {},
        LeadManagementInformation: {},
        layoutName: "client",
      }),
      users: [],
      advisors: [],
      location: [],
    };
  },
  async created() {
    this.isDataLoaded = true;
    // this.users = users;
    // this.advisors = advisors;
    // this.location = locations;
    this.users = await this.fetchUsers();
    this.advisors = await this.fetchAdvisors();
    this.location = await this.fetchLocations();
    if (this.route.params.id) {
      await this.fetchInitialData(this.route.params.id);
      console.log("this.apiData", this.apiData);
    }
    this.isDataLoaded = false;
  },
  methods: {
    handleUMTFacebookNext(data) {
      // combined payload from UMTDetails that includes Facebook also
      this.apiData.UMTDetails = data.UMTDetails;
      this.apiData.Facebook = data.Facebook;

      this.goToStep(this.currentStep + 1);
    },

    async fetchInitialData(id) {
      try {
        console.log("<<<<<<<<======leadDetails======>>>>>>>>>>", id);
        const response = await axios.get(
          `${putUrl}lead/api/v1/get-related-data/${id}`
        );
        const leadDetails = response.data?.leadDetails;
        //   console.log("<<<<<<<<<<< ======== LEAD DEATILS =========>>>>>>>>>>>>>>>>", leadDetails);
        // const leadDetails = leadsDetails;

        this.apiData.LeadInformation = leadDetails?.leads;
        this.apiData.DescriptonInfo = leadDetails?.leadsDescription;
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
        this.apiData.UMTDetails = {
          campaignidData: leadDetails?.leadService.campaignidData,
          networkData: leadDetails?.leadService.networkData,
          adgroupidData: leadDetails?.leadService.adgroupidData,
          deviceData: leadDetails?.leadService.deviceData,
          matchtypeData: leadDetails?.leadService.matchtypeData,
          keywordData: leadDetails?.leadService.keywordData,
          gclidData: leadDetails?.leadService.gclidData,
          lpUrlData: leadDetails?.leadService.lpUrlData,
        };
        this.apiData.AddressInformation = {
          street: leadDetails?.leadInformations.street,
          city: leadDetails?.leadInformations.city,
          state: leadDetails?.leadInformations.state,
          zipCode: leadDetails?.leadInformations.zipCode,
          country: leadDetails?.leadInformations.country,
        };
        this.apiData.Facebook = leadDetails?.leadInformations;
        console.log(
          "<<<<<<<<<<< ======== apiData DEATILS =========>>>>>>>>>>>>>>>>",
          this.apiData
        );
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
      this.isDataLoaded = true;
      console.log("Submitting final data...", this.apiData);
      try {
        if (this.route.params.id) {
          await axios
            .post(
              `${putUrl}lead/api/v1/updateNewLead/${this.route.params.id}`,
              { ...this.apiData, module: "client" }
            )
            .then((data) => {
              console.log(data);
            })
            .then(() => {
              this.isDataLoaded = false;
              Swal.fire({
                timer: 2000,
                title: "<strong>Lead Updated Successfully</strong>",
                icon: "success",
              });
              setTimeout(() => {
                router.push("/leads-list");
              }, 3000);
            })
            .catch((error) => {
              this.isDataLoaded = false;
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
              console.error("Error submitting data:", error);
            });
          this.isDataLoaded = true;
          this.route;
        } else {
          this.apiData.leadReferralId = this.$route.query.leadId;
          console.log("API Data for new lead:", this.apiData);
          await axios
            .put(`${putUrl}lead/api/v1/createNewLead`, {
              ...this.apiData,
              module: "client",
            })
            .then((data) => {
              console.log(data);
            })
            .then(() => {
              this.isDataLoaded = false;
              Swal.fire({
                timer: 2000,
                title: "<strong>Lead Created Successfully</strong>",
                icon: "success",
              });
              setTimeout(() => {
                router.push("/leads-list");
              }, 3000);
            })
            .catch((error) => {
              this.isDataLoaded = false;
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
              console.error("Error submitting data:", error);
            });
          this.isDataLoaded = true;
        }
        // await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        this.isDataLoaded = true;
        Swal.fire({
          title: error.message,
          icon: "error",
        });
        console.error("Error submitting data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Your scoped styles here */
</style>
