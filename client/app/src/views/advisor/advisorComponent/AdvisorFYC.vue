<!-- <template>
    <div>
      <h5 class="main-heading mt-2 ps-2">Advisor FYC Tracker </h5>
      <div style="width: 100%; overflow: scroll">
        <table class="table border table-responsive subform">
          <thead class="table subform-table-head text-white">
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Year</th>
              <th>FYC</th>
              
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="(parent, index) in advisorFycData" :key="index">
              <td class="m-auto">{{ index + 1 }}</td>
              <td>
                <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                  <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                </a>
              </td>
              <td>
            <select v-model="parent.year" class="form-control form-control-default">
              <option v-for="(option, index) in yearOptions" :key="index" :value="option">
                {{ option }}
              </option>
              
            </select>
          </td>
              <td>
                <input placeholder="CAD$"     @input="formatCurrency" v-model="parent.fyc" type="text" class="form-control form-control-default" autocomplete="off">
              </td>
                          
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToadvisorFycDataTable">
        Add Row
      </button>
    </div>

    <div class="mt-3">
      <div>
        <h5 class="main-heading mt-3">Advisor Bonus Tracker
      </h5>
        <div style="width: 100%; overflow: scroll">
          <table class="table border table-responsive subform">
            <thead class="table subform-table-head text-white">
              <tr>
                <th>#</th>
                <th>Actions</th>
                <th>Year</th>
                <th>Bonus Amount</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(parent, index) in advisorBonusData" :key="index">
                <td class="m-auto">{{ index + 1 }}</td>
                <td>
                  <a @click.prevent="deleteAdvisorRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </td>
                <td>
                <select v-model="parent.year" class="form-control form-control-default">
                  <option v-for="(option, index) in yearOptions" :key="index" :value="option">
                {{ option }}
              </option>
                </select>
              </td>
<td>
  <input
    placeholder="CAD$"
    v-model="parent.bonusAmount2020"
        @input="formatCurrency"
    type="text"
    class="form-control form-control-default"
    autocomplete="off"
  >
