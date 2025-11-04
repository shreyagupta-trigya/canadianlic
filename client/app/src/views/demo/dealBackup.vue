<template>
    <div  v-if="isLoading">
    <div class="container-fluid ps-0 pe-2">
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
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 1"
                      >
                        Deal Info
                      </button>
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 1"
                      >
                        Deal Ownership
                      </button>
  
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 1"
                      >
                        Policy Tracking
                      </button>
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 1"
                      >
                        Review & Renewal
                      </button>
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 1"
                      >
                        Claims
                      </button>
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 1"
                      >
                        App Calculation
                      </button>
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 1"
                      >
                        Deal Trustee
                      </button>
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 1"
                      >
                        Deal Beneficiaries
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
      <!-- next button at top -->
      <div class="d-flex justify-content-end align-item-center px-4 bg-white">
        <button
          class="btn mb-0 bg-gradient-dark btn-md null null mb-0 js-btn-next"
          type="button"
        >
          Next
        </button>
      </div>
      <!-- next button at top ends -->
        <div class="row">
          <div class="col-12 col-lg-12 m-auto">
            <!-- Forms -->
            <form class="multisteps-form_from">
              <!-- Deal Information form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative"
                data-animation="FadeIn"
              >
                <Loader :loading="isDataLoaded"></Loader>
                <!-- <h5 class="main-heading mb-0">Contact information ==>{{ dealInfo }}</h5> -->
                <div class="multisteps-form__content">
                  <DealInformation
                    :getDealInfo="getDealInfo"
                    :DealInformation="apiData.DealInformation"
                    :owners="users"
                    :contacts="contacts"
                    :location="location"
                    :leads="leads"
                  />
                </div>
              </div>
              <!-- Deal Ownership form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <DealOwnership
                  :getDealOwnership="getDealOwnership"
                  :DealOwnership="apiData.DealOwnership"
                />
              </div>
              <!-- Policy Tracking form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <PolicyTracking
                  :getDealPolicyTracking="getDealPolicyTracking"
                  :PolicyTracking="apiData.PolicyTracking"
                />
              </div>
              <!-- Policy Review & Renewal form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <PolicyReview
                  :getPolicyReview="getPolicyReview"
                  :PolicyReview="apiData.PolicyReview"
                />
              </div>
              <!-- Claims form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <Claims :getdealClais="getdealClais" :Claims="apiData.Claims" />
              </div>
              <!-- Claims form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <ApplicationCal
                  :getApplicationCal="getApplicationCal"
                  :ApplicationCal="apiData.ApplicationCal"
                />
              </div>
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <DealTrustee
                  :getDealTrustee="getDealTrustee"
                  :DealTrustee="apiData.DealTrustee"
                />
              </div>
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <DealBene
                  :getDealBene="getDealBene"
                  :DealBene="apiData.DealBene"
                />
              </div>
            </form>
          </div>
        </div>
    </div>
    </div>
    <div v-else>
      <Loader :loading="!isLoading"></Loader>
    </div>
  </template>
  
  <script>
  import { reactive, ref, toRefs, onMounted } from "vue";
  import Swal from "sweetalert2";
  import { putUrl } from "../../boot/axios.js";
  import axios from "axios";
  import router from "../../router/index";
  import { useRoute } from "vue-router";
  // import { mapGetters, mapActions } from "vuex";
  // import LeadInformation from '../leads/leadFormComponents/LeadInformation.vue';
  import DealInformation from "./dealComponents/DealInformation.vue";
  import DealOwnership from "./dealComponents/DealOwnership.vue";
  import PolicyTracking from "./dealComponents/PolicyTracking.vue";
  import PolicyReview from "./dealComponents/PolicyReview.vue";
  import Claims from "./dealComponents/Claims.vue";
  import ApplicationCal from "./dealComponents/ApplicationCal.vue";
  import DealTrustee from "./dealComponents/DealTrustee.vue";
  import DealBene from "./dealComponents/DealBene.vue";
  import Loader from "../utils/Loader.vue";
  export default {
    props: ["id"],
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
    // computed: {
    //   ...mapGetters("dealModule", [
    //     "dealDataObj",
    //     "usersArr",
    //     "contactsArr",
    //     "advisorsArr",
    //     "locationsArr",
    //     "leadsArr",
    //   ]),
    // },
    // methods: {
    //   ...mapActions("dealModule", [
    //     "fetchDeals",
    //     "fetchUsers",
    //     "fetchContacts",
    //     "fetchLocations",
    //     "fetchLeads",
    //   ]),
    // },
    data(props) {
      const route = useRoute();
      const isLoading = ref(false);
      const state = reactive({
        currentStep: 0,
      });
      const formData = reactive({
        DealInformation: {},
        DealOwnership: {},
        PolicyTracking: {},
        PolicyReview: {},
        Claims: {},
        ApplicationCal: {},
        DealTrustee: {},
        layout: "Deal Standard",
      });
      const errors = reactive({
        insuranceLeadOwner: "",
      });
  
      const getDealInfo = (data) => {
        console.log(props.id);
        console.log("getDealInfo", data);
        formData.DealInformation = data;
      };
      const getDealOwnership = (data) => {
        formData.DealOwnership = data;
      };
      const getDealPolicyTracking = (data) => {
        formData.PolicyTracking = data;
      };
      const getPolicyReview = (data) => {
        formData.PolicyReview = data;
      };
      const getDealTrustee = (data) => {
        formData.DealTrustee = data;
        console.log("this.route.params.id", this.route.params.id);
        if (this.route.params.id) {
          handleUpdateForm();
        } else {
          handleSubmitForm();
        }
      };
      const getApplicationCal = (data) => {
        formData.ApplicationCal = data;
      };
      const getdealClais = (data) => {
        formData.Claims = data;
      };
  
      const validateForm = () => {
        // Implement your form validation logic here
      };
  
      const hasErrors = () => {
        return Object.values(errors).some((error) => error !== "");
      };
      const handleUpdateForm = async () => {
        // isLoading.value = true;
        const formDataRefs = toRefs(formData);
        // const requestData = {};
        console.log("update data: ======>", formDataRefs);
        const requestData = {};
        for (const key in formDataRefs) {
          if (Array.isArray(formDataRefs[key].value)) {
            // If the property is an array, convert it to an array of objects
            requestData[key] = formDataRefs[key].value.map((item) => ({
              ...item,
            }));
          } else {
            // Otherwise, directly assign the value
            requestData[key] = formDataRefs[key].value;
          }
        }
  
        // requestData.familyTreeRowId = familyTreeRowId.value;
        // requestData.contactSubDetailsRowId = contactSubDetailsRowId.value;
        // requestData.leadInfoRowId = leadInfoRowId.value;
  
        console.log(requestData);
        await axios
          .post(`${putUrl}lead/api/v1/deal/updateDeal/${props.id}`, requestData)
          .then((data) => {
            Swal.fire({
              title: "<strong>Deal Updated Successfully</strong>",
              icon: "success",
              timer: 1000,
            });
            setTimeout(() => {
              router.push("/deals-list");
            }, 2000);
            console.log(data);
          })
          .catch((error) => {
            Swal.fire({
              title: error.message,
              icon: "success",
              timer: 1000,
            });
          });
      };
      const handleSubmitForm = async () => {
        console.log("Submit===>");
        // isLoading.value = true;
        const formDataRefs = toRefs(formData);
        const requestData = {};
        console.log("formDataRefs", formDataRefs);
        for (const key in formDataRefs) {
          if (Array.isArray(formDataRefs[key].value)) {
            requestData[key] = formDataRefs[key].value.map((item) => ({
              ...item,
            }));
          } else {
            requestData[key] = formDataRefs[key].value;
          }
        }
  
        validateForm();
  
        if (!hasErrors()) {
          try {
            const { data } = await axios.put(
              `${putUrl}deals/api/v1/create-new-deal`,
              requestData
            );
            console.log("data", data);
            // isLoading.value = false;
            Swal.fire({
              timer: 2000,
              title: "<strong>Deal Created Successfully</strong>",
              icon: "success",
            });
            setTimeout(() => {
              router.push("/deals-list");
            }, 3000);
          } catch (error) {
            Swal.fire({
              title: error.message,
              icon: "error",
            });
          }
        } else {
          Swal.fire({
            title: "Please fill all the required fields",
            icon: "error",
          });
        }
      };
  
      const updateProgress = () => {
        const progressButtons = document.querySelectorAll(
          ".multisteps-form__progress-btn"
        );
        progressButtons.forEach((button, index) => {
          button.classList.toggle("js-active", index <= state.currentStep);
        });
      };
  
      const goToStep = (stepIndex) => {
        const formPanels = document.querySelectorAll(".multisteps-form__panel");
        if (stepIndex >= 0 && stepIndex < formPanels.length) {
          formPanels[state.currentStep].classList.remove("js-active");
          state.currentStep = stepIndex;
          formPanels[state.currentStep].classList.add("js-active");
          updateProgress();
          adjustFormPanelPadding();
        }
      };
  
      const adjustFormPanelPadding = () => {
        const formPanels = document.querySelectorAll(".multisteps-form__panel");
        formPanels.forEach((panel) => {
          panel.style.paddingBottom =
            state.currentStep === formPanels.length - 1 ? "0" : "";
        });
      };
      onMounted(() => {
        const nextButtons = document.querySelectorAll(".js-btn-next");
        nextButtons.forEach((button) => {
          button.addEventListener("click", () => {
            goToStep(state.currentStep + 1);
          });
        });
        const prevButtons = document.querySelectorAll(".js-btn-prev");
        prevButtons.forEach((button) => {
          button.addEventListener("click", () => {
            goToStep(state.currentStep - 1);
          });
        });
        const progressIndicatorButtons = document.querySelectorAll(
          ".multisteps-form__progress-btn"
        );
        progressIndicatorButtons.forEach((button, index) => {
          button.addEventListener("click", () => {
            goToStep(index);
          });
        });
        updateProgress();
        adjustFormPanelPadding();
      });
  
      return {
        route,
        handleSubmitForm,
        getDealInfo,
        getDealOwnership,
        getDealPolicyTracking,
        getPolicyReview,
        getApplicationCal,
        getdealClais,
        getDealTrustee,
        isLoading,
        apiData: reactive({
          DealInformation: {},
          DealOwnership: {},
          PolicyTracking: {},
          PolicyReview: {},
          Claims: {},
          ApplicationCal: {},
          DealTrustee: {},
        }),
        users: [],
        contacts: [],
        location: [],
        leads: [],
      };
    },
    // async created() {
    //   try {
    //     console.log("this.$route.params.id", this.$route.params.id);
  
    //     if (this.$route.params.id) {
    //       await this.fetchDeals(this.$route.params.id); // Await the data fetching
    //       this.apiData.DealInformation = this.dealDataObj?.deals;
    //       console.log(`Deal Information ${this.apiData.DealInformation}`);
    //     }
    //     await this.fetchUsers();
    //     await this.fetchContacts();
    //     await this.fetchLocations();
    //     await this.fetchLeads();
    //     this.users = this.usersArr;
    //     this.contacts = this.contactsArr;
    //     this.location = this.locationsArr;
    //     this.leads = this.leadsArr;
    //     this.isLoading = true;
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },
    async beforeMount() {
      // await this.fetchDeals(this.$route.params.id); // Await the data fetching
      // this.apiData.DealInformation = this.dealDataObj?.deals;
      // console.log(`Deal Information ${this.apiData.DealInformation}`);
      this.users =  await this.fetchUsers();
      this.contacts = await this.fetchContacts();
      this.location = await this.fetchLocations();
      this.leads = await this.fetchLeads();
      this.isLoading = true;
    },
    methods: {
      async fetchUsers() {
          try {
            const response = await axios.get(
              `${putUrl}deals/api/v1/get-users`
            ); 
            console.log("BOOT",putUrl,response.data?.users);
            return response.data?.users;        
          } catch (error) {
            console.error('Error fetching deals:', error);
          }
      },
      async fetchLeads() {
        try {
          const response = await axios.get(
            `${putUrl}deals/api/v1/get-lead-data`
          ); 
          console.log("BOOT",putUrl,response.data?.leads);
          return response.data?.leads;        
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      },
      async fetchContacts() {
        try {
          const response = await axios.get(
            `${putUrl}deals/api/v1/get-contacts`
          ); 
          console.log("BOOT",putUrl,response.data?.contacts);
          return response.data?.contacts;        
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      },
      async fetchLocations() {
        try {
          const response = await axios.get(
            `${putUrl}deals/api/v1/get-locations`
          ); 
          console.log("BOOT",putUrl,response.data?.locations);
          return response.data?.locations;        
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your scoped styles here */
  </style>
  