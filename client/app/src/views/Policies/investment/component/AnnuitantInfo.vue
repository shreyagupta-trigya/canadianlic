<template>
  <div style="margin-bottom:80px;">
    <h5 class="main-heading mb-0 ps-2">Investment Basket</h5>
    <div class="multisteps-form__content">
      <div class="row">
        <div style="width: 100%; overflow: scroll" class="mt-2">
          <table class="table border table-responsive subform">
            <thead class="table subform-table-head text-white">
              <tr>
                <th>#</th>
                <th>Action</th>
                <th>Date</th>
                <th>Type</th>
                <th>Fund Code</th>
                <th>%</th>
                <th>Contribution</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(parent, index) in InvestmentBasketData" :key="index">
                <td class="m-auto">{{ index + 1 }}</td>
                <td class="subform-action-center">
                  <a @click.prevent="
                    deleteInvestmentBasketTableRow(
                      index,
                      parent.ROWID
                    )
                    " href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product"><i
                      class="fas fa-trash text-secondary" aria-hidden="true"></i></a>
                </td>

                <td>
                  <div class="input-group bg-white" style="width: 200px;">
                    <flat-pickr v-model="parent.basketDate" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                      class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
                      ref="fpDateOfBirth" />
                    <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                      <i class="fa fa-calendar"></i>
                    </span>
                  </div>
                </td>

                <td>
                  <div style="width: 200px" class="choices" data-type="select-one" tabindex="0" role="listbox"
                    aria-haspopup="true" aria-expanded="false">
                    <div class="select-box">
                      <select v-model="parent.type" id="choices-state"
                        class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                        data-choice="active">
                        <option v-for="(option, index) in typeOptions" :key="index" :value="option"
                          :checked="option === '-None-'">{{ option }}</option>


                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <input style="width: 200px" v-model="parent.fundCode" type="text"
                    class="form-control form-control-default" isrequired="false" autocomplete="off" />
                </td>
                <td>
                  <input style="width: 200px" v-model="parent.invPercentage" type="number"
                    class="form-control form-control-default" isrequired="false" autocomplete="off" />
                </td>
                <td>
                  <input style="width: 200px" v-model="parent.contribution" type="number"
                    class="form-control form-control-default" isrequired="false" autocomplete="off" />
                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn mb-0 btn-color btn-md null null" type="button"
            @click.prevent="addRowToInvestmentBasketTable">
            Add Row
          </button>
        </div>
      </div>
    </div>
    <h5 class="main-heading mt-3 mb-0 ps-2">Annuitant Information</h5>
    <div class="multisteps-form__content">
      <div class="row ps-2">
        <div class="col-lg-6 col-sm-6 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Is the client the Annuitant?</label>
          <div class="">
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.isTheClientAnnuitent" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div>
        </div>
        <div v-if="formData.layout === 'RRSP'" class="col-6 col-sm-4 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Successor Annuitant / Co Applicant</label>
          <div class="">
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.successorAnnuitantCoApplicant" id="successorAnnuitantCoApplicant"
                  class="multisteps-form__select form-control choices__input" name="successorAnnuitantCoApplicant"
                  tabindex="-1" data-choice="active">
                  <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>


                </select>
              </div>
            </div>
          </div>
        </div>
        <div v-if="formData.layout === 'RESP'" class="col-6 col-sm-4 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Joint Subscriber</label>
          <div class="">
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.jointSubscriber" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Number of Annuitants</label>
          <input v-model="formData.numberOfAnnuitants" type="number" class="form-control form-control-default"
            isrequired="false" autocomplete="off" />
        </div>
        <div v-if="formData.layout === 'RRSP'" class="col-6 col-sm-4 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Name of Co Applicant
          </label>
          <input v-model="formData.nameofCoApplicant" type="text" class="form-control form-control-default"
            isrequired="false" autocomplete="off" />
        </div>
        <div class="col-lg-6 col-sm-6 mt-0 mt-sm-0">
          <label class="my-0 mt-2" for="phone">Phone</label>
          <!-- <input v-model="formData.phone" type="number" class="form-control form-control-default" isrequired="false"
            autocomplete="off" /> -->

          <VueTelInput v-model="formData.phone" :defaultCountry="'CA'" :preferredCountries="['CA', 'US', 'IN', 'GB']"
            :enableAutoCountrySelect="true" :mode="'international'" :inputOptions="{
              placeholder: '+1 (XXX) XXX-XXXX',
              inputmode: 'tel',
              maxlength: 16,            // '+' + 15 digits (E.164)
              onInput: handleTelInput   // live sanitize
            }" id="mobile" />
          <span v-if="errors.mobile" class="text-danger">{{ errors.mobile }}</span>

        </div>

        <div class="col-lg-6 col-sm-6 mt-0">
          <label class="my-0 mt-2">Gender</label>

          <div class="">
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.gender" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in genderOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6 mt-0">
          <label class="my-0 mt-2">Relationship to Primary Annuitant</label>
          <input v-model="formData.relationshipToPrimaryAnnuitment" type="text"
            class="form-control form-control-default" isrequired="false" autocomplete="off" />
        </div>

        <div v-show="formData.layout === 'RRSP'" class="col-6 col-sm-4 mt-0">
          <label class="my-0 mt-2">Primary Subscriber /Annuitant Name</label>
          <input v-model="formData.primarySubscriber" type="text" class="form-control form-control-default"
            isrequired="false" autocomplete="off" />
        </div>

        <div class="col-lg-6 col-sm-6 mt-0">
          <label class="my-0 mt-2">Applicant Gender</label>

          <div class="">
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.applicantGender" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in genderOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div>
        </div>
        <div v-if="formData.layout === 'RRSP'" class="col-6 col-sm-4 mt-0">
          <label class="my-0 mt-2">Is there a Co Applicant?</label>

          <div class="">
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.isThereCoapplicant" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 col-sm-6 mt-0">
          <label class="my-0 mt-2">Email</label>
          <input v-model="formData.email" type="email" class="form-control form-control-default" isrequired="false"
            autocomplete="off" />

          <label class="my-0 mt-2">Date of Birth</label>
          <!-- <input v-model="formData.dateOfBirth" type="date" class="form-control form-control-default" isrequired="false"
            autocomplete="off" /> -->

          <div class="input-group bg-white">
            <flat-pickr v-model="formData.dateOfBirth" :config="datePickerConfig" placeholder="DD/MM/YYYY"
              class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
              ref="fpDateOfBirth" />
            <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
              <i class="fa fa-calendar"></i>
            </span>
          </div>


        </div>

        <div class="col-lg-6 col-sm-6 mt-0">
          <label class="my-0 mt-2">Applicant DOB</label>

          <div class="input-group bg-white">
            <flat-pickr v-model="formData.applicantDOB" :config="datePickerConfig" placeholder="DD/MM/YYYY"
              class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
              ref="fpDateOfBirth" />
            <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
              <i class="fa fa-calendar"></i>
            </span>
          </div>
        </div>
        <div class="col-lg-6 col-sm-6 mt-0">
          <label class="my-0 mt-2">Name of Primary Annuitant</label>
          <input v-model="formData.nameOfPrimaryAnnuitment" type="text" class="form-control form-control-default"
            isrequired="false" autocomplete="off" />
        </div>
        <div v-if="formData.layout === 'TFSA'" class="col-12 col-sm-4 mt-0">
          <label class="my-0 mt-2">Address</label>
          <textarea v-model="formData.address" type="text" class="form-control form-control-default" isrequired="false"
            autocomplete="off" />
        </div>
        <div v-show="formData.layout === 'RESP'" class="col-4 col-sm-4 mt-2 mt-sm-0">
          <label class="my-0 mt-2">Spousal Contributor Replacing Subscriber</label>
          <div class="choices" data-type="select-one" tabindex="0" role="spousalContributorReplacingSubscriber"
            aria-haspopup="true" aria-expanded="false">
            <div class="select-box" :class="{
              highlight: errors.spousalContributorReplacingSubscriber,
            }">
              <select required v-model="formData.spousalContributorReplacingSubscriber"
                id="spousalContributorReplacingSubscriber" class="multisteps-form__select form-control choices__input"
                name="spousalContributorReplacingSubscriber" tabindex="-1" data-choice="active">
                <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                  :checked="option === '-None-'">{{ option }}</option>

              </select>
              <span v-if="errors.spousalContributorReplacingSubscriber" class="error input-error-font-size">
                {{ errors.spousalContributorReplacingSubscriber }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="formData.layout === 'RESP'" class="col-6 col-sm-4 mt-0 mt-sm-0 ">
          <label v-if="formData.layout === 'RESP'" class="my-0 mt-2">Is there a Joint/Replacing Subscriber?</label>
          <div v-if="formData.layout === 'RESP'" class="">
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.isThereAJointReplacingSubscriber" id="choices-state"
                  class="multisteps-form__select form-control choices__input" name="choices-state" tabindex="-1"
                  data-choice="active">
                  <option v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option"
                    :checked="option === '-None-'">{{ option }}</option>

                </select>
              </div>
            </div>
          </div>
        </div>
        <div v-if="formData.layout === 'RRSP'" class="col-lg-4 col-sm-4 mt-0 mt-sm-0">
          <label class="my-0 mt-2">Principal Occupation</label>

          <div class="">
            <input :class="{ highlight: errors.principalOccupation }" v-model="formData.principalOccupation"
              id="principalOccupation" type="text" class="form-control form-control-default" name="" isrequired="false"
              autocomplete="off" />
            <span v-if="errors.principalOccupation" class="error input-error-font-size">{{ errors.principalOccupation
            }}</span>
          </div>
        </div>
        <div v-if="formData.layout === 'RRSP'" class="col-12 col-sm-4 mt-0">
          <label class="my-0 mt-2">Address</label>
          <textarea v-model="formData.address" type="text" class="form-control form-control-default" isrequired="false"
            autocomplete="off" />
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
import { clientFirstPolicyOptions, typeOptions, genderOptions } from "../../utils/picklist.js";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
export default {
  components: { flatPickr, VueTelInput },
  props: {
    annuitantInfo: {
      type: Object,
      required: true
    }
  },
  watch: {
    annuitantInfo: {
      handler() {
        this.formData = { ...this.annuitantInfo };
        this.InvestmentBasketData = this.annuitantInfo.InvestmentBasketData || [];
      },
      deep: true,
      immediate: true,
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
      clientFirstPolicyOptions: { ...clientFirstPolicyOptions },
      typeOptions: { ...typeOptions },
      genderOptions: { ...genderOptions },
      InvestmentBasketData: [],
      errors: {},
      formData: { ...this.annuitantInfo },
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
    openDatePicker() {
      if (this.$refs.fpDateOfBirth && this.$refs.fpDateOfBirth.fp) {
        this.$refs.fpDateOfBirth.fp.open()
      }
    },



    addRowToInvestmentBasketTable() {
      this.InvestmentBasketData.push({
        contribution: '',
        invPercentage: '',
        fundCode: '',
        type: '',
        basketDate: '',
      });
    },
    deleteInvestmentBasketTableRow(index) {
      this.InvestmentBasketData.splice(index, 1);
    },
    nextStep() {
      this.$emit('next', { ...this.formData, InvestmentBasketData: this.InvestmentBasketData });
    },
    prevStep() {
      this.$emit('previous');
    },
  }
}
</script>