</td>

              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToAdvisorBonusDataTable">
          Add Row
        </button>
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
  import {yearOptions} from "../utils/picklist.js"

  export default {
    name: "AdvisorFYC",
    props:{
      advisorFYC:{
        type: Object,
        required: true
      },      
    },
    watch:{
      advisorFYC: {
        handler(){          
          this.formData ={...this.advisorFYC}
          this.advisorFycData= this.advisorFYC?.advisorFycData || [];
          // console.log("<<<<<<<<<<FormData lead festival:>>>>>>>>>> ", this.advisorFycData)
          this.advisorBonusData= this.advisorFYC?.advisorBonusData || [];
          // console.log("FormData lead festival: ", formData)

        },
        immediate: true,
        deep: true,

      }
    },
    data() {
      return {
       formData:{...this.advisorFYC},
       advisorFycData:[],
       advisorBonusData:[],
       yearOptions:{...yearOptions},
      };
    },  
    methods: {
formatCurrency(e) {
    // Remove everything except digits and dot
    let value = e.target.value.replace(/[^\d.]/g, '')
    if (value) {
      e.target.value = `$${value}`
      this.parent.fyc = e.target.value
    } else {
      this.parent.fyc = ''
    }
  },
formatCurrency(e) {
    let value = e.target.value.replace(/[^\d.]/g, '') // remove anything except numbers and decimal
    if (value) {
      e.target.value = `$${value}`
      this.parent.bonusAmount2020 = e.target.value
    } else {
      this.parent.bonusAmount2020 = ''
    }
  },
        addRowToadvisorFycDataTable() {
        this.advisorFycData.push({
            year:"",
            fyc:"",
        });
      },
      deleteLeadsRow(index) {
        this.advisorFycData.splice(index, 1);
      },

        addRowToAdvisorBonusDataTable() {
        this.advisorBonusData.push({
            year:"",
            bonusAmount:"",
        });
      },
      deleteAdvisorRow(index) {
        this.advisorBonusData.splice(index, 1);
      },
      nextStep() {
        this.$emit("next", { ...this.formData, advisorFycData: this.advisorFycData,advisorBonusData:this.advisorBonusData });  
      },
      previousStep() {
        this.$emit("previous");
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
    margin-bottom:150px;
  }
}
  </style>
   -->


   <template>
    <div>
      <h5 class="main-heading mt-2 ps-2">Advisor FYC Tracker </h5>
      <div style="width: 100%; overflow: scroll">
        <table class="table border table-responsive subform">
          <thead class="table subform-table-head text-white">
            <tr>
              <th>#</th>
              <th>Actions</th>
              <th>Year</th>
              <th>FYC</th>
              
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="(parent, index) in advisorFycData" :key="index">
              <td class="m-auto">{{ index + 1 }}</td>
              <td>
                <a @click.prevent="deleteLeadsRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                  <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                </a>
              </td>
              <td>
            <select v-model="parent.year" class="form-control form-control-default">
              <option v-for="(option, index) in yearOptions" :key="index" :value="option">
                {{ option }}
              </option>
              
            </select>
          </td>
              <td>
                <input 
                  placeholder="CAD$"     
                  @input="formatFycCurrency($event, index)" 
                  @blur="formatFycCurrency($event, index, true)" 
                  v-model="parent.fyc" 
                  type="text" 
                  class="form-control form-control-default" 
                  autocomplete="off"
                >
              </td>
                          
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToadvisorFycDataTable">
        Add Row
      </button>
    </div>

    <div class="mt-3">
      <div>
        <h5 class="main-heading mt-3">Advisor Bonus Tracker
      </h5>
        <div style="width: 100%; overflow: scroll">
          <table class="table border table-responsive subform">
            <thead class="table subform-table-head text-white">
              <tr>
                <th>#</th>
                <th>Actions</th>
                <th>Year</th>
                <th>Bonus Amount</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(parent, index) in advisorBonusData" :key="index">
                <td class="m-auto">{{ index + 1 }}</td>
                <td>
                  <a @click.prevent="deleteAdvisorRow(index)" href="javascript:;" data-bs-toggle="tooltip" data-bs-original-title="Delete product">
                    <i class="fas fa-trash text-secondary" aria-hidden="true"></i>
                  </a>
                </td>
                <td>
                <select v-model="parent.year" class="form-control form-control-default">
                  <option v-for="(option, index) in yearOptions" :key="index" :value="option">
                {{ option }}
              </option>
                </select>
              </td>
              <td>
                <input
                  placeholder="CAD$"
                  v-model="parent.bonusAmount"
                  @input="formatBonusCurrency($event, index)"
                  @blur="formatBonusCurrency($event, index, true)"
                  type="text"
                  class="form-control form-control-default"
                  autocomplete="off"
                >
              </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="btn mb-0 btn-color btn-md" type="button" @click.prevent="addRowToAdvisorBonusDataTable">
          Add Row
        </button>
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
  import {yearOptions} from "../utils/picklist.js"

  export default {
    name: "AdvisorFYC",
    props:{
      advisorFYC:{
        type: Object,
        required: true
      },      
    },
    watch:{
      advisorFYC: {
        handler(){          
          this.formData ={...this.advisorFYC}
          this.advisorFycData= this.advisorFYC?.advisorFycData || [];
          this.advisorBonusData= this.advisorFYC?.advisorBonusData || [];
        },
        immediate: true,
        deep: true,
      }
    },
    data() {
      return {
       formData:{...this.advisorFYC},
       advisorFycData:[],
       advisorBonusData:[],
       yearOptions:{...yearOptions},
      };
    },  
    methods: {
      // Format number to Canadian currency format
      formatToCanadianCurrency(value) {
        if (!value) return '';
        
        // Remove all non-digit characters except decimal point
        const numericValue = value.toString().replace(/[^\d.]/g, '');
        
        if (!numericValue) return '';
        
        // Format with commas for thousands and add dollar sign
        const number = parseFloat(numericValue);
        if (isNaN(number)) return '';
        
        return new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(number);
      },
      
      // Parse currency back to raw number for storage
      parseCurrency(value) {
        if (!value) return '';
        // Remove currency symbols, commas, and spaces
        return value.toString().replace(/[^\d.]/g, '');
      },
      
      formatFycCurrency(event, index, isBlur = false) {
        const input = event.target;
        let value = input.value;
        
        if (isBlur) {
      
          const formattedValue = this.formatToCanadianCurrency(value);
          this.advisorFycData[index].fyc = formattedValue;
        } else {
          
          const rawValue = this.parseCurrency(value);
          this.advisorFycData[index].fyc = rawValue;
        }
      },
      
      formatBonusCurrency(event, index, isBlur = false) {
        const input = event.target;
        let value = input.value;
        
        if (isBlur) {

          const formattedValue = this.formatToCanadianCurrency(value);
          this.advisorBonusData[index].bonusAmount = formattedValue;
        } else {
   
          const rawValue = this.parseCurrency(value);
          this.advisorBonusData[index].bonusAmount = rawValue;
        }
      },
      
      addRowToadvisorFycDataTable() {
        this.advisorFycData.push({
          year: "",
          fyc: "",
        });
      },
      
      deleteLeadsRow(index) {
        this.advisorFycData.splice(index, 1);
      },

      addRowToAdvisorBonusDataTable() {
        this.advisorBonusData.push({
          year: "",
          bonusAmount: "",
        });
      },
      
      deleteAdvisorRow(index) {
        this.advisorBonusData.splice(index, 1);
      },
      
      nextStep() {
        // Format all values before emitting
        const formattedFycData = this.advisorFycData.map(item => ({
          ...item,
          fyc: this.formatToCanadianCurrency(item.fyc)
        }));
        
        const formattedBonusData = this.advisorBonusData.map(item => ({
          ...item,
          bonusAmount: this.formatToCanadianCurrency(item.bonusAmount)
        }));
        
        this.$emit("next", { 
          ...this.formData, 
          advisorFycData: formattedFycData,
          advisorBonusData: formattedBonusData 
        });  
      },
      
      previousStep() {
        this.$emit("previous");
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
      margin-bottom:150px;
    }
  }
  </style>