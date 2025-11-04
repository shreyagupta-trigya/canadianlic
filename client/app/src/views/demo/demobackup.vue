<template>
    <div class="container-fluid ps-0 pe-2">
      <!-- Your component content goes here, only rendered when data is ready -->
      <!-- Stepper starts here -->
      <div class="row">
        <div class="col-12">
          <div class="multisteps-form">
            <div class="row">
              <div class="col-12 mx-auto mb-2">
                <div class="card">
                  <div class="card-body">
                    <div class="multisteps-form__progress">
                      <!-- Deal Information form -->
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 1"
                      >
                        Deal Info
                      </button>
                      <!-- Deal Ownership form -->
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 2"
                      >
                        Deal Ownership
                      </button>
                      <!-- Policy Tracking form -->
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 3"
                      >
                        Policy Tracking
                      </button>
                      <!-- Policy Review & Renewal form -->
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 4"
                      >
                        Review & Renewal
                      </button>
                      <!-- Claims form -->
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 5"
                      >
                        Claims
                      </button>
                      <!-- App Calculation form -->
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 6"
                      >
                        App Calculation
                      </button>
                      <!-- Deal Trustee form -->
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 7"
                      >
                        Deal Trustee
                      </button>
                      <!-- Deal Beneficiaries form -->
                      <button
                        @click.prevent="sendData"
                        class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                        type="button"
                        title="Step 8"
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
      <!-- Stepper ends here -->
      <!-- Next Button at top -->
      <div class="d-flex justify-content-end align-item-center px-4 bg-white">
        <button
          class="btn mb-0 bg-gradient-dark btn-md null null mb-0 js-btn-next"
          type="button"
        >
          Next
        </button>
      </div>
      <!-- Next Button at top ends -->
      <!-- Components -->
      <div v-if="isDataLoaded">
        <div class="row">
          <div class="col-12 col-lg-12 m-auto">
            <form class="multisteps-form_from">
              <!-- Deal Information form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative"
                data-animation="FadeIn"
              >
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
              <!-- APP CALCULATION form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <ApplicationCal :getdealClais="getdealClais" :Claims="apiData.Claims" />
              </div>
              <!-- DEAL TRUSTEE form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <DealTrustee :getdealClais="getdealClais" :Claims="apiData.Claims" />
              </div>
              <!-- DEAL BENEFICIARIES form -->
              <div
                class="card multisteps-form__panel p-3 border-radius-xl bg-white"
                data-animation="FadeIn"
              >
                <DealBene :getdealClais="getdealClais" :Claims="apiData.Claims" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-else>
        <Loader :loading="!isDataLoaded"></Loader>
      </div>
    </div>
  </template>
  <script>
  import { reactive, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  import DealInformation from "../deals/dealComponents/DealInformation.vue";
  import DealOwnership from "../deals/dealComponents/DealOwnership.vue";
  import PolicyTracking from "../deals/dealComponents/PolicyTracking.vue";
  import PolicyReview from "../deals/dealComponents/PolicyReview.vue";
  import Claims from "../deals/dealComponents/Claims.vue";
  import ApplicationCal from "../deals/dealComponents/ApplicationCal.vue";
  import DealTrustee from "../deals/dealComponents/DealTrustee.vue";
  import DealBene from "../deals/dealComponents/DealBene.vue";
  import Loader from "../utils/Loader.vue";
  import { mapGetters, mapActions } from "vuex";
  
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
      Loader
    },
    computed: {
      ...mapGetters("dealModule", [
        "dealDataObj",
        "usersArr",
        "contactsArr",
        "advisorsArr",
        "locationsArr",
        "leadsArr",
      ]),
    },
    methods: {
      ...mapActions("dealModule", [
        "fetchDeals",
        "fetchUsers",
        "fetchContacts",
        "fetchLocations",
        "fetchLeads",
      ]),
      getDealInfo(data) {
        this.apiData.DealInformation = data;
        console.log("Deal info fetched...", data);
      },
      getDealOwnership(data) {
        this.apiData.DealOwnership = data;
      },
      getDealPolicyTracking(data) {
        this.apiData.PolicyTracking = data;
      },
      getPolicyReview(data) {
        this.apiData.PolicyReview = data;
      },
      getDealTrustee(data) {
        this.apiData.DealTrustee = data;
        if (this.route.params.id) {
          this.updateDealInfo();
        } else {
          this.createDealInfo();
        }
      },
      getApplicationCal(data) {
        this.apiData.ApplicationCal = data;
      },
      getdealClais(data) {
        this.apiData.Claims = data;
      },
      updateDealInfo(data) {
        // formData.DealInformation = data;
        console.log("Updating form...", data);
      },
      createDealInfo(data) {
        console.log("Create form...", data);
      },
      handleSubmitForm() {
        console.log("Submitting form...");
      },
    },
    data() {
      const route = useRoute();
      const errors = reactive({
        insuranceLeadOwner: "",
      });
      const state = reactive({
        currentStep: 0,
      });
      const updateProgress = () => {
        const progressButtons = document.querySelectorAll(
          ".multisteps-form__progress-btn"
        );
        progressButtons.forEach((button, index) => {
          button.classList.toggle("js-active", index <= state.currentStep);
        });
      };
      const goToStep = (stepIndex) => {
        console.log("Going to step...", stepIndex);
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
        console.log(
          "<<<<<<<<<<<<<<< ================ onMounted =================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        console.log("STATE CURRENT STEP", state.currentStep);
  
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
        console.log(
          "<<<<<<<<<<<<<<< ================ onMounted END=================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        console.log("STATE CURRENT STEP", state.currentStep);
      });
      return {
        route,
        errors,
        state,
        isDataLoaded: false,
        goToStep,
        adjustFormPanelPadding,
        updateProgress,
        apiData: {
          DealInformation: {},
          DealOwnership: {},
          PolicyTracking: {},
          PolicyReview: {},
          Claims: {},
          ApplicationCal: {},
          DealTrustee: {},
        },
        users: [],
        contacts: [],
        location: [],
        leads: [],
      };
    },
    async created() {
      try {
        console.log("this.$route.params.id", this.$route.params.id);
  
        if (this.$route.params.id) {
          await this.fetchDeals(this.$route.params.id); // Await the data fetching
          this.apiData.DealInformation = this.dealDataObj?.deals;
          console.log(`Deal Information ${this.apiData.DealInformation}`);
        }
        await this.fetchUsers();
        await this.fetchContacts();
        await this.fetchLocations();
        await this.fetchLeads();
        this.users = this.usersArr;
        this.contacts = this.contactsArr;
        this.location = this.locationsArr;
        this.leads = this.leadsArr;
        this.isDataLoaded = true; // Set the flag to true when data is ready
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  };
  </script>
  