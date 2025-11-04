<template>
    <div class="container-fluid ps-0 pe-2">
      <div class="row">
        <div class="col-12">
          <div class="multisteps-form">
            <!-- Progress bar -->
            <div class="row">
              <div class="col-12 mx-auto mb-2">
                <div class="card">
                  <div class="card-body">
                    <div class="multisteps-form__progress">
                      <button class="multisteps-form__progress-btn js-active position-relative formstep-text-color" type="button" title="Step 1">
                        Lead Info
                      </button>
                      <button class="multisteps-form__progress-btn formstep-text-color" type="button" title="Step 2">
                        Step 2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Lead Information Form -->
            <div class="row">
              <div class="col-12 col-lg-12 m-auto">
                <form class="multisteps-form_from ">
                  <!-- Lead Information Panel -->
                  <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative" data-animation="FadeIn">
                    <Loader :loading="isLoading"></Loader>
                    <h5 class="main-heading mb-0">Parent Contact Information</h5>
                    <div class="multisteps-form__content">
                      <div class="row col-12">
                        <!-- Lead Owner Select -->
                        <div class="col-lg-6 col-12 mt-3 mt-sm-0 ">
                          <label class="my-0 mt-2">Partner Contact<span class="text-danger">*</span></label>
                          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
                            <div class="select-box" :class="{ highlight: errors.locationOwner }">
                              <select required id="choices-state" class="multisteps-form__select form-control choices__input" v-model="formData.locationOwner" name="choices-state" tabindex="-1" data-choice="active">
                                <option value="">Select</option>
                                <option v-for="(userData, index) in insurancePartnerOwnerOptions" :key="index" :value="userData.ROWID">{{ userData.firstName }}</option>
                              </select>
                              <span v-if="errors.locationOwner" class="error input-error-font-size">{{ errors.locationOwner }}</span>
                            </div>
                          </div>
                        </div>
                        <!-- Location Name -->
                        <div class="col-lg-6 col-12col-sm-6 mt-3 mt-sm-0">
                          <label class="my-0 mt-2">Email<span class="text-danger">*</span></label>
                          <div class="form-group multisteps-form__input  mb-0">
                            <input v-model="formData.locationName" :class="{ highlight: errors.locationName }" type="text" class="form-control form-control-default" isrequired="false" />
                            <span v-if="errors.locationName" class="error input-error-font-size">{{ errors.locationName }}</span>
                          </div>
                        </div>
                      </div>
                      <!-- Additional Lead Information Fields -->
                      <div class="row col-12 mt-2">
                        <!-- Lead Name -->
                        <div class="col-lg-6 col-12col-sm-6 mt-sm-0 ">
                          <label class="my-0 mt-2">Partner Contact Owner</label>
                          <div class="form-group multisteps-form__input  mb-0">
                            <input v-model="formData.leadName" type="text" class="form-control form-control-default" isrequired="false" />
                          </div>
                        </div>
                        <!-- Lead Type -->
                        <div class="col-lg-6 col-12col-sm-6 mt-sm-0">
                          <label class="my-0 mt-2">Parent Partner</label>
                          <div class="form-group multisteps-form__input  mb-0">
                            <input v-model="formData.leadType" type="text" class="form-control form-control-default" isrequired="false" />
                          </div>
                        </div>
                      </div>
                      <div class="row col-12 mt-2">
                        <!-- Email -->
                        <div class="col-lg-6 col-12col-sm-6 mt-sm-0">
                          <label class="my-0 mt-2">Address</label>
                          <div class="form-group multisteps-form__input  mb-0">
                            <input v-model="formData.email" type="email" class="form-control form-control-default" isrequired="false" />
                          </div>
                        </div>
                      
                      </div>
                     
                      <!-- More Fields -->
                      <div class="button-row d-flex justify-content-center mt-4 space">
                        <!-- Next Button -->
                        <button class="btn mb-0 bg-gradient-dark btn-md null null mb-0 js-btn-next" type="button">Next</button>
                      </div>
                    </div>
                  </div>
                  <!-- Address Information Panel -->
                  <div class="card multisteps-form__panel p-3 border-radius-xl bg-white" data-animation="FadeIn">
                    <h5 class="main-heading mb-0">Address Information</h5>
                    <div class="multisteps-form__content">
                      <!-- Address Information Fields -->
                      <div class="col-12 row mt-3">
                        <!-- Billing Address Fields -->
                        <div class="column col-6">
                          <div class="col-12 col-sm-12">
                            <label>Billing Street</label>
                            <div class="form-group multisteps-form__input  mb-0">
                              <input v-model="formData.street" type="text" class="form-control form-control-default" isrequired="false" autocomplete="off" />
                            </div>
                          </div>
                          <!-- More Billing Address Fields -->
                        </div>
                        <!-- Shipping Address Fields -->
                        <div class="column col-6">
                          <div class="col-12 col-sm-12">
                            <label>Shipping Street</label>
                            <div class="form-group multisteps-form__input  mb-0">
                              <input :class="{ highlight: errors.shipmentStreet }" v-model="formData.shipmentStreet" type="text" class="form-control form-control-default" isrequired="false" autocomplete="off" />
                              <span v-if="errors.shipmentStreet" class="error input-error-font-size">{{ errors.shipmentStreet }}</span>
                            </div>
                          </div>
                          <!-- More Shipping Address Fields -->
                        </div>
                      </div>
                      <!-- More Address Information Fields -->
                      <div class="button-row d-flex justify-content-center mt-2 gap-4 space">
                        <!-- Previous Button -->
                        <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button">Prev</button>
                        <!-- Submit Button -->
                        <button v-if="!id" class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button" @click.prevent="handleSubmitForm">Submit</button>
                        <!-- Update Button -->
                        <button v-else class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button" @click.prevent="handleUpdateForm">Update</button>
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
  import { ref, reactive } from "vue";
  
  export default {
    setup() {
      // Reactive form data
      const formData = reactive({
        locationOwner: "",
        locationName: "",
        email: "",
        phone: "",
        fax: "",
        website: "",
        rating: "",
        leadName: "",
        leadType: "",
        leadOwner: "",
        leadStatus: "",
        createdTime: "",
        modifiedTime: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        shipmentStreet: "",
        shipmentCity: "",
        shipmentState: "",
        shipmentPostalCode: "",
        shipmentCountry: ""
      });
  
      // Loading state
      const isLoading = ref(false);
  
      // Error handling (if needed)
      const errors = reactive({
        locationOwner: "",
        locationName: "",
        shipmentStreet: ""
      });
  
      // Function to handle form submission
      const handleSubmitForm = () => {
        // Perform form submission logic here
      };
  
      // Function to handle form update
      const handleUpdateForm = () => {
        // Perform form update logic here
      };
  
      // Placeholder data (to be replaced with actual data)
      const insurancePartnerOwnerOptions = [
        { ROWID: 1, firstName: "John Doe" },
        { ROWID: 2, firstName: "Jane Doe" }
      ];
  
      // Placeholder data (to be replaced with actual data)
      const locationListingOptions = [
        { ROWID: 1, locationName: "Location 1" },
        { ROWID: 2, locationName: "Location 2" }
      ];
  
      return {
        formData,
        handleSubmitForm,
        insurancePartnerOwnerOptions,
        locationListingOptions,
        isLoading,
        handleUpdateForm,
        errors
      };
    }
  };
  </script>
  
  <style>
  /* Your styles here */
  @media screen and (max-width:500px) {
  .space{
    margin-bottom:500px;
  }
}
  </style>
  