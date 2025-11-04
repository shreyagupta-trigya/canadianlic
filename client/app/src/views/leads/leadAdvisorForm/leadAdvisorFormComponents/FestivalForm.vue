<template>
  <div>
    <h5 class="main-heading mt-2 ps-2">Ethnicity</h5>
    <div class="row ps-2">
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
    <h5 class="main-heading mt-2 ps-2">Important Festivals Dates</h5>
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
          <tr v-for="(parent, index) in subform" :key="index">
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

    <div class="button-row d-flex justify-content-center mt-4 gap-4" style="margin-bottom:200px;">
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousSteps" type="button">Prev</button>
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">Next</button>
    </div>
  </div>
</template>

<script>
import {religionOptions , festivalsOptions} from "../../utils/picklist.js";
const celebratedFestivalsOptionsMap = {
  "-None-": [],
  Buddhism: ["Lhosar"],
  Unknown: [],
  Hinduism: [
    'Diwali', 'Holi', 'Navratri', 'Janmashtami', 'Rama Navami', 'Makar Sankranti',
    'Pongal', 'Ganesh Chaturthi', 'Durga Puja', 'Raksha Bandhan', 'Karva Chauth', 'Mahashivratri'
  ],
  Sikhism: [
    'Gurpurab', 'Baisakhi', 'Maghi', 'Hola Mohalla', 'Diwali (Bandi Chhor Divas)',
    'Martyrdom of Guru Arjan Dev Ji', 'Martyrdom of Guru Tegh Bahadur Ji',
    "Guru Nanak Jayanti", "Guru Gobind Singh Jayanti", "Guru Granth Sahib Prakash Divas",
    "Vaisakhi", "Lohri", "Thanksgiving", "New Year"
  ],
  Christianity: [
    'Christmas', 'Easter', 'Good Friday', 'Palm Sunday', 'Ash Wednesday',
    'Maundy Thursday', 'Pentecost', "All Saints' Day", 'Ascension Day', 'Epiphany'
  ],
  Islam: [
    'Eid al-Fitr', 'Eid al-Adha', 'Ramadan', 'Laylat al-Qadr',
    'Islamic New Year', 'Milad-un-Nabi', 'Ashura'
  ],
  Judaism: ["Passover"],
   General: [
    "Canada Day",
    "New Year",
    "Family Day",
    "Victoria Day",
    "Father's Day",
    "Mother's Day",
    "Thank's giving",
  ],
};

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
      // formData: {...this.FestivalForm},
      religionOptions: {...religionOptions},
      festivals: {...festivalsOptions},
      formData: {...this.FestivalForm},
      subform:[]
    };
  },
computed: {
  celebratedFestivalsOptions() {
    const selectedReligion = this.formData.religion;
    if (
      !selectedReligion ||
      selectedReligion === "-None-" ||
      selectedReligion === "Unknown"
    ) {
      return celebratedFestivalsOptionsMap["General"];
    }
    return celebratedFestivalsOptionsMap[selectedReligion] || celebratedFestivalsOptionsMap["General"];
  }
},

  watch: {
    FestivalForm:{
      handler(){
        this.formData = {...this.FestivalForm}
        this.subform = this.formData.festivalsData || [];
        console.log("FormData lead FestivalForm: ", this.formData)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    nextStep(){
      this.$emit('next', {...this.formData, festivalsData: this.subform });
    },
    previousSteps(){
      this.$emit('previous', {...this.formData, festivalsData: this.subform });
    },
    addRowToFestivalsTable() {
      this.subform.push({
        festivalName: "",
        dateOfFestival: ""
      });
    },
    deleteFestivalTableRow(index) {
      this.subform.splice(index, 1);
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
