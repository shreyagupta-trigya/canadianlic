<template>
  <div class="ps-2">
    <h4>Referral Payout</h4>
    <div class="multisteps-form__content">
      <div class="row mt-3">
        <div class="col-lg-4">
          <label class="my-0 mt-2">Year</label>
          <input v-model="formData.year" class="multisteps-form__input form-control" type="text" placeholder="Year" />
        </div>
        <div class="col-lg-4">
          <label class="my-0 mt-2">1st Policy Issued Date</label>
          <!-- <input v-model="formData.firstPolicyIssueDate" class="multisteps-form__input form-control" type="date"
            placeholder="DD MM, YYYY" /> -->
          <div class="input-group bg-white">
            <flat-pickr v-model="formData.firstPolicyIssueDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
              class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
              ref="fpDateOfBirth" />
            <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
              <i class="fa fa-calendar"></i>
            </span>
            
          </div>
        </div>
        <div class="col-lg-4 mt-1">
          <label class="my-0 mt-2">Client</label>
          <input v-model="formData.client" class="multisteps-form__input form-control" type="text"
            placeholder="Client" />
        </div>
        <div class="col-lg-4 mt-1">
          <label class="my-0 mt-2">Product Category Reffered</label>
          <input v-model="formData.productCategoryReffered" class="multisteps-form__input form-control" type="text"
            placeholder="Product Category Reffered" />
        </div>
        <div class="col-lg-4 mt-1">
          <label class="my-0 mt-2">Referral Payout <span class="text-danger">*</span>
          </label>
          <input v-model="formData.referralPayout" class="multisteps-form__input form-control" type="number"
            placeholder="CA$" />
        </div>
      </div>
      <!-- <div class="button-row d-flex mt-4">
            <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button">Prev</button>
            <button class="btn mb-0 bg-gradient-dark btn-md null null ms-auto js-btn-next" type="button">Next</button>
        </div> -->
      <div class="button-row d-flex justify-content-center mt-2 gap-4 space">
        <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button" @click="previousStep">
          Prev
        </button>
        <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<style>
@media screen and (max-width:500px) {
  .space {
    margin-bottom: 150px;
  }
}
</style>
<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
 components: { flatPickr },

  name: "Refferal Pyout",
  props: {
    RefferalPayou: {
      type: Object,
      Required: true,
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
      formData: { ...this.RefferalPayou },
    };
  },
  watch: {
    RefferalPayou: {
      handler(formData) {
        formData = { ...this.RefferalPayou };
        console.log("this formData deal facebook", formData);
      },
      immediate: true,
      deep: true,
    },
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
      this.$emit("next", this.formData);
      console.log(this.formData);
    },
    previousStep() {
      this.$emit("previous", this.formData);
    },
  },
};
</script>
