<template>
  <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative"
    data-animation="FadeIn" style="margin-bottom:80px;">
    <h5 class="main-heading mb-0">Client Details</h5>
    <!-- <p class="mb-0 text-sm"></p> -->
    <div class="multisteps-form__content">
      <div class="row mt-2">
        <div class="col-lg-4 col-sm-4 mt-3 mt-sm-0">
          <label class="my-0 mt-2">Layout<span class="text-danger">*</span></label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box" :class="{ highlight: errors.layout }">
              <select v-model="formData.layout" class=" form-control choices__input">
                <option value="">-None-</option>
                <option value="RRSP">RRSP</option>
                <option value="RESP">RESP</option>
                <option value="TFSA">TFSA</option>
              </select>
              <span v-if="errors.layout" class="error input-error-font-size">{{ errors.layout }}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-4 mt-3 mt-sm-0">
          <label class="my-0 mt-2">Investment Owner<span class="text-danger">*</span></label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box" :class="{ highlight: errors.owner }">
              <select required v-model="formData.policyOwner" id="choices-state"
                class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                data-choice="active">
                <option value="">Select</option>
                <option v-for="owner in ownersArr" :key="owner.ROWID" :value="owner.ROWID">
                  {{ owner.firstName ? owner.firstName : '' }}{{ owner.lastName ? ' ' + owner.lastName : '' }}
                </option>
              </select>
              <span v-if="errors.owner" class="error input-error-font-size">{{ errors.owner }}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-4 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Investment Name <span class="text-danger">*</span></label>

          <div class="">
            <input :class="{ highlight: errors.name }" v-model="formData.policyName" id="referralname" type="text"
              class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
            <span v-if="errors.name" class="error input-error-font-size">{{ errors.name }}</span>
          </div>
        </div>
      </div>

      <div class="row mt-0">
        <div class="col-lg-4 col-md-6 col-sm-4 mt-3 mt-sm-0">
          <label class="my-0 mt-2">Client Mobile</label>

          <div class="">
            <!-- <input
                v-model="formData.clientMobile"
                type="number"
                class="form-control form-control-default"
                isrequired="false"
                autocomplete="off"
              /> -->
            <VueTelInput  v-model="formData.clientMobile" :defaultCountry="'CA'"
              :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true" :mode="'international'"
              :inputOptions="{
                placeholder: '+1 (XXX) XXX-XXXX',
                inputmode: 'numeric',
                maxlength: 15,            // '+' + 15 digits (E.164)
                onInput: handleTelInput,
                 
              }" />
            <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
          </div>

        </div>
        <div class="col-lg-4  col-md-6 col-sm-4 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Currency</label>

          <div class="">
            <input :class="{ highlight: errors.Currency }" v-model="formData.currency" id="Currency" type="text"
              class="form-control form-control-default" name="" isrequired="false" autocomplete="off" />
            <span v-if="errors.Currency" class="error input-error-font-size">{{ errors.Currency }}</span>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0 mt-2">Location</label>
          <div class="choices" data-type="select-one" tabindex="0" role="location" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box" :class="{ highlight: errors.Location }">
              <select required v-model="formData.location" id="location"
                class="multisteps-form__select form-control choices__input" name="location" tabindex="-1"
                data-choice="active">
                <option value="">Select</option>
                <option v-for="location in locationsArr" :key="location.ROWID" :value="location.ROWID">
                  {{ location.name ? location.name : '' }}
                </option>
              </select>
              <span v-if="errors.Location" class="error input-error-font-size">{{ errors.Location }}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0 mt-2">Client Name</label>
          <div class="choices" data-type="select-one" tabindex="0" role="clientName" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box" :class="{ highlight: errors.clientName }">
              <select v-model="formData.client" required id="choices-state"
                class="multisteps-form__select form-control choices__input" tabindex="-1" data-choice="active">
                <option value="">Select</option>
                <option v-for="contact in contactsArr" :key="contact.ROWID" :value="contact.ROWID">
                  {{ contact.name ? contact.name : '' }}
                </option>
              </select>
              <span v-if="errors.clientName" class="error input-error-font-size">{{ errors.clientName }}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-4 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Exchange Rate</label>

          <div class="">
            <input :class="{ highlight: errors.exchangeRate }" v-model="formData.exchangeRate" id="exchangeRate"
              type="number" disabled class="form-control form-control-default" isrequired="false" autocomplete="off" />
            <span v-if="errors.exchangeRate" class="error input-error-font-size">{{ errors.exchangeRate }}</span>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0 mt-2">Policy Advisor</label>
          <div class="choices" data-type="select-one" tabindex="0" role="policyAdvisor" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box" :class="{ highlight: errors.policyAdvisor }">
              <select required v-model="formData.policyAdvisor" id="choices-state"
                class="multisteps-form__select form-control choices__input" tabindex="-1" data-choice="active">
                <option value="">Select</option>
                <option v-for="advisor in advisorsArr" :key="advisor.ROWID" :value="advisor.ROWID">
                  {{ advisor.name ? advisor.name : '' }}
                </option>
              </select>
              <span v-if="errors.policyAdvisor" class="error input-error-font-size">{{ errors.policyAdvisor }}</span>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 col-sm-4 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Client Address</label>

          <div class="">
            <textarea :class="{ highlight: errors.clientAddress }" v-model="formData.clientAddress" id="clientAddress"
              class="form-control form-control-default" rows="1" autocomplete="off"></textarea>
            <span v-if="errors.clientAddress" class="error input-error-font-size">{{ errors.clientAddress }}</span>
          </div>
        </div>
      </div>

      <h5 class="main-heading mb-0 m-2">
        Investment/Investment Vehicle Details
      </h5>
      <div class="row">
        <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0 mt-2">Contract Name <span class="text-danger">*</span></label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="" :class="{ highlight: errors.contractName }">
              <input v-model="formData.contractName" type="text" class="form-control form-control-default"
                isrequired="false" autocomplete="off" />
              <span v-if="errors.contractName" class="error input-error-font-size">{{ errors.contractName }}</span>
            </div>
          </div>
        </div>

        <div class="col-lg-6 col-sm-6 mt-3 mt-sm-0">
          <label class="my-0 mt-2">Investment</label>

          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input v-model="formData.investment" type="number" class="form-control form-control-default"
                isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>

        <div class="col-lg-6 col-sm-6 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Frequency</label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box">
              <select v-model="formData.frequency" id="choices-state"
                class="multisteps-form__select form-control choices__input" tabindex="-1" data-choice="active">
                <option v-for="(option, index) in frequencyOptions" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-12 col-sm-4 mt-3 mt-sm-0">
          <label class="my-0 mt-2">Corporate Commission</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input v-model="formData.corporateCommission" type="number" class="form-control form-control-default"
                isrequired="false" placeholder="$" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4 mt-3 mt-sm-0">
          <label class="my-0 mt-2">Advisor Commission</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input v-model="formData.advisorCommission" type="number" class="form-control form-control-default"
                isrequired="false" placeholder="$" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4 mt-3 mt-sm-0">
          <label class="my-0 mt-2">Monthly/Annual Contribution</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input v-model="formData.monthlyAnnualContribution" type="number"
                class="form-control form-control-default" isrequired="false" placeholder="$" />
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-sm-4">
          <label class="my-0 mt-2">Contract Number </label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input v-model="formData.contractNumber" type="number" class="form-control form-control-default"
                isrequired="false" autocomplete="off" />
            </div>
          </div>
        </div>
        <div v-show="formData.layout != 'RESP'" class="col-lg-6 col-sm-6 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Type <span class="text-danger">*</span></label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box" :class="{ highlight: errors.type }">
              <select v-model="formData.type" id="choices-state"
                class="multisteps-form__select form-control choices__input" tabindex="-1" data-choice="active">
                <option value="">-None-</option>
                <option value="RRSP">RRSP</option>
                <option value="RESP">RESP</option>
                <option value="TFSA">TFSA</option>
              </select>
              <span v-if="errors.type" class="error input-error-font-size">{{ errors.type }}</span>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-4">
          <label class="my-0 mt-2">Initial Contribution</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input v-model="formData.initialContribution" type="number" class="form-control form-control-default"
                isrequired="false" autocomplete="off" placeholder="$" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <label class="my-0 mt-2">Initial Deposit</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input v-model="formData.initialDeposit" type="number" class="form-control form-control-default"
                isrequired="false" autocomplete="off" placeholder="$" />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <label class="my-0 mt-2">Location Commission</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input v-model="formData.locationCommission" type="number" class="form-control form-control-default"
                isrequired="false" autocomplete="off" placeholder="$" />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-sm-4">
          <label class="my-0 mt-2">Total Contribution</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input v-model="formData.totalContribution" type="number" class="form-control form-control-default"
                isrequired="false" autocomplete="off" placeholder="$" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
          <label class="my-0 mt-2">Insurance Partner</label>
          <div class="choices" data-type="select-one" tabindex="0" role="insurancePartner" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box" :class="{ highlight: errors.insurancePartner }">
              <select required v-model="formData.insurancePartner" id="insurancePartner"
                class="multisteps-form__select form-control choices__input" tabindex="-1" data-choice="active"></select>
              <span v-if="errors.insurancePartner" class="error input-error-font-size">{{ errors.insurancePartner
                }}</span>
            </div>
          </div>
        </div>
        <div v-show="(formData.layout === 'RESP')" class="col-4 col-sm-4 mt-2 mt-sm-0">
          <label class="my-0 mt-2">Type</label>
          <div class="choices" data-type="select-one" tabindex="0" role="Type" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box" :class="{ highlight: errors.Type }">
              <select required v-model="formData.Type" id="Type"
                class="multisteps-form__select form-control choices__input" name="Type" tabindex="-1"
                data-choice="active">
                <option value="">-None-</option>
                <option value="RRSP">RRSP</option>
                <option value="RESP">RESP</option>
                <option value="TFSA">TFSA</option>
              </select>
              <span v-if="errors.Type" class="error input-error-font-size">{{ errors.Type }}</span>
            </div>
          </div>
        </div>
        <div v-show="formData.layout === 'TFSA'" class="col-6 col-sm-4 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Registered?</label>

          <div class="">
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.registered" id="choices-state"
                  class="multisteps-form__select form-control choices__input" tabindex="-1" data-choice="active">
                  <option>-NONE-</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-row d-flex justify-content-center mt-4">
        <button class="btn mb-0 bg-gradient-dark btn-md null null mb-0 js-btn-next" type="button"
          @click.prevent="nextStep">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<style></style>
