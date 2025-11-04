<template>
  <div class="container-fluid ps-0 pe-2">
    <div class="row">
      <div class="col-12">
        <div class="multisteps-form">
          
          <!-- Advisor Information Form -->
          <div class="row">
            <div class="col-12 col-lg-12 m-auto">
              <form class="multisteps-form__form">
                <!-- Advisor Information Panel -->
                <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative" data-animation="FadeIn">
                  <Loader :loading="isLoading"></Loader>
                  <h5 class="font-weight-bolder mb-0">Advisor Information</h5>
                  <div class="multisteps-form__content">
                    <div class="row col-12">
                      <!-- Advisor Owner Select -->
                      <div class="col-6 col-sm-6 mt-3 mt-sm-0">
                        <label>Contracted Advisor Listing<span class="text-danger">*</span></label>
                        <select class="form-select" id="insurancePartnerOwnerOptions" v-model="formData.locationOwner">
                          <option value="" disabled selected class="text-muted">Select Owner</option>
                          <option v-for="(userData, index) in insurancePartnerOwnerOptions" :key="index" :value="userData.ROWID">
                            {{ userData.firstName }}
                          </option>
                        </select>         
                      </div>
                      <!-- Location Name -->
                      <div class="col-6 col-sm-6 mt-3 mt-sm-0">
                        <label>Advisor Credentials Owner <span class="text-danger">*</span></label>
                        <div class="form-group multisteps-form__input">
                          <input v-model="formData.locationName" :class="{ highlight: errors.locationName }" type="text" class="form-control form-control-default" />
                        </div>
                      </div>
                    </div>
                    <!-- Additional Advisor Information Fields -->
                    <div class="row col-12 mt-2">
                      <!-- Advisor Name -->
                      <div class="col-6 col-sm-6 mt-sm-0">
                        <label>Insurance Partner Listing</label>
                        <div class="form-group multisteps-form__input">
                          <input v-model="formData.AdvisorName" type="text" class="form-control form-control-default" />
                        </div>
                      </div>
                      <!-- Advisor Type -->
                      <div class="col-6 col-sm-6 mt-sm-0">
                        <label>Email</label>
                        <div class="form-group multisteps-form__input">
                          <input v-model="formData.AdvisorType" type="text" class="form-control form-control-default" />
                        </div>
                      </div>
                    </div>
                    <div class="row col-12 mt-2">
                      <!-- Owner -->
                      <div class="col-6 col-sm-6 mt-sm-0">
                        <label>MGA</label>
                        <div class="form-group multisteps-form__input">
                          <input v-model="formData.Owner" type="text" class="form-control form-control-default" />
                        </div>
                      </div>
                      <!-- Email -->
                      <div class="col-6 col-sm-6 mt-sm-0">
                        <label>Password</label>
                        <div class="form-group multisteps-form__input">
                          <input v-model="formData.email" type="email" class="form-control form-control-default" />
                        </div>
                      </div>
                    </div>               
                    <!-- More Fields -->
                    <div class="button-row d-flex justify-content-center mt-2">
                      <!-- Next Button -->
                      <div class="button-row d-flex justify-content-center mt-2 gap-4">
                        <!-- Previous Button -->
                        <button class="btn mb-0 bg-gradient-light btn-md js-btn-prev" type="button">Prev</button>
                        <!-- Submit Button -->
                        <button v-if="!id" class="btn mb-0 bg-gradient-dark btn-md js-btn-next" type="button" @click.prevent="handleSubmitForm">Submit</button>
                        <!-- Update Button -->
                        <button v-else class="btn mb-0 bg-gradient-dark btn-md js-btn-next" type="button" @click.prevent="handleUpdateForm">Update</button>
                      </div>
                    </div>
                  </div>
                </div>                 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, reactive, onMounted } from "vue";
import Loader from "../../components/Loader.vue";
import { putUrl } from "../../boot/axios.js"; 


export default {
  components: {
    Loader,
  },
  setup() {
    // Reactive form data
    const formData = reactive({
      locationOwner: "",
      locationName: "",
      email: "",
      Owner: "",
      AdvisorName: "",
      AdvisorType: "",
      AdvisorStatus: "",
    });

    // Loading state
    const isLoading = ref(false);

    // Error handling (if needed)
    const errors = reactive({
      locationOwner: "",
      locationName: "",
      email: "",
      Owner: "",
      AdvisorName: "",
      AdvisorType: "",
      AdvisorStatus: "",
    });

    // Function to handle form submission
    const handleSubmitForm = () => {
      console.log("Form submitted");
    };

    // Function to handle form update
    const handleUpdateForm = () => {
      console.log("Form updated");
    };

    // Placeholder data (to be replaced with actual data)
    const insurancePartnerOwnerOptions = ref([]);

    // Fetch advisor owner options from API
    const fetchAdvisorOwnerOptions = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(`${putUrl}lead/api/v1/getAllAdvisor`);
        this.insurancePartnerOwnerOptions = response?response.data.map((item) => item.advisors):[];
        console.log("response", response)
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchAdvisorOwnerOptions();
    });

    return {
      formData,
      handleSubmitForm,
      insurancePartnerOwnerOptions,
      isLoading,
      handleUpdateForm,
      errors
    };
  }
};
</script>

<style>
/* Your styles here */
</style>
