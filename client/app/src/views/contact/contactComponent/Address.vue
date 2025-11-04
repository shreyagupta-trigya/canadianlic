<template>
  <div>
    <div>
      <div class="card-body">
        <div class="card-surface">
          <div class="d-flex justify-content-between align-items-center mb-0 px-1">
            <h5 class="main-heading mb-0">Address Information</h5>
            <button class="btn btn-outline-primary btn-sm" @click="copyAddress">
              Copy Address
            </button>
          </div>

          <div class="row g-3 px-2">
            <!-- Mailing Address Column -->
            <div class="col-lg-6">
              <div class="mb-2">
                <label class="form-label">Mailing Street</label>
                <input v-model="formData.mailingStreet" type="text" class="form-control" />
              </div>

              <div class="mb-2">
                <label class="form-label">Mailing City</label>
                <input v-model="formData.mailingCity" type="text" class="form-control" />
              </div>

              <div class="mb-2">
                <label class="form-label">Mailing State</label>
                <input v-model="formData.mailingState" type="text" class="form-control" />
              </div>

              <div class="mb-2">
                <label class="form-label">Mailing Zip</label>
                <input v-model="formData.mailingpostalCode" type="text" class="form-control" />
              </div>

              <div class="mb-2">
                <label class="form-label">Mailing Country</label>
                <input v-model="formData.mailingCountry" type="text" class="form-control" />
              </div>
            </div>

            <!-- Other Address Column -->
            <div class="col-lg-6">
              <div class="mb-2">
                <label class="form-label">Other Street</label>
                <input v-model="formData.otherStreet" type="text" class="form-control" />
              </div>

              <div class="mb-2">
                <label class="form-label">Other City</label>
                <input v-model="formData.otherCity" type="text" class="form-control" />
              </div>

              <div class="mb-2">
                <label class="form-label">Other State</label>
                <input v-model="formData.otherState" type="text" class="form-control" />
              </div>

              <div class="mb-2">
                <label class="form-label">Other Zip</label>
                <input v-model="formData.otherZip" type="text" class="form-control" />
              </div>

              <div class="mb-2">
                <label class="form-label">Other Country</label>
                <input v-model="formData.otherCountry" type="text" class="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
      <button class="btn mb-1 bg-gradient-light btn-md null null js-btn-prev" type="button" @click="previousStep">
        Prev
      </button>
      <button class="btn mb-1 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">
        Next
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Address",
  props: {
    address: {
      type: Object,
      required: true
    }
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
        console.log("this formData address", formData);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    copyAddress() {
      this.formData.otherStreet = this.formData.mailingStreet;
      this.formData.otherCity = this.formData.mailingCity;
      this.formData.otherState = this.formData.mailingState;
      this.formData.otherZip = this.formData.mailingpostalCode;
      this.formData.otherCountry = this.formData.mailingCountry;
    },
    nextStep() {
      this.$emit("next", { ...this.formData });
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
  .space {
    margin-bottom: 150px;
  }
}
</style>