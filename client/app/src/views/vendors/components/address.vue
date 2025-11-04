<template>
  <div class="ps-2"> 
    <h5 class="main-heading mb-0">Address Information</h5>

    <div class="row mt-1">
      <div class="col-lg-4">
        <label class="my-0 mt-2">Street</label>
        <div class="form-group multisteps-form__input mb-1">
          <input
            v-model="formData.street"
            type="text"
            class="form-control form-control-default"
          />
        </div>
      </div>
      <div class="col-lg-4">
        <label class="my-0 mt-2">City</label>
        <div class="form-group multisteps-form__input mb-1">
          <input
            v-model="formData.city"
            type="text"
            class="form-control form-control-default"
          />
        </div>
      </div>
      <div class="col-lg-4">
        <label class="my-0 mt-2">State</label>
        <div class="form-group multisteps-form__input mb-1">
          <input
            v-model="formData.State"
            type="text"
            class="form-control form-control-default"
          />
        </div>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-lg-4">
        <label class="my-0 mt-2">Postal Code</label>
        <div class="form-group multisteps-form__input mb-1">
          <input
            v-model="formData.postalCode"
            type="text"
            class="form-control form-control-default"
          />
        </div>
      </div>
      <div class="col-lg-4">
        <label class="my-0 mt-2">Country</label>
        <div class="form-group multisteps-form__input mb-1">
          <input
            v-model="formData.country"
            type="text"
            class="form-control form-control-default"
          />
        </div>
      </div>
    </div>
 
  <div class="button-row d-flex justify-content-center mt-2 gap-4 space">
    <button
      class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
      type="button"
      @click="handlePrevious"
    >
      Prev
    </button>
    <button
      v-if="!id"
      class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
      type="button"
      @click.prevent="nextStep"
      
    >
      Submit
    </button>
  </div>
</div>
</template>
<script>
export default {
  name: "vendor information",
  props:{
    Address: {
      type: Array,
      required: true
    }
  },
  data() {
    return{
      formData: {...this.Address},
    }
  },
  watch:{
    Address:{
      handler(formData){
        this.formData = {...this.Address},
        console.log("Address", formData)
      },
      immediate:true,
      deep: true,
    }
  },
  methods: {
    nextStep(){
      this.$emit("next", this.formData);
    },
    handlePrevious(){
      this.$emit("previous", this.formData);
    }
  }
}
</script>

<style>
@media screen and (max-width:500px) {
  .space{
    margin-bottom:50px;
  }
}
</style>
