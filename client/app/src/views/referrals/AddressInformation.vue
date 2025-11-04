<template>
    <div>
      <h5 class="main-heading mt-2 mb-0">Address Information</h5>
      <!-- Street -->
      <div class="row ">
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
      <div class="row mt-2">
        <!-- City -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">City</label>
          <input v-model="formData.city" type="text" class="form-control form-control-default" />
        </div>
        <!-- Zip -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Zip</label>
          <input v-model="formData.zip" type="text" class="form-control form-control-default" />
        </div>
        <!-- House or Apt Number -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">House or Apt Number</label>
          <input v-model="formData.houseOrAptNumber" type="text" class="form-control form-control-default" />
        </div>
        <!-- House or Apt Number -->
        <div class="col-lg-4 col-md-4 col-sm-12">
          <label class="my-0">Provincer</label>
          <input v-model="formData.province" type="text" class="form-control form-control-default" />
        </div>
      </div>
    </div>

    <div class="button-row d-flex justify-content-center mt-2 gap-4">
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" type="button">Prev</button>
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="sendData" type="button">Next</button>
    </div>
  </template>
<script>
export default {
  name: "CampaignDataForm",
  props: {
    getAddressInformation: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      formData: {
        Province:"",
        houseOrAptNumber:"",
        campaignidData: "",
        adgroupidData: "",
        matchtypeData: "",
        gclidData: "",
        networkData: "",
        deviceData: "",
        keywordData: "",
        lpUrlData: "",
        street: "", // Added street field
        state: "", // Added state field
        country: "", // Added country field
        city: "", // Added city field
        zip: "", // Added zip field
      }
    };
  },
  methods: {
    sendData(){
      this.getAddressInformation(this.formData);
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
</style>  