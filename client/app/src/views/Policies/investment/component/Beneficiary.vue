<template>
    <div style="margin-bottom:80px;">
        <h5 class="main-heading mt-2 ps-2">Deal Beneficiaries</h5>
        <div class="row mb-2 ps-2">
            <div class="col-lg-4 col-sm-6 mt-2 mt-md-4 mt-sm-0">
                <label class="my-0">Is Client a Beneficiary?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                        <select v-model="formData.isClientABeneficiary"
                            class="multisteps-form__select form-control choices__input" name="choices-state">
                            <option v-for="(option, index) in isClientaBeneficiary" :key="index" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6 mt-2 mt-md-4  mt-sm-0">
                <label class="my-0">Are there Multiple Beneficiaries ?</label>
                <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                        <select v-model="formData.arethereMultipleBeneficiaries"
                            class="multisteps-form__select form-control choices__input" name="choices-state">
                            <option v-for="(option, index) in isClientaBeneficiary" :key="index" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6 mt-2 mt-md-4 mt-sm-0">
                <label class="my-0">Beneficiary Gender</label>
                <div class="select-box">
                    <select v-model="formData.beneficiaryGender" class="form-control">
                        <option value="" disabled selected>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unkown">Unkown</option>
                    </select>
                </div>
            </div>
            <div v-if="formData.layout === 'RRSP'" class="col-4 col-sm-4 mt-2 mt-sm-0">
                <label class="my-0">Beneficiary Type</label>
                <div class="select-box">
                    <select v-model="formData.beneficiaryType" class="form-control">
                        <option value="" disabled selected>Beneficiary Type</option>
                        <option value="None">None</option>
                        <option value="Revocable">Revocable</option>
                        <option value="Irrevocable">Irrevocable</option>
                    </select>
                </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 mt-md-4">
                <label class="my-0">Number of Beneficiaries</label>
                <input v-model="formData.numberofBeneficiaries" type="text" class="form-control form-control-default" />
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mt-lg-4">
                <label class="my-0">Relation to Primary Annuitant</label>
                <input v-model="formData.relationtoPrimaryAnnuitant" type="text"
                    class="form-control form-control-default" />
            </div>
        </div>
        <div style="width: 100%; overflow: scroll">
            <table class="table border table-responsive subform">
                <thead class="table subform-table-head text-white">
                    <tr>
                        <th>#</th>
                        <th>Actions</th>
                        <th>Beneficiary Name</th>
                        <th>Relationship to Primary Beneficiary</th>
                        <th>Beneficiary Phone</th>
                        <th>Beneficiary Email</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(beneficiary, index) in Beneficiary" :key="index">
                        <td class="m-auto">{{ index + 1 }}</td>
                        <td>
                            <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip"
                                data-bs-original-title="Delete product">
                                <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                            </a>
                        </td>
                        <td>
                            <input v-model="beneficiary.name" type="text" class="form-control form-control-default"
                                autocomplete="off">
                        </td>
                        <td>
                            <input v-model="beneficiary.relationship" type="text"
                                class="form-control form-control-default" autocomplete="off">
                        </td>
                        <td>
                            <!-- <input v-model="beneficiary.phone" type="tel" class="form-control form-control-default"
                                autocomplete="off" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"> -->

                            <VueTelInput v-model="beneficiary.phone"  :defaultCountry="'CA'"
                                :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true"
                                :mode="'international'" :inputOptions="{
                                    placeholder: '+1 (XXX) XXX-XXXX',
                                    inputmode: 'tel',
                                    maxlength: 16,            // '+' + 15 digits (E.164)
                                    onInput: handleTelInput   // live sanitize
                                }" id="mobile" />
                            <span v-if="errors.mobile" class="text-danger">{{ errors.mobile }}</span>

                        </td>
                        <td>
                            <input v-model="beneficiary.email" type="email" class="form-control form-control-default"
                                autocomplete="off">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowTodealbeneficiaryTable">
            Add Row
        </button>

        <div class="button-row d-flex justify-content-center mt-4 gap-4">
            <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button"
                @click="prevStep">Prev</button>
            <button v-if="!id" class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" type="button"
                @click.prevent="nextStep">
                Submit
            </button>
        </div>
    </div>
</template>
<style></style>
<script>
import { clientFirstPolicyOptions } from "../../utils/picklist";
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
export default {
    components: {
    VueTelInput
  },

    props: {
        services: {
            type: Object,
            required: true
        }
    },
    watch: {
        services: {
            handler() {
                this.formData = { ...this.services };
                this.isClientaBeneficiary = { ...clientFirstPolicyOptions };
                this.Beneficiary = this.services.Beneficiary || [];

            },
            deep: true,
            immediate: true,
        }
    },
    data() {
        return {
            Beneficiary: [],
            errors: {},
            formData: { ...this.services }
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
    nextStep() {
  this.errors = validateMandatoryFields(this.formData, mandatory);

  const mobile = (this.formData.mobile || "").replace(/\s|-/g, "");
  
  if (mobile) {
    if (!mobile.startsWith("+")) {
      this.errors.mobile = "Country code is required (e.g. +1...)";
    } else if (/^\+1/.test(mobile) && !/^\+1\d{10}$/.test(mobile)) {
      this.errors.mobile = "Canadian number must be +1 followed by 10 digits";
    } else if (!/^\+\d{8,15}$/.test(mobile)) {
      this.errors.mobile = "Phone must be in international format (e.g. +1234567890)";
    }
  }
},

        addRowTodealbeneficiaryTable() {
            this.Beneficiary.push({
                email: '',
                phone: '',
                relationship: '',
                name: '',
            });
        },
        deleteLeadsRow(index) {
            this.Beneficiary.splice(index, 1);
        },
        nextStep() {
            this.$emit('next', { ...this.formData, Beneficiary: this.Beneficiary });
        },
        prevStep() {
            this.$emit('previous', { ...this.formData, Beneficiary: this.Beneficiary });
        },
    }
}
</script>