<template>
  <div>
    <h5 class="main-heading mt-2 mb-0">UMT Details</h5>
    <!-- Campaignid Data -->
    <div class="row ">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Campaignid Data</label>
        <input v-model="formData.campaignidData" type="text" class="form-control form-control-default mb-0" />
      </div>
      <!-- Adgroupid Data -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Adgroupid Data</label>
        <input v-model="formData.adgroupidData" type="text" class="form-control form-control-default mb-0" />
      </div>
      <!-- Matchtype Data -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Matchtype Data</label>
        <input v-model="formData.matchtypeData" type="text" class="form-control form-control-default mb-0" />
      </div>
    </div>

    <!-- GCLID Data -->
    <div class="row mt-1">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">GCLID Data</label>
        <input v-model="formData.gclidData" type="text" class="form-control form-control-default mb-0" />
      </div>
      <!-- Network Data -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Network Data</label>
        <input v-model="formData.networkData" type="text" class="form-control form-control-default mb-0" />
      </div>
      <!-- Device Data -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Device Data</label>
        <input v-model="formData.deviceData" type="text" class="form-control form-control-default mb-0" />
      </div>
    </div>

    <!-- Keyword Data -->
    <div class="row mt-1 ">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">Keyword Data</label>
        <input v-model="formData.keywordData" type="text" class="form-control form-control-default mb-0" />
      </div>
      <!-- LP URL Data -->
      <div class="col-lg-4 col-md-4 col-sm-12">
        <label class="my-0">LP URL Data</label>
        <input v-model="formData.lpUrlData" type="text" class="form-control form-control-default mb-0" />
      </div>
    </div>
  </div>
  <div class="button-row d-flex justify-content-center mt-2 gap-4">
    <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousStep" type="button">Prev</button>
    <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">Next</button>
  </div>
</template>

<script>
export default {
  name: "CampaignDataForm",
  props:{
    UMTDetails:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {...this.UMTDetails},      
    };
  },
  watch: {
    UMTDetails:{
      handler(formData){
        formData = {...this.UMTDetails}
        console.log("FormData lead UMTDetails: ", formData)
      },
      immediate: true,
      deep: true
    }
  },
  methods:{
    nextStep() {
      this.$emit('next', this.formData);
    },
    previousStep() {
      this.$emit('previous');
    },
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
