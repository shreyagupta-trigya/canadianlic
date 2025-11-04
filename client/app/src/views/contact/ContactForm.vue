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
    <!-- next button at top -->
    <ContactInfo 
      v-if="currentStep === 0"
      :ContactInfo="apiData.contactInfo"
      @next="handleNext('contactInfo', $event)" 
      :owners="users"
      :contacts="contacts"
      :leads="leads"
      :location="location"      
    />
    <Service  
      v-if="currentStep === 1"
      @next="handleNext('service', $event)"
      @previous="handlePrevious"
      :Service="apiData.service"
    />
    <Potential 
    v-if="currentStep === 2"
    @next="handleNext('potential', $event)"
    @previous="handlePrevious"
    :Potential="apiData.potential"
    />
    <FamilyTree 
    v-if="currentStep === 3"
    @next="handleNext('familyTree', $event)"
    @previous="handlePrevious"
    :FamilyTree="apiData.familyTree"
    />
    <Festival 
    v-if="currentStep === 4"
    @next="handleNext('festival', $event)"
    @previous="handlePrevious"
    :Festival="apiData.festival"
    />
    <Leadinfo 
    v-if="currentStep === 5"
    @next="handleNext('leadinfo', $event)"
    @previous="handlePrevious"
    :Leadinfo="apiData.leadinfo"
    :location="location"
    />
    <Facebook 
    v-if="currentStep === 6"
    @next="handleNext('facebook', $event)"
    @previous="handlePrevious"
    :Facebook="apiData.facebook"
    /> 
    <Address 
    v-if="currentStep === 7"
    @next="handleNext('address', $event)"
    @previous="handlePrevious"
    :address="apiData.address"
    />
    <LeadHistory 
    v-if="currentStep === 8"
    @next="handleNext('leadHistory', $event)"
    @previous="handlePrevious"
    :leadHistory="apiData.leadHistory"
    />
    <LeadMgt 
    v-if="currentStep === 9"
    @next="handleNext('leadMgt', $event)"
    @previous="handlePrevious"
    :leadMgt="apiData.leadMgt"
    @submit="handleSubmit"   
    />      
   
  </div>
</template>
<style>
.multisteps-form__content label {
  font-size: var(--crm-font-regular) !important;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500 !important;
  /* font-style: ; */
  /* font-family: */
}

.multisteps-form .main-heading {
  font-weight: 500 !important;
}

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
// <<<<<<<<<< VUE HELPER PLUGINS >>>>>>>>>
import axios from "axios";
import { putUrl } from "../../boot/axios.js";
import Swal from "sweetalert2";
import Loader from "../utils/Loader.vue";
import router from "../../router/index";
import { useRoute } from "vue-router";

// <<<<<<<< CONTACT COMPONENT >>>>>>>>>
import ContactInfo from "./contactComponent/ContactInfo.vue";
import Service from "./contactComponent/Services.vue";
import Potential from "./contactComponent/Potential.vue";
import FamilyTree from "./contactComponent/FamilyTree.vue";
import Festival from "./contactComponent/Festival.vue";
import Leadinfo from "./contactComponent/LeadInfo.vue";
import Facebook from "./contactComponent/Facebook.vue";
import Address from "./contactComponent/Address.vue";
import LeadHistory from "./contactComponent/LeadHistory.vue";
import LeadMgt from "./contactComponent/LeadMgt.vue";
// import {users,locations,leads,contacts} from "../demo/utils/dealResponse.js";

