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

      <!-- stepper ends here -->
    </div>
    <div class="row">
      <div class="col-12 col-lg-12 m-auto">
        <RefferalInfo
          v-if="currentStep === 0"
          @next="handleNext('referralInfo', $event)"
          :RefferalInfo="apiData.referralInfo"
          :owners="users"
          :leads="leads"   
          :contacts="contacts"   
          :referral="referral"   
        />
        <RefferalPayout
          v-if="currentStep === 1"
          @next="handleNext('referralPayout', $event)"
          @previous="handlePrevious"
          :RefferalPayou="apiData.referralPayout"
        />
        <RefferalScoreboard
          v-if="currentStep === 2"
          :RefferalScoreboard="apiData.referralScoreboard"
          @next="handleNext('referralScoreboard', $event)"
          @previous="handlePrevious"
          @submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>
<style>
.multisteps-form__panel {
  position: relative !important;
  display: none !important;
  transition: padding 0.3s ease; /* Add transition for smoother padding change */
  padding-bottom: 0; /* Initially set padding bottom to 0 */
}
.multisteps-form__panel.js-active {
  display: block !important;
}
.select-box select {
  display: content !important;
  border: 1px solid #e0e3e7 !important;
  border-radius: 10px;
}
select {
  height: 2.5rem !important;
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
  border-radius: 10px;
}
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { putUrl } from "../../boot/axios";
// import { verifyUser } from "../../verifyUser/verifyUser.js";
import router from "../../router/index.js";
import Loader from "../utils/Loader.vue";
import { useRoute } from "vue-router";

// ***********COMPONENT FILES***********
import { reactive } from "vue";
import RefferalInfo from "../referrals/refferalPayable/RefferalInfo.vue";
import RefferalPayout from "../referrals/refferalPayable/RefferalPayout.vue";
import RefferalScoreboard from "../referrals/refferalPayable/RefferalScoreboard.vue";

export default {
  props: ["id"],
  components: {
    RefferalInfo,
    RefferalPayout,
    RefferalScoreboard,
    Loader
  },
  data() {
    const route = useRoute();
    return {
      route,
      isLoading: false,
      isDataLoaded: false,
      currentStep: 0,
      steps: [
        { title: "Refferal Information" },
        { title: "Refferal Payout" },
        { title: "Refferal Scoreboard" },
      ],
      users: [],
      leads: [],
      contacts: [],
      referral:[],
      apiData: reactive({
        referralInfo: {},
        referralPayout: {},
        referralScoreboard: {},
        layout: "Referral Payable",
      }),
    };
  },
  async created() {
    this.users = await this.fetchUsers();
    this.leads = await this.fetchLeads();
    this.contacts =  await this.fetchContacts();
    this.referral =  await this.fetchReferralData();
    // console.log("Users created", this.users);
    if (this.route.params.id) {
      await this.fetchInitialData(this.route.params.id);
      console.log("this.apiData", this.apiData);
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-users`);
        // console.log("<===User res====>", response.data?.users);
        return response.data?.users;
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    },
    async fetchLeads() {
      try {
        const leadResp = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-lead-data`);
        // console.log("<===leads res====>", leadResp.data?.leads);
        return leadResp.data?.leads;

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
    async fetchReferralData() {
      try {
        const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-referral`);
        return response.data?.referral;
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },
    async fetchInitialData(id) {
      try {
        this.isDataLoaded = true;
        const response = await axios.get(
          `${putUrl}canadianlicapi/finance/refferal/api/v2/getreferral-byId/${id}`
        );
        console.log("<===Referral by id==>", response);
        const referalData = response.data?.refferalDetails;
        // const dealData = dealDetails;
        this.apiData.referralInfo = { ...referalData?.referralData };
        this.apiData.referralPayout = { 
          year:referalData?.referralData?.year,
          firstPolicyIssueDate:referalData.referralData.firstPolicyIssueDate,
          client:referalData?.referralData?.client,
          productCategoryReffered:referalData?.referralData?.productCategoryReffered,
          referralPayout:referalData?.referralData?.referralPayout,
         };
        this.apiData.referralScoreboard = {scoreboardData:[...referalData?.referralScore]};
        this.isDataLoaded = false;
      } catch (error) {
        console.error("Error fetching initial data:", error);
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
      if (this.route.params.id) {
        this.isLoading = true;
        await axios
        .post(
            `${putUrl}canadianlicapi/finance/refferal/api/v2/update-referral/${this.route.params.id}`,
            this.apiData
          )
          .then((response) => {
            this.isLoading = false;
            Swal.fire({
              title: "<strong>Refferal Updated Successfully</strong>",
              icon: "success",
              timer: 1000,
            });
            setTimeout(() => {
              router.push("/refferallist");
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
      } else {
        console.log("else Submitting final data...", this.apiData);
        this.isLoading = true;
        await axios
          .put(
            `${putUrl}canadianlicapi/finance/refferal/api/v2/create-referral`,
            this.apiData
          )
          .then((response) => {
            this.isLoading = false;
            Swal.fire({
              timer: 2000,
              title: "<strong>Referal Created Successfully</strong>",
              icon: "success",
            });
            setTimeout(() => {
              router.push("/refferallist");
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
      }
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // alert("Data submitted successfully!");
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    },
  },
};
</script>
