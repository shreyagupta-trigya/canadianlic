<template>
  <div class="ps-2">
    <h5 class="main-heading mt-2 ">Deal Owner</h5>
    <div class="row mb-2">
    <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
      <label class="mb-0 mt-2">Is Client the Insured?</label>
      <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
        <div class="select-box">
          <select v-model="formData.isClientTheInsured" class="multisteps-form__select form-control choices__input" name="choices-state">
            <option v-for="(option, index) in objectType" :key="index" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
      <label class="mb-0 mt-2">Are there multiple Insured for this Policy? </label>
      <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
        <div class="select-box">
          <select v-model="formData.areThereMultipleInsuredForThisPolicy" class="multisteps-form__select form-control choices__input" name="choices-state">
            <option v-for="(option, index) in objectType" :key="index" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-4 mt-sm-0">   
      <label class="mb-0 mt-2">Number of insured</label>
      <input  type="text" v-model="formData.numberOfInsured" class="form-control form-control-default" autocomplete="off">   
    </div>
  </div>    
  <div style="width: 100%; overflow: scroll">
    <table class="table border table-responsive subform">
      <thead class="table subform-table-head text-white">
        <tr>
          <th>#</th>
          <th>Actions</th>
          <th>Insured Name</th>
          <th>Insured Phone</th>
          <th>Insured Email</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(parent, index) in dealOwnership" :key="index">
          <td class="m-auto">{{ index + 1 }}</td>
          <td>
            <a @click.prevent="deletedeleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
              <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
            </a>
          </td>             
          <td>
            <input v-model="parent.insuredName" type="text" class="form-control form-control-default" autocomplete="off">
          </td>
          <td>
            <input v-model="parent.insuredPhone" type="tel" class="form-control form-control-default" autocomplete="off" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
          </td>
          <td>
            <input v-model="parent.insuredEmail" type="email" class="form-control form-control-default" autocomplete="off">
          </td>
        </tr>
      </tbody>
    </table>
  </div>

    <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowTodealOwnershipTable">
      Add Row
    </button>
  </div>
