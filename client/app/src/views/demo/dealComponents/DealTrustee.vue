<template>
  <div>
    <h5 class="main-heading mt-2">Deal Trustee</h5>
    <div class="row mb-2">
      <div class="col-4 col-sm-4 mt-2 mt-sm-0">
        <label class="my-0">Are there Trustees for this Policy?</label>
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
              v-model="formData.areThereTrusteesforThisPolicy"
              class="multisteps-form__select form-control choices__input"
              name="choices-state"
            >
              <option
                v-for="(option, index) in objectType"
                :key="index"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-4 col-sm-4 mt-2 mt-sm-0">
        <label class="my-0">Trust Documents Received and Uploaded </label>
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
              v-model="formData.trustDocumentsReceivedAndUploaded"
              class="multisteps-form__select form-control choices__input"
              name="choices-state"
            >
              <option
                v-for="(option, index) in objectType"
                :key="index"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="col-4 col-sm-4 mt-2 mt-sm-0">
        <label class="my-0">Trust Dissolution Date</label>
        <div>
          <input
            class="form-control"
            type="date"
            v-model="formData.trustDissolutionDate"
          />
        </div>
      </div>
      <div class="col-4 col-sm-4 mt-2 mt-sm-0">
        <label class="my-0">Application Initiated On</label>
        <div>
          <input
            class="form-control"
            type="date"
            v-model="formData.applicationOn"
          />
        </div>
      </div>
      <div class="col-4 col-sm-4 mt-2 mt-sm-0">
        <label class="my-0">Number of trustees</label>
        <div>
          <input
            class="form-control"
            type="text"
            v-model="formData.numberOfTrustees"
          />
        </div>
      </div>
    </div>
    <div style="width: 100%; overflow: scroll">
      <table class="table border table-responsive subform">
        <thead class="table subform-table-head text-white">
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Name of Trustee</th>
            <th>Name of Beneficiary for Trustee</th>
            <th>Relationship with Beneficiary for Trustee</th>
            <th>Insured Phone</th>
            <th>Insured Email</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(parent, index) in subform" :key="index">
            <td class="m-auto">{{ index + 1 }}</td>
            <td>
              <a
                @click.prevent="deleteLeadsRow(index)"
                href="javascript:;"
                data-bs-toggle="tooltip"
                data-bs-original-title="Delete product"
              >
                <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
              </a>
            </td>
            <td>
              <input
                v-model="parent.name"
                type="text"
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
            <td>
              <input
                v-model="parent.nameOfBeneficiary"
                type="text"
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
            <td>
              <input
                v-model="parent.relationship"
                type="text"
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
            <td>
              <input
                v-model="parent.phone"
                type="tel"
                class="form-control form-control-default"
                autocomplete="off"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
            </td>
            <td>
              <input
                v-model="parent.email"
                type="email"
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      class="btn mb-0 btn-color btn-md"
      type="button"
      @click.prevent="addRowTodealTrusteeTable"
    >
      Add Row
    </button>
    <div class="button-row d-flex justify-content-center mt-2 gap-4">
      <button
        class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
        type="button"
        @click="previousStep"
      >
        Prev
      </button>
      <button
        class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
        @click.prevent="nextStep"
        type="button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { objectType } from "../utils/picklist.js";
export default {
  name: "DealTrustee", // Make sure this name matches your component's intended use
  props: {
    DealTrustee: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
        subform: [],
      formData: { ...this.DealTrustee },
      objectType: { ...objectType },
    };
  },
  watch: {
    DealTrustee: {
      handler() {
        this.formData = { ...this.DealTrustee };
        this.subform = this.DealTrustee.trustees || [];
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    addRowTodealTrusteeTable() {
        console.log("Adding new row to trusteeData");
      this.subform.push({}); 
      // this.subform.push({
      //   name: "",
      //   // nameOfBeneficiary: "",
      //   // relationship: "",
      //   // phone: "",
      //   // email: "",
      // });
    },
    deleteLeadsRow(index) {
      this.subform.splice(index, 1);
    },
    nextStep() {
      this.$emit("next",{ ...this.formData, trustee: this.subform });
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