<script>
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
export default {
  components: {

    VueTelInput
  },

  props: {
    basicInfo: {
      type: Object,
      required: true
    },
    owners: {
      type: Array,
      required: true,
    },
    locations: {
      type: Array,
      required: true,
    },
    contacts: {
      type: Array,
      required: true,
    },
    advisors: {
      type: Array,
      required: true,
    },
  },
  watch: {
    basicInfo: {
      handler() {
        this.formData = { ...this.basicInfo };
      },
      deep: true
    },
    owners: {
      handler(ownersArr) {
        this.ownersArr = this.owners;
        console.log("<<<<<<<<========== this ownersArr =========>>>>>>>>>", ownersArr);
      },
      immediate: true,
      deep: true,
    },
    locations: {
      handler(locationsArr) {
        this.locationsArr = this.locations;
        console.log("<<<<<<<<========== this locationsArr =========>>>>>>>>>", locationsArr);

      },
      immediate: true,
      deep: true,
    },
    contacts: {
      handler(contactsArr) {
        this.contactsArr = this.contacts;
        console.log("<<<<<<<<========== this contactsArr =========>>>>>>>>>", contactsArr);

      },
      immediate: true,
      deep: true,
    },
    advisors: {
      handler(advisorsArr) {
        this.advisorsArr = this.advisors;
        console.log("<<<<<<<<========== this advisorsArr =========>>>>>>>>>", advisorsArr);
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      formData: { ...this.basicInfo },
      // premiumFrequencyOptions: {...premiumFrequencyOptions},
      // policyStatusOptions: {...policyStatusOptions},
      // policyTypeOption: {...policyTypeOption},
      // advisorCodeOfConductComplainceOption: {...advisorCodeOfConductComplainceOption},
      // clientFirstPolicyOptions: {...clientFirstPolicyOptions},
      // advisorProbhitedOption: {...advisorProbhitedOption},
      // sendToPolicyStartDateEmailTrackOptions: {...sendToPolicyStartDateEmailTrackOptions},
      errors: {},
      ownersArr: [...this.owners],
      locationsArr: [...this.locations],
      contactsArr: [...this.contacts],
      advisorsArr: [...this.advisors],
    }
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
    }
  }
}
</script>