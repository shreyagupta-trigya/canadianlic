<template>
  <div class="ps-2">
    <h5 class="main-heading mb-0">Referral informations</h5>
    <div class="multisteps-form__content">
      <div class="row mt-1">
        <div class="col-lg-4 col-sm-6">
          <label class="my-0 mt-2"
            >Referral Name
            <span class="text-danger input-error-font-size">*</span></label
          >
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input
                v-model="formData.referralName"
                id="referralname"
                type="text"
                class="form-control form-control-default"
                placeholder="Referral Name"
                isrequired="false"
                autocomplete="off"
              />
              <!-- <span v-if="errors.referralName" class="text-danger">{{
                errors.referralName
              }}</span> -->
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-3 mt-sm-0">
          <label class="my-0 mt-2"
            >Last Name
            <span class="text-danger input-error-font-size">*</span></label
          >
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input
                v-model="formData.lastName"
                id="lastName"
                type="text"
                class="form-control form-control-default"
                placeholder="Last Name"
                isrequired="false"
                autocomplete="off"
              />
              <!-- <span v-if="errors.lastName" class="text-danger">{{
                errors.lastName
              }}</span> -->
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-3 mt-sm-0">
          <label class="my-0 mt-2">Referred By </label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input
                v-model="formData.referredBy"
                id="referredBy"
                type="text"
                class="form-control form-control-default"
                placeholder="Referred By"
                isrequired="false"
                autocomplete="off"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-lg-4 col-sm-6">
          <label class="my-0 mt-2"
            >Email<span class="text-danger input-error-font-size"
              >*</span
            ></label
          >
          <div class="form-group multisteps-form__input mb-1">
            <div class="">
              <input
                v-model="formData.email"
                id="referralname"
                type="text"
                class="form-control form-control-default"
                placeholder="Email"
                isrequired="false"
                autocomplete="off"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-3 mt-sm-0">
          <label class="my-0 mt-2">Call </label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input
                v-model="formData.phone"
                id="phone"
                type="text"
                class="form-control form-control-default"
                placeholder="call"
                isrequired="false"
                autocomplete="off"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <label class="my-0 mt-2">Referral Leads </label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="select-box">
              <select
                class="form-select"
                id="assignedAdvisorOwner"
                v-model="formData.referralLeads"
              >
                <option value="" disabled selected class="text-muted">
                  Select Referral Leads
                </option>
                <option
                  v-for="(leads, index) in leads"
                  :key="index"
                  :value="leads.ROWID"
                >
                  {{ leads.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <label class="my-0 mt-2"
            >Referral Owner
            <span class="text-danger input-error-font-size">*</span></label
          >
          <div class="form-group multisteps-form__input mb-0">
            <div class="select-box">
              <select
                class="form-select"
                id="referralOwner"
                v-model="formData.referralOwner"
              >
                <option value="" disabled selected class="text-muted">
                  Select Owner
                </option>
                <option
                  v-for="(owners, index) in owners"
                  :key="index"
                  :value="owners.ROWID"
                >
                  {{ owners.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-3 mt-sm-0">
          <label class="my-0 mt-2"
            >Referred By - Client
            <span class="text-danger input-error-font-size">*</span></label
          >
          <div class="form-group multisteps-form__input mb-0">
            <div class="select-box">
              <select
                class="form-select"
                id="assignedAdvisorOwner"
                v-model="formData.referredByClient"
              >
                <option value="" disabled selected class="text-muted">
                  Select Contacts
                </option>
                <option
                  v-for="(contacts, index) in contacts"
                  :key="index"
                  :value="contacts.ROWID"
                >
                  {{ contacts.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6">
          <label class="my-0 mt-2">Referred By - Other</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="select-box">
              <select
                class="form-select"
                id="assignedAdvisorOwner"
                v-model="formData.referredByOther"
              >
                <option value="" disabled selected class="text-muted">
                  Select Contacts
                </option>
                <option
                  v-for="(referral, index) in referral"
                  :key="index"
                  :value="referral.ROWID"
                >
                  {{ referral.referralName }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6 mt-sm-0">
          <label class="my-0 mt-2">Layout</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input
                v-model="formData.layout"
                id="layout"
                type="text"
                class="form-control form-control-default"
                placeholder="Layout"
                autocomplete="off"
              />
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-sm-6 mt-sm-0">
          <label class="my-0 mt-2">Currency</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input
                v-model="formData.currency"
                id="currency"
                type="txt"
                class="form-control form-control-default"
                placeholder="Currency"
                autocomplete="off"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 mt-sm-0">
          <label class="my-0 mt-2">Exchange Rate</label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="">
              <input
                v-model="formData.exchangeRate"
                id="ExchangeRate"
                type="number"
                class="form-control form-control-default"
                placeholder="Exchange Rage"
                autocomplete="off"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6">
          <label class="my-0 mt-2">Leads </label>
          <div class="form-group multisteps-form__input mb-0">
            <div class="select-box">
              <select
                class="form-select"
                id="assignedAdvisorOwner"
                v-model="formData.leadId"
              >
                <option value="" disabled selected class="text-muted">
                  Select Leads
                </option>
                <option
                  v-for="(leads, index) in leads"
                  :key="index"
                  :value="leads.ROWID"
                >
                  {{ leads.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="button-row d-flex justify-content-center mt-2 gap-4 space">
        <button
          class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
          @click.prevent="handleNextStep"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import validateMandatoryFields from "../../utils/util-js/validate.js";
// import mandatory from "../utils/mandatory.js";
export default {
  name: "refferal information",
  props: {
    RefferalInfo: {
      type: Object,
      required: true,
    },
    owners: {
      type: Array,
      required: true,
    },
    leads: {
      type: Array,
      required: true,
    },
    contacts: {
      type: Array,
      required: true,
    },
    referral: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      formData: { ...this.RefferalInfo },
    };
  },
  watch: {
    RefferalInfo: {
      handler(formData) {
        formData = { ...this.RefferalInfo };
        console.log("this formData Claims", formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleNextStep() {
      // this.errors = validateMandatoryFields(this.formData, mandatory);
      // const validateFields = Object.keys(this.errors).length === 0;
      // console.log("validateFields", this.errors);
      // if (validateFields) {
        this.$emit("next", this.formData);
      // }
    },
  },
};
</script>
<style>
@media screen and (max-width:500px) {
  .space{
    margin-bottom:150px;
  }
}
</style>
