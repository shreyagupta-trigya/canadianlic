<template>

  <div style="margin-bottom:80px;">
    <h5 class="main-heading mt-4 mb-0 ps-2">Investment Application Tracking</h5>

    <div class="row mt-1 ps-2">
      <div class="col-md-4 col-sm-12 mt-0">
        <label class="my-0 mt-2">Date of Inquiry</label>
        <div class="col-12 input-group bg-white">
          <flat-pickr v-model="formData.dateOfEnquiry" :config="datePickerConfig" placeholder="DD/MM/YYYY"
            class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
            ref="fpDateOfBirth" />
          <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
            <i class="fa fa-calendar"></i>
          </span>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 mt-0">
        <label class="my-0 mt-2">Maturity Date</label>
       
        <div class="col-12 input-group bg-white">
          <flat-pickr v-model="formData.maturityDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
            class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
            ref="fpDateOfBirth" />
          <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
            <i class="fa fa-calendar"></i>
          </span>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 mt-0">
        <label class="my-0 mt-2">Follow Up Date</label>
        

        <div class="col-12 input-group bg-white">
          <flat-pickr v-model="formData.followUpDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
            class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
            ref="fpDateOfBirth" />
          <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
            <i class="fa fa-calendar"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="row mt-1 ps-2">
      <div class="col-md-4 col-sm-12 mt-0">
        <label class="my-0 mt-2">Date of Submission</label>
    
        <div class="col-12 input-group bg-white">
          <flat-pickr v-model="formData.dateOfSubmission" :config="datePickerConfig" placeholder="DD/MM/YYYY"
            class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
            ref="fpDateOfBirth" />
          <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
            <i class="fa fa-calendar"></i>
          </span>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 mt-0">
        <label class="my-0 mt-2">Contract Start Date</label>
        <div class="col-12 input-group bg-white">
          <flat-pickr v-model="formData.contractStartDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
            class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
            ref="fpDateOfBirth" />
          <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
            <i class="fa fa-calendar"></i>
          </span>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 mt-0">
        <label class="my-0 mt-2">Date of Last Review</label>
      
        <div class="col-12 input-group bg-white">
          <flat-pickr v-model="formData.dateOfLastReview" :config="datePickerConfig" placeholder="DD/MM/YYYY"
            class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
            ref="fpDateOfBirth" />
          <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
            <i class="fa fa-calendar"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="button-row d-flex justify-content-center mt-4 gap-4">
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button" @click="prevStep">
        Prev
      </button>
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button" @click.prevent="nextStep">
        Next
      </button>
    </div>
  </div>
</template>

<style></style>
<script>
import flatPickr from "vue-flatpickr-component"
import "flatpickr/dist/flatpickr.css"

export default {
    components: { flatPickr },
  props: {
    trackers: {
      type: Object,
      required: true
    }
  },
  watch: {
    trackers: {
      handler() {
        this.formData = { ...this.trackers };
      },
      deep: true,
      immediate: true
    }
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
      errors: {},
      formData: { ...this.trackers }
    }
  },
  methods: {
    openDatePicker() {
      if (this.$refs.fpDateOfBirth && this.$refs.fpDateOfBirth.fp) {
        this.$refs.fpDateOfBirth.fp.open()
      }
      },
    nextStep() {
      this.$emit('next', { ...this.formData });
    },
    prevStep() {
      this.$emit('previous');
    },
  }
}
</script>