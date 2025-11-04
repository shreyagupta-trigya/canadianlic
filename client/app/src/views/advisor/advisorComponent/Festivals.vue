<template>
  <div style="margin-bottom:150px;">
    <div class="card-surface mb-3">
    <h5 class="main-heading mt-2 ps-2 mb-2">Ethnicity</h5>
    <div class="row p-2">
      <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
        <label class="my-0">Religion</label>
        <!-- <div class="choices">
          <div class="select-box">
            <select  class="form-select"  name="choices-state" v-model="formData.religion">
              <option v-for="(option, index) in religionOptions" :key="index" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div> -->
   <v-select
  :options="religions"
  v-model="formData.religion"
  placeholder="Select Religion"
  :multiple="true"
  class="custom-vselect"
  append-to-body
/>
      </div>
      
      <div class="col-lg-4 col-sm-6 mt-2 mt-sm-0">
        <label class="my-0">Celebrated Festivals</label>
   <v-select
  :options="availableFestivals"
  v-model="formData.festival"
  placeholder="Select Festival"
  :multiple="true"
  append-to-body
  class="custom-vselect"
/>
      </div>
    </div>
    </div>
     <div class="card-surface mb-3">
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
</div>
    <div class="button-row d-flex justify-content-center mt-5 gap-4 space">
      <button class="btn mb-0 bg-gradient-light btn-md null null js-btn-prev" @click="previousSteps" type="button">Prev</button>
      <button class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next" @click.prevent="nextStep" type="button">Next</button>
    </div>
  </div>
</template>

<script>
import { festivalsOptions, religionOptions } from '../../leads/utils/picklist';
import { religions, religionFestivals } from "../../religions/utill/utill"
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
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
  components: { vSelect },
  props: {
    FestivalForm:{
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // formData: {...this.FestivalForm},
       religions, // imported list of religions
      religionFestivals, 
      // festivals: {...festivalsOptions},
      formData: {...this.FestivalForm,religion:[], festival:[] },
      subform:[]
      
    };
  },
computed: {
  availableFestivals() {
    if (!this.formData.religion || this.formData.religion.length === 0) return [];
    return this.formData.religion.reduce((all, rel) => {
      const list = this.religionFestivals[rel] || [];
      return all.concat(list);
    }, []);
  }
},

 watch: {
  'formData.religion'(newReligions) {
    if (!newReligions || newReligions.length === 0) {
      this.formData.festival = [];
      return;
    }

    const allFestivals = newReligions.reduce((acc, religion) => {
      const festivals = this.religionFestivals[religion] || [];
      return acc.concat(festivals);
    }, []);

    this.formData.festival = allFestivals;
  }
},

  methods: {
    nextStep(){
      this.$emit('next', {...this.formData, festivalsData: this.subform});
    },
    previousSteps(){
      this.$emit('previous', {...this.formData, festivalsData: this.subform});
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
@media screen and (max-width:500px) {
  .space{
    margin-bottom: 150px !important;
  }
}
</style>