export default{
  props:["id"],
  components:{
    ContactInfo,
    Service,
    Potential,
    FamilyTree,
    Festival,
    Leadinfo,
    Facebook,
    LeadMgt,
    Address,
    LeadHistory,
    Loader,
  },
  data(){
    const route = useRoute();
    return{
      route,
      isLoading: false,
      isDataLoaded: false,
      currentStep:0,
      steps: [
        {title: "Contact Info"},
        {title: "Service"},
        {title: "Potential"},
        {title: "Family Tree"},
        {title: "Festivals"},
        {title: "Lead Info"},
        {title: "Facebook"},
        {title: "Address Info"},
        {title: "Conversion History"},
        {title: "Lead Mgt"},
      ],
      users: [],
      contacts: [],
      location: [],
      leads: [],
      apiData: {
        service: {},
        contactInfo: {},
        potential: {},
        familyTree: {},
        festival:{},
        leadinfo: {},
        facebook: {},
        leadMgt: {},
        address: {},
        leadHistory: {},
        layout : "Client",
        // leadIds:this.$route.query.leadId
      }
    }
  },
  async created() {
    this.isDataLoaded = true;
    this.users =  await this.fetchUsers();
    this.contacts = await this.fetchContacts();
    this.location = await this.fetchLocations();
    this.leads = await this.fetchLeads(); 
    console.log("contact leadID",this.$route.query.leadId);  
    if (this.route.params.id) {
      await this.fetchInitialData(this.route.params.id);
      console.log("this.apiData", this.apiData);
    }
    this.isDataLoaded = false;
  },
  methods: {
      async fetchInitialData(id) {
      console.log("<<<<<<<<====== CONTACT DETAILS ======>>>>>>>>>>", id);
      try {
        // this.isDataLoaded = true;
        const response = await axios.get(
            `${putUrl}canadianlicapi/contact/client/api/v2/get-contact/${id}`
          );
          const contactData = response.data?.contactDetails
          // console.log("<<<<<<<<<<<<<<< Contact response response >>>>>>>>>>>>", contactData);
        // // const dealData = dealDetails;
        this.apiData.contactInfo = {...contactData?.contacts};
        this.apiData.service = {...contactData?.contactSubDetails
        };
        this.apiData.potential = {...contactData?.contactSubDetails};
        this.apiData.festival = {...contactData?.contactSubDetails,festivalsData:[...contactData.festivals]};
        this.apiData.familyTree = {
          ...contactData?.familyTree,
          siblingData:[...contactData.contactsSiblings],
          dependentChildrenData:[...contactData.dependentChildren],
          dependentParentsData:[...contactData.dependentParents],
          emergencyContactData:[...contactData.contactEmergencyDetails],
        };
        this.apiData.leadinfo = {...contactData?.leadInformations};
        this.apiData.facebook = {...contactData?.leadInformations};
        this.apiData.address = {
          ...contactData?.contactSubDetails
        };
        this.apiData.leadMgt = {LeadMgtData:[...contactData?.leadConversionHistory]};
        this.apiData.leadHistory = {leadConversionHistoryData:[...contactData?.contactConversionHistory]};
         
        // this.isDataLoaded = false;
        // this.isDataLoaded = true;
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-users`);
        return response.data?.users;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    async fetchLeads() {
      try {
        const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-lead-data`);
        return response.data?.leads;
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    },
    async fetchContacts() {
      try {
        const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-contacts`);
        return response.data?.contacts;
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },
    async fetchLocations() {
      try {
        const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-locations`);
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
    // console.log("My Submit Function");
    // console.log("Submitting final data...", this.apiData);
      if(this.route.params.id){
        this.isDataLoaded = true;
        await axios.post(`${putUrl}canadianlicapi/contact/client/api/v2/update-contact/${this.route.params.id}`, this.apiData)
        .then((response) => {
          this.isDataLoaded = false;
          Swal.fire({
            title: "<strong>Contact Updated Successfully</strong>",
            icon: "success",
            timer: 1000,
          });
          setTimeout(() => {
            router.push("/contactlist");
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
        this.apiData.referralLeadId= this.$route.query.leadId;
        await axios.put(`${putUrl}canadianlicapi/contact/client/api/v2/create-contact`, this.apiData)
        .then((response) => {
          this.isDataLoaded = false;
          Swal.fire({
            timer: 2000,
            title: "<strong>Contact Created Successfully</strong>",
            icon: "success",
          });
          setTimeout(() => {
            router.push("/contactlist");
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

}
</script>
