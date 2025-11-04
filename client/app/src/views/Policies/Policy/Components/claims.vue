<template>
    <div>
      <h5 class="main-heading mt-2 ps-2">Claim</h5>
      <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0 ps-2">
                  <label class="my-0">Any Current Claims on this Policy?</label>
                  <div
                    class="choices"
                    data-type="select-one"
                    tabindex="0"
                    role="listbox"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="select-box mb-3">
                      <select
                        v-model="formData.areCurrentClaimonThisPolicy"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                      <option  v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option" :checked="option === '-None-'">{{ option }}</option>

                      </select>
                    </div>
                    
                  </div>
      </div>
      <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0 ps-2">
                  <label class="my-0">Any Past Claims on this Policy?</label>
                  <div
                    class="choices"
                    data-type="select-one"
                    tabindex="0"
                    role="listbox"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="select-box mb-3">
                      <select
                        v-model="formData.arePastClaimonThisPolicy"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                      <option  v-for="(option, index) in clientFirstPolicyOptions" :key="index" :value="option" :checked="option === '-None-'">{{ option }}</option>

                      </select>
                    </div>
                    
                  </div>
      </div>
      <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0 ps-2">
                  <label class="my-0">Claim Outcome</label>
                  <div
                    class="choices"
                    data-type="select-one"
                    tabindex="0"
                    role="listbox"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div class="select-box mb-3">
                      <select
                        v-model="formData.claimOutcome"
                        id="choices-state"
                        class="multisteps-form__select form-control choices__input"
                        name="choices-state"
                        tabindex="-1"
                        data-choice="active"
                      >
                      <option  v-for="(option, index) in claimOutcomeOption" :key="index" :value="option" :checked="option === '-None-'">{{ option }}</option>

                       
                      </select>
                    </div>
                    
                  </div>
      </div>
      <div style="width: 100%; overflow: scroll">
        <table class="table border table-responsive subform">
          <thead class="table subform-table-head text-white">
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Date of claim</th>
              <th>Reason for claim</th>
              <th>Amount of Claim (CA$)</th>
              <th>Claim Closed On</th>
              <th>Claim Amount Settled (CA$)</th>
              <th>Claim Amount Rejected (CA$)</th>
              <th>Settlement Observations if any</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="(parent, index) in pastClaims" :key="index">
              <td class="m-auto">{{ index + 1 }}</td>
              <td>
                <a @click.prevent="deleteClaimRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                  <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                </a>
              </td>
              
              <td>
                <!-- <input v-model="parent.dateOfClaim" type="date" class="form-control form-control-default" autocomplete="off"> -->
                  <div class="input-group bg-white">
            <flat-pickr v-model="parent.dateOfClaim" :config="datePickerConfig" placeholder="DD/MM/YYYY"
              class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
              ref="fpDateOfBirth" />
            <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
              <i class="fa fa-calendar"></i>
            </span>
          </div>
              </td>
              <td>
                <textarea v-model="parent.reasonforClaim" class="form-control form-control-default" rows="1"></textarea>
              </td>
             
              <td>
                <input v-model="parent.amountofClaim" type="number" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
              
                <div class="input-group bg-white">
            <flat-pickr v-model="parent.claimClosedOn" :config="datePickerConfig" placeholder="DD/MM/YYYY"
              class="form-control form-control-default" :required="false" autocomplete="off" id="dateOfBirth"
              ref="fpDateOfBirth" />
            <span class="input-group-text" @click="$refs.fpDateOfBirth.fp.open()">
              <i class="fa fa-calendar"></i>
            </span>
          </div>
              </td>
              
              <td>
                <input v-model="parent.claimAmountSettled" type="number" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <input v-model="parent.claimAmountRejected" type="number" class="form-control form-control-default" autocomplete="off">
              </td>
              <td>
                <textarea v-model="parent.settlement" class="form-control form-control-default" rows="1"></textarea>
              </td>
             

            </tr>
          </tbody>
        </table>
        
      </div>
      <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToClaimTable">
        Add Row
      </button>
    </div>
    <h5 class="main-heading mt-2 ps-2">Past Claims</h5>
            <div class="row multisteps-form__content ps-2">
              <div class="col-md-4 col-sm-12 mt-2 ">
                <label class="my-0">Total Amount Claimed</label>
                <div class="col-12">
                  <input
                    v-model="formData.totalAmountClaimed"
                    placeholder="$"
                    type="number"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="col-md-4 col-sm-12 mt-2 ">
                <label class="my-0">Total Amount Settled</label>
                <div class="col-12">
                  <input
                    v-model="formData.totalAmountSettled"
                    placeholder="CA$"
                    type="number"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </div>
              </div>
              <div class="col-md-4 col-sm-12 mt-2 ps-2">
                <label class="my-0">Total Amount Rejected</label>
                <div class="col-12">
                  <input
                    v-model="formData.totalAmountRejected"
                    placeholder="$"
                    type="number"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
            <h5 class="main-heading mt-2 ps-2">SMS Response</h5>
            <div class="multisteps-form__content ps-2">
              <div class="col-12 col-sm-12 mt-2">
                <label class="my-0">Ringcentral sms response</label>
                <div class="col-12">
                  <textarea
                    v-model="formData.ringcentralSmsResponse"
                    type="text"
                    class="form-control form-control-default"
                    isrequired="false"
                    autocomplete="off"
                  />
                </div>
              </div>
            </div>
    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
                <button
                  class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
                  type="button"
                  @click.prevent="previousStep"
                >
                  Prev
                </button>
                <button
                  class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                  type="button"
                  @click.prevent="nextStep"
                >
                  Next
                </button>
              </div>
  </template>
  <script>
  import {clientFirstPolicyOptions, claimOutcomeOption } from "../../utils/picklist";

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
  export default {
     components: { flatPickr },
    name: "LeadManagementHistory",
    props: {
      claims:{
        type: Object,
        required: true
      }
    },
    watch:{
      claims:{
        handler(){
          this.formData = {...this.claims}
          this.pastClaims = this.claims.pastClaims || [];
        },
        immediate: true,
        deep: true,
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
        formData: {...this.claims},
        pastClaims:[],
        clientFirstPolicyOptions:{...clientFirstPolicyOptions},
        claimOutcomeOption:{...claimOutcomeOption}      
      };
    },   
    methods: {      
       openDatePicker() {
      if (this.$refs.fpDateOfBirth && this.$refs.fpDateOfBirth.fp) {
        this.$refs.fpDateOfBirth.fp.open()
      }
    },
      addRowToClaimTable() {
        this.pastClaims.push({
            dateOfClaim:"",
            reasonforClaim:"",
            amountofClaim:"",
            claimClosedOn:"",
            claimAmountSettled:"",
            claimAmountRejected:"",
            settlement:""
        });
      },
      deleteClaimRow(index) {
        this.pastClaims.splice(index, 1);
      },
      nextStep() {
        this.$emit('next', {...this.formData,pastClaims:this.pastClaims});
      },
      previousStep() {
        this.$emit('previous');
    }
  }
}
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
  