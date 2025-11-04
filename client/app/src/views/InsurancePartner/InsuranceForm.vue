<template>
  <div class="container-fluid ps-0 pe-2">
    <div class="row">
      <div class="col-12">
        <div class="multisteps-form">
          <div class="row">
            <div class="col-12  mx-auto mb-2">
              <div class="card">
                <div class="card-body">
                  <div class="multisteps-form__progress">
                    <button class="multisteps-form__progress-btn js-active position-relative formstep-text-color"
                      type="button" title="Step 1">
                      Partner Info
                    </button>
                    <button class="multisteps-form__progress-btn formstep-text-color" type="button" title="Step 2">
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
          <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative"
            data-animation="FadeIn">
            <Loader :loading="isLoading"></Loader>
            <h5 class="main-heading mb-0">Insurance Partner informations</h5>
            <!-- <p class="mb-0 text-sm"></p> -->
            <div class="multisteps-form__content">
              <div class="row ">
                <div class="col-lg-4 col-sm-6 mt-3 mt-sm-0">
                  <label class="my-0 mt-2 ">Insurance Partner Owner <span class="text-danger">*</span></label>
                  <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box" :class="{ highlight: errors.partnerOwner }">
                      <select required id="choices-state" @change="test()"
                        class="multisteps-form__select form-control choices__input" v-model="formData.partnerOwner"
                        name="choices-state" tabindex="-1" data-choice="active">
                        <option value="">Select </option>
                        <option v-for="item in ipOwnerOptions" :key="item.ROWID" :value="item.ROWID">
                          {{ item?.name }}
                        </option>
                      </select>
                      <span v-if="errors.partnerOwner" class="error input-error-font-size">{{
                        errors.partnerOwner
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6 mt-3 mt-sm-0">
                  <label class="my-0 mt-2 ">Insurance Partner Name <span class="text-danger">*</span></label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.partnerName" :class="{ highlight: errors.partnerName }" type="text"
                        class="form-control form-control-default" isrequired="false" />
                      <span v-if="errors.partnerName" class="error input-error-font-size">{{
                        errors.partnerName
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 " for="mobile">Phone</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <!-- <input v-model="formData.phone" type="number" class="form-control form-control-default"
                        isrequired="false" /> -->
                      <VueTelInput v-model="formData.phone" :defaultCountry="'CA'"
                        :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true"
                        :mode="'international'" :inputOptions="{
                          placeholder: '+1 (XXX) XXX-XXXX',
                          inputmode: 'tel',
                          maxlength: 16,            // '+' + 15 digits (E.164)
                          onInput: handleTelInput   // live sanitize
                        }" id="mobile" />
                      <span v-if="errors.mobile" class="text-danger">{{ errors.mobile }}</span>

                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-0">
                <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 ">Email</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.email" :class="{ highlight: errors.email }" type="mail"
                        class="form-control form-control-default" isrequired="false" />
                      <span v-if="errors.email" class="error input-error-font-size">{{
                        errors.email
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 ">Fax</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.fax" type="text" class="form-control form-control-default"
                        isrequired="false" />
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 ">PhoneBurner Last Call Outcome</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.PhoneBurnerLastCallOutcome"
                        :class="{ highlight: errors.PhoneBurnerLastCallOutcome }" type="text"
                        class="form-control form-control-default" isrequired="false" />
                      <span v-if="errors.PhoneBurnerLastCallOutcome" class="error input-error-font-size">{{
                        errors.PhoneBurnerLastCallOutcome
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row ">
                <div class="col-lg-4">
                  <label class="my-0 mt-2 ">Additional Contact Information</label>
                  <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                      <select id="choices-state" class="multisteps-form__select form-control choices__input"
                        name="choices-state" tabindex="-1" data-choice="active"
                        v-model="formData.additionalContactInformation">
                        <option value="">Select</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 ">
                  <label class="my-0 mt-2 ">Contracted Advisor Listing</label>
                  <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box" :class="{ highlight: errors.advisorListing }">
                      <select v-model="formData.advisorListing" required id="choices-state"
                        class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                        data-choice="active">
                        <option value="">Select</option>
                        <option v-for="(data, index) in advisorListingOptions" :key="index" :value="data.ROWID">
                          {{ data.name }}
                        </option>
                      </select>
                      <span v-if="errors.advisorListing" class="error input-error-font-size">{{
                        errors.advisorListing
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4 mt-sm-0 ">
                  <label class="my-0 mt-2 ">PhoneBurner Last Call Time</label>

                  <!-- <input v-model="formData.phoneBurnerLastCallTime"
                        :class="{ highlight: errors.phoneBurnerLastCallTime }" type="date"
                        class="form-control form-control-default" isrequired="false" />
                      <span v-if="errors.phoneBurnerLastCallTime" class="error input-error-font-size">{{
                        errors.phoneBurnerLastCallTime
                      }}</span> -->
                  <div class="input-group">
                    <flat-pickr v-model="formData.phoneBurnerLastCallTime" :config="datePickerConfig"
                      placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                      autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                    <span v-if="errors.phoneBurnerLastCallTime" class="error input-error-font-size">{{
                      errors.phoneBurnerLastCallTime
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="row mt-2 ">
                


                <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 ">PhoneBurner Follow Up Date</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <!-- <input v-model="formData.PhoneBurnerFollowUpDate"
                        :class="{ highlight: errors.PhoneBurnerFollowUpDate }" type="date"
                        class="form-control form-control-default" isrequired="false" />
                      <span v-if="errors.PhoneBurnerFollowUpDate" class="error input-error-font-size">{{
                        errors.PhoneBurnerFollowUpDate
                      }}</span> -->
                      <div class="input-group">
                        <flat-pickr v-model="formData.PhoneBurnerFollowUpDate" :config="datePickerConfig"
                          placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                          autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                        <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                          <i class="fa fa-calendar"></i>
                        </span>
                        <span v-if="errors.PhoneBurnerFollowUpDate" class="error input-error-font-size">{{
                          errors.PhoneBurnerFollowUpDate
                          }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 ">PhoneBurner Last Call Time</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                     
                                        <div class="input-group">
                    <flat-pickr v-model="formData.phoneBurnerLastCallTime" :config="datePickerConfig"
                      placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="false"
                      autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                    <span v-if="errors.phoneBurnerLastCallTime" class="error input-error-font-size">{{
                      errors.phoneBurnerLastCallTime
                      }}</span>
                  </div>
                    </div>
                  </div>
                </div> -->
              </div>
              <div class="row mt-2">
                <div class="col-12 col-sm-4 mt-4">
                  <div class="form-check checkbox-lg">
                    <input v-model="formData.emailOptOut" class="form-check-input" type="checkbox" id="checkbox-1" />
                    <label class="form-check-label my-0 " for="checkbox-1">Email Opt Out</label>
                  </div>
                </div>
              </div>
              <h5 class="main-heading mb-0 mt-3">Additional Contact Details</h5>
              <div class="row">
                <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 ">Email</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.additionalEmail" :class="{ highlight: errors.email }" type="email"
                        class="form-control form-control-default" isrequired="false" />
                      <span v-if="errors.email" class="error input-error-font-size">{{
                        errors.email
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 ">Phone</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <!-- <input v-model="formData.additionalPhone" :class="{ highlight: errors.email }" type="number"
                        class="form-control form-control-default" isrequired="false" /> -->
                      <VueTelInput v-model="formData.additionalPhone" :defaultCountry="'CA'"
                        :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true"
                        :mode="'international'" :inputOptions="{
                          placeholder: '+1 (XXX) XXX-XXXX',
                          inputmode: 'tel',
                          maxlength: 16,            // '+' + 15 digits (E.164)
                          onInput: handleTelInput   // live sanitize
                        }" id="mobile" />
                      <span v-if="errors.mobile" class="text-danger">{{ errors.mobile }}</span>


                      <!-- <span v-if="errors.email" class="error input-error-font-size">{{
                        errors.email
                      }}</span> -->
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 ">Account Manager</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.accountManager" :class="{ highlight: errors.email }" type="text"
                        class="form-control form-control-default" isrequired="false" />
                      <span v-if="errors.email" class="error input-error-font-size">{{
                        errors.email
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4 mt-sm-0">
                  <label class="my-0 mt-2 ">Account Manager Phone</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.accountManagerPhone" :class="{ highlight: errors.email }" type="number"
                        class="form-control form-control-default" isrequired="false" />
                      <span v-if="errors.email" class="error input-error-font-size">{{
                        errors.email
                      }}</span>
                    </div>
                  </div>
                </div>

              </div>
              <div class="button-row d-flex justify-content-center mt-2">
                <button class="btn mb-0 bg-gradient-dark btn-md null null mb-0 js-btn-next" type="button">
                  Next
                </button>
              </div>
            </div>
          </div>
          <!-- 2nd form -->
          <div class="card multisteps-form__panel p-3 border-radius-xl bg-white" data-animation="FadeIn">
            <h5 class="main-heading mb-0">Address Information </h5>
            <div class="multisteps-form__content">
              <div class="row">
                <div class=" col-lg-4">
                  <label class="my-0 mt-2 ">Street</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div>
                      <input v-model="formData.street" type="text" class="form-control form-control-default"
                        isrequired="false" />
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4">
                  <label class="my-0 mt-2 ">State</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.state" type="text" class="form-control form-control-default"
                        isrequired="false" />
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4">
                  <label class="my-0 mt-2 ">Country</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.country" type="text" class="form-control form-control-default"
                        isrequired="false" />
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4">
                  <label class="my-0 mt-2 ">City</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.city" type="text" class="form-control form-control-default"
                        isrequired="false" />
                    </div>
                  </div>
                </div>
                <div class=" col-lg-4">
                  <label class="my-0 mt-2 ">ZIP code</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <input v-model="formData.postalCode" type="text" class="form-control form-control-default"
                        isrequired="false" />
                    </div>
                  </div>
                </div>
              </div>
              <h5 class="main-heading mb-0">Description Information </h5>
              <div class="row col-12">
                <div class=" col-sm-12">
                  <label class="my-0 mt-2 ">Description</label>
                  <div class="form-group multisteps-form__input mb-1">
                    <div class="">
                      <textarea v-model="formData.description" type="text" class="form-control form-control-default"
                        isrequired="false" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="button-row d-flex justify-content-center mt-2 gap-4">
              <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button">
                Prev
              </button>
              <button v-if="!id" class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button"
                @click.prevent="handleSubmitForm">
                Submit
              </button>
              <button v-else class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button"
                @click.prevent="handleUpdateForm">
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
</style>

<!-- JavaScript code for stepper functionality -->
<script>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { putUrl } from "../../boot/axios.js";
import Swal from "sweetalert2";
import Loader from "../utils/Loader.vue";
import router from "../../router/index";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
export default {
  props: ["id"],
  components: {
    Loader,
    VueTelInput,
    flatPickr
  },
  methods: {
    handleTelInput(e) {
      const raw = e?.target?.value ?? '';
      // keep leading +, strip everything else non-digit
      let cleaned = raw.replace(/(?!^)\+/g, '');       // remove extra '+' if any
      cleaned = cleaned.replace(/[^+\d]/g, '');        // only '+' and digits
      // limit to '+' + 15 digits
      const plus = cleaned.startsWith('+') ? '+' : '';
      const digits = cleaned.replace(/\D/g, '').slice(0, 15);
      cleaned = plus + digits;
      e.target.value = cleaned;
      this.formData.mobile = cleaned;
      // clear error as user fixes
      if (this.errors.mobile) delete this.errors.mobile;
    },
    nextStep() {
      this.errors = validateMandatoryFields(this.formData, mandatory);
      // const validateFields = Object.keys(this.errors).length === 0;
      // phone validation (international + E.164, special check for CA)
      const mobile = (this.formData.mobile || '').replace(/\s|-/g, '');
      if (mobile) {
        if (!mobile.startsWith('+')) {
          this.errors.mobile = 'Country code is required (e.g. +1...)';
        } else if (mobile.startsWith('+1') && !/^\+1\d{10}$/.test(mobile)) {
          this.errors.mobile = 'Canadian number must be +1 followed by 10 digits';
        } else if (!/^\+\d{8,15}$/.test(mobile)) {
          this.errors.mobile = 'Phone must be in international format (e.g. +1234567890)';
        }
      }
      console.log("<<<<<<<<<<<<<<< CURRENT STEP >>>>>>>>>>>>>>>>>>>>>>>>", this.formData);

      this.$emit('next', this.formData);
    },
    openDatePicker() {
      if (this.$refs.fpDateOfBirth && this.$refs.fpDateOfBirth.fp) {
        this.$refs.fpDateOfBirth.fp.open()
      }
    },
  },
  data() {
    return {

      datePickerConfig: {
        dateFormat: "d/m/Y", // DD/MM/YYYY
        allowInput: true
      },
      dateTimePickerConfig: {
        dateFormat: "d/m/Y H:i", // DD/MM/YYYY HH:mm
        allowInput: true,
        enableTime: true,
        time_24hr: true
      },
    }
  },

  setup(props) {
    let currentStep = 0;
    console.log(props);
    let isLoading = ref(false);
    const formData = reactive({
      partnerOwner: "",
      partnerName: "",
      email: "",
      phone: "",
      fax: "",
      website: "",
      additionalContactInformation: "",
      advisorListing: "",
      street: "",
      city: "",
      state: "",
      additionalPhone: "",
      country: "",
      postalCode: "",
      description: "",
      PhoneBurnerLastCallOutcome: "",
      PhoneBurnerLastCallTime: "",
      PhoneBurnerFollowUpDate: '',
      ContractedAdvisorListing: '',
      emailOptOut: "",
      accountManager: "",
      additionalEmail: "",

    })
    const ipOwnerOptions = ref([]);
    const advisorListingOptions = ref([]);
    const errors = reactive({
      partnerOwner: "",
      partnerName: "",
      email: "",
      advisorListing: "",
      partnerListing: "",
    });

    const test = async () => {
      console.log("", formData.partnerOwner);
    }
    const formValidation = () => {
      console.log("working form validation fuxntion ")
      if (currentStep === 0) {
        if (formData.partnerOwner == "") {
          errors.partnerOwner = "required";

        }
        else {
          errors.partnerOwner = "";
        }

        if (formData.email == "") {
          errors.email = "required";
        }
        else {
          errors.email = "";
        }
        // if (formData.advisorListing == "") {
        //   errors.advisorListing = "required";
        // }
        // else {
        //   errors.advisorListing = "";
        // }
        // if (formData.partnerListing == "") {

        //   errors.partnerListing = "required";
        // }
        // else {
        //   errors.partnerListing = "";
        // }
        // if (formData.partnerName == "") {
        //   errors.partnerName = "required";
        // }
        // else {
        //   errors.partnerName = "";
        // }

      }

    }
    const hasErrors = () => {
      return Object.values(errors).some((error) => error);
    };


    const handleSubmitForm = async () => {
      isLoading.value = true;
      try {

        await axios.put(`${putUrl}canadianlicapi/finance/inspartner/api/v2/create-insurance-partner`, formData).then(() => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Insurance Partner Created Successfully",
          });
          isLoading.value = false;
        })

        router.push("/insurancepartnerlist")
      } catch (error) {
        // isLoading.value=false;
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });

      }
    }
    const handleUpdateForm = async () => {
      this.isLoading = true;
      try {

        await axios.post(`${putUrl}canadianlicapi/finance/inspartner/api/v2/update-insurance-partner/${props.id}`, formData).then(() => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Insurance Partner Updated Successfully",
          });
        })
        router.push("/insurancepartnerlist")
      } catch (error) {
        this.isLoading.value = false;
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }

    onMounted(() => {
      baseFunction()
      const getInsurancePartner = async () => {

        console.log("this is pero id", props.id);
        try {
          const response = await axios.get(
            `${putUrl}insurancePartner/api/v1/getinsurancepartner/${props.id}`
          );

          console.log("thi sis single advisor", response)
          Object.assign(formData, response.data[0].insurencePartner);

        } catch (error) {
          console.error("Error fetching advisors:", error);
        }

      }
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
    const baseFunction = async () => {
      try {
        const userResponse = await axios.get(`${putUrl}contact/api/v1/getusers`);
        ipOwnerOptions.value = userResponse.data.map((item) => ({ ROWID: item?.userData?.ROWID, name: item?.userData?.firstName + " " + item?.userData?.lastName }));
        console.log("users w235", ipOwnerOptions.value);
        const adResponse = await axios.get(`${putUrl}advisorFunction/api/v1/getalladvisors`);
        advisorListingOptions.value = adResponse.data.adv.map((item) => ({ ROWID: item.ROWID, name: item.firstName + " " + item.lastName }));
      } catch (error) {
        console.error("Error fetching advisors:", error);
      }

    }

    return {
      formData,
      handleSubmitForm,
      ipOwnerOptions,
      advisorListingOptions,
      isLoading,
      handleUpdateForm,
      errors,
      test
    }
  },
};
</script>