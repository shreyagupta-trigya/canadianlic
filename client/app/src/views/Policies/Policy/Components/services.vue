<template>
  <div class="card custom-card mb-4">
    <div class="card-body mb-4">
      <div class="card-surface">
        <h5 class="main-heading ps-2">Policy Ownership</h5>
        <div class="multisteps-form__content">
          <div class="row mt-2 ps-2">
            <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Is Client the Insured? </label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.isClientTheInsured" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Are there multiple Insured for this Policy?
              </label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.areThereMultipleInsured" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active" @change="handleMultipleInsuredChange">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div v-show="formData.areThereMultipleInsured === 'Yes'" class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0 mt-2">Number of Insured</label>
              <div class="">
                <input v-model="formData.numberOfInsured" type="number" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" @input="updateInsuredRows" min="0" />
              </div>
            </div>
            <div style="width: 100%; overflow: scroll" class="mt-4">
              <table class="table border table-responsive subform">
                <thead class="table subform-table-head text-white">
                  <tr>
                    <th>#</th>
                    <th>Action</th>
                    <th>Insured Name</th>
                    <th>Insured Date Of Birth</th>
                    <th>Insured Email</th>
                    <th>InsuredPhone</th>
                    <th>Relationship of Insured with client</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(parent, index) in OwnerShip" :key="index">
                    <td class="m-auto">{{ index + 1 }}</td>
                    <td class="subform-action-center">
                      <a @click.prevent="deleteInsuredClientTableRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                        <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                      </a>
                    </td>
                    <td>
                      <input style="width: 200px" v-model="parent.name" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <div style="width: 200px" class="input-group bg-white">
                        <flat-pickr v-model="parent.dob" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                          class="form-control form-control-default" :required="false" autocomplete="off"
                          id="dateOfBirth" ref="fpDateOfBirth" />
                        <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                          <i class="fa fa-calendar"></i>
                        </span>
                      </div>
                    </td>
                    <td>
                      <input style="width: 300px" v-model="parent.email" type="email"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <VueTelInput style="width: 200px" v-model="parent.phone" :defaultCountry="'CA'"
                        :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true"
                        :mode="'international'" :inputOptions="{
                          placeholder: '+1 (XXX) XXX-XXXX',
                          inputmode: 'numeric',
                          maxlength: 15,
                          onInput: handleTelInput
                        }" />
                      <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
                    </td>
                    <td>
                      <div style="width: 200px" class="choices" data-type="select-one" tabindex="0" role="listbox"
                        aria-haspopup="true" aria-expanded="false">
                        <div class="select-box">
                          <select v-model="parent.relationship" id="choices-state"
                            class="multisteps-form__select form-control choices__input" name="choices-state"
                            tabindex="-1" data-choice="active">
                            <option v-for="(option, index) in relationOptionsSubform" :key="index">
                              {{ option }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="btn mb-0 btn-color btn-md null null" type="button"
                @click.prevent="addRowToInsuredClientTable">
                Add Row
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-surface mt-3">
        <h5 class="main-heading mt-4 ps-2">Policy Beneficiaries</h5>
        <div class="multisteps-form__content">
          <div class="row mt-2 ps-2">
             <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Is Client A Beneficiary</label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.isClientABeneficiary" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0" v-if="formData.isClientABeneficiary !== 'No'">
              <label class="my-0">Are there Multiple Beneficiaries excl. Client ?
              </label>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                aria-expanded="false">
                <div class="select-box">
                  <select v-model="formData.areThereMultipleBeneficiary" id="choices-state"
                    class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                    data-choice="active" @change="handleMultipleBeneficiaryChange">
                    <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                      :checked="option === '-None-'">{{ option }}</option>
                  </select>
                </div>
              </div>
            </div>
           
            <div v-show="formData.areThereMultipleBeneficiary == 'Yes'"  class="col-lg-6 col-sm-6 mt-2 mt-sm-0" v-if="formData.isClientABeneficiary !== 'No'">
              <label class="my-0">Number of Beneficiaries</label>
              <div class="">
                <input :class="{ highlight: errors.numberofBeneficiaries }" v-model="formData.numberofBeneficiaries"
                  id="referralname" type="number" class="form-control form-control-default" name="" isrequired="false"
                  autocomplete="off" @input="updateBeneficiaryRows" min="0" />
                <span v-if="errors.numberofBeneficiaries" class="error input-error-font-size">{{
                  errors.numberofBeneficiaries }}</span>
              </div>
            </div>
            <div v-if="formData.layout === 'Life Policies'" class="col-6 col-sm-4 mt-2 mt-sm-0">
              <label class="my-0">Policy Attachment Link</label>
              <div class="">
                <input :class="{ highlight: errors.policyAttachmentLink }" v-model="formData.policyAttachmentLink"
                  id="policyAttachmentLink" type="url" class="form-control form-control-default" name=""
                  isrequired="false" autocomplete="off" />
                <span v-if="errors.policyAttachmentLink" class="error input-error-font-size">{{
                  errors.policyAttachmentLink
                }}</span>
              </div>
            </div>
            <div style="width: 100%; overflow: scroll" class="mt-4">
              <table class="table border table-responsive subform">
                <thead class="table subform-table-head text-white">
                  <tr>
                    <th>#</th>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Life Beneficiary Name</th>
                    <th>Date Of Birth</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Realtionship</th>
                    <th v-if="formData.layout === 'Life Policies'">Beneficiary %</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(parent, index) in Beneficiary" :key="index">
                    <td class="m-auto">{{ index + 1 }}</td>
                    <td class="subform-action-center">
                      <a @click.prevent="deletePolicyBeneficiaryTableRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                        <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                      </a>
                    </td>
                    <td>
                      <input style="width: 200px" v-model="parent.name" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <input style="width: 200px" v-model="parent.lifeBeneficiaryName" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <div class="input-group bg-white">
                        <flat-pickr v-model="parent.dob" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                          class="form-control form-control-default" :required="false" autocomplete="off"
                          id="dateOfBirth" ref="fpDateOfBirth" />
                        <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                          <i class="fa fa-calendar"></i>
                        </span>
                      </div>
                    </td>
                    <td>
                      <input style="width: 300px" v-model="parent.email" type="email"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <VueTelInput style="width: 200px" v-model="parent.phone" :defaultCountry="'CA'"
                        :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true"
                        :mode="'international'" :inputOptions="{
                          placeholder: '+1 (XXX) XXX-XXXX',
                          inputmode: 'numeric',
                          maxlength: 15,
                          onInput: handleTelInput
                        }" />
                      <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
                    </td>
                    <td>
                      <div style="width: 200px" class="choices" data-type="select-one" tabindex="0" role="listbox"
                        aria-haspopup="true" aria-expanded="false">
                        <div class="select-box">
                          <select v-model="parent.relationship" id="choices-state"
                            class="multisteps-form__select form-control choices__input" name="choices-state"
                            tabindex="-1" data-choice="active">
                            <option>-NONE-</option>
                            <option v-for="(option, index) in relationOptionsSubform" :key="index">
                              {{ option }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </td>
                    <td v-if="formData.layout === 'Life Policies'">
                      <input style="width: 200px" v-model="parent.beneficiaryPercent" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="btn mb-0 btn-color btn-md null null" type="button"
                @click.prevent="addRowToPolicyBeneficiaryTable">
                Add Row
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-surface mt-3">
        <h5 class="main-heading mt-4 ps-2">Contingent Beneficiary</h5>
        <div class="multisteps-form__content">
          <div class="row mt-2 ps-2">
            <div style="width: 100%; overflow: scroll">
              <table class="table border table-responsive subform">
                <thead class="table subform-table-head text-white">
                  <tr>
                    <th>#</th>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Date Of Birth</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Cont-Beneficiary %</th>
                    <th>Realtionship</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(parent, index) in ContingentBeneficiary" :key="index">
                    <td class="m-auto">{{ index + 1 }}</td>
                    <td class="subform-action-center">
                      <a @click.prevent="deleteContingentBeneficiaryTableRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                        <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                      </a>
                    </td>
                    <td>
                      <input style="width: 200px" v-model="parent.name" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <div class="input-group bg-white">
                        <flat-pickr v-model="parent.dob" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                          class="form-control form-control-default" :required="false" autocomplete="off"
                          id="dateOfBirth" ref="fpDateOfBirth" />
                        <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                          <i class="fa fa-calendar"></i>
                        </span>
                      </div>
                    </td>
                    <td>
                      <input style="width: 300px" v-model="parent.email" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <VueTelInput style="width: 200px" v-model="parent.phone" :defaultCountry="'CA'"
                        :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true"
                        :mode="'international'" :inputOptions="{
                          placeholder: '+1 (XXX) XXX-XXXX',
                          inputmode: 'numeric',
                          maxlength: 15,
                          onInput: handleTelInput
                        }" />
                      <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
                    </td>
                    <td>
                      <input style="width: 200px" v-model="parent.beneficiaryPercent" type="number"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <div style="width: 200px" class="choices" data-type="select-one" tabindex="0" role="listbox"
                        aria-haspopup="true" aria-expanded="false">
                        <div class="select-box">
                          <select v-model="parent.relationship" id="choices-state"
                            class="multisteps-form__select form-control choices__input" name="choices-state"
                            tabindex="-1" data-choice="active">
                            <option>-NONE-</option>
                            <option v-for="(option, index) in relationOptionsSubform" :key="index">
                              {{ option }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="btn mb-0 btn-color btn-md null null" type="button"
                @click.prevent="addRowToContingentBeneficiaryTable">
                Add Row
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-surface mt-3">
        <h5 class="main-heading mt-4 ps-2">Policy Trustees</h5>
        <div class="multisteps-form__content">
          <div class="row mt-2 ps-2">
            <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Are there Trustees for this Policy?
              </label>
              <div class="">
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                  aria-expanded="false">
                  <div class="select-box">
                    <select v-model="formData.areThereTrusteeForThisPolicy" id="choices-state"
                      class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                      data-choice="active" @change="handleTrusteeChange">
                      <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                        :checked="option === '-None-'">{{ option }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-6 mt-2 mt-sm-0">
              <label class="my-0">Application On</label>
              <div class="input-group  bg-white">
                <flat-pickr v-model="formData.dateOfBirth" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                  ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
            </div>

            <div v-show="formData.areThereTrusteeForThisPolicy == 'Yes'" class="row col-12 mt-2">
              <div class="col-6 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Trust Dissolution Date</label>
                <div class="input-group" style="width: 200px;">
                  <flat-pickr v-model="formData.trustDissolutionDate" :config="datePickerConfig"
                    placeholder="DD/MM/YYYY" class="form-control form-control-default" :required="true"
                    autocomplete="off" id="dateOfBirth" ref="fpDateOfBirth" />
                  <span class="input-group-text" @click="openDatePicker">
                    <i class="fa fa-calendar"></i>
                  </span>
                </div>
              </div>

              <div class="col-6 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Trust Documents Received and Uploaded ?</label>
                <div class="">
                  <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                      <select v-model="formData.trustDocumentRecievedAndUploaded" id="choices-state"
                        class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                        data-choice="active">
                        <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                          :checked="option === '-None-'">{{ option }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Number Of Trustee</label>
                <input v-model="formData.numberOfTrustee" type="number" class="form-control form-control-default"
                  isrequired="false" autocomplete="off" @input="updateTrusteeRows" min="0" />
              </div>
            </div>

            <div v-show="formData.numberOfTrustee >= 1" style="width: 100%; overflow: scroll" class="mt-4 mb-2">
              <table class="table border table-responsive subform">
                <thead class="table subform-table-head text-white">
                  <tr>
                    <th>#</th>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Relationship</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(parent, index) in Trustee" :key="index">
                    <td class="m-auto">{{ index + 1 }}</td>
                    <td class="subform-action-center">
                      <a @click.prevent="deletePolicyTrusteeTableRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                        <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                      </a>
                    </td>
                    <td>
                      <input style="width: 200px" v-model="parent.name" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <input style="width: 200px" v-model="parent.email" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                    </td>
                    <td>
                      <input style="width: 200px" v-model="parent.phone" type="text"
                        class="form-control form-control-default" isrequired="false" autocomplete="off" />
                      </td>
                    <td>
                      <div style="width: 200px" class="choices" data-type="select-one" tabindex="0" role="listbox"
                        aria-haspopup="true" aria-expanded="false">
                        <div class="select-box">
                          <select v-model="parent.relationship" id="choices-state"
                            class="multisteps-form__select form-control choices__input" name="choices-state"
                            tabindex="-1" data-choice="active">
                            <option>-NONE-</option>
                            <option v-for="(option, index) in relationOptionsSubform" :key="index">
                              {{ option }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="btn mb-0 btn-color btn-md null null" type="button"
                @click.prevent="addRowToPolicyTrusteeTable">
                Add Row
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
        <button class="btn mb-1 bg-gradient-light btn-md null null js-btn-prev" type="button" @click="prevStep">
          Prev
        </button>
        <button class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next" type="button"
          @click.prevent="nextStep">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { clientFirstPolicyOptions, relationOptionsSubform } from "../../utils/picklist";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'

export default {
  components: { flatPickr, VueTelInput },
  props: {
    services: {
      type: Object,
      required: true
    }
  },
  watch: {
    services: {
      handler() {
        this.formData = { ...this.services }
        this.OwnerShip = this.services.OwnerShip || [];
        this.Beneficiary = this.services.Beneficiary || [];
        this.ContingentBeneficiary = this.services.ContingentBeneficiary || [];
        this.Trustee = this.services.Trustee || [];
      },
      immediate: true,
      deep: true,
    }
  },
  data() {
    return {
      datePickerConfig: {
        dateFormat: "d/m/Y",
        allowInput: true
      },
      dateTimePickerConfig: {
        dateFormat: "d/m/Y H:i",
        allowInput: true,
        enableTime: true,
        time_24hr: true
      },
      OwnerShip: [],
      Beneficiary: [],
      ContingentBeneficiary: [],
      Trustee: [],
      formData: { ...this.services },
      clientFirstPolicyOptions: { ...clientFirstPolicyOptions },
      relationOptionsSubform: { ...relationOptionsSubform },
      errors: {},
    }
  },
  methods: {
    handleTelInput(e) {
      const raw = e?.target?.value ?? '';
      let cleaned = raw.replace(/(?!^)\+/g, '');
      cleaned = cleaned.replace(/[^+\d]/g, '');
      const plus = cleaned.startsWith('+') ? '+' : '';
      const digits = cleaned.replace(/\D/g, '').slice(0, 15);
      cleaned = plus + digits;
      e.target.value = cleaned;
      this.formData.mobile = cleaned;
      if (this.errors.mobile) delete this.errors.mobile;
    },

    // Auto row generation methods
    updateInsuredRows() {
      const targetCount = parseInt(this.formData.numberOfInsured) || 0;
      this.adjustRowCount(this.OwnerShip, targetCount, () => ({
        name: "",
        email: "",
        dob: "",
        phone: "",
        relationship: "",
      }));
    },

    updateBeneficiaryRows() {
      const targetCount = parseInt(this.formData.numberofBeneficiaries) || 0;
      this.adjustRowCount(this.Beneficiary, targetCount, () => ({
        name: "",
        email: "",
        dob: "",
        phone: "",
        lifeBeneficiaryName: "",
        relationship: "",
        beneficiaryPercent: ""
      }));
    },

    updateTrusteeRows() {
      const targetCount = parseInt(this.formData.numberOfTrustee) || 0;
      this.adjustRowCount(this.Trustee, targetCount, () => ({
        name: "",
        email: "",
        phone: "",
        relationship: "",
      }));
    },

    // Generic method to adjust row count
    adjustRowCount(array, targetCount, createRowCallback) {
      const currentCount = array.length;
      
      if (targetCount > currentCount) {
        // Add rows
        for (let i = currentCount; i < targetCount; i++) {
          array.push(createRowCallback());
        }
      } else if (targetCount < currentCount) {
        // Remove rows from the end
        array.splice(targetCount, currentCount - targetCount);
      }
    },

    // Handle dropdown changes
    handleMultipleInsuredChange() {
      if (this.formData.areThereMultipleInsured !== 'Yes') {
        this.formData.numberOfInsured = 0;
        this.OwnerShip = [];
      }
    },

    handleMultipleBeneficiaryChange() {
      if (this.formData.areThereMultipleBeneficiary !== 'Yes') {
        this.formData.numberofBeneficiaries = 0;
        this.Beneficiary = [];
      }
    },

    handleTrusteeChange() {
      if (this.formData.areThereTrusteeForThisPolicy !== 'Yes') {
        this.formData.numberOfTrustee = 0;
        this.Trustee = [];
      }
    },

    // Original methods (kept for manual row addition)
    addRowToPolicyTrusteeTable() {
      this.Trustee.push({
        name: "",
        email: "",
        phone: "",
        relationship: "",
      });
      this.formData.numberOfTrustee = this.Trustee.length;
    },

    deletePolicyTrusteeTableRow(index) {
      this.Trustee.splice(index, 1);
      this.formData.numberOfTrustee = this.Trustee.length;
    },

    addRowToInsuredClientTable() {
      this.OwnerShip.push({
        name: "",
        email: "",
        dob: "",
        phone: "",
        relationship: "",
      });
      this.formData.numberOfInsured = this.OwnerShip.length;
    },

    deleteInsuredClientTableRow(index) {
      this.OwnerShip.splice(index, 1);
      this.formData.numberOfInsured = this.OwnerShip.length;
    },

    addRowToPolicyBeneficiaryTable() {
      this.Beneficiary.push({
        name: "",
        email: "",
        dob: "",
        phone: "",
        lifeBeneficiaryName: "",
        relationship: "",
        beneficiaryPercent: ""
      });
      this.formData.numberofBeneficiaries = this.Beneficiary.length;
    },

    deletePolicyBeneficiaryTableRow(index) {
      this.Beneficiary.splice(index, 1);
      this.formData.numberofBeneficiaries = this.Beneficiary.length;
    },

    addRowToContingentBeneficiaryTable() {
      this.ContingentBeneficiary.push({
        name: "",
        email: "",
        dob: "",
        phone: "",
        beneficiaryPercent: "",
        relationship: ""
      });
    },

    deleteContingentBeneficiaryTableRow(index) {
      this.ContingentBeneficiary.splice(index, 1);
    },

    nextStep() {
      this.$emit('next', { 
        ...this.formData, 
        OwnerShip: this.OwnerShip, 
        Beneficiary: this.Beneficiary, 
        ContingentBeneficiary: this.ContingentBeneficiary, 
        Trustee: this.Trustee 
      });
    },

    prevStep() {
      this.$emit('previous');
    },

    openDatePicker() {
      if (this.$refs.fpDateOfBirth && this.$refs.fpDateOfBirth.fp) {
        this.$refs.fpDateOfBirth.fp.open()
      }
    }
  }
}
</script>

<style>
@media screen and (max-width:500px) {
  .space {
    margin-bottom: 150px;
  }
}

.subform-action-center {
  text-align: center;
  vertical-align: middle;
}

.btn-color {
  background-color: #8AAEE0;
  color: white;
  border: none;
}

.btn-color:hover {
  background-color: #6a94d4;
  color: white;
}

.subform-table-head {
  background-color: #8AAEE0;
}

.highlight {
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.input-error-font-size {
  font-size: 0.875rem;
}
</style>