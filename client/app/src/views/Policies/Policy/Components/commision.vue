<template>
    <div>
            <h5 class="main-heading ps-2">Day Wise policyCommission</h5>
            <div class="multisteps-form__content">
              <div class="row ps-2">
                <div class="col-lg-4 col-sm-12 mt-2">
                  <label class="my-0">Day wise Corporate policyCommission </label>
                  <div class="col-12">
                    <input
                      v-model="formData.dayWiseCorporateCommision"
                      type="number"
                      class="form-control form-control-default"
                      isrequired="false"
                      autocomplete="off"
                    />
                  </div>
                </div>

                <div class="col-lg-4 col-sm-12 mt-2">
                  <label class="my-0">Day wise Location policyCommission </label>
                  <div class="col-12">
                    <input
                      v-model="formData.dayWiseLocationCommision"
                      type="number"
                      class="form-control form-control-default"
                      isrequired="false"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col-lg-4 col-sm-12 mt-2">
                  <label class="my-0">Day wise Advisor policyCommission</label>
                  <div class="col-12">
                    <input
                      v-model="formData.dayWiseAdvisorCommision"
                      type="number"
                      class="form-control form-control-default"
                      isrequired="false"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div class="col-lg-4 col-sm-12 mt-2">
                  <label class="my-0">Policy Month</label>
                  <div class="col-12">
                    <input
                      v-model="formData.policyMonth"
                      type="number"
                      class="form-control form-control-default"
                      isrequired="false"
                      autocomplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h5 class="main-heading mt-2 ps-2">Policy policyCommission Info</h5>
            <div style="width: 100%; overflow: scroll" class="mt-4">
              <table class="table border table-responsive subform">
                <thead class="table subform-table-head text-white">
                  <tr>
                    <th>#</th>
                    <th>Action</th>
                    <th>Month/Premium</th>
                    <th>Gross Corporate policyCommission</th>
                    <th>Gross Location policyCommission</th>
                    <th>Net Advisor policyCommission</th>
                    <th>Net Corporate policyCommission</th>
                    <th>Net Location policyCommission</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr
                    v-for="(parent, index) in policyCommission"
                    :key="index"
                  >
                    <td class="m-auto">{{ index + 1 }}</td>
                    <td>
                      <a
                        @click.prevent="
                          deletePolicypolicyCommissionTableRow(index, parent.ROWID)
                        "
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete product"
                        ><i
                          class="fas fa-trash text-secondary"
                          aria-hidden="true"
                        ></i
                      ></a>
                    </td>

                    <td>
                      <input
                        v-model="parent.monthPremium"
                        type="text"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </td>
                    <td>
                      <input
                        v-model="parent.gcComm"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </td>
                    <td>
                      <input
                        v-model="parent.glComm"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </td>
                    <td>
                      <input
                        v-model="parent.naCoom"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </td>
                    <td>
                      <input
                        v-model="parent.ncComm"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </td>
                    <td>
                      <input
                        v-model="parent.nlComm"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                class="btn mb-0 btn-color btn-md null null"
                type="button"
                @click.prevent="addRowToPolicypolicyCommissionTable"
              >
                Add Row
              </button>
            </div>

            <h5 class="main-heading mt-2 ps-2">Policy policyCommission Info</h5>
            <div class="multisteps-form__content">
              <div class="row ps-2">
                <div class='row'>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Total Gross Location Commision</label>
                    <div class="col-12">
                      <input
                        v-model="formData.totalGrossLocationCommision"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Total Net Location policyCommission</label>
                    <div class="col-12">
                      <input
                        v-model="formData.totalNetLocationpolicyCommission"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Corporate policyCommission %</label>
                    <div class="col-12">
                      <input
                        v-model="formData.corporatepolicyCommission"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  </div>
                  <div class='row'>
                    <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Corporate policyCommission Amount</label>
                    <div class="col-12">
                      <input
                        v-model="formData.corporatePolicyCommissionAmount"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Location policyCommission %</label>
                    <div class="col-12">
                      <input
                        v-model="formData.locationPolicyCommission"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0"
                      >Total Gross Corpoarate Com. (CA$)</label
                    >
                    <div class="col-12">
                      <input
                        v-model="formData.totalGrossCorpoarateCom"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                        disable
                      />
                    </div>
                  </div>
                </div>
                 <div class='row'>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Total Net Advisor policyCommission</label>
                    <div class="col-12">
                      <input
                        v-model="formData.totalGrossAdvisorpolicyCommission"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Total Net Corporate policyCommission</label>
                    <div class="col-12">
                      <input
                        v-model="formData.totalNetCorporateCommision"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Advisor policyCommission %</label>
                    <div class="col-12">
                      <input
                        v-model="formData.advisorPolicyCommission"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  </div>
                  <div class='row'>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Update policyCommissions</label>
                    <div class="col-12">
                      <input
                        v-model="formData.updatePolicyCommission"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0"
                      >Total Net Advisor policyCommission (CA$)</label
                    >
                    <div class="col-12">
                      <input
                        v-model="formData.totalNetAdvisorpolicyCommission"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                        disable
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Total Net Corporate Com. (CA$)</label>
                    <div class="col-12">
                      <input
                        v-model="formData.totalNetCorporateCom"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                        disable
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-12 mt-2">
                    <label class="my-0">Total Gross Location Com. (CA$)</label>
                    <div class="col-12">
                      <input
                        v-model="formData.totalGrossLocationCom"
                        type="number"
                        class="form-control form-control-default"
                        isrequired="false"
                        autocomplete="off"
                        disable
                      />
                    </div>
                  </div>
                  </div>
               
              </div>
            </div>

            <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
              <button
                class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
                type="button"
                @click="prevStep"
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
          </div>
</template>
<style></style>
<script>
export default {
    props: {
      commission:{
            type: Object,
            required: true
        }       
    },
    watch: {
        commission: {
            handler() {
                this.formData = {...this.commission};
                this.policyCommission = this.commission.policyCommission || [];
            },
            immediate:true,
            deep: true
        }
    },
    data() {
        return {
            formData: {...this.commission},
            policyCommission: [],
            errors: {},
        }
    },
    methods: {
        addRowToPolicypolicyCommissionTable(){
            this.policyCommission.push({
                monthPremium: '',
                gcComm: '',
                naCoom: '',
                ncComm: '',
                nlComm: '',
            });
        },
        deletePolicypolicyCommissionTableRow(index){
          this.policyCommission.splice(index, 1);
        },
        nextStep(){
            this.$emit('next', {...this.formData,policyCommission: this.policyCommission});
        },       
        prevStep(){
            this.$emit('previous');
        },
    }
}
</script>
<style>
@media screen and (max-width:500px) {
  .space{
    margin-bottom:150px;
  }
}
</style>