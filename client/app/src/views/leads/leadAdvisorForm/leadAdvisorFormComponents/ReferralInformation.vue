<template>
  <div v-if="leadSource?.toLowerCase() === 'referral'">
    <h5 class="main-heading mt-2 mb-0 ps-2">Referral Information</h5>

    <div class="row ps-2">
       <div  class="col-lg-4 col-md-4 col-sm-12">
        <label class="mb-0 mt-2" for="year">Referred By</label>
         <select class="form-select" v-model="formData.referredBy">
          <option value="-None-">-None-</option>
          <option value="Social Media">Social Media</option>
          <option value="Radio">Radio</option>
          <option value="Google">Google</option>
          <option value="Advisor">Advisor</option>
          <option value="External Referral">External Referral</option>
          <option value="Lead/Client">Lead/Client</option>
          <option value="Mortgage/RealEstate/Accountant">Mortgage/RealEstate/Accountant</option>
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="mb-0 mt-2" for="year">Year</label>
        <select class="form-select" v-model="formData.year">
          <option v-for="(option, index) in yearOption" :key="index" :value="option">
            {{ option }}
          </option>

        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Referral Source</label>
        <select class="form-select" v-model="formData.referralSource">
          <option v-for="(option, index) in referralSourceOption" :key="index" :value="option">
            {{ option }}
          </option>

        </select>
      </div>
     

    

    </div>
    <div class="row mt-1 ps-2">
        <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Referral Client</label>
        <select class="form-select" v-model="formData.referralClient">
          <option v-for="contact in contactsArr" :key="contact.ROWID" :value="contact.ROWID">
            {{ contact.name }}
          </option>
          <!-- <option value="Manreet Singh Walia">Manreet Singh Walia</option>
          <option value="Samilla Christine Barbosa Ribeiro Mendes">Samilla Christine Barbosa Ribeiro Mendes</option> -->
          <!-- Remove duplicate option if not needed -->
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Referral Other than Client</label>
        <select class="form-select" v-model="formData.referralOtherThanClient">
          <option v-for="referral in referralArr" :key="referral.ROWID" :value="referral.ROWID">
            {{ referral.referralName }}
          </option>
          <!-- <option value="">-None-</option>
          <option value="Harjit Singh Warring">Harjit Singh Warring</option> -->
        </select>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Product Category Referred</label>
        <select class="form-select" v-model="formData.productCategoryReferred">
          <option v-for="(option, index) in productCategoryOption" :key="index" :value="option">
            {{ option }}
          </option>

        </select>
      </div>
    </div>

    <div class="button-row d-flex justify-content-center mt-4 gap-4" style="margin-bottom:200px;">
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousStep"
        type="button">Prev</button>
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep"
        type="button">Next</button>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
    <span class="text-muted">Please select lead in lead Info as Referral to enter referral information.</span>
  </div>
</template>

<script>
import { referralSourceOption, siblingsOption, dependentParentsOption, yearOption, productCategoryOption } from "../../utils/picklist.js";

export default {
  name: "CampaignDataForm",
  props: {
    ReferralInformation: {
      type: Object,
      required: true
    },
    contacts: {
      type: Array,
      required: true,
    },
    referral: {
      type: Array,
      required: true,
    },
    leadSource: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      formData: { ...this.ReferralInformation },
      contactsArr: [...this.contacts],
      referralArr: [...this.referral],
      yearOption: { ...yearOption },
      referralSourceOption: { ...referralSourceOption },
      productCategoryOption: { ...productCategoryOption },
      siblingsOption: { ...siblingsOption },
      dependentParentsOption: { ...dependentParentsOption },
    };
  },
  watch: {
    ReferralInformation: {
      handler() {
        this.formData = { ...this.ReferralInformation };
        console.log("FormData lead ReferralInformation: ", this.formData);
      },
      immediate: true,
      deep: true
    },
    contacts: {
      handler(contactsArr) {
        contactsArr = this.contacts;
        console.log("this contactsArr", contactsArr);
      },
      immediate: true,
      deep: true,
    },
    referral: {
      handler(referralArr) {
        referralArr = this.referral;
        console.log("this contactsArr", referralArr);
      },
      immediate: true,
      deep: true,
    },
    leadSource: {
      handler(newVal) {
        console.log('Lead Source changed:', newVal);
      },
      immediate: true
    },
  },

  created() {
    console.log('Initial Lead Source:', this.leadSource);
  },
  methods: {
    nextStep() {
      this.$emit('next', this.formData);
    },
    previousStep() {
      this.$emit('previous');
    },
  }
};
</script>

<style scoped>
.main-heading {
  font-weight: 500 !important;
}

.form-control-default {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
}

.my-0 {
  margin-bottom: 0 !important;
}
</style>
