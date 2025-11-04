<template>
  <h5 class="main-heading mb-0 ps-2">Mailing Address Information</h5>
  <div class="row mt-1 ps-2">
    <!-- Street -->
    <div class="col-lg-4">
      <label class="my-0 mt-2">Mailing Street</label>
      <div class="form-group multisteps-form__input mb-1">
        <input
          v-model="formData.mailingStreet"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
    <!-- City -->
    <div class="col-lg-4">
      <label class="my-0 mt-2">Mailing City</label>
      <div class="form-group multisteps-form__input mb-1">
        <input
          v-model="formData.mailingCity"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
    <div class="col-lg-4">
      <label class="my-0 mt-2"> Mailing State</label>
      <div class="form-group multisteps-form__input mb-1">
        <input
          v-model="formData.mailingState"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
  </div>
  <div class="row mt-1 ps-2">
    <div class="col-lg-4">
      <label class="my-0 mt-2">Mailing Postal Code</label>
      <div class="form-group multisteps-form__input mb-1">
        <input
          v-model="formData.mailingPostalCode"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
    <div class="col-lg-4">
      <label class="my-0 mt-2">Mailing Country</label>
      <div class="form-group multisteps-form__input mb-1">
        <input
          v-model="formData.mailingCountry"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
  </div>

  <h5 class="main-heading mb-0 ps-2">Address Information</h5>
  <div class="row mt-1 ps-2">
    <!-- Street -->
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
    <!-- City -->
    <div class="col-lg-4">
      <label class="my-0 mt-2"> City</label>
      <div class="form-group multisteps-form__input mb-1">
        <input
          v-model="formData.city"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
    <div class="col-lg-4">
      <label class="my-0 mt-2"> State</label>
      <div class="form-group multisteps-form__input mb-1">
        <input
          v-model="formData.state"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
  </div>
  <div class="row mt-1 ps-2">
    <div class="col-lg-4">
      <label class="my-0 mt-2"> Postal Code</label>
      <div class="form-group multisteps-form__input mb-1">
        <input
          v-model="formData.postalCode"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
    <div class="col-lg-4">
      <label class="my-0 mt-2"> Country</label>
      <div class="form-group multisteps-form__input mb-1">
        <input
          v-model="formData.country"
          type="text"
          class="form-control form-control-default"
        />
      </div>
    </div>
  </div>
  <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
    <button
    class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev"
    type="button"
    @click="previousStep"
  >
    Prev
  </button>
  <button
    class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
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

    address: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: { ...this.address },     
    };
  },
  watch: {
    address: {
      handler(formData) {
        formData = { ...this.address };
        console.log("this formData Address", formData);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    nextStep() {
      this.$emit("next", {...this.formData} );  
    },
    previousStep() {
      this.$emit("previous");
    },
  },
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
