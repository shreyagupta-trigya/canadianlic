<template>
  <div class="ps-2">
    <h5 class="main-heading mt-2">Ethnicity</h5>
    <div class="row">
      <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
        <label class="my-0">Religion</label>
        <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
          <div class="select-box">
            <select v-model="formData.religion" class="multisteps-form__select form-control choices__input" name="choices-state">
              <option v-for="(option, index) in religionOptions" :key="index" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
        <label class="my-0">Celebrated Festivals</label>
        <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
          <div class="select-box">
            <select v-model="formData.celebratedFestivals" class="multisteps-form__select form-control choices__input" name="choices-state">
              <option v-for="(option, index) in celebratedFestivalsOptions" :key="index" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <h5 class="main-heading mt-2">Important Festivals Dates</h5>
    <div style="width: 100%; overflow: scroll">
      <table class="table border table-responsive subform">
        <thead class="table subform-table-head text-white">
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Festival Name</th>
            <th>Date On Celebrated</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(parent, index) in festivalsData" :key="index">
            <td class="m-auto">{{ index + 1 }}</td>
            <td>
              <a @click.prevent="deleteFestivalTableRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
              </a>
            </td>
            <td>
              <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true" aria-expanded="false">
                <div class="select-box">
                  <select v-model="parent.festivalName" class="multisteps-form__select form-control choices__input" name="choices-state">
                    <option v-for="(option, index) in festivals" :key="index" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </td>
            <td>
              <input v-model="parent.dateOfFestival" type="date" class="form-control form-control-default" autocomplete="off">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn mb-0 btn-color btn-md null null" type="button" @click.prevent="addRowToFestivalsTable">
      Add Row
    </button>

    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousSteps" type="button">Prev</button>
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">Next</button>
    </div>
  </div>
</template>

<script>
import {religionOptions , festivalsOptions, celebratedFestivalsOptions} from "../../utils/picklist.js";

export default {
  name: "HolidayDateForm",
  props: {
    FestivalForm:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {...this.FestivalForm},
      festivalsData:[],
      religionOptions: {...religionOptions},
      festivals: {...festivalsOptions},
      celebratedFestivalsOptions: {...celebratedFestivalsOptions},
    };
  },
  watch: {
    FestivalForm:{
      handler(formData){
        this.formData = {...this.FestivalForm}
        this.festivalsData = this.FestivalForm.festivalsData || [];

        console.log("FormData lead FestivalForm: ", formData)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    nextStep(){
      this.$emit('next', {...this.formData,festivalsData: this.festivalsData});
    },
    previousSteps(){
      this.$emit('previous', {...this.formData,festivalsData: this.festivalsData});
    },
    addRowToFestivalsTable() {
      this.festivalsData.push({
        festivalName: "",
        dateOfFestival: ""
      });
    },
    deleteFestivalTableRow(index) {
      this.festivalsData.splice(index, 1);
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
@media screen and (max-width:500px) {
  .space{
    margin-bottom:100px;
  }
}
</style>
