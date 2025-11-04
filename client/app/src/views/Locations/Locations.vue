<template>
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
                      class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                      type="button"
                      title="Step 1"
                    >
                      Location Info
                    </button>
                    <button
                      class="multisteps-form__progress-btn formstep-text-color"
                      type="button"
                      title="Step 2"
                    >
                      Address
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
        <!-- Froms -->
        <form class="multisteps-form_from">
          <div
            class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative"
            data-animation="FadeIn"
          >
            <Loader :loading="isLoading"></Loader>
            <h5 class="main-heading mb-0">Location Information</h5>
            <!-- <p class="mb-0 text-sm"></p> -->
            <div class="multisteps-form__content">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4 mt-3 mt-sm-0">
                  <label class="my-0 mt-2"
                    >Location Owner <span class="text-danger">*</span></label
                  >
                  <div
                    class="choices"
                    data-type="select-one"
                    tabindex="0"
                    role="listbox"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div
                      class="select-box"
                      :class="{ highlight: errors.locationOwner }"
                    >
                      <select
                        required
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        v-model="formData.locationOwner"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option value="">Select</option>
                        <option
                          v-for="(
                            userData, index
                          ) in insurancePartnerOwnerOptions"
                          :key="index"
                          :value="userData.ROWID"
                        >
                          {{ userData.firstName }}
                        </option>
                      </select>
                      <span
                        v-if="errors.locationOwner"
                        class="error input-error-font-size"
                        >{{ errors.locationOwner }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 mt-3 mt-sm-0">
                  <label class="my-0 mt-2"
                    >Location Name <span class="text-danger">*</span></label
                  >
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.locationName"
                        :class="{ highlight: errors.locationName }"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                      />
                      <span
                        v-if="errors.locationName"
                        class="error input-error-font-size"
                        >{{ errors.locationName }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <label class="my-0 mt-2">Phone</label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.phone"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <label class="my-0 mt-2">Currency</label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.currency"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                        disabled
                        placeholder="CAD"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <label class="my-0 mt-2">Fax</label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.fax"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <label class="my-0 mt-2">Rating</label>
                  <div
                    class="choices"
                    data-type="select-one"
                    tabindex="0"
                    role="listbox"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="select-box">
                      <select
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                        v-model="formData.rating"
                      >
                        <option value="">Select</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Needs Improvement">
                          Needs Improvement
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <label class="my-0 mt-2">Parent Location </label>
                  <div
                    class="choices"
                    data-type="select-one"
                    tabindex="0"
                    role="listbox"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="select-box">
                      <select
                        v-model="formData.parentLocation"
                        required
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                        <option value="">Select</option>
                        <option
                          v-for="(data, index) in locationListingOptions"
                          :key="index"
                          :value="data.ROWID"
                        >
                          {{ data.locationName }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- <div class="col-6 ">
                                    <label class="my-0 mt-2">Insurance Lead<span class="text-danger">*</span></label>
                                    <div class="choices" data-type="select-one" tabindex="0" role="listbox"
                                        aria-haspopup="true" aria-expanded="false">
                                        <div class="select-box" :class="{ highlight: errors.insuranceLead }">
                                            <select v-model="formData.insuranceLead" required id="choices-state"
                                                class="multisteps-form__select form-control choices__input"
                                                name="choices-state" tabindex="-1" data-choice="active">
                                                <option value="">Select</option>
                                                <option v-for="(data, index) in advisorListingOptions" :key="index"
                                                    :value="data.ROWID">
                                                    {{ data.firstName }}
                                                </option>


                                            </select>
                                            <span v-if="errors.insuranceLead" class="error input-error-font-size">{{
                                                errors.insuranceLead
                                                }}</span>
                                        </div>
                                    </div>
                                </div> -->
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <label class="my-0 mt-0">Website</label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.website"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <label class="my-0 mt-2">Location Discount Factor %</label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.discountFactor"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <label class="my-0 mt-2">Employee</label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <input
                        v-model="formData.employees"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 mt-2 col-sm-6">
                  <label class="my-0">Exchange Rate</label>
                  <input
                    v-model="formData.exchangeRate"
                    type="number"
                    step="any"
                    class="form-control form-control-default"
                  />
                </div>

                <!-- PhoneBurner Follow Up Date -->
                <div class="col-lg-4 col-md-4 mt-2 col-sm-6">
                  <label class="my-0">PhoneBurner Follow Up Date</label>
                  <input
                    v-model="formData.phoneBurnerFollowUpDate"
                    type="date"
                    class="form-control form-control-default"
                  />
                </div>

                <!-- PhoneBurner Last Call Outcome -->
                <div class="col-lg-4 col-md-4 mt-2 col-sm-6">
                  <label class="my-0">PhoneBurner Last Call Outcome</label>
                  <input
                    v-model="formData.phoneBurnerLastCallOutcome"
                    type="text"
                    class="form-control form-control-default"
                  />
                </div>

                <!-- PhoneBurner Last Call Time -->
                <div class="col-lg-4 col-md-4 mt-2 col-sm-6">
                  <label class="my-0">PhoneBurner Last Call Time</label>
                  <input
                    v-model="formData.phoneBurnerLastCallTime"
                    type="datetime-local"
                    class="form-control form-control-default"
                  />
                </div>

                <!-- Description -->
                <div class="col-lg-4 col-md-4 mt-2 col-sm-6">
                  <label class="my-0">Description</label>
                  <input
                    v-model="formData.description"
                    type="text"
                    class="form-control form-control-default"
                  />
                </div>
                <!-- Rolling table -->
                <div class="mt-2">
                  <Rolling :getRolling="getRolling"  />
                  <!-- Average Monthly Revenue (CA$) -->
                  <div class="w-100 d-flex justify-content-end mb-4 mt-2">
                    <div class=" border rounded py-3 px-2 mobile-width">
                      <div class="row">
                        <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                          <label class="my-0 mx-2"
                            >Average Monthly Revenue (CA$)</label
                          >
                        </div>
                        <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                          <input
                            v-model="formData.averageMonthlyRevenue"
                            type="text"
                            class="form-control form-control-default"
                            disabled
                          />
                        </div>
                      </div>
                      <!-- Advisor Average Annual Yield (CA$) -->
                      <div class="row">
                        <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                          <label class="my-0 mx-2"
                            >Advisor Average Annual Yield (CA$)
                          </label>
                        </div>
                        <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                          <input
                            v-model="formData.advisorAnnualRevenueYield"
                            type="text"
                            class="form-control form-control-default"
                            disabled
                          />
                        </div>
                      </div>
                      <!-- Client Average Annual Yield (CA$) -->
                      <div class="row">
                        <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                          <label class="my-0 mx-2"
                            >Client Average Annual Yield (CA$)
                          </label>
                        </div>
                        <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                          <input
                            v-model="formData.clientAverageAnnualYield"
                            type="text"
                            class="form-control form-control-default"
                            disabled
                          />
                        </div>
                      </div>
                      <!-- Total Rolling Revenue (CA$) -->
                      <div class="row">
                        <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                          <label class="my-0 mx-2"
                            >Total Rolling Revenue (CA$)</label
                          >
                        </div>
                        <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                          <input
                            v-model="formData.totalRollingRevenue"
                            type="text"
                            class="form-control form-control-default"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Annual Performance table -->
                <div class="mt-2">
                  <AnnualPerformance  :getAnnualPerformance="getAnnualPerformance"/>
                </div>

                <div class="w-100 d-flex justify-content-end mb-4">
                  <div class="mobile-width border rounded py-3 px-2">
                    <!-- Client Average Monthly Yield (CA$) -->
                    <div class="row">
                      <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                        <label class="my-0"
                          >Client Average Monthly Yield (CA$)</label
                        >
                      </div>
                      <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                        <input
                          v-model="formData.clientAverageMonthlyYield"
                          type="text"
                          class="form-control form-control-default"
                          disabled
                        />
                      </div>
                    </div>
                    <!-- Advisor Average Monthly Yield (CA$) -->
                    <div class="row">
                      <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                        <label class="my-0"
                          >Advisor Average Monthly Yield (CA$)</label
                        >
                      </div>
                      <div class="col-lg-6 col-md-4 mt-2 col-sm-6">
                        <input
                          v-model="formData.advisorAverageMonthlyYield"
                          type="text"
                          class="form-control form-control-default"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="button-row d-flex justify-content-center mt-3 space">
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null mb-0 js-btn-next"
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <!-- 2nd form -->
          <div
            class="card multisteps-form__panel p-3 border-radius-xl bg-white"
            data-animation="FadeIn"
          >
            <h5 class="main-heading mb-0">Address Information</h5>
            <div class="multisteps-form__content">
              <div class="col-12 row mt-3">
                <div class="column col-lg-6 col-12">
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Billing Street </label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          v-model="formData.street"
                          type="text"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Billing City</label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          v-model="formData.city"
                          type="text"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Billing State</label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          :class="{ highlight: errors.state }"
                          v-model="formData.state"
                          type="text"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                        <span
                          v-if="errors.state"
                          class="error input-error-font-size"
                          >{{ errors.state }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Billing Code </label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          v-model="formData.postalCode"
                          type="text"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Billing Country</label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          :class="{ highlight: errors.country }"
                          v-model="formData.country"
                          type="text"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                        <span
                          v-if="errors.country"
                          class="error input-error-font-size"
                          >{{ errors.country }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column col-lg-6 col-12">
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Shipping Street</label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          :class="{ highlight: errors.shipmentStreet }"
                          v-model="formData.shipmentStreet"
                          type="text"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                        <span
                          v-if="errors.shipmentStreet"
                          class="error input-error-font-size"
                          >{{ errors.shipmentStreet }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Shipping City</label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          v-model="formData.shipmentCity"
                          type="text"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Shipping State </label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          v-model="formData.shipmentState"
                          type="text"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Shipping Code</label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          v-model="formData.shipmentPostalCode"
                          type="number"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-sm-12">
                    <label class="my-0 mt-2">Shipping Country</label>
                    <div class="form-group multisteps-form__input mb-0">
                      <div class="">
                        <input
                          v-model="formData.shipmentCountry"
                          type="text"
                          class="form-control form-control-default"
                          isrequired="false"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="button-row d-flex mt-4">
                                    <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button">Prev</button>
                                    <button class="btn mb-0 bg-gradient-dark btn-md null null ms-auto js-btn-next" type="button">Next</button>
                                </div> -->

              <h5 class="main-heading mb-0 mt-1">Description Information</h5>
              <div class="row col-12">
                <div class="col-sm-12">
                  <label class="my-0 mt-0">Bio</label>
                  <div class="form-group multisteps-form__input mb-0">
                    <div class="">
                      <textarea
                        v-model="formData.description"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="button-row d-flex justify-content-center mt-3 gap-4 space">
              <button
                class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
                type="button"
              >
                Prev
              </button>
              <button
                v-if="!id"
                class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                type="button"
                @click.prevent="handleSubmitForm"
              >
                Submit
              </button>
              <button
                v-else
                class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                type="button"
                @click.prevent="handleUpdateForm"
              >
                update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
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
.mobile-width{
    width:50%;
  }
@media  (max-width:500px) {
  .mobile-width{
    width:100%;
  }

  .space{
    margin-bottom:200px;
  }
}


</style>

<!-- JavaScript code for stepper functionality -->
<script>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { putUrl } from "../../boot/axios.js";
import Swal from "sweetalert2";
import Loader from "../utils/Loader.vue";
import router from "../../router/index";
import Rolling from "./Rolling.vue";
import AnnualPerformance from "./AnnualPerformance.vue";
// **********VUE JS PHONE FIELDS********
// import VuePhoneNumberInput from 'vue-phone-number-input';
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
  props: ["id"],
  components: {
    Loader,
    Rolling,
    AnnualPerformance,
    // VuePhoneNumberInput
  },

  setup(props) {
    let currentStep = 0;
    console.log(props);
    let isLoading = ref(false);
    const formData = reactive({
      locationOwner: "",
      locationName: "",
      email: "",
      phone: "",
      fax: "",
      website: "",
      rating: "",
      // insuranceLead: "",
      description: "",
      currency: "CAD",
      parentLocation: "",
      employees: "",
      discountFactor: "",
      exchangeRate: null,
      phoneBurnerFollowUpDate: "",
      phoneBurnerLastCallOutcome: "",
      phoneBurnerLastCallTime: "",
      month: "",
      year: "",
      monthlyRevenue: "",
      numberOfAdvisors: "",
      numberOfClients: "",
      advisorMonthlyYield: "",
      clientMonthlyYield: "",
      averageMonthlyRevenue: "",
      advisorAverageMonthlyYield: "",
      clientAverageMonthlyYield: "",
      totalRollingRevenue: "",
      numberOfAdvisorsAtYearEnd: "",
      clientsAtYearEnd: "",
      annualRevenue: "",
      advisorAnnualRevenueYield: "",
      clientAnnualRevenueYield: "",
      advisorAverageAnnualYield: "",
      clientAverageAnnualYield: "",

      // adress information
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      shipmentStreet: "",
      shipmentCity: "",
      shipmentState: "",

      shipmentPostalCode: "",
      shipmentCountry: "",
    });

    const errors = reactive({
      locationOwner: "",
      locationName: "",
      email: "",
      // insuranceLead: "",
      parentLocation: "",
    });
    const getRolling = (data) => {
      formData.Rolling = data;
      console.log("Rolling", Rolling);
    };
    const getAnnualPerformance = (data) => {
      formData.AnnualPerformance = data;
      console.log("getAnnualPerformance", Rolling);
    };
    const formValidation = () => {
      console.log("working form validation fuxntion ");
    //   if (currentStep === 0) {
    //     if (formData.locationOwner == "") {
    //       errors.locationOwner = "required";
    //     } else {
    //       errors.locationOwner = "";
    //     }

    //     if (formData.email == "") {
    //       errors.email = "required";
    //     } else {
    //       errors.email = "";
    //     }
    //     if (formData.locationName == "") {
    //       errors.locationName = "required";
    //     } else {
    //       errors.locationName = "";
    //     }
    //   }
    };
    const hasErrors = () => {
      return Object.values(errors).some((error) => error);
    };
    const handleSubmitForm = async () => {
      console.log(formData);
      isLoading.value = true;
      try {
        await axios
          .put(`${putUrl}locations/api/v1/createlocation`, formData)
          .then(() => {
            // isLoading.value=false;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Insurance Partner Created Successfully",
            });
          });

        router.push("/locationlist");
      } catch (error) {
        // isLoading.value=false;
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    };

    const handleUpdateForm = async () => {
      try {
        await axios
          .post(
            `${putUrl}locations/api/v1/updatelocation/${props.id}`,
            formData
          )
          .then(() => {
            isLoading.value = false;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Location Updated Successfully",
            });
          });
        isLoading.value = false;

        router.push("/locationlist");
      } catch (error) {
        isLoading.value = false;
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    };
    let insurancePartnerOwnerOptions = ref([]);
    let locationListingOptions = ref([]);
    onMounted(() => {
      const getallusers = async () => {
        const response = await axios.get(`${putUrl}contact/api/v1/getusers`);
        console.log(response.data);

        insurancePartnerOwnerOptions.value = response.data.map(
          (item) => item.userData
        );
        // console.log(formData.contactOwner);
      };
      getallusers();
      const getAllLocations = async () => {
        // console.log("hello advisor");
        try {
          const response = await axios.get(
            `${putUrl}locations/api/v1/getlocation`
          );
          // console.log("getlocation", response);
          locationListingOptions.value = response.data.map(
            (item) => item.locations
          );

          // console.log("this is ",advisorListingOptions[0].firstName);
        } catch (error) {
          this.isLoading = false;
          console.error("Error fetching advisors:", error);
        }
      };
      getAllLocations();

      const getInsurancePartner = async () => {
        // console.log("this is pero id", props.id);
        try {
          const response = await axios.get(
            `${putUrl}locations/api/v1/getsinglelocation/${props.id}`
          );

          // console.log("thi sis single advisor", response);
          Object.assign(formData, response.data[0].locations);
        } catch (error) {
          console.error("Error fetching advisors:", error);
        }
      };
      if (props.id) {
        getInsurancePartner();
      }

      const progressButtons = document.querySelectorAll(
        ".multisteps-form__progress-btn"
      );
      const formPanels = document.querySelectorAll(".multisteps-form__panel");

      const updateProgress = () => {
        progressButtons.forEach((button, index) => {
          button.classList.toggle("js-active", index <= currentStep);
        });
      };

      const goToStep = (stepIndex) => {
        formValidation();
        if (!hasErrors()) {
          if (stepIndex >= 0 && stepIndex < formPanels.length) {
            formPanels[currentStep].classList.remove("js-active");
            currentStep = stepIndex;
            formPanels[currentStep].classList.add("js-active");
            updateProgress();
            adjustFormPanelPadding();
          }
        }
      };

      const adjustFormPanelPadding = () => {
        formPanels.forEach((panel) => {
          panel.style.paddingBottom =
            currentStep === formPanels.length - 1 ? "0" : "";
        });
      };

      const nextButtons = document.querySelectorAll(".js-btn-next");
      nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
          goToStep(currentStep + 1);
        });
      });

      const prevButtons = document.querySelectorAll(".js-btn-prev");
      prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
          goToStep(currentStep - 1);
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
      formData,
      getRolling,
      getAnnualPerformance,
      handleSubmitForm,
      insurancePartnerOwnerOptions,
      locationListingOptions,
      isLoading,
      handleUpdateForm,
      errors,
    };
  },
};
</script>
