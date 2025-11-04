<template>
  <div>
    <div class="card-body p-1">
      <div class="card-surface">
        <h5 class="main-heading mt-2 ps-2">Ethnicity</h5>
        <div class="row ps-2">
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
            <label class="my-0 ">Religion</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.religion" class="multisteps-form__select form-control choices__input"
                  name="choices-state">
                  <option v-for="(option, index) in religionOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0 ps-2">
            <label class="my-0">Celebrated Festivals</label>
            <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
              aria-expanded="false">
              <div class="select-box">
                <select v-model="formData.celebratedFestivals"
                  class="multisteps-form__select form-control choices__input" name="choices-state">
                  <option v-for="(option, index) in celebratedFestivalsOptions" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body p-1">
      <div class="card-surface mb-1">
        <h5 class="main-heading mt-2 ps-2 mb-2">Important Festivals Dates</h5>
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
                  <a @click.prevent="deleteFestivalTableRow(index)" href="javascript:;" data-bs-toggle="tooltip"
                    data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </td>
                <td>
                  <div class="choices" data-type="select-one" tabindex="0" role="listbox" aria-haspopup="true"
                    aria-expanded="false">
                    <div class="select-box">
                      <select v-model="parent.festivalName" class="multisteps-form__select form-control choices__input"
                        name="choices-state">
                        <option v-for="(option, index) in festivals" :key="index" :value="option">
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <input v-model="parent.dateOfFestival" type="date" class="form-control form-control-default"
                    autocomplete="off">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn mb-0 btn-color btn-md null null" type="button" @click.prevent="addRowToFestivalsTable">
          Add Row
        </button>
      </div>
    </div>

    <div class="button-row d-flex justify-content-center mt-4 gap-4 space">
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousSteps"
        type="button">Prev</button>
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep"
        type="button">Next</button>
    </div>
  </div>
</template>

<script>
import { religionOptions, festivals, celebratedFestivalsOptions } from "../utils/picklist.js";
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
    Festival: {
      type: Object,
      required: true
    }
  },
  watch: {
    Festival: {
      handler(formData) {
        formData = { ...this.Festival }
        this.festivalsData = this.Festival.festivalsData || [];

        console.log("FormData lead Festival: ", formData)
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      formData: { ...this.Festival },
      festivalsData: [],
      religionOptions: { ...religionOptions },
      festivals: { ...festivals },
      celebratedFestivalsOptions: { ...celebratedFestivalsOptions },

    };
  },
  methods: {
    addRowToFestivalsTable() {
      this.festivalsData.push({
        festivalName: "",
        dateOfFestival: ""
      });
    },
    deleteFestivalTableRow(index) {
      this.festivalsData.splice(index, 1);
    },
    nextStep() {
      this.$emit('next', { ...this.formData, festivalsData: this.festivalsData });
    },
    previousSteps() {
      this.$emit('previous');
    },

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
