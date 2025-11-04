<template>
  <div class="card custom-card mb-4">
  <div class="card-body mb-5">
      <h5 class="main-heading mt-2 mb-0 ps-1 mb-3">Address Information</h5>
    <div class="card-surface">
      <div class="row g-3">
      <div class="col-12 mb-4">
    
      <!-- Street -->
      <div class="row p-2">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Street</label>
          <input v-model="formData.street" type="text" class="form-control form-control-default" />
        </div>
        <!-- State -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">State</label>
          <input v-model="formData.state" type="text" class="form-control form-control-default" />
        </div>
        <!-- Country -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Country</label>
          <input v-model="formData.country" type="text" class="form-control form-control-default" />
        </div>
      </div>
  
      <!-- City and Zip -->
      <div class="row mt-2 p-2">
        <!-- City -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">City</label>
          <input v-model="formData.city" type="text" class="form-control form-control-default" />
        </div>
        <!-- Zip -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Zip</label>
          <input v-model="formData.zipCode" type="text" class="form-control form-control-default" />
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
</div>

   

    <div class="button-row d-flex justify-content-center mt-5 gap-4 space" style="margin-bottom:400px;">
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousStep" type="button">Prev</button>
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">Next</button>
    </div>
  </template>
<script>
export default {
  name: "CampaignDataForm",
  props: {
    AddressInformation:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {...this.AddressInformation},     
    };
  },
  watch: {
    AddressInformation:{
      handler(formData){
        formData = {...this.AddressInformation}
        console.log("FormData lead AddressInformation: ", formData)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    nextStep() {
      this.$emit('next', this.formData);
    },
    previousStep() {
      this.$emit('previous');
    }
  }
};
</script>

<style scoped>
.main-heading{
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
    margin-bottom: 150px !important;
  }
}
</style>  