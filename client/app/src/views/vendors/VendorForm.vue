<template>
  <!-- <Loader :loading="isDataLoaded"></Loader> -->
  <div class="container-fluid ps-0 pe-2">
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
        <Vendorinfo
          v-if="currentStep === 0"
          @next="handleNext('vendorInfo', $event)"
          :VendorInfo="apiData.vendorInfo"
          :owners="users"
          :contacts="contacts"
        />
        <Address
          v-if="currentStep === 1"
          @next="handleNext('address', $event)"
          :Address="apiData.address"
          @previous="handlePrevious"
          @submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { putUrl } from "../../boot/axios";
import router from "../../router/index.js";
// import Loader from "../utils/Loader.vue";
import { useRoute } from "vue-router";

// ************COMPONENT FILE ***********
import Vendorinfo from "./components/vendorInfo.vue";
import Address from "./components/address.vue";
export default {
  props: ["id"],
  components: {
    Vendorinfo,
    Address,
    // Loader,
  },
  data() {
    const route = useRoute();
    return {
      route,
      isDataLoaded: false,
      currentStep: 0,
      steps: [{ title: "Vendor Info" }, { title: "Address" }],
      users:[],
      contacts:[],
      apiData: {
        vendorInfo: {},
        address: {},
        layout: "vendor",
      },
    };
  },
  methods: {
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
            `${putUrl}canadianlicapi/finance/vendor/api/v2/create-vendor//${this.route.params.id}`,
            this.apiData
          )
          .then((response) => {
            this.isLoading = false;
            Swal.fire({
              title: "<strong>Vendor Updated Successfully</strong>",
              icon: "success",
              timer: 1000,
            });
            setTimeout(() => {
              router.push("/Vendors-list");
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
        this.isLoading = true;
        await axios
          .post(
            `${putUrl}canadianlicapi/finance/vendor/api/v2/create-vendor`,
            this.apiData
          )
          .then((response) => {
            this.isLoading = false;
            Swal.fire({
              timer: 2000,
              title: "<strong>Vendor Created Successfully</strong>",
              icon: "success",
            });
            setTimeout(() => {
              router.push("/Vendors-list");
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    },
    async fetchUsers() {
    try {
      const response = await axios.get(`${putUrl}canadianlicapi/utils/api/v2/get-users`);
      console.log("<<==response==>", response);
      return response.data?.users;
    } catch (error) {
      console.error("Error fetching deals:", error);
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
  },
  async created() {
    this.users = await this.fetchUsers();
    this.contacts = await this.fetchContacts();
    // if (this.route.params.id) {
    //   await this.fetchInitialData(this.route.params.id);
    //   console.log("this.apiData", this.apiData);
    // }
    this.isDataLoaded = false;
  },

  
};
</script>

<style>
/* Your styles here */
</style>
