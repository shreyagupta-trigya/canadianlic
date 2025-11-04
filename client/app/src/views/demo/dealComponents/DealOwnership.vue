<template>
  <div>
    <div class="row">
      <div class="col-4 col-sm-4 mt-2 mt-sm-0">
        <label class="my-0">Is Client the Insured?</label>
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
              v-model="formData.isClientTheInsured"
              class="multisteps-form__select form-control choices__input"
              name="choices-state"
            >
              <option
                v-for="(option, index) in objectType"
                :key="index"
                :value="option"
                :selected="option === '-None-'"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-4 col-sm-4 mt-2 mt-sm-0">
        <label class="my-0">Are there multiple Insured for this Policy? </label>
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
              v-model="formData.areThereMultipleInsuredForThisPolicy"
              class="multisteps-form__select form-control choices__input"
              name="choices-state"
            >
              <option
                v-for="(option, index) in objectType"
                :key="index"
                :value="option"
                :selected="option === '-None-'"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <h5 class="main-heading mt-2">Deal Owner</h5>
    <div style="width: 100%; overflow: scroll">
      <table class="table border table-responsive subform">
        <thead class="table subform-table-head text-white">
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Number of Insured</th>
            <th>Insured Name</th>
            <th>Insured Phone</th>
            <th>Insured Email</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(parent, index) in subForm" :key="index">
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
                v-model="parent.numberOfInsured"
                type="number"
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
            <td>
              <input
                v-model="parent.insuredName"
                type="text"
                class="form-control form-control-default"
                autocomplete="off"
              />
            </td>
            <td>
              <input
                v-model="parent.insuredPhone"
                type="tel"
                class="form-control form-control-default"
                autocomplete="off"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
            </td>
            <td>
              <input
                v-model="parent.insuredEmail"
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
      @click.prevent="addRowTodealDataTable"
    >
      Add Row
    </button>
  </div>
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
</template>

<script>
import {objectType} from "../utils/picklist.js";
// import { ref } from "vue";
export default {
  name: "LeadManagementHistory",
   props: {
    DealOwnership: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: { ...this.DealOwnership },
      objectType: { ...objectType },
      subForm: [],
    };
  },
  watch: {
    DealOwnership: {
      handler() {
        console.log("<<<<<<<<<<<INSERT THE WATCH FOR DEALOWNERSHIP>>>>>>>>>>>>>>>>>>>>>>>>>")
        this.formData = { ...this.DealOwnership };
        this.subForm = this.DealOwnership.dealOwnership || [];
        console.log("<<<<<<<<< == this formData deal DealOwnership ==>>>>>>>>>", this.formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    addRowTodealDataTable() {
      this.subForm.push({
        numberOfInsured: "",
        insuredName: "",
        insuredPhone: "",
        insuredEmail: "",
      });
    },
    deleteLeadsRow(index) {
      this.subForm.splice(index, 1);
    },
    nextStep() {
      this.$emit("next", { ...this.formData, dealOwnership: this.subForm });  
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
