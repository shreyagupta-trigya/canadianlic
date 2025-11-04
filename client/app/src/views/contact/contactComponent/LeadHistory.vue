<template>
  <div>
    <h5 class="main-heading mt-2 ps-2">Referral Level</h5>
    <div style="width: 100%; overflow: scroll">
      <table class="table border table-responsive subform">
        <thead class="table subform-table-head text-white">
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Referral Level</th>
            <th>Referrals till Date - Life</th>
            <th>Referrals till Date  - Living Benefits</th>
            <th>Referrals till Date  - Travel</th>
            <th>Referrals till Date - Health & Dental</th>
            <th>Referral Payout till Date  - Life</th>
            <th>Referral Payout till Date  - Living Benefits</th>
            <th>Referral Payout till Date  - Travel</th>
            <th>Referral Payout till Date  - Health & Dental</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(parent, index) in leadConversionHistoryData" :key="index">
            <td class="m-auto">{{ index + 1 }}</td>
            <td>
              <a @click.prevent="deleteLeadHistorysRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
              </a>
            </td>
            <td>
              <input v-model="parent.referralLevel" type="text" class="form-control form-control-default" autocomplete="off">
            </td>
            <td>
              <input v-model="parent.referraltilldateLife" type="date" class="form-control form-control-default" autocomplete="off">
            </td>
            <td>
              <input v-model="parent.referralstillDateLivingBenefits" type="date" class="form-control form-control-default" autocomplete="off">
            </td>
            <td>
              <input v-model="parent.referralstillDateTravel" type="date" class="form-control form-control-default" autocomplete="off">
            </td>
            <td>
              <input v-model="parent.referralstillDateHealthDental" type="date" class="form-control form-control-default" autocomplete="off">
            </td>
            <td>
              <input v-model="parent.referralPayouttillDateLife" type="date" class="form-control form-control-default" autocomplete="off">
            </td>
            <td>
              <input v-model="parent.referralPayouttillDateLivingBenefits" type="date" class="form-control form-control-default" autocomplete="off" disabled>
            </td>
            <td>
              <input v-model="parent.referralPayouttillDateLifeTravel" type="date" class="form-control form-control-default" autocomplete="off">
            </td>
            <td>
              <input v-model="parent.referralPayouttillDateHealthDental" type="date" class="form-control form-control-default" autocomplete="off" disabled>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addleadConversionHistory">
      Add Row
    </button>
  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
    <button
      class="btn mb-1 bg-gradient-light btn-md null null js-btn-prev"
      type="button"
      @click="previousStep"
    >
      Prev
    </button>
    <button
      class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next"
      @click.prevent="nextStep"
      type="button"
    >
      Next
    </button>
  </div>
</template>
<script>
export default {
name: "CampaignDataForm",
props: {
  leadHistory:{
  type: Object,
  required: true
}
},
watch: {
  leadHistory: {
    handler(formData) {
      formData = {...this.leadHistory};
      this.leadConversionHistoryData = this.leadHistory.leadConversionHistoryData || [];
      console.log("this formData Address", formData);
    },
    immediate: true,
    deep: true
  }
},
data() {
return {
  formData:  {...this.leadHistory},  
  leadConversionHistoryData:[]    
  }
},
methods: {
  addleadConversionHistory()  {
    this.leadConversionHistoryData.push({
      referralPayouttillDateHealthDental: "",
      referralPayouttillDateLifeTravel: "",
      referralPayouttillDateLivingBenefits: "",
      referralPayouttillDateLife: "",
      referralstillDateHealthDental: "",
      referralstillDateTravel:"",
      referralstillDateLivingBenefits:"",
      referraltilldateLife:"",
    });
  },
  deleteLeadHistorysRow(index)  {
      this.leadConversionHistoryData.splice(index, 1);
  },
nextStep() {
  this.$emit("next", { ...this.formData, leadConversionHistoryData:this.leadConversionHistoryData});  
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
