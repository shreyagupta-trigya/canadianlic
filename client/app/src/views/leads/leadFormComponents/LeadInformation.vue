<template>
  <div>
    <!-- Personal Details -->
    <h5 class="main-heading mt-2 mb-0 ps-2">Personal Details</h5>
    <div class="card custom-card mb-4">
      <div class="card-body mb-5">
        <div class="card-surface">
          <div class="row g-3">
            <div class="col-lg-4 col-md-4 col-sm-12">
              <label class="mb-0 mt-2" for="insuranceLeadOwner">Insurance Lead Owner <span
                  class="text-danger">*</span></label>
              <SingleSlelect class="form-select " id="insuranceLeadOwner" v-model="formData.insuranceLeadOwner"
                :options="owners" />
              <span v-if="errors.insuranceLeadOwner" class="text-danger">{{
                errors.insuranceLeadOwner
              }}</span>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
              <label class="mb-0 mt-2" for="insuranceLeadSource">Insurance Lead Source</label>
              <select class="form-select" id="insuranceLeadSource" v-model="formData.insuranceLeadSource">
                <option v-for="(option, index) in insuranceLeadSourceOptions" :key="index" :value="option"
                  :checked="option === '-None-'">{{ option }}</option>
              </select>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-12">
              <label class="mb-0 mt-2" for="assignedAdvisor">Assigned Advisor</label>
              <select class="form-select" id="assignedAdvisorOwner" v-model="formData.assignedAdvisor">
                <option value="" disabled selected class="text-muted">Select Owner</option>
                <option v-for="(advioser, index) in adviosers" :key="index" :value="advioser.ROWID">
                  {{ advioser.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body mb-5">
        <div class="card-surface">
          <div class="row g-3">
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="firstName">First Name</label>
              <input type="text" v-titleCase id="firstName" v-model="formData.firstName" class="form-control" />
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="lastName">Last Name <span class="text-danger">*</span></label>
              <input type="text" v-titleCase id="lastName" v-model="formData.lastName" class="form-control" />
              <span v-if="errors.lastName" class="text-danger">{{
                errors.lastName
              }}</span>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="dateOfBirth">Date of Birth</label>
              <div class="input-group">
                <flat-pickr v-model="formData.dateOfBirth" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control" id="dateOfBirth" ref="fpDateOfBirth" />
                <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
              <span v-if="errors.dateOfBirth" class="text-danger">{{ errors.dateOfBirth }}</span>
            </div>


            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="gender">Gender</label>
              <select id="gender" v-model="formData.gender" class="form-select">
                <option v-for="(option, index) in genderOption" :key="index" :value="option"
                  :checked="option === '-None-'">
                  {{
                    option }}</option>
              </select>
            </div>
            <!-- Row 3: Contact Information -->
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="email">Email</label>
              <input type="email" id="email" v-model="formData.email" class="form-control" />
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="mobile">Mobile</label>
              <VueTelInput v-model="formData.mobile" :defaultCountry="'CA'"
                :preferredCountries="['CA', 'US', 'IN', 'GB']" :enableAutoCountrySelect="true" :mode="'international'"
                :inputOptions="{
                  placeholder: '+1 (XXX) XXX-XXXX',
                  inputmode: 'tel',
                  maxlength: 16,            // '+' + 15 digits (E.164)
                  onInput: handleTelInput   // live sanitize
                }" id="mobile" />
              <span v-if="errors.mobile" class="text-danger">{{ errors.mobile }}</span>

            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="whatsapp">WhatsApp</label>
              <input type="number" id="whatsapp" v-model="formData.whatsapp" class="form-control" />
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2">Additional Contact Information? </label>
              <select class="form-select" v-model="formData.additionalContactInformation">
                <option v-for="(option, index) in additionalContactInformationOption" :key="index" :value="option"
                  :checked="option === '-None-'">{{ option }}</option>
              </select>
            </div>

            <div class="card p-1 text-dark bg-light mb-3 mt-0"
              v-if="formData.additionalContactInformation === 'Available'">
              <div class="card-body row p-1 mt-0">
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2" for="phoneNumber">Phone Number</label>
                  <input type="number" id="phoneNumber" v-model="formData.phoneNumber" class="form-control"
                    placeholder="Enter phone number" />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2" for="addEmail1">Add Email1</label>
                  <input type="email" id="addEmail1" v-model="formData.addEmail1" class="form-control" />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2" for="fax">Fax</label>
                  <input type="text" v-titleCase id="fax" v-model="formData.fax" class="form-control"
                    placeholder="Enter fax number" />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <label class="mb-0 mt-2" for="otherContact">Other</label>
                  <input type="text" v-titleCase id="otherContact" v-model="formData.otherContact" class="form-control"
                    placeholder="Enter other contact info" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body mb-5">
        <div class="card-surface">
          <div class="row g-3">
            <!-- Status -->
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="insuranceLeadStatus">Insurance Lead Status</label>
              <SelectColorCode v-model="formData.insuranceLeadStatus" :options="insuranceLeadStatusOptions" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="leadStatusStage">Lead Status Stage</label>
              <SelectColorCode v-model="formData.leadStatusStage" :options="leadStatusStageOption" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="citizenshipStatus">Citizenship Status</label>
              <select class="form-select" id="citizenshipStatus" v-model="formData.citizenshipStatus">
                <option v-for="(option, index) in citizenshipStatusOption" :key="index" :value="option">{{ option }}
                </option>
              </select>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="locationName">Location Name</label>
              <!-- <input type="text" v-titleCase id="locationName" v-model="formData.locationName" class="form-control" /> -->
              <select class="form-select" id="locationNameOwner" v-model="formData.locationName">
                <option value="" selected class="text-muted">Select Owner</option>
                <option v-for="(location, index) in location" :key="index" :value="location.ROWID">
                  {{ location.name }}
                </option>
              </select>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="preferredContactTime">Preferred Contact Time</label>

              <select class="form-select" id="netWorth" v-model="formData.preferredContactTime">
                <option v-for="(option, index) in preferredContactTimeOption" :key="index" :value="option">{{ option }}
                </option>
              </select>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="preferredContactMethod">Preferred Contact Method</label>
              <!-- <input type="text" v-titleCase id="preferredContactMethod" v-model="formData.preferredContactMethod" class="form-control" /> -->
              <select class="form-select" id="preferredContactMethod" v-model="formData.preferredContactMethod">
                <option v-for="(option, index) in preferredContactMethodOption" :key="index" :value="option">{{ option
                }}
                </option>
              </select>
            </div>

            <!-- NEED TO CHECK SOCIL MEDIA INFORMATION -->
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="Social-Media-Information">Social Media Information?</label>
              <select class="form-select" id="Social-Media-Information" v-model="formData.socialMediaInformation">
                <option>-None-</option>
                <option>Available</option>
                <option>Unavailable</option>
              </select>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2">Old Database Lead?</label>
              <select class="form-select" v-model="formData.oldDatabaseLead">
                <option v-for="(option, index) in objectives" :key="index" :value="option"
                  :checked="option === '-None-'">{{
                    option }}</option>

              </select>
            </div>

          </div>

        </div>
      </div>
      <div class="card-body mb-5">
        <div class="card-surface">
          <div class="row g-3">

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="currency">Currency</label>
              <select v-model="formData.currency" class="form-select">
                <option v-for="(option, index) in currency" :key="index" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="Exchange">Exchange Rate</label>
              <input type="number" id="Exchange" v-model="formData.exchangeRate" class="form-control" />
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="netWorth">Net Worth</label>
              <select class="form-select" id="netWorth" v-model="formData.netWorth">
                <option value="" selected class="text-muted">Net Worth</option>
                <option v-for="(option, index) in netWorth" :key="index" :value="option" :checked="option === '-None-'">
                  {{
                    option }}</option>
              </select>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="isThisaReassignment">Is This a Reassignment?</label>
              <select class="form-select" id="isThisaReassignment" v-model="formData.isThisaReassignment">
                <option v-for="(option, index) in objectives" :key="index" :value="option"
                  :checked="option === '-None-'">{{
                    option }}</option>
              </select>
            </div>


            <div class="col-lg-4 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="understandingOfInsurance">Understanding of Insurance</label>
              <select class="form-select" id="understandingOfInsurance" v-model="formData.understandingOfInsurance">
                <option v-for="(option, index) in understandingOfInsuranceOption" :key="index" :value="option">{{ option
                }}
                </option>

              </select>
            </div>
            <div class="col-lg-4 col-md-3 col-sm-12">
              <label class="mb-0 mt-2">Existing Insurance Policy?</label>
              <select class="form-select" v-model="formData.existingInsurancePolicy">
                <option v-for="(option, index) in objectives" :key="index" :value="option"
                  :checked="option === '-None-'">{{
                    option }}</option>

              </select>
            </div>
            <div class="col-lg-4 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="policyRenewal">Existing Policy Renewal Due By</label>
              <div class="input-group">
                <flat-pickr v-model="formData.existingPolicyRenewalDueBy" :config="datePickerConfig"
                  placeholder="DD/MM/YYYY" class="form-control" />
              </div>
            </div>


            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2">Do you own a home in Canada? </label>
              <select class="form-select" v-model="formData.doYouOwnaHomeInCanada">
                <option v-for="(option, index) in objectives" :key="index" :value="option"
                  :checked="option === '-None-'">{{
                    option }}</option>

              </select>
            </div>


            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="coverageLooking">Coverage you are Looking for?</label>
              <input type="text" v-titleCase id="coverageLooking" v-model="formData.coverageLookingFor"
                class="form-control" />
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2">Do you have life insurance? </label>
              <select class="form-select" v-model="formData.doYouhaveLifeInsurance">
                <option v-for="(option, index) in objectives" :key="index" :value="option"
                  :checked="option === '-None-'">{{
                    option }}</option>

              </select>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="genderPrediction">Gender Prediction</label>
              <select class="form-select" id="genderPrediction" v-model="formData.genderPrediction">
                <option v-for="(objective, index) in objectives" :key="index" :value="objective">
                  {{ objective }}
                </option>
              </select>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="leadCreatedOn">Lead Created On</label>
              <!-- <input type="date" id="leadCreatedOn" v-model="formData.leadCreatedOn" class="form-control" /> -->
              <div class="input-group">
                <flat-pickr v-model="formData.leadCreatedOn" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control" id="leadCreatedOn" ref="fpLeadCreatedOn" />
                <span class="input-group-text" @click="$refs.fpLeadCreatedOn.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
              <span v-if="errors.leadCreatedOn" class="text-danger">{{ errors.leadCreatedOn }}</span>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="submitPageURL">Submit Page URL</label>
              <input type="text" id="submitPageURL" v-model="formData.submitPageURL" class="form-control" />
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="inboxURL">Inbox URL</label>
              <input type="text" id="inboxURL" v-model="formData.inboxURL" class="form-control" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="roundRobinAssignmentTime">Round Robin Assignment Time</label>
              <!-- <input type="datetime-local" id="roundRobinAssignmentTime" v-model="formData.roundRobinAssignmentTime"
          class="form-control" /> -->
              <div class="input-group">
                <flat-pickr v-model="formData.roundRobinAssignmentTime" :config="dateTimePickerConfig"
                  placeholder="DD/MM/YYYY HH:mm" class="form-control" id="roundRobinAssignmentTime"
                  ref="fpRoundRobinAssignmentTime" />
                <span class="input-group-text" @click="$refs.fpRoundRobinAssignmentTime.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
              <span v-if="errors.roundRobinAssignmentTime" class="text-danger">{{ errors.roundRobinAssignmentTime
              }}</span>

            </div>

          </div>
        </div>
      </div>
      <div class="card-body mb-5">
        <div class="card-surface">
          <div class="row g-3">
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="dateOfBirth">Date of Birth 1</label>

              <div class="input-group">
                <flat-pickr v-model="formData.dateOfBirth1" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control" id="dateOfBirth1" ref="fp1" />
                <span class="input-group-text" @click="$refs.fp1.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
              <span v-if="errors.dateOfBirth" class="text-danger">{{ errors.dateOfBirth }}</span>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="childAge">Child Age</label>
              <input type="text" v-titleCase id="childAge" v-model="formData.childAge" class="form-control" />
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="howMuchYouLikeToStartThePlan">How Much You Like to Start the Plan?</label>
              <input type="text" v-titleCase id="howMuchYouLikeToStartThePlan"
                v-model="formData.howMuchYouLikeToStartThePlan" class="form-control" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="howMuchAmountWantToStartWith">How Much Amount Want to Start With</label>
              <input type="number" id="howMuchAmountWantToStartWith" v-model="formData.howMuchAmountWantToStartWith"
                class="form-control" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="leadID">Lead ID</label>
              <input type="text" v-titleCase id="leadID" v-model="formData.leadID" class="form-control" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="startDateOfCoverage">Start Date of Coverage</label>
              <!-- <input type="date" id="startDateOfCoverage" v-model="formData.startDateOfCoverage" class="form-control" /> -->
              <div class="input-group">
                <flat-pickr v-model="formData.startDateOfCoverage" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control" id="startDateOfCoverage" ref="fpCoverage" />
                <span class="input-group-text" @click="$refs.fpCoverage.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
              <span v-if="errors.startDateOfCoverage" class="text-danger">{{ errors.startDateOfCoverage }}</span>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="startDateOfCoverage">What type of Student?</label>
              <select class="form-select" v-model="formData.whattypeofStudent">
                <option v-for="(option, index) in whattypeofStudentOption" :key="index" :value="option"
                  :checked="option === '-None-'">{{ option }}</option>
              </select>
              <!-- <input type="date" id="startDateOfCoverage" v-model="formData.startDateOfCoverage" class="form-control" /> -->
            </div>

            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="dateOfBirthOfTraveler">Date of Birth of Traveler</label>
              <!-- <input type="date" id="dateOfBirthOfTraveler" v-model="formData.dateOfBirthOfTraveler" class="form-control" /> -->
              <div class="input-group">
                <flat-pickr v-model="formData.dateOfBirthOfTraveler" :config="datePickerConfig" placeholder="DD/MM/YYYY"
                  class="form-control" id="dateOfBirthOfTraveler" ref="fpTraveler" />
                <span class="input-group-text" @click="$refs.fpTraveler.fp.open()">
                  <i class="fa fa-calendar"></i>
                </span>
              </div>
              <span v-if="errors.dateOfBirthOfTraveler" class="text-danger">{{ errors.dateOfBirthOfTraveler }}</span>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="whereWouldYouBeTravellingto">Where would you be travelling to</label>
              <input type="text" v-titleCase id="whereWouldYouBeTravellingto"
                v-model="formData.whereWouldYouBeTravellingto" class="form-control" />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12">
              <label class="mb-0 mt-2" for="tripType">Trip Type?</label>
              <select class="form-select" v-model="formData.tripType">
                <option v-for="(option, index) in tripTypeOption" :key="index" :value="option"
                  :checked="option === '-None-'">
                  {{ option }}</option>
              </select>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 d-flex align-items-center">
              <div class="form-check form-switch mt-3">

                <input v-model="formData.roundRobinProcessed" type="checkbox" class="form-check-input" />
                <label class="my-2 mx-2">Round Robin Processed</label>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 d-flex align-items-center">
              <div class="form-check form-switch mt-3">

                <input v-model="formData.emailRoundRobinOwner" type="checkbox" class="form-check-input" />
                <label class="my-0 mx-2">Email Round Robin Owner</label>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 d-flex align-items-center">
              <div class="form-check form-switch mt-3">

                <input v-model="formData.eligibleRoundRobinOwnerFound" type="checkbox" class="form-check-input" />
                <label class="my-0 mx-2">Eligible Round Robin Owner Found</label>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 d-flex align-items-center">
              <div class="form-check form-switch mt-3">

                <input v-model="formData.reRunRoundRobin" type="checkbox" class="form-check-input" />
                <label class="my-0 mx-2">Re-Run Round Robin</label>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 d-flex align-items-center">
              <div class="form-check form-switch mt-3">

                <input v-model="formData.removeFromCampaign" type="checkbox" class="form-check-input" />
                <label class="my-0 mx-2">Remove From Campaign</label>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-12 d-flex align-items-center">
              <div class="form-check form-switch mt-3">

                <input v-model="formData.rcSmsOptOut" type="checkbox" class="form-check-input" />
                <label class="my-0 mx-2">RC SMS Opt Out </label>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <div class="button-row d-flex justify-content-center mt-3 gap-4 space">
      <button class="btn mb-2 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import mandatory from "../utils/mandatroy.js";
import validateMandatoryFields from "../../utils/util-js/validate.js";
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { useRoute } from 'vue-router'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import moment from "moment";
import { insuranceLeadSourceOptions, insuranceLeadStatusOptions, leadStatusStageOption, objectType, genderOption, referredByOptions, preferredContactMethodOption, preferredContactTimeOption, citizenshipStatusOption, understandingOfInsuranceOption, additionalContactInformationOption, whattypeofStudentOption, tripTypeOption, netWorth, currency } from "../utils/picklist.js";
import SingleSlelect from "../../utils/SingleSlelect.vue";
import { getInsuranceLeadStatusColor, getLeadStatusStage } from "../../utils/util-js/statusColorMap.js";
import SelectColorCode from "../../utils/SelectColorCode.vue";
import titleCase from "../../../directives/titleCase.js";
export default {
  directives: {
    titleCase
  },
  name: 'ApplicationForm',
  props: {
    LeadInformation: {
      type: Object,
      required: true
    },
    owners: {
      type: Array,
      required: true
    },
    adviosers: {
      type: Array,
      required: true
    },
    location: {
      type: Array,
      required: true
    }
  },
  components: {
    SingleSlelect,
    SelectColorCode,
    FlatPickr,
    VueTelInput
  },

  mounted() {
    // List all your date fields here
    const dateFields = [
      "dateOfBirth1",
      "dateOfBirth",
      "dateOfBirthOfTraveler",
      "leadCreatedOn",
      "startDateOfCoverage",
      "phoneBurnerFollowUpDate",
      "nextFollowUpDateTime",
      "roundRobinAssignmentTime"
      // ...add all your date fields here
    ];
    dateFields.forEach(field => {
      if (
        this.formData[field] &&
        (moment(this.formData[field], "YYYY-MM-DD", true).isValid() ||
          moment(this.formData[field], "DD-MM-YYYY", true).isValid())
      ) {
        let date = moment(this.formData[field], ["YYYY-MM-DD", "DD-MM-YYYY"], true);
        this.formData[field] = date.format("DD/MM/YYYY");
      }
    });
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
      formData: { ...this.LeadInformation },
      insuranceLeadSourceOptions: { ...insuranceLeadSourceOptions },
      insuranceLeadStatusOptions: [],
      // leadStatusStageOption: { ...leadStatusStageOption },
      leadStatusStageOption: [],
      objectives: { ...objectType },
      genderOption: { ...genderOption },
      referredByOptions: { ...referredByOptions },
      preferredContactMethodOption: { ...preferredContactMethodOption },
      preferredContactTimeOption: { ...preferredContactTimeOption },
      citizenshipStatusOption: { ...citizenshipStatusOption },
      understandingOfInsuranceOption: { ...understandingOfInsuranceOption },
      additionalContactInformationOption: { ...additionalContactInformationOption },
      whattypeofStudentOption: { ...whattypeofStudentOption },
      netWorth: { ...netWorth },
      tripTypeOption: { ...tripTypeOption },
      currency: { ...currency },
      errors: {},
    };
  },

  created() {
    //   console.log('LeadInformation prop:', this.LeadInformation);
    // console.log('owners prop:', this.owners);
    // console.log('adviosers prop:', this.adviosers);
    // console.log('location prop:', this.location);

    this.insuranceLeadStatusOptions = insuranceLeadStatusOptions.map(name => ({
      ROWID: name,
      name,
      color: getInsuranceLeadStatusColor(name) || "#bdbdbd" // fallback if undefined
    }));
    // console.log(this.insuranceLeadStatusOptions, "opp")

    this.leadStatusStageOption = leadStatusStageOption.map(name => ({
      ROWID: name,
      name,
      color: getLeadStatusStage(name) || "#bdbdbd" // fallback if undefined
    }));
  },
  watch: {
    LeadInformation: {
      handler(formData) {
        formData = { ...this.LeadInformation };
        console.log("this is lead information", formData);
        console.log("firstname", formData.lastName);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getIns(e) {
      console.log(e.target.value)
    },
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
      const validateFields = Object.keys(this.errors).length === 0;
      // phone validation (international + E.164, special check for CA)
      const mobile = (this.formData.mobile || '').replace(/\s|-/g, '');
      if (mobile) {
        if (!mobile.startsWith('+')) {
          this.errors.mobile = 'Country code is required (e.g. +1...)';
        } else if (mobile.startsWith('+1') && !/^\+1\d{10}$/.test(mobile)) {
          this.errors.mobile = 'Canadian number must be +1 followed by 10 digits';
        } else if (!/^\+\d{8,15}$/.test(mobile)) {
          this.errors.mobile = 'Phone must be in international format (e.g. +1234567890)';
        }
      }
      if (validateFields) {

        const dateFields = [
          "dateOfBirth1",
          "dateOfBirth",
          "dateOfBirthOfTraveler",
          "leadCreatedOn",
          "startDateOfCoverage",
          "phoneBurnerFollowUpDate",
          "nextFollowUpDateTime",
          "roundRobinAssignmentTime"
          // ...add all your date fields here
        ];
        dateFields.forEach(field => {
          if (
            this.formData[field] &&
            moment(this.formData[field], "DD/MM/YYYY", true).isValid()
          ) {
            this.formData[field] = moment(this.formData[field], "DD/MM/YYYY").format("YYYY-MM-DD");
          }
        });
        this.$emit("next", this.formData);
      }
    }
  }
};
</script>


<style scoped>
.main-heading {
  font-weight: 500 !important;
}

.flatpickr-input {
  background: url('https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/material_blue.png') no-repeat right 10px center/20px 20px;

}

.multisteps-form__content label {
  font-size: var(--crm-font-regular) !important;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500 !important;
  /* font-style: ; */
  /* font-family: */
}

.multisteps-form .main-heading {
  font-weight: 500 !important;
}

select {
  height: 2.5rem !important;
  padding: 0px 0px 0px 10px !important;
}

.multisteps-form__panel {
  position: relative !important;
  display: none !important;
  transition: padding 0.3s ease;
  /* Add transition for smoother padding change */
  padding-bottom: 0;
  /* Initially set padding bottom to 0 */
}

.multisteps-form__panel.js-active {
  display: block !important;
}

.select-box select {
  display: content !important;
  border: 1px solid #e0e3e7 !important;
  border-radius: 10px;
}

.error {
  color: red;
  position: absolute;
}

.input-error-font-size {
  font-size: 12px;
}

.highlight {
  border: 1px solid red !important;
}

@media screen and (max-width:500px) {
  .space {
    margin-bottom: 150px !important;
  }
}
</style>