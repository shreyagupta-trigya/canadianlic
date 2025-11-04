<template>
  <div>
    <!-- Insurance Inquiry Form -->
    <h5 class="main-heading mb-3 ps-2">Service Request Details</h5>
    <div>


      <!-- Card 1: Services + Potential Business -->
      <div class="card custom-card mb-4">
        <div class="card-body mb-4">
          <div class="card-surface">
            <div class="row g-3">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <label class="my-0">Services Requested</label>
                <select id="insuranceType" class="form-select" v-model="formData.servicesRequested">
                  <option v-for="(option, index) in servicesRequested" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12">
                <label class=" my-0">Potential Business (Policy Values)</label>
                <input type="number" v-model="formData.potentialBusiness" class="form-control form-control-default">
              </div>
          </div>
          </div>
        </div>
        <div class="card-body mb-4">
          <div class="card-surface">
            <div class="row g-3">
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Life Insurance</label>
                <select v-model="formData.lifeInsurance" class="form-select">
                  <option v-for="(option, index) in lifeInsuranceOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>

              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Living Benefits</label>
                <select v-model="formData.livingBenefits" class="form-select">
                  <option v-for="(option, index) in livingBenefitsOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>

              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Investments</label>
                <select v-model="formData.investments" class="form-select">
                  <option v-for="(option, index) in investmentsOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>

              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Group Insurance</label>
                <select v-model="formData.groupInsurance" class="form-select">
                  <option v-for="(option, index) in groupInsurance" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Row 2: Travel | Immigration | Health & Dental | Business Liability -->
            <div class="row ps-2 mt-2">
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Travel Insurance</label>
                <select v-model="formData.travelInsurance" class="form-select">
                  <option v-for="(option, index) in travelInsuranceOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12">
                <label class="my-0">Immigration Services</label>
                <select v-model="formData.immigrationServices" class="form-select">
                  <optgroup v-for="(items, label) in immigrationServicesGroups" :key="label" :label="label">
                    <option v-for="(option, idx) in items" :key="label + '-' + idx" :value="option">
                      {{ option }}
                    </option>
                  </optgroup>
                </select>
              </div>

              <div class="col-lg-3 col-md-6 col-sm-12 d-flex align-items-center">
                <div class="form-check form-switch mt-3">
                  <input v-model="formData.healthAndDentalInsurance" type="checkbox" class="form-check-input" />
                  <label class="form-check-label ms-2">Health & Dental Insurance</label>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12">
                <label class="my-0">Business Liability Insurance</label>
                <select v-model="formData.businessLiabilityInsurance" class="form-select">
                  <option v-for="(option, index) in businessLiabilityInsuranceOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Row 3: Home | Auto | Loan Protection | Combination/Hybrid -->
            <div class="row ps-2 mt-2">
              <div class="col-lg-3 col-md-6 col-sm-12">
                <label class="my-0">Home Insurance</label>
                <select v-model="formData.homeInsurance" class="form-select">
                  <option v-for="(option, index) in homeInsuranceOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-12">
                <label class="my-0">Auto Insurance</label>
                <select v-model="formData.autoInsurance" class="form-select">
                  <option v-for="(option, index) in autoInsuranceOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12">
                <label class="my-0">Loan Protection</label>
                <select id="insuranceType" class="form-select" v-model="formData.loanProtection">
                  <option v-for="(option, index) in loanProtectionOption" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-start align-items-center">
                <div class="form-check form-switch mt-3">
                  <input v-model="formData.combinationOrHybridInsurance" type="checkbox" class="form-check-input" />
                  <label class="my-0 mx-2">Combination or Hybrid Insurance</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4" style="margin-bottom:200px;">
    <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousStep" type="button">
      Prev
    </button>
    <button v-if="!id" class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button"
      @click.prevent="nextStep">
      Submit
    </button>
  </div>
</template>

<script>
import {
  lifeInsuranceOption,
  livingBenefitsOption,
  servicesRequested,
  businessLiabilityInsuranceOption,
  investmentsOption,
  immigrationServicesOption,
  groupInsuranceOption,
  loanProtectionOption,
  homeInsuranceOption,
  autoInsuranceOption,
  travelInsuranceOption,
  groupInsurance
} from "../../utils/picklist.js";

export default {
  name: "InsuranceInquiryForm",
  props: {
    ServiceRequestDetails: {
      type: Object,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      formData: { ...this.ServiceRequestDetails },
      lifeInsuranceOption: { ...lifeInsuranceOption },
      livingBenefitsOption: { ...livingBenefitsOption },
      businessLiabilityInsuranceOption: { ...businessLiabilityInsuranceOption },
      servicesRequested: { ...servicesRequested },
      immigrationServicesOption: { ...immigrationServicesOption },
      immigrationServicesGroups: {
        'Visas & Entry': [
          'Super Visa',
          'Visitor Visa',
          'Study Visa',
          'LMIA',
          'Caregivers',
          'Permanent Residence: Express Entry',
          'Startup Visa Program'
        ],
        'Business & Other Programs': [
          'Business Visa',
          'Business Immigration - Investment',
          'Canadian Experience Class (ECE)',
          'Citizenship',
          'Deportation',
          'Federal Skill Worker',
          'Temporary Resident Visa (Business & Tourism)'
        ],
        'PNP & Special Cases': [
          'Provincial Nominee Program - Entrepreneur',
          'Provincial Nominee Program',
          'Decided',
          'PR(H&C)'
        ]
      },
      groupInsuranceOption: { ...groupInsuranceOption },
      investmentsOption: { ...investmentsOption },
      loanProtectionOption: { ...loanProtectionOption },
      homeInsuranceOption: { ...homeInsuranceOption },
      autoInsuranceOption: { ...autoInsuranceOption },
      travelInsuranceOption: { ...travelInsuranceOption },
      groupInsurance: { ...groupInsurance }
    };
  },
  watch: {
    ServiceRequestDetails: {
      handler(formData) {
        // parentId = this.id;
        console.log("id====>", this.id);
        formData = { ...this.ServiceRequestDetails };
        console.log("FormData lead LeadManagementInformation: ", formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    nextStep() {
      this.$emit("next", this.formData);
    },
    previousStep() {
      this.$emit("previous");
    },
  },
};
</script>

<style scoped>
.main-heading {
  font-weight: 500 !important;
}

/* OUTER CARD — thin grey border + soft shadow + hover lift */
.card.custom-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(16, 24, 40, 0.04);
  padding: 14px;
  /* space for the inner surface */

}


/* INNER SURFACE — stays flat, adds the inner thin grey frame */
.card-surface {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 18px 16px;
  transition: box-shadow .3s ease, transform .3s ease;
  /* smooth hover */
}

.card-surface:hover {
  box-shadow: 0 8px 22px rgba(16, 24, 40, 0.12);
  transform: translateY(-2px);
}

/* remove default body padding; inner surface handles spacing */
.card.custom-card .card-body {
  padding: 0;
}

/* Labels */
.form-label,
label {
  margin-bottom: .35rem;
  font-weight: 500;
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
