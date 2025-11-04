<template>
    <h5 class="main-heading mb-0">Claims</h5>
    <div>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Any Current Claims on this Policy?</label>
          <select v-model="formData.anyCurrentClaimsOnThisPolicy" class="form-select">
            <option v-for="(option , index) in anyCurrentClaimsOnThisPolicy" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Any Past Claims on this Policy?</label>
          <select v-model="formData.anyPastClaimsOnThisPolicy" class="form-select">
            <option v-for="(option , index) in anyPastClaimsOnThisPolicy" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Reason of Claim</label>
        <textarea v-model="formData.reasonOfClaim" class="form-control form-control-default" rows="1"></textarea>
         </div>
         </div>
      <div class="row mt-3">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Claim Outcome</label>
          <select v-model="formData.claimOutcome" class="form-select">
            <option v-for="(option , index) in claimOutcome" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Claim Submitted?</label>
          <select v-model="formData.claimSubmitted" class="form-select">
         <option v-for="(option , index) in claimSubmitted" :key="index" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Claim Amount</label>
          <input v-model="formData.claimAmount" type="number" placeholder="CA$" class="form-control form-control-default" />
        </div>
      </div>
      <div class="row mt-3"> 
        <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Date of Claim</label>
        <input v-model="formData.dateOfClaim" type="date" class="form-control">
      </div> 
        <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Claim Closed On-</label>
        <input v-model="formData.claimClosedOn" type="date" class="form-control">
      </div>     
      <div class="col-lg-4 col-md-4 col-sm-12">
      <label class="my-0">Amount Settled</label>
      <input v-model="formData.amountSettled" type="text" class="form-control form-control-default" />
        </div>
    </div>
    <div class="row mt-3">
    <div class="col-lg-4 col-md-4 col-sm-12">
   <label class="my-0">Settlement or Rejection Observations</label>
   <input v-model="formData.rejectionObservation" type="text" class="form-control form-control-default" />
   </div>

    </div>
  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4">
    <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button">Prev</button>
    <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="sendData" type="button">Next</button>
  </div>
</template>

<script>
export default {
  name: "InsuranceInquiryForm",
  props: {
    getdealClais: {
        type: Function,
        required: true
      },
      Claims:{
        type: Array,
        required: true
      }
    },
  data() {
    return {
      formData: {...this.Claims}, // Assuming you have a default policy review data in your component data.

      // formData: {
      //   anyCurrentClaimsOnThisPolicy: "",
      //   reviewComments: "",
      //   dateOfClaim: "",
      //   reasonOfClaim: "",
      //   claimSubmitted: "",
      //   claimAmount: "",
      //   claimClosedOn: "",
      //   claimOutcome: "",
      //   amountSettled:"",
      //   observation:"",
      //   anyPastClaimsOnThisPolicy:""
        

      // },
      // Sample options for each select field
      anyCurrentClaimsOnThisPolicy: [
        "None",
        "Yes",
        "No",
        "Unkown"
      ],
      anyPastClaimsOnThisPolicy: [
       "None",
        "Yes",
        "No",
        "Unkown"
      ],
      claimSubmitted:[
        "None",
        "Yes",
        "No"
      ],
      claimOutcome:[
        "None",
        "Approved",
        "Rejected"
      ]
    };
  },
  watch: {
      PolicyReview: {
        handler(formData) {
          formData = {...this.Claims};
          console.log("this formData deal trustee", formData);
        },
        immediate: true,
        deep: true
      }
    },
  methods: {
    sendData(){
      this.getdealClais(this.formData);
    }
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
</style>
