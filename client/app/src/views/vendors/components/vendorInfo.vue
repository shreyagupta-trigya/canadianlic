<template>
  <div class="ps-2">
    <h5 class="main-heading mb-0">Vendor Information</h5>
    <div class="multisteps-form__content">
      <div class="row">
        <div class="col-lg-4 col-sm-6 mt-1 mt-sm-0">
          <label class="my-0 mt-2">Vendor Name<span class="text-danger">*</span></label>
          <div class="form-group mb-1">
            <input v-model="formData.vendorName" type="text" class="form-control form-control-default" required />

          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-1 mt-sm-0">
          <label class="my-0 mt-2">Vendor Type</label>
          <div class="form-group multisteps-form__input mb-1">
            <input v-model="formData.vendorType" type="text" class="form-control form-control-default" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-sm-0">
          <label class="my-0 mt-2">Email</label>
          <div class="form-group multisteps-form__input mb-1">
            <input v-model="formData.email" type="email" class="form-control form-control-default" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6 mt-sm-0">
          <label class="my-0 mt-2">Phone</label>
          <div class="form-group ">
            <!-- <input
              v-model="formData.phone"
              type="tel"
              class="form-control form-control-default"
            /> -->
            <VueTelInput v-model="formData.phone" :defaultCountry="'CA'"
              :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true" :mode="'international'"
              :inputOptions="{
                placeholder: '+1 (XXX) XXX-XXXX',
                inputmode: 'numeric',
                maxlength: 15,            // '+' + 15 digits (E.164)
                onInput: handleTelInput   // live sanitize
              }" />
            <!-- <span v-if="errors.mobile" class="text-danger">{{ errors.mobile }}</span> -->
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-sm-0">
          <label class="my-0 mt-2">Fax</label>
          <div class="form-group multisteps-form__input mb-1">
            <input v-model="formData.fax" type="text" class="form-control form-control-default" />
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-sm-0">
          <label class="my-0 mt-2">Website</label>
          <div class="form-group multisteps-form__input mb-1">
            <input v-model="formData.website" type="text" class="form-control form-control-default" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4 col-sm-4 mt-3 mt-sm-0">
          <label class="my-0">Vendor Owner</label>
          <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
            aria-expanded="false">
            <div class="select-box">
              <select required v-model="formData.vendorOwner" id="choices-state"
                class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                data-choice="active">
                <option value="">Select</option>
                <option v-for="(owners, index) in owners" :key="index" :value="owners.ROWID">
                  {{ owners.name }}
                </option>
              </select>

            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-1 mt-sm-0">
          <label class="my-0 mt-2">Referred By - Client</label>
          <div class="select-box">
            <select required v-model="formData.referredBy" id="choices-state"
              class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
              data-choice="active">
              <option value="">Select</option>
              <option v-for="(contacts, index) in contacts" :key="index" :value="contacts.ROWID">
                {{ contacts.name }}
              </option>
            </select>

          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-1 mt-sm-0">
          <label class="my-0 mt-2">Exchange Rate</label>
          <div class="form-group multisteps-form__input mb-1">
            <input v-model="formData.exchangeRate" type="number" class="form-control form-control-default" required />

          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-1 mt-sm-0">
          <label class="my-0 mt-2">Contact</label>

          <div class="select-box">
            <select required v-model="formData.contact" id="choices-state"
              class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
              data-choice="active">
              <option value="">Select</option>
              <option v-for="(contacts, index) in contacts" :key="index" :value="contacts.ROWID">
                {{ contacts.name }}
              </option>
            </select>

          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-1 mt-sm-0">
          <label class="my-0 mt-2">currency</label>
          <div class="form-group multisteps-form__input mb-1">
            <input v-model="formData.currency" type="text" class="form-control form-control-default" required />

          </div>
        </div>
      </div>
    </div>
    <div class="button-row d-flex justify-content-center mt-2 gap-4 space">
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="handleNext" type="button">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
export default {
  name: "vendor information",
  props: {
    VendorInfo: {
      type: Array,
      required: true
    },
    owners: {
      type: Array,
      required: true,
    },
    contacts: {
      type: Array,
      required: true,
    },
  },
  components: { VueTelInput },
  data() {
    return {
      formData: { ...this.VendorInfo },
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
  watch: {
    VendorInfo: {
      handler(formData) {
        this.formData = { ...this.VendorInfo },
          console.log("VendorInfo", formData)
      },
      immediate: true,
      deep: true,
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
    handleNext() {
      this.errors = validateMandatoryFields(this.formData, mandatory);
      const validateFields = Object.keys(this.errors).length === 0;
      const mobile = (this.formData.phone || '').replace(/\s|-/g, '');
      if (mobile) {
        if (!mobile.startsWith('+')) {
          this.errors.mobile = 'Country code is required (e.g. +1...)';
        } else if (mobile.startsWith('+1') && !/^\+1\d{10}$/.test(mobile)) {
          this.errors.mobile = 'Canadian number must be +1 followed by 10 digits';
        } else if (!/^\+\d{8,15}$/.test(mobile)) {
          this.errors.mobile = 'Phone must be in international format (e.g. +1234567890)';
        }
      }
      if (validateFields) {
        console.log(
          "<<<<<<<<<<<<<<< CURRENT STEP >>>>>>>>>>>>>>>>>>>>>>>>",
          this.formData
        );
        this.$emit("next", this.formData);
      }
    }
  }
  }
  </script>

<style>
@media screen and (max-width:500px) {
  .space {
    margin-bottom: 50px;
  }
}
</style>