<!-- Beneficiarie sub for -->
  <div class="mt-3">
    <div>
      <h5 class="main-heading mt-2">Deal Beneficiaries</h5>
      <div class="row mb-2">
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Is Client a Beneficiary?</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                      <select v-model="formData.isClientABeneficiary"
                          class="multisteps-form__select form-control choices__input" name="choices-state">
                          <option v-for="(option, index) in objectType" :key="index" :value="option">
                              {{ option }}
                          </option>
                      </select>
                  </div>
              </div>
          </div>
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Are there Multiple Beneficiaries excl. Client ?</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                      <select v-model="formData.areThereMultipleBeneficiariesExclClient"
                          class="multisteps-form__select form-control choices__input" name="choices-state">
                          <option v-for="(option, index) in arethereMultipleBeneficiariesexclClient" :key="index"
                              :value="option">
                              {{ option }}
                          </option>
                      </select>
                  </div>
              </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
              <label class="my-0">Number of Beneficiaries</label>
              <input v-model="formData.numberOfBeneficiariesUpto" type="text"
                  class="form-control form-control-default"/>
          </div>
      </div>      
      <div style="width: 100%; overflow: scroll">
          <table class="table border table-responsive subform">
              <thead class="table subform-table-head text-white">
                  <tr>
                      <th>#</th>
                      <th>Actions</th>
                      <th>Beneficiary Name</th>
                      <th>Beneficiary Relationship with Insured</th>
                      <th>Beneficiary Phone</th>
                      <th>Beneficiary Email</th>
                  </tr>
              </thead>
              <tbody class="table-group-divider">
                  <tr v-for="(beneficiary, index) in beneficiariesData" :key="index">
                      <td class="m-auto">{{ index + 1 }}</td>
                      <td>
                          <a @click.prevent="deletebeneficiariesData(index)" href="javascript:;" data-bs-toggle="tooltip"
                              data-bs-original-title="Delete product">
                              <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                          </a>
                      </td>
                      <td>
                          <input v-model="beneficiary.beneficiaryName" @change="dealbeneficiary()" type="text" class="form-control form-control-default"
                              autocomplete="off">
                      </td>
                      <td>
                          <input v-model="beneficiary.beneficiaryRelationshipWithInsured" type="text"
                              class="form-control form-control-default" autocomplete="off">
                      </td>
                      <td>
                          <input v-model="beneficiary.beneficiaryPhone" type="tel" class="form-control form-control-default"
                              autocomplete="off" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
                      </td>
                      <td>
                          <input v-model="beneficiary.beneficiaryEmail" type="email" class="form-control form-control-default"
                              autocomplete="off">
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowTodealBenefeciaryTable">
          Add Row
      </button>
  </div>
  </div>
  <!-- Deal Trustee -->
  <div class="mt-3">
    <div>
      <h5 class="main-heading mt-2">Deal Trustee</h5>
      <div class="row">
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Are there Trustees for this Policy?</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                      <select v-model="formData.areThereTrusteesforThisPolicy"
                          class="multisteps-form__select form-control choices__input" name="choices-state">
                          <option v-for="(option, index) in objectType" :key="index"
                              :value="option">
                              {{ option }}
                          </option>
                      </select>
                  </div>
              </div>
          </div>
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Trust Documents Received and Uploaded </label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                      <select v-model="formData.trustDocumentsReceivedAndUploaded"
                          class="multisteps-form__select form-control choices__input" name="choices-state">
                          <option v-for="(option, index) in objectType" :key="index"
                              :value="option">
                              {{ option }}
                          </option>
                      </select>
                  </div>
              </div>
          </div>
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Trust Dissolution Date</label>
              <div>
                  <input class="form-control" type="date" v-model="formData.trustDissolutionDate" />
              </div>
          </div>
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Application  On</label>
              <div>
                  <input class="form-control" type="date" v-model="formData.applicationOn" />
              </div>
          </div>
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Number of trustees</label>
              <div>
                  <input class="form-control" type="text" v-model="formData.numberOfTrustees" />
              </div>
          </div>
      </div>

      <div style="width: 100%; overflow: scroll">
          <table class="table border table-responsive subform mt-2">
              <thead class="table subform-table-head text-white">
                  <tr>
                      <th>#</th>
                      <th>Actions</th>
                      <th>Name of Trustee</th>
                      <th>Name of Beneficiary for Trustee</th>
                      <th>Relationship with Beneficiary for Trustee</th>
                      <th>Trustee Phone</th>
                      <th>Trustee Email</th>

                  </tr>
              </thead>
              <tbody class="table-group-divider">
                  <tr v-for="(parent, index) in trusteeData" :key="index">
                      <td class="m-auto">{{ index + 1 }}</td>
                      <td>
                          <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip"
                              data-bs-original-title="Delete product">
                              <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                          </a>
                      </td>
                      <td>
                          <input v-model="parent.nameOfTrustees" type="text" class="form-control form-control-default"
                              autocomplete="off">
                      </td>
                      <td>
                          <input v-model="parent.nameOfBeneficiaryForTrustee" type="text"
                              class="form-control form-control-default" autocomplete="off">
                      </td>
                      <td>
                          <input v-model="parent.relationshipWithBeneficiaryForTrustee" type="text"
                              class="form-control form-control-default" autocomplete="off">
                      </td>
                      <td>
                          <input v-model="parent.trusteePhone" type="tel" class="form-control form-control-default"
                              autocomplete="off" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
                      </td>
                      <td>
                          <input v-model="parent.trusteeEmail" type="email" class="form-control form-control-default"
                              autocomplete="off">
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowTodealTrusteeTable">
          Add Row
      </button>
  </div>

  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
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
import {objectType, arethereMultipleBeneficiariesexclClient} from "../../utils/picklist.js";
export default {
  name: "LeadManagementHistory",
  props:{
    DealOwnership:{
      type: Function,
      required: true
    }    
  },
  data() {
    return {
      formData: { ...this.DealOwnership },
      objectType: { ...objectType },
      arethereMultipleBeneficiariesexclClient: { ...arethereMultipleBeneficiariesexclClient },
      dealOwnership: [],
      trusteeData: [],
      beneficiariesData: [],
    };
  },
  watch: {
    DealOwnership: {
      handler() {
        console.log("<<<<<<<<<<<INSERT THE WATCH FOR DEALOWNERSHIP>>>>>>>>>>>>>>>>>>>>>>>>>")
        this.formData = { ...this.DealOwnership };
        this.dealOwnership = this.DealOwnership.dealOwnership || [];
        this.trusteeData = this.DealOwnership.trusteeData || [];
        this.beneficiariesData = this.DealOwnership.beneficiariesData || [];
        console.log("<<<<<<<<< == this formData deal DealOwnership ==>>>>>>>>>", this.formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    addRowTodealOwnershipTable() {
      this.dealOwnership.push({
        numberOfInsured : "",
        insuredName: "",
        insuredPhone: "",
        insuredEmail: "",
      });
    },
    deletedeleteLeadsRow(index) {
      this.dealOwnership.splice(index, 1);
    },
    addRowTodealTrusteeTable() {
    this.trusteeData.push({
          nameOfTrustees: "",
          nameOfBeneficiaryForTrustee: "",
          relationshipWithBeneficiaryForTrustee: "",
          trusteePhone: "",
          trusteeEmail: ""
      });     
    },
    deleteLeadsRow(index) {
      this.trusteeData.splice(index, 1);
    },
    addRowTodealBenefeciaryTable() {
    this.beneficiariesData.push({
      beneficiaryName: "",
      beneficiaryRelationshipwithInsured: "",
      beneficiaryPhone: "",
      beneficiaryEmail: ""
      });     
    },
    deletebeneficiariesData(index) {
      this.beneficiariesData.splice(index, 1);
    },
    nextStep() {
      this.$emit("next", { ...this.formData, dealOwnership: this.dealOwnership, beneficiaries: this.beneficiariesData, trustee: this.trusteeData });  
    },
    previousStep() {
      this.$emit("previous");
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
@media screen and (max-width:500px) {
  .space{
    margin-bottom:150px;
  }
}
</style